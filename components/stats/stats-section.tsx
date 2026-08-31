import { stats } from "@/data/stats";
import { Icon } from "@/components/ui/icon";

export function StatsSection() {
  return (
    <section className="stats-section" aria-label="PSDigiLabs at a glance">
      <div className="container stats-grid">
        <ul className="stats-list">
          {stats.map((stat) => (
            <li className="stat-item" key={stat.label}>
              <span className="stat-icon" aria-hidden="true">
                <Icon name={stat.icon} />
              </span>
              <span className="stat-copy">
                <strong>
                  <span className="sr-only">{stat.value}</span>
                  <span className="stat-value-roll" aria-hidden="true">
                    {stat.frames.map((frame, index) => (
                      <span key={`${frame}-${index}`}>{frame}</span>
                    ))}
                  </span>
                </strong>
                <span>{stat.label}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}