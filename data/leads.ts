export const serviceOptions = [
  ["website-development", "Website Development"], ["android-app-development", "Android App Development"],
  ["quality-engineering", "Software Testing & Quality Engineering"], ["workflow-automation", "Workflow Automation"],
  ["landing-page", "Landing Page"], ["business-website", "Business Website"], ["cms-pro", "CMS Pro Website"],
  ["advanced-platform", "Advanced Business Platform"], ["ecommerce", "E-commerce Website"], ["custom-web-application", "Custom Web Application"],
  ["maintenance", "Website Maintenance"], ["ai-automation", "AI / Business Automation"],
  ["manual-testing", "Manual Testing / QA"], ["other", "Other"], ["custom", "Other"],
] as const;
export const projectTypeOptions = [
  ["new-product", "New product / MVP"],
  ["existing-product", "Existing product improvement"],
  ["website-redesign", "Website rebuild or redesign"],
  ["mobile-app", "Mobile app"],
  ["quality-review", "Quality assurance / testing"],
  ["workflow-automation", "Workflow automation"],
  ["other", "Other"],
] as const;
export const timelineOptions = ["As soon as possible", "Within 2–4 weeks", "Within 1–2 months", "2+ months", "Just exploring"] as const;
export const serviceLabel = (id: string) => serviceOptions.find(([value]) => value === id)?.[1];
