"use client";

import Link from "@/components/transition/TransitionLink";
import PillButton from "./PillButton";
import Container from "./Container";
import PlasmaWave from "@/components/PlasmaWave";

const FOOTER_LINKS = [
  { label: "Services", href: "/services",  external: false },
  { label: "Blog", href: "/blog" },
  { label: "Projects", href: "/projects" },
  { label: "Contacts", href: "/contacts" },
];

const SOCIALS = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/lade_digital?igsh=eHQyaGhlb2RyZnU1&utm_source=qr",
    path: "M12 2.2c3.2 0 3.6 0 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s0 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58 0-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.2 15.58 2.2 15.2 2.2 12s0-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.2 8.8 2.2 12 2.2Zm0 1.8c-3.15 0-3.5 0-4.74.07-.9.04-1.39.2-1.71.32-.43.17-.74.37-1.06.69-.32.32-.52.63-.69 1.06-.13.32-.28.81-.32 1.71C3.4 8.5 3.4 8.85 3.4 12s0 3.5.07 4.74c.04.9.2 1.39.32 1.71.17.43.37.74.69 1.06.32.32.63.52 1.06.69.32.13.81.28 1.71.32 1.24.06 1.59.07 4.74.07s3.5 0 4.74-.07c.9-.04 1.39-.2 1.71-.32.43-.17.74-.37 1.06-.69.32-.32.52-.63.69-1.06.13-.32.28-.81.32-1.71.06-1.24.07-1.59.07-4.74s0-3.5-.07-4.74c-.04-.9-.2-1.39-.32-1.71a2.86 2.86 0 0 0-.69-1.06 2.86 2.86 0 0 0-1.06-.69c-.32-.13-.81-.28-1.71-.32C15.5 4 15.15 4 12 4Zm0 3.06A4.94 4.94 0 1 1 12 17a4.94 4.94 0 0 1 0-9.88Zm0 1.8a3.14 3.14 0 1 0 0 6.28 3.14 3.14 0 0 0 0-6.28Zm5.14-.96a1.15 1.15 0 1 1-2.3 0 1.15 1.15 0 0 1 2.3 0Z",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/subhan-shaikh-240017348?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
    path: "M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13Zm1.78 13.02H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z",
  },
];

// Combined CTA + footer. The CTA invites contact over a live PlasmaWave
// background; the footer below holds contact details, navigation, and socials.
export default function CtaFooter() {
  return (
    <footer className="relative bg-ink text-paper">
      {/* CTA */}
      <section className="relative grid place-items-center overflow-hidden text-center md:min-h-[866px] py-32">
        {/* PlasmaWave background, dimmed */}
        <div className="pointer-events-none absolute inset-0 opacity-70">
          <PlasmaWave />
        </div>

        <div className="relative z-10 mx-auto max-w-[1600px] px-6">
          <h2 className="text-6xl font-light leading-none tracking-tight mix-blend-difference md:text-8xl lg:text-[7.5rem]">
            Have
            <br />
            an idea?
          </h2>
          <div className="mt-8 flex justify-center">
            <PillButton
              href="/contacts"
              label="Tell us"
              variant="paper"
              size="lg"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <Container width="wide" className="relative z-10 pb-28">
        <div className="grid gap-16 lg:grid-cols-2">
          {/* Contact blocks */}
          <div className="flex flex-col gap-12 sm:flex-row sm:gap-24">
            <address className="not-italic">
              <div className="mb-6">
                <PillButton
                  href="mailto:info@lade.digital"
                  label="info@lade.digital"
                  variant="paper"
                  size="md"
                />
              </div>
              <span className="mr-2 text-base uppercase opacity-50">
                Office
              </span>
              <span className="text-lg font-medium leading-relaxed">
                Kopar Khairane, Navi Mumbai
              </span>
            </address>
          </div>

          {/* Nav links */}
          <nav className="grid grid-cols-2 gap-x-16 lg:justify-items-end lg:text-right">
            {FOOTER_LINKS.map((link) =>
              link.external ? (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener"
                  className="py-3 text-2xl transition-opacity hover:opacity-60"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className="py-3 text-2xl transition-opacity hover:opacity-60"
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col-reverse items-start justify-between gap-8 md:flex-row md:items-center">
          <div className="flex items-center gap-6">
            <span className="text-base opacity-50">2026, Lade</span>
          </div>

          <div className="flex flex-wrap gap-3">
            {SOCIALS.map((social) => (
              <a
                key={social.name}
                href={social.href}
                title={social.name}
                target="_blank"
                rel="noopener"
                aria-label={social.name}
                className="flex h-14 w-14 items-center justify-center rounded-full border border-paper/20 transition-colors hover:bg-paper hover:text-ink"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                  <path d={social.path} />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
