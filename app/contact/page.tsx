import { ContactForm } from "@/components/contact/contact-form";
import { projectTypeOptions, serviceOptions, timelineOptions } from "@/data/leads";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Start a Project Conversation",
  description:
    "Share your goals, users, key functionality, and timeline to begin a technical project discussion with PSDigiLabs.",
  path: "/contact",
});

const whatsappUrl = process.env.NEXT_PUBLIC_WHATSAPP_URL;
const bookingUrl = process.env.NEXT_PUBLIC_BOOKING_URL;

type ContactSearchParams = {
  service?: string | string[];
  project_type?: string | string[];
  company_name?: string | string[];
  timeline?: string | string[];
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<ContactSearchParams>;
}) {
  const query = await searchParams;
  const serviceValue = typeof query.service === "string" ? query.service : "";
  const projectTypeValue = typeof query.project_type === "string" ? query.project_type : "";
  const companyName = typeof query.company_name === "string" ? query.company_name.slice(0, 120) : "";
  const timelineValue = typeof query.timeline === "string" ? query.timeline : "";
  const initialService = serviceOptions.some(([value]) => value === serviceValue)
    ? serviceValue
    : "";
  const initialProjectType = projectTypeOptions.some(([value]) => value === projectTypeValue)
    ? projectTypeValue
    : "";
  const initialTimeline = timelineOptions.find((value) => value === timelineValue) ?? "";

  return (
    <main className="studio-page">
      <section className="studio-interior-hero">
        <div className="studio-container studio-interior-hero-grid">
          <div><p className="studio-eyebrow">Contact</p><h1 className="studio-display">A useful first step<br /><span>is a clear conversation.</span></h1></div>
          <p>Tell us what you want to change, who it is for and what you already have. We&apos;ll review the context and aim to reply within one business day.</p>
        </div>
      </section>

      <section className="studio-section">
        <div className="studio-container studio-contact-grid">
          <div className="studio-contact-copy">
            <p className="studio-eyebrow">Project enquiry</p>
            <h2 className="studio-display">Bring the brief.<br />We&apos;ll help shape the scope.</h2>
            <p>Share the goals, users, important functionality and timeline. A useful first estimate depends on the actual scope, integrations and delivery requirements.</p>
            <div className="studio-contact-links">
              <a href="mailto:contact@psdigilabs.in"><span>Email</span><strong>contact@psdigilabs.in</strong><span aria-hidden="true">↗</span></a>
              <div><span>Based in</span><strong>Kolkata, India<br />Working worldwide</strong></div>
              {whatsappUrl && <a href={whatsappUrl} target="_blank" rel="noopener noreferrer"><span>WhatsApp</span><strong>Message the studio</strong><span aria-hidden="true">↗</span></a>}
              {bookingUrl && <a href={bookingUrl} target="_blank" rel="noopener noreferrer"><span>Book a call</span><strong>Choose a time</strong><span aria-hidden="true">↗</span></a>}
            </div>
          </div>

          <div className="studio-contact-form-panel">
            <div className="studio-contact-form-heading"><span>01 / PROJECT DETAILS</span><p>Required fields are marked with an asterisk.</p></div>
            <ContactForm
              initialService={initialService}
              initialProjectType={initialProjectType}
              initialCompanyName={companyName}
              initialTimeline={initialTimeline}
            />
          </div>
        </div>
      </section>
    </main>
  );
}