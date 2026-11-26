import { cookies } from "next/headers";
import {
  AUTOPILOT_COOKIE_NAME,
  createSessionToken,
  isAutopilotConfigured,
  verifyPasscode,
} from "@/lib/autopilot/auth";

export const runtime = "nodejs";

const failedAttempts = new Map<string, { count: number; blockedUntil: number }>();

export async function POST(request: Request) {
  if (!isAutopilotConfigured()) {
    return Response.json(
      {
        error:
          "AUTOPILOT_ACCESS_KEY is not configured on the server. Add a passcode (min 4 characters) to .env.local and Vercel environment variables.",
      },
      { status: 503 }
    );
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const record = failedAttempts.get(ip);
  if (record && record.blockedUntil > Date.now()) {
    return Response.json(
      { error: "Too many incorrect attempts. Please wait a minute and try again." },
      { status: 429 }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const passcode = typeof body.passcode === "string" ? body.passcode : "";
  if (!verifyPasscode(passcode)) {
    const nextCount = (record?.count || 0) + 1;
    failedAttempts.set(ip, {
      count: nextCount,
      blockedUntil: nextCount >= 5 ? Date.now() + 60_000 : 0,
    });
    return Response.json({ error: "Incorrect owner passcode." }, { status: 401 });
  }

  failedAttempts.delete(ip);
  const { token, maxAgeSeconds } = createSessionToken();
  const cookieStore = await cookies();
  cookieStore.set(AUTOPILOT_COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: maxAgeSeconds,
  });

  return Response.json({ ok: true }, { status: 200 });
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete(AUTOPILOT_COOKIE_NAME);
  return Response.json({ ok: true }, { status: 200 });
}
