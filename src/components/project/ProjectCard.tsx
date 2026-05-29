import Link from "next/link";
import type { Project } from "@/lib/projects";

// Deterministic gradient per slug so each placeholder cover looks distinct
// (and stable between renders) until real artwork is dropped in.
function gradientFor(slug: string) {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = (hash * 31 + slug.charCodeAt(i)) % 360;
  }
  const a = hash;
  const b = (hash + 55) % 360;
  return `linear-gradient(135deg, hsl(${a} 35% 22%), hsl(${b} 40% 12%))`;
}

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      aria-label={project.name}
      className="group block text-ink"
    >
      <div className="relative aspect-square overflow-hidden rounded-[20px]">
        {/* Placeholder cover — swap for <Image> once real assets exist:
            <Image src={`/assets/projects/${project.slug}/cover.jpg`} ... /> */}
        <div
          className="absolute inset-0 transition-transform duration-[1.2s] ease-[var(--ease-reveal)] group-hover:scale-105"
          style={{ background: gradientFor(project.slug) }}
        />
        <div
          className="absolute inset-0 opacity-[0.12] mix-blend-overlay transition-transform duration-[1.2s] ease-[var(--ease-reveal)] group-hover:scale-105"
          style={{
            backgroundImage:
              "radial-gradient(circle at 30% 25%, rgba(255,255,255,0.6), transparent 45%)",
          }}
        />
        {/* Hover label, echoing the source's "Explore" cursor cue */}
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/60 px-6 py-2 text-base uppercase tracking-wide text-white opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
          Explore
        </span>
      </div>
      <p className="mt-8 max-w-[75%] text-xl leading-tight">
        <b className="font-semibold">{project.name}</b>{" "}
        <span className="text-ink/70">– {project.description}</span>
      </p>
    </Link>
  );
}
