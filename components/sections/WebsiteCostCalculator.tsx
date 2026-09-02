"use client";

import { useState } from "react";
import { FileText, LayoutDashboard, Lock, Calendar, CreditCard, Bot, Users, Globe, BookOpen, Search, Wrench, Code, Smartphone, Check, Minus, Plus, ArrowRight } from "lucide-react";
import { Reveal } from "./Reveal";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

const toggles = [
  { id: "dashboard", label: "Admin Dashboard", icon: LayoutDashboard },
  { id: "login", label: "Login System", icon: Lock },
  { id: "booking", label: "Booking System", icon: Calendar },
  { id: "payments", label: "Payment Gateway", icon: CreditCard },
  { id: "chatbot", label: "AI Chatbot", icon: Bot },
  { id: "crm", label: "CRM Integration", icon: Users },
  { id: "multilang", label: "Multi Language", icon: Globe },
  { id: "blog", label: "Blog", icon: BookOpen },
  { id: "seo", label: "Advanced SEO", icon: Search },
  { id: "maintenance", label: "1 Year Maintenance", icon: Wrench },
  { id: "api", label: "API Integration", icon: Code },
  { id: "mobile", label: "Mobile App View", icon: Smartphone },
];

export function WebsiteCostCalculator() {
  const [pages, setPages] = useState(5);
  const [selected, setSelected] = useState<Record<string, boolean>>({});

  const selectedCount = toggles.filter((t) => selected[t.id]).length;

  const toggle = (id: string) => setSelected((s) => ({ ...s, [id]: !s[id] }));

  return (
    <section className="bg-charcoal/30 py-24">
      <div className="container">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-bold sm:text-4xl">Plan your website scope</h2>
          <p className="mt-4 text-muted">Select the pages and features you need and we’ll send a tailored quote.</p>
        </Reveal>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          <Reveal className="lg:col-span-2" delay={0.1}>
            <div className="rounded-3xl border border-white/10 bg-charcoal/60 p-6 shadow-2xl backdrop-blur-sm sm:p-8">
              <div className="flex items-center gap-3">
                <FileText size={20} className="text-accent" />
                <h3 className="font-heading text-lg font-semibold text-foreground">Pages</h3>
              </div>
              <div className="mt-4 flex items-center gap-4">
                <button onClick={() => setPages((p) => Math.max(1, p - 1))} className="rounded-lg border border-white/10 p-2 text-foreground hover:border-accent">
                  <Minus size={18} />
                </button>
                <Input
                  type="number"
                  value={pages}
                  onChange={(e) => setPages(Math.max(1, Number(e.target.value)))}
                  className="w-24 text-center"
                />
                <button onClick={() => setPages((p) => p + 1)} className="rounded-lg border border-white/10 p-2 text-foreground hover:border-accent">
                  <Plus size={18} />
                </button>
                <span className="text-sm text-muted">{pages} pages</span>
              </div>

              <h3 className="mt-8 font-heading text-lg font-semibold text-foreground">Features</h3>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {toggles.map((t) => {
                  const Icon = t.icon;
                  const on = !!selected[t.id];
                  return (
                    <button
                      key={t.id}
                      onClick={() => toggle(t.id)}
                      className={cn(
                        "flex items-center justify-between rounded-xl border p-4 text-left transition-all",
                        on ? "border-accent bg-accent/10" : "border-white/10 bg-charcoal/40 hover:border-accent/50"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <Icon size={18} className={on ? "text-accent" : "text-muted"} />
                        <span className={cn("text-sm font-medium", on ? "text-foreground" : "text-muted")}>{t.label}</span>
                      </div>
                      <div className={cn("flex h-5 w-5 items-center justify-center rounded border", on ? "border-accent bg-accent text-white" : "border-white/20")}>
                        {on && <Check size={12} />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="sticky top-24 rounded-3xl border border-white/10 bg-charcoal/60 p-6 shadow-2xl backdrop-blur-sm sm:p-8">
              <h3 className="font-heading text-lg font-semibold text-foreground">Your project scope</h3>
              <p className="mt-1 text-sm text-muted">
                {pages} page{pages > 1 ? "s" : ""} · {selectedCount} feature{selectedCount !== 1 ? "s" : ""} selected
              </p>

              <div className="mt-6 space-y-3 border-t border-white/10 pt-6">
                <div className="flex justify-between text-sm">
                  <span className="text-muted">Pages</span>
                  <span className="font-medium text-foreground">{pages}</span>
                </div>
                {selectedCount === 0 && <p className="text-sm text-muted">No features selected yet.</p>}
                {toggles
                  .filter((t) => selected[t.id])
                  .map((t) => (
                    <div key={t.id} className="flex items-center justify-between text-sm">
                      <span className="text-muted">{t.label}</span>
                      <Check size={14} className="text-accent" />
                    </div>
                  ))}
              </div>

              <a href="/contact" className={cn(buttonVariants({ size: "lg" }), "mt-8 w-full text-center")}>
                Get a quote <ArrowRight size={18} className="ml-2" />
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
