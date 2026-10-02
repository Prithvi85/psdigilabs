import Link from "next/link";
import { Icon } from "@/components/ui/icon";
import type { ServiceContent } from "@/lib/sanity-content";

export function ServiceCard({ service, index = 0 }: { service: ServiceContent; index?: number }) {
	return (
		<article className="studio-service-card">
			<div className="studio-service-card-top">
				<span className="studio-service-number">0{index + 1}</span>
				<span className="studio-service-icon"><Icon name={service.icon as "web" | "mobile" | "test" | "automation"} /></span>
			</div>
			<h3 className="studio-display">{service.title}</h3>
			<p>{service.description}</p>
			<div className="studio-chip-list">
				{service.capabilities.slice(0, 3).map((capability) => <span key={capability}>{capability}</span>)}
			</div>
			<Link className="studio-card-link" href={`/services/${service.slug}`}>
				Explore service <span aria-hidden="true">↗</span>
			</Link>
		</article>
	);
}