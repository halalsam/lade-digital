import type { Metadata } from "next";
import Navbar from "@/components/shared/Navbar";
import GetInTouch from "@/components/shared/GetInTouch";
import PageHero from "@/components/shared/PageHero";
import PillButton from "@/components/shared/PillButton";
import ContactForm from "@/components/contact/ContactForm";
import ContactDetails from "@/components/contact/ContactDetails";
import Reveal from "@/components/shared/Reveal";
import CtaFooter from "@/components/shared/CtaFooter";

export const metadata: Metadata = {
  title: "Contact — Let's build something beyond what's possible",
  description:
    "Get in touch with the studio. Tell us about your project, or reach us at our offices in Alexandria VA and Prague.",
  alternates: { canonical: "/contacts" },
  openGraph: {
    title: "Contact — Let's build something beyond what's possible",
    description:
      "Get in touch with the studio. Tell us about your project.",
    url: "/contacts",
  },
};

export default function ContactsPage() {
  return (
    <>
      <Navbar />
      <GetInTouch />
      <main>
        <PageHero
          eyebrow="Get in touch"
          title="Let’s build something beyond what’s possible"
        >
     
        </PageHero>
        <Reveal>
          <ContactForm />
        </Reveal>
        <Reveal>
          <ContactDetails />
        </Reveal>
      </main>
      <CtaFooter />
    </>
  );
}
