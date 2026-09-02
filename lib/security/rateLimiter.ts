// In-memory rate limiter for API routes.
// For production multi-instance deployments, replace with Redis.

interface RateLimitEntry {
  count: number;
  resetAt: number;
  blocked: boolean;
  blockExpires?: number;
}

interface RateLimitOptions {
  windowMs: number;
  maxRequests: number;
  blockDurationMs?: number;
}

const store = new Map<string, RateLimitEntry>();

function cleanup() {
  const now = Date.now();
  store.forEach((entry, key) => {
    if (entry.blocked && entry.blockExpires && now > entry.blockExpires) {
      store.delete(key);
    } else if (!entry.blocked && now > entry.resetAt) {
      store.delete(key);
    }
  });
}

setInterval(cleanup, 60_000).unref?.();

export function getRateLimitKey(identifier: string, route: string) {
  return `${identifier}:${route}`;
}

export function checkRateLimit(
  key: string,
  { windowMs, maxRequests, blockDurationMs = 15 * 60 * 1000 }: RateLimitOptions
): { allowed: boolean; retryAfter: number; remaining: number } {
  const now = Date.now();
  const entry = store.get(key);

  if (entry?.blocked) {
    const expires = entry.blockExpires ?? now;
    if (now < expires) {
      return { allowed: false, retryAfter: Math.ceil((expires - now) / 1000), remaining: 0 };
    }
    store.delete(key);
  }

  if (!entry || now > entry.resetAt) {
    store.set(key, { count: 1, resetAt: now + windowMs, blocked: false });
    return { allowed: true, retryAfter: 0, remaining: maxRequests - 1 };
  }

  if (entry.count >= maxRequests) {
    const blockExpires = now + blockDurationMs;
    store.set(key, { ...entry, blocked: true, blockExpires });
    return { allowed: false, retryAfter: Math.ceil(blockDurationMs / 1000), remaining: 0 };
  }

  entry.count += 1;
  return { allowed: true, retryAfter: 0, remaining: maxRequests - entry.count };
}
