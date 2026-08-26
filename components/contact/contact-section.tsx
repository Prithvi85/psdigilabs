import { Icon } from "@/components/ui/icon";

const contacts = [
  { icon: "mail" as const, label: "Email", value: "contact@psdigilabs.in", href: "mailto:contact@psdigilabs.in" },
  { icon: "map" as const, label: "Location", value: "Kolkata, India" },
  { icon: "globe" as const, label: "Website", value: "www.psdigilabs.in", href: "https://www.psdigilabs.in" },
];

export function ContactSection() {
  return (
    <section id="contact" className="sidebar-section contact-section section-anchor"><p className="eyebrow light-eyebrow">START A CONVERSATION</p><h2>LET&apos;S CONNECT</h2><div className="contact-card">{contacts.map((contact) => contact.href ? <a key={contact.label} href={contact.href} target={contact.icon === "globe" ? "_blank" : undefined} rel={contact.icon === "globe" ? "noopener noreferrer" : undefined}><span><Icon name={contact.icon} /></span><div><small>{contact.label}</small><strong>{contact.value}</strong></div></a> : <div className="contact-item" key={contact.label}><span><Icon name={contact.icon} /></span><div><small>{contact.label}</small><strong>{contact.value}</strong></div></div>)}</div></section>
  );
}
