import "server-only";

import { neon } from "@neondatabase/serverless";

export type NewLead = {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  country: string;
  service: string;
  budget: string;
  project_name: string;
  existing_website: string;
  project_description: string;
  preferred_timeline: string;
  source: "website";
  status: "new";
  created_at: string;
  updated_at: string;
};

export async function createLead(lead: NewLead): Promise<void> {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error("DATABASE_URL is not configured");
  }

  const sql = neon(databaseUrl);
  await sql`
    INSERT INTO leads (
      id, full_name, email, phone, country, service, budget,
      project_name, existing_website, project_description,
      preferred_timeline, source, status, created_at, updated_at
    ) VALUES (
      ${lead.id}, ${lead.full_name}, ${lead.email}, ${lead.phone || null},
      ${lead.country}, ${lead.service}, ${lead.budget || null},
      ${lead.project_name || null}, ${lead.existing_website || null},
      ${lead.project_description}, ${lead.preferred_timeline || null},
      ${lead.source}, ${lead.status}, ${lead.created_at}, ${lead.updated_at}
    )
  `;
}
