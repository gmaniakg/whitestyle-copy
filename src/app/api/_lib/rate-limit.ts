interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const globalStore = globalThis as unknown as {
  __wsRateLimitStore?: Map<string, RateLimitEntry>;
};

const store = (globalStore.__wsRateLimitStore ??= new Map<string, RateLimitEntry>());

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  retryAfterSec: number;
}

/**
 * 고정 윈도우 기반 인메모리 레이트 리미터 (단기 DDoS 및 스팸 요청 차단)
 */
export function checkRateLimit(
  key: string,
  maxRequests: number,
  windowMs: number
): RateLimitResult {
  const now = Date.now();

  if (store.size > 1000) {
    for (const [k, v] of store.entries()) {
      if (v.resetAt <= now) store.delete(k);
    }
  }

  const existing = store.get(key);
  if (!existing || existing.resetAt <= now) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return {
      allowed: true,
      remaining: Math.max(maxRequests - 1, 0),
      retryAfterSec: Math.ceil(windowMs / 1000),
    };
  }

  if (existing.count >= maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      retryAfterSec: Math.max(Math.ceil((existing.resetAt - now) / 1000), 1),
    };
  }

  existing.count += 1;
  return {
    allowed: true,
    remaining: Math.max(maxRequests - existing.count, 0),
    retryAfterSec: Math.max(Math.ceil((existing.resetAt - now) / 1000), 1),
  };
}
