import type { Metadata } from "next";
import { AutopilotGate } from "@/components/autopilot/autopilot-gate";
import { AutopilotStudio } from "@/components/autopilot/autopilot-studio";
import { isAutopilotAuthenticated, isAutopilotConfigured } from "@/lib/autopilot/auth";
import { createPageMetadata } from "@/lib/seo";

const baseMetadata = createPageMetadata({
  title: "PSDigiLabs Private Lead Autopilot",
  description:
    "Private lead discovery and outreach generator locked exclusively to PSDigiLabs (www.psdigilabs.in).",
  path: "/autopilot",
});

export const metadata: Metadata = {
  ...baseMetadata,
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AutopilotPage() {
  const configured = isAutopilotConfigured();
  const authenticated = await isAutopilotAuthenticated();

  return (
    <main className="studio-page">
      <section className="studio-interior-hero">
        <div className="studio-container studio-interior-hero-grid">
          <div>
            <p className="studio-eyebrow">PSDigiLabs Private Tool • Locked to psdigilabs.in</p>
            <h1 className="studio-display">
              PSDigiLabs Lead Autopilot, <span>passcode protected.</span>
            </h1>
          </div>
          <p>
            Private owner console for www.psdigilabs.in. Only authenticated sessions can scan local prospects, view outreach templates, or download playbooks and workflow blueprints.
          </p>
        </div>
      </section>

      <section className="studio-section">
        <div className="studio-container">
          {authenticated ? <AutopilotStudio /> : <AutopilotGate configured={configured} />}
        </div>
      </section>
    </main>
  );
}
