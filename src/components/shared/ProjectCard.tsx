

import Image from "next/image";
import Link from "@/components/transition/TransitionLink";
import type { Project } from "@/lib/projects";
import { gradientFor } from "@/lib/gradient";
import MediaFrame from "./MediaFrame";

type ProjectCardProps = {
  project: Project;
  /** "ink" = dark text on light bg (grid); "paper" = light text on dark panels (home). */
  theme?: "ink" | "paper";
  /** Taller 3:4 tile for the featured masonry rhythm (vs the default square). */
  tall?: boolean;
  /** Choose "list" for side-by-side (mobile & desktop) or "grid" for vertically stacked. */
  layout?: "list" | "grid";
};
// The single project-card implementation. Replaces three near-identical copies
// (the dead home/ProjectCard, project/ProjectCard with its own inlined
// gradientFor, and FeaturedProjects' local FeaturedCard). Hover uses the shared
// "-explore" follower cursor on every surface (the old grid card had a separate
// CSS badge); the title is an <h3> wrapped in an <article> so each card is a
// self-contained landmark in the outline (h1 → h2 → h3).
export default function ProjectCard({
  project,
  theme = "ink",
  tall = false,
  layout = "grid", // Defaulting to the stacked grid layout
}: ProjectCardProps) {
  const text = theme === "ink" ? "text-ink" : "text-paper";
  const muted = theme === "ink" ? "text-ink/70" : "text-paper/70";
  const isGrid = layout === "grid";

  return (
    <article className={isGrid ? "h-full" : ""}>
      <Link
        href={`/projects/${project.slug}`}
        aria-label={project.name}
        data-cursor="-explore"
        data-cursor-text="Explore"
        className={`group ${text} ${
          isGrid
            ? "flex h-full flex-col"
            : // No md: breakpoint on grid-cols ensures it stays side-by-side on mobile
              "grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] items-center gap-6 md:gap-16"
        }`}
      >
        <MediaFrame
          className={isGrid && tall ? "aspect-500/675" : "aspect-[16/10]"}
        >
          {project.detail?.cover ? (
            <Image
              src={project.detail.cover}
              alt={project.name}
              fill
              sizes="(min-width: 768px) 70vw, 100vw"
              className="object-cover transition-transform duration-[1.2s] ease-reveal group-hover:scale-105"
            />
          ) : (
            <>
              <div
                className="absolute inset-0 transition-transform duration-[1.2s] ease-reveal group-hover:scale-105"
                style={{ background: gradientFor(project.slug) }}
              />
              <div
                className="absolute inset-0 opacity-[0.12] mix-blend-overlay transition-transform duration-[1.2s] ease-reveal group-hover:scale-105"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 30% 25%, rgba(255,255,255,0.6), transparent 45%)",
                }}
              />
            </>
          )}
        </MediaFrame>

        <h3
          className={`text-lg font-normal leading-tight tracking-apple-body md:text-xl ${
            isGrid ? "mt-6 max-w-[75%] md:mt-8" : "max-w-xl"
          }`}
        >
          <b className="font-semibold">{project.name}</b>{" "}
          <span className={muted}>– {project.description}</span>
        </h3>
      </Link>
    </article>
  );
}
