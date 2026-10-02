import { ServiceDetailPage } from "@/components/services/service-detail-page";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Custom Website Development",
  description: "Plan and build a custom website or web application around your users, content, integrations and business goals.",
  path: "/services/website-development",
});

export default function WebsiteDevelopmentPage() {
  return <ServiceDetailPage slug="website-development" />;
}