import { ServiceDetailPage } from "@/components/services/service-detail-page";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Workflow Automation",
  description: "Connect business systems and reduce repetitive handoffs with automation scoped around your existing tools and operations.",
  path: "/services/workflow-automation",
});

export default function WorkflowAutomationPage() {
  return <ServiceDetailPage slug="workflow-automation" />;
}