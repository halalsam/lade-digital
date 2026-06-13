"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

/* Floating "view live site" badge, fixed to the bottom-right of a project
   detail page. Only rendered when the project has a live URL.

   Magnetic & non-annoying:
     - It sits still until the pointer comes near, then leans toward the
       cursor (a gentle pull capped well short of the cursor) and springs back
       on leave — no constant motion competing for attention.
     - Fine-pointer only; touch devices get a plain, static link.
     - Honours prefers-reduced-motion (no magnet, no spin).
     - pointer-events stay on the badge itself, so it never blocks the page. */
export default function LiveSiteBadge({
  href,
  label = "Visit live site",
}: {
  href: string;
  label?: string;
}) {
  const rootRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!fine || reduced) return;

    // Distance (px) from the badge centre at which the magnet starts to pull.
    const RADIUS = 120;
    // How far the badge is allowed to travel toward the pointer.
    const PULL = 0.35;
    const MAX = 18;

    const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" });

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);

      if (dist < RADIUS) {
        xTo(gsap.utils.clamp(-MAX, MAX, dx * PULL));
        yTo(gsap.utils.clamp(-MAX, MAX, dy * PULL));
      } else {
        xTo(0);
        yTo(0);
      }
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      gsap.killTweensOf(el);
    };
  }, []);

  return (
    <a
      ref={rootRef}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      data-cursor="-blend -scale"
      className="group fixed bottom-6 right-6 z-30 hidden h-32.5 w-32.5 md:bottom-10 md:right-12 md:block"
    >
      {/* Rotating ring of text */}
      <svg
        viewBox="0 0 150 150"
        className="absolute inset-0 h-full w-full text-ink/50 animate-spin-slow motion-reduce:animate-none"
        aria-hidden="true"
      >
        <defs>
          <path
            id="live-badge-circle"
            d="M75,75 m-58,0 a58,58 0 1,1 116,0 a58,58 0 1,1 -116,0"
          />
        </defs>
        <text className="text-[10.5px] uppercase tracking-[0.18em] fill-current">
          <textPath href="#live-badge-circle" startOffset="0">
            live site · view live site · view&nbsp;
          </textPath>
        </text>
      </svg>

      {/* Centre disc */}
      <div className="absolute inset-5.5 flex items-center justify-center overflow-hidden rounded-full bg-ink text-paper transition-transform duration-500 group-hover:scale-105">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="h-7 w-7 text-white mix-blend-difference transition-transform duration-500 ease-reveal group-hover:translate-x-1 group-hover:-translate-y-1"
          aria-hidden="true"
        >
          <path
            d="M7 17 17 7M9 7h8v8"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </a>
  );
}
