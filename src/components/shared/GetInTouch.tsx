import Link from "next/link";

// Floating circular CTA, fixed to the bottom-right. The label rotates around
// the ring (via SVG textPath); the centre holds an arrow that nudges on hover.
// To match the source exactly, drop a looping <video> into the centre circle
// in place of the arrow markup.
export default function GetInTouch() {
  return (
    <Link
      href="/contacts"
      aria-label="Get in touch"
      className="group fixed bottom-6 right-6 z-30 hidden h-[130px] w-[130px] md:bottom-10 md:right-12 md:block"
    >
      {/* Rotating ring of text */}
      <svg
        viewBox="0 0 150 150"
        className="absolute inset-0 h-full w-full text-ink/50 animate-spin-slow"
        aria-hidden="true"
      >
        <defs>
          <path
            id="badge-circle"
            d="M75,75 m-58,0 a58,58 0 1,1 116,0 a58,58 0 1,1 -116,0"
          />
        </defs>
        <text className="text-[10.5px] uppercase tracking-[0.18em] fill-current">
          <textPath href="#badge-circle" startOffset="0">
            contact us · contact us · contact us ·
          </textPath>
        </text>
      </svg>

      {/* Centre disc */}
      <div className="absolute inset-[22px] flex items-center justify-center overflow-hidden rounded-full bg-ink text-paper transition-transform duration-500 group-hover:scale-105">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="h-7 w-7 transition-transform duration-500 ease-[var(--ease-reveal)] group-hover:translate-x-1 group-hover:-translate-y-1"
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
    </Link>
  );
}
