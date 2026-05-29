import { Fragment } from "react";

type RevealTextProps = {
  text: string;
  className?: string;
  /** seconds between each word's entrance */
  stagger?: number;
  /** initial delay before the first word (seconds) */
  delay?: number;
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
  as: Tag = "span",
}: RevealTextProps) {
  const words = text.split(" ");
  return (
    <Tag aria-label={text} className={className}>
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
