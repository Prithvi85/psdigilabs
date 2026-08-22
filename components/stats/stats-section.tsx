import { stats } from "@/data/stats";
import { Icon } from "@/components/ui/icon";

const icons = ["web", "automation", "globe", "mobile", "check"] as const;

export function StatsSection() {
  return <section className="stats-section" aria-label="PSDigiLabs at a glance"><div className="container stats-grid">{stats.map((stat, index) => <div className="stat-item" key={stat.label}><span className="stat-icon"><Icon name={icons[index]} /></span><span className="stat-copy"><strong>{stat.value}</strong><span>{stat.label}</span></span></div>)}</div></section>;
}
