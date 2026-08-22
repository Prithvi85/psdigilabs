import { Icon } from "@/components/ui/icon";

type Service = { icon: string; title: string; description: string; capabilities: readonly string[] };

export function ServiceCard({ service }: { service: Service }) {
  return (
    <article className="service-card">
      <div className="service-heading"><span className="icon-box"><Icon name={service.icon as "web" | "mobile" | "test" | "automation"} /></span><div><h3>{service.title}</h3><p>{service.description}</p></div></div>
      <ul>{service.capabilities.map((capability) => <li key={capability}><Icon name="check" />{capability}</li>)}</ul>
    </article>
  );
}
