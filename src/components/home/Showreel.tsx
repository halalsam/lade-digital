"use client";

import { useEffect, useState } from "react";
import RevealScale from "../shared/RevealScale";

// Rounded showreel that expands to a fullscreen player on click. Drop the reel
// at /public/assets/showreel/short.mp4 (and full.mp4 for the modal); until then
// an animated gradient + play button stand in.
export default function Showreel() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <section className="relative z-10">
      <div className="mx-auto max-w-[1600px] px-6 md:px-12 lg:px-[7.5rem]">
        <RevealScale>
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Play showreel"
          className="group relative block aspect-[1360/725] w-full overflow-hidden rounded-[20px]"
        >
          <div className="absolute inset-0 animate-[idea-pan_18s_ease-in-out_infinite] bg-[length:200%_200%] bg-gradient-to-br from-neutral-700 via-neutral-900 to-black" />
          <video
            className="absolute inset-0 h-full w-full scale-105 object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          >
            <source src="/assets/showreel/short.mp4" type="video/mp4" />
          </video>

          {/* Play affordance */}
          <span className="absolute left-1/2 top-1/2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-paper/90 text-ink transition-transform duration-300 group-hover:scale-110">
            <svg viewBox="0 0 24 24" className="ml-1 h-8 w-8 fill-current">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </button>
        </RevealScale>
      </div>

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
