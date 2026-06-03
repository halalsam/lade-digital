"use client";

import type { CSSProperties, ReactNode } from "react";
import { useInView } from "./useInView";

type RevealVariant = "fade" | "scale" | "up";

const VARIANT_CLASS: Record<RevealVariant, string> = {
  fade: "reveal-fade",
  scale: "reveal-scale",
  up: "reveal-up-soft",
};

type InViewProps = {
  children: ReactNode;
  className?: string;
  /** which entrance the block plays as it scrolls into view */
  variant?: RevealVariant;
  /** rise distance in px (variant="up") */
  y?: number;
  /** starting scale 0–1 (variant="scale") */
  scaleFrom?: number;
  /** delay (ms) after it enters view before animating */
  delay?: number;
  /** override the global --reveal-duration (e.g. "0.6s" or 600). number → ms */
  duration?: string | number;
  /** override the global --reveal-ease (e.g. "ease-out" or a cubic-bezier()) */
  ease?: string;
};

/**
 * Base scroll-reveal wrapper. Toggles `data-shown` when its children enter the
 * viewport; the look lives in the `.reveal-*` rules (globals.css). The named
 * exports below (RevealFade / RevealScale / RevealUp) are thin presets of this.
 */
export default function InView({
  children,
  className = "",
  variant = "up",
  y = 28,
  scaleFrom = 0.74,
  delay = 0,
  duration,
  ease,
}: InViewProps) {
  const { ref, shown } = useInView();

  // Only emit the override vars when given, so unset props fall through to the
  // global :root defaults rather than pinning them to undefined.
  const overrides: Record<string, string | number> = {
    "--reveal-y": `${y}px`,
    "--reveal-scale-from": scaleFrom,
    "--reveal-delay": `${delay}ms`,
  };
  if (duration !== undefined)
    overrides["--reveal-duration"] =
      typeof duration === "number" ? `${duration}ms` : duration;
  if (ease !== undefined) overrides["--reveal-ease"] = ease;

  return (
    <div
      ref={ref}
      data-shown={shown ? "true" : "false"}
      className={`${VARIANT_CLASS[variant]} ${className}`}
      style={overrides as CSSProperties}
    >
      {children}
    </div>
  );
}

export type { RevealVariant };
