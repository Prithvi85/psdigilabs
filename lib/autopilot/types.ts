export type IndustryKey =
  | "saas"
  | "agency"
  | "ecommerce"
  | "healthcare"
  | "realestate"
  | "hospitality"
  | "education"
  | "general";

export interface WebsiteIntelligence {
  inputUrl: string;
  resolvedUrl: string;
  domain: string;
  reachable: boolean;
  fetchNote?: string;
  responseTimeMs: number;
  brandName: string;
  headline: string;
  description: string;
  industry: IndustryKey;
  industryLabel: string;
  offerSummary: string;
  techSignals: string[];
  conversionSignals: {
    https: boolean;
    hasForm: boolean;
    hasBookingLink: boolean;
    hasWhatsApp: boolean;
    hasSchemaOrg: boolean;
    hasAnalytics: boolean;
    hasContactEmail: boolean;
    hasPhone: boolean;
  };
  readinessScore: number;
  gaps: {
    severity: "critical" | "warning" | "good";
    title: string;
    detail: string;
  }[];
}

export interface ProspectLead {
  id: string;
  name: string;
  category: string;
  city: string;
  address: string;
  website: string | null;
  phone: string | null;
  email: string | null;
  opportunityLevel: "high" | "medium" | "low";
  opportunityReason: string;
  websiteStatus: "missing" | "unreachable" | "http-only" | "live";
  hasMxRecord: boolean | null;
}

export interface ProspectRadarResult {
  source: "openstreetmap-live" | "fallback-queries";
  city: string;
  niche: string;
  osmCount: number;
  note: string;
  prospects: ProspectLead[];
  booleanQueries: {
    label: string;
    query: string;
  }[];
}

export interface IcpProfile {
  primaryPersona: string;
  decisionMakerRoles: string[];
  buyingTriggers: string[];
  painPoints: string[];
  valueAngle: string;
}

export interface OutreachStep {
  step: number;
  dayLabel: string;
  channel: "Email" | "WhatsApp" | "LinkedIn";
  subject?: string;
  body: string;
}

export interface WorkflowNode {
  step: string;
  title: string;
  tool: string;
  triggerOrAction: string;
  description: string;
  solvesGap: string;
}

export interface AutopilotReport {
  generatedAt: string;
  brandName: string;
  serviceFocus: string;
  targetCity: string;
  targetNiche: string;
  website: WebsiteIntelligence;
  icp: IcpProfile;
  radar: ProspectRadarResult;
  outreach: {
    emailSequence: OutreachStep[];
    whatsappPitch: OutreachStep;
    linkedinDm: OutreachStep;
  };
  automation: {
    pipelineName: string;
    summary: string;
    estimatedHoursSavedWeekly: number;
    nodes: WorkflowNode[];
    blueprintJson: Record<string, unknown>;
  };
}
