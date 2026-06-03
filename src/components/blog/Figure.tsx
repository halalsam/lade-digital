import type { ReactNode } from "react";
import { gradientFor } from "@/lib/gradient";

/* --------------------------------------------------------------------------
   Media block for the MDX blog body — used directly as <Figure /> in a post,
   and as the renderer for bare Markdown images. It frames an image or video in
   the site's rounded-media tile with an optional caption.

   While real artwork doesn't exist yet, pass no `src` and it renders a labelled
   gradient placeholder (deterministic via gradientFor) at the right aspect
   ratio, so the layout and rhythm are correct before any asset is dropped in.
   Replace the placeholder later by adding `src` (and `type="video"` for clips).
   ------------------------------------------------------------------------- */

type FigureProps = {
  /** Image/video URL. Omit to render a gradient placeholder. */
  src?: string;
  /** "image" (default) or "video" — videos autoplay muted/looped. */
  type?: "image" | "video";
  alt?: string;
  /** Caption shown under the frame. */
  caption?: ReactNode;
  /** Aspect ratio of the frame. Default 16/9. */
  aspect?: "video" | "square" | "wide";
  /** Seeds the placeholder gradient + its label. */
  placeholderKey?: string;
};

const ASPECT: Record<NonNullable<FigureProps["aspect"]>, string> = {
  video: "aspect-video",
  square: "aspect-square",
  wide: "aspect-[21/9]",
};

export default function Figure({
  src,
  type = "image",
  alt = "",
  caption,
  aspect = "video",
  placeholderKey = "placeholder",
}: FigureProps) {
  return (
    <figure className="mt-10 mb-2">
      <div
        className={`relative w-full overflow-hidden rounded-media ${ASPECT[aspect]}`}
        style={src ? undefined : { background: gradientFor(placeholderKey) }}
      >
        {src && type === "video" ? (
          <video
            className="absolute inset-0 h-full w-full object-cover"
            src={src}
            autoPlay
            muted
            loop
            playsInline
          />
        ) : src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            className="absolute inset-0 h-full w-full object-cover"
            src={src}
            alt={alt}
          />
        ) : (
          // Placeholder: label what belongs here so drafts read clearly.
          <span className="absolute inset-0 flex items-center justify-center px-6 text-center text-sm font-medium uppercase tracking-wide text-paper/55">
            {type === "video" ? "Video" : "Image"} placeholder
            {alt ? ` — ${alt}` : ""}
          </span>
        )}
      </div>
      {caption ? (
        <figcaption className="mt-4 text-sm opacity-50">{caption}</figcaption>
      ) : null}
    </figure>
  );
}
