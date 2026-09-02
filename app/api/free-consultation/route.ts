import { NextRequest, NextResponse } from "next/server";
import { readFile, writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import { join } from "path";
import { randomUUID } from "crypto";
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

const DATA_DIR = join(process.cwd(), "data");
const CONSULTATIONS_PATH = join(DATA_DIR, "freeConsultations.json");

const MEETING_TYPES = new Set(["Google Meet", "Zoom", "Phone call"]);
const ALLOWED_TIMES = new Set([
  "9:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
]);
const SOURCE_OPTIONS = new Set(["", "google", "social", "referral", "other"]);

interface ConsultationRecord {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  date: string;
  time: string;
  meetingType: string;
  source: string;
  message: string;
  ip: string;
}

async function saveConsultation(record: ConsultationRecord): Promise<void> {
  if (!existsSync(DATA_DIR)) {
    await mkdir(DATA_DIR, { recursive: true });
  }
  let records: ConsultationRecord[] = [];
  if (existsSync(CONSULTATIONS_PATH)) {
    try {
      const raw = await readFile(CONSULTATIONS_PATH, "utf-8");
      records = JSON.parse(raw) as ConsultationRecord[];
      if (!Array.isArray(records)) records = [];
    } catch {
      records = [];
    }
  }
  records.push(record);
  await writeFile(CONSULTATIONS_PATH, JSON.stringify(records, null, 2), "utf-8");
}

function isValidISODate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const d = new Date(value);
  return !isNaN(d.getTime()) && value === d.toISOString().split("T")[0];
}

export async function POST(request: NextRequest) {
  const origin = getOrigin(request);
  if (!isAllowedOrigin(origin)) {
    return NextResponse.json({ success: false, message: "Forbidden" }, { status: 403 });
  }

  const ip = getClientIp(request);
  const limit = checkRateLimit(getRateLimitKey(ip, "/api/free-consultation"), {
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
    const phone = safeString(body.phone, 30);
    const company = safeString(body.company, 100);
    const date = safeString(body.date, 10);
    const time = safeString(body.time, 10);
    const meetingType = safeString(body.meetingType, 20);
    const source = safeString(body.source, 30);
    const message = sanitizeText(body.message as string, 2000);

    if (!name || !email || !validateEmail(email)) {
      return NextResponse.json({ success: false, message: "Invalid name or email" }, { status: 400 });
    }
    if (!phone || !validatePhone(phone)) {
      return NextResponse.json({ success: false, message: "Invalid phone number" }, { status: 400 });
    }
    if (!date || !isValidISODate(date)) {
      return NextResponse.json({ success: false, message: "Invalid date" }, { status: 400 });
    }
    if (!time || !ALLOWED_TIMES.has(time)) {
      return NextResponse.json({ success: false, message: "Invalid time" }, { status: 400 });
    }
    if (!meetingType || !MEETING_TYPES.has(meetingType)) {
      return NextResponse.json({ success: false, message: "Invalid meeting type" }, { status: 400 });
    }
    if (source && !SOURCE_OPTIONS.has(source)) {
      return NextResponse.json({ success: false, message: "Invalid source" }, { status: 400 });
    }

    const record: ConsultationRecord = {
      id: randomUUID(),
      createdAt: new Date().toISOString(),
      name,
      email,
      phone,
      company,
      date,
      time,
      meetingType,
      source,
      message,
      ip,
    };

    await saveConsultation(record);

    return NextResponse.json({
      success: true,
      message: "Consultation request received",
      id: record.id,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Invalid request";
    return NextResponse.json({ success: false, message }, { status: 400 });
  }
}
