import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/lib/projects";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Reveal } from "@/components/sections/Reveal";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.id }));
}

export function generateMetadata({ params }: Props): Metadata {
  const project = projects.find((p) => p.id === params.slug);
  if (!project) return { title: "Case Study Not Found | InfoMyth Web Service" };
  return {
    title: `${project.name} Case Study | InfoMyth Web Service`,
    description: project.description,
  };
}

export default function CaseStudyPage({ params }: Props) {
  const project = projects.find((p) => p.id === params.slug);
  if (!project) notFound();

  const results = [
    { label: "Page Load", value: "< 1s" },
    { label: "Conversion Lift", value: "+32%" },
    { label: "Mobile Score", value: "98/100" },
    { label: "Launch Time", value: "3 weeks" },
  ];

  return (
    <main className="py-24">
      <div className="container max-w-4xl">
        <Reveal>
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
          >
            <ArrowLeft size={16} />
            Back to selected work
          </Link>
        </Reveal>

        <Reveal delay={0.05}>
          <header className="mt-8">
            <h1 className="font-heading text-3xl font-bold leading-tight sm:text-4xl">
              {project.name}
            </h1>
            <p className="mt-2 text-lg text-muted">{project.tagline}</p>
          </header>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-charcoal/40 p-6">
            <div
              className={`h-64 w-full rounded-xl bg-gradient-to-br ${project.gradient} sm:h-80`}
            />
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-charcoal/40 p-6">
              <h2 className="font-heading text-lg font-semibold text-foreground">
                Project overview
              </h2>
              <p className="mt-2 leading-relaxed text-muted">
                {project.description}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-charcoal/40 p-6">
              <h2 className="font-heading text-lg font-semibold text-foreground">
                Tech stack
              </h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full bg-white/5 px-3 py-1 text-xs text-muted"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-8 rounded-2xl border border-white/10 bg-charcoal/40 p-6 sm:p-8">
            <h2 className="font-heading text-lg font-semibold text-foreground">
              Results
            </h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {results.map((r) => (
                <div key={r.label} className="text-center">
                  <p className="font-heading text-3xl font-bold text-foreground">
                    {r.value}
                  </p>
                  <p className="mt-1 text-sm text-muted">{r.label}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.25}>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ size: "lg" }),
                "inline-flex items-center gap-2"
              )}
            >
              <ExternalLink size={18} />
              Visit live site
            </a>
            <Link
              href="/contact"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
            >
              Start a similar project
            </Link>
          </div>
        </Reveal>
      </div>
    </main>
  );
}
