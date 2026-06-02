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
   Global cursor follower — a Lade-style "cb-cursor".

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
  /**
   * The DOM element this entry is tied to. When given, the provider auto-clears
   * the entry the moment the pointer is no longer over this element (or it
   * scrolls out from under a still pointer) — a global safety net so the cursor
   * never gets stuck if a local pointer-leave is missed. Optional: omit it and
   * you own the returned reset() fully.
   */
  owner?: Element | null;
};

type CursorApi = {
  /**
   * Set the cursor's content/state. Returns a reset fn that restores the prior
   * state — call it on hover-leave. Safe to ignore off-provider (no-op).
   * Pass `owner` to also get provider-managed auto-clear on pointer leave.
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

  // Last known pointer position in client coords. Shared across effects so the
  // element-under-pointer watcher can hit-test what's beneath a *stationary*
  // pointer when the page scrolls under it (wheel scroll fires no pointer
  // events). `seen` stays false until the first real move, so we never hit-test
  // a (0,0)/(-1,-1) phantom position before the user has moved the mouse.
  const ptr = useRef({ x: -1, y: -1, seen: false });

  // Only fine-pointer (mouse/trackpad) devices get the follower.
  const [enabled, setEnabled] = useState(false);

  // The current cursor content + extra class, rendered into the slot. A stack
  // of entries (keyed by id) lets nested/overlapping setters coexist; the most
  // recent non-empty one wins, matching intuitive hover nesting.
  const [entries, setEntries] = useState<Map<string, ActiveEntry>>(
    () => new Map(),
  );
  const order = useRef<string[]>([]);

  // Per-entry { owner element, reset fn } for entries that opted into
  // provider-managed leave. The global pointer watcher walks this to clear any
  // entry whose owner the pointer has left — the safety net that keeps an
  // imperative cursor (e.g. a play glyph) from sticking if a local leave is
  // missed. Entries without an owner never appear here.
  const owned = useRef<Map<string, { el: Element; reset: () => void }>>(
    new Map(),
  );

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
    const reset = () => {
      owned.current.delete(id);
      order.current = order.current.filter((x) => x !== id);
      setEntries((prev) => {
        if (!prev.has(id)) return prev;
        const next = new Map(prev);
        next.delete(id);
        return next;
      });
    };
    // Opt into provider-managed leave: the watcher will call this reset once the
    // pointer is no longer over `owner`. The caller's own reset() still works
    // (idempotent) and stays the fast path for normal pointer-leave.
    if (state.owner) owned.current.set(id, { el: state.owner, reset });
    return reset;
  }, []);

  const api = useMemo<CursorApi>(() => ({ set }), [set]);

  /* ---- ON-DEMAND movement loop with directional skew ----
     Runs only while there's motion to resolve, then parks itself.

     Two motion sources feed it: real pointer movement (target x/y) and wheel
     scrolling while the pointer is still (scrollV). The latter never moves the
     dot's position — the pointer hasn't moved — it only injects a transient
     skew/tilt so the dot leans as content scrolls past, decaying back to flat. */
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

    // quickSetter binds the property pipeline once; per-frame calls are then a
    // cheap direct style write rather than gsap.set's full parse each frame.
    const setRoot = gsap.quickSetter(root, "css");
    const setInner = gsap.quickSetter(inner, "css");
    setRoot({ x: cx, y: cy });

    // Scalars instead of a per-frame {x,y} allocation (no GC churn at 60fps).
    let prevX = cx;
    let prevY = cy;
    let scrollV = 0; // decaying wheel velocity (px-ish), drives scroll skew
    let raf = 0;
    let running = false;

    const LAG = 0.18; // 0..1 — higher = snappier follow
    const SKEW_K = 0.9; // velocity → skew degrees scaling
    const MAX_SKEW = 14;
    const SCROLL_DECAY = 0.82; // per-frame falloff of scrollV toward 0
    const SCROLL_K = 0.05; // wheel delta → skew/tilt scaling
    const clamp = gsap.utils.clamp;

    const tick = () => {
      // Ease render toward target.
      render.x += (target.x - render.x) * LAG;
      render.y += (target.y - render.y) * LAG;

      // Velocity of the rendered dot → skew + slight rotation toward travel.
      const vx = render.x - prevX;
      const vy = render.y - prevY;
      prevX = render.x;
      prevY = render.y;

      const speed = Math.min(Math.hypot(vx, vy), 16);
      const angle = (Math.atan2(vy, vx) * 180) / Math.PI;
      // Wheel velocity adds a transient skew/tilt on top of the pointer-motion
      // skew, so even a still pointer leans as content rushes past on scroll.
      const scrollSkew = clamp(-MAX_SKEW, MAX_SKEW, scrollV * SCROLL_K);
      const skew = clamp(
        -MAX_SKEW,
        MAX_SKEW,
        speed * SKEW_K * Math.sign(vx || 0.0001) + scrollSkew,
      );
      const tilt = clamp(
        -10,
        10,
        (speed / 16) * (angle / 18) + scrollSkew * 0.4,
      );

      setRoot({ x: render.x, y: render.y, rotation: tilt });
      // Skew the body, counter-rotate so its contents stay readable.
      setInner({ skewX: skew, rotation: -tilt });

      scrollV *= SCROLL_DECAY;

      const settled =
        Math.abs(target.x - render.x) < 0.1 &&
        Math.abs(target.y - render.y) < 0.1 &&
        speed < 0.1 &&
        Math.abs(scrollV) < 0.1;

      if (settled) {
        // Snap clean and park the loop — zero CPU until next move.
        setRoot({ x: target.x, y: target.y, rotation: 0 });
        setInner({ skewX: 0, rotation: 0 });
        scrollV = 0;
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
      ptr.current.x = e.clientX;
      ptr.current.y = e.clientY;
      ptr.current.seen = true;
      root.classList.remove("-hidden");
      ensureRunning();
    };
    // Wheel/trackpad scroll: inject decaying skew so the still dot reacts. We
    // accumulate (clamped) rather than replace, so fast flicks read stronger.
    const onWheel = (e: WheelEvent) => {
      scrollV = clamp(-40, 40, scrollV + e.deltaY);
      ensureRunning();
    };
    const onWindowOut = (e: PointerEvent) => {
      if (!e.relatedTarget) root.classList.add("-hidden");
    };
    const onWindowOver = () => root.classList.remove("-hidden");
    const onDown = () => root.classList.add("-click");
    const onUp = () => root.classList.remove("-click");

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("pointerout", onWindowOut, { passive: true });
    window.addEventListener("pointerover", onWindowOver, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("pointerout", onWindowOut);
      window.removeEventListener("pointerover", onWindowOver);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
    };
  }, [enabled]);

  /* ---- declarative path: event-delegated data-cursor attributes ----
     Mirrors the imperative API by pushing one entry while a target is hovered
     and popping it on leave. Driven entirely by pointerover/pointerout — which
     includes the SYNTHETIC ones the scroll effect dispatches when the page moves
     under a still pointer, so scroll-under works here with no extra logic. */
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

  /* ---- element-under-pointer watcher (the global leave net + scroll-under) ----
     One throttled hit-test (on scroll AND pointer move) of what's beneath the
     pointer, doing two jobs from that single lookup:

     1. Synthetic hover on scroll-under-a-still-pointer. Wheel scrolling fires no
        pointer events, so a target sliding under a stationary cursor would never
        (de)activate. When the topmost element changes we dispatch the bubbling
        pointerout (old) + pointerover (new) a real move would have produced.
        Those two events drive BOTH consumers: the declarative data-cursor
        delegated listeners, and React's onPointerEnter/onPointerLeave (e.g.
        Showreel's glyph) — in React 19 those derive solely from native
        pointerover/pointerout (registerDirectEvent("onPointerEnter",
        ["pointerout","pointerover"])), with React computing the boundary from
        relatedTarget, so we set it and let React handle ancestor/descendant.

     2. Owner auto-clear (the fix for a stuck imperative cursor). Any owned entry
        whose owner element no longer contains what's under the pointer is reset
        here — a global safety net independent of the consumer's own leave
        handler, so the cursor can't stick if that local leave is ever missed. */
  useEffect(() => {
    if (!enabled) return;

    let lastEl: Element | null = null;
    let raf = 0;

    const fire = (el: Element, type: string, related: Element | null) =>
      el.dispatchEvent(
        new PointerEvent(type, {
          bubbles: true,
          cancelable: false,
          composed: true,
          clientX: ptr.current.x,
          clientY: ptr.current.y,
          pointerType: "mouse",
          relatedTarget: related,
        }),
      );

    const resolve = () => {
      raf = 0;
      const { x, y, seen } = ptr.current;
      if (!seen) return; // pointer never moved → nothing is under it yet
      const el = document.elementFromPoint(x, y);

      // (2) Clear any owned entry the pointer has left. Runs every tick (not just
      // on change) so it also catches an owner that animated/scrolled away while
      // `el` stayed the same node.
      if (owned.current.size) {
        for (const [id, { el: owner, reset }] of owned.current) {
          if (!el || !owner.contains(el)) {
            owned.current.delete(id);
            reset();
          }
        }
      }

      // (1) Synthesize over/out when the topmost element changes.
      if (el === lastEl) return;
      const prev = lastEl;
      lastEl = el;
      if (prev) fire(prev, "pointerout", el);
      if (el) fire(el, "pointerover", prev);
    };

    const schedule = () => {
      if (raf) return;
      raf = requestAnimationFrame(resolve);
    };

    // Pointer move keeps `lastEl`/owner-state honest with the real pointer;
    // scroll (capture:true to also hear inner scrollers that don't bubble to
    // window) covers movement of content under a still pointer.
    window.addEventListener("pointermove", schedule, { passive: true });
    window.addEventListener("scroll", schedule, { passive: true, capture: true });
    return () => {
      window.removeEventListener("pointermove", schedule);
      window.removeEventListener("scroll", schedule, { capture: true });
      if (raf) cancelAnimationFrame(raf);
    };
  }, [enabled]);

  /* ---- reset on route change (targets that transitioned away) ---- */
  useEffect(() => {
    order.current = [];
    owned.current.clear();
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

  const onEnter = (e: React.PointerEvent<HTMLElement>) => {
    // currentTarget is the wrapped element — hand it to the provider as `owner`
    // so the cursor auto-clears on leave/scroll-away even if onLeave is missed.
    reset.current = cursor.set({ content, className, owner: e.currentTarget });
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
