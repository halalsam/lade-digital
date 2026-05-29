import Link from "next/link";

type PillButtonProps = {
  href: string;
  label: string;
  /** "ink" = black outline on light bg, "paper" = white outline on dark bg */
  variant?: "ink" | "paper";
  size?: "md" | "lg";
  external?: boolean;
  className?: string;
};

const sizes = {
  md: "px-5 py-3.5 text-lg",
  lg: "px-12 py-7 text-2xl",
};

// Recreates the source's pill CTA: an outlined capsule whose background fills
// from the bottom on hover while the label color inverts.
export default function PillButton({
  href,
  label,
  variant = "ink",
  size = "lg",
  external = false,
  className = "",
}: PillButtonProps) {
  const color = variant === "ink" ? "text-ink" : "text-paper";

  const inner = (
    <>
      <span className="pill__ring" />
      <span className="pill__fill" />
      <span className="pill__label">
        <span>{label}</span>
      </span>
    </>
  );

  const classes = `pill pill--${variant} ${color} ${sizes[size]} leading-none ${className}`;

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener" className={classes}>
        {inner}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {inner}
    </Link>
  );
}
