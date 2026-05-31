"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";

/** Shared classes for the slide-up hover target (button or link wrapper). */
export const hoverTargetClass =
  "group relative block overflow-hidden px-5 py-1.5 text-xl text-ink transition-transform duration-300 ease-reveal";

/**
 * The dual-text slide-up animation body: the visible label slides up and out
 * while a duplicate slides in from below. Drop it inside any element carrying
 * `hoverTargetClass` (a button, a link, …) so the `group-hover` triggers fire.
 */
export function HoverText({ children }: { children: ReactNode }) {
  return (
    <>
      <span className="block transition-transform duration-700 ease-reveal group-hover:translate-y-[-120%]">
        {children}
      </span>
      <span className="absolute left-5 top-1.5 block translate-y-full scale-68 transition-transform duration-700 ease-reveal group-hover:translate-y-0 group-hover:scale-100">
        {children}
      </span>
    </>
  );
}

type HoverButtonProps = {
  /** Text revealed by the slide-up animation on hover */
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

/**
 * Plain button with the dual-text slide-up hover animation. For navigation,
 * render a `<Link className={hoverTargetClass}>` wrapping `<HoverText>` instead.
 */
export default function HoverButton({
  children,
  className = "",
  type = "button",
  ...props
}: HoverButtonProps) {
  return (
    <button
      type={type}
      data-cursor="-blend -scale"
      className={`${hoverTargetClass} ${className}`}
      {...props}
    >
      <HoverText>{children}</HoverText>
    </button>
  );
}
