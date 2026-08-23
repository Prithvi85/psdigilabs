import { navigation } from "@/data/navigation";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div><Link href="/" className="footer-brand">PSDigiLabs</Link><p className="footer-tagline">BUILD <span>&bull;</span> TEST <span>&bull;</span> AUTOMATE</p><p>Digital development, software testing and workflow automation.</p></div>
        <nav aria-label="Footer navigation"><p className="footer-heading">QUICK LINKS</p><div className="footer-links">{navigation.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}</div></nav>
        <div><p className="footer-heading">CONTACT</p><a href="mailto:psdigilabs@gmail.com">psdigilabs@gmail.com</a><a href="https://www.psdigilabs.in" target="_blank" rel="noopener noreferrer">www.psdigilabs.in</a></div>
      </div>
      <div className="container copyright">&copy; {new Date().getFullYear()} PSDigiLabs. All rights reserved.</div>
    </footer>
  );
}
