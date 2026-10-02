import { ServiceDetailPage } from "@/components/services/service-detail-page";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Android App Development",
  description: "Scope and build a native Android app around real user needs, reliable integrations and a maintainable release plan.",
  path: "/services/android-app-development",
});

export default function AndroidDevelopmentPage() {
  return <ServiceDetailPage slug="android-app-development" />;
}