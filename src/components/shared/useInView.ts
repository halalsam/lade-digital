"use client";

import { useEffect, useRef, useState } from "react";

type UseInViewOptions = {
  /** how far the block must clear the bottom edge before it counts as "in" */
  rootMargin?: string;
  threshold?: number;
};

/**
 * Reveals once. Returns a ref to attach and a `shown` flag that flips to true
 * the first time the element scrolls into view, then stops observing.
 *
 * Degrades safely: no IntersectionObserver → shown on the next frame.
 * (Reduced-motion and no-JS are handled in CSS by the reveal-* rules.)
 *
 * This is the shared engine behind <InView> and the Reveal* wrappers, lifted
 * out of the original Reveal component so every variant behaves identically.
 */
export function useInView<T extends HTMLElement = HTMLDivElement>({
  rootMargin = "0px 0px -12% 0px",
  threshold = 0,
}: UseInViewOptions = {}) {
  const ref = useRef<T>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || shown) return;

    if (typeof IntersectionObserver === "undefined") {
      const id = requestAnimationFrame(() => setShown(true));
      return () => cancelAnimationFrame(id);
    }

    const io = new IntersectionObserver(
      ([entry], obs) => {
        if (entry.isIntersecting) {
          setShown(true);
          obs.disconnect();
        }
      },
      { threshold, rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [shown, rootMargin, threshold]);

  return { ref, shown };
}
