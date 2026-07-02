import PillButton from "@/components/shared/PillButton";
import Container from "@/components/shared/Container";

// Contact body, styled for the light page (ink on paper) — a counterpart to the
// dark contact block in CtaFooter. Two office addresses with tappable
// email/phone pills, plus the studio's socials laid out as bordered chips.

const OFFICES = [
  {
    label: "Main office",
    address: "901 N Pitt Street, Alexandria VA, 22314",
    contact: { label: "info@lade.digital", href: "mailto:info@lade.digital" },
  },
  {
    label: "Second office",
    address: "Na Perstyne 342/1, 11000 Prague",
    contact: { label: "+1 301 549 9309", href: "tel:+13015499309" },
  },
];

const SOCIALS = [
  { name: "Instagram", href: "https://www.instagram.com/ladedesign/" },
  { name: "YouTube", href: "https://www.youtube.com/channel/UCzestFrXpwSGCfcbO2pObwQ" },
  { name: "GitHub", href: "https://github.com/Lade" },
  { name: "Facebook", href: "https://www.facebook.com/Lade.design/" },
];

export default function ContactDetails() {
  return (
    <section className="pb-28">
      <Container width="wide">
        <div className="grid gap-16 border-t border-ink/10 pt-16 lg:grid-cols-2">
          {/* Offices */}
          <div className="flex flex-col gap-12 sm:flex-row sm:gap-24">
            {OFFICES.map((office) => (
              <address key={office.label} className="not-italic">
                <div className="mb-6">
                  <PillButton
                    href={office.contact.href}
                    label={office.contact.label}
                    variant="ink"
                    size="md"
                    external={office.contact.href.startsWith("http")}
                  />
                </div>
                <span className="mr-2 block text-base uppercase opacity-50">
                  {office.label}
                </span>
                <span className="block text-lg font-medium leading-relaxed">
                  {office.address}
                </span>
              </address>
            ))}
          </div>

         
        </div>
      </Container>
    </section>
  );
}
