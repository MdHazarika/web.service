import { NextRequest, NextResponse } from "next/server";
import {
  getClientIp,
  getOrigin,
  isAllowedOrigin,
  parseJsonBody,
  safeString,
  validateEmail,
  tooManyRequests,
} from "@/lib/security/helpers";
import { checkRateLimit, getRateLimitKey } from "@/lib/security/rateLimiter";

// To use this endpoint with a real Google Form, create the form at
// https://forms.google.com, add short-answer questions for the fields below,
// and use the pre-filled link to extract entry IDs.
const GOOGLE_FORM_URL =
  "https://docs.google.com/forms/d/e/YOUR_BOOKING_FORM_ID/formResponse";

const GOOGLE_ENTRIES = {
  name: "entry.YOUR_NAME_ENTRY_ID",
  email: "entry.YOUR_EMAIL_ENTRY_ID",
  date: "entry.YOUR_DATE_ENTRY_ID",
  time: "entry.YOUR_TIME_ENTRY_ID",
  meetingType: "entry.YOUR_MEETING_TYPE_ENTRY_ID",
};

const MEETING_TYPES = new Set(["meet", "zoom", "phone"]);
const ALLOWED_TIMES = new Set([
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
]);

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
  const limit = checkRateLimit(getRateLimitKey(ip, "/api/book"), {
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
    const date = safeString(body.date, 10);
    const time = safeString(body.time, 10);
    const meetingType = safeString(body.meetingType, 20);

    if (!name || !email || !validateEmail(email)) {
      return NextResponse.json({ success: false, message: "Invalid name or email" }, { status: 400 });
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

    const params = new URLSearchParams({
      [GOOGLE_ENTRIES.name]: name,
      [GOOGLE_ENTRIES.email]: email,
      [GOOGLE_ENTRIES.date]: date,
      [GOOGLE_ENTRIES.time]: time,
      [GOOGLE_ENTRIES.meetingType]: meetingType,
      submit: "Submit",
    });

    if (!GOOGLE_FORM_URL.includes("YOUR_BOOKING_FORM_ID")) {
      try {
        await fetch(GOOGLE_FORM_URL, {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: params.toString(),
        });
      } catch (googleErr) {
        console.error("[Google Form booking submission error]", googleErr);
      }
    }

    console.log("[Booking submission]", { name, email, date, time, meetingType, ip });

    return NextResponse.json({ success: true, message: "Booking request received" });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Invalid request";
    return NextResponse.json({ success: false, message }, { status: 400 });
  }
}
