import { createHmac, timingSafeEqual } from "crypto";

type MobileTokenPayload = {
  uid: string;
  iat: number;
  exp: number;
  v: 1;
};

const MOBILE_TOKEN_TTL_SECONDS = 60 * 60 * 24 * 30;

const toBase64Url = (value: string): string =>
  Buffer.from(value, "utf8")
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");

const fromBase64Url = (value: string): string => {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padding = normalized.length % 4 === 0 ? "" : "=".repeat(4 - (normalized.length % 4));
  return Buffer.from(`${normalized}${padding}`, "base64").toString("utf8");
};

const getMobileTokenSecret = (): string =>
  process.env.MOBILE_AUTH_SECRET || process.env.SESSION_SECRET || "supersecretfallback";

const signPayload = (encodedPayload: string): string =>
  createHmac("sha256", getMobileTokenSecret())
    .update(encodedPayload)
    .digest("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");

export function createMobileAccessToken(userId: string): string {
  const now = Math.floor(Date.now() / 1000);
  const payload: MobileTokenPayload = {
    uid: userId,
    iat: now,
    exp: now + MOBILE_TOKEN_TTL_SECONDS,
    v: 1,
  };

  const encodedPayload = toBase64Url(JSON.stringify(payload));
  const signature = signPayload(encodedPayload);
  return `m1.${encodedPayload}.${signature}`;
}

export function verifyMobileAccessToken(token: string): string | null {
  const parts = token.split(".");
  if (parts.length !== 3) {
    return null;
  }

  const [version, encodedPayload, suppliedSignature] = parts;
  if (version !== "m1" || !encodedPayload || !suppliedSignature) {
    return null;
  }

  const expectedSignature = signPayload(encodedPayload);
  const suppliedBuffer = Buffer.from(suppliedSignature, "utf8");
  const expectedBuffer = Buffer.from(expectedSignature, "utf8");
  if (
    suppliedBuffer.length !== expectedBuffer.length ||
    !timingSafeEqual(suppliedBuffer, expectedBuffer)
  ) {
    return null;
  }

  let payload: MobileTokenPayload;
  try {
    payload = JSON.parse(fromBase64Url(encodedPayload)) as MobileTokenPayload;
  } catch {
    return null;
  }

  if (!payload?.uid || payload.v !== 1) {
    return null;
  }

  const now = Math.floor(Date.now() / 1000);
  if (!Number.isFinite(payload.exp) || payload.exp <= now) {
    return null;
  }

  return payload.uid;
}

export function extractBearerToken(authorizationHeader: unknown): string | null {
  if (typeof authorizationHeader !== "string") {
    return null;
  }

  const match = authorizationHeader.match(/^Bearer\s+(.+)$/i);
  return match?.[1]?.trim() || null;
}
