import type { Metadata } from "next";
import Navbar from "@/components/shared/Navbar";
// import GetInTouch from "@/components/shared/GetInTouch";
import Reveal from "@/components/shared/Reveal";
import Section from "@/components/shared/Section";
import PageHero from "@/components/shared/PageHero";
import Showreel from "@/components/home/Showreel";
import AboutSummary from "@/components/home/AboutSummary";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import ServicesPreview from "@/components/home/ServicesPreview";
import BlogPreview from "@/components/home/BlogPreview";
import CtaFooter from "@/components/shared/CtaFooter";
import RevealScale from "@/components/shared/RevealScale";

export const metadata: Metadata = {
  // Absolute title opts the homepage out of the "%s — Lade" template.
  title: { absolute: "Lade — Digital Design & Development Studio" },
  description:
    "We help companies build scalable digital products with thoughtful design systems and carefully crafted development.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Lade — Digital Design & Development Studio",
    description:
      "We design and build websites, platforms, mobile apps, and brands.",
    url: "/",
    type: "website",
  },
};

export default function HomePage() {
  return (
    <>
      <Navbar duration={2} />
      {/* <GetInTouch /> */}
      <main>
        <PageHero
          title="Digital design & development agency"
          lead="We help companies build scalable digital products with thoughtful design systems and carefully crafted development."
          titleDuration={2}
        />
        {/* Everything below the hero rises + fades in as it scrolls into view. */}
        <RevealScale  duration={2000} delay={100}>
          <Showreel />
        </RevealScale>
        <Reveal className="py-20">
          <AboutSummary />
        </Reveal>
        {/* Each section below is a rounded-top panel that overlaps the previous
            one by 80px (Section variant="overlap"), recreating the stacked
            reveal. Only the panel background differs between them. */}
        <Reveal>
          <Section
            variant="overlap"
            bg="#161616"
            className="pb-30 text-paper"
            labelledBy="featured-heading"
          >
            <FeaturedProjects />
          </Section>
        </Reveal>
        <Reveal>
          <Section
            variant="overlap"
            bg="var(--color-paper)"
            className="pb-30"
            labelledBy="services-heading"
          >
            <ServicesPreview />
          </Section>
        </Reveal>
        <Reveal>
          <Section
            variant="overlap"
            bg="var(--color-ink)"
            className=" text-paper"
            labelledBy="blog-heading"
          >
            <BlogPreview />
          </Section>
        </Reveal>
      </main>
      <CtaFooter />
    </>
  );
}