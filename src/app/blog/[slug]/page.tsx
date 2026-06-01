import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import Navbar from "@/components/shared/Navbar";
import GetInTouch from "@/components/shared/GetInTouch";
import CtaFooter from "@/components/shared/CtaFooter";
import RevealText from "@/components/shared/RevealText";
import Reveal from "@/components/shared/Reveal";
import Link from "@/components/transition/TransitionLink";
import { getPost, getPostSlugs, formatDate } from "@/lib/blog";
import { gradientFor } from "@/lib/gradient";
import { absoluteUrl, SITE_NAME } from "@/lib/site";

type Params = { slug: string };

// Pre-render every post at build time (file-based, so the set is known).
export async function generateStaticParams(): Promise<Params[]> {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Post not found" };

  const url = `/blog/${post.slug}`;
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: post.title,
      description: post.excerpt,
      publishedTime: post.date || undefined,
      authors: post.author ? [post.author] : undefined,
      section: post.category,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

// Tailwind-styled renderers for the MDX body, matching the ink/paper editorial
// look (no @tailwindcss/typography dependency — just per-element classes).
const components = {
  h2: (props: React.ComponentProps<"h2">) => (
    <h2 className="mt-16 mb-6 text-3xl font-medium leading-tight md:text-4xl" {...props} />
  ),
  h3: (props: React.ComponentProps<"h3">) => (
    <h3 className="mt-12 mb-4 text-2xl font-medium leading-tight" {...props} />
  ),
  p: (props: React.ComponentProps<"p">) => (
    <p className="mt-6 text-lg leading-relaxed opacity-80" {...props} />
  ),
  ul: (props: React.ComponentProps<"ul">) => (
    <ul className="mt-6 list-disc space-y-2 pl-6 text-lg leading-relaxed opacity-80" {...props} />
  ),
  ol: (props: React.ComponentProps<"ol">) => (
    <ol className="mt-6 list-decimal space-y-2 pl-6 text-lg leading-relaxed opacity-80" {...props} />
  ),
  li: (props: React.ComponentProps<"li">) => <li className="pl-1" {...props} />,
  a: (props: React.ComponentProps<"a">) => (
    <a className="underline underline-offset-4 transition-opacity hover:opacity-60" {...props} />
  ),
  strong: (props: React.ComponentProps<"strong">) => (
    <strong className="font-semibold opacity-100" {...props} />
  ),
};

export default async function BlogPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  // JSON-LD Article schema → eligibility for rich results in search. Uses the
  // gradient cover as the image (absolute URLs required by schema.org).
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date || undefined,
    dateModified: post.date || undefined,
    articleSection: post.category,
    author: { "@type": "Organization", name: post.author ?? SITE_NAME },
    publisher: { "@type": "Organization", name: SITE_NAME },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": absoluteUrl(`/blog/${post.slug}`),
    },
    url: absoluteUrl(`/blog/${post.slug}`),
  };

  return (
    <>
      <script
        type="application/ld+json"
        // Server-rendered static string; safe to inline.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <GetInTouch />
      <main>
        <article className="px-6 pb-28 pt-48 md:px-12 md:pt-52 lg:px-60">
          <div className="mx-auto w-full max-w-4xl">
            <Link
              href="/blog"
              className="mb-10 inline-block text-base uppercase opacity-50 transition-opacity hover:opacity-100"
            >
              ← Back to blog
            </Link>

            <span className="eyebrow block opacity-50">{post.category}</span>
            <RevealText
              as="h1"
              text={post.title}
              className="display-xl mt-6 block"
              stagger={0.05}
            />
            <p className="mt-8 text-lg font-medium opacity-50">
              {formatDate(post.date)}
              {post.author ? ` · ${post.author}` : ""}
            </p>

            <Reveal className="mt-12 block">
              <div
                className="aspect-video w-full overflow-hidden rounded-[20px]"
                style={{ background: gradientFor(post.slug) }}
              />
            </Reveal>

            <div className="mt-16">
              <MDXRemote source={post.content} components={components} />
            </div>
          </div>
        </article>
      </main>
      <CtaFooter />
    </>
  );
}
