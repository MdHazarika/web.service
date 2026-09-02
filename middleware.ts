import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { checkRateLimit, getRateLimitKey } from "@/lib/security/rateLimiter";

const BLOCKED_USER_AGENTS = /(sqlmap|nikto|masscan|nmap|gobuster|dirb|wfuzz|burp|metasploit|wp-scan)/i;

const SUSPICIOUS_PATHS = [
  /\.env$/,
  /\.git\//,
  /config\.json$/,
  /wp-admin/,
  /wp-login/,
  /phpmyadmin/,
  /admin\.php/,
  /xmlrpc\.php/,
  /\.well-known\/(?!security\.txt)/,
];

export function middleware(request: NextRequest) {
  const userAgent = request.headers.get("user-agent") ?? "";
  const pathname = request.nextUrl.pathname;

  // Block known scanning tools.
  if (BLOCKED_USER_AGENTS.test(userAgent)) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  // Block obvious probes of common vulnerable paths.
  if (SUSPICIOUS_PATHS.some((pattern) => pattern.test(pathname))) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  // Global IP-level rate limit for non-asset routes.
  if (!pathname.startsWith("/_next") && !pathname.startsWith("/favicon.ico")) {
    const forwarded = request.headers.get("x-forwarded-for");
    const realIp = request.headers.get("x-real-ip");
    const ip = forwarded?.split(",")[0]?.trim() ?? realIp ?? "unknown";
    const key = getRateLimitKey(ip, "global");
    const { allowed, retryAfter } = checkRateLimit(key, {
      windowMs: 60_000,
      maxRequests: 200,
      blockDurationMs: 5 * 60 * 1000,
    });

    if (!allowed) {
      return new NextResponse("Too many requests", {
        status: 429,
        headers: { "Retry-After": String(retryAfter) },
      });
    }
  }

  const response = NextResponse.next();

  // Ensure security headers are set even for Next.js internal routes.
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
