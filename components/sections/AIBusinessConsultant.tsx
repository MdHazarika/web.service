"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, CheckCircle, Clock, Calendar, Sparkles, Lightbulb, Target, Users, Banknote, Briefcase } from "lucide-react";
import { Reveal } from "./Reveal";
import { cn, formatINR } from "@/lib/utils";
import { useSiteConfig } from "@/components/ConfigProvider";
import { buttonVariants } from "@/components/ui/button";

const questions = [
  {
    id: "type",
    question: "What type of business do you run?",
    icon: Briefcase,
    options: ["Startup", "Agency", "E-commerce", "SaaS", "Local Service", "Other"],
  },
  {
    id: "goal",
    question: "What is your primary goal?",
    icon: Target,
    options: ["Generate leads", "Sell products", "Build credibility", "Book appointments", "Launch a platform"],
  },
  {
    id: "audience",
    question: "Who is your main audience?",
    icon: Users,
    options: ["B2B", "B2C", "Both", "Enterprise", "Local"],
  },
  {
    id: "budget",
    question: "What is your budget range?",
    icon: Banknote,
    options: ["Under ₹50,000", "₹50,000 – ₹1,00,000", "₹1,00,000 – ₹3,00,000", "₹3,00,000+"],
  },
];

export function AIBusinessConsultant() {
  const { config } = useSiteConfig();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const consultantPlans = config.plans.filter((p) => !p.custom).slice(0, 3);
  const findPlan = (id: string) => consultantPlans.find((p) => p.id === id) || consultantPlans[0];

  const select = (option: string) => {
    const current = questions[step];
    if (!current) return;
    setAnswers((prev) => ({ ...prev, [current.id]: option }));
  };

  const recommendation = () => {
    const budget = answers.budget;
    const type = answers.type;
    if (!budget) return consultantPlans[0];
    if (budget === "₹3,00,000+" || budget === "₹1,00,000 – ₹3,00,000" || type === "Enterprise" || type === "SaaS") return findPlan("premium");
    if (budget === "₹50,000 – ₹1,00,000" || type === "E-commerce" || type === "Agency") return findPlan("growth");
    return findPlan("starter");
  };

  const canNext = step < questions.length ? answers[questions[step].id] : false;

  return (
    <section className="relative overflow-hidden py-24">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_20%,rgba(139,92,246,0.12),transparent_40%)]" />
      <div className="container">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-bold sm:text-4xl">AI Business Consultant</h2>
          <p className="mt-4 text-muted">Answer 4 quick questions and get a tailored website strategy.</p>
        </Reveal>

        <Reveal className="mx-auto mt-12 max-w-3xl" delay={0.1}>
          <div className="rounded-3xl border border-white/10 bg-charcoal/60 p-6 shadow-2xl backdrop-blur-xl sm:p-10">
            <AnimatePresence mode="wait">
              {step < questions.length ? (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between text-sm text-muted">
                    <span>
                      Question {step + 1} of {questions.length}
                    </span>
                    <span className="font-medium text-accent">{Math.round(((step + 1) / questions.length) * 100)}%</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      className="h-full bg-accent"
                      initial={{ width: 0 }}
                      animate={{ width: `${((step + 1) / questions.length) * 100}%` }}
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
                      {(() => {
                        const Icon = questions[step].icon;
                        return <Icon size={20} />;
                      })()}
                    </div>
                    <h3 className="font-heading text-xl font-semibold text-foreground">{questions[step].question}</h3>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    {questions[step].options.map((option) => {
                      const active = answers[questions[step].id] === option;
                      return (
                        <button
                          key={option}
                          onClick={() => select(option)}
                          className={cn(
                            "flex items-center justify-between rounded-xl border p-4 text-left transition-all",
                            active
                              ? "border-accent bg-accent/10 text-foreground"
                              : "border-white/10 bg-charcoal/40 text-muted hover:border-accent/50 hover:text-foreground"
                          )}
                        >
                          <span className="font-medium">{option}</span>
                          {active && <CheckCircle size={18} className="text-accent" />}
                        </button>
                      );
                    })}
                  </div>

                  <div className="flex justify-between pt-4">
                    <button
                      onClick={() => setStep((s) => Math.max(0, s - 1))}
                      disabled={step === 0}
                      className={cn(buttonVariants({ variant: "outline" }), "disabled:opacity-40")}
                    >
                      <ArrowLeft size={16} className="mr-2" /> Back
                    </button>
                    <button
                      onClick={() => setStep((s) => s + 1)}
                      disabled={!canNext}
                      className={cn(buttonVariants(), "disabled:opacity-40")}
                    >
                      Next <ArrowRight size={16} className="ml-2" />
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-6"
                >
                  <div className="text-center">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent/10 text-accent">
                      <Sparkles size={28} />
                    </div>
                    <h3 className="mt-5 font-heading text-2xl font-bold text-foreground">Recommended for you</h3>
                    <p className="mt-2 text-muted">Based on your {answers.type?.toLowerCase()} business and goals.</p>
                  </div>

                  <div className="rounded-2xl border border-accent/20 bg-accent/5 p-6">
                    <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                      <div>
                        <p className="text-sm font-medium text-accent">Best fit</p>
                        <h4 className="font-heading text-2xl font-bold text-foreground">{recommendation().name}</h4>
                        <p className="mt-1 text-muted">{recommendation().description}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-heading text-3xl font-bold text-foreground">{formatINR(recommendation().price)}</p>
                      </div>
                    </div>

                    <div className="mt-6 grid gap-4 sm:grid-cols-2">
                      <div className="flex items-center gap-3 text-sm text-muted">
                        <Clock size={16} className="text-accent" /> Timeline: {recommendation().timeline}
                      </div>
                      <div className="flex items-center gap-3 text-sm text-muted">
                        <Calendar size={16} className="text-accent" /> Kickoff within 48 hours
                      </div>
                    </div>

                    <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                      {recommendation().features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-sm text-foreground">
                          <CheckCircle size={16} className="text-accent" /> {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-charcoal/40 p-5">
                    <div className="flex items-start gap-3">
                      <Lightbulb size={20} className="mt-0.5 text-accent" />
                      <div>
                        <p className="font-medium text-foreground">Why this fits you</p>
                        <p className="mt-1 text-sm text-muted">
                          Your goal is to <strong className="text-foreground">{answers.goal?.toLowerCase()}</strong> for a{" "}
                          <strong className="text-foreground">{answers.audience?.toLowerCase()}</strong> audience. This package balances speed, conversion features, and budget to get results fast.
                        </p>
                      </div>
                    </div>
                  </div>

                  <button onClick={() => { setStep(0); setAnswers({}); }} className={cn(buttonVariants({ variant: "outline" }), "w-full")}>
                    Start over
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
