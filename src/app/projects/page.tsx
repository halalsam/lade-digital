import type { Metadata } from "next";
import Navbar from "@/components/shared/Navbar";
import GetInTouch from "@/components/shared/GetInTouch";
import ProjectsHero from "@/components/project/ProjectsHero";
import ProjectGrid from "@/components/project/ProjectGrid";
import Reveal from "@/components/shared/Reveal";
import CtaFooter from "@/components/shared/CtaFooter";

export const metadata: Metadata = {
  title: "Projects — Bringing ideas to life",
  description:
    "Selected work across websites, applications, and branding. We help bring ideas to life and create digital products that work.",
  alternates: { canonical: "/projects" },
  openGraph: {
    title: "Our Projects — Bringing ideas to life",
    description:
      "Selected work across websites, applications, and branding.",
    url: "/projects",
  },
};

export default function ProjectsPage() {
  return (
    <>
      <Navbar />
      <GetInTouch />
      <main>
        <section className="overflow-hidden px-0 pb-40 pt-48 md:pt-52">
          <ProjectsHero />
          <Reveal className="mx-auto mt-16 block max-w-[1600px] px-6 md:px-12 lg:px-60">
            <ProjectGrid />
          </Reveal>
        </section>
      </main>
      <CtaFooter />
    </>
  );
}
