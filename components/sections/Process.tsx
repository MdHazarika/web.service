"use client";

import { motion } from "framer-motion";
import { MousePointerClick, Phone, Layers, Rocket } from "lucide-react";

const steps = [
  {
    icon: MousePointerClick,
    title: "Choose Your Plan",
    description:
      "Pick a package that fits your stage. Every plan can be customized during our kickoff call.",
  },
  {
    icon: Phone,
    title: "Discovery Call & Brief",
    description:
      "We define your goals, audience, and content so the design is driven by strategy, not guesswork.",
  },
  {
    icon: Layers,
    title: "Design & Build",
    description:
      "You get design concepts, then we build with clean code, animations, and responsive precision.",
  },
  {
    icon: Rocket,
    title: "Launch & Support",
    description:
      "We deploy, test, and hand over a site you can manage. Support continues well past launch day.",
  },
];

export function Process() {
  return (
    <section id="process" className="bg-charcoal/30 py-24">
      <div className="container">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="font-heading text-3xl font-bold sm:text-4xl">
            How it works
          </h2>
          <p className="mt-4 text-muted">
            A simple, transparent process from first click to live site.
          </p>
        </motion.div>

        <div className="relative mt-16">
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-white/10 md:left-0 md:right-0 md:top-8 md:bottom-auto md:h-0.5 md:w-auto" />
          <motion.div
            className="relative grid gap-8 md:grid-cols-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.15 } },
            }}
          >
            {steps.map((step) => (
              <motion.div
                key={step.title}
                className="relative pl-20 md:pl-0 md:text-center"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <div className="absolute left-0 top-0 inline-flex rounded-full bg-accent/10 p-3 text-accent md:static md:mb-4">
                  <step.icon size={24} />
                </div>
                <h3 className="font-heading text-lg font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
