"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Link from "next/link";
import { cn, formatINR } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { useSiteConfig } from "@/components/ConfigProvider";
import { type AppPlan, type Plan } from "@/lib/plans";
import { Damselfly } from "@/components/ui/Damselfly";

function PlanCard({ plan, index }: { plan: Plan; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.05 }}
      className={cn(
        "relative p-6",
        plan.popular
          ? "rounded-xl border-2 border-accent bg-charcoal"
          : "rounded-lg border border-white/10 bg-charcoal/40"
      )}
    >
      {plan.popular && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent px-3 py-1 text-xs font-medium text-white">
          Most Popular
        </span>
      )}
      {plan.id === "starter" && (
        <Damselfly className="absolute -right-8 -top-12 z-10 scale-[0.65]" />
      )}
      <h3
        className={cn(
          "font-heading text-xl font-semibold",
          plan.popular ? "text-white" : "text-foreground"
        )}
      >
        {plan.name}
      </h3>
      <p
        className={cn(
          "mt-2 text-sm",
          plan.popular ? "text-white/70" : "text-muted"
        )}
      >
        {plan.description}
      </p>
      <div className="mt-6">
        {!plan.custom && (
          <p className="text-base text-muted line-through">
            {formatINR(Math.round(plan.price / 0.6))}
          </p>
        )}
        <p
          className={cn(
            "font-heading text-4xl font-bold",
            plan.popular ? "text-white" : "text-foreground"
          )}
        >
          {plan.custom ? "Let’s Talk" : formatINR(plan.price)}
        </p>
      </div>
      <ul className="mt-6 space-y-3">
        {plan.features.map((feature) => (
          <li
            key={feature}
            className={cn(
              "flex items-start gap-3 text-sm",
              plan.popular ? "text-white/80" : "text-muted"
            )}
          >
            <Check
              size={18}
              className={cn(
                "mt-0.5 shrink-0",
                plan.popular ? "text-white" : "text-accent"
              )}
              aria-hidden="true"
            />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <Link
        href={`/contact?plan=${plan.id}`}
        className={cn(
          buttonVariants({
            variant: plan.popular ? "default" : "outline",
            size: "lg",
          }),
          "mt-8 w-full"
        )}
      >
        {plan.custom ? "Let’s talk" : "Select Plan"}
      </Link>
    </motion.div>
  );
}

function AppPlanCard({ plan, index }: { plan: AppPlan; index: number }) {
  const priceDisplay = plan.custom
    ? "Let’s Talk"
    : `${formatINR(plan.price)} – ${formatINR(plan.priceMax ?? plan.price)}`;

  const originalMin = plan.custom ? 0 : Math.round(plan.price / 0.6);
  const originalMax = plan.custom
    ? 0
    : Math.round((plan.priceMax ?? plan.price) / 0.6);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.05 }}
      className={cn(
        "relative p-6",
        plan.popular
          ? "rounded-xl border-2 border-accent bg-charcoal"
          : "rounded-lg border border-white/10 bg-charcoal/40"
      )}
    >
      {plan.popular && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent px-3 py-1 text-xs font-medium text-white">
          Most Popular
        </span>
      )}
      <h3
        className={cn(
          "font-heading text-xl font-semibold",
          plan.popular ? "text-white" : "text-foreground"
        )}
      >
        {plan.name}
      </h3>
      <p
        className={cn(
          "mt-2 text-sm",
          plan.popular ? "text-white/70" : "text-muted"
        )}
      >
        {plan.description}
      </p>
      <div className="mt-6">
        {!plan.custom && (
          <p className="text-base text-muted line-through">
            {formatINR(originalMin)}
            {plan.priceMax ? ` – ${formatINR(originalMax)}` : ""}
          </p>
        )}
        <p
          className={cn(
            "font-heading text-4xl font-bold",
            plan.popular ? "text-white" : "text-foreground"
          )}
        >
          {priceDisplay}
        </p>
      </div>
      <ul className="mt-6 space-y-3">
        {plan.features.map((feature) => (
          <li
            key={feature}
            className={cn(
              "flex items-start gap-3 text-sm",
              plan.popular ? "text-white/80" : "text-muted"
            )}
          >
            <Check
              size={18}
              className={cn(
                "mt-0.5 shrink-0",
                plan.popular ? "text-white" : "text-accent"
              )}
              aria-hidden="true"
            />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <Link
        href={`/contact?plan=${plan.id}`}
        className={cn(
          buttonVariants({
            variant: plan.popular ? "default" : "outline",
            size: "lg",
          }),
          "mt-8 w-full"
        )}
      >
        {plan.custom ? "Let’s talk" : "Select Plan"}
      </Link>
    </motion.div>
  );
}

export function Pricing() {
  const { config } = useSiteConfig();
  return (
    <section id="plans" className="bg-charcoal/30 py-24">
      <div className="container space-y-20">
        <div>
          <motion.div
            className="max-w-2xl"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2 className="font-heading text-3xl font-medium sm:text-4xl">
              Website plans
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              Transparent pricing. Pick a plan that fits your stage and we’ll tailor the details on the kickoff call.
            </p>
          </motion.div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:items-stretch">
            {config.plans.map((plan, i) => (
              <PlanCard key={plan.id} plan={plan} index={i} />
            ))}
          </div>
        </div>

        <div>
          <motion.div
            className="max-w-2xl"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2 className="font-heading text-3xl font-medium sm:text-4xl">
              App development
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              Native-quality iOS & Android apps. From MVPs to fully custom game, e-commerce, and logistics platforms.
            </p>
          </motion.div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
            {config.appPlans.map((plan, i) => (
              <AppPlanCard key={plan.id} plan={plan} index={i} />
            ))}
          </div>
        </div>

        <p className="text-center text-sm text-muted">
          Need something custom?{" "}
          <Link href="/contact" className="text-accent hover:underline">
            Contact us
          </Link>{" "}
          for a tailored quote.
        </p>
      </div>
    </section>
  );
}
