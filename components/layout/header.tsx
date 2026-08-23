import Image from "next/image";
import Link from "next/link";
import { navigation } from "@/data/navigation";
import { MobileMenu } from "./mobile-menu";

export function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" className="brand" aria-label="PSDigiLabs home">
          <Image src="/images/branding/logo.png" alt="PSDigiLabs" width={1302} height={1208} priority />
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
        </nav>
        <Link className="button button-primary header-cta" href="/contact">LET&apos;S CONNECT</Link>
        <MobileMenu />
      </div>
    </header>
  );
}
