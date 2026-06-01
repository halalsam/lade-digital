import { promises as fs } from "fs";
import path from "path";
import matter from "gray-matter";

// File-based blog: each post is an .mdx file in /content/blog with frontmatter.
// No database, no CMS — add a file, commit, and it shows up. These helpers read
// on the server (fs); pages render the body with next-mdx-remote.

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export type BlogPost = {
  slug: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  author?: string;
};

export type FullPost = BlogPost & {
  /** Raw MDX body (frontmatter stripped). */
  content: string;
};

function parse(slug: string, raw: string): FullPost {
  const { data, content } = matter(raw);
  return {
    slug,
    title: data.title ?? slug,
    category: data.category ?? "Article",
    date: data.date ?? "",
    excerpt: data.excerpt ?? "",
    author: data.author,
    content,
  };
}

/** Render an ISO date as e.g. "October 23, 2024" (stable, locale-pinned). */
export function formatDate(iso: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(+d)) return iso;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/** All post slugs (filenames without the .mdx extension). */
export async function getPostSlugs(): Promise<string[]> {
  let entries: string[];
  try {
    entries = await fs.readdir(BLOG_DIR);
  } catch {
    return []; // No content dir yet → no posts.
  }
  return entries
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

/** A single post by slug, or null if it doesn't exist. */
export async function getPost(slug: string): Promise<FullPost | null> {
  try {
    const raw = await fs.readFile(path.join(BLOG_DIR, `${slug}.mdx`), "utf8");
    return parse(slug, raw);
  } catch {
    return null;
  }
}

/** All posts' metadata, newest first (for the index + home preview). */
export async function getAllPosts(): Promise<BlogPost[]> {
  const slugs = await getPostSlugs();
  const posts = await Promise.all(
    slugs.map(async (slug) => {
      const raw = await fs.readFile(path.join(BLOG_DIR, `${slug}.mdx`), "utf8");
      const { content: _content, ...meta } = parse(slug, raw);
      return meta;
    }),
  );

  return posts.sort((a, b) => +new Date(b.date) - +new Date(a.date));
}
