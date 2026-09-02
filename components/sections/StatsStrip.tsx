"use client";

import { motion } from "framer-motion";
import { useSiteConfig } from "@/components/ConfigProvider";

export function StatsStrip() {
  const { config } = useSiteConfig();
  const stats = [
    { value: config.stats.launchedWebsites, label: "websites launched" },
    { value: "100%", label: "client satisfaction" },
    { value: "2 weeks", label: "avg. turnaround" },
  ];

  return (
    <section className="border-y border-white/10 bg-charcoal/30">
      <motion.div
        className="container grid gap-8 py-12 sm:grid-cols-3"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.15 } },
        }}
      >
        {stats.map((stat) => (
          <motion.div
            key={stat.label}
            className="text-center"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <p className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
              {stat.value}
            </p>
            <p className="mt-1 text-sm text-muted">{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
