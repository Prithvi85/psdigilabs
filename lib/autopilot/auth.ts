import "server-only";

import crypto from "node:crypto";
import { cookies } from "next/headers";

export const AUTOPILOT_COOKIE_NAME = "psdl_autopilot_session";
const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000;

function getAccessKey(): string {
  return process.env.AUTOPILOT_ACCESS_KEY?.trim() || "";
}

export function isAutopilotConfigured(): boolean {
  return getAccessKey().length >= 4;
}

function sha256(value: string): Buffer {
  return crypto.createHash("sha256").update(value, "utf8").digest();
}

export function verifyPasscode(candidate: string): boolean {
  const configured = getAccessKey();
  if (!configured || !candidate) return false;
  return crypto.timingSafeEqual(sha256(candidate.trim()), sha256(configured));
}

function signExpiry(expiresAt: number, secret: string): string {
  return crypto
    .createHmac("sha256", sha256(`psdigilabs-autopilot:${secret}`))
    .update(String(expiresAt))
    .digest("hex");
}

export function createSessionToken(): { token: string; maxAgeSeconds: number } {
  const secret = getAccessKey();
  const expiresAt = Date.now() + SESSION_TTL_MS;
  const sig = signExpiry(expiresAt, secret);
  return {
    token: `${expiresAt}.${sig}`,
    maxAgeSeconds: Math.floor(SESSION_TTL_MS / 1000),
  };
}

export function verifySessionToken(token: string | undefined): boolean {
  const secret = getAccessKey();
  if (!secret || !token) return false;
  const parts = token.split(".");
  if (parts.length !== 2) return false;

  const expiresAt = Number(parts[0]);
  const providedSig = parts[1];
  if (!Number.isFinite(expiresAt) || expiresAt <= Date.now()) return false;
  if (!/^[a-f0-9]{64}$/i.test(providedSig)) return false;

  const expectedSig = signExpiry(expiresAt, secret);
  return crypto.timingSafeEqual(Buffer.from(providedSig, "hex"), Buffer.from(expectedSig, "hex"));
}

export async function isAutopilotAuthenticated(): Promise<boolean> {
  if (!isAutopilotConfigured()) return false;
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(AUTOPILOT_COOKIE_NAME)?.value;
  return verifySessionToken(sessionCookie);
}
