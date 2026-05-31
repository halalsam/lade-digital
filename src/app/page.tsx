import type { Metadata } from "next";
import Navbar from "@/components/shared/Navbar";
import GetInTouch from "@/components/shared/GetInTouch";
import Reveal from "@/components/shared/Reveal";
import Section from "@/components/shared/Section";
import HomeHero from "@/components/home/HomeHero";
import Showreel from "@/components/home/Showreel";
import AboutSummary from "@/components/home/AboutSummary";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import ServicesPreview from "@/components/home/ServicesPreview";
import BlogPreview from "@/components/home/BlogPreview";
import CtaFooter from "@/components/shared/CtaFooter";
import RevealScale from "@/components/shared/RevealScale";

export const metadata: Metadata = {
  title: "Digital Design & Development Agency",
  description:
    "We help companies build scalable digital products with thoughtful design systems and carefully crafted development.",
  openGraph: {
    title: "Digital Design & Development Agency",
    description:
      "We design and build websites, platforms, mobile apps, and brands.",
    type: "website",
  },
};

export default function HomePage() {
  return (
    <>
      <Navbar duration={2} />
      <GetInTouch />
      <main>
        <HomeHero />
        {/* Everything below the hero rises + fades in as it scrolls into view. */}
        <RevealScale duration={2000} delay={100}>
          <Showreel />
        </RevealScale>
        <Reveal className="py-20">
          <AboutSummary />
        </Reveal>
        {/* Each section below is a rounded-top panel that overlaps the previous
            one by 80px (Section variant="overlap"), recreating the stacked
            reveal. Only the panel background differs between them. */}
        <Reveal>
          <Section variant="overlap" bg="#161616" className="pb-30 text-paper">
            <FeaturedProjects />
          </Section>
        </Reveal>
        <Reveal>
          <Section variant="overlap" bg="var(--color-paper)" className="pb-30">
            <ServicesPreview />
          </Section>
        </Reveal>
        <Reveal>
          <Section variant="overlap" bg="var(--color-ink)" className=" text-paper">
            <BlogPreview />
          </Section>
        </Reveal>
      </main>
      <CtaFooter />
    </>
  );
}