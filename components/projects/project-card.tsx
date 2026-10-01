import Image from "next/image";
import { useState } from "react";
import { Icon } from "@/components/ui/icon";
type Project = { name: string; category: string; description: string; image: string; website: string; alt: string };

export function ProjectCard({ project, active }: { project: Project; active: boolean }) {
	const [imageError, setImageError] = useState(false);
	const hasImage = Boolean(project.image) && !imageError;

	return (
		<article className="project-card group" aria-hidden={!active}>
			<div className="project-image relative aspect-video overflow-hidden rounded-t-xl">
				{hasImage ? (
					<Image
						src={project.image}
						alt={project.alt}
						width={600}
						height={400}
						sizes="(max-width: 767px) calc(100vw - 36px), (max-width: 1023px) calc(100vw - 48px), 820px"
						className="object-cover w-full h-full rounded-t-xl group-hover:scale-105 transition-transform duration-300"
						onError={() => setImageError(true)}
					/>
				) : (
					<div
						className="flex h-full w-full items-center justify-center bg-slate-100 text-sm text-slate-500"
						role="img"
						aria-label={`${project.name} preview unavailable`}
					>
						Preview unavailable
					</div>
				)}
			</div>
			<div className="project-copy">
				<div className="project-meta"><p>{project.category}</p><span>LIVE</span></div>
				<h3>{project.name}</h3>
				<p className="project-description">{project.description}</p>
				<a className="button project-button" href={project.website} target="_blank" rel="noopener noreferrer" tabIndex={active ? 0 : -1}>
					VIEW LIVE WEBSITE <Icon name="external" />
				</a>
			</div>
		</article>
	);
}