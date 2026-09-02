"use client";

import { useEffect, useState } from "react";
import { motion, animate } from "framer-motion";
import { TrendingUp, IndianRupee, Users, Percent } from "lucide-react";
import { Reveal } from "./Reveal";
import { Input } from "@/components/ui/input";

export function ROICalculator() {
  const [visitors, setVisitors] = useState(5000);
  const [rate, setRate] = useState(2.5);
  const [aov, setAov] = useState(2500);
  const [current, setCurrent] = useState(0);
  const [projected, setProjected] = useState(0);
  const [growth, setGrowth] = useState(0);

  const currentRevenue = Math.round(visitors * (rate / 100) * aov);
  const projectedRevenue = Math.round(visitors * ((rate * 1.8) / 100) * aov);
  const growthRevenue = projectedRevenue - currentRevenue;

  useEffect(() => {
    const c = animate(current, currentRevenue, { duration: 0.8, onUpdate: (v) => setCurrent(Math.round(v)) });
    const p = animate(projected, projectedRevenue, { duration: 0.8, onUpdate: (v) => setProjected(Math.round(v)) });
    const g = animate(growth, growthRevenue, { duration: 0.8, onUpdate: (v) => setGrowth(Math.round(v)) });
    return () => {
      c.stop();
      p.stop();
      g.stop();
    };
  }, [currentRevenue, projectedRevenue, growthRevenue]);

  const max = Math.max(currentRevenue, projectedRevenue, 1);

  return (
    <section className="py-24">
      <div className="container">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-bold sm:text-4xl">What is a premium site worth?</h2>
          <p className="mt-4 text-muted">Estimate revenue growth from better conversion and UX.</p>
        </Reveal>

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          <Reveal className="space-y-5" delay={0.1}>
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground">
                <Users size={16} className="text-accent" /> Monthly Visitors
              </label>
              <Input type="number" value={visitors} onChange={(e) => setVisitors(Number(e.target.value))} />
            </div>
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground">
                <Percent size={16} className="text-accent" /> Current Conversion Rate (%)
              </label>
              <Input type="number" step="0.1" value={rate} onChange={(e) => setRate(Number(e.target.value))} />
            </div>
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground">
                <IndianRupee size={16} className="text-accent" /> Average Order Value (₹)
              </label>
              <Input type="number" value={aov} onChange={(e) => setAov(Number(e.target.value))} />
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="rounded-3xl border border-white/10 bg-charcoal/60 p-8 shadow-2xl backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <TrendingUp size={24} className="text-accent" />
                <h3 className="font-heading text-xl font-semibold text-foreground">Projected Growth</h3>
              </div>

              <div className="mt-8 space-y-6">
                <div>
                  <p className="text-sm text-muted">Current monthly revenue</p>
                  <p className="font-heading text-3xl font-bold text-foreground">₹{current.toLocaleString("en-IN")}</p>
                  <div className="mt-2 h-3 overflow-hidden rounded-full bg-white/10">
                    <motion.div className="h-full rounded-full bg-muted" style={{ width: `${(current / max) * 100}%` }} />
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted">After professional site</p>
                  <p className="font-heading text-3xl font-bold text-accent">₹{projected.toLocaleString("en-IN")}</p>
                  <div className="mt-2 h-3 overflow-hidden rounded-full bg-white/10">
                    <motion.div className="h-full rounded-full bg-accent" style={{ width: `${(projected / max) * 100}%` }} />
                  </div>
                </div>

                <div className="rounded-2xl border border-accent/20 bg-accent/10 p-5 text-center">
                  <p className="text-sm text-muted">Estimated monthly lift</p>
                  <p className="font-heading text-4xl font-bold text-foreground">+₹{growth.toLocaleString("en-IN")}</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
