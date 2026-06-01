"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { usePathname } from "next/navigation";
import Link from "@/components/transition/TransitionLink";
import Logo from "./Logo";
import { HoverText, hoverTargetClass } from "./HoverButton";

const NAV_LINKS = [
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "Contacts", href: "/contacts" },
];

type NavbarProps = {
  /** override the global --nav-duration (e.g. "0.9s" or 0.9). number → s */
  duration?: string | number;
  /** override the global --nav-ease (e.g. "ease-out" or a cubic-bezier()) */
  ease?: string;
};

export default function Navbar({ duration, ease }: NavbarProps = {}) {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // A link is active if it matches the current path exactly, or is a parent
  // segment of it (e.g. /projects highlighted while on /projects/aurora).
  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  // Only emit override vars when given, so unset props fall through to the
  // global :root defaults. A bare number is read as seconds (matching nav-delay).
  const entrance: CSSProperties = {};
  if (duration !== undefined)
    (entrance as Record<string, string>)["--nav-duration"] =
      typeof duration === "number" ? `${duration}s` : duration;
  if (ease !== undefined) (entrance as Record<string, string>)["--nav-ease"] = ease;

  // Hide the bar when scrolling down past a small threshold, reveal it the
  // moment the user scrolls back up. Always shown near the top of the page.
  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);

      const delta = y - lastY;
      if (y < 80) {
        setHidden(false);
      } else if (Math.abs(delta) > 6) {
        setHidden(delta > 0);
      }
      lastY = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header style={entrance}>
      <div
        style={{
          transition:
            "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.3s ease, backdrop-filter 0.3s ease",
          transform: hidden && !open ? "translateY(-100%)" : "translateY(0)",
          willChange: "transform",
        }}
        className={`fixed inset-x-0 top-0 z-50 ${
          scrolled
            ? "bg-paper/90 backdrop-blur-md backdrop-saturate-150"
            : "bg-transparent"
        }`}
      >


        <div className="mx-auto flex h-20 max-w-400 items-center justify-between px-6 md:px-12 lg:px-30">
          <Link
            href="/"
            aria-label="Home"
            className="nav-reveal relative z-50 text-ink"
            style={{ "--nav-delay": "0.05s" } as CSSProperties}
          >
            <Logo className="h-5 w-auto" />
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden items-center md:flex md:-mr-5">
            {NAV_LINKS.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                data-cursor="-blend -scale"
                aria-current={isActive(link.href) ? "page" : undefined}
                style={{ "--nav-delay": `${0.12 + i * 0.05}s` } as CSSProperties}
                className={`nav-reveal overflow-hidden ${hoverTargetClass}`}
              >
                <HoverText>{link.label}</HoverText>
             
              </Link>
            ))}
          </nav>

          {/* Mobile menu toggle */}
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            style={{ "--nav-delay": "0.12s" } as CSSProperties}
            className="nav-reveal relative z-50 flex h-6 w-9 flex-col items-center justify-center md:hidden"
          >
            <span
              className={`absolute h-0.5 w-7 bg-ink transition-all duration-300 ${
                open ? "rotate-45" : "-translate-y-1.5"
              }`}
            />
            <span
              className={`absolute h-0.5 w-7 bg-ink transition-all duration-300 ${
                open ? "-rotate-45" : "translate-y-1.5"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile full-screen menu */}
      <div
        className={`fixed inset-0 z-40 flex flex-col justify-center bg-paper px-8 transition-[opacity,visibility] duration-300 md:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <p className="eyebrow mb-5 opacity-40">Menu</p>
        <nav className="flex flex-col">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={`py-1.5 text-4xl font-medium tracking-tight text-ink ${
                isActive(link.href) ? "underline underline-offset-8" : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <p className="eyebrow mb-3 mt-12 opacity-40">Get in touch</p>
        <div className="flex flex-col gap-1 text-xl">
          <a href="mailto:info@cuberto.com">info@cuberto.com</a>
          <a href="https://hello.cuberto.com/">Our workflow</a>
        </div>
      </div>
    </header>
  );
}
