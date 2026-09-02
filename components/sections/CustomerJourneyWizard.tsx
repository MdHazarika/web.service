"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, Building2, Layout, Palette, Package, Calculator, Calendar, ArrowRight, ArrowLeft, CheckCircle } from "lucide-react";
import { Reveal } from "./Reveal";
import { Input } from "@/components/ui/input";
import { cn, formatINR } from "@/lib/utils";
import { useSiteConfig } from "@/components/ConfigProvider";
import { buttonVariants } from "@/components/ui/button";

function mapPackageToId(name: string) {
  if (name === "Enterprise") return "premium";
  return name.toLowerCase();
}

const steps = [
  { id: "type", title: "Business Type", icon: Briefcase, options: ["Startup", "Agency", "E-commerce", "SaaS", "Local Service"] },
  { id: "industry", title: "Industry", icon: Building2, options: ["Healthcare", "Finance", "Real Estate", "Education", "Travel", "Technology"] },
  { id: "features", title: "Key Features", icon: Layout, options: ["Booking", "Payments", "Chatbot", "CRM", "Blog", "Multi-language"] },
  { id: "design", title: "Design Style", icon: Palette, options: ["Modern", "Elegant", "Bold", "Playful", "Minimal"] },
  { id: "package", title: "Package", icon: Package, options: ["Starter", "Growth", "Enterprise"] },
];

export function CustomerJourneyWizard() {
  const { config } = useSiteConfig();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const toggle = (option: string) => {
    const current = answers[steps[step].id] || [];
    const next = current.includes(option) ? current.filter((o) => o !== option) : [...current, option];
    setAnswers({ ...answers, [steps[step].id]: next });
  };

  const selectSingle = (option: string) => {
    setAnswers({ ...answers, [steps[step].id]: [option] });
  };

  const current = steps[step] ?? null;
  const canNext = current ? (answers[current.id] || []).length > 0 : false;

  const estimate = useMemo(() => {
    const pkg = answers.package?.[0] || "Starter";
    const feats = answers.features?.length || 0;
    const id = mapPackageToId(pkg);
    const plan = config.plans.find((p) => p.id === id) ?? config.plans[0] ?? null;
    const base = plan?.price ?? 0;
    const timeline = plan?.timeline || "4 - 6 weeks";
    return { total: base + feats * 5000, timeline };
  }, [answers, config.plans]);

  return (
    <section className="py-24">
      <div className="container">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-bold sm:text-4xl">Customer Journey Wizard</h2>
          <p className="mt-4 text-muted">Tell us about your project and get an instant estimate plus a meeting slot.</p>
        </Reveal>

        <Reveal className="mx-auto mt-12 max-w-3xl" delay={0.1}>
          <div className="rounded-3xl border border-white/10 bg-charcoal/60 p-6 shadow-2xl backdrop-blur-sm sm:p-10">
            <div className="mb-8 flex items-center justify-between">
              {steps.map((s, i) => (
                <div key={s.id} className="flex flex-1 flex-col items-center gap-2">
                  <div
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-colors",
                      i <= step ? "bg-accent text-white" : "bg-white/10 text-muted"
                    )}
                  >
                    {i + 1}
                  </div>
                  <div className={cn("h-1 w-full max-w-[40px] rounded-full", i < step ? "bg-accent" : "bg-white/10")} />
                </div>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {current ? (
                <motion.div key={current.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                  <div className="flex items-center gap-3">
                    {(() => { const Icon = current.icon; return <Icon size={20} className="text-accent" />; })()}
                    <h3 className="font-heading text-xl font-semibold text-foreground">{current.title}</h3>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {current.options.map((option) => {
                      const selected = (answers[current.id] || []).includes(option);
                      return (
                        <button
                          key={option}
                          onClick={() => (current.id === "features" ? toggle(option) : selectSingle(option))}
                          className={cn(
                            "rounded-xl border p-4 text-left text-sm font-medium transition-all",
                            selected ? "border-accent bg-accent/10 text-foreground" : "border-white/10 bg-charcoal/40 text-muted hover:text-foreground"
                          )}
                        >
                          <div className="flex items-center justify-between">
                            {option}
                            {selected && <CheckCircle size={16} className="text-accent" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              ) : (
                <motion.div key="estimate" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
                  <div className="rounded-2xl border border-accent/20 bg-accent/5 p-6 text-center">
                    <Calculator size={28} className="mx-auto text-accent" />
                    <h3 className="mt-4 font-heading text-2xl font-bold text-foreground">Your Instant Estimate</h3>
                    <p className="mt-2 font-heading text-4xl font-bold text-accent">{formatINR(estimate.total)}</p>
                    <p className="mt-1 text-muted">Estimated timeline: {estimate.timeline}</p>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Input placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />
                    <Input type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                  <button
                    onClick={() => alert(`Thanks ${name}! We will email the full proposal and a meeting link to ${email}.`)}
                    disabled={!name || !email}
                    className={cn(buttonVariants({ size: "lg" }), "w-full disabled:opacity-50")}
                  >
                    <Calendar size={18} className="mr-2" /> Book free consultation
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-8 flex justify-between">
              <button
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                disabled={step === 0}
                className={cn(buttonVariants({ variant: "outline" }), "disabled:opacity-40")}
              >
                <ArrowLeft size={16} className="mr-2" /> Back
              </button>
              {step < steps.length ? (
                <button onClick={() => setStep((s) => s + 1)} disabled={!canNext} className={cn(buttonVariants(), "disabled:opacity-40")}>
                  Next <ArrowRight size={16} className="ml-2" />
                </button>
              ) : (
                <button onClick={() => { setStep(0); setAnswers({}); setName(""); setEmail(""); }} className={cn(buttonVariants({ variant: "outline" }))}>
                  Start over
                </button>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
