"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Palette, Type, Briefcase, Paintbrush } from "lucide-react";
import { Reveal } from "./Reveal";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

const industries = ["SaaS", "E-commerce", "Agency", "Healthcare", "Real Estate", "Restaurant", "Education", "Finance"];
const styles = ["Modern", "Elegant", "Bold", "Playful", "Minimal"];
const fonts = ["Inter", "Space Grotesk", "Serif", "Monospace"];

const styleMap: Record<string, string> = {
  Modern: "rounded-xl",
  Elegant: "rounded-sm italic",
  Bold: "rounded-sm font-black uppercase",
  Playful: "rounded-3xl",
  Minimal: "rounded-none",
};

const fontMap: Record<string, string> = {
  Inter: "font-sans",
  "Space Grotesk": "font-heading",
  Serif: "font-serif",
  Monospace: "font-mono",
};

export function WebsiteBuilder() {
  const [name, setName] = useState("InfoMyth Web Service");
  const [industry, setIndustry] = useState("Agency");
  const [primary, setPrimary] = useState("#7c3aed");
  const [secondary, setSecondary] = useState("#0f0f0f");
  const [style, setStyle] = useState("Modern");
  const [font, setFont] = useState("Space Grotesk");

  return (
    <section className="bg-charcoal/30 py-24">
      <div className="container">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-bold sm:text-4xl">Design your website live</h2>
          <p className="mt-4 text-muted">Tweak colors, industry, and style — see a real-time preview.</p>
        </Reveal>

        <div className="mt-16 grid gap-8 lg:grid-cols-[1fr_1.25fr]">
          <Reveal className="rounded-3xl border border-white/10 bg-charcoal/60 p-6" delay={0.1}>
            <div className="space-y-5">
              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground">
                  <Briefcase size={16} className="text-accent" /> Business Name
                </label>
                <Input value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground">
                  <Briefcase size={16} className="text-accent" /> Industry
                </label>
                <Select value={industry} onChange={(e) => setIndustry(e.target.value)}>
                  {industries.map((i) => (
                    <option key={i} value={i}>{i}</option>
                  ))}
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground">
                    <Palette size={16} className="text-accent" /> Primary
                  </label>
                  <input type="color" value={primary} onChange={(e) => setPrimary(e.target.value)} className="h-10 w-full cursor-pointer rounded-lg border border-white/10 bg-transparent" />
                </div>
                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground">
                    <Paintbrush size={16} className="text-accent" /> Secondary
                  </label>
                  <input type="color" value={secondary} onChange={(e) => setSecondary(e.target.value)} className="h-10 w-full cursor-pointer rounded-lg border border-white/10 bg-transparent" />
                </div>
              </div>
              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground">
                  <Paintbrush size={16} className="text-accent" /> Style
                </label>
                <Select value={style} onChange={(e) => setStyle(e.target.value)}>
                  {styles.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </Select>
              </div>
              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground">
                  <Type size={16} className="text-accent" /> Font
                </label>
                <Select value={font} onChange={(e) => setFont(e.target.value)}>
                  {fonts.map((f) => (
                    <option key={f} value={f}>{f}</option>
                  ))}
                </Select>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <motion.div
              key={primary + secondary + style + font}
              initial={{ opacity: 0.8, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="overflow-hidden rounded-3xl border border-white/10 shadow-2xl"
              style={{ backgroundColor: secondary }}
            >
              <div className="flex h-8 items-center gap-2 bg-black/20 px-4">
                <div className="h-3 w-3 rounded-full bg-red-500" />
                <div className="h-3 w-3 rounded-full bg-yellow-500" />
                <div className="h-3 w-3 rounded-full bg-green-500" />
              </div>
              <div className="p-8" style={{ color: "#fff", fontFamily: font === "Space Grotesk" ? "var(--font-space-grotesk)" : font === "Serif" ? "serif" : font === "Monospace" ? "monospace" : "var(--font-inter)" }}>
                <div className={`inline-block px-4 py-2 text-sm font-medium text-white ${styleMap[style]}`} style={{ backgroundColor: primary }}>
                  {industry}
                </div>
                <h1 className={`mt-6 text-4xl leading-tight ${fontMap[font]} ${styleMap[style]}`}>{name}</h1>
                <p className="mt-4 max-w-md text-white/70">We build premium digital experiences that help {industry.toLowerCase()} brands grow faster.</p>
                <div className="mt-8 flex gap-4">
                  <button className={`px-6 py-3 text-sm font-medium text-white ${styleMap[style]}`} style={{ backgroundColor: primary }}>Get Started</button>
                  <button className={`border border-white/20 px-6 py-3 text-sm font-medium text-white ${styleMap[style]}`}>Learn More</button>
                </div>
              </div>
            </motion.div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
