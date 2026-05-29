# Cuberto-style Services Landing Page

A faithful Next.js 16 (App Router) + Tailwind CSS v4 rebuild of the Cuberto
"Our services" page, broken into a clean, modular component per section.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

> The first `npm install` / `dev` requires internet access so `next/font`
> can fetch the Schibsted Grotesk font from Google Fonts.

## Project structure

```
app/
  layout.tsx        Root layout, font loading (next/font), SEO metadata
  page.tsx          Composes all sections in order
  globals.css       Tailwind v4 import, theme tokens, easings, keyframes
components/
  Navbar.tsx        Fixed nav, scroll-aware backdrop, mobile menu overlay
  GetInTouch.tsx    Floating circular CTA with rotating text ring
  Hero.tsx          "Going beyond what's possible" headline
  VideoShowcase.tsx Full-width rounded media block
  Solutions.tsx     Three service rows (data-driven) with hairline dividers
  Benefits.tsx      Dark rounded-top panel with animated SVG icons
  Footer.tsx        Contact blocks, nav links, social icons
  PillButton.tsx    Reusable capsule CTA with rising-fill hover
  RevealText.tsx    Splits headings into staggered rise-in words
  Logo.tsx          Wordmark SVG (uses currentColor for theming)
```

## Notes & customization

- **Fonts:** Schibsted Grotesk is a free stand-in for the original's paid
  Suisse Intl. Swap the `next/font` import in `app/layout.tsx` for your
  licensed face if you have one.
- **Video:** `VideoShowcase` looks for `/public/assets/services/main.mp4`.
  Until you add one, a gradient placeholder keeps the layout intact.
- **Animations:** Headline word reveals, the rotating badge, and the spinning
  benefit icons are pure CSS (see `globals.css`) and respect
  `prefers-reduced-motion`. For scroll-triggered reveals like the original,
  layer in GSAP ScrollTrigger or Motion on top of the existing markup.
- **Content:** Solutions, benefits, footer links, and socials are all simple
  arrays at the top of their components — edit those to change copy.
```
