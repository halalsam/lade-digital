import Link from "@/components/transition/TransitionLink";
import RevealText from "../shared/RevealText";
import RevealUp from "../shared/RevealUp";
import PillButton from "../shared/PillButton";
import { getAllPosts, formatDate } from "@/lib/blog";
import { gradientFor } from "@/lib/gradient";

// Panel chrome (rounded-top, ink bg, container, padding) lives in the
// <Section variant="overlap"> wrapper on the home page — this renders content.
export default async function BlogPreview() {
  const posts = (await getAllPosts()).slice(0, 3);

  return (
    <>
      <RevealText as="h2" text="Blog" className="display-xl mb-28 block" />

      <div className="grid gap-10">
        {posts.map((post, i) => (
          <RevealUp key={post.slug} delay={i * 100}>
            <Link
              href={`/blog/${post.slug}`}
              className="group grid items-center gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-16"
            >
                <div className="relative aspect-video overflow-hidden rounded-[20px]">
                  <div
                    className="absolute inset-0 transition-transform duration-500 group-hover:scale-105"
                    style={{ background: gradientFor(post.slug) }}
                  />
                </div>
                <div>
                  <span className="inline-block rounded-full border border-paper px-3 py-1.5 text-sm font-medium uppercase tracking-wide">
                    {post.category}
                  </span>
                  <h3 className="mt-8 text-3xl leading-tight md:text-4xl">
                    {post.title}
                  </h3>
                  <p className="mt-6 text-lg font-medium opacity-50">
                    {formatDate(post.date)}
                  </p>
                </div>
            </Link>
          </RevealUp>
        ))}
      </div>

      <div className="mt-32 text-center">
        <PillButton href="/blog" label="Visit our blog" variant="paper" />
      </div>
    </>
  );
}
