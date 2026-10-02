import Image from "next/image";
import Link from "next/link";
import { navigation } from "@/data/navigation";
import { MobileMenu } from "./mobile-menu";

export function Header() {
  return (
    <header className="studio-header">
      <div className="studio-container studio-header-inner">
        <Link href="/" className="studio-wordmark" aria-label="PSDigiLabs home">
          <Image src="/images/branding/logo.png" alt="PSDigiLabs" width={1302} height={1208} priority className="studio-logo" />
        </Link>
        <nav className="studio-desktop-nav" aria-label="Main navigation">
          {navigation.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
        </nav>
        <Link className="studio-button studio-button-dark studio-header-cta" href="/contact">
          Tell us what you&apos;re building <span aria-hidden="true">↗</span>
        </Link>
        <MobileMenu />
      </div>
    </header>
  );
}
