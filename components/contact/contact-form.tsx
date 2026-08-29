"use client";
import { FormEvent, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { countries, indiaBudgets, internationalBudgets, serviceOptions, timelineOptions } from "@/data/leads";

type FormState = "idle" | "submitting" | "success" | "error";
type Gtag = (command: "event", eventName: string, parameters: Record<string, string>) => void;
export function ContactForm({ initialService = "", initialMarket = "india", initialBudget = "", initialTimeline = "" }: { initialService?: string; initialMarket?: "india" | "international"; initialBudget?: string; initialTimeline?: string }) {
  const [country, setCountry] = useState(initialMarket === "india" ? "India" : "");
  const [state, setState] = useState<FormState>("idle");
  const [message, setMessage] = useState("");
  const trackedLeadIds = useRef(new Set<string>());
  const budgets = useMemo(() => country === "India" ? indiaBudgets : internationalBudgets, [country]);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); if (state === "submitting") return; setState("submitting"); setMessage("");
    const form = event.currentTarget;
    if (!form.reportValidity()) { setState("idle"); return; }
    try {
      const formData = Object.fromEntries(new FormData(form));
      const response = await fetch("/api/leads", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(formData) });
      const result = await response.json() as { ok?: boolean; leadId?: string; message?: string };
      const leadId = typeof result.leadId === "string" ? result.leadId.trim() : "";
      if (response.status !== 201 || result.ok !== true || !leadId) throw new Error(result.message || "Unable to confirm your enquiry was received.");
      if (!trackedLeadIds.current.has(leadId)) {
        trackedLeadIds.current.add(leadId);
        try {
          const gtag = (window as Window & { gtag?: Gtag }).gtag;
          gtag?.("event", "generate_lead", {
            lead_source: "website",
            service: typeof formData.service === "string" ? formData.service : "",
            market: formData.country === "India" ? "india" : "international",
          });
        } catch {
          // Analytics must never affect a successfully persisted enquiry.
        }
      }
      setState("success"); form.reset();
    } catch (error) { setState("error"); setMessage(error instanceof Error ? error.message : "Unable to send your enquiry."); }
  }
  if (state === "success") return <div className="form-success" role="status"><span aria-hidden="true">✓</span><h2>Thanks — your project enquiry has been received.</h2><p>PSDigiLabs will review the details and get back to you.</p><div className="section-actions"><Link className="button button-primary" href="/">BACK TO HOME</Link><Link className="button button-secondary" href="/#services">EXPLORE SERVICES</Link></div></div>;
  return <form className="lead-form" onSubmit={submit} noValidate>
    <div className="honeypot" aria-hidden="true"><label htmlFor="company_site">Leave this field empty</label><input id="company_site" name="company_site" tabIndex={-1} autoComplete="off" /></div>
    <div className="form-grid"><label>Full Name <span>*</span><input name="full_name" required minLength={2} maxLength={100} autoComplete="name" /></label><label>Email Address <span>*</span><input name="email" required type="email" maxLength={254} autoComplete="email" /></label>
    <label>Phone / WhatsApp<input name="phone" type="tel" maxLength={30} autoComplete="tel" /></label><label>Country <span>*</span><select name="country" required value={country} onChange={(e) => setCountry(e.target.value)}><option value="">Select country</option>{countries.map((item) => <option key={item}>{item}</option>)}</select></label>
    <label>Service Required <span>*</span><select name="service" required defaultValue={initialService}><option value="">Select service</option>{serviceOptions.filter(([value]) => value !== "custom").map(([value, label]) => <option value={value} key={value}>{label}</option>)}</select></label><label>Project Budget <span>*</span><select name="budget" required key={country} defaultValue={budgets.includes(initialBudget as never) ? initialBudget : ""}><option value="">Select budget</option>{budgets.map((item) => <option key={item}>{item}</option>)}</select></label>
    <label>Project / Business Name<input name="project_name" maxLength={120} /></label><label>Existing Website<input name="existing_website" type="url" maxLength={300} placeholder="https://example.com" /></label>
    <label className="form-wide">Project Description <span>*</span><textarea name="project_description" required minLength={20} maxLength={5000} rows={7} placeholder="What would you like built? Tell us about your customers, important functionality, existing systems and integrations." /></label>
    <label className="form-wide">Preferred Timeline <span>*</span><select name="preferred_timeline" required defaultValue={timelineOptions.includes(initialTimeline as never) ? initialTimeline : ""}><option value="">Select timeline</option>{timelineOptions.map((item) => <option key={item}>{item}</option>)}</select></label></div>
    {state === "error" && <p className="form-error" role="alert">{message}</p>}<button className="button button-primary form-submit" disabled={state === "submitting"}>{state === "submitting" ? "SENDING…" : "SEND PROJECT ENQUIRY"}</button><p className="form-note">Your details are used only to respond to this enquiry.</p>
  </form>;
}
