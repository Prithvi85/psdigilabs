import type { Metadata } from "next";
import Link from "next/link";
import { PricingCards } from "@/components/pricing/pricing-cards";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";

export const metadata: Metadata = {
  title: "Website Development Pricing | PSDigiLabs",
  description:
    "Explore India and international starting prices for websites, CMS platforms, e-commerce and custom web applications.",
  alternates: { canonical: "/pricing" },
};

export default function PricingPage() {
  return (
    <>
      <Header />

      <main className="inner-main">
        <section className="page-hero">
          <div className="container">
            <p className="eyebrow">INDIA & INTERNATIONAL PRICING</p>

            <h1>
              REALISTIC STARTING POINTS.
              <br />
              SCOPED FOR YOUR PROJECT.
            </h1>

            <p>
              Every project is different. Final pricing depends on scope,
              functionality, integrations, content, complexity and delivery
              requirements.
            </p>
          </div>
        </section>

        <section className="container pricing-content">
          <PricingCards />
        </section>

        <section className="pricing-study">
          <div className="container pricing-study-inner">
            <div className="pricing-study-copy">
              <p className="eyebrow">2026 MARKET COMPARISON</p>

              <h2>How Competitive Is PSDigiLabs Pricing?</h2>

              <p>
                We compared our current starting prices with indicative 2026
                Indian web development market ranges across landing pages,
                business websites, CMS platforms, e-commerce and custom web
                applications.
              </p>

              <p>
                The study shows that PSDigiLabs currently operates toward the
                low-to-competitive end of the market, with especially strong
                value in advanced business platforms and custom application
                development.
              </p>
            </div>

            <div className="pricing-study-actions">
              <a
                className="button button-primary"
                href="/downloads/PSDigiLabs_2026_Market_Pricing_Comparative_Study.pptx"
                download
              >
                DOWNLOAD COMPARATIVE STUDY
              </a>

              <Link className="button button-secondary" href="/contact">
                DISCUSS YOUR PROJECT
              </Link>
            </div>
          </div>
        </section>

        <section className="custom-quote">
          <div className="container">
            <div>
              <p className="eyebrow light-eyebrow">TAILORED DELIVERY</p>

              <h2>Need Something More Custom?</h2>

              <p>
                Custom functionality, automation, integrations, dashboards and
                unique workflows can be scoped individually.
              </p>
            </div>

            <div className="section-actions">
              <Link
                className="button button-light"
                href="/contact?service=custom"
              >
                REQUEST A CUSTOM QUOTE
              </Link>

              <Link
                className="button button-secondary dark-secondary"
                href="/contact"
              >
                LET&apos;S CONNECT
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}