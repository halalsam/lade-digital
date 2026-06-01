import PillButton from "@/components/shared/PillButton";

// Contact body, styled for the light page (ink on paper) — a counterpart to the
// dark contact block in CtaFooter. Two office addresses with tappable
// email/phone pills, plus the studio's socials laid out as bordered chips.

const OFFICES = [
  {
    label: "Main office",
    address: "901 N Pitt Street, Alexandria VA, 22314",
    contact: { label: "info@cuberto.com", href: "mailto:info@cuberto.com" },
  },
  {
    label: "Second office",
    address: "Na Perstyne 342/1, 11000 Prague",
    contact: { label: "+1 301 549 9309", href: "tel:+13015499309" },
  },
];

const SOCIALS = [
  { name: "Instagram", href: "https://www.instagram.com/cubertodesign/" },
  { name: "YouTube", href: "https://www.youtube.com/channel/UCzestFrXpwSGCfcbO2pObwQ" },
  { name: "Dribbble", href: "https://dribbble.com/cuberto" },
  { name: "Behance", href: "https://www.behance.net/cuberto" },
  { name: "GitHub", href: "https://github.com/Cuberto" },
];

export default function ContactDetails() {
  return (
    <section className="px-6 pb-28 md:px-12 lg:px-30">
      <div className="mx-auto w-full max-w-[1600px]">
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

          {/* Socials */}
          <div className="lg:justify-self-end lg:text-right">
            <span className="mb-6 block text-base uppercase opacity-50">
              Follow us
            </span>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              {SOCIALS.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener"
                  className="rounded-full border border-ink/20 px-5 py-3 text-lg transition-colors hover:bg-ink hover:text-paper"
                >
                  {social.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
