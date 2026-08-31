const steps = [
  ["01", "Discover", "Understand objectives, users and practical constraints."],
  ["02", "Plan / Design", "Define the solution, structure and user experience."],
  ["03", "Build & Test", "Develop the product and validate the important journeys."],
  ["04", "Launch", "Deploy carefully and refine from real-world feedback."],
] as const;

export function ProcessSection() {
  return <section className="process-section" aria-labelledby="process-title"><div className="container"><div className="section-heading"><p className="eyebrow">HOW WE WORK</p><h2 id="process-title">A CLEAR PATH FROM<br />IDEA TO DELIVERY.</h2><p>Focused steps keep decisions visible, quality integrated and delivery grounded in business needs.</p></div><ol className="process-grid">{steps.map(([number,title,description])=><li key={number}><span>{number}</span><h3>{title}</h3><p>{description}</p></li>)}</ol></div></section>;
}