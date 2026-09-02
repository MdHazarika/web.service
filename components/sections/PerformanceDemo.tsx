"use client";

import { useEffect, useState } from "react";
import { motion, animate } from "framer-motion";
import { Zap, Search, Accessibility, Shield, Gauge, Clock } from "lucide-react";
import { Reveal } from "./Reveal";

const metrics = [
  { label: "Performance", value: 100, icon: Zap, suffix: "" },
  { label: "SEO Score", value: 100, icon: Search, suffix: "" },
  { label: "Accessibility", value: 100, icon: Accessibility, suffix: "" },
  { label: "Best Practices", value: 100, icon: Shield, suffix: "" },
  { label: "LCP", value: 0.9, icon: Clock, suffix: "s" },
  { label: "CLS", value: 0, icon: Gauge, suffix: "" },
];

function AnimatedValue({ target, suffix }: { target: number; suffix: string }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    const controls = animate(0, target, { duration: 1.8, onUpdate: (v) => setVal(v) });
    return () => controls.stop();
  }, [target]);
  return <span>{Number.isInteger(target) ? Math.round(val) : val.toFixed(2)}{suffix}</span>;
}

export function PerformanceDemo() {
  return (
    <section className="bg-charcoal/30 py-24">
      <div className="container">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-bold sm:text-4xl">Website Performance Demo</h2>
          <p className="mt-4 text-muted">Built for speed, search, accessibility, and rock-solid best practices.</p>
        </Reveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {metrics.map((m, i) => {
            const Icon = m.icon;
            return (
              <Reveal key={m.label} delay={i * 0.08}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="rounded-3xl border border-white/10 bg-charcoal/60 p-6 shadow-xl backdrop-blur-sm"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
                      <Icon size={20} />
                    </div>
                    <p className="font-heading text-3xl font-bold text-foreground">
                      <AnimatedValue target={m.value} suffix={m.suffix} />
                    </p>
                  </div>
                  <p className="mt-4 text-sm font-medium text-muted">{m.label}</p>
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      className="h-full rounded-full bg-accent"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${Math.min(100, m.value)}%` }}
                      transition={{ duration: 1.5, delay: 0.2 }}
                      viewport={{ once: true }}
                    />
                  </div>
                </motion.div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
