"use client";

import Link from "@/components/transition/TransitionLink";
import PillButton from "./PillButton";
import PlasmaWave from "@/components/PlasmaWave";

const FOOTER_LINKS = [
  { label: "Services", href: "/services" },
  { label: "Blog", href: "/blog" },
  { label: "Projects", href: "/projects" },
  { label: "Workflow", href: "https://hello.cuberto.com/", external: true },
  { label: "Company", href: "/about" },
  { label: "Contacts", href: "/contacts" },
];

const SOCIALS = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/cubertodesign/",
    path: "M12 2.2c3.2 0 3.6 0 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s0 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58 0-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.2 15.58 2.2 15.2 2.2 12s0-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.2 8.8 2.2 12 2.2Zm0 1.8c-3.15 0-3.5 0-4.74.07-.9.04-1.39.2-1.71.32-.43.17-.74.37-1.06.69-.32.32-.52.63-.69 1.06-.13.32-.28.81-.32 1.71C3.4 8.5 3.4 8.85 3.4 12s0 3.5.07 4.74c.04.9.2 1.39.32 1.71.17.43.37.74.69 1.06.32.32.63.52 1.06.69.32.13.81.28 1.71.32 1.24.06 1.59.07 4.74.07s3.5 0 4.74-.07c.9-.04 1.39-.2 1.71-.32.43-.17.74-.37 1.06-.69.32-.32.52-.63.69-1.06.13-.32.28-.81.32-1.71.06-1.24.07-1.59.07-4.74s0-3.5-.07-4.74c-.04-.9-.2-1.39-.32-1.71a2.86 2.86 0 0 0-.69-1.06 2.86 2.86 0 0 0-1.06-.69c-.32-.13-.81-.28-1.71-.32C15.5 4 15.15 4 12 4Zm0 3.06A4.94 4.94 0 1 1 12 17a4.94 4.94 0 0 1 0-9.88Zm0 1.8a3.14 3.14 0 1 0 0 6.28 3.14 3.14 0 0 0 0-6.28Zm5.14-.96a1.15 1.15 0 1 1-2.3 0 1.15 1.15 0 0 1 2.3 0Z",
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/channel/UCzestFrXpwSGCfcbO2pObwQ",
    path: "M22.54 7.42c-.25-.94-.99-1.68-1.93-1.93C18.88 5 12 5 12 5s-6.88 0-8.61.49c-.94.25-1.68.99-1.93 1.93C1 9.15 1 12 1 12s0 2.85.46 4.58c.25.94.99 1.68 1.93 1.93C5.12 19 12 19 12 19s6.88 0 8.61-.49c.94-.25 1.68-.99 1.93-1.93C23 14.85 23 12 23 12s0-2.85-.46-4.58ZM9.8 15.3V8.7l5.7 3.3-5.7 3.3Z",
  },
  {
    name: "GitHub",
    href: "https://github.com/Cuberto",
    path: "M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.56 9.56 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z",
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/Cuberto.design/",
    path: "M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.23.2 2.23.2v2.46h-1.26c-1.24 0-1.62.77-1.62 1.56V12h2.77l-.44 2.89h-2.33v6.99A10 10 0 0 0 22 12Z",
  },
  {
    name: "Dribbble",
    href: "https://dribbble.com/cuberto",
    path: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm6.6 4.61a8.46 8.46 0 0 1 1.92 5.29c-.28-.06-3.08-.63-5.9-.27-.06-.14-.12-.29-.18-.44-.18-.43-.38-.86-.59-1.28 3.12-1.27 4.54-3.1 4.75-3.3ZM12 3.49c2.13 0 4.07.8 5.55 2.11-.18.25-1.45 1.96-4.46 3.09a43.3 43.3 0 0 0-3.16-4.94c.66-.16 1.36-.26 2.07-.26ZM8.27 4.33a52 52 0 0 1 3.13 4.87c-3.95 1.05-7.43 1.03-7.81 1.03A8.53 8.53 0 0 1 8.27 4.33ZM3.48 12v-.26c.36 0 4.45.06 8.66-1.2.24.47.47.95.68 1.43l-.33.1c-4.36 1.4-6.67 5.25-6.86 5.57A8.46 8.46 0 0 1 3.48 12Zm8.52 8.52a8.46 8.46 0 0 1-5.23-1.8c.15-.31 1.83-3.54 6.6-5.21l.06-.02c1.19 3.08 1.68 5.67 1.8 6.41a8.43 8.43 0 0 1-3.23.62Zm4.68-1.41c-.09-.51-.53-2.98-1.64-6.02 2.66-.42 4.98.27 5.27.36a8.5 8.5 0 0 1-3.63 5.66Z",
  },
  {
    name: "Behance",
    href: "https://www.behance.net/cuberto",
    path: "M8.2 8.6c.5 0 .96.04 1.38.13.42.08.77.22 1.07.42.3.2.53.46.7.8.16.33.24.75.24 1.25 0 .54-.12.99-.37 1.35-.24.36-.6.65-1.08.88.66.19 1.15.52 1.47.99.33.47.49 1.04.49 1.7 0 .54-.1 1-.31 1.39-.21.39-.49.7-.84.95-.36.24-.77.42-1.23.54-.46.11-.94.17-1.42.17H3V8.6h5.2Zm-.31 3.96c.41 0 .75-.1 1.02-.3.27-.19.4-.51.4-.95 0-.24-.04-.44-.13-.6a.95.95 0 0 0-.36-.36 1.5 1.5 0 0 0-.52-.18 3.3 3.3 0 0 0-.6-.05H5.4v2.44h2.5Zm.14 4.16c.23 0 .44-.02.65-.07.2-.04.39-.12.54-.22a1.1 1.1 0 0 0 .38-.42c.1-.18.14-.4.14-.68 0-.54-.15-.92-.45-1.16-.3-.23-.7-.34-1.2-.34H5.4v2.89h2.78ZM16.3 16.7c.34.33.83.5 1.47.5.46 0 .85-.12 1.18-.35.33-.23.53-.47.61-.73h1.9c-.31.94-.77 1.62-1.4 2.02-.62.4-1.38.6-2.27.6-.62 0-1.18-.1-1.67-.3a3.5 3.5 0 0 1-1.26-.85 3.8 3.8 0 0 1-.79-1.32 4.96 4.96 0 0 1-.28-1.7c0-.6.1-1.16.29-1.67.19-.51.46-.96.81-1.33.35-.38.77-.67 1.26-.89.49-.21 1.03-.32 1.62-.32.66 0 1.24.13 1.73.39.5.25.9.6 1.22 1.03.32.43.55.93.69 1.48.14.56.19 1.14.15 1.74h-5.62c0 .65.22 1.15.56 1.42Zm2.57-3.86c-.27-.3-.69-.45-1.24-.45-.36 0-.66.06-.9.18-.23.13-.42.28-.56.46-.14.18-.24.37-.3.57-.05.2-.08.38-.09.54h3.48c-.05-.55-.24-.99-.39-1.3ZM15.5 9.4h4.34v1.05H15.5V9.4Z",
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
      <div className="relative z-10 mx-auto max-w-[1600px] px-6 pb-28 md:px-12 lg:px-[7.5rem]">
        <div className="grid gap-16 lg:grid-cols-2">
          {/* Contact blocks */}
          <div className="flex flex-col gap-12 sm:flex-row sm:gap-24">
            <address className="not-italic">
              <div className="mb-6">
                <PillButton
                  href="mailto:info@cuberto.com"
                  label="info@cuberto.com"
                  variant="paper"
                  size="md"
                />
              </div>
              <span className="mr-2 text-base uppercase opacity-50">
                Main office
              </span>
              <span className="text-lg font-medium leading-relaxed">
                901 N Pitt Street, Alexandria VA, 22314
              </span>
            </address>

            <address className="not-italic">
              <div className="mb-6">
                <PillButton
                  href="tel:+13015499309"
                  label="+1 301 549 9309"
                  variant="paper"
                  size="md"
                />
              </div>
              <span className="mr-2 text-base uppercase opacity-50">
                Second office
              </span>
              <span className="text-lg font-medium leading-relaxed">
                Na Perstyne 342/1, 11000 Prague
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
            <Link href="/privacy" className="text-base hover:opacity-60">
              Privacy Policy
            </Link>
            <span className="text-base opacity-50">2026, Cuberto</span>
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
      </div>
    </footer>
  );
}
