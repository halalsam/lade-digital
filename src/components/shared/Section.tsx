import type { ElementType, ReactNode } from "react";

type SectionVariant = "normal" | "rounded" | "overlap";

type SectionProps = {
  children: ReactNode;
  /**
   * normal  — plain section, just the centered container + vertical padding.
   * rounded — rounded-top panel sitting on a dark background.
   * overlap — rounded-top panel that overlaps the previous section (-mt-20),
   *           recreating the stacked-reveal look used on the home page.
   */
  variant?: SectionVariant;
  /** background applied to the panel (rounded/overlap). Defaults to #161616. */
  bg?: string;
  /** drop the centered max-width container to lay out full-bleed children */
  bleed?: boolean;
  /** extra classes on the outer <section> */
  className?: string;
  /** extra classes on the inner container */
  innerClassName?: string;
  as?: ElementType;
};

// The dark stacked panels overlap the previous section and round their top
// corners — the inner padding here gives that overlap room to breathe.
const PANEL = "rounded-t-[80px] pb-2 pt-36";
const INNER = "mx-auto max-w-[1600px] px-6 md:px-12 lg:px-60";

/**
 * Layout + spacing wrapper that keeps sections consistent. Pick a `variant`
 * for plain, rounded-top, or overlapping rounded-top panels — all share the
 * same centered container and horizontal padding. Pair with the Reveal*
 * wrappers when you also want an entrance animation.
 */
export default function Section({
  children,
  variant = "normal",
  bg = "#161616",
  bleed = false,
  className = "",
  innerClassName = "",
  as: Tag = "section",
}: SectionProps) {
  const isPanel = variant === "rounded" || variant === "overlap";

  // overlap pulls the panel up over the section above it.
  const outer = [
    "relative",
    variant === "overlap" ? "-mt-20" : "",
    variant === "normal" ? "py-20" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const inner = bleed ? innerClassName : `${INNER} ${innerClassName}`.trim();

  if (isPanel) {
    return (
      <Tag className={outer}>
        <div className={PANEL} style={{ backgroundColor: bg }}>
          <div className={inner}>{children}</div>
        </div>
      </Tag>
    );
  }

  return (
    <Tag className={outer}>
      <div className={inner}>{children}</div>
    </Tag>
  );
}

export type { SectionVariant };
