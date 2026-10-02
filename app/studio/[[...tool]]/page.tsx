import type { Metadata } from "next";
import { StudioClient } from "./studio-client";

export const metadata: Metadata = {
  title: "Content Studio",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default function StudioPage() {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    return (
      <main className="studio-page">
        <section className="studio-section">
          <div className="studio-container">
            <p className="studio-eyebrow">Content Studio</p>
            <h1 className="studio-display">Sanity is not configured yet.</h1>
            <p>Set the Sanity project ID and dataset in the deployment environment to enable editorial access.</p>
          </div>
        </section>
      </main>
    );
  }

  return <StudioClient />;
}