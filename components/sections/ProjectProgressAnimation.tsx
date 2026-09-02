"use client";

import { motion } from "framer-motion";
import { Search, Lightbulb, PenTool, Code, Bug, Rocket, Wrench } from "lucide-react";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

const steps = [
  { title: "Discovery", icon: Search, description: "We learn your business, audience, and goals." },
  { title: "Research", icon: Lightbulb, description: "Competitive analysis and UX direction." },
  { title: "Wireframe", icon: PenTool, description: "Low-fidelity layouts and user flows." },
  { title: "UI Design", icon: PenTool, description: "High-fidelity, on-brand visual design." },
  { title: "Development", icon: Code, description: "Clean, scalable code with best practices." },
  { title: "Testing", icon: Bug, description: "QA, performance, accessibility, and SEO." },
  { title: "Launch", icon: Rocket, description: "Deploy, monitor, and optimize." },
  { title: "Maintenance", icon: Wrench, description: "Ongoing support, updates, and growth." },
];

export function ProjectProgressAnimation() {
  return (
    <section className="bg-charcoal/30 py-24">
      <div className="container">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-bold sm:text-4xl">Project Progress</h2>
          <p className="mt-4 text-muted">A refined workflow from first call to continuous growth.</p>
        </Reveal>

        <div className="relative mx-auto mt-16 max-w-3xl">
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-white/10 md:left-1/2" />
          <motion.div
            className="absolute left-8 top-0 w-0.5 bg-accent md:left-1/2"
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            transition={{ duration: 2, ease: "easeInOut" }}
            viewport={{ once: true }}
          />

          {steps.map((s, i) => {
            const Icon = s.icon;
            const left = i % 2 === 0;
            return (
              <Reveal key={s.title} delay={i * 0.1}>
                <div className={cn("relative flex items-center gap-8 py-6", left ? "md:flex-row" : "md:flex-row-reverse")}>
                  <div className={cn("flex-1", left ? "md:text-right" : "md:text-left")}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      viewport={{ once: true }}
                      className={cn("inline-block max-w-xs rounded-2xl border border-white/10 bg-charcoal/60 p-5 text-left shadow-xl backdrop-blur-sm sm:max-w-sm", left ? "md:ml-auto" : "")}
                    >
                      <h3 className="font-heading text-lg font-semibold text-foreground">{s.title}</h3>
                      <p className="mt-1 text-sm text-muted">{s.description}</p>
                    </motion.div>
                  </div>

                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-4 border-charcoal bg-accent text-white shadow-[0_0_20px_rgba(139,92,246,0.4)]"
                  >
                    <Icon size={22} />
                  </motion.div>

                  <div className="flex-1" />
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
