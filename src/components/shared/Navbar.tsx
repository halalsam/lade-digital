"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Logo from "./Logo";

const NAV_LINKS = [
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Company", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contacts", href: "/contacts" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
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
    <header>
      <div
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          scrolled
            ? "bg-paper/90 backdrop-blur-md backdrop-saturate-150"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-20 max-w-[1600px] items-center justify-between px-6 md:px-12 lg:px-[7.5rem]">
          <Link href="/" aria-label="Home" className="relative z-50 text-ink">
            <Logo className="h-5 w-auto" />
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden items-center md:flex md:-mr-5">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group relative block overflow-hidden px-5 py-1.5 text-xl text-ink"
              >
                <span className="block transition-transform duration-700 ease-[var(--ease-reveal)] group-hover:-translate-y-full">
                  {link.label}
                </span>
                <span className="absolute left-5 top-1.5 block translate-y-full transition-transform duration-700 ease-[var(--ease-reveal)] group-hover:translate-y-0">
                  {link.label}
                </span>
              </Link>
            ))}
          </nav>

          {/* Mobile menu toggle */}
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="relative z-50 flex h-6 w-9 flex-col items-center justify-center md:hidden"
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
              className="py-1.5 text-4xl font-medium tracking-tight text-ink"
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
