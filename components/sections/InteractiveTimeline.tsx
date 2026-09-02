"use client";

import { motion } from "framer-motion";
import { Reveal } from "./Reveal";

const steps = [
  { title: "Discovery", desc: "We learn your goals, audience, and competitors." },
  { title: "Planning", desc: "We define the sitemap, tech stack, and content plan." },
  { title: "UI Design", desc: "High-fidelity screens with your brand applied." },
  { title: "Development", desc: "Clean, scalable code with animations and integrations." },
  { title: "Testing", desc: "Cross-browser, performance, and accessibility checks." },
  { title: "Deployment", desc: "Launch with monitoring, analytics, and SEO live." },
  { title: "Support", desc: "Ongoing maintenance, updates, and optimization." },
];

export function InteractiveTimeline() {
  return (
    <section id="timeline" className="py-24">
      <div className="container">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-bold sm:text-4xl">How we bring ideas to life</h2>
          <p className="mt-4 text-muted">A battle-tested process from first call to post-launch growth.</p>
        </Reveal>

        <div className="relative mx-auto mt-16 max-w-3xl">
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-white/10 md:left-1/2 md:-translate-x-px" />
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              className={`relative mb-12 flex items-center md:justify-between ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="hidden w-[45%] md:block" />
              <div className="absolute left-4 z-10 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full border border-accent bg-charcoal text-xs font-bold text-accent md:left-1/2">
                {i + 1}
              </div>
              <div className="pl-12 md:w-[45%] md:pl-0">
                <div className={`rounded-2xl border border-white/10 bg-charcoal/40 p-5 ${i % 2 === 0 ? "md:mr-8" : "md:ml-8"}`}>
                  <h3 className="font-heading text-lg font-semibold text-foreground">{step.title}</h3>
                  <p className="mt-1 text-sm text-muted">{step.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
