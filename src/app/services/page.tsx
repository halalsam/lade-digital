import type { Metadata } from "next";
import Navbar from "@/components/shared/Navbar";
import GetInTouch from "@/components/shared/GetInTouch";
import Hero from "@/components/services/Hero";
import VideoShowcase from "@/components/services/VideoShowcase";
import Solutions from "@/components/services/Solutions";
import Benefits from "@/components/services/Benefits";
import Reveal from "@/components/shared/Reveal";
import CtaFooter from "@/components/shared/CtaFooter";

export const metadata: Metadata = {
  title: "Our Services — Going beyond what's possible",
  description:
    "We design and build websites, platforms, mobile apps, and brands. A full-spectrum studio going beyond what's possible.",
};

export default function ServicesPage() {
  return (
    <>
      <Navbar />
      <GetInTouch />
      <main>
        <Hero />
        <Reveal>
          <VideoShowcase />
        </Reveal>
        <Reveal>
          <Solutions />
        </Reveal>
        <Reveal className="pb-30">
          <Benefits />
        </Reveal>
      </main>
      <CtaFooter />
    </>
  );
}
