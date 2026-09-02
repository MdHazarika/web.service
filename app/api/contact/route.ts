import { NextRequest, NextResponse } from "next/server";
import { plans, appPlans } from "@/lib/plans";
import {
  getClientIp,
  getOrigin,
  isAllowedOrigin,
  parseJsonBody,
  safeString,
  sanitizeText,
  validateEmail,
  validatePhone,
  tooManyRequests,
} from "@/lib/security/helpers";
import { checkRateLimit, getRateLimitKey } from "@/lib/security/rateLimiter";

const GOOGLE_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLScukh2xvWrV_SstH4Urs9QJXLd3zlQFdZhDX2pmIyqEWt7Uwg/formResponse";

const GOOGLE_ENTRIES = {
  name: "entry.1118469201",
  email: "entry.1889150766",
  phone: "entry.713231716",
  country: "entry.1629797963",
  budget: "entry.377420309",
  plan: "entry.415587365",
  message: "entry.519571325",
  company: "entry.1183478542",
  source: "entry.705378089",
};

const GOOGLE_COUNTRY: Record<string, string> = {
  IN: "India (+91)",
  AE: "UAE (+971)",
};

const GOOGLE_BUDGET: Record<string, string> = {
  "<20000": "Under ₹20,000",
  "20000-60000": "₹20,000 – ₹60,000",
  "60000-100000": "₹60,000 – ₹1,00,000",
  ">100000": "₹1,00,000+",
};

const GOOGLE_SOURCE: Record<string, string> = {
  google: "Google Search",
  social: "Social media",
  referral: "Referral",
  other: "Other",
};

const COUNTRY_OPTIONS = new Set(["IN", "AE"]);
const BUDGET_OPTIONS = new Set(["", "<20000", "20000-60000", "60000-100000", ">100000"]);
const SOURCE_OPTIONS = new Set(["", "google", "social", "referral", "other"]);
const ALL_PLAN_IDS = new Set([...plans, ...appPlans].map((p) => p.id));

function getGooglePlanLabel(planId: string) {
  if (planId === "custom" || planId === "app-custom") return "Custom";
  if (planId === "app-starter") return "App Development";
  const allPlans = [...plans, ...appPlans];
  const plan = allPlans.find((p) => p.id === planId);
  return plan ? plan.name : "";
}

export async function POST(request: NextRequest) {
  const origin = getOrigin(request);
  if (!isAllowedOrigin(origin)) {
    return NextResponse.json({ success: false, message: "Forbidden" }, { status: 403 });
  }

  const ip = getClientIp(request);
  const limit = checkRateLimit(getRateLimitKey(ip, "/api/contact"), {
    windowMs: 60 * 1000,
    maxRequests: 5,
    blockDurationMs: 15 * 60 * 1000,
  });
  if (!limit.allowed) {
    return tooManyRequests(limit.retryAfter);
  }

  try {
    const rawBody = await parseJsonBody(request);
    if (!rawBody || typeof rawBody !== "object" || Array.isArray(rawBody)) {
      return NextResponse.json({ success: false, message: "Invalid payload" }, { status: 400 });
    }

    const body = rawBody as Record<string, unknown>;
    const name = safeString(body.name, 100);
    const email = safeString(body.email, 254).toLowerCase();
    const country = safeString(body.country, 2).toUpperCase();
    const phone = safeString(body.phone, 30);
    const company = safeString(body.company, 100);
    const plan = safeString(body.plan, 50);
    const description = sanitizeText(body.description as string, 2000);
    const budget = safeString(body.budget, 20);
    const source = safeString(body.source, 30);

    if (!name || !email || !validateEmail(email) || !country) {
      return NextResponse.json({ success: false, message: "Invalid name, email or country" }, { status: 400 });
    }
    if (!COUNTRY_OPTIONS.has(country)) {
      return NextResponse.json({ success: false, message: "Invalid country" }, { status: 400 });
    }
    if (!phone || !validatePhone(phone)) {
      return NextResponse.json({ success: false, message: "Invalid phone number" }, { status: 400 });
    }
    if (!plan || !ALL_PLAN_IDS.has(plan)) {
      return NextResponse.json({ success: false, message: "Invalid plan" }, { status: 400 });
    }
    if (!description) {
      return NextResponse.json({ success: false, message: "Project description is required" }, { status: 400 });
    }
    if (budget && !BUDGET_OPTIONS.has(budget)) {
      return NextResponse.json({ success: false, message: "Invalid budget" }, { status: 400 });
    }
    if (source && !SOURCE_OPTIONS.has(source)) {
      return NextResponse.json({ success: false, message: "Invalid source" }, { status: 400 });
    }

    const params = new URLSearchParams({
      [GOOGLE_ENTRIES.name]: name,
      [GOOGLE_ENTRIES.email]: email,
      [GOOGLE_ENTRIES.phone]: phone,
      [GOOGLE_ENTRIES.country]: GOOGLE_COUNTRY[country] || country,
      [GOOGLE_ENTRIES.plan]: getGooglePlanLabel(plan),
      [GOOGLE_ENTRIES.message]: description,
      submit: "Submit",
    });

    if (company) {
      params.append(GOOGLE_ENTRIES.company, company);
    }
    if (budget) {
      const budgetLabel = GOOGLE_BUDGET[budget];
      if (budgetLabel) {
        params.append(GOOGLE_ENTRIES.budget, budgetLabel);
      }
    }
    if (source) {
      const sourceLabel = GOOGLE_SOURCE[source];
      if (sourceLabel) {
        params.append(GOOGLE_ENTRIES.source, sourceLabel);
      }
    }

    try {
      await fetch(GOOGLE_FORM_URL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params.toString(),
      });
    } catch (googleErr) {
      console.error("[Google Form submission error]", googleErr);
    }

    console.log("[Contact form submission]", {
      name,
      email,
      country,
      phone,
      company,
      plan,
      description,
      budget,
      source,
      ip,
    });

    return NextResponse.json({ success: true, message: "Inquiry received" });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Invalid request";
    return NextResponse.json({ success: false, message }, { status: 400 });
  }
}
