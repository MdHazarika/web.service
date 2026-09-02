"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, Target, Layers, Zap } from "lucide-react";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

const stories = [
  {
    client: "MedFlow",
    industry: "Healthcare",
    challenge: "Patients were dropping off during appointment scheduling due to a slow, confusing form.",
    solution: "We built a fast, accessible booking flow with reminders and EHR integration.",
    technology: "Next.js, Node.js, PostgreSQL, Tailwind",
    results: [
      { label: "Booking conversion", value: "+64%" },
      { label: "Page speed", value: "0.9s" },
      { label: "Support tickets", value: "-40%" },
    ],
    performance: "Lighthouse 98 / 100",
    color: "#7c3aed",
  },
  {
    client: "Nova Retail",
    industry: "E-commerce",
    challenge: "Cart abandonment was high and the mobile experience was broken on many devices.",
    solution: "A custom headless storefront with optimized checkout, mobile-first design, and search.",
    technology: "Next.js, Stripe, Redis, Vercel",
    results: [
      { label: "Conversion rate", value: "+42%" },
      { label: "Mobile revenue", value: "+58%" },
      { label: "Load time", value: "1.1s" },
    ],
    performance: "Core Web Vitals green across all regions",
    color: "#22c55e",
  },
  {
    client: "Apex Finance",
    industry: "Finance",
    challenge: "The brand looked outdated and prospects did not trust the online consultation flow.",
    solution: "A premium, secure site with client portal, live chat, and automated proposal generation.",
    technology: "Next.js, TypeScript, AWS, Cloudflare",
    results: [
      { label: "Qualified leads", value: "+120%" },
      { label: "Bounce rate", value: "-35%" },
      { label: "Uptime", value: "99.99%" },
    ],
    performance: "Lighthouse 100 on SEO & Accessibility",
    color: "#3b82f6",
  },
];

export function SuccessStories() {
  const [open, setOpen] = useState<string | null>(stories[0].client);

  return (
    <section className="bg-charcoal/30 py-24">
      <div className="container">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-bold sm:text-4xl">Success Stories</h2>
          <p className="mt-4 text-muted">Real results for real clients. Challenge, solution, technology, and impact.</p>
        </Reveal>

        <div className="mt-16 space-y-4">
          {stories.map((story, i) => {
            const isOpen = open === story.client;
            return (
              <Reveal key={story.client} delay={i * 0.1}>
                <motion.div
                  layout
                  className={cn(
                    "overflow-hidden rounded-3xl border transition-colors",
                    isOpen ? "border-accent/30 bg-charcoal/60" : "border-white/10 bg-charcoal/40 hover:border-white/20"
                  )}
                >
                  <button
                    onClick={() => setOpen(isOpen ? null : story.client)}
                    className="flex w-full items-center justify-between p-6 text-left sm:p-8"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl text-lg font-bold text-white" style={{ backgroundColor: story.color }}>
                        {story.client.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-heading text-xl font-semibold text-foreground">{story.client}</h3>
                        <p className="text-sm text-muted">{story.industry}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-sm font-medium text-accent">
                      <TrendingUp size={16} /> {story.results[0].value}
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="grid gap-6 border-t border-white/10 p-6 sm:grid-cols-2 sm:p-8">
                          <div className="space-y-4">
                            <div className="flex items-start gap-3">
                              <Target size={18} className="mt-0.5 text-accent" />
                              <div>
                                <p className="font-medium text-foreground">Challenge</p>
                                <p className="text-sm text-muted">{story.challenge}</p>
                              </div>
                            </div>
                            <div className="flex items-start gap-3">
                              <Zap size={18} className="mt-0.5 text-accent" />
                              <div>
                                <p className="font-medium text-foreground">Solution</p>
                                <p className="text-sm text-muted">{story.solution}</p>
                              </div>
                            </div>
                            <div className="flex items-start gap-3">
                              <Layers size={18} className="mt-0.5 text-accent" />
                              <div>
                                <p className="font-medium text-foreground">Technology</p>
                                <p className="text-sm text-muted">{story.technology}</p>
                              </div>
                            </div>
                          </div>

                          <div className="rounded-2xl border border-white/10 bg-charcoal/50 p-6">
                            <p className="font-medium text-foreground">Results</p>
                            <div className="mt-4 grid gap-4 sm:grid-cols-3">
                              {story.results.map((r) => (
                                <div key={r.label} className="text-center">
                                  <p className="font-heading text-2xl font-bold" style={{ color: story.color }}>{r.value}</p>
                                  <p className="mt-1 text-xs text-muted">{r.label}</p>
                                </div>
                              ))}
                            </div>
                            <p className="mt-4 text-sm text-muted">
                              <strong className="text-foreground">Performance:</strong> {story.performance}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
