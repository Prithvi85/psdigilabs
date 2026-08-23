export const serviceOptions = [
  ["landing-page", "Landing Page"], ["business-website", "Business Website"], ["cms-pro", "CMS Pro Website"],
  ["advanced-platform", "Advanced Business Platform"], ["ecommerce", "E-commerce Website"], ["custom-web-application", "Custom Web Application"],
  ["maintenance", "Website Maintenance"], ["workflow-automation", "Workflow Automation"], ["ai-automation", "AI / Business Automation"],
  ["manual-testing", "Manual Testing / QA"], ["other", "Other"], ["custom", "Other"],
] as const;
export const timelineOptions = ["As soon as possible", "Within 2–4 weeks", "Within 1–2 months", "2+ months", "Just exploring"] as const;
export const indiaBudgets = ["Below ₹10,000", "₹10,000 – ₹25,000", "₹25,000 – ₹50,000", "₹50,000 – ₹1,00,000", "₹1,00,000+", "Not sure yet"] as const;
export const internationalBudgets = ["Below $250", "$250 – $500", "$500 – $1,000", "$1,000 – $2,500", "$2,500+", "Not sure yet"] as const;
export const countries = ["India", "United States", "United Kingdom", "Canada", "Australia", "United Arab Emirates", "Singapore", "Germany", "France", "Other"] as const;
export const serviceLabel = (id: string) => serviceOptions.find(([value]) => value === id)?.[1];
