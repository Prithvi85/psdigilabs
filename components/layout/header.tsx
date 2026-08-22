import Image from "next/image";
import { navigation } from "@/data/navigation";
import { MobileMenu } from "./mobile-menu";

export function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <a href="#home" className="brand" aria-label="PSDigiLabs home">
          <Image src="/images/branding/logo.png" alt="PSDigiLabs" width={1302} height={1208} priority />
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
        </nav>
        <a className="button button-primary header-cta" href="#contact">LET&apos;S CONNECT</a>
        <MobileMenu />
      </div>
    </header>
  );
}
