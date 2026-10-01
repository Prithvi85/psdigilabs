export interface ServiceRateConfig {
  name: string;
  baseTimelineDays: number;
  minTimelineDays: number;
  baseInr: number;
  baseUsd: number;
}

export const SERVICE_CONFIGS: Record<string, ServiceRateConfig> = {
  "landing-page": {
    name: "Conversion Landing Page",
    baseTimelineDays: 7,
    minTimelineDays: 3,
    baseInr: 8000,
    baseUsd: 199,
  },
  "business-website": {
    name: "Business Website",
    baseTimelineDays: 14,
    minTimelineDays: 7,
    baseInr: 18000,
    baseUsd: 449,
  },
  "cms-pro": {
    name: "CMS Pro Website",
    baseTimelineDays: 21,
    minTimelineDays: 10,
    baseInr: 30000,
    baseUsd: 749,
  },
  "ecommerce": {
    name: "E-Commerce Solution",
    baseTimelineDays: 28,
    minTimelineDays: 14,
    baseInr: 40000,
    baseUsd: 999,
  },
  "custom-web-application": {
    name: "Custom Web Application",
    baseTimelineDays: 45,
    minTimelineDays: 21,
    baseInr: 60000,
    baseUsd: 1499,
  },
  "workflow-automation": {
    name: "Workflow & API Automation",
    baseTimelineDays: 14,
    minTimelineDays: 5,
    baseInr: 20000,
    baseUsd: 499,
  },
};

export type VelocityTier = "rush" | "standard" | "flexible";

export function calculateCustomEstimate(
  serviceKey: string,
  requestedDays?: number,
  currency: "INR" | "USD" = "INR"
) {
  const service = SERVICE_CONFIGS[serviceKey] || SERVICE_CONFIGS["business-website"];
  const days = requestedDays ? Math.max(service.minTimelineDays, requestedDays) : service.baseTimelineDays;

  // Timeline Velocity Multiplier
  let velocityFactor = 1.0;
  let velocityLabel = "Standard Agile Sprint";

  if (days < service.baseTimelineDays) {
    // Expedited / Rush sprint: up to +35% depending on urgency
    const urgencyRatio = (service.baseTimelineDays - days) / (service.baseTimelineDays - service.minTimelineDays);
    velocityFactor = 1.0 + urgencyRatio * 0.35;
    velocityLabel = "Expedited Fast-Track Sprint";
  } else if (days > service.baseTimelineDays + 7) {
    // Relaxed delivery window: -10% cost efficiency discount
    velocityFactor = 0.90;
    velocityLabel = "Extended Milestone Delivery";
  }

  const basePrice = currency === "INR" ? service.baseInr : service.baseUsd;
  const estimatedPrice = Math.round((basePrice * velocityFactor) / 100) * 100;

  return {
    serviceName: service.name,
    timelineDays: days,
    velocityLabel,
    currency,
    estimatedPrice,
    displayPrice: currency === "INR" ? `₹${estimatedPrice.toLocaleString("en-IN")}` : `$${estimatedPrice.toLocaleString()}`,
  };
}