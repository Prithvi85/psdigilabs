import "server-only";

import { neon } from "@neondatabase/serverless";

export type NewLead = {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  country: string;
  service: string;
  project_type: string;
  company: string;
  existing_website: string;
  project_description: string;
  preferred_timeline: string;
  tech_preferences: string;
  source: "website";
  status: "new";
  created_at: string;
  updated_at: string;
};

/**
 * Sanitizes a database connection string to defend against stray
 * quotes, backslashes, or whitespace that can sneak in via environment
 * variables (e.g. when a value is pasted with quotes into Vercel).
 */
function sanitizeDatabaseUrl(value: string | undefined): string {
  if (!value) {
    throw new Error("DATABASE_URL is not configured");
  }

  return value
    .trim()
    .replace(/^["']+/, "")
    .replace(/["'\\]+$/, "");
}

export async function createLead(lead: NewLead): Promise<void> {
  const databaseUrl = sanitizeDatabaseUrl(process.env.DATABASE_URL);
  const sql = neon(databaseUrl);

  await sql`
    INSERT INTO leads (
      id, full_name, email, phone, country, service, project_type,
      company, existing_website, project_description, tech_preferences,
      preferred_timeline, source, status, created_at, updated_at
    ) VALUES (
      ${lead.id}, ${lead.full_name}, ${lead.email}, ${lead.phone || null},
      ${lead.country}, ${lead.service}, ${lead.project_type},
      ${lead.company || null}, ${lead.existing_website || null},
      ${lead.project_description}, ${lead.tech_preferences || null}, ${lead.preferred_timeline || null},
      ${lead.source}, ${lead.status}, ${lead.created_at}, ${lead.updated_at}
    )
  `;
}