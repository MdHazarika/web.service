"use client";

import { useMemo, useState } from "react";
import { FileText, Calendar, IndianRupee, Package, Send, Check } from "lucide-react";
import { Reveal } from "./Reveal";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useSiteConfig } from "@/components/ConfigProvider";
import { buttonVariants } from "@/components/ui/button";

function mapPackageToId(name: string) {
  if (name === "Enterprise") return "premium";
  return name.toLowerCase();
}

function getPlanByName(plans: { id: string; name: string; price: number; timeline?: string }[], name: string) {
  const id = mapPackageToId(name);
  return plans.find((p) => p.id === id) ?? plans[1];
}

const deliverables = ["Discovery & strategy", "UX wireframes", "UI design system", "Frontend development", "CMS integration", "SEO setup", "Launch & handoff"];

export function AIProposalGenerator() {
  const { config } = useSiteConfig();
  const [name, setName] = useState("Your Company");
  const [type, setType] = useState("Corporate Website");
  const [pages, setPages] = useState(8);
  const [packageName, setPackageName] = useState("Growth");
  const contactPlanId = mapPackageToId(packageName);

  const proposal = useMemo(() => {
    const plan = getPlanByName(config.plans, packageName);
    const base = plan.price;
    const pageCost = pages * 1000;
    const total = base + pageCost;
    const timeline = plan.timeline || "4 - 6 weeks";
    return { total, timeline };
  }, [packageName, pages, config.plans]);


  return (
    <section className="bg-charcoal/30 py-24">
      <div className="container">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-bold sm:text-4xl">AI Proposal Generator</h2>
          <p className="mt-4 text-muted">Generate a professional proposal with timeline, cost, and deliverables.</p>
        </Reveal>

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          <Reveal delay={0.1}>
            <div className="rounded-3xl border border-white/10 bg-charcoal/60 p-6 shadow-2xl backdrop-blur-sm sm:p-8">
              <h3 className="font-heading text-lg font-semibold text-foreground">Project details</h3>
              <div className="mt-5 space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">Client / project name</label>
                  <Input value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">Project type</label>
                  <Select value={type} onChange={(e) => setType(e.target.value)}>
                    {["Corporate Website", "E-commerce", "SaaS Platform", "Marketing Site", "Web App"].map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </Select>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">Number of pages: {pages}</label>
                  <input
                    type="range"
                    min={1}
                    max={50}
                    value={pages}
                    onChange={(e) => setPages(Number(e.target.value))}
                    className="w-full accent-accent"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">Package</label>
                  <div className="grid grid-cols-3 gap-2">
                    {["Starter", "Growth", "Enterprise"].map((p) => (
                      <button
                        key={p}
                        onClick={() => setPackageName(p)}
                        className={cn(
                          "rounded-xl border py-3 text-sm font-medium transition-colors",
                          packageName === p ? "border-accent bg-accent/10 text-foreground" : "border-white/10 bg-charcoal/40 text-muted hover:text-foreground"
                        )}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="rounded-3xl border border-accent/20 bg-charcoal/60 p-6 shadow-2xl backdrop-blur-sm sm:p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <FileText size={20} />
                </div>
                <h3 className="font-heading text-xl font-bold text-foreground">Proposal for {name}</h3>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-charcoal/40 p-4">
                  <p className="text-sm text-muted">Package</p>
                  <p className="mt-1 font-heading text-lg font-semibold text-foreground flex items-center gap-2"><Package size={16} /> {packageName}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-charcoal/40 p-4">
                  <p className="text-sm text-muted">Timeline</p>
                  <p className="mt-1 font-heading text-lg font-semibold text-foreground flex items-center gap-2"><Calendar size={16} /> {proposal.timeline}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-charcoal/40 p-4">
                  <p className="text-sm text-muted">Investment</p>
                  <p className="mt-1 font-heading text-lg font-semibold text-foreground flex items-center gap-2"><IndianRupee size={16} /> {proposal.total.toLocaleString("en-IN")}</p>
                </div>
              </div>

              <div className="mt-6">
                <p className="text-sm font-medium text-foreground">Deliverables</p>
                <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                  {deliverables.map((d) => (
                    <li key={d} className="flex items-center gap-2 text-sm text-muted">
                      <Check size={14} className="text-accent" /> {d}
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href={`/contact?plan=${contactPlanId}`}
                className={cn(buttonVariants({ variant: "outline" }), "mt-8 w-full text-center")}
              >
                <Send size={16} className="mr-2" /> Send to us
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
