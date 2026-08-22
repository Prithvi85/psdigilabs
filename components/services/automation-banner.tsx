import { Icon } from "@/components/ui/icon";

export function AutomationBanner() {
  return (
    <aside className="automation-banner">
      <div><p className="eyebrow light-eyebrow">SMARTER WORKFLOWS</p><h3>Connect your tools. Keep work moving.</h3><p>Make and Activepieces are visual workflow automation platforms used to connect different web apps, services and APIs so data can flow between them automatically without repetitive manual work.</p><div className="platform-tags"><span>Make</span><span>Activepieces</span></div></div>
      <div className="workflow" aria-label="Example automation workflow"><span>Web Apps</span><Icon name="arrow" /><b>Make / Activepieces</b><Icon name="arrow" /><span>APIs</span><Icon name="arrow" /><b>Automated Workflow</b></div>
    </aside>
  );
}
