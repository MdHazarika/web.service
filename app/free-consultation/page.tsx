"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Calendar, Clock, Video, Phone, ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

const times = [
  { value: "9:00", label: "9:00 AM" },
  { value: "10:00", label: "10:00 AM" },
  { value: "11:00", label: "11:00 AM" },
  { value: "12:00", label: "12:00 PM" },
  { value: "13:00", label: "1:00 PM" },
  { value: "14:00", label: "2:00 PM" },
  { value: "15:00", label: "3:00 PM" },
  { value: "16:00", label: "4:00 PM" },
  { value: "17:00", label: "5:00 PM" },
];

const types = [
  { id: "Google Meet", label: "Google Meet", icon: Video },
  { id: "Zoom", label: "Zoom", icon: Video },
  { id: "Phone call", label: "Phone Call", icon: Phone },
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
  phone: string;
  company: string;
  date: string;
  time: string;
  meetingType: string;
  source: string;
  message: string;
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function FreeConsultationPage() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    company: "",
    date: "",
    time: "",
    meetingType: "Google Meet",
    source: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

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
    if (!form.date) next.date = "Please select a preferred date";
    if (!form.time) next.time = "Please select a preferred time";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("submitting");
    try {
      const res = await fetch("/api/free-consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("idle");
      }
    } catch {
      setStatus("idle");
    }
  };

  if (status === "success") {
    return (
      <section className="flex min-h-[70vh] items-center justify-center py-24">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 text-accent">
            <Check size={28} />
          </div>
          <h1 className="mt-6 font-heading text-3xl font-bold text-foreground sm:text-4xl">
            Consultation request sent
          </h1>
          <p className="mt-4 max-w-md text-muted">
            We&apos;ve received your details and will email you within 24 hours to confirm your
            preferred slot.
          </p>
          <Link href="/" className={cn(buttonVariants({ size: "lg" }), "mt-8")}>
            Back to home
          </Link>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="relative py-20 lg:py-24">
      <div className="container max-w-3xl">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
        >
          <ArrowLeft size={16} /> Back to home
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h1 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
            Book a free consultation
          </h1>
          <p className="mt-4 text-muted">
            Tell us a bit about your project and pick a time that works for you. No commitment
            required.
          </p>

          <form onSubmit={handleSubmit} className="mt-10 space-y-6" noValidate>
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
                <label htmlFor="phone" className="mb-2 block text-sm font-medium text-foreground">
                  Phone <span className="text-accent">*</span>
                </label>
                <Input
                  id="phone"
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setField("phone", e.target.value)}
                  placeholder="+91 98765 43210"
                  aria-invalid={!!errors.phone}
                />
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

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="date" className="mb-2 block text-sm font-medium text-foreground">
                  <span className="inline-flex items-center gap-2">
                    <Calendar size={16} className="text-accent" /> Preferred date{" "}
                    <span className="text-accent">*</span>
                  </span>
                </label>
                <Input
                  id="date"
                  type="date"
                  value={form.date}
                  onChange={(e) => setField("date", e.target.value)}
                  aria-invalid={!!errors.date}
                />
                {errors.date && <p className="mt-1 text-xs text-red-400">{errors.date}</p>}
              </div>

              <div>
                <label htmlFor="time" className="mb-2 block text-sm font-medium text-foreground">
                  <span className="inline-flex items-center gap-2">
                    <Clock size={16} className="text-accent" /> Preferred time{" "}
                    <span className="text-accent">*</span>
                  </span>
                </label>
                <Select
                  id="time"
                  value={form.time}
                  onChange={(e) => setField("time", e.target.value)}
                  aria-invalid={!!errors.time}
                >
                  <option value="">Select a time</option>
                  {times.map((t) => (
                    <option key={t.value} value={t.value}>
                      {t.label}
                    </option>
                  ))}
                </Select>
                {errors.time && <p className="mt-1 text-xs text-red-400">{errors.time}</p>}
              </div>
            </div>

            <div>
              <label className="mb-3 block text-sm font-medium text-foreground">Meeting type</label>
              <div className="grid gap-3 sm:grid-cols-3">
                {types.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setField("meetingType", t.id)}
                    className={cn(
                      "flex items-center justify-center gap-2 rounded-xl border p-3 text-sm transition-colors",
                      form.meetingType === t.id
                        ? "border-accent bg-accent/10 text-foreground"
                        : "border-white/10 bg-charcoal/40 text-muted hover:text-foreground"
                    )}
                  >
                    <t.icon size={16} /> {t.label}
                  </button>
                ))}
              </div>
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

            <div>
              <label htmlFor="message" className="mb-2 block text-sm font-medium text-foreground">
                What would you like to discuss?
              </label>
              <Textarea
                id="message"
                value={form.message}
                onChange={(e) => setField("message", e.target.value)}
                placeholder="Tell us about your goals, website or app idea, and any timeline..."
              />
            </div>

            <button
              type="submit"
              disabled={status === "submitting"}
              className={cn(buttonVariants({ size: "lg" }), "w-full sm:w-auto")}
            >
              {status === "submitting" ? "Requesting..." : "Request free consultation"}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
