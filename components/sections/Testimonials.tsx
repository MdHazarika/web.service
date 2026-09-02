"use client";

import { motion } from "framer-motion";
import { Quote, Star, User } from "lucide-react";
import { useSiteConfig } from "@/components/ConfigProvider";

function TestimonialCard({
  testimonial,
}: {
  testimonial: { quote: string; name: string; role: string; rating?: number };
}) {
  return (
    <div className="w-[320px] shrink-0 rounded-2xl border border-white/10 bg-charcoal/40 p-6 sm:w-[380px]">
      <Quote size={24} className="text-accent" aria-hidden="true" />
      <p className="mt-4 text-sm leading-relaxed text-foreground">{testimonial.quote}</p>
      {!!testimonial.rating && (
        <div className="mt-3 flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={14}
              className={i < testimonial.rating! ? "fill-yellow-400 text-yellow-400" : "text-muted"}
            />
          ))}
        </div>
      )}
      <div className="mt-4 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-accent">
          <User size={18} />
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">{testimonial.name}</p>
          <p className="text-xs text-muted">{testimonial.role}</p>
        </div>
      </div>
    </div>
  );
}

export function Testimonials() {
  const { config } = useSiteConfig();
  const doubled = [...config.testimonials, ...config.testimonials];

  return (
    <section id="testimonials" className="overflow-hidden py-24">
      <div className="container">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="font-heading text-3xl font-bold sm:text-4xl">Trusted by founders</h2>
          <p className="mt-4 text-muted">Real feedback from teams we’ve helped ship.</p>
        </motion.div>
      </div>

      <div className="relative mt-16">
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-24 bg-gradient-to-r from-[var(--background)] to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-24 bg-gradient-to-l from-[var(--background)] to-transparent" />
        <motion.div
          className="flex w-max gap-6 pl-6"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 60,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {doubled.map((testimonial, index) => (
            <TestimonialCard key={`${testimonial.name}-${index}`} testimonial={testimonial} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
