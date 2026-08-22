import Image from "next/image";
import { Icon } from "@/components/ui/icon";

type Project = { name: string; category: string; description: string; image: string; website: string; alt: string };

export function ProjectCard({ project, active }: { project: Project; active: boolean }) {
  return (
    <article className="project-card" aria-hidden={!active}>
      <div className="project-image"><Image src={project.image} alt={project.alt} fill sizes="(max-width: 767px) calc(100vw - 30px), 900px" /></div>
      <div className="project-copy"><div className="project-meta"><p>{project.category}</p><span>LIVE</span></div><h3>{project.name}</h3><p className="project-description">{project.description}</p><a className="button project-button" href={project.website} target="_blank" rel="noopener noreferrer" tabIndex={active ? 0 : -1}>VISIT LIVE WEBSITE <Icon name="external" /></a></div>
    </article>
  );
}
