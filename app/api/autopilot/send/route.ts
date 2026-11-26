import { isAutopilotAuthenticated, isAutopilotConfigured, verifyPasscode } from "@/lib/autopilot/auth";
import {
  hasAlreadyContactedEmail,
  listRecentOutreachLogs,
  recordOutreachLog,
} from "@/lib/autopilot/outreach-repository";

export const runtime = "nodejs";

const RESEND_EMAILS_URL = "https://api.resend.com/emails";

interface SendItem {
  prospectName: string;
  recipientEmail: string;
  city: string;
  niche: string;
  subject: string;
  body: string;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isEmailSendingConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY?.trim() && process.env.LEAD_NOTIFICATION_FROM?.trim());
}

async function authorize(request: Request): Promise<boolean> {
  if (!isAutopilotConfigured()) return false;
  const headerKey = request.headers.get("x-autopilot-key")?.trim() || "";
  return (await isAutopilotAuthenticated()) || verifyPasscode(headerKey);
}

export async function GET(request: Request) {
  if (!(await authorize(request))) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const logs = await listRecentOutreachLogs(20);
  return Response.json({
    ok: true,
    emailSendingConfigured: isEmailSendingConfigured(),
    logs,
  });
}

export async function POST(request: Request) {
  if (!(await authorize(request))) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.LEAD_NOTIFICATION_FROM?.trim();
  const replyTo = process.env.LEAD_NOTIFICATION_TO?.trim() || "contact@psdigilabs.in";

  if (!apiKey || !from) {
    return Response.json(
      {
        error:
          "Email sending is not configured yet. Add RESEND_API_KEY and LEAD_NOTIFICATION_FROM in Vercel Environment Variables to enable 1-click Auto-Send.",
      },
      { status: 503 }
    );
  }

  let body: { items?: SendItem[] };
  try {
    body = (await request.json()) as { items?: SendItem[] };
  } catch {
    return Response.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const items = Array.isArray(body.items) ? body.items.slice(0, 5) : [];
  if (items.length === 0) {
    return Response.json({ error: "No outreach items provided." }, { status: 400 });
  }

  const results: Array<{
    recipientEmail: string;
    prospectName: string;
    status: "sent" | "skipped" | "failed";
    reason?: string;
  }> = [];

  for (const item of items) {
    const email = (item.recipientEmail || "").trim().toLowerCase();
    const prospectName = (item.prospectName || "Prospect").trim().slice(0, 120);
    const subject = (item.subject || "").trim().slice(0, 200);
    const textBody = (item.body || "").trim().slice(0, 8000);
    const city = (item.city || "Kolkata").trim().slice(0, 80);
    const niche = (item.niche || "Business").trim().slice(0, 100);

    if (!isValidEmail(email) || !subject || !textBody) {
      results.push({
        recipientEmail: email || "(missing)",
        prospectName,
        status: "skipped",
        reason: "Missing valid email, subject, or message body.",
      });
      continue;
    }

    const alreadySent = await hasAlreadyContactedEmail(email);
    if (alreadySent) {
      results.push({
        recipientEmail: email,
        prospectName,
        status: "skipped",
        reason: "Already contacted previously in Neon log.",
      });
      continue;
    }

    const id = crypto.randomUUID();
    try {
      const res = await fetch(RESEND_EMAILS_URL, {
        method: "POST",
        headers: {
          authorization: `Bearer ${apiKey}`,
          "content-type": "application/json",
          "idempotency-key": `autopilot/${id}`,
          "user-agent": "PSDigiLabs-Autopilot/1.0",
        },
        body: JSON.stringify({
          from,
          to: [email],
          reply_to: replyTo,
          subject,
          text: textBody,
        }),
      });

      const ok = res.ok;
      await recordOutreachLog({
        id,
        prospectName,
        recipientEmail: email,
        city,
        niche,
        subject,
        status: ok ? "sent" : "failed",
        sentAt: new Date().toISOString(),
      });

      results.push({
        recipientEmail: email,
        prospectName,
        status: ok ? "sent" : "failed",
        reason: ok ? undefined : `Email provider returned HTTP ${res.status}`,
      });
    } catch (err) {
      await recordOutreachLog({
        id,
        prospectName,
        recipientEmail: email,
        city,
        niche,
        subject,
        status: "failed",
        sentAt: new Date().toISOString(),
      });
      results.push({
        recipientEmail: email,
        prospectName,
        status: "failed",
        reason: err instanceof Error ? err.message : "Network error sending email",
      });
    }
  }

  const logs = await listRecentOutreachLogs(20);
  return Response.json({ ok: true, results, logs }, { status: 200 });
}
