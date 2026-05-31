import type { Metadata } from "next";
import localFont from "next/font/local";
import { TransitionProvider } from "@/components/transition/TransitionProvider";
import { CursorProvider } from "@/components/cursor/CursorProvider";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

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
  title: "Our Services — Going beyond what's possible",
  description:
    "We design and build websites, platforms, mobile apps, and brands. A full-spectrum studio going beyond what's possible.",
  openGraph: {
    title: "Our Services — Going beyond what's possible",
    description:
      "We design and build websites, platforms, mobile apps, and brands.",
    type: "website",
  },
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
          <CursorProvider>{children}</CursorProvider>
        </TransitionProvider>
      </body>
    </html>
  );
}
