import { navigation } from "@/data/navigation";
import Image from "next/image";
import Link from "next/link";

export function Footer() {
  const newsletterUrl = process.env.NEXT_PUBLIC_NEWSLETTER_URL;

  return (
    <footer className="studio-footer">
      <div className="studio-container">
        <div className="studio-footer-top">
          <div className="studio-footer-brand">
            <Link href="/" className="studio-wordmark">
              <Image src="/images/branding/logo.png" alt="PSDigiLabs" width={1302} height={1208} className="studio-logo" />
            </Link>
            <p>Digital products, engineered with care.</p>
          </div>

          <nav aria-label="Footer navigation" className="studio-footer-links">
            <h2>Explore</h2>
            {navigation.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="studio-footer-contact">
            <h2>Start a conversation</h2>
            <a href="mailto:contact@psdigilabs.in">contact@psdigilabs.in <span aria-hidden="true">↗</span></a>
            <p>Kolkata, India<br />Working with teams worldwide</p>
            <Link href="/contact" className="studio-footer-cta">Tell us what you&apos;re building <span aria-hidden="true">↗</span></Link>
            {newsletterUrl && <a href={newsletterUrl} target="_blank" rel="noopener noreferrer">Subscribe to studio notes <span aria-hidden="true">↗</span></a>}
          </div>
        </div>

        <div className="studio-footer-bottom">
          <p>&copy; {new Date().getFullYear()} PSDigiLabs</p>
          <p>Built with intent. Tested with care.</p>
        </div>
      </div>
    </footer>
  );
}
