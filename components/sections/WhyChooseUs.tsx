"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { Reveal } from "./Reveal";

const others = ["Templates", "Slow load times", "Poor SEO", "Limited support", "Hidden fees"];
const ours = ["Fully custom", "Fast performance", "SEO optimized", "Dedicated support"];

export function WhyChooseUs() {
  return (
    <section className="bg-charcoal/30 py-24">
      <div className="container">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-bold sm:text-4xl">Why choose us</h2>
          <p className="mt-4 text-muted">See how we stack up against typical agency experiences.</p>
        </Reveal>

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-white/10 bg-charcoal/40 p-8">
              <h3 className="font-heading text-xl font-semibold text-muted">Others</h3>
              <ul className="mt-6 space-y-4">
                {others.map((item, i) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-center gap-3 text-muted"
                  >
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-500/10 text-red-400">
                      <X size={14} />
                    </span>
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="rounded-2xl border border-accent/30 bg-charcoal/60 p-8 shadow-[0_0_40px_-10px_rgba(124,58,237,0.25)]">
              <h3 className="font-heading text-xl font-semibold text-foreground">Our Agency</h3>
              <ul className="mt-6 space-y-4">
                {ours.map((item, i) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-center gap-3 text-foreground"
                  >
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/10 text-accent">
                      <Check size={14} />
                    </span>
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
