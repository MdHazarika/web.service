"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronDown } from "lucide-react";
import { Reveal } from "./Reveal";
import { Input } from "@/components/ui/input";

const faqs = [
  { category: "Process", question: "How long does a typical website take?", answer: "Most sites launch within 2–4 weeks. Larger platforms or e-commerce builds may take 6–8 weeks." },
  { category: "Pricing", question: "Are there any hidden fees?", answer: "No. Our proposals include fixed pricing for the agreed scope. Hosting and ongoing maintenance are optional add-ons." },
  { category: "Design", question: "Will my site be mobile friendly?", answer: "Yes. Every site is fully responsive and tested across devices and screen sizes." },
  { category: "SEO", question: "Do you offer SEO services?", answer: "SEO foundations are built into every plan, including metadata, speed optimization, and structured data." },
  { category: "Support", question: "What happens after launch?", answer: "We provide a handoff session, documentation, and optional monthly maintenance and support retainers." },
  { category: "Tech", question: "Can I edit the site myself?", answer: "Absolutely. We integrate a CMS or clean component structure so non-developers can update content." },
  { category: "Payments", question: "Do you accept payment plans?", answer: "Yes. Projects are typically split into a 50% deposit and 50% on launch. We also accept Stripe." },
];

const categories = ["All", ...Array.from(new Set(faqs.map((f) => f.category)))];

export function AdvancedFAQ() {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState("All");
  const [open, setOpen] = useState<string | null>(null);

  const filtered = faqs.filter((f) => {
    const matchesCategory = active === "All" || f.category === active;
    const matchesSearch = f.question.toLowerCase().includes(query.toLowerCase()) || f.answer.toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="faq" className="py-24">
      <div className="container">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-bold sm:text-4xl">Questions & answers</h2>
          <p className="mt-4 text-muted">Search by keyword or category.</p>
        </Reveal>

        <Reveal className="mx-auto mt-10 max-w-2xl" delay={0.1}>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={18} />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search FAQs..."
              className="pl-10"
            />
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
                  active === cat
                    ? "bg-accent text-white"
                    : "border border-white/10 bg-charcoal/40 text-muted hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mx-auto mt-12 max-w-3xl space-y-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((faq) => (
              <motion.div
                key={faq.question}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.25 }}
                className="rounded-2xl border border-white/10 bg-charcoal/40"
              >
                <button
                  onClick={() => setOpen(open === faq.question ? null : faq.question)}
                  className="flex w-full items-center justify-between p-5 text-left"
                >
                  <span className="font-medium text-foreground">{faq.question}</span>
                  <motion.span animate={{ rotate: open === faq.question ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronDown size={18} className="text-muted" />
                  </motion.span>
                </button>
                <AnimatePresence>
                  {open === faq.question && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-sm leading-relaxed text-muted">{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>
          {filtered.length === 0 && <p className="text-center text-sm text-muted">No questions match your search.</p>}
        </div>
      </div>
    </section>
  );
}
