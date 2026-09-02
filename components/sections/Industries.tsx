"use client";

import { motion } from "framer-motion";
import { Building2, HeartPulse, Utensils, Home, GraduationCap, Rocket, Scale, TrendingUp, Cog, ShoppingBag, Hammer, Landmark, Plane, Truck } from "lucide-react";
import { Reveal } from "./Reveal";

const industries = [
  { icon: Building2, label: "Hotels" },
  { icon: HeartPulse, label: "Hospitals" },
  { icon: Utensils, label: "Restaurants" },
  { icon: Hammer, label: "Construction" },
  { icon: Home, label: "Real Estate" },
  { icon: GraduationCap, label: "Schools" },
  { icon: Landmark, label: "Universities" },
  { icon: Rocket, label: "Startups" },
  { icon: Scale, label: "Law Firms" },
  { icon: TrendingUp, label: "Finance" },
  { icon: Cog, label: "Manufacturing" },
  { icon: HeartPulse, label: "Healthcare" },
  { icon: ShoppingBag, label: "E-commerce" },
  { icon: Plane, label: "Travel" },
  { icon: Truck, label: "Logistics" },
];

export function Industries() {
  return (
    <section className="bg-charcoal/30 py-24">
      <div className="container">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-bold sm:text-4xl">Industries we serve</h2>
          <p className="mt-4 text-muted">Tailored digital experiences for every vertical.</p>
        </Reveal>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {industries.map((industry, i) => (
            <Reveal key={industry.label} delay={i * 0.04}>
              <motion.div
                className="flex items-center gap-4 rounded-2xl border border-white/10 bg-charcoal/40 p-5 backdrop-blur-sm transition-colors hover:border-accent/30"
                whileHover={{ scale: 1.02 }}
              >
                <div className="inline-flex rounded-lg bg-accent/10 p-2.5 text-accent">
                  <industry.icon size={22} />
                </div>
                <span className="font-medium text-foreground">{industry.label}</span>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
