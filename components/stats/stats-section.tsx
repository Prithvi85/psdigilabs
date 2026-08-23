import { stats } from "@/data/stats";
import { Icon } from "@/components/ui/icon";

const icons = ["web", "automation", "globe", "mobile", "check"] as const;

export function StatsSection() {
  return (
    <section className="stats-section" aria-label="PSDigiLabs at a glance">
      <ul className="container stats-grid">
        {stats.map((stat, index) => (
          <li className="stat-item" key={stat.label}>
            <span className="stat-icon" aria-hidden="true">
              <Icon name={icons[index]} />
            </span>
            <span className="stat-copy">
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
