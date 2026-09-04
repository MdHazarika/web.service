import { NextRequest, NextResponse } from "next/server";

const MAX_BODY_SIZE = 1024 * 1024; // 1 MB
const ALLOWED_ORIGINS = ["http://localhost:3000", "https://infomythweb.com", "https://infomythwebservice.in", "http://infomythwebservice.in", "https://www.infomythwebservice.in", "http://www.infomythwebservice.in"];

export function isAllowedOrigin(origin: string | null): boolean {
  if (!origin) return true;
  // Allow any localhost or 127.0.0.1 port for development
  if (origin.startsWith("http://localhost:") || origin.startsWith("http://127.0.0.1:")) return true;
  return ALLOWED_ORIGINS.some((o) => origin === o);
}

export function getClientIp(req: NextRequest | Request): string {
  const headers = "headers" in req ? req.headers : undefined;
  const forwarded = headers?.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() ?? "unknown";
  }
  const realIp = headers?.get("x-real-ip");
  if (realIp) return realIp;
  return "unknown";
}

export function getOrigin(req: Request): string | null {
  return req.headers.get("origin");
}

export function badRequest(message: string, status = 400) {
  return NextResponse.json({ success: false, message }, { status });
}

export function tooManyRequests(retryAfter: number) {
  return NextResponse.json(
    { success: false, message: "Too many requests. Please slow down." },
    { status: 429, headers: { "Retry-After": String(retryAfter) } }
  );
}

export async function parseJsonBody(req: Request): Promise<unknown> {
  const contentLength = req.headers.get("content-length");
  if (contentLength && parseInt(contentLength, 10) > MAX_BODY_SIZE) {
    throw new Error("Payload too large");
  }

  const raw = await req.text();
  if (raw.length > MAX_BODY_SIZE) {
    throw new Error("Payload too large");
  }

  if (!raw) return {};
  return JSON.parse(raw);
}

const XSS_PATTERN = /<script|javascript:|on\w+\s*=|data:text\/html|<iframe|<object|<embed|<form\b/i;

export function sanitizeText(input: string, maxLength = 500): string {
  if (typeof input !== "string") return "";
  let value = input
    .replace(/[\r\n]{3,}/g, "\n\n")
    .replace(/\x00/g, "")
    .trim()
    .slice(0, maxLength);

  // Catch obvious XSS injection attempts.
  if (XSS_PATTERN.test(value)) {
    value = value.replace(XSS_PATTERN, "[removed]");
  }

  return value;
}

export function validateEmail(email: string): boolean {
  if (typeof email !== "string") return false;
  const trimmed = email.trim();
  if (trimmed.length > 254) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
}

export function validatePhone(phone: string): boolean {
  if (typeof phone !== "string") return false;
  const digits = phone.replace(/\D/g, "");
  return digits.length >= 7 && digits.length <= 15;
}

// Prevent prototype pollution and deep object abuse.
export function isPlainObject(value: unknown): value is Record<string, unknown> {
  if (typeof value !== "object" || value === null) return false;
  const proto = Object.getPrototypeOf(value);
  return proto === Object.prototype || proto === null;
}

export function safeString(value: unknown, maxLength = 500): string {
  if (typeof value !== "string") return "";
  let text = value
    .replace(/\x00/g, "")
    .replace(/[\r\n]+/g, " ")
    .trim()
    .slice(0, maxLength);

  if (XSS_PATTERN.test(text)) {
    text = text.replace(XSS_PATTERN, "[removed]");
  }

  return text;
}
