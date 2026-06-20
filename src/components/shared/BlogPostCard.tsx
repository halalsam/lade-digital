import Link from "@/components/transition/TransitionLink";
import { formatDate, type BlogPost } from "@/lib/blog";

type BlogPostCardProps = {
  post: BlogPost;
  /** "ink" = dark text on light bg (blog index); "paper" = on the dark home panel. */
  theme?: "ink" | "paper";
  /** Show the excerpt (the index lists it; the home preview doesn't). */
  showExcerpt?: boolean;
  /** Choose "list" for side-by-side (Home) or "grid" for stacked (Blog Index). */
  layout?: "list" | "grid";
};

export default function BlogPostCard({
  post,
  theme = "ink",
  showExcerpt = false,
  layout = "list",
}: BlogPostCardProps) {
  const isGrid = layout === "grid";
  const chipBorder = theme === "ink" ? "border-ink/20" : "border-paper";

  return (
    <article className={isGrid ? "h-full" : ""}>
      <Link
        href={`/blog/${post.slug}`}
        className={`group ${isGrid
            ? "flex h-full flex-col gap-6"
            : "grid items-center gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-16"
          }`}
      >
        <div className={isGrid ? "flex flex-1 flex-col items-start" : ""}>
          <span
            className={`inline-block rounded-full border ${chipBorder} uppercase tracking-wide font-medium ${isGrid ? "mb-4 px-3 py-1.5 text-xs" : "px-3 py-1.5 text-sm"
              }`}
          >
            {post.category}
          </span>

          <h3
            className={`leading-tight tracking-apple-headline ${isGrid
                ? "text-xl md:text-2xl"
                : "mt-6 text-2xl md:mt-8 md:text-4xl"
              }`}
          >
            {post.title}
          </h3>

          {showExcerpt && post.excerpt ? (
            <p
              className={`leading-relaxed opacity-70 ${isGrid
                  ? "mt-3 text-base line-clamp-3 md:mt-4"
                  : "mt-4 max-w-xl text-base md:mt-6 md:text-lg"
                }`}
            >
              {post.excerpt}
            </p>
          ) : null}

          <p
            className={`font-medium opacity-50 ${isGrid
                ? "mt-auto pt-6 text-sm"
                : "mt-4 text-base md:mt-6 md:text-lg"
              }`}
          >
            {formatDate(post.date)}
          </p>
        </div>
      </Link>
    </article>
  );
}
