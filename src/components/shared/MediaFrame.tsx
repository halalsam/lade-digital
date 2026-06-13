import type { ReactNode } from "react";
import type { MediaAspect } from "@/lib/projects";
import { cn } from "@/lib/utils";

// Aspect-ratio presets for the case-study media frames. Lives here (the shared
// frame) so ProjectMedia and any bespoke caller resolve aspects from one source.
export const ASPECT: Record<MediaAspect, string> = {
  ultrawide: "aspect-[16/7]",
  wide: "aspect-[16/10]",
  square: "aspect-square",
  portrait: "aspect-[4/5]",
  tall: "aspect-[3/4]",
};

type MediaFrameProps = {
  /** Named case-study aspect. For bespoke ratios, omit and pass an `aspect-*` via className. */
  aspect?: MediaAspect;
  className?: string;
  children: ReactNode;
};

// The repeated media-tile chrome: a clipped, rounded box that positions an
// absolutely-filled gradient / <video> / <Image>. Promotes the duplicated
// `relative overflow-hidden rounded-[20px]` (now the `rounded-media` token)
// into one place so the radius and clip behaviour stay consistent everywhere.
export default function MediaFrame({ aspect, className, children }: MediaFrameProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-media",
        aspect && ASPECT[aspect],
        className,
      )}
    >
      {children}
    </div>
  );
}
