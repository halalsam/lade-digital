"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import RevealScale from "../shared/RevealScale";
import Container from "../shared/Container";
import { useCursor } from "../cursor/CursorProvider";

// The play glyph shown inside the follower cursor while hovering the reel. It
// rides the cursor's built-in directional skew (the .cb-cursor-inner is what
// gets skewed), so it tilts with movement like every other cursor state.
function PlayGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="ml-0.5 h-7 w-7 fill-current">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

// Rounded showreel that expands to a fullscreen player on click. Drop the reel
// at /public/assets/showreel/short.mp4 (and full.mp4 for the modal); until then
// an animated gradient + play button stand in.
export default function Showreel() {
  const [open, setOpen] = useState(false);
  const cursor = useCursor();
  const resetCursor = useRef<(() => void) | null>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  // Restore the cursor to its default state. Idempotent — safe to call from
  // leave/cancel/click and on unmount without double-resetting.
  const clearCursor = useCallback(() => {
    resetCursor.current?.();
    resetCursor.current = null;
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Belt-and-suspenders: if we unmount while hovered, restore the cursor.
  useEffect(() => clearCursor, [clearCursor]);

  return (
    <section className="relative z-10">
      <Container width="wide">
        <RevealScale>
          <button
            ref={btnRef}
            type="button"
            onClick={() => {
              clearCursor(); // opening fullscreen — don't leave the glyph stuck
              setOpen(true);
            }}
            onPointerEnter={() => {
              // `owner` lets the provider auto-clear the glyph when the pointer
              // leaves the button (or it scrolls out from under a still cursor),
              // so it can't get stuck even if onPointerLeave is missed.
              resetCursor.current = cursor.set({
                content: <PlayGlyph />,
                className: "-play",
                owner: btnRef.current,
              });
            }}
            onPointerLeave={clearCursor}
            onPointerCancel={clearCursor}
            aria-label="Play showreel"
            className="group relative block aspect-[1360/725] w-full overflow-hidden rounded-media"
          >
            <div className="absolute inset-0 animate-[idea-pan_18s_ease-in-out_infinite] bg-[length:200%_200%] bg-gradient-to-br from-neutral-700 via-neutral-900 to-black" />
            <img
              className="absolute inset-0 h-full w-full scale-105 object-cover"
              src="/video/ribbon.gif"
              alt=""
            />
          </button>
        </RevealScale>
      </Container>

      {/* Fullscreen modal */}
      {open && (
        <div
          className="fixed inset-0 z-[300] flex items-center justify-center bg-paper"
          onClick={() => setOpen(false)}
        >
          <button
            type="button"
            aria-label="Close"
            className="absolute right-6 top-6 flex h-12 w-12 items-center justify-center rounded-full border border-ink/20 text-2xl"
          >
            ×
          </button>
          <video
            className="max-h-[90vh] max-w-[90vw] object-contain"
            autoPlay
            loop
            playsInline
            controls
          >
            <source src="/assets/showreel/full.mp4" type="video/mp4" />
            <source src="/assets/showreel/short.mp4" type="video/mp4" />
          </video>
        </div>
      )}
    </section>
  );
}
