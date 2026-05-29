import type { Metadata } from "next";
import { Schibsted_Grotesk } from "next/font/google";
import "./globals.css";

// One cohesive neo-grotesque (a free stand-in for Suisse Intl) used at
// multiple weights, mirroring the single-family editorial look of the source.
const grotesk = Schibsted_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-grotesk",
  display: "swap",
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
    <html lang="en" className={grotesk.variable}>
      <body>{children}</body>
    </html>
  );
}
