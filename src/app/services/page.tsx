import type { Metadata } from "next";
import Navbar from "@/components/shared/Navbar";
import GetInTouch from "@/components/shared/GetInTouch";
import Hero from "@/components/services/Hero";
import VideoShowcase from "@/components/services/VideoShowcase";
import Solutions from "@/components/services/Solutions";
import Benefits from "@/components/services/Benefits";
import Footer from "@/components/shared/Footer";

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
        <VideoShowcase />
        <Solutions />
        <Benefits />
      </main>
      <Footer />
    </>
  );
}
