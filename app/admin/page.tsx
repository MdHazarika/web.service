"use client";

import { useEffect, useState } from "react";
import { Save, Loader2, RefreshCcw, Eye, EyeOff, Plus, Trash2, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { SiteConfig, defaultConfig } from "@/lib/siteConfig";

export default function AdminPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [config, setConfig] = useState<SiteConfig>(defaultConfig);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [tab, setTab] = useState<"plans" | "app" | "testimonials" | "stats" | "offer" | "styles" | "sections">("plans");

  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    setLoading(true);
    const res = await fetch("/api/admin/me", { credentials: "include" });
    if (res.ok) {
      setIsAuthenticated(true);
      await loadConfig();
    } else {
      setIsAuthenticated(false);
      setLoading(false);
    }
  };

  const loadConfig = async () => {
    setLoading(true);
    const res = await fetch("/api/admin/config", { credentials: "include" });
    if (res.ok) {
      const data = await res.json();
      setConfig({ ...defaultConfig, ...data });
    } else if (res.status === 401) {
      setIsAuthenticated(false);
      setMessage("Session expired. Please log in again.");
    }
    setLoading(false);
  };

  const login = async () => {
    setLoading(true);
    setMessage("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });
    if (res.ok) {
      setIsAuthenticated(true);
      setPassword("");
      await loadConfig();
    } else {
      setLoading(false);
      const err = await res.json().catch(() => ({}));
      setMessage(err.error || "Invalid email or password.");
    }
  };

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST", credentials: "include" });
    setIsAuthenticated(false);
    setConfig(defaultConfig);
    setMessage("");
  };

  const save = async () => {
    setSaving(true);
    setMessage("");
    const res = await fetch("/api/admin/config", {
      method: "POST",
      headers: { "content-type": "application/json" },
      credentials: "include",
      body: JSON.stringify(config),
    });
    if (res.ok) {
      setMessage("Saved. Refresh the main site to see changes.");
    } else {
      const err = await res.json().catch(() => ({}));
      setMessage(err.error || "Failed to save.");
    }
    setSaving(false);
  };

  const updatePlan = (index: number, key: keyof SiteConfig["plans"][number], value: unknown) => {
    const next = [...config.plans];
    next[index] = { ...next[index], [key]: value } as (typeof next)[number];
    setConfig({ ...config, plans: next });
  };

  const updatePlanFeature = (planIndex: number, featureIndex: number, value: string) => {
    const next = [...config.plans];
    const features = [...next[planIndex].features];
    features[featureIndex] = value;
    next[planIndex] = { ...next[planIndex], features };
    setConfig({ ...config, plans: next });
  };

  const addPlanFeature = (planIndex: number) => {
    const next = [...config.plans];
    next[planIndex] = { ...next[planIndex], features: [...next[planIndex].features, ""] };
    setConfig({ ...config, plans: next });
  };

  const removePlanFeature = (planIndex: number, featureIndex: number) => {
    const next = [...config.plans];
    next[planIndex] = { ...next[planIndex], features: next[planIndex].features.filter((_, i) => i !== featureIndex) };
    setConfig({ ...config, plans: next });
  };

  const updateAppPlan = (index: number, key: keyof SiteConfig["appPlans"][number], value: unknown) => {
    const next = [...config.appPlans];
    next[index] = { ...next[index], [key]: value } as (typeof next)[number];
    setConfig({ ...config, appPlans: next });
  };

  const updateAppFeature = (planIndex: number, featureIndex: number, value: string) => {
    const next = [...config.appPlans];
    const features = [...next[planIndex].features];
    features[featureIndex] = value;
    next[planIndex] = { ...next[planIndex], features };
    setConfig({ ...config, appPlans: next });
  };

  const addAppFeature = (planIndex: number) => {
    const next = [...config.appPlans];
    next[planIndex] = { ...next[planIndex], features: [...next[planIndex].features, ""] };
    setConfig({ ...config, appPlans: next });
  };

  const removeAppFeature = (planIndex: number, featureIndex: number) => {
    const next = [...config.appPlans];
    next[planIndex] = { ...next[planIndex], features: next[planIndex].features.filter((_, i) => i !== featureIndex) };
    setConfig({ ...config, appPlans: next });
  };

  const toggleSection = (key: string) => {
    setConfig({
      ...config,
      sections: { ...config.sections, [key]: !config.sections[key] },
    });
  };

  const updateTestimonial = (index: number, key: keyof SiteConfig["testimonials"][number], value: unknown) => {
    const next = [...config.testimonials];
    next[index] = { ...next[index], [key]: value } as (typeof next)[number];
    setConfig({ ...config, testimonials: next });
  };

  const addTestimonial = () => {
    setConfig({
      ...config,
      testimonials: [...config.testimonials, { quote: "", name: "", role: "", rating: 5 }],
    });
  };

  const removeTestimonial = (index: number) => {
    setConfig({
      ...config,
      testimonials: config.testimonials.filter((_, i) => i !== index),
    });
  };

  const updateStats = (value: string) => {
    setConfig({
      ...config,
      stats: { ...config.stats, launchedWebsites: value },
    });
  };

  if (!isAuthenticated) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-charcoal px-4">
        <div className="w-full max-w-md rounded-2xl border border-white/10 bg-charcoal/60 p-8 shadow-2xl">
          <h1 className="font-heading text-2xl font-bold text-foreground">Admin Panel</h1>
          <p className="mt-2 text-sm text-muted">Enter admin email and password to manage the site.</p>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Admin email"
            className="mt-6 w-full rounded-lg border border-white/10 bg-charcoal/70 px-4 py-3 text-foreground outline-none focus:border-accent"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Admin password"
            className="mt-4 w-full rounded-lg border border-white/10 bg-charcoal/70 px-4 py-3 text-foreground outline-none focus:border-accent"
          />
          <button
            onClick={login}
            className="mt-4 w-full rounded-lg bg-accent py-3 font-semibold text-white transition hover:bg-accent/90"
          >
            Login
          </button>
        </div>
      </main>
    );
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-charcoal">
        <Loader2 className="h-8 w-8 animate-spin text-accent" />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-charcoal px-4 py-8 text-foreground">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-heading text-3xl font-bold">Admin Panel</h1>
            <p className="text-sm text-muted">Manage plans, offers, styles, and section visibility.</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={logout}
              className="flex items-center gap-2 rounded-lg border border-white/10 bg-charcoal/40 px-4 py-2 text-sm text-muted transition hover:bg-charcoal/60 hover:text-foreground"
            >
              <LogOut size={16} /> Logout
            </button>
            <button onClick={() => loadConfig()} className="rounded-lg border border-white/10 bg-charcoal/40 px-4 py-2 text-sm hover:bg-charcoal/60">
              <RefreshCcw size={16} className="inline-block align-text-top" /> Reload
            </button>
            <button
              onClick={save}
              disabled={saving}
              className="flex items-center gap-2 rounded-lg bg-accent px-5 py-2 font-semibold text-white transition hover:bg-accent/90 disabled:opacity-60"
            >
              {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
              Save Changes
            </button>
          </div>
        </div>

        {message && (
          <div className={cn("mb-6 rounded-lg border px-4 py-3 text-sm", message.includes("Failed") ? "border-red-500/30 bg-red-500/10 text-red-300" : "border-emerald-500/30 bg-emerald-500/10 text-emerald-300")}>
            {message}
          </div>
        )}

        <div className="mb-6 flex flex-wrap gap-2">
          {(["plans", "app", "testimonials", "stats", "offer", "styles", "sections"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                "rounded-lg px-4 py-2 text-sm font-medium transition",
                tab === t ? "bg-accent text-white" : "bg-charcoal/40 text-muted hover:text-foreground"
              )}
            >
              {t[0].toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        {tab === "plans" && (
          <div className="space-y-6">
            {config.plans.map((plan, i) => (
              <div key={plan.id} className="rounded-2xl border border-white/10 bg-charcoal/40 p-6">
                <div className="mb-4 grid gap-4 sm:grid-cols-4">
                  <input
                    value={plan.name}
                    onChange={(e) => updatePlan(i, "name", e.target.value)}
                    placeholder="Name"
                    className="rounded-lg border border-white/10 bg-charcoal/60 px-3 py-2 text-foreground outline-none focus:border-accent"
                  />
                  <input
                    type="number"
                    value={plan.price}
                    onChange={(e) => updatePlan(i, "price", Number(e.target.value))}
                    placeholder="Price"
                    className="rounded-lg border border-white/10 bg-charcoal/60 px-3 py-2 text-foreground outline-none focus:border-accent"
                  />
                  <input
                    value={plan.description}
                    onChange={(e) => updatePlan(i, "description", e.target.value)}
                    placeholder="Description"
                    className="sm:col-span-2 rounded-lg border border-white/10 bg-charcoal/60 px-3 py-2 text-foreground outline-none focus:border-accent"
                  />
                  <input
                    value={plan.timeline || ""}
                    onChange={(e) => updatePlan(i, "timeline", e.target.value)}
                    placeholder="Timeline"
                    className="sm:col-span-2 rounded-lg border border-white/10 bg-charcoal/60 px-3 py-2 text-foreground outline-none focus:border-accent"
                  />
                </div>

                <div className="mb-4 flex flex-wrap gap-4 text-sm">
                  <label className="flex items-center gap-2 text-muted">
                    <input
                      type="checkbox"
                      checked={!!plan.popular}
                      onChange={(e) => updatePlan(i, "popular", e.target.checked)}
                      className="accent-accent"
                    />
                    Popular
                  </label>
                  <label className="flex items-center gap-2 text-muted">
                    <input
                      type="checkbox"
                      checked={!!plan.custom}
                      onChange={(e) => updatePlan(i, "custom", e.target.checked)}
                      className="accent-accent"
                    />
                    Custom (Let&apos;s Talk)
                  </label>
                </div>

                <p className="mb-2 text-sm font-medium text-foreground">Features</p>
                <div className="space-y-2">
                  {plan.features.map((feature, fi) => (
                    <div key={fi} className="flex gap-2">
                      <input
                        value={feature}
                        onChange={(e) => updatePlanFeature(i, fi, e.target.value)}
                        className="flex-1 rounded-lg border border-white/10 bg-charcoal/60 px-3 py-2 text-foreground outline-none focus:border-accent"
                      />
                      <button onClick={() => removePlanFeature(i, fi)} className="rounded-lg border border-white/10 p-2 text-red-400 hover:bg-red-500/10">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
                <button onClick={() => addPlanFeature(i)} className="mt-3 flex items-center gap-2 text-sm text-accent hover:underline">
                  <Plus size={16} /> Add feature
                </button>
              </div>
            ))}
          </div>
        )}

        {tab === "app" && (
          <div className="space-y-6">
            {config.appPlans.map((plan, i) => (
              <div key={plan.id} className="rounded-2xl border border-white/10 bg-charcoal/40 p-6">
                <div className="mb-4 grid gap-4 sm:grid-cols-5">
                  <input
                    value={plan.name}
                    onChange={(e) => updateAppPlan(i, "name", e.target.value)}
                    placeholder="Name"
                    className="rounded-lg border border-white/10 bg-charcoal/60 px-3 py-2 text-foreground outline-none focus:border-accent"
                  />
                  <input
                    type="number"
                    value={plan.price}
                    onChange={(e) => updateAppPlan(i, "price", Number(e.target.value))}
                    placeholder="Min price"
                    className="rounded-lg border border-white/10 bg-charcoal/60 px-3 py-2 text-foreground outline-none focus:border-accent"
                  />
                  <input
                    type="number"
                    value={plan.priceMax ?? ""}
                    onChange={(e) => updateAppPlan(i, "priceMax", e.target.value ? Number(e.target.value) : undefined)}
                    placeholder="Max price (optional)"
                    className="rounded-lg border border-white/10 bg-charcoal/60 px-3 py-2 text-foreground outline-none focus:border-accent"
                  />
                  <input
                    value={plan.description}
                    onChange={(e) => updateAppPlan(i, "description", e.target.value)}
                    placeholder="Description"
                    className="sm:col-span-2 rounded-lg border border-white/10 bg-charcoal/60 px-3 py-2 text-foreground outline-none focus:border-accent"
                  />
                </div>

                <div className="mb-4 flex flex-wrap gap-4 text-sm">
                  <label className="flex items-center gap-2 text-muted">
                    <input
                      type="checkbox"
                      checked={!!plan.popular}
                      onChange={(e) => updateAppPlan(i, "popular", e.target.checked)}
                      className="accent-accent"
                    />
                    Popular
                  </label>
                  <label className="flex items-center gap-2 text-muted">
                    <input
                      type="checkbox"
                      checked={!!plan.custom}
                      onChange={(e) => updateAppPlan(i, "custom", e.target.checked)}
                      className="accent-accent"
                    />
                    Custom
                  </label>
                </div>

                <p className="mb-2 text-sm font-medium text-foreground">Features</p>
                <div className="space-y-2">
                  {plan.features.map((feature, fi) => (
                    <div key={fi} className="flex gap-2">
                      <input
                        value={feature}
                        onChange={(e) => updateAppFeature(i, fi, e.target.value)}
                        className="flex-1 rounded-lg border border-white/10 bg-charcoal/60 px-3 py-2 text-foreground outline-none focus:border-accent"
                      />
                      <button onClick={() => removeAppFeature(i, fi)} className="rounded-lg border border-white/10 p-2 text-red-400 hover:bg-red-500/10">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
                <button onClick={() => addAppFeature(i)} className="mt-3 flex items-center gap-2 text-sm text-accent hover:underline">
                  <Plus size={16} /> Add feature
                </button>
              </div>
            ))}
          </div>
        )}

        {tab === "offer" && (
          <div className="rounded-2xl border border-white/10 bg-charcoal/40 p-6">
            <label className="mb-4 flex items-center gap-2 text-foreground">
              <input
                type="checkbox"
                checked={config.offers.active}
                onChange={(e) => setConfig({ ...config, offers: { ...config.offers, active: e.target.checked } })}
                className="accent-accent"
              />
              Show offer banner
            </label>
            <div className="grid gap-4 sm:grid-cols-2">
              <input
                value={config.offers.message}
                onChange={(e) => setConfig({ ...config, offers: { ...config.offers, message: e.target.value } })}
                placeholder="Offer message"
                className="rounded-lg border border-white/10 bg-charcoal/60 px-3 py-2 text-foreground outline-none focus:border-accent"
              />
              <input
                value={config.offers.link}
                onChange={(e) => setConfig({ ...config, offers: { ...config.offers, link: e.target.value } })}
                placeholder="Offer link"
                className="rounded-lg border border-white/10 bg-charcoal/60 px-3 py-2 text-foreground outline-none focus:border-accent"
              />
              <div>
                <span className="mb-1 block text-xs text-muted">Background color</span>
                <input
                  type="color"
                  value={config.offers.bgColor}
                  onChange={(e) => setConfig({ ...config, offers: { ...config.offers, bgColor: e.target.value } })}
                  className="h-10 w-full rounded-lg border border-white/10 bg-transparent"
                />
              </div>
              <div>
                <span className="mb-1 block text-xs text-muted">Text color</span>
                <input
                  type="color"
                  value={config.offers.textColor}
                  onChange={(e) => setConfig({ ...config, offers: { ...config.offers, textColor: e.target.value } })}
                  className="h-10 w-full rounded-lg border border-white/10 bg-transparent"
                />
              </div>
            </div>
          </div>
        )}

        {tab === "styles" && (
          <div className="rounded-2xl border border-white/10 bg-charcoal/40 p-6">
            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <span className="mb-1 block text-xs text-muted">Primary color</span>
                <input
                  type="color"
                  value={config.globalStyles.primaryColor}
                  onChange={(e) => setConfig({ ...config, globalStyles: { ...config.globalStyles, primaryColor: e.target.value } })}
                  className="h-10 w-full rounded-lg border border-white/10 bg-transparent"
                />
              </div>
              <div>
                <span className="mb-1 block text-xs text-muted">Accent color</span>
                <input
                  type="color"
                  value={config.globalStyles.accentColor}
                  onChange={(e) => setConfig({ ...config, globalStyles: { ...config.globalStyles, accentColor: e.target.value } })}
                  className="h-10 w-full rounded-lg border border-white/10 bg-transparent"
                />
              </div>
              <div>
                <span className="mb-1 block text-xs text-muted">Border radius</span>
                <input
                  value={config.globalStyles.borderRadius}
                  onChange={(e) => setConfig({ ...config, globalStyles: { ...config.globalStyles, borderRadius: e.target.value } })}
                  className="w-full rounded-lg border border-white/10 bg-charcoal/60 px-3 py-2 text-foreground outline-none focus:border-accent"
                />
              </div>
            </div>
          </div>
        )}

        {tab === "testimonials" && (
          <div className="space-y-6">
            {config.testimonials.map((t, i) => (
              <div key={i} className="rounded-2xl border border-white/10 bg-charcoal/40 p-6">
                <div className="mb-3 grid gap-4 sm:grid-cols-2">
                  <input
                    value={t.name}
                    onChange={(e) => updateTestimonial(i, "name", e.target.value)}
                    placeholder="Name"
                    className="rounded-lg border border-white/10 bg-charcoal/60 px-3 py-2 text-foreground outline-none focus:border-accent"
                  />
                  <input
                    value={t.role}
                    onChange={(e) => updateTestimonial(i, "role", e.target.value)}
                    placeholder="Role / Location"
                    className="rounded-lg border border-white/10 bg-charcoal/60 px-3 py-2 text-foreground outline-none focus:border-accent"
                  />
                </div>
                <textarea
                  value={t.quote}
                  onChange={(e) => updateTestimonial(i, "quote", e.target.value)}
                  placeholder="Quote"
                  rows={3}
                  className="w-full rounded-lg border border-white/10 bg-charcoal/60 px-3 py-2 text-foreground outline-none focus:border-accent"
                />
                <div className="mt-3 flex items-center gap-4">
                  <select
                    value={t.rating ?? 5}
                    onChange={(e) => updateTestimonial(i, "rating", Number(e.target.value))}
                    className="rounded-lg border border-white/10 bg-charcoal/60 px-3 py-2 text-foreground outline-none focus:border-accent"
                  >
                    {[1, 2, 3, 4, 5].map((r) => (
                      <option key={r} value={r}>{r} stars</option>
                    ))}
                  </select>
                  <button onClick={() => removeTestimonial(i)} className="ml-auto flex items-center gap-2 text-sm text-red-400 hover:text-red-300">
                    <Trash2 size={16} /> Remove
                  </button>
                </div>
              </div>
            ))}
            <button onClick={addTestimonial} className="flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition hover:bg-accent/90">
              <Plus size={16} /> Add testimonial
            </button>
          </div>
        )}

        {tab === "stats" && (
          <div className="rounded-2xl border border-white/10 bg-charcoal/40 p-6">
            <div className="max-w-sm">
              <span className="mb-1 block text-xs text-muted">Launched websites counter</span>
              <input
                value={config.stats.launchedWebsites}
                onChange={(e) => updateStats(e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-charcoal/60 px-3 py-2 text-foreground outline-none focus:border-accent"
              />
            </div>
          </div>
        )}

        {tab === "sections" && (
          <div className="rounded-2xl border border-white/10 bg-charcoal/40 p-6">
            <p className="mb-4 text-sm text-muted">Toggle which sections appear on the home page.</p>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {Object.keys(defaultConfig.sections).map((key) => (
                <button
                  key={key}
                  onClick={() => toggleSection(key)}
                  className={cn(
                    "flex items-center justify-between rounded-lg border px-4 py-3 text-left text-sm transition",
                    config.sections[key]
                      ? "border-accent/30 bg-accent/10 text-foreground"
                      : "border-white/10 bg-charcoal/60 text-muted"
                  )}
                >
                  <span className="capitalize">{key.replace(/([A-Z])/g, " $1")}</span>
                  {config.sections[key] ? <Eye size={16} className="text-accent" /> : <EyeOff size={16} />}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
