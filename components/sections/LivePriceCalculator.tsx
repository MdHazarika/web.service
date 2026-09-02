"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calculator, ShoppingCart, CreditCard, Calendar, User, Bot, BarChart3, Globe, Layers, Smartphone, Database, Wrench, ArrowRight } from "lucide-react";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

const addOns = [
  { id: "pages", label: "Extra Pages", price: 3000, icon: Layers, type: "counter", max: 10 },
  { id: "blog", label: "Blog", price: 8000, icon: BarChart3, type: "toggle" },
  { id: "ecommerce", label: "E-commerce", price: 24000, icon: ShoppingCart, type: "toggle" },
  { id: "booking", label: "Booking System", price: 16000, icon: Calendar, type: "toggle" },
  { id: "dashboard", label: "Admin Dashboard", price: 30000, icon: Database, type: "toggle" },
  { id: "chatbot", label: "AI Chatbot", price: 18000, icon: Bot, type: "toggle" },
  { id: "login", label: "Customer Login", price: 14000, icon: User, type: "toggle" },
  { id: "payments", label: "Payment Gateway", price: 12000, icon: CreditCard, type: "toggle" },
  { id: "seo", label: "SEO Package", price: 10000, icon: Globe, type: "toggle" },
  { id: "analytics", label: "Google Analytics", price: 6000, icon: BarChart3, type: "toggle" },
  { id: "multilang", label: "Multi Language", price: 14000, icon: Globe, type: "toggle" },
  { id: "api", label: "API Integration", price: 16000, icon: Database, type: "toggle" },
  { id: "mobile", label: "Mobile App", price: 60000, icon: Smartphone, type: "toggle" },
  { id: "crm", label: "CRM", price: 20000, icon: User, type: "toggle" },
  { id: "maintenance", label: "Maintenance 1yr", price: 24000, icon: Wrench, type: "toggle" },
];

export function LivePriceCalculator() {
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const [pages, setPages] = useState(0);

  const selectedAddOns = addOns.filter((a) => a.type === "toggle" && selected[a.id]);
  const selectedCount = selectedAddOns.length;

  const toggle = (id: string) => setSelected((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <section className="py-24">
      <div className="container">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-bold sm:text-4xl">Build your quote</h2>
          <p className="mt-4 text-muted">Select the features you need and we’ll send a tailored quote.</p>
        </Reveal>

        <div className="mt-16 grid gap-8 lg:grid-cols-[1fr_360px]">
          <Reveal className="grid gap-4 sm:grid-cols-2" delay={0.1}>
            {addOns.map((addon, i) => {
              const Icon = addon.icon;
              const active = addon.type === "counter" ? pages > 0 : !!selected[addon.id];
              return (
                <motion.div
                  key={addon.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.03 }}
                  onClick={() => addon.type === "toggle" && toggle(addon.id)}
                  className={cn(
                    "cursor-pointer rounded-2xl border p-4 transition-all",
                    active
                      ? "border-accent bg-charcoal/60 shadow-[0_0_30px_-10px_rgba(124,58,237,0.25)]"
                      : "border-white/10 bg-charcoal/40 hover:border-white/20"
                  )}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className={cn("rounded-lg p-2", active ? "bg-accent/10 text-accent" : "bg-white/5 text-muted")}>
                        <Icon size={20} />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{addon.label}</p>
                      </div>
                    </div>
                    {addon.type === "toggle" ? (
                      <div
                        className={cn(
                          "h-5 w-5 rounded border transition-colors",
                          active ? "border-accent bg-accent" : "border-white/20"
                        )}
                      >
                        {active && <motion.div layoutId="check" className="m-auto mt-1 h-2.5 w-2.5 rounded-sm bg-white" />}
                      </div>
                    ) : (
                      <input
                        type="number"
                        min={0}
                        max={addon.max}
                        value={pages}
                        onChange={(e) => setPages(Math.min(addon.max ?? 10, Math.max(0, Number(e.target.value))))}
                        className="h-8 w-16 rounded-lg border border-white/10 bg-charcoal/60 px-2 text-right text-sm text-foreground"
                        onClick={(e) => e.stopPropagation()}
                      />
                    )}
                  </div>
                </motion.div>
              );
            })}
          </Reveal>

          <Reveal delay={0.2}>
            <div className="sticky top-24 rounded-3xl border border-white/10 bg-charcoal/60 p-8 shadow-2xl backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <Calculator size={24} className="text-accent" />
                <h3 className="font-heading text-xl font-semibold text-foreground">Your package</h3>
              </div>
              <p className="mt-2 text-sm text-muted">
                {pages} extra page{pages !== 1 ? "s" : ""} · {selectedCount} feature{selectedCount !== 1 ? "s" : ""} selected
              </p>

              <div className="mt-6 space-y-3 border-t border-white/10 pt-6">
                <div className="flex justify-between text-sm">
                  <span className="text-muted">Extra pages</span>
                  <span className="font-medium text-foreground">{pages}</span>
                </div>
                {selectedCount === 0 && <p className="text-sm text-muted">No features selected yet.</p>}
                {selectedAddOns.map((a) => (
                  <div key={a.id} className="flex items-center justify-between text-sm">
                    <span className="text-muted">{a.label}</span>
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  </div>
                ))}
              </div>

              <Link
                href="/contact"
                className={cn(buttonVariants({ size: "lg" }), "mt-8 w-full")}
              >
                Get a quote <ArrowRight size={18} className="ml-2" />
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
