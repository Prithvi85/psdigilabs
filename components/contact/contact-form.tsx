"use client";
import { FormEvent, useRef, useState } from "react";
import Link from "next/link";
import { projectTypeOptions, serviceOptions, timelineOptions } from "@/data/leads";

type FormState = "idle" | "submitting" | "success" | "error";
type Gtag = (command: "event", eventName: string, parameters: Record<string, string>) => void;
const labelClasses = "studio-form-label";
const controlClasses = "studio-control";

export function ContactForm({ initialService = "", initialProjectType = "", initialCompanyName = "", initialTimeline = "" }: { initialService?: string; initialProjectType?: string; initialCompanyName?: string; initialTimeline?: string }) {
  const [state, setState] = useState<FormState>("idle");
  const [message, setMessage] = useState("");
  const trackedLeadIds = useRef(new Set<string>());
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
            project_type: typeof formData.project_type === "string" ? formData.project_type : "",
          });
        } catch {
          // Analytics must never affect a successfully persisted enquiry.
        }
      }
      setState("success"); form.reset();
    } catch (error) { setState("error"); setMessage(error instanceof Error ? error.message : "Unable to send your enquiry."); }
  }
  if (state === "success") return <div className="studio-form-success" role="status"><span aria-hidden="true">✓</span><h2>Thanks. Your project enquiry is with us.</h2><p>We&apos;ll review the context and aim to reply within one business day.</p><div className="studio-form-success-links"><Link className="studio-button studio-button-dark" href="/">Back to home</Link><Link className="studio-inline-link" href="/services">Explore services <span aria-hidden="true">↗</span></Link></div></div>;
  return <form className="studio-lead-form" onSubmit={submit} noValidate>
    <div className="honeypot" aria-hidden="true" hidden><label htmlFor="company_site">Leave this field empty</label><input id="company_site" name="company_site" tabIndex={-1} autoComplete="off" /></div>
    <div className="studio-form-grid">
      <label className={labelClasses}>Full Name <span>*</span><input className={controlClasses} name="full_name" required minLength={2} maxLength={100} autoComplete="name" /></label>
      <label className={labelClasses}>Email Address <span>*</span><input className={controlClasses} name="email" required type="email" maxLength={254} autoComplete="email" /></label>
      <label className={labelClasses}>Company Name<input className={controlClasses} name="company" defaultValue={initialCompanyName} maxLength={120} autoComplete="organization" /></label>
      <label className={labelClasses}>Project Type <span>*</span><select className={controlClasses} name="project_type" required defaultValue={initialProjectType}><option value="">Select project type</option>{projectTypeOptions.map(([value, label]) => <option value={value} key={value}>{label}</option>)}</select></label>
      <label className={labelClasses}>Services Needed <span>*</span><select className={controlClasses} name="service" required defaultValue={initialService}><option value="">Select service</option>{serviceOptions.filter(([value]) => value !== "custom").map(([value, label]) => <option value={value} key={value}>{label}</option>)}</select></label>
      <label className={`${labelClasses} studio-form-wide`}>Project Description <span>*</span><textarea className={controlClasses} name="project_description" required minLength={20} maxLength={5000} rows={7} placeholder="What would you like built? Tell us about your customers, important functionality, existing systems and integrations." /></label>
      <label className={`${labelClasses} studio-form-wide`}>Preferred Timeline <span>*</span><select className={controlClasses} name="preferred_timeline" required defaultValue={timelineOptions.includes(initialTimeline as never) ? initialTimeline : ""}><option value="">Select timeline</option>{timelineOptions.map((item) => <option key={item}>{item}</option>)}</select></label>
    </div>
    {state === "error" && <p className="studio-form-error" role="alert">{message}</p>}<button className="studio-button studio-button-dark studio-form-submit" disabled={state === "submitting"}>{state === "submitting" ? "SENDING..." : "Send project enquiry"}<span aria-hidden="true">↗</span></button><p className="studio-form-note">Your details are used only to respond to this enquiry.</p>
  </form>;
}
