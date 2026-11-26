"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function AutopilotGate({ configured }: { configured: boolean }) {
  const router = useRouter();
  const [passcode, setPasscode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleUnlock(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/autopilot/auth", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ passcode }),
      });
      const data = (await response.json()) as { ok?: boolean; error?: string };
      if (!response.ok || !data.ok) {
        throw new Error(data.error || "Could not unlock PSDigiLabs Autopilot.");
      }
      setPasscode("");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Authentication failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="studio-autopilot-gate">
      <span className="studio-autopilot-badge">PRIVATE OWNER CONSOLE • PSDIGILABS ONLY</span>
      <h2>Enter Owner Passcode to Access Lead Autopilot</h2>
      <p>
        Prospect Radar, PSDigiLabs outreach playbooks, CSV exports, and workflow blueprints are locked so competitors and public visitors cannot view or download them.
      </p>

      {!configured ? (
        <div className="studio-autopilot-gate-setup" role="status">
          <strong>Setup required:</strong> Add{" "}
          <code>AUTOPILOT_ACCESS_KEY=your-secret-passcode</code> (at least 4 characters) in{" "}
          <code>.env.local</code> and your hosting environment variables, then restart the server.
        </div>
      ) : (
        <form onSubmit={handleUnlock} className="studio-autopilot-gate-form">
          <label>
            <span>Owner Passcode</span>
            <input
              type="password"
              required
              autoFocus
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              placeholder="Enter AUTOPILOT_ACCESS_KEY"
            />
          </label>
          <button type="submit" disabled={loading} className="studio-button studio-button-lime">
            {loading ? "Verifying..." : "Unlock Private Console ↗"}
          </button>
        </form>
      )}

      {error && (
        <p className="studio-autopilot-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
