import type { ReactNode } from "react";

/* --------------------------------------------------------------------------
   Media block for the MDX blog body — used directly as <Figure /> in a post,
   and as the renderer for bare Markdown images. It frames an image or video in
   the site's rounded-media tile with an optional caption.

   With no `src` there's nothing to show, so the figure renders nothing — drop
   in a `src` (and `type="video"` for clips) to display media.
   ------------------------------------------------------------------------- */

type FigureProps = {
  /** Image/video URL. Omit and the figure renders nothing. */
  src?: string;
  /** "image" (default) or "video" — videos autoplay muted/looped. */
  type?: "image" | "video";
  alt?: string;
  /** Caption shown under the frame. */
  caption?: ReactNode;
  /** Aspect ratio of the frame. Default 16/9. */
  aspect?: "video" | "square" | "wide";
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
}: FigureProps) {
  // Nothing to render without media.
  if (!src) return null;

  return (
    <figure className="mt-10 mb-2">
      <div
        className={`relative w-full overflow-hidden rounded-media ${ASPECT[aspect]}`}
      >
        {type === "video" ? (
          <video
            className="absolute inset-0 h-full w-full object-cover"
            src={src}
            autoPlay
            muted
            loop
            playsInline
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            className="absolute inset-0 h-full w-full object-cover"
            src={src}
            alt={alt}
          />
        )}
      </div>
      {caption ? (
        <figcaption className="mt-4 text-sm opacity-50">{caption}</figcaption>
      ) : null}
    </figure>
  );
}
