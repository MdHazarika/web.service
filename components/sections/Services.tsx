"use client";

import { motion } from "framer-motion";
import { Palette, Code, ShoppingCart, TrendingUp } from "lucide-react";

const services = [
  {
    icon: Palette,
    title: "Custom Web Design",
    description:
      "We craft unique, on-brand interfaces that feel premium and guide visitors toward action. Every layout is tailored to your goals, not a reused template.",
  },
  {
    icon: Code,
    title: "Web Development",
    description:
      "Clean, performant code using modern frameworks like Next.js and React. Your site will be fast, responsive, and easy to maintain as you grow.",
  },
  {
    icon: ShoppingCart,
    title: "E-commerce Builds",
    description:
      "From product catalogs to checkout flows, we build online stores that convert. We integrate payment gateways, inventory, and CMS tools smoothly.",
  },
  {
    icon: TrendingUp,
    title: "SEO & Optimization",
    description:
      "We optimize structure, speed, and content so your site ranks better and loads faster. Technical SEO is built in from day one.",
  },
];

export function Services() {
  return (
    <section id="services" className="py-24">
      <div className="container">
        <motion.div
          className="max-w-2xl"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="font-heading text-3xl font-medium sm:text-4xl">
            What we do best
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted">
            End-to-end web solutions designed to launch fast and scale with your
            business.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-10 md:grid-cols-2">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              className="group border-t border-white/10 pt-6"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.05 }}
            >
              <div className="flex items-baseline justify-between">
                <span className="font-heading text-4xl font-medium text-muted/40">
                  0{i + 1}
                </span>
                <service.icon size={22} className="text-accent" />
              </div>
              <h3 className="mt-4 font-heading text-xl font-medium text-foreground">
                {service.title}
              </h3>
              <p className="mt-2 max-w-md leading-relaxed text-muted">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
