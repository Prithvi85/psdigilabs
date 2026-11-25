'use client';

import { useState } from 'react';

const API_BASE = 'https://psdigilabs-audit-hub.onrender.com';

interface AuditFinding {
  severity: 'critical' | 'warning' | 'pass';
  title: string;
  impact: string;
}

interface AuditResult {
  domain: string;
  reportUrl: string;
  scores: { overall: number };
  aiSummary: { headline: string };
  findings: AuditFinding[];
  offer: { priceUsd: number; checkoutUrl: string };
}

export default function SiteAuditWidget() {
  const [url, setUrl] = useState('');
  const [goal, setGoal] = useState('Leads & Conversions');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [audit, setAudit] = useState<AuditResult | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    setAudit(null);

    try {
      const res = await fetch(`${API_BASE}/api/audit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: url.trim(), goal, email: email.trim() }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Audit failed');
      }
      setAudit(data.audit);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not scan website');
    } finally {
      setLoading(false);
    }
  }

  const topIssues = audit
    ? audit.findings.filter((f) => f.severity !== 'pass').slice(0, 3)
    : [];

  return (
    <div style={{ background: '#0F172A', color: '#F8FAFC', border: '1px solid #1E293B', borderRadius: 16, overflow: 'hidden', maxWidth: 520, width: '100%' }}>
      <div style={{ background: 'linear-gradient(135deg, #0066FF, #1D4ED8)', padding: '18px 22px' }}>
        <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', opacity: 0.9 }}>
          PS DigiLabs • Free 15-Sec Audit
        </div>
        <h3 style={{ margin: '4px 0 0', fontSize: 18, fontWeight: 700, color: '#FFF' }}>
          Instant Website, SEO &amp; CRO Scanner
        </h3>
      </div>

      <form onSubmit={handleSubmit} style={{ padding: '20px 22px' }}>
        <div style={{ marginBottom: 12 }}>
          <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#CBD5E1', marginBottom: 5 }}>
            Website URL *
          </label>
          <input
            type="text"
            required
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://yourcompany.com"
            style={{ width: '100%', padding: '10px 12px', background: '#020617', color: '#F8FAFC', border: '1px solid #334155', borderRadius: 8, fontSize: 14 }}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 14 }}>
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#CBD5E1', marginBottom: 5 }}>
              Primary Goal
            </label>
            <select
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              style={{ width: '100%', padding: '10px', background: '#020617', color: '#F8FAFC', border: '1px solid #334155', borderRadius: 8, fontSize: 13 }}
            >
              <option value="Leads & Conversions">Leads &amp; Conversions</option>
              <option value="E-Commerce Sales">E-Commerce Sales</option>
              <option value="Organic Traffic & SEO">Organic Traffic &amp; SEO</option>
            </select>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#CBD5E1', marginBottom: 5 }}>
              Email (Optional)
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              style={{ width: '100%', padding: '10px 12px', background: '#020617', color: '#F8FAFC', border: '1px solid #334155', borderRadius: 8, fontSize: 13 }}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{ width: '100%', background: '#0066FF', color: '#FFF', border: 'none', borderRadius: 8, padding: 12, fontSize: 14, fontWeight: 700, cursor: 'pointer' }}
        >
          {loading ? 'Scanning Speed, SEO & CRO...' : 'Scan My Website Now →'}
        </button>

        {error && (
          <div style={{ marginTop: 14, padding: 12, background: '#020617', border: '1px solid #7F1D1D', borderRadius: 8, color: '#F87171', fontSize: 13 }}>
            Could not scan URL: {error}
          </div>
        )}

        {audit && (
          <div style={{ marginTop: 16, padding: 14, background: '#020617', border: '1px solid #1E293B', borderRadius: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <div>
                <div style={{ fontSize: 12, color: '#94A3B8' }}>Verified Audit for</div>
                <strong style={{ fontSize: 15, color: '#FFF' }}>{audit.domain}</strong>
              </div>
              <div style={{ fontSize: 22, fontWeight: 800, color: audit.scores.overall >= 80 ? '#10B981' : audit.scores.overall >= 60 ? '#F59E0B' : '#EF4444' }}>
                {audit.scores.overall}/100
              </div>
            </div>
            <div style={{ fontSize: 12.5, color: '#CBD5E1', marginBottom: 10 }}>{audit.aiSummary.headline}</div>
            <ul style={{ margin: '0 0 12px', paddingLeft: 18, fontSize: 12, color: '#94A3B8' }}>
              {topIssues.map((f, i) => (
                <li key={i} style={{ marginBottom: 4 }}>
                  <strong style={{ color: '#E2E8F0' }}>{f.title}</strong> — {f.impact}
                </li>
              ))}
            </ul>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <a href={audit.reportUrl} target="_blank" rel="noreferrer" style={{ flex: 1, textAlign: 'center', background: '#1E293B', color: '#38BDF8', textDecoration: 'none', padding: '9px 12px', borderRadius: 8, fontSize: 12.5, fontWeight: 700 }}>
                View Full Report &amp; Patch
              </a>
              <a href={audit.offer.checkoutUrl} target="_blank" rel="noreferrer" style={{ flex: 1, textAlign: 'center', background: '#10B981', color: '#020617', textDecoration: 'none', padding: '9px 12px', borderRadius: 8, fontSize: 12.5, fontWeight: 800 }}>
                Fix For USD ${audit.offer.priceUsd}
              </a>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}