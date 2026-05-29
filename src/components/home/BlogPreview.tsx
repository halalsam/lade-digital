import Link from "next/link";
import RevealText from "../shared/RevealText";
import PillButton from "../shared/PillButton";
import { BLOG_POSTS } from "@/lib/blog";
import { gradientFor } from "@/lib/gradient";

export default function BlogPreview() {
  return (
    <section className="relative text-paper">
      <div className="rounded-t-[80px] bg-ink pt-36">
        <div className="mx-auto max-w-[1600px] px-6 md:px-12 lg:px-60">
          <RevealText as="h2" text="Blog" className="display-xl mb-28 block" />

          <div className="grid gap-10">
            {BLOG_POSTS.map((post) => (
              <Link
                key={post.slug}
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
                    {post.date}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-32 text-center">
            <PillButton href="/blog" label="Visit our blog" variant="paper" />
          </div>
        </div>
      </div>
    </section>
  );
}
