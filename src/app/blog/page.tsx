import type { Metadata } from "next";
import Navbar from "@/components/shared/Navbar";
// import GetInTouch from "@/components/shared/GetInTouch";
import CtaFooter from "@/components/shared/CtaFooter";
import Reveal from "@/components/shared/Reveal";
import Container from "@/components/shared/Container";
import PageHero from "@/components/shared/PageHero";
import RevealUp from "@/components/shared/RevealUp";
import BlogPostCard from "@/components/shared/BlogPostCard";
import { getAllPosts } from "@/lib/blog";

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
      {/* <GetInTouch /> */}
      <main>
        <PageHero eyebrow="Blog" title="Notes on design, motion, and the web" />
        <Reveal className="block pb-40">
          <Container width="wide">
            {posts.length === 0 ? (
              <p className="border-t border-ink/10 pt-16 text-lg opacity-50">
                No posts yet — check back soon.
              </p>
            ) : (
              <div className="grid gap-x-8 gap-y-16 border-t border-ink/15 pt-16 md:grid-cols-2 lg:grid-cols-3">
                {posts.map((post, i) => (
                  <RevealUp key={post.slug} delay={i * 100}>
                    <BlogPostCard post={post} showExcerpt layout="grid" />
                  </RevealUp>
                ))}
              </div>
            )}
          </Container>
        </Reveal>
      </main>
      <CtaFooter />
    </>
  );
}
