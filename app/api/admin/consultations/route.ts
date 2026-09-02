import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import { existsSync } from "fs";
import { join } from "path";
import {
  getClientIp,
  getOrigin,
  isAllowedOrigin,
  tooManyRequests,
} from "@/lib/security/helpers";
import { checkRateLimit, getRateLimitKey } from "@/lib/security/rateLimiter";
import { isAdminAuthorized } from "@/lib/security/adminAuth";

const CONSULTATIONS_PATH = join(process.cwd(), "data", "freeConsultations.json");

export async function GET(request: NextRequest) {
  const origin = getOrigin(request);
  if (!isAllowedOrigin(origin)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const ip = getClientIp(request);
  const limit = checkRateLimit(getRateLimitKey(ip, "/api/admin/consultations"), {
    windowMs: 60 * 1000,
    maxRequests: 10,
    blockDurationMs: 15 * 60 * 1000,
  });
  if (!limit.allowed) {
    return tooManyRequests(limit.retryAfter);
  }

  if (!(await isAdminAuthorized(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!existsSync(CONSULTATIONS_PATH)) {
    return NextResponse.json([]);
  }

  try {
    const raw = await readFile(CONSULTATIONS_PATH, "utf-8");
    const records = JSON.parse(raw) as unknown[];
    if (!Array.isArray(records)) return NextResponse.json([]);
    return NextResponse.json(records);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
