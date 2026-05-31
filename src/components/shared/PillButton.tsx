"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { gsap } from "gsap";
import Link from "@/components/transition/TransitionLink";

type PillButtonProps = {
  href: string;
  label: string;
  /** "ink" = black outline on light bg, "paper" = white outline on dark bg */
  variant?: "ink" | "paper";
  size?: "md" | "lg";
  external?: boolean;
  className?: string;
  /** GSAP ease for the hover circle/label tweens */
  ease?: string;
};

const sizes = {
  md: "px-5 py-3.5 text-lg",
  lg: "px-12 py-7 text-2xl",
};

// Recreates React Bits' "Pill Nav" hover: a circle scales up from the bottom of
// the pill while the label slides up and an inverse-colored duplicate slides in.
// Driven by a paused GSAP timeline that we tween to/from on enter/leave.
export default function PillButton({
  href,
  label,
  variant = "ink",
  size = "lg",
  external = false,
  className = "",
  ease = "power3.easeOut",
}: PillButtonProps) {
  const color = variant === "ink" ? "text-ink" : "text-paper";

  const pillRef = useRef<HTMLElement | null>(null);
  const circleRef = useRef<HTMLSpanElement | null>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const layout = () => {
      const pill = pillRef.current;
      const circle = circleRef.current;
      if (!pill || !circle) return;

      const { width: w, height: h } = pill.getBoundingClientRect();
      if (!w || !h) return;

      // Geometry from React Bits: size a circle so its arc fills the pill when
      // scaled, anchored just below the bottom edge.
      const R = ((w * w) / 4 + h * h) / (2 * h);
      const D = Math.ceil(2 * R) + 2;
      const delta =
        Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1;
      const originY = D - delta;

      circle.style.width = `${D}px`;
      circle.style.height = `${D}px`;
      circle.style.bottom = `-${delta}px`;

      gsap.set(circle, {
        xPercent: -50,
        scale: 0,
        transformOrigin: `50% ${originY}px`,
      });

      const labelEl = pill.querySelector<HTMLElement>(".pill-label");
      const hoverEl = pill.querySelector<HTMLElement>(".pill-label-hover");

      if (labelEl) gsap.set(labelEl, { y: 0 });
      // Start the hover label just one line below so it rises in sync with the
      // primary label sliding up — not from far off-screen (which reads as lag).
      if (hoverEl) gsap.set(hoverEl, { y: h + 8, opacity: 0 });

      tlRef.current?.kill();
      const tl = gsap.timeline({ paused: true });
      tl.to(circle, { scale: 1.2, xPercent: -50, duration: 2, ease, overwrite: "auto" }, 0);
      if (labelEl)
        tl.to(labelEl, { y: -(h + 8), duration: 2, ease, overwrite: "auto" }, 0);
      if (hoverEl)
        tl.to(hoverEl, { y: 0, opacity: 1, duration: 2, ease, overwrite: "auto" }, 0);
      tlRef.current = tl;
    };

    layout();

    const onResize = () => layout();
    window.addEventListener("resize", onResize);
    if (document.fonts) document.fonts.ready.then(layout).catch(() => {});

    return () => {
      window.removeEventListener("resize", onResize);
      tlRef.current?.kill();
    };
  }, [ease, label, size]);

  const handleEnter = () => {
    const tl = tlRef.current;
    if (!tl) return;
    tweenRef.current?.kill();
    tweenRef.current = tl.tweenTo(tl.duration(), { duration: 0.3, ease, overwrite: "auto" });
  };

  const handleLeave = () => {
    const tl = tlRef.current;
    if (!tl) return;
    tweenRef.current?.kill();
    tweenRef.current = tl.tweenTo(0, { duration: 0.2, ease, overwrite: "auto" });
  };

  const classes = `pill pill--${variant} ${color} ${sizes[size]} leading-none ${className}`;

  // The expanding circle is colored with the pill's currentColor (the outline
  // color), and the hover label inverts so it reads over the filled circle.
  const circleColor = variant === "ink" ? "var(--color-ink)" : "var(--color-paper)";
  const hoverTextColor = variant === "ink" ? "var(--color-paper)" : "var(--color-ink)";

  const inner = (
    <>
      <span className="pill__ring" />
      <span
        ref={circleRef}
        className="pill-circle pointer-events-none absolute left-1/2 bottom-0 z-1 block rounded-full"
        style={{ background: circleColor, willChange: "transform" }}
        aria-hidden="true"
      />
      <span className="pill__label relative z-2 inline-block">
        <span className="pill-label relative z-2 inline-block" style={{ willChange: "transform" }}>
          {label}
        </span>
        <span
          className="pill-label-hover absolute left-0 top-0 z-3 inline-block"
          style={{ color: hoverTextColor, willChange: "transform, opacity" } as CSSProperties}
          aria-hidden="true"
        >
          {label}
        </span>
      </span>
    </>
  );

  if (external) {
    return (
      <a
        ref={pillRef as React.Ref<HTMLAnchorElement>}
        href={href}
        target="_blank"
        rel="noopener"
        className={classes}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
      >
        {inner}
      </a>
    );
  }

  return (
    <Link
      ref={pillRef as React.Ref<HTMLAnchorElement>}
      href={href}
      className={classes}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {inner}
    </Link>
  );
}
