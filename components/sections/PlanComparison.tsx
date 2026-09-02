"use client";

import { Check, X } from "lucide-react";
import Link from "next/link";
import { Reveal } from "./Reveal";
import { useSiteConfig } from "@/components/ConfigProvider";
import { cn, formatINR } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

const features = [
  { key: "pages", label: "Pages", values: { starter: "Custom landing / multi-section", growth: "Up to 25-30", premium: "Unlimited" } },
  { key: "design", label: "Custom Design", values: { starter: true, growth: true, premium: true } },
  { key: "animations", label: "Animations", values: { starter: "Basic", growth: "Advanced", premium: "Premium" } },
  { key: "seo", label: "SEO Setup", values: { starter: "Basic", growth: "Advanced", premium: "Premium" } },
  { key: "cms", label: "CMS / Blog", values: { starter: false, growth: true, premium: true } },
  { key: "newsletter", label: "Newsletter", values: { starter: true, growth: true, premium: true } },
  { key: "analytics", label: "Analytics & Search Console", values: { starter: false, growth: true, premium: true } },
  { key: "social", label: "Social Sharing / Open Graph", values: { starter: true, growth: true, premium: true } },
  { key: "admin", label: "Admin Panel", values: { starter: false, growth: false, premium: true } },
  { key: "hosting", label: "Hosting Support", values: { starter: true, growth: true, premium: true } },
  { key: "support", label: "Priority Support", values: { starter: false, growth: false, premium: true } },
  { key: "ai", label: "AI Features", values: { starter: false, growth: false, premium: true } },
  { key: "payments", label: "Payment Gateway", values: { starter: false, growth: true, premium: true } },
  { key: "api", label: "API Integration", values: { starter: false, growth: false, premium: true } },
  { key: "dashboard", label: "Dashboard", values: { starter: false, growth: false, premium: true } },
  { key: "delivery", label: "Delivery Time", values: { starter: "2 weeks", growth: "3–4 weeks", premium: "6–8 weeks" } },
];

function render(value: boolean | string) {
  if (typeof value === "boolean") {
    return value ? <Check size={18} className="mx-auto text-accent" /> : <X size={18} className="mx-auto text-muted" />;
  }
  return <span className="text-sm text-muted">{value}</span>;
}

export function PlanComparison() {
  const { config } = useSiteConfig();
  const comparePlans = config.plans.filter((p) => !p.custom);

  return (
    <section id="compare" className="bg-charcoal/30 py-24">
      <div className="container">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-3xl font-bold sm:text-4xl">Compare plans</h2>
          <p className="mt-4 text-muted">Side-by-side details to help you choose the right package.</p>
        </Reveal>

        <Reveal className="mt-12 overflow-x-auto" delay={0.1}>
          <table className="w-full min-w-[700px] border-collapse rounded-2xl border border-white/10 bg-charcoal/40">
            <thead>
              <tr className="border-b border-white/10">
                <th className="p-4 text-left text-sm font-medium text-muted">Feature</th>
                {comparePlans.map((plan) => (
                  <th key={plan.id} className="p-4 text-center text-sm font-semibold text-foreground">
                    {plan.name}
                    <div className="mt-1 flex flex-col items-center gap-0.5 text-xs">
                      <span className="text-muted line-through">{formatINR(Math.round(plan.price / 0.6))}</span>
                      <span className="font-medium text-accent">{formatINR(plan.price)}</span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {features.map((feature) => (
                <tr key={feature.key} className="border-b border-white/5 last:border-0">
                  <td className="p-4 text-sm font-medium text-foreground">{feature.label}</td>
                  {comparePlans.map((plan) => (
                    <td key={plan.id} className="p-4 text-center">
                      {render(feature.values[plan.id as keyof typeof feature.values])}
                    </td>
                  ))}
                </tr>
              ))}
              <tr>
                <td className="p-4" />
                {comparePlans.map((plan) => (
                  <td key={plan.id} className="p-4 text-center">
                    <Link href={`/contact?plan=${plan.id}`} className={cn(buttonVariants({ size: "sm" }))}>
                      Choose
                    </Link>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </Reveal>
      </div>
    </section>
  );
}
