"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Palette, Type, Briefcase, Paintbrush, LayoutGrid, Layers, Check } from "lucide-react";
import { Reveal } from "./Reveal";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { cn, formatINR } from "@/lib/utils";

const industries = ["SaaS", "E-commerce", "Agency", "Healthcare", "Real Estate", "Restaurant", "Education", "Finance", "Travel", "Logistics"];
const styles = ["Modern", "Elegant", "Bold", "Playful", "Minimal"];
const fonts = ["Inter", "Space Grotesk", "Serif", "Monospace"];
const layouts = ["Hero Focus", "Split", "Grid", "Centered"];
const components = ["Features", "Testimonial", "Pricing", "Stats"];

const previewPrices: Record<string, string> = {
  Starter: formatINR(15999),
  Growth: formatINR(55999),
  Enterprise: "Let’s Talk",
};

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

export function LiveWebsiteBuilder() {
  const [name, setName] = useState("InfoMyth Web Service");
  const [industry, setIndustry] = useState("Agency");
  const [primary, setPrimary] = useState("#7c3aed");
  const [secondary, setSecondary] = useState("#0f0f0f");
  const [style, setStyle] = useState("Modern");
  const [font, setFont] = useState("Space Grotesk");
  const [layout, setLayout] = useState("Hero Focus");
  const [active, setActive] = useState<Record<string, boolean>>({ Features: true, Stats: true });

  const toggle = (c: string) => setActive((s) => ({ ...s, [c]: !s[c] }));

  const previewKey = `${primary}${secondary}${style}${font}${layout}${JSON.stringify(active)}`;

  return (
    <section className="py-24">
      <div className="container">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-bold sm:text-4xl">Live Website Builder</h2>
          <p className="mt-4 text-muted">Customize layout, colors, fonts, style, industry, and sections in real time.</p>
        </Reveal>

        <div className="mt-16 grid gap-8 lg:grid-cols-[1fr_1.25fr]">
          <Reveal className="rounded-3xl border border-white/10 bg-charcoal/60 p-6 shadow-2xl backdrop-blur-sm" delay={0.1}>
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
                    <Paintbrush size={16} className="text-accent" /> Background
                  </label>
                  <input type="color" value={secondary} onChange={(e) => setSecondary(e.target.value)} className="h-10 w-full cursor-pointer rounded-lg border border-white/10 bg-transparent" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
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
              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground">
                  <LayoutGrid size={16} className="text-accent" /> Layout
                </label>
                <Select value={layout} onChange={(e) => setLayout(e.target.value)}>
                  {layouts.map((l) => (
                    <option key={l} value={l}>{l}</option>
                  ))}
                </Select>
              </div>
              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground">
                  <Layers size={16} className="text-accent" /> Components
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {components.map((c) => (
                    <button key={c} onClick={() => toggle(c)} className={cn(
                      "flex items-center justify-between rounded-lg border px-3 py-2 text-sm transition-colors",
                      active[c] ? "border-accent bg-accent/10 text-foreground" : "border-white/10 bg-charcoal/40 text-muted hover:text-foreground"
                    )}>
                      {c}
                      {active[c] && <Check size={14} className="text-accent" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <AnimatePresence mode="wait">
              <motion.div
                key={previewKey}
                initial={{ opacity: 0.8, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0.8, scale: 0.98 }}
                transition={{ duration: 0.35 }}
                className="overflow-hidden rounded-3xl border border-white/10 shadow-2xl"
                style={{ backgroundColor: secondary }}
              >
                <div className="flex h-8 items-center gap-2 bg-black/20 px-4">
                  <div className="h-3 w-3 rounded-full bg-red-500" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500" />
                  <div className="h-3 w-3 rounded-full bg-green-500" />
                </div>

                {layout === "Hero Focus" && (
                  <div className="p-8" style={{ color: "#fff" }}>
                    <span className={`inline-block px-4 py-2 text-sm font-medium text-white ${styleMap[style]}`} style={{ backgroundColor: primary }}>{industry}</span>
                    <h1 className={`mt-6 text-4xl leading-tight ${fontMap[font]} ${styleMap[style]}`}>{name}</h1>
                    <p className="mt-4 max-w-md text-white/70">Premium digital experiences for {industry.toLowerCase()} brands.</p>
                    <div className="mt-8 flex gap-4">
                      <button className={`px-6 py-3 text-sm font-medium text-white ${styleMap[style]}`} style={{ backgroundColor: primary }}>Get Started</button>
                      <button className={`border border-white/20 px-6 py-3 text-sm font-medium text-white ${styleMap[style]}`}>Learn More</button>
                    </div>
                  </div>
                )}

                {layout === "Split" && (
                  <div className="grid gap-8 p-8 lg:grid-cols-2" style={{ color: "#fff" }}>
                    <div>
                      <span className={`inline-block px-4 py-2 text-sm font-medium text-white ${styleMap[style]}`} style={{ backgroundColor: primary }}>{industry}</span>
                      <h1 className={`mt-6 text-4xl leading-tight ${fontMap[font]} ${styleMap[style]}`}>{name}</h1>
                      <p className="mt-4 text-white/70">We design and build conversion-focused products for {industry.toLowerCase()}.</p>
                    </div>
                    <div className={`rounded-2xl border border-white/10 bg-white/5 p-6 ${styleMap[style]}`}>
                      <div className="h-4 w-24 rounded bg-white/10" />
                      <div className="mt-4 h-3 w-3/4 rounded bg-white/10" />
                      <div className="mt-2 h-3 w-1/2 rounded bg-white/10" />
                    </div>
                  </div>
                )}

                {layout === "Grid" && (
                  <div className="p-8 text-center" style={{ color: "#fff" }}>
                    <h1 className={`text-4xl leading-tight ${fontMap[font]} ${styleMap[style]}`}>{name}</h1>
                    <p className="mx-auto mt-4 max-w-lg text-white/70">{industry} solutions that move fast and look incredible.</p>
                    <div className="mt-8 grid grid-cols-3 gap-4">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className={`rounded-2xl border border-white/10 bg-white/5 p-5 ${styleMap[style]}`}>
                          <div className="mx-auto h-10 w-10 rounded-lg" style={{ backgroundColor: primary }} />
                          <div className="mt-4 h-3 w-3/4 rounded bg-white/10 mx-auto" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {layout === "Centered" && (
                  <div className="flex flex-col items-center p-8 text-center" style={{ color: "#fff" }}>
                    <span className={`px-4 py-2 text-sm font-medium text-white ${styleMap[style]}`} style={{ backgroundColor: primary }}>{industry}</span>
                    <h1 className={`mt-6 max-w-xl text-4xl leading-tight ${fontMap[font]} ${styleMap[style]}`}>{name}</h1>
                    <p className="mt-4 max-w-md text-white/70">A premium {industry.toLowerCase()} experience built for growth.</p>
                    <button className={`mt-8 px-8 py-3 text-sm font-medium text-white ${styleMap[style]}`} style={{ backgroundColor: primary }}>Start Now</button>
                  </div>
                )}

                {active["Features"] && (
                  <div className="grid gap-4 border-t border-white/10 p-8 sm:grid-cols-3" style={{ color: "#fff" }}>
                    {["Strategy", "Design", "Development"].map((f) => (
                      <div key={f} className={`rounded-xl border border-white/10 bg-white/5 p-4 ${styleMap[style]}`}>
                        <div className="h-2 w-12 rounded" style={{ backgroundColor: primary }} />
                        <p className="mt-3 text-sm font-medium text-white">{f}</p>
                      </div>
                    ))}
                  </div>
                )}

                {active["Testimonial"] && (
                  <div className="border-t border-white/10 p-8" style={{ color: "#fff" }}>
                    <p className={`text-lg italic text-white/80 ${fontMap[font]}`}>&quot;{name} transformed how we present our {industry.toLowerCase()} brand online.&quot;</p>
                    <p className="mt-2 text-sm text-white/50">— A happy client</p>
                  </div>
                )}

                {active["Pricing"] && (
                  <div className="grid gap-4 border-t border-white/10 p-8 sm:grid-cols-3" style={{ color: "#fff" }}>
                    {["Starter", "Growth", "Enterprise"].map((p) => (
                      <div key={p} className={`rounded-xl border border-white/10 p-4 text-center ${styleMap[style]}`}>
                        <p className="text-sm text-white/60">{p}</p>
                        <p className="mt-2 text-2xl font-bold text-white" style={{ color: primary }}>{previewPrices[p]}</p>
                      </div>
                    ))}
                  </div>
                )}

                {active["Stats"] && (
                  <div className="flex flex-wrap justify-around gap-4 border-t border-white/10 p-8" style={{ color: "#fff" }}>
                    {[{ l: "Projects", v: "120+" }, { l: "Clients", v: "85" }, { l: "Awards", v: "12" }].map((s) => (
                      <div key={s.l} className="text-center">
                        <p className="text-2xl font-bold" style={{ color: primary }}>{s.v}</p>
                        <p className="text-xs text-white/60">{s.l}</p>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
