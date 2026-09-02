"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Zap, Search, Smartphone, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { MockBrowser } from "@/components/ui/MockBrowser";
import { MockPhone } from "@/components/ui/MockPhone";

function BrowserDemo() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#0f0f0f] p-3 text-left">
      {/* Subtle animated gradient glow */}
      <motion.div
        className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-accent/20 blur-3xl"
        animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.2, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Nav */}
      <div className="relative z-10 flex items-center justify-between border-b border-white/5 pb-2">
        <div className="flex items-center gap-1.5">
          <div className="flex h-4 w-4 items-center justify-center rounded bg-accent text-[8px] font-bold text-white">
            P
          </div>
          <span className="font-heading text-[10px] font-semibold text-foreground">
            InfoMyth Web Service
          </span>
        </div>
        <div className="flex gap-2">
          {["Work", "Plans", "Contact"].map((l) => (
            <span key={l} className="text-[7px] text-muted">
              {l}
            </span>
          ))}
        </div>
      </div>

      {/* Hero */}
      <div className="relative z-10 mt-3">
        <motion.h3
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-heading text-[12px] font-bold leading-tight text-foreground"
        >
          Sites that convert.
        </motion.h3>
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-1 max-w-[80%] text-[8px] leading-relaxed text-muted"
        >
          Premium, custom builds launched in weeks.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-2 inline-flex items-center gap-1 rounded bg-accent px-2 py-1 text-[8px] font-medium text-white"
        >
          View plans <ArrowRight size={10} />
        </motion.div>
      </div>

      {/* Stats */}
      <div className="relative z-10 mt-3 grid grid-cols-3 gap-2">
        {[
          { icon: Zap, label: "Speed", value: "0.9s" },
          { icon: Search, label: "SEO", value: "98" },
          { icon: Smartphone, label: "Mobile", value: "A+" },
        ].map((c, i) => (
          <motion.div
            key={c.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
            className="rounded border border-white/5 bg-white/[0.03] p-1.5"
          >
            <c.icon size={10} className="text-accent" />
            <p className="mt-1 text-[7px] text-muted">{c.label}</p>
            <p className="text-[9px] font-semibold text-foreground">{c.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Scrolling feature row */}
      <div className="relative z-10 mt-3 flex gap-2 overflow-hidden">
        <motion.div
          className="flex gap-2"
          animate={{ x: [0, -120] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        >
          {[
            "Design",
            "Develop",
            "Launch",
            "Scale",
            "Design",
            "Develop",
            "Launch",
          ].map((l, i) => (
            <span
              key={i}
              className="whitespace-nowrap rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[7px] text-muted"
            >
              {l}
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

function PhoneDemo() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#0f0f0f] p-2 text-left">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/5 pb-1.5">
        <div className="flex h-4 w-4 items-center justify-center rounded bg-accent text-[7px] font-bold text-white">
          P
        </div>
        <Sparkles size={9} className="text-accent" />
      </div>

      {/* Hero */}
      <div className="mt-2">
        <motion.h3
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="font-heading text-[10px] font-bold leading-tight text-foreground"
        >
          Launch ready.
        </motion.h3>
        <motion.p
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-0.5 text-[7px] text-muted"
        >
          Built for every screen.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-1.5 inline-flex items-center rounded bg-accent px-1.5 py-0.5 text-[7px] font-medium text-white"
        >
          Start now
        </motion.div>
      </div>

      {/* Cards */}
      <div className="mt-2 space-y-1.5">
        {[
          { icon: Zap, label: "Fast", sub: "0.9s load" },
          { icon: Search, label: "SEO", sub: "98/100" },
          { icon: Smartphone, label: "Responsive", sub: "All devices" },
        ].map((c, i) => (
          <motion.div
            key={c.label}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.5 + i * 0.12 }}
            className="flex items-center gap-1.5 rounded border border-white/5 bg-white/[0.03] p-1"
          >
            <div className="flex h-5 w-5 items-center justify-center rounded bg-white/5">
              <c.icon size={8} className="text-accent" />
            </div>
            <div>
              <p className="text-[7px] font-medium text-foreground">{c.label}</p>
              <p className="text-[6px] text-muted">{c.sub}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[100svh] overflow-visible px-6 py-32"
    >
      <div className="container grid min-h-[70vh] items-center gap-16 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-3 py-1 text-sm font-medium text-accent">
            <span className="h-2 w-2 rounded-full bg-accent" />
            Web Design & Development Studio
          </span>
          <h1 className="mt-6 font-heading text-5xl font-medium leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
            <span className="bg-gradient-to-br from-foreground via-foreground to-accent bg-clip-text text-transparent">
              Websites that turn visitors into customers.
            </span>
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-muted sm:text-xl">
            Custom-built, high-performance sites for brands that want to stand
            out — SEO-ready, mobile-first, and designed to convert from day one.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a href="#plans" className={cn(buttonVariants({ size: "lg" }))}>
              View Plans <ArrowRight size={18} className="ml-2" />
            </a>
            <Link
              href="/work"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
            >
              See Our Work
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
          className="relative h-[380px] w-full max-w-2xl self-center sm:h-[480px] lg:h-[600px] lg:max-w-none"
        >
          <Image
            src="/bird-1.png"
            alt="Parrot"
            width={1123}
            height={1400}
            priority
            className="pointer-events-none absolute left-1/2 top-1/2 z-10 h-[380px] w-auto -translate-x-1/2 -translate-y-1/2 object-contain drop-shadow-[0_0_24px_rgba(13,148,136,0.5)] sm:h-[480px] lg:h-[600px]"
          />
          <MockBrowser
            className="absolute left-1/2 top-0 w-[80%] -translate-x-1/2 shadow-2xl lg:left-0 lg:w-[85%] lg:translate-x-0"
            title="infomythweb.com"
          >
            <BrowserDemo />
          </MockBrowser>
          <MockPhone className="absolute bottom-0 left-1/2 w-32 -translate-x-1/2 shadow-2xl sm:w-40 lg:left-auto lg:right-0 lg:w-44 lg:translate-x-0">
            <PhoneDemo />
          </MockPhone>
        </motion.div>
      </div>
    </section>
  );
}
