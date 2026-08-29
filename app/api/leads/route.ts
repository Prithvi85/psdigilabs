import { after } from "next/server";

import { countries, indiaBudgets, internationalBudgets, serviceOptions, timelineOptions } from "@/data/leads";
import { sendLeadNotification } from "@/lib/lead-notification";
import { createLead, type NewLead } from "@/lib/lead-repository";

export const runtime = "nodejs";
const recent = new Map<string, number>();
const text = (value: unknown, max: number) => typeof value === "string" ? value.trim().slice(0, max) : "";
const validEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
const validUrl = (value: string) => { if (!value) return true; try { const url = new URL(value); return url.protocol === "http:" || url.protocol === "https:"; } catch { return false; } };
export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if ((recent.get(ip) || 0) > Date.now() - 15_000) return Response.json({ message: "Please wait a moment before submitting again." }, { status: 429 });
  let input: Record<string, unknown>; try { input = await request.json() as Record<string, unknown>; } catch { return Response.json({ message: "Invalid request." }, { status: 400 }); }
  if (text(input.company_site, 200)) return Response.json({ ok: true });
  const lead: NewLead = { id: crypto.randomUUID(), full_name: text(input.full_name, 100), email: text(input.email, 254).toLowerCase(), phone: text(input.phone, 30), country: text(input.country, 80), service: text(input.service, 80), budget: text(input.budget, 80), project_name: text(input.project_name, 120), existing_website: text(input.existing_website, 300), project_description: text(input.project_description, 5000), preferred_timeline: text(input.preferred_timeline, 80), source: "website", status: "new", created_at: new Date().toISOString(), updated_at: new Date().toISOString() };
  const allowedService = serviceOptions.some(([id]) => id === lead.service); const allowedBudget = [...indiaBudgets, ...internationalBudgets].includes(lead.budget as never);
  if (lead.full_name.length < 2 || !validEmail(lead.email) || !countries.includes(lead.country as never) || !allowedService || !allowedBudget || lead.project_description.length < 20 || !timelineOptions.includes(lead.preferred_timeline as never) || !validUrl(lead.existing_website)) return Response.json({ message: "Please check the required fields and try again." }, { status: 400 });
  try { await createLead(lead); }
  catch (error) { console.error("Lead persistence failed", { error: error instanceof Error ? error.message : "Unknown database error" }); return Response.json({ message: "We could not securely store your enquiry. Please email contact@psdigilabs.in." }, { status: 503 }); }
  recent.set(ip, Date.now());
  after(async () => {
    try { await sendLeadNotification(lead); }
    catch (error) { console.error("Lead notification email failed", { error: error instanceof Error ? error.message : "Unknown email error", leadId: lead.id }); }
  });
  return Response.json({ ok: true, leadId: lead.id }, { status: 201 });
}
