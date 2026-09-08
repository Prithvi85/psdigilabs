import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://www.psdigilabs.in", changeFrequency: "monthly", priority: 1.0 },
    { url: "https://www.psdigilabs.in/pricing", changeFrequency: "monthly", priority: 0.8 },
    { url: "https://www.psdigilabs.in/contact", changeFrequency: "yearly", priority: 0.8 },
    { url: "https://www.psdigilabs.in/services/website-development", changeFrequency: "monthly", priority: 0.9 },
    { url: "https://www.psdigilabs.in/services/android-app-development", changeFrequency: "monthly", priority: 0.9 },
    { url: "https://www.psdigilabs.in/services/quality-engineering", changeFrequency: "monthly", priority: 0.9 },
    { url: "https://www.psdigilabs.in/services/workflow-automation", changeFrequency: "monthly", priority: 0.9 },
  ];
}