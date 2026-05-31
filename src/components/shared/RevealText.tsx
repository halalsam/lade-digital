import { Fragment, type CSSProperties } from "react";

type RevealTextProps = {
  text: string;
  className?: string;
  /** seconds between each word's entrance */
  stagger?: number;
  /** initial delay before the first word (seconds) */
  delay?: number;
  /** override the global --word-duration (e.g. "1.4s" or 1.4). number → s */
  duration?: string | number;
  /** override the global --word-ease (e.g. "ease-out" or a cubic-bezier()) */
  ease?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
};

// Splits text into words, each animating up from a clipped baseline. Mirrors
// the per-word clip reveal used throughout the source page. Purely CSS-driven
// (no JS measuring), so it works fine inside a Server Component.
export default function RevealText({
  text,
  className = "",
  stagger = 0.06,
  delay = 0,
  duration,
  ease,
  as: Tag = "span",
}: RevealTextProps) {
  const words = text.split(" ");

  // Only emit override vars when given, so unset props fall through to the
  // global :root defaults. A bare number is read as seconds (matching delay).
  const overrides: Record<string, string> = {};
  if (duration !== undefined)
    overrides["--word-duration"] =
      typeof duration === "number" ? `${duration}s` : duration;
  if (ease !== undefined) overrides["--word-ease"] = ease;

  return (
    <Tag aria-label={text} className={className} style={overrides as CSSProperties}>
      {words.map((word, i) => (
        <Fragment key={`${word}-${i}`}>
          <span aria-hidden className="reveal-word">
            <span style={{ animationDelay: `${delay + i * stagger}s` }}>
              {word}
            </span>
          </span>{" "}
        </Fragment>
      ))}
    </Tag>
  );
}
