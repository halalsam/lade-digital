"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";

/* --------------------------------------------------------------------------
   Global cursor follower — a Cuberto-style "cb-cursor".

   The native system cursor stays visible; this follower trails it as an extra
   accent that morphs based on what you hover. It can become ANY element: the
   cursor body renders whatever ReactNode you give it.

   Two ways to drive it, which compose:

     1. Imperatively, from any client component:
          const cursor = useCursor();
          // while hovering:
          const reset = cursor.set({
            content: <ArrowRight />,   // ANY JSX becomes the cursor
            className: "-pill",        // optional state class for styling
          });
          // on leave: reset();
        Or the convenience wrapper:
          <Cursor content={<span>View</span>}> ...hover target... </Cursor>

     2. Declaratively, via DOM attributes on ANY element (no React wiring):
          data-cursor="-pill"             → adds a state class while hovered
          data-cursor-text="View project" → text label while hovered
          data-cursor-media="/clip.mp4"   → image/video preview while hovered
        Event-delegated, so transitioned-in content works automatically.

   Performance: the rAF loop is ON-DEMAND. It spins up on pointer movement and
   shuts itself off the moment the dot has caught up and velocity settles — an
   idle pointer costs no per-frame work. Coarse/touch devices get nothing.
   ------------------------------------------------------------------------- */

type CursorState = {
  /** Any node to render as the cursor body (text, icon, image, component…). */
  content?: ReactNode;
  /** Extra state class(es) added to the root while active, e.g. "-pill". */
  className?: string;
};

type CursorApi = {
  /**
   * Set the cursor's content/state. Returns a reset fn that restores the prior
   * state — call it on hover-leave. Safe to ignore off-provider (no-op).
   */
  set: (state: CursorState) => () => void;
};

const CursorContext = createContext<CursorApi | null>(null);

/** Imperative cursor control from any client component. No-op off-provider. */
export function useCursor(): CursorApi {
  return useContext(CursorContext) ?? { set: () => () => {} };
}

const isImage = (src: string) => /\.(png|jpe?g|gif|webp|avif|svg)$/i.test(src);

/** Build the node for a declarative data-cursor-media value. */
function mediaNode(src: string): ReactNode {
  return isImage(src) ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt="" />
  ) : (
    <video src={src} autoPlay muted loop playsInline />
  );
}

type ActiveEntry = { content?: ReactNode; className?: string };

export function CursorProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const rootRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  // Only fine-pointer (mouse/trackpad) devices get the follower.
  const [enabled, setEnabled] = useState(false);

  // The current cursor content + extra class, rendered into the slot. A stack
  // of entries (keyed by id) lets nested/overlapping setters coexist; the most
  // recent non-empty one wins, matching intuitive hover nesting.
  const [entries, setEntries] = useState<Map<string, ActiveEntry>>(
    () => new Map(),
  );
  const order = useRef<string[]>([]);

  const top = useMemo(() => {
    for (let i = order.current.length - 1; i >= 0; i--) {
      const e = entries.get(order.current[i]);
      if (e) return e;
    }
    return undefined;
  }, [entries]);

  const active = Boolean(top);

  /* ---- device gate ---- */
  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    const apply = () => setEnabled(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  /* ---- imperative API: push/pop content entries ---- */
  const seq = useRef(0);
  const set = useCallback((state: CursorState): (() => void) => {
    const id = `c${seq.current++}`;
    order.current.push(id);
    setEntries((prev) => {
      const next = new Map(prev);
      next.set(id, { content: state.content, className: state.className });
      return next;
    });
    return () => {
      order.current = order.current.filter((x) => x !== id);
      setEntries((prev) => {
        if (!prev.has(id)) return prev;
        const next = new Map(prev);
        next.delete(id);
        return next;
      });
    };
  }, []);

  const api = useMemo<CursorApi>(() => ({ set }), [set]);

  /* ---- ON-DEMAND movement loop with directional skew ----
     Runs only while there's motion to resolve, then parks itself. */
  useEffect(() => {
    if (!enabled) return;
    const root = rootRef.current;
    const inner = innerRef.current;
    if (!root || !inner) return;

    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    // Render position (the lagging dot) and target (the real pointer).
    const render = { x: cx, y: cy };
    const target = { x: cx, y: cy };
    gsap.set(root, { x: cx, y: cy });

    let prev = { x: cx, y: cy };
    let raf = 0;
    let running = false;

    const LAG = 0.18; // 0..1 — higher = snappier follow
    const SKEW_K = 0.9; // velocity → skew degrees scaling
    const MAX_SKEW = 14;

    const tick = () => {
      // Ease render toward target.
      render.x += (target.x - render.x) * LAG;
      render.y += (target.y - render.y) * LAG;

      // Velocity of the rendered dot → skew + slight rotation toward travel.
      const vx = render.x - prev.x;
      const vy = render.y - prev.y;
      prev = { x: render.x, y: render.y };

      const speed = Math.hypot(vx, vy);
      const angle = (Math.atan2(vy, vx) * 180) / Math.PI;
      const skew = gsap.utils.clamp(
        -MAX_SKEW,
        MAX_SKEW,
        Math.min(speed, 16) * SKEW_K * Math.sign(vx || 0.0001),
      );
      const tilt = gsap.utils.clamp(-10, 10, (Math.min(speed, 16) / 16) * (angle / 18));

      gsap.set(root, { x: render.x, y: render.y, rotation: tilt });
      // Skew the body, counter-rotate so its contents stay readable.
      gsap.set(inner, { skewX: skew, rotation: -tilt });

      const settled =
        Math.abs(target.x - render.x) < 0.1 &&
        Math.abs(target.y - render.y) < 0.1 &&
        speed < 0.1;

      if (settled) {
        // Snap clean and park the loop — zero CPU until next move.
        gsap.set(root, { x: target.x, y: target.y, rotation: 0 });
        gsap.set(inner, { skewX: 0, rotation: 0 });
        running = false;
        return;
      }
      raf = requestAnimationFrame(tick);
    };

    const ensureRunning = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      root.classList.remove("-hidden");
      ensureRunning();
    };
    const onWindowOut = (e: PointerEvent) => {
      if (!e.relatedTarget) root.classList.add("-hidden");
    };
    const onWindowOver = () => root.classList.remove("-hidden");
    const onDown = () => root.classList.add("-click");
    const onUp = () => root.classList.remove("-click");

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerout", onWindowOut, { passive: true });
    window.addEventListener("pointerover", onWindowOver, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerout", onWindowOut);
      window.removeEventListener("pointerover", onWindowOver);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
    };
  }, [enabled]);

  /* ---- declarative path: event-delegated data-cursor attributes ----
     Mirrors the imperative API by pushing one entry while a target is hovered
     and popping it on leave. Listeners are cheap (only on enter/leave). */
  useEffect(() => {
    if (!enabled) return;

    let activeEl: Element | null = null;
    let reset: (() => void) | null = null;

    const clear = () => {
      reset?.();
      reset = null;
      activeEl = null;
    };

    const SEL = "[data-cursor],[data-cursor-text],[data-cursor-media]";

    const onOver = (e: PointerEvent) => {
      const t = (e.target as Element | null)?.closest?.(SEL) ?? null;
      if (!t) {
        if (activeEl) clear();
        return;
      }
      if (t === activeEl) return;
      if (activeEl) clear();

      activeEl = t;
      const media = t.getAttribute("data-cursor-media");
      const text = t.getAttribute("data-cursor-text");
      reset = set({
        className: t.getAttribute("data-cursor") ?? undefined,
        content: media ? mediaNode(media) : text ? text : undefined,
      });
    };

    const onOut = (e: PointerEvent) => {
      const to = e.relatedTarget as Element | null;
      if (activeEl && (!to || !activeEl.contains(to))) clear();
    };

    document.addEventListener("pointerover", onOver, { passive: true });
    document.addEventListener("pointerout", onOut, { passive: true });
    return () => {
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerout", onOut);
      clear();
    };
  }, [enabled, set]);

  /* ---- reset on route change (targets that transitioned away) ---- */
  useEffect(() => {
    order.current = [];
    setEntries(new Map());
    rootRef.current?.classList.add("-hidden");
  }, [pathname]);

  return (
    <CursorContext.Provider value={api}>
      {children}
      {enabled && (
        <div
          ref={rootRef}
          className={`cb-cursor -hidden${active ? " -active" : ""}${
            top?.className ? ` ${top.className}` : ""
          }`}
          aria-hidden
        >
          <div ref={innerRef} className="cb-cursor-inner">
            <div className="cb-cursor-content">{top?.content}</div>
          </div>
        </div>
      )}
    </CursorContext.Provider>
  );
}

/* --------------------------------------------------------------------------
   <Cursor> — convenience wrapper. Renders its children inside a wrapper that,
   while hovered, sets the global cursor to `content` (any node) + `className`.
   Use it when you'd rather stay in JSX than juggle data-attributes:

     <Cursor content={<ArrowUpRight />} className="-pill">
       <a href="/work">See our work</a>
     </Cursor>
   ------------------------------------------------------------------------- */
export function Cursor({
  content,
  className,
  as: Tag = "span",
  children,
  ...rest
}: CursorState & {
  as?: "span" | "div" | "a" | "button" | "li";
  children: ReactNode;
} & React.HTMLAttributes<HTMLElement>) {
  const cursor = useCursor();
  const reset = useRef<(() => void) | null>(null);

  const onEnter = () => {
    reset.current = cursor.set({ content, className });
  };
  const onLeave = () => {
    reset.current?.();
    reset.current = null;
  };

  useEffect(() => () => reset.current?.(), []);

  const Tagged = Tag as "span";
  return (
    <Tagged onPointerEnter={onEnter} onPointerLeave={onLeave} {...rest}>
      {children}
    </Tagged>
  );
}
