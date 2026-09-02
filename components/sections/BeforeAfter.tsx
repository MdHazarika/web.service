"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { MoveHorizontal, Zap, Smartphone, Search } from "lucide-react";
import { Reveal } from "./Reveal";

export function BeforeAfter() {
  const [slider, setSlider] = useState(50);

  const wins = [
    { title: "Faster performance", description: "Optimized assets and lean code cut load times.", icon: Zap },
    { title: "Mobile-first", description: "Clean, responsive layouts on every device.", icon: Smartphone },
    { title: "SEO ready", description: "Structured markup and fast Core Web Vitals.", icon: Search },
  ];

  return (
    <section className="py-24">
      <div className="container">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-bold sm:text-4xl">From Code to Interactive Site</h2>
          <p className="mt-4 text-muted">Drag to reveal the magic — turning raw code into a fully interactive site.</p>
        </Reveal>

        <Reveal className="mx-auto mt-12 max-w-4xl" delay={0.1}>
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl border border-white/10 bg-charcoal shadow-2xl">
            {/* After (new website) layer — sits on top and reveals from the right */}
            <div className="absolute inset-0 z-10 overflow-hidden" style={{ clipPath: `inset(0 0 0 ${100 - slider}%)` }}>
              <Image
                src="/images/after-website.png"
                alt="Fully interactive website"
                fill
                sizes="(max-width: 896px) 100vw, 896px"
                className="object-cover"
              />
            </div>

            {/* Before (old code) layer */}
            <div className="absolute inset-0 z-0">
              <Image
                src="/images/before-code.png"
                alt="Raw code base"
                fill
                sizes="(max-width: 896px) 100vw, 896px"
                className="object-cover"
              />
            </div>

            {/* Slider thumb */}
            <motion.div
              className="absolute top-0 bottom-0 z-20 w-1 cursor-ew-resize bg-accent shadow-[0_0_20px_rgba(13,148,136,0.5)]"
              style={{ left: `${slider}%` }}
            >
              <div className="absolute top-1/2 left-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-accent bg-charcoal text-accent">
                <MoveHorizontal size={16} />
              </div>
            </motion.div>

            <input
              type="range"
              min={0}
              max={100}
              value={slider}
              onChange={(e) => setSlider(Number(e.target.value))}
              className="absolute inset-0 z-30 h-full w-full cursor-ew-resize opacity-0"
              aria-label="Code to site slider"
            />
          </div>
        </Reveal>

        <Reveal className="mx-auto mt-10 max-w-4xl" delay={0.2}>
          <div className="grid gap-4 sm:grid-cols-3">
            {wins.map((w, i) => (
              <motion.div
                key={w.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-xl border border-white/10 bg-charcoal p-5 text-center"
              >
                <w.icon className="mx-auto h-6 w-6 text-accent" />
                <h3 className="mt-3 font-heading text-sm font-semibold text-foreground">{w.title}</h3>
                <p className="mt-1 text-xs text-muted">{w.description}</p>
              </motion.div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
