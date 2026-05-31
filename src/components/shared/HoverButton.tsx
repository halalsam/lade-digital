"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";

type HoverButtonProps = {
  /** Text revealed by the slide-up animation on hover */
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

/**
 * Plain button with the dual-text slide-up hover animation:
 * the visible label slides up and out while a duplicate slides in from below.
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
      className={`group relative block overflow-hidden px-5 py-1.5 text-xl text-ink transition-transform duration-300 ease-reveal ${className}`}
      {...props}
    >
      <span className="block transition-transform duration-700 ease-reveal group-hover:translate-y-[-120%]">
        {children}
      </span>
      <span className="absolute left-5 top-1.5 block translate-y-full scale-68 transition-transform duration-700 ease-reveal group-hover:translate-y-0 group-hover:scale-100">
        {children}
      </span>
      
    </button>
  );
}
