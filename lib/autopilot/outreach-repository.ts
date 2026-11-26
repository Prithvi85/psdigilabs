import "server-only";

import { neon } from "@neondatabase/serverless";
import type { OutreachLogEntry } from "./types";

function getDatabaseUrl(): string | null {
  const raw = process.env.DATABASE_URL?.trim();
  if (!raw) return null;
  return raw.replace(/^["']+/, "").replace(/["'\\]+$/, "");
}

async function getReadySql() {
  const url = getDatabaseUrl();
  if (!url) return null;
  const sql = neon(url);
  await sql`
    CREATE TABLE IF NOT EXISTS autopilot_outreach_logs (
      id TEXT PRIMARY KEY,
      prospect_name TEXT NOT NULL,
      recipient_email TEXT NOT NULL,
      city TEXT NOT NULL,
      niche TEXT NOT NULL,
      subject TEXT NOT NULL,
      status TEXT NOT NULL,
      sent_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
  return sql;
}

export async function listRecentOutreachLogs(limit = 20): Promise<OutreachLogEntry[]> {
  try {
    const sql = await getReadySql();
    if (!sql) return [];
    const rows = (await sql`
      SELECT id, prospect_name, recipient_email, city, niche, subject, status, sent_at
      FROM autopilot_outreach_logs
      ORDER BY sent_at DESC
      LIMIT ${limit}
    `) as Array<{
      id: string;
      prospect_name: string;
      recipient_email: string;
      city: string;
      niche: string;
      subject: string;
      status: string;
      sent_at: string | Date;
    }>;

    return rows.map((r) => ({
      id: r.id,
      prospectName: r.prospect_name,
      recipientEmail: r.recipient_email,
      city: r.city,
      niche: r.niche,
      subject: r.subject,
      status: r.status === "failed" ? "failed" : "sent",
      sentAt: typeof r.sent_at === "string" ? r.sent_at : r.sent_at.toISOString(),
    }));
  } catch {
    return [];
  }
}

export async function hasAlreadyContactedEmail(email: string): Promise<boolean> {
  try {
    const sql = await getReadySql();
    if (!sql) return false;
    const rows = (await sql`
      SELECT id FROM autopilot_outreach_logs
      WHERE LOWER(recipient_email) = LOWER(${email}) AND status = 'sent'
      LIMIT 1
    `) as Array<{ id: string }>;
    return rows.length > 0;
  } catch {
    return false;
  }
}

export async function recordOutreachLog(entry: OutreachLogEntry): Promise<void> {
  try {
    const sql = await getReadySql();
    if (!sql) return;
    await sql`
      INSERT INTO autopilot_outreach_logs (
        id, prospect_name, recipient_email, city, niche, subject, status, sent_at
      ) VALUES (
        ${entry.id}, ${entry.prospectName}, ${entry.recipientEmail},
        ${entry.city}, ${entry.niche}, ${entry.subject}, ${entry.status}, ${entry.sentAt}
      )
    `;
  } catch (err) {
    console.error("Failed to record autopilot outreach log", err);
  }
}
