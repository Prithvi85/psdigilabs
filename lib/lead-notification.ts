import "server-only";

import type { NewLead } from "@/lib/lead-repository";

const RESEND_EMAILS_URL = "https://api.resend.com/emails";
const singleLine = (value: string) => value.replace(/\s+/g, " ").trim();

export async function sendLeadNotification(lead: NewLead): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_NOTIFICATION_TO;
  const from = process.env.LEAD_NOTIFICATION_FROM;

  if (!apiKey || !to || !from) throw new Error("Lead notification email is not configured");

  const fields = [
    ["Name", lead.full_name], ["Email", lead.email], ["Phone", lead.phone || "Not provided"],
    ["Country", lead.country], ["Service", lead.service], ["Budget", lead.budget],
    ["Project Name", lead.project_name || "Not provided"],
    ["Existing Website", lead.existing_website || "Not provided"],
    ["Preferred Timeline", lead.preferred_timeline], ["Source", lead.source],
    ["Submitted At", lead.created_at],
  ] as const;
  const text = [
    "PSDigiLabs - New Project Enquiry", "",
    ...fields.flatMap(([label, value]) => [label + ":", value, ""]),
    "Project Requirements:", lead.project_description, "",
    "Lead Database ID:", lead.id,
  ].join("\n");

  const response = await fetch(RESEND_EMAILS_URL, {
    method: "POST",
    headers: {
      authorization: "Bearer " + apiKey,
      "content-type": "application/json",
      "idempotency-key": "lead/" + lead.id,
      "user-agent": "PSDigiLabs-Website/1.0",
    },
    body: JSON.stringify({
      from, to: [to],
      subject: "New PSDigiLabs Project Enquiry - " + singleLine(lead.full_name) + " - " + singleLine(lead.service),
      text, reply_to: lead.email,
    }),
  });

  if (!response.ok) throw new Error("Email provider returned status " + response.status);
}
