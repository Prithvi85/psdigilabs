import { ServiceDetailPage } from "@/components/services/service-detail-page";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Software Testing & Quality Engineering",
  description: "Add focused manual, API and automated testing to make product changes easier to verify and safer to release.",
  path: "/services/quality-engineering",
});

export default function QualityEngineeringPage() {
  return <ServiceDetailPage slug="quality-engineering" />;
}