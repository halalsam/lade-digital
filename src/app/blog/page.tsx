import type { Metadata } from "next";
import Navbar from "@/components/shared/Navbar";
import GetInTouch from "@/components/shared/GetInTouch";
import CtaFooter from "@/components/shared/CtaFooter";
import Reveal from "@/components/shared/Reveal";
import RevealText from "@/components/shared/RevealText";
import RevealUp from "@/components/shared/RevealUp";
import Link from "@/components/transition/TransitionLink";
import { getAllPosts, formatDate } from "@/lib/blog";
import { gradientFor } from "@/lib/gradient";

export const metadata: Metadata = {
  title: "Blog — Notes on design, motion, and the web",
  description:
    "Essays and dev sources from the studio: how we think about UI/UX, emotional web design, and the small interactions that make a site feel crafted.",
  alternates: { canonical: "/blog" },
  openGraph: {
    type: "website",
    title: "Blog — Notes on design, motion, and the web",
    description:
      "Essays and dev sources from the studio on design, motion, and the web.",
    url: "/blog",
  },
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <>
      <Navbar />
      <GetInTouch />
      <main>
        <section className="relative px-6 pb-28 pt-48 md:px-12 md:pt-52 lg:px-60">
          <div className="mx-auto w-full max-w-[1600px]">
            <RevealText
              as="h1"
              text="Blog"
              className="mb-7 block text-center text-xl"
              delay={0.05}
            />
            <RevealText
              as="h2"
              text="Notes on design, motion, and the web"
              className="display-xl mx-auto block max-w-5xl text-center"
              delay={0.15}
              stagger={0.08}
            />
          </div>
        </section>

        <Reveal className="mx-auto block max-w-[1600px] px-6 pb-40 md:px-12 lg:px-30">
          {posts.length === 0 ? (
            <p className="border-t border-ink/10 pt-16 text-lg opacity-50">
              No posts yet — check back soon.
            </p>
          ) : (
            <div className="grid gap-16 border-t border-ink/10 pt-16">
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
                      <span className="inline-block rounded-full border border-ink/20 px-3 py-1.5 text-sm font-medium uppercase tracking-wide">
                        {post.category}
                      </span>
                      <h3 className="mt-8 text-3xl leading-tight md:text-4xl">
                        {post.title}
                      </h3>
                      {post.excerpt && (
                        <p className="mt-6 max-w-xl text-lg leading-relaxed opacity-70">
                          {post.excerpt}
                        </p>
                      )}
                      <p className="mt-6 text-lg font-medium opacity-50">
                        {formatDate(post.date)}
                      </p>
                    </div>
                  </Link>
                </RevealUp>
              ))}
            </div>
          )}
        </Reveal>
      </main>
      <CtaFooter />
    </>
  );
}
