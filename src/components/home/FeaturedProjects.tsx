import Link from "@/components/transition/TransitionLink";
import RevealText from "../shared/RevealText";
import RevealUp from "../shared/RevealUp";
import PillButton from "../shared/PillButton";
import { FEATURED_LEFT, FEATURED_RIGHT, type FeaturedProject } from "@/lib/projects";
import { gradientFor } from "@/lib/gradient";

function FeaturedCard({ project }: { project: FeaturedProject }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      aria-label={project.name}
      data-cursor="-explore"
      data-cursor-text="Explore"
      className="group block text-paper"
    >
      <div
        className={`relative overflow-hidden rounded-[20px] ${
          project.tall ? "aspect-[500/675]" : "aspect-square"
        }`}
      >
        <div
          className="absolute inset-0 transition-transform duration-[1.2s] ease-[var(--ease-reveal)] group-hover:scale-105"
          style={{ background: gradientFor(project.slug) }}
        />
      </div>
      <p className="mt-8 max-w-[75%] text-xl leading-tight">
        <b className="font-semibold">{project.name}</b>{" "}
        <span className="text-paper/70">– {project.description}</span>
      </p>
    </Link>
  );
}

// Panel chrome (rounded-top, dark bg, container, padding) lives in the
// <Section variant="overlap"> wrapper on the home page — this renders content.
export default function FeaturedProjects() {
  return (
    <>
      <RevealText
        as="h2"
        text="Featured projects"
        className="display-xl mb-28 block"
      />

      {/* Offset two columns: right column starts lower */}
      <div className="grid gap-x-24 md:grid-cols-2">
        <div className="grid gap-24">
          {FEATURED_LEFT.map((p, i) => (
            <RevealUp key={p.slug} delay={i * 100}>
              <FeaturedCard project={p} />
            </RevealUp>
          ))}
        </div>
        <div className="mt-24 grid gap-24 md:mt-[331px]">
          {FEATURED_RIGHT.map((p, i) => (
            <RevealUp key={p.slug} delay={i * 100}>
              <FeaturedCard project={p} />
            </RevealUp>
          ))}
        </div>
      </div>

      <div className="my-32 text-center">
        <PillButton href="/projects" label="View all projects" variant="paper" />
      </div>
    </>
  );
}
