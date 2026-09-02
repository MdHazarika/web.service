"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Monitor, Search, Smartphone, Tablet, X, ExternalLink } from "lucide-react";
import Link from "next/link";
import { projects, type Project } from "@/lib/projects";
import { MockBrowser } from "@/components/ui/MockBrowser";
import { ButterflyLarge } from "@/components/ui/ButterflyLarge";

function ProjectModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const [device, setDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
      <motion.div
        role="dialog"
        aria-modal="true"
        className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-white/10 bg-charcoal p-6 shadow-2xl"
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-1 text-muted transition-colors hover:text-foreground"
          aria-label="Close project details"
        >
          <X size={24} />
        </button>

        <div className="flex justify-center gap-2">
          {[
            { id: "desktop", icon: Monitor },
            { id: "tablet", icon: Tablet },
            { id: "mobile", icon: Smartphone },
          ].map((d) => {
            const Icon = d.icon;
            return (
              <button
                key={d.id}
                onClick={() => setDevice(d.id as "desktop" | "tablet" | "mobile")}
                className={device === d.id ? "flex items-center gap-2 rounded-lg bg-accent px-3 py-2 text-xs font-medium text-white" : "flex items-center gap-2 rounded-lg bg-white/5 px-3 py-2 text-xs font-medium text-muted transition-colors hover:text-foreground"}
              >
                <Icon size={14} /> {d.id.charAt(0).toUpperCase() + d.id.slice(1)}
              </button>
            );
          })}
        </div>

        <div className="mt-4 flex justify-center overflow-hidden rounded-xl border border-white/10 bg-charcoal/50 p-6">
          <div
            className={"h-56 rounded-xl bg-gradient-to-br " + project.gradient + " transition-all duration-500 " + (device === "desktop" ? "w-full" : device === "tablet" ? "w-3/4" : "w-1/3")}
          />
        </div>

        <h2 className="mt-6 font-heading text-2xl font-bold text-foreground">
          {project.name}
        </h2>
        <p className="mt-1 text-muted">{project.tagline}</p>
        <p className="mt-4 text-sm leading-relaxed text-muted">
          {project.description}
        </p>

        <div className="mt-6">
          <p className="text-sm font-medium text-foreground">Tech stack</p>
          <div className="mt-2 flex flex-wrap gap-2">
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

        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-block rounded-lg bg-white/10 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/20"
        >
          Visit Live Site
        </a>
        <Link
          href={`/work/${project.id}`}
          className="ml-3 mt-8 inline-block rounded-lg bg-accent px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-dark"
        >
          View Case Study
        </Link>
      </motion.div>
    </motion.div>
  );
}

export function PortfolioGrid() {
  const [selected, setSelected] = useState<Project | null>(null);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const categories = ["All", ...Array.from(new Set(projects.flatMap((p) => p.tags)))];
  const filtered = projects.filter(
    (p) =>
      (filter === "All" || p.tags.includes(filter)) &&
      (p.name.toLowerCase().includes(search.toLowerCase()) || p.tagline.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <section id="work" className="relative py-24">
      <ButterflyLarge className="absolute right-8 top-8 z-10 scale-50 opacity-80" />
      <div className="container">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h1 className="font-heading text-3xl font-bold sm:text-4xl">
            Selected work
          </h1>
          <p className="mt-4 text-muted">
            A few recent builds. Click a project to see the full story and tech
            stack.
          </p>
        </motion.div>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search projects..."
              className="rounded-xl border border-white/10 bg-charcoal/60 py-2.5 pl-9 pr-4 text-sm text-foreground outline-none focus:border-accent"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={filter === c ? "rounded-full bg-accent px-3 py-1.5 text-xs font-medium text-white" : "rounded-full border border-white/10 bg-charcoal/60 px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:text-foreground"}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project) => (
            <motion.button
              key={project.id}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-charcoal/40 text-left transition-colors hover:border-accent/50"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              onClick={() => setSelected(project)}
            >
              <MockBrowser
                className="h-48 w-full rounded-t-2xl rounded-b-none border-0 transition-transform duration-500 group-hover:scale-[1.02]"
                title={project.name.toLowerCase().replace(/\s+/g, "") + ".io"}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <h3 className="font-heading text-xl font-bold text-white">
                  {project.name}
                </h3>
                <p className="mt-2 text-sm text-white/80">{project.tagline}</p>
              </div>
              <div className="p-5">
                <h3 className="font-heading text-lg font-semibold text-foreground">
                  {project.name}
                </h3>
                <p className="mt-1 text-sm text-muted">{project.tagline}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-white/5 px-2 py-0.5 text-xs text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <Link
                  href={`/work/${project.id}`}
                  onClick={(e) => e.stopPropagation()}
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:text-accent-light"
                >
                  View case study <ExternalLink size={14} />
                </Link>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
}
