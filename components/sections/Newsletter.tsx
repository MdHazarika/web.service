"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, ArrowRight, Check, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Reveal } from "./Reveal";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");
    // Simulate submission; replace with real API call.
    setTimeout(() => {
      setStatus("success");
      setEmail("");
    }, 1000);
  };

  return (
    <section className="py-24">
      <div className="container">
        <Reveal className="mx-auto max-w-3xl">
          <motion.div
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-accent/10 to-charcoal/40 p-8 sm:p-12"
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="inline-flex rounded-full bg-accent/10 p-3 text-accent">
                <Mail size={24} />
              </div>
              <h2 className="mt-4 font-heading text-2xl font-bold sm:text-3xl">
                Get weekly web tips
              </h2>
              <p className="mt-2 max-w-md text-muted">
                Join founders and marketers who get practical advice on design, SEO, and conversion — no spam, just value.
              </p>

              {status === "success" ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-400"
                >
                  <Check size={16} />
                  You&apos;re subscribed! Check your inbox soon.
                </motion.div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="mt-6 flex w-full max-w-md flex-col gap-3 sm:flex-row"
                >
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    required
                    className="flex-1"
                  />
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className={cn(
                      buttonVariants({ size: "lg" }),
                      "inline-flex items-center justify-center gap-2 whitespace-nowrap"
                    )}
                  >
                    {status === "loading" ? (
                      <Loader2 size={18} className="animate-spin" />
                    ) : (
                      <>
                        Subscribe <ArrowRight size={18} />
                      </>
                    )}
                  </button>
                </form>
              )}
              <p className="mt-3 text-xs text-muted">
                Unsubscribe anytime. We respect your inbox.
              </p>
            </div>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}
