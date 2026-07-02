import type { Metadata } from "next";
import localFont from "next/font/local";
import { TransitionProvider } from "@/components/transition/TransitionProvider";
import { CursorProvider } from "@/components/cursor/CursorProvider";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "@/lib/site";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});


// Author (variable) — the studio's primary typeface, self-hosted and optimized
// through next/font. A single variable file per style spans the full weight
// axis (Extralight 200 → Bold 700) for both upright and italic, exposed as the
// --font-author CSS variable consumed by --font-sans in globals.css.
const author = localFont({
  src: [
    {
      path: "../font/Author_Complete/Fonts/WEB/fonts/Author-Variable.woff2",
      weight: "200 700",
      style: "normal",
    },
    {
      path: "../font/Author_Complete/Fonts/WEB/fonts/Author-VariableItalic.woff2",
      weight: "200 700",
      style: "italic",
    },
  ],
  variable: "--font-author",
  display: "swap",
  fallback: ["system-ui", "arial", "sans-serif"],
});

export const metadata: Metadata = {
  // Resolves all relative metadata URLs (canonicals, OG images) to absolute.
  metadataBase: new URL(SITE_URL),
  // "%s" is filled by each page's title; pages may override with an absolute
  // title (e.g. the home page) to opt out of the suffix.
  title: {
    default: `${SITE_NAME} — Digital Design & Development Studio`,
    template: `%s — ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_US",
    url: "/",
    title: `${SITE_NAME} — Digital Design & Development Studio`,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Digital Design & Development Studio`,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  icons: {
    icon: [
      { url: "/favicon_io/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon_io/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon_io/favicon.ico" },
    ],
    apple: "/favicon_io/apple-touch-icon.png",
  },
  manifest: "/favicon_io/site.webmanifest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body>
        <TransitionProvider>
          <CursorProvider>
            <SmoothScroll>{children}</SmoothScroll>
          </CursorProvider>
        </TransitionProvider>
      </body>
    </html>
  );
}
