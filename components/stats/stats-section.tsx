import { stats } from "@/data/stats";
import { Icon } from "@/components/ui/icon";

const icons = ["web", "automation", "globe", "mobile", "check"] as const;

function StatItems({ clone = false }: { clone?: boolean }) {
  return (
    <ul className="stats-list" aria-hidden={clone || undefined}>
      {stats.map((stat, index) => (
        <li className="stat-item" key={stat.label}>
          <span className="stat-icon" aria-hidden="true">
            <Icon name={icons[index]} />
          </span>
          <span className="stat-copy">
            <strong>
              <span className="sr-only">{stat.value}</span>
              <span className="stat-value-roll" aria-hidden="true">
                <span>{stat.value}</span>
                <span>{index === 4 ? "25%" : "0"}</span>
                <span>{index === 4 ? "50%" : "1"}</span>
                <span>{index === 4 ? "75%" : "2"}</span>
                <span>{stat.value}</span>
              </span>
            </strong>
            <span>{stat.label}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}

export function StatsSection() {
  return (
    <section className="stats-section" aria-label="PSDigiLabs at a glance">
      <div className="container stats-grid">
        <div className="stats-track">
          <StatItems />
          <StatItems clone />
        </div>
      </div>
    </section>
  );
}
