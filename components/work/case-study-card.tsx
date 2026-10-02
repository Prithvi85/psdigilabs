import Image from "next/image";
import Link from "next/link";
import type { CaseStudyContent } from "@/lib/sanity-content";

export function CaseStudyCard({ study, eager = false }: { study: CaseStudyContent; eager?: boolean }) {
  return (
    <article className="studio-work-card">
      <Link href={`/work/${study.slug}`} className="studio-work-image-link" aria-label={`Read the ${study.name} case study`}>
        <Image src={study.image} alt={study.alt} width={1200} height={750} sizes="(max-width: 767px) 100vw, (max-width: 1199px) 50vw, 33vw" loading={eager ? "eager" : "lazy"} className="studio-work-image" />
        <span className="studio-image-arrow" aria-hidden="true">↗</span>
      </Link>
      <div className="studio-work-card-copy">
        <p className="studio-eyebrow">{study.category}</p>
        <h3 className="studio-display"><Link href={`/work/${study.slug}`}>{study.name}</Link></h3>
        <p>{study.intro}</p>
        <Link className="studio-card-link" href={`/work/${study.slug}`}>View project notes <span aria-hidden="true">↗</span></Link>
      </div>
    </article>
  );
}
