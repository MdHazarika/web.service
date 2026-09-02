"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { Mail, ExternalLink, Phone, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { useSiteConfig } from "@/components/ConfigProvider";
import { cn, formatINR } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { ButterflyLarge } from "@/components/ui/ButterflyLarge";

const faqs = [
  {
    question: "How fast can you launch a site?",
    answer:
      "Most sites launch in 2–4 weeks depending on scope. Starter pages are typically the fastest.",
  },
  {
    question: "How many revisions are included?",
    answer:
      "Each plan includes 1–2 rounds of revisions. Additional revisions can be added for a flat fee.",
  },
  {
    question: "What payment terms do you offer?",
    answer:
      "We usually split projects into a 50% deposit to start and 50% on launch. Stripe checkout is available for deposits.",
  },
  {
    question: "Can I update the site myself?",
    answer:
      "Yes. We build with a CMS or clean components so your team can edit content without touching code.",
  },
];

const budgetOptions = [
  { value: "", label: "Select a budget range" },
  { value: "<20000", label: "Under ₹20,000" },
  { value: "20000-60000", label: "₹20,000 – ₹60,000" },
  { value: "60000-100000", label: "₹60,000 – ₹1,00,000" },
  { value: ">100000", label: "₹1,00,000+" },
];

const countryOptions = [
  { value: "IN", label: "India (+91)", code: "+91", placeholder: "98765 43210" },
  { value: "AE", label: "UAE (+971)", code: "+971", placeholder: "50 123 4567" },
];

const sourceOptions = [
  { value: "", label: "How did you hear about us?" },
  { value: "google", label: "Google search" },
  { value: "social", label: "Social media" },
  { value: "referral", label: "Referral" },
  { value: "other", label: "Other" },
];

interface FormState {
  name: string;
  email: string;
  country: string;
  phone: string;
  company: string;
  plan: string;
  description: string;
  budget: string;
  source: string;
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function ContactContent() {
  const { config } = useSiteConfig();
  const allPlans = useMemo(() => [...config.plans, ...config.appPlans], [config.plans, config.appPlans]);
  const searchParams = useSearchParams();
  const queryPlan = searchParams.get("plan");
  const initialPlan = allPlans.find((p) => p.id === queryPlan)?.id || "";

  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    country: "IN",
    phone: "",
    company: "",
    plan: initialPlan || "starter",
    description: "",
    budget: "",
    source: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  useEffect(() => {
    const valid = allPlans.find((p) => p.id === queryPlan)?.id;
    if (valid) setForm((prev) => ({ ...prev, plan: valid }));
  }, [queryPlan, allPlans]);

  const setField = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validate = () => {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) next.name = "Name is required";
    if (!form.email.trim()) next.email = "Email is required";
    else if (!isValidEmail(form.email)) next.email = "Please enter a valid email";
    if (!form.phone.trim()) next.phone = "Phone number is required";
    else if (!/^\d[\d\s]*$/.test(form.phone.trim())) next.phone = "Please enter a valid phone number";
    if (!form.plan) next.plan = "Please select a plan";
    if (!form.description.trim()) next.description = "Project description is required";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) setStatus("success");
      else setStatus("idle");
    } catch {
      setStatus("idle");
    }
  };

  if (status === "success") {
    return (
      <section className="flex min-h-[60vh] items-center justify-center py-24">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <h1 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
            Thanks for reaching out
          </h1>
          <p className="mt-4 text-muted">
            We’ve received your details and will email you within 24 hours to
            schedule your kickoff call.
          </p>
          <Link href="/" className={cn(buttonVariants({ size: "lg" }), "mt-8")}>
            Back to home
          </Link>
        </motion.div>
      </section>
    );
  }

  return (
    <section id="contact" className="relative py-24">
      <ButterflyLarge className="absolute right-8 top-8 z-10 scale-50 opacity-80" />
      <div className="container grid gap-12 lg:grid-cols-[1fr_360px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h1 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
            Start your project
          </h1>
          <p className="mt-4 text-muted">
            Tell us what you’re building. We’ll reply within one business day to
            confirm the next steps.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6" noValidate>
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-medium text-foreground">
                  Name <span className="text-accent">*</span>
                </label>
                <Input
                  id="name"
                  value={form.name}
                  onChange={(e) => setField("name", e.target.value)}
                  placeholder="Jane Doe"
                  aria-invalid={!!errors.name}
                />
                {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-foreground">
                  Email <span className="text-accent">*</span>
                </label>
                <Input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setField("email", e.target.value)}
                  placeholder="jane@company.com"
                  aria-invalid={!!errors.email}
                />
                {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="country" className="mb-2 block text-sm font-medium text-foreground">
                  Country <span className="text-accent">*</span>
                </label>
                <Select
                  id="country"
                  value={form.country}
                  onChange={(e) => setField("country", e.target.value)}
                  aria-invalid={!!errors.country}
                >
                  {countryOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </Select>
                {errors.country && <p className="mt-1 text-xs text-red-400">{errors.country}</p>}
              </div>

              <div>
                <label htmlFor="phone" className="mb-2 block text-sm font-medium text-foreground">
                  Phone <span className="text-accent">*</span>
                </label>
                <div className="relative">
                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted">
                    {countryOptions.find((c) => c.value === form.country)?.code}
                  </span>
                  <Input
                    id="phone"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setField("phone", e.target.value.replace(/[^\d\s]/g, ""))}
                    placeholder={countryOptions.find((c) => c.value === form.country)?.placeholder}
                    className="pl-14"
                    aria-invalid={!!errors.phone}
                  />
                </div>
                {errors.phone && <p className="mt-1 text-xs text-red-400">{errors.phone}</p>}
              </div>

              <div>
                <label htmlFor="company" className="mb-2 block text-sm font-medium text-foreground">
                  Company / Project name
                </label>
                <Input
                  id="company"
                  value={form.company}
                  onChange={(e) => setField("company", e.target.value)}
                  placeholder="Acme Inc."
                />
              </div>
            </div>

            <div>
              <label htmlFor="plan" className="mb-2 block text-sm font-medium text-foreground">
                Plan of interest <span className="text-accent">*</span>
              </label>
              <Select
                id="plan"
                value={form.plan}
                onChange={(e) => setField("plan", e.target.value)}
                aria-invalid={!!errors.plan}
              >
                <optgroup label="Website plans">
                  {config.plans.map((plan) => (
                    <option key={plan.id} value={plan.id}>
                      {plan.name} — {plan.custom ? "Let’s Talk" : formatINR(plan.price)}
                    </option>
                  ))}
                </optgroup>
                <optgroup label="App development">
                  {config.appPlans.map((plan) => (
                    <option key={plan.id} value={plan.id}>
                      {plan.name} — {plan.custom ? "Let’s Talk" : plan.priceMax ? `${formatINR(plan.price)} – ${formatINR(plan.priceMax)}` : formatINR(plan.price)}
                    </option>
                  ))}
                </optgroup>
              </Select>
              {errors.plan && <p className="mt-1 text-xs text-red-400">{errors.plan}</p>}
            </div>

            <div>
              <label htmlFor="description" className="mb-2 block text-sm font-medium text-foreground">
                Project description <span className="text-accent">*</span>
              </label>
              <Textarea
                id="description"
                value={form.description}
                onChange={(e) => setField("description", e.target.value)}
                placeholder="Tell us about your goals, audience, and any design preferences..."
                aria-invalid={!!errors.description}
              />
              {errors.description && (
                <p className="mt-1 text-xs text-red-400">{errors.description}</p>
              )}
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="budget" className="mb-2 block text-sm font-medium text-foreground">
                  Budget range
                </label>
                <Select
                  id="budget"
                  value={form.budget}
                  onChange={(e) => setField("budget", e.target.value)}
                >
                  {budgetOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </Select>
              </div>

              <div>
                <label htmlFor="source" className="mb-2 block text-sm font-medium text-foreground">
                  How did you hear about us?
                </label>
                <Select
                  id="source"
                  value={form.source}
                  onChange={(e) => setField("source", e.target.value)}
                >
                  {sourceOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </Select>
              </div>
            </div>

            <button
              type="submit"
              disabled={status === "submitting"}
              className={cn(buttonVariants({ size: "lg" }), "w-full sm:w-auto")}
            >
              {status === "submitting" ? "Sending..." : "Send inquiry"}
            </button>
          </form>
        </motion.div>

        <aside className="space-y-8">
          <div className="rounded-2xl border border-white/10 bg-charcoal/40 p-6">
            <h2 className="font-heading text-lg font-semibold text-foreground">
              Contact details
            </h2>
            <a
              href="mailto:hello.infomyth@gmail.com"
              className="mt-4 flex items-center gap-3 text-sm text-muted transition-colors hover:text-foreground"
            >
              <Mail size={18} className="text-accent" />
              hello.infomyth@gmail.com
            </a>
            <a
              href="tel:+919954793494"
              className="mt-3 flex items-center gap-3 text-sm text-muted transition-colors hover:text-foreground"
            >
              <Phone size={18} className="text-accent" />
              +91 99547 93494
            </a>
            <div className="mt-4 flex items-center gap-4">
              {[
                { icon: ExternalLink, href: "https://twitter.com", label: "Twitter" },
                { icon: ExternalLink, href: "https://instagram.com", label: "Instagram" },
                { icon: ExternalLink, href: "https://linkedin.com", label: "LinkedIn" },
                { icon: ExternalLink, href: "https://github.com", label: "GitHub" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="text-muted transition-colors hover:text-foreground"
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-charcoal/40 p-6">
            <h2 className="font-heading text-lg font-semibold text-foreground">
              Office addresses
            </h2>
            <a
              href="https://maps.google.com/?q=JMNCC+Tower,+Apollo+Bandar,+Colaba,+Mumbai,+Maharashtra+400001"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex items-start gap-3 text-sm text-muted transition-colors hover:text-foreground"
            >
              <MapPin size={18} className="mt-0.5 shrink-0 text-accent" />
              <span>
                JMNCC Tower, Apollo Bandar, Colaba, Mumbai, Maharashtra 400001
              </span>
            </a>
            <a
              href="https://maps.google.com/?q=Opposite+of+ABC+Complex,+Jalukbari,+Guwahati,+Assam+781014"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 flex items-start gap-3 text-sm text-muted transition-colors hover:text-foreground"
            >
              <MapPin size={18} className="mt-0.5 shrink-0 text-accent" />
              <span>
                Opposite of ABC Complex, Jalukbari, Guwahati, Assam 781014
              </span>
            </a>
          </div>

          <div className="rounded-2xl border border-white/10 bg-charcoal/40 p-6">
            <h2 className="font-heading text-lg font-semibold text-foreground">
              Frequently asked questions
            </h2>
            <div className="mt-4 space-y-3">
              {faqs.map((faq) => (
                <details
                  key={faq.question}
                  className="group rounded-lg border border-white/5 bg-white/5 open:bg-white/[0.03]"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between p-3 text-sm font-medium text-foreground">
                    {faq.question}
                    <span className="ml-2 transition-transform group-open:rotate-180">
                      ▼
                    </span>
                  </summary>
                  <p className="px-3 pb-3 text-sm leading-relaxed text-muted">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>

          <Image
            src="/tree1.png"
            alt="Tree"
            width={1182}
            height={1330}
            className="pointer-events-none -mx-6 w-full max-w-[360px] h-auto opacity-95 drop-shadow-[0_0_24px_rgba(13,148,136,0.45)]"
          />
        </aside>
      </div>
    </section>
  );
}

export default function ContactPage() {
  return (
    <Suspense fallback={<div className="py-24 text-center">Loading contact form...</div>}>
      <ContactContent />
    </Suspense>
  );
}
