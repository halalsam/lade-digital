import type { Metadata } from "next";
import Navbar from "@/components/shared/Navbar";
import GetInTouch from "@/components/shared/GetInTouch";
import PageHero from "@/components/shared/PageHero";
import Container from "@/components/shared/Container";
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
        <PageHero
          title="Our projects"
          lead="We help bring ideas to life and create digital products that work."
        />
        <section className="overflow-hidden pb-40">
          <Reveal className="block">
            <Container className="mb-16">
              <ProjectGrid />
            </Container>
          </Reveal>
        </section>
      </main>
      <CtaFooter />
    </>
  );
}
