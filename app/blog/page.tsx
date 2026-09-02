import { Metadata } from "next";
import Link from "next/link";
import { posts } from "@/lib/posts";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { Reveal } from "@/components/sections/Reveal";
import { ButterflyLarge } from "@/components/ui/ButterflyLarge";

export const metadata: Metadata = {
  title: "Blog | InfoMyth Web Service",
  description:
    "Insights, strategies, and practical guides on web design, development, and digital growth.",
};

export default function BlogPage() {
  return (
    <main className="relative py-24">
      <ButterflyLarge className="absolute right-8 top-8 z-10 scale-50 opacity-80" />
      <div className="container">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h1 className="font-heading text-3xl font-bold sm:text-4xl">
            Insights & guides
          </h1>
          <p className="mt-4 text-muted">
            Practical thoughts on design, development, and growing your business online.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => (
            <Reveal key={post.slug} delay={i * 0.05}>
              <article className="group flex h-full flex-col rounded-2xl border border-white/10 bg-charcoal/40 p-6 transition-colors hover:border-accent/30">
                <span className="w-fit rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
                  {post.category}
                </span>
                <h2 className="mt-4 font-heading text-xl font-semibold text-foreground">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="transition-colors hover:text-accent"
                  >
                    {post.title}
                  </Link>
                </h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                  {post.excerpt}
                </p>
                <div className="mt-4 flex items-center gap-4 text-xs text-muted">
                  <span className="flex items-center gap-1.5">
                    <Calendar size={14} />
                    {new Date(post.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock size={14} />
                    {post.readTime}
                  </span>
                </div>
                <Link
                  href={`/blog/${post.slug}`}
                  className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-accent transition-colors hover:text-accent-light"
                >
                  Read article <ArrowRight size={16} />
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </main>
  );
}
