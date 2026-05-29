import Link from "next/link";
import RevealText from "../shared/RevealText";
import PillButton from "../shared/PillButton";
import { FEATURED_LEFT, FEATURED_RIGHT, type FeaturedProject } from "@/lib/projects";
import { gradientFor } from "@/lib/gradient";

function FeaturedCard({ project }: { project: FeaturedProject }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      aria-label={project.name}
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
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/60 px-6 py-2 text-base uppercase tracking-wide opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
          Explore
        </span>
      </div>
      <p className="mt-8 max-w-[75%] text-xl leading-tight">
        <b className="font-semibold">{project.name}</b>{" "}
        <span className="text-paper/70">– {project.description}</span>
      </p>
    </Link>
  );
}

export default function FeaturedProjects() {
  return (
    <section className="relative text-paper">
      <div className="rounded-t-[80px] bg-[#161616] pb-2 pt-36">
        <div className="mx-auto max-w-[1600px] px-6 md:px-12 lg:px-60">
          <RevealText
            as="h2"
            text="Featured projects"
            className="display-xl mb-28 block"
          />

          {/* Offset two columns: right column starts lower */}
          <div className="grid gap-x-24 md:grid-cols-2">
            <div className="grid gap-24">
              {FEATURED_LEFT.map((p) => (
                <FeaturedCard key={p.slug} project={p} />
              ))}
            </div>
            <div className="mt-24 grid gap-24 md:mt-[331px]">
              {FEATURED_RIGHT.map((p) => (
                <FeaturedCard key={p.slug} project={p} />
              ))}
            </div>
          </div>

          <div className="mt-32 text-center">
            <PillButton
              href="/projects"
              label="View all projects"
              variant="paper"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
