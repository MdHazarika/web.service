"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, RotateCcw, Sparkles } from "lucide-react";
import { Reveal } from "./Reveal";
import { plans } from "@/lib/plans";
import { cn, formatINR } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

const questions = [
  { id: "business", label: "Business type", options: ["Startup", "Small Business", "Enterprise", "Personal Brand", "E-commerce"] },
  { id: "size", label: "Company size", options: ["Just me", "2–10", "11–50", "50+"] },
  { id: "pages", label: "Number of pages", options: ["1", "2–5", "6–15", "15+"] },
  { id: "booking", label: "Need booking system?", options: ["No", "Yes, basic", "Yes, advanced"] },
  { id: "payments", label: "Need payment gateway?", options: ["No", "Yes, simple", "Yes, subscriptions"] },
  { id: "dashboard", label: "Need admin dashboard?", options: ["No", "Yes, basic", "Yes, custom"] },
  { id: "login", label: "Need customer login?", options: ["No", "Yes", "Yes + accounts"] },
  { id: "ai", label: "Need AI features?", options: ["No", "Yes, chatbot", "Yes, recommendations"] },
  { id: "timeline", label: "Timeline", options: ["Yesterday", "2 weeks", "1 month", "2+ months"] },
  { id: "budget", label: "Budget", options: ["< ₹20,000", "₹20,000 – ₹60,000", "₹60,000 – ₹1,00,000", "₹1,00,000+"] },
];

const deliveryMap: Record<string, string> = {
  starter: "2 weeks",
  growth: "3–4 weeks",
  premium: "6–8 weeks",
};

export function AIRecommendation() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);

  const current = questions[step];

  const pick = (value: string) => {
    setAnswers((prev) => ({ ...prev, [current.id]: value }));
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setDone(true);
    }
  };

  const reset = () => {
    setStep(0);
    setAnswers({});
    setDone(false);
  };

  const score = () => {
    let s = 0;
    if (["Enterprise", "E-commerce"].includes(answers.business)) s += 2;
    if (["11–50", "50+"].includes(answers.size)) s += 1;
    if (["6–15", "15+"].includes(answers.pages)) s += 2;
    if (["Yes, advanced"].includes(answers.booking)) s += 2;
    if (["Yes, subscriptions"].includes(answers.payments)) s += 2;
    if (["Yes, custom"].includes(answers.dashboard)) s += 2;
    if (["Yes + accounts"].includes(answers.login)) s += 2;
    if (["Yes, recommendations"].includes(answers.ai)) s += 2;
    if (answers.budget === "₹1,00,000+") s += 2;
    else if (answers.budget === "₹60,000 – ₹1,00,000") s += 1;
    return s;
  };

  const recommendationId = done ? (score() >= 7 ? "premium" : score() >= 4 ? "growth" : "starter") : null;
  const recommendation = plans.find((p) => p.id === recommendationId);

  return (
    <section id="recommend" className="bg-charcoal/30 py-24">
      <div className="container">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-bold sm:text-4xl">Find your perfect plan</h2>
          <p className="mt-4 text-muted">Answer a few questions and our engine will recommend the ideal package.</p>
        </Reveal>

        <Reveal className="mx-auto mt-12 max-w-2xl" delay={0.1}>
          <div className="rounded-3xl border border-white/10 bg-charcoal/60 p-8 shadow-2xl backdrop-blur-sm">
            {!done ? (
              <>
                <div className="mb-6 flex items-center justify-between text-sm text-muted">
                  <span>Question {step + 1} of {questions.length}</span>
                  <span>{Math.round(((step + 1) / questions.length) * 100)}%</span>
                </div>
                <div className="mb-8 h-1.5 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-accent to-accent-light"
                    animate={{ width: `${((step + 1) / questions.length) * 100}%` }}
                  />
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={current.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <h3 className="mb-6 font-heading text-xl font-semibold text-foreground">{current.label}</h3>
                    <div className="grid gap-3">
                      {current.options.map((option) => (
                        <button
                          key={option}
                          onClick={() => pick(option)}
                          className="group flex items-center justify-between rounded-xl border border-white/10 bg-charcoal/40 px-5 py-3 text-left text-foreground transition-all hover:border-accent/50 hover:bg-charcoal/50"
                        >
                          {option}
                          <ArrowRight size={16} className="text-muted opacity-0 transition-opacity group-hover:opacity-100" />
                        </button>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </>
            ) : recommendation ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 text-accent">
                  <Sparkles size={28} />
                </div>
                <h3 className="mt-6 font-heading text-2xl font-bold text-foreground">Recommended: {recommendation.name}</h3>
                <p className="mt-2 text-muted">{recommendation.description}</p>
                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                  <div className="rounded-xl border border-white/10 bg-charcoal/40 p-4">
                    <p className="text-xs text-muted">Estimated Cost</p>
                    <p className="font-heading text-2xl font-bold text-foreground">{formatINR(recommendation.price)}</p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-charcoal/40 p-4">
                    <p className="text-xs text-muted">Delivery</p>
                    <p className="font-heading text-2xl font-bold text-foreground">{deliveryMap[recommendation.id]}</p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-charcoal/40 p-4">
                    <p className="text-xs text-muted">Best For</p>
                    <p className="text-sm font-medium text-foreground">{score() >= 7 ? "Scale & AI" : score() >= 4 ? "Growth" : "Launch"}</p>
                  </div>
                </div>
                <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                  <Link href={`/contact?plan=${recommendation.id}`} className={cn(buttonVariants({ size: "lg" }))}>
                    Start with {recommendation.name}
                  </Link>
                  <button onClick={reset} className={cn(buttonVariants({ variant: "outline", size: "lg" }))}>
                    <RotateCcw size={18} className="mr-2" /> Retake
                  </button>
                </div>
              </motion.div>
            ) : null}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
