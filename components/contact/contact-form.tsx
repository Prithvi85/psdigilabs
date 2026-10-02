"use client";
import { FormEvent, useRef, useState } from "react";
import Link from "next/link";
import { countries, indiaBudgets, internationalBudgets, serviceOptions, timelineOptions } from "@/data/leads";

type FormState = "idle" | "submitting" | "success" | "error";
type Gtag = (command: "event", eventName: string, parameters: Record<string, string>) => void;
const labelClasses = "block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2";
const controlClasses = "w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm transition-all";

export function ContactForm({ initialService = "", initialMarket = "india", initialBudget = "", initialTimeline = "" }: { initialService?: string; initialMarket?: "india" | "international"; initialBudget?: string; initialTimeline?: string }) {
  const [country, setCountry] = useState(initialMarket === "india" ? "India" : "");
  const [budget, setBudget] = useState(initialBudget);
  const [state, setState] = useState<FormState>("idle");
  const [message, setMessage] = useState("");
  const trackedLeadIds = useRef(new Set<string>());
  const market = country ? (country === "India" ? "india" : "international") : initialMarket;
  const budgetOptions = market === "india" ? indiaBudgets : internationalBudgets;
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
    <div className="honeypot" aria-hidden="true" hidden><label htmlFor="company_site">Leave this field empty</label><input id="company_site" name="company_site" tabIndex={-1} autoComplete="off" /></div>
    <div className="form-grid">
      <label className={labelClasses}>Full Name <span>*</span><input className={controlClasses} name="full_name" required minLength={2} maxLength={100} autoComplete="name" /></label>
      <label className={labelClasses}>Email Address <span>*</span><input className={controlClasses} name="email" required type="email" maxLength={254} autoComplete="email" /></label>
      <label className={labelClasses}>Phone / WhatsApp<input className={controlClasses} name="phone" type="tel" maxLength={30} autoComplete="tel" /></label>
      <label className={labelClasses}>Country <span>*</span><select className={controlClasses} name="country" required value={country} onChange={(e) => { setCountry(e.target.value); setBudget(""); }}><option value="">Select country</option>{countries.map((item) => <option key={item}>{item}</option>)}</select></label>
      <label className={labelClasses}>Budget Range<select className={controlClasses} name="budget" value={budget} onChange={(e) => setBudget(e.target.value)}><option value="">Not sure yet</option>{budgetOptions.map((item) => <option key={item}>{item}</option>)}</select></label>
      <label className={`${labelClasses} form-wide`}>Service Required <span>*</span><select className={controlClasses} name="service" required defaultValue={initialService}><option value="">Select service</option>{serviceOptions.filter(([value]) => value !== "custom").map(([value, label]) => <option value={value} key={value}>{label}</option>)}</select></label>
      <label className={labelClasses}>Project / Business Name<input className={controlClasses} name="project_name" maxLength={120} /></label>
      <label className={labelClasses}>Existing Website<input className={controlClasses} name="existing_website" type="url" maxLength={300} placeholder="https://example.com" /></label>
      <label className={`${labelClasses} form-wide`}>Project Description <span>*</span><textarea className={controlClasses} name="project_description" required minLength={20} maxLength={5000} rows={7} placeholder="What would you like built? Tell us about your customers, important functionality, existing systems and integrations." /></label>
      <label className={`${labelClasses} form-wide`}>Preferred Timeline <span>*</span><select className={controlClasses} name="preferred_timeline" required defaultValue={timelineOptions.includes(initialTimeline as never) ? initialTimeline : ""}><option value="">Select timeline</option>{timelineOptions.map((item) => <option key={item}>{item}</option>)}</select></label>
    </div>
    {state === "error" && <p className="form-error" role="alert">{message}</p>}<button className="button button-primary form-submit" disabled={state === "submitting"}>{state === "submitting" ? "SENDING…" : "SEND PROJECT ENQUIRY"}</button><p className="form-note">Your details are used only to respond to this enquiry.</p>
  </form>;
}
