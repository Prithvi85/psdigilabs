"use client";

import { useEffect, useState } from "react";
import { navigation } from "@/data/navigation";
import Link from "next/link";

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  return (
    <div className="studio-mobile-menu">
      <button className="studio-menu-toggle" type="button" aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? "Close navigation menu" : "Open navigation menu"} onClick={() => setOpen((value) => !value)}>
        <span className={open ? "studio-menu-icon is-open" : "studio-menu-icon"} aria-hidden="true"><i /><i /></span>
      </button>
      {open && (
        <div id="mobile-navigation" className="studio-mobile-panel">
          <nav aria-label="Mobile navigation">
            {navigation.map((item) => <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>{item.label}<span aria-hidden="true">↗</span></Link>)}
            <Link className="studio-button studio-button-lime" href="/contact" onClick={() => setOpen(false)}>Tell us what you&apos;re building <span aria-hidden="true">↗</span></Link>
          </nav>
        </div>
      )}
    </div>
  );
}
