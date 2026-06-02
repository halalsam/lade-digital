import type { Metadata } from "next";
import Navbar from "@/components/shared/Navbar";
import GetInTouch from "@/components/shared/GetInTouch";
import PageHero from "@/components/shared/PageHero";
import VideoShowcase from "@/components/services/VideoShowcase";
import Solutions from "@/components/services/Solutions";
import Benefits from "@/components/services/Benefits";
import Reveal from "@/components/shared/Reveal";
import CtaFooter from "@/components/shared/CtaFooter";

export const metadata: Metadata = {
  title: "Services — Going beyond what's possible",
  description:
    "We design and build websites, platforms, mobile apps, and brands. A full-spectrum studio going beyond what's possible.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Our Services — Going beyond what's possible",
    description:
      "We design and build websites, platforms, mobile apps, and brands.",
    url: "/services",
  },
};

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <GetInTouch />
      <main>
        <PageHero eyebrow="Our services" title="Going beyond what’s possible" />
        <Reveal>
          <VideoShowcase />
        </Reveal>
        <Reveal>
          <Solutions />
        </Reveal>
        <Reveal>
          <Benefits />
        </Reveal>
      </main>
      <CtaFooter />
    </>
  );
}
