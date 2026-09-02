"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, motion, animate } from "framer-motion";
import { Reveal } from "./Reveal";

const stats = [
  { value: 350, suffix: "+", label: "Projects Completed" },
  { value: 300, suffix: "+", label: "Happy Clients" },
  { value: 6, suffix: "+", label: "Countries Served" },
  { value: 8, suffix: "+", label: "Years Experience" },
  { value: 24, suffix: "", label: "Awards Won" },
  { value: 120, suffix: "+", label: "Five-Star Reviews" },
  { value: 98, suffix: "%", label: "Client Satisfaction" },
];

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, target, {
      duration: 2,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Number.isInteger(target) ? Math.round(v).toString() : v.toFixed(1)),
    });
    return controls.stop;
  }, [inView, target]);

  return <span ref={ref}>{display}{suffix}</span>;
}

export function TrustCounters() {
  return (
    <section className="relative overflow-hidden border-y border-white/10 bg-charcoal/30 py-24">
      <div className="container">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-bold sm:text-4xl">Numbers that speak</h2>
          <p className="mt-4 text-muted">A track record of shipping fast, scaling brands, and delighting users.</p>
        </Reveal>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.08}>
              <div className="rounded-2xl border border-white/10 bg-charcoal/40 p-8 text-center backdrop-blur-sm transition-all hover:border-accent/30 hover:bg-charcoal/60">
                <p className="font-heading text-4xl font-bold text-foreground sm:text-5xl">
                  <Counter target={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mt-2 text-sm text-muted">{stat.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
