"use client";

import { motion } from "framer-motion";
import { FileText, Download, CheckSquare, Search, Palette, TrendingUp, Users } from "lucide-react";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

const resources = [
  { title: "Website Launch Checklist", icon: CheckSquare, description: "A 40-point checklist to launch a flawless website.", color: "#7c3aed" },
  { title: "SEO Starter Guide", icon: Search, description: "On-page and technical SEO essentials for 2025.", color: "#22c55e" },
  { title: "Branding Guide", icon: Palette, description: "Define your voice, visuals, and positioning.", color: "#f59e0b" },
  { title: "Business Growth Playbook", icon: TrendingUp, description: "Tactics to turn traffic into revenue.", color: "#3b82f6" },
  { title: "Lead Generation Guide", icon: Users, description: "Build funnels that capture high-intent leads.", color: "#ef4444" },
  { title: "Design Audit Template", icon: FileText, description: "Grade your current site against premium standards.", color: "#06b6d4" },
];

export function FreeResources() {
  return (
    <section className="py-24">
      <div className="container">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-bold sm:text-4xl">Free Resources</h2>
          <p className="mt-4 text-muted">Download premium guides and templates to grow your business.</p>
        </Reveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {resources.map((r, i) => {
            const Icon = r.icon;
            return (
              <Reveal key={r.title} delay={i * 0.08}>
                <motion.div
                  whileHover={{ y: -6 }}
                  className="flex h-full flex-col rounded-3xl border border-white/10 bg-charcoal/60 p-6 shadow-xl backdrop-blur-sm transition-colors hover:border-accent/30"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl text-white" style={{ backgroundColor: r.color }}>
                    <Icon size={22} />
                  </div>
                  <h3 className="mt-5 font-heading text-lg font-semibold text-foreground">{r.title}</h3>
                  <p className="mt-2 flex-1 text-sm text-muted">{r.description}</p>
                  <button
                    onClick={() => alert(`Thanks for your interest in ${r.title}. Download coming soon via email.`)}
                    className={cn(
                      "mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 py-3 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
                    )}
                  >
                    <Download size={16} /> Download
                  </button>
                </motion.div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
