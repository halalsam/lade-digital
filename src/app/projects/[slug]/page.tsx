import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Navbar from "@/components/shared/Navbar";
import GetInTouch from "@/components/shared/GetInTouch";
import CtaFooter from "@/components/shared/CtaFooter";
import RevealText from "@/components/shared/RevealText";
import Reveal from "@/components/shared/Reveal";
import RevealUp from "@/components/shared/RevealUp";
import Line from "@/components/shared/Line";
import Link from "@/components/transition/TransitionLink";
import ProjectMedia from "@/components/project/ProjectMedia";
import { gradientFor } from "@/lib/gradient";
import { absoluteUrl, SITE_NAME } from "@/lib/site";
import {
  PROJECTS,
  CATEGORY_LABEL,
  getProject,
  getNextProject,
  getProjectDetail,
} from "@/lib/projects";

type Params = { slug: string };

// Every project page is known at build time → fully static.
export function generateStaticParams(): Params[] {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project not found" };

  const url = `/projects/${project.slug}`;
  const description = project.detail?.tagline ?? project.description;
  return {
    title: `${project.name} — ${project.description}`,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: `${project.name} — ${SITE_NAME}`,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.name} — ${SITE_NAME}`,
      description,
    },
  };
}

const WRAP = "mx-auto w-full max-w-[1400px] px-6 md:px-12";

// One detail row in the meta strip / info column.
function Meta({ term, value }: { term: string; value: string }) {
  return (
    <div>
      <dt className="eyebrow opacity-50">{term}</dt>
      <dd className="mt-2 text-lg font-medium leading-snug">{value}</dd>
    </div>
  );
}

// Label-left / body-right block, echoing the Solutions layout on /services.
function InfoRow({ label, body }: { label: string; body: string }) {
  return (
    <RevealUp>
      <div className="mb-10 mt-20 first:mt-0">
        <Line />
      </div>
      <div className="flex flex-col gap-8 md:flex-row md:gap-12">
        <div className="flex-1">
          <h3 className="eyebrow opacity-50">{label}</h3>
        </div>
        <div className="flex-1">
          <p className="max-w-140 text-xl leading-tight tracking-[0.01em] md:text-[1.625rem]">
            {body}
          </p>
        </div>
      </div>
    </RevealUp>
  );
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const detail = getProjectDetail(project);
  const next = getNextProject(slug);
  const categoryLabel = project.categories
    .map((c) => CATEGORY_LABEL[c])
    .join(" · ");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.name,
    description: detail.tagline,
    creator: { "@type": "Organization", name: SITE_NAME },
    url: absoluteUrl(`/projects/${project.slug}`),
    ...(detail.year !== "—" ? { dateCreated: detail.year } : {}),
  };

  return (
    <>
      <script
        type="application/ld+json"
        // Server-rendered static string; safe to inline.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <GetInTouch />
      <main>
        <article className="overflow-hidden pb-28 pt-36 md:pt-52">
          {/* Hero */}
          <header className={WRAP}>

            <Link
              href="/projects"
              className="mb-10 inline-block text-base uppercase opacity-50 transition-opacity hover:opacity-100"
            ><span ></span>
              All projects
            </Link>

            {/* <div className="eyebrow flex flex-wrap items-center gap-x-3 opacity-50">
              <span>{categoryLabel}</span>
              {detail.year !== "—" && (
                <>
                  <span aria-hidden>—</span>
                  <span>{detail.year}</span>
                </>
              )}
            </div> */}

            <RevealText
              as="h1"
              text={project.name}
              className="display-xl mt-6 block"
              stagger={0.06}
            />

            <p className="mt-8 max-w-190 text-xl leading-tight tracking-apple-body text-ink/70 md:text-2xl">
              {detail.tagline}
            </p>
          </header>

          {/* Meta strip */}
          <dl
            className={`${WRAP} mt-14 grid grid-cols-2 gap-x-8 gap-y-10 border-t border-ink/10 pt-10 md:grid-cols-4`}
          >
            <Meta term="Sector" value={detail.sector} />
            {detail.year !== "—" && <Meta term="Year" value={detail.year} />}
            <Meta term="Platform" value={categoryLabel} />
            <Meta
              term="Scope"
              value={detail.deliverables.slice(0, 3).join(", ")}
            />
          </dl>

          {/* Cover */}
          <Reveal className={`${WRAP} mt-14 block`}>
            <ProjectMedia
              seed={`${project.slug}-cover`}
              src={detail.cover}
              alt={`${project.name} — cover`}
              aspect="ultrawide"
              label={`${project.name} — hero`}
              sizes="(min-width: 1400px) 1400px, 100vw"
            />
          </Reveal>

          {/* Overview */}
          <section className={`${WRAP} mt-28 md:mt-40`}>
            <div className="grid gap-10 md:grid-cols-12">
              <div className="md:col-span-4">
                <h2 className="eyebrow opacity-50">Overview</h2>
              </div>
              <div className="md:col-span-8">
                <RevealUp>
                  <p className="text-2xl leading-apple-subhead tracking-[0.01em] md:text-[1.75rem] lg:text-[2rem]">
                    {detail.overview}
                  </p>
                </RevealUp>
              </div>
            </div>
          </section>

          {/* Challenge & approach */}
          {(detail.challenge || detail.approach) && (
            <section className={`${WRAP} mt-24 md:mt-32`}>
              {detail.challenge && (
                <InfoRow label="The challenge" body={detail.challenge} />
              )}
              {detail.approach && (
                <InfoRow label="Our approach" body={detail.approach} />
              )}
            </section>
          )}

          {/* What we did / built with */}
          <section className={`${WRAP} mt-24 md:mt-32`}>
            <div className="grid gap-12 md:grid-cols-2">
              <RevealUp>
                <h3 className="eyebrow opacity-50">What we did</h3>
                <ul className="mt-6 space-y-3 text-xl leading-snug">
                  {detail.deliverables.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              </RevealUp>
              {detail.stack.length > 0 && (
                <RevealUp>
                  <h3 className="eyebrow opacity-50">Built with</h3>
                  <div className="mt-6 flex flex-wrap gap-3">
                    {detail.stack.map((s) => (
                      <span
                        key={s}
                        className="rounded-full border border-ink/15 px-4 py-2 text-base"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </RevealUp>
              )}
            </div>
          </section>

          {/* Stats */}
          {detail.stats.length > 0 && (
            <section className={`${WRAP} mt-24 md:mt-32`}>
              <RevealUp>
                <div className="grid grid-cols-2 gap-x-8 gap-y-12 border-t border-ink/10 pt-14 md:grid-cols-4">
                  {detail.stats.map((s) => (
                    <div key={s.label}>
                      <div className="text-5xl font-medium tracking-tight md:text-6xl">
                        {s.value}
                      </div>
                      <div className="mt-3 text-base opacity-50">{s.label}</div>
                    </div>
                  ))}
                </div>
              </RevealUp>
            </section>
          )}

          {/* Gallery */}
          {detail.gallery.length > 0 && (
            <section className={`${WRAP} mt-28 md:mt-40`}>
              <h2 className="eyebrow mb-10 opacity-50">Selected screens</h2>
              <div className="grid gap-6 md:grid-cols-2 md:gap-8">
                {detail.gallery.map((item, i) => (
                  <RevealUp
                    key={`${item.label}-${i}`}
                    className={item.full ? "md:col-span-2" : ""}
                  >
                    <ProjectMedia
                      seed={`${project.slug}-${i}`}
                      src={item.src}
                      alt={`${project.name} — ${item.label}`}
                      aspect={item.aspect ?? (item.full ? "ultrawide" : "wide")}
                      label={item.label}
                      sizes={
                        item.full
                          ? "(min-width: 1400px) 1400px, 100vw"
                          : "(min-width: 768px) 50vw, 100vw"
                      }
                    />
                  </RevealUp>
                ))}
              </div>
            </section>
          )}

          {/* Palette */}
          {detail.palette.length > 0 && (
            <section className={`${WRAP} mt-28 md:mt-40`}>
              <h2 className="eyebrow mb-10 opacity-50">Palette</h2>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {detail.palette.map((c) => (
                  <RevealUp key={c.hex}>
                    <div className="overflow-hidden rounded-media border border-ink/10">
                      <div
                        className="aspect-4/3"
                        style={{ background: c.hex }}
                      />
                      <div className="flex items-center justify-between px-4 py-3">
                        <span className="text-sm font-medium">{c.name}</span>
                        <span className="text-sm uppercase opacity-50">
                          {c.hex}
                        </span>
                      </div>
                    </div>
                  </RevealUp>
                ))}
              </div>
            </section>
          )}

          {/* Next project */}
          <section className={`${WRAP} mt-32 md:mt-44`}>
            <p className="eyebrow mb-6 opacity-50">Next project</p>
            <Link
              href={`/projects/${next.slug}`}
              aria-label={`Next project: ${next.name}`}
              data-cursor="-explore"
              data-cursor-text="Explore"
              className="group block"
            >
              <div className="relative aspect-16/8 overflow-hidden rounded-media md:aspect-16/6">
                {next.detail?.cover ? (
                  <Image
                    src={next.detail.cover}
                    alt={next.name}
                    fill
                    sizes="(min-width: 1400px) 1400px, 100vw"
                    className="object-cover transition-transform duration-[1.2s] ease-reveal group-hover:scale-105"
                  />
                ) : (
                  <div
                    className="absolute inset-0 transition-transform duration-[1.2s] ease-reveal group-hover:scale-105"
                    style={{ background: gradientFor(next.slug) }}
                  />
                )}
                <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
                <div className="absolute inset-0 flex items-end p-8 md:p-12">
                  <div>
                    <h3 className="text-4xl font-medium tracking-tight text-paper md:text-6xl">
                      {next.name}
                    </h3>
                    <p className="mt-3 max-w-[44ch] text-lg text-paper/70">
                      {next.description}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </section>
        </article>
      </main>
      <CtaFooter />
    </>
  );
}
