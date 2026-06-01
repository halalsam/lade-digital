import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";
import { getAllPosts } from "@/lib/blog";

// Dynamic sitemap: static routes plus every blog post (lastModified from the
// post's frontmatter date). Next serves this at /sitemap.xml.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), changeFrequency: "monthly", priority: 1 },
    { url: absoluteUrl("/services"), changeFrequency: "monthly", priority: 0.8 },
    { url: absoluteUrl("/projects"), changeFrequency: "monthly", priority: 0.8 },
    { url: absoluteUrl("/blog"), changeFrequency: "weekly", priority: 0.7 },
    { url: absoluteUrl("/contacts"), changeFrequency: "yearly", priority: 0.5 },
  ];

  const posts = await getAllPosts();
  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: absoluteUrl(`/blog/${post.slug}`),
    lastModified: post.date ? new Date(post.date) : undefined,
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...postRoutes];
}
