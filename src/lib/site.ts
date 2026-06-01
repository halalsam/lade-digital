// Single source of truth for the site's identity, used by metadata
// (metadataBase, canonicals, OG), the sitemap, robots, and JSON-LD.
//
// SITE_URL must be an absolute origin (no trailing slash). Set it per
// environment via NEXT_PUBLIC_SITE_URL — e.g. https://lade.studio. The
// localhost fallback keeps dev/build working before the real domain is set.

const RAW_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

/** Absolute site origin, normalized without a trailing slash. */
export const SITE_URL = RAW_URL.replace(/\/$/, "");

export const SITE_NAME = "Lade";

export const SITE_DESCRIPTION =
  "We design and build websites, platforms, mobile apps, and brands. A full-spectrum studio going beyond what's possible.";

/** Build an absolute URL from a site-relative path (e.g. "/blog"). */
export function absoluteUrl(path = "/"): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
