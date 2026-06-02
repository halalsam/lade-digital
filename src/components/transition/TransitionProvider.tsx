"use client";

import {
  createContext,
  startTransition,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { usePathname, useRouter } from "next/navigation";

/* --------------------------------------------------------------------------
   Page transition — built on the browser View Transition API.

   On navigation the CURRENT page recedes: it scales back, rounds its corners
   and dims, sinking into a dark depth. The INCOMING white page rises up from
   the bottom over it, casting a soft shadow on its leading edge. Once it
   settles, the new page's content reveals in place.

   The whole look lives in CSS (`::view-transition-old/new(root)` in
   globals.css). This provider only drives the trigger + timing:
     1. close the reveal gate so the incoming page's word-reveals stay held,
     2. run the view transition around `router.push`, releasing its snapshot
        from a passive effect the moment the new route commits,
     3. open the gate once the transition has finished so content reveals.

   There is NO first-load curtain and NO exit animation.
   ------------------------------------------------------------------------- */

type ViewTransition = { finished: Promise<void> };
type DocumentWithViewTransition = Document & {
  startViewTransition?: (
    callback: () => Promise<void> | void,
  ) => ViewTransition;
};

/* The look of the transition. Injected as a raw <style> rather than living in
   globals.css because Turbopack's dev CSS pipeline strips `::view-transition`
   rules from processed stylesheets (they only survive a production build).

     · old (current) page  → scales back, rounds, dims into a dark depth
     · new (incoming) page → a white sheet rising from the bottom to fully
                             cover the screen, shadow on its leading edge */
const TRANSITION_CSS = `
::view-transition { background: #0b0b0b; }

::view-transition-old(root),
::view-transition-new(root) {
  animation-duration: 0.95s;
  animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
  animation-fill-mode: both;
  transform-origin: center center;
  mix-blend-mode: normal; /* opaque stack, no additive cross-fade */
}

::view-transition-old(root) { animation-name: page-recede; }
@keyframes page-recede {
  to { transform: scale(0.9); border-radius: 22px; filter: brightness(0.5); }
}

/* new paints above old by default → it rises over the receding page */
::view-transition-new(root) {
  animation-name: page-rise;
  background: #ffffff;
  box-shadow: 0 -22px 60px -10px rgba(0, 0, 0, 0.5);
}
@keyframes page-rise {
  from { transform: translateY(100%); border-radius: 26px 26px 0 0; }
  to   { transform: translateY(0);    border-radius: 0; }
}

@media (prefers-reduced-motion: reduce) {
  ::view-transition-old(root),
  ::view-transition-new(root) { animation: none; }
}
`;

type TransitionValue = {
  /** Trigger an animated navigation to an internal route. */
  navigate: (href: string) => void;
  /** True once the incoming page is settled and interactive. */
  isReady: boolean;
};

const TransitionContext = createContext<TransitionValue>({
  navigate: () => {},
  isReady: true,
});

/** Read the transition state from any client component. */
export const usePageTransition = () => useContext(TransitionContext);

const prefersReduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const supportsViewTransition = () =>
  typeof document !== "undefined" &&
  typeof (document as DocumentWithViewTransition).startViewTransition ===
    "function";

export function TransitionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  // First load is ready by default; only a navigation closes the gate.
  const [isReady, setIsReady] = useState(true);

  // Resolver handed to the in-flight view transition; called once the new
  // route has committed so the API captures the correct "new" snapshot.
  const resolveSnapshot = useRef<(() => void) | null>(null);
  // True while a transition is mid-flight, to ignore overlapping clicks.
  const running = useRef(false);

  const openGate = () => {
    document.documentElement.dataset.reveal = "go";
    setIsReady(true);
  };
  const closeGate = () => {
    document.documentElement.dataset.reveal = "wait";
    setIsReady(false);
  };

  // Once the new route has committed, release the view transition's snapshot so
  // it can animate the incoming page in. This MUST resolve from a passive
  // effect (flushed by React's scheduler), NOT requestAnimationFrame — rAF is
  // gated on paint, which the view transition freezes, so an rAF-based resolve
  // deadlocks and the API aborts with a DOM-update timeout.
  useEffect(() => {
    if (!resolveSnapshot.current) return;
    resolveSnapshot.current();
    resolveSnapshot.current = null;
  }, [pathname]);

  const navigate = (href: string) => {
    if (running.current) return; // ignore clicks mid-transition
    if (!href || href === pathname) return;

    // No animation available → plain navigation, gate untouched.
    if (prefersReduced() || !supportsViewTransition()) {
      router.push(href);
      return;
    }

    running.current = true;
    closeGate(); // hold the incoming page's reveals until the sheet has risen

    const doc = document as DocumentWithViewTransition;
    const transition = doc.startViewTransition!(
      () =>
        new Promise<void>((resolve) => {
          // Resolved by the pathname effect above, once the route commits.
          resolveSnapshot.current = resolve;
          startTransition(() => router.push(href));
        }),
    );

    const done = () => {
      running.current = false;
      openGate();
    };
    transition.finished.then(done, done);
  };

  return (
    <TransitionContext.Provider value={{ navigate, isReady }}>
      <style dangerouslySetInnerHTML={{ __html: TRANSITION_CSS }} />
      {children}
    </TransitionContext.Provider>
  );
}
