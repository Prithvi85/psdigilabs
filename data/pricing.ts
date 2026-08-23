export type Market = "india" | "international";

export type PricingPackage = {
  id: string;
  title: string;
  description: string;
  price: Record<Market, string>;
  features: readonly string[];
  recommended?: boolean;
};

export const pricingPackages: readonly PricingPackage[] = [
  { id: "landing-page", title: "Landing Page", description: "A focused, conversion-ready page for a service, launch or campaign.", price: { india: "₹8,000+", international: "$199+" }, features: ["Professional responsive landing page", "Custom UI implementation", "Contact / enquiry integration", "WhatsApp or social integration where required", "Basic on-page SEO", "Mobile optimisation", "Deployment assistance"] },
  { id: "business-website", title: "Business Website", description: "A polished multi-page presence designed around your business and customers.", price: { india: "₹18,000+", international: "$449+" }, features: ["Multi-page responsive website", "Custom design implementation", "Contact / lead forms", "Analytics integration", "Basic SEO foundations", "Social integrations", "Deployment configuration"] },
  { id: "cms-pro", title: "CMS Pro Website", description: "A database-backed website your team can manage through an admin experience.", price: { india: "₹30,000+", international: "$749+" }, features: ["Business website foundations", "Database-backed content", "CMS / admin dashboard", "Content and media management", "Authentication where required", "Structured business data"], recommended: true },
  { id: "advanced-platform", title: "Advanced Business Platform", description: "Connected workflows and role-based tools for more involved business operations.", price: { india: "₹45,000+", international: "$1,099+" }, features: ["Advanced CMS and admin dashboard", "Customer/admin authentication", "Database workflows", "Email integrations", "Analytics and advanced forms", "Role-based functionality", "Business process integrations"] },
  { id: "ecommerce", title: "E-commerce Website", description: "A responsive product storefront with practical catalogue and management tools.", price: { india: "₹40,000+", international: "$999+" }, features: ["Product catalogue and management", "Responsive storefront", "Cart / checkout integration", "CMS", "Inventory-oriented functionality where required", "Analytics", "SEO fundamentals"] },
  { id: "custom-web-application", title: "Custom Web Application", description: "Purpose-built software for workflows that do not fit an off-the-shelf product.", price: { india: "₹60,000+", international: "$1,499+" }, features: ["Custom application architecture", "Database and authentication", "Admin systems", "User workflows", "API integrations", "Automation and dashboards", "Business-specific functionality"] },
  { id: "maintenance", title: "Website Maintenance", description: "Ongoing technical care and agreed updates after your website goes live.", price: { india: "₹3,000+/month", international: "$99+/month" }, features: ["Routine website updates", "Minor content changes", "Basic technical maintenance", "Bug fixes within agreed scope", "Deployment assistance", "Monitoring assistance"] },
] as const;

export const pricingPreview = [
  { title: "Website Development", packageId: "landing-page" },
  { title: "CMS & Business Platforms", packageId: "cms-pro" },
  { title: "Custom Web Applications", packageId: "custom-web-application" },
] as const;

export function getPricingPackage(id: string) {
  return pricingPackages.find((item) => item.id === id);
}
