import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

// Served at /robots.txt. Allows all crawling and points to the sitemap so
// search engines can discover every page (including blog posts).
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: absoluteUrl("/sitemap.xml"),
    host: absoluteUrl("/"),
  };
}
