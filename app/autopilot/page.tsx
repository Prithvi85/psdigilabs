import type { Metadata } from "next";
import { AutopilotGate } from "@/components/autopilot/autopilot-gate";
import { AutopilotStudio } from "@/components/autopilot/autopilot-studio";
import { isAutopilotAuthenticated, isAutopilotConfigured } from "@/lib/autopilot/auth";
import { listRecentOutreachLogs } from "@/lib/autopilot/outreach-repository";
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
  const emailSendingConfigured = Boolean(
    process.env.RESEND_API_KEY?.trim() && process.env.LEAD_NOTIFICATION_FROM?.trim()
  );
  const initialLogs = authenticated ? await listRecentOutreachLogs(20) : [];

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
            Private owner console for www.psdigilabs.in. Discovers real businesses, extracts contact emails &amp; funnel gaps automatically, and dispatches tailored PSDigiLabs outreach.
          </p>
        </div>
      </section>

      <section className="studio-section">
        <div className="studio-container">
          {authenticated ? (
            <AutopilotStudio
              emailSendingConfigured={emailSendingConfigured}
              initialLogs={initialLogs}
            />
          ) : (
            <AutopilotGate configured={configured} />
          )}
        </div>
      </section>
    </main>
  );
}
