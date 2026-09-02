import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { posts, getPostBySlug } from "@/lib/posts";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { Reveal } from "@/components/sections/Reveal";
import { ButterflyLarge } from "@/components/ui/ButterflyLarge";

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const post = getPostBySlug(params.slug);
  if (!post) return { title: "Post Not Found | InfoMyth Web Service" };
  return {
    title: `${post.title} | InfoMyth Web Service Blog`,
    description: post.excerpt,
  };
}

export default function BlogPostPage({ params }: Props) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  return (
    <main className="relative py-24">
      <ButterflyLarge className="absolute right-8 top-8 z-10 scale-50 opacity-80" />
      <div className="container max-w-3xl">
        <Reveal>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
          >
            <ArrowLeft size={16} />
            Back to blog
          </Link>
        </Reveal>

        <Reveal delay={0.05}>
          <article className="mt-8">
            <span className="w-fit rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
              {post.category}
            </span>
            <h1 className="mt-4 font-heading text-3xl font-bold leading-tight sm:text-4xl">
              {post.title}
            </h1>
            <div className="mt-4 flex items-center gap-4 text-sm text-muted">
              <span className="flex items-center gap-1.5">
                <Calendar size={14} />
                {new Date(post.date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={14} />
                {post.readTime}
              </span>
            </div>

            <div className="mt-8 rounded-2xl border border-white/10 bg-charcoal/40 p-6 sm:p-10">
              <p className="text-lg leading-relaxed text-foreground">
                {post.excerpt}
              </p>
            </div>

            <div className="prose prose-invert mt-10 max-w-none text-muted">
              {post.content.split("\n\n").map((paragraph, i) => (
                <p key={i} className="mb-4 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </article>
        </Reveal>
      </div>
    </main>
  );
}
