import { NextRequest, NextResponse } from "next/server";
import { defaultConfig, SiteConfig } from "@/lib/siteConfig";
import {
  getClientIp,
  getOrigin,
  isAllowedOrigin,
  parseJsonBody,
  tooManyRequests,
} from "@/lib/security/helpers";
import { checkRateLimit, getRateLimitKey } from "@/lib/security/rateLimiter";
import { isAdminAuthorized } from "@/lib/security/adminAuth";
import { getSiteConfig, saveSiteConfig } from "@/lib/db/adminDb";

export async function GET(request: NextRequest) {
  const origin = getOrigin(request);
  if (!isAllowedOrigin(origin)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const ip = getClientIp(request);
  const limit = checkRateLimit(getRateLimitKey(ip, "/api/admin/config:get"), {
    windowMs: 60 * 1000,
    maxRequests: 10,
    blockDurationMs: 15 * 60 * 1000,
  });
  if (!limit.allowed) {
    return tooManyRequests(limit.retryAfter);
  }

  const config = getSiteConfig();
  return NextResponse.json(config);
}

export async function POST(req: NextRequest) {
  const origin = getOrigin(req);
  if (!isAllowedOrigin(origin)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const ip = getClientIp(req);
  const limit = checkRateLimit(getRateLimitKey(ip, "/api/admin/config:post"), {
    windowMs: 60 * 1000,
    maxRequests: 5,
    blockDurationMs: 30 * 60 * 1000,
  });
  if (!limit.allowed) {
    return tooManyRequests(limit.retryAfter);
  }

  if (!(await isAdminAuthorized(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = (await parseJsonBody(req)) as SiteConfig;
    if (typeof body !== "object" || body === null || Array.isArray(body)) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const merged = { ...defaultConfig, ...body };
    saveSiteConfig(merged);
    return NextResponse.json(merged);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
