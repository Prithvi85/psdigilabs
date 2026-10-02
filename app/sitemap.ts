import type { MetadataRoute } from "next";
import { getCaseStudies, getResources, getServices } from "@/lib/sanity-content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [caseStudies, resources, services] = await Promise.all([getCaseStudies(), getResources(), getServices()]);
  const baseUrl = "https://www.psdigilabs.in";
  const monthly = { changeFrequency: "monthly" as const, priority: 0.8 };

  return [
    { url: `${baseUrl}/`, ...monthly, priority: 1 },
    { url: `${baseUrl}/about`, ...monthly, priority: 0.7 },
    { url: `${baseUrl}/services`, ...monthly, priority: 0.8 },
    ...services.map((service) => ({ url: `${baseUrl}/services/${service.slug}`, ...monthly, priority: 0.9 })),
    { url: `${baseUrl}/work`, ...monthly, priority: 0.8 },
    ...caseStudies.map((study) => ({ url: `${baseUrl}/work/${study.slug}`, ...monthly, priority: 0.7 })),
    { url: `${baseUrl}/resources`, ...monthly, priority: 0.7 },
    ...resources.map((resource) => ({ url: `${baseUrl}/resources/${resource.slug}`, ...monthly, priority: 0.6 })),
    { url: `${baseUrl}/pricing`, ...monthly, priority: 0.8 },
    { url: `${baseUrl}/contact`, changeFrequency: "yearly", priority: 0.8 },
  ];
}