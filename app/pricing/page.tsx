import type { Metadata } from "next";
import Link from "next/link";
import { PricingCards } from "@/components/pricing/pricing-cards";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { pricingPackages } from "@/data/pricing";

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
            <p className="eyebrow">INDIA &amp; INTERNATIONAL PRICING</p>

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

        <section
          className="pricing-seo-comparison"
          aria-labelledby="pricing-comparison-heading"
        >
          <div className="container">
            <div className="pricing-seo-heading">
              <p className="eyebrow">2026 WEBSITE DEVELOPMENT PRICING</p>

              <h2 id="pricing-comparison-heading">
                Website Development Pricing in India &amp; International Markets
              </h2>

              <p>
                PSDigiLabs offers separate starting prices for India and
                international projects. These are market-specific starting
                points rather than direct currency conversions, with final
                quotations based on project scope, functionality, integrations
                and delivery requirements.
              </p>
            </div>

            <div className="pricing-comparison-table-wrap">
              <table className="pricing-comparison-table">
                <thead>
                  <tr>
                    <th scope="col">Service</th>
                    <th scope="col">India</th>
                    <th scope="col">International</th>
                  </tr>
                </thead>

                <tbody>
                  {pricingPackages.map((item) => (
                    <tr key={item.id}>
                      <th scope="row">{item.title}</th>
                      <td>{item.price.india}</td>
                      <td>{item.price.international}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="pricing-comparison-note">
              Starting prices provide an initial planning reference. Projects
              requiring additional integrations, custom workflows, data
              migration, advanced functionality or ongoing support are scoped
              separately.
            </p>
          </div>
        </section>

        <section
          className="pricing-cost-factors"
          aria-labelledby="pricing-cost-factors-heading"
        >
          <div className="container">
            <div className="pricing-cost-factors-heading">
              <p className="eyebrow">PROJECT COST FACTORS</p>

              <h2 id="pricing-cost-factors-heading">
                What Affects Website Development Cost?
              </h2>

              <p>
                Website development costs vary because every project has
                different business goals, technical requirements and delivery
                needs. The final quotation is based on the actual scope rather
                than a fixed one-size-fits-all package.
              </p>
            </div>

            <div className="pricing-cost-factors-grid">
              <article>
                <span>01</span>
                <h3>Project Scope</h3>
                <p>
                  The number of pages, user journeys, content requirements and
                  overall size of the project influence development effort.
                </p>
              </article>

              <article>
                <span>02</span>
                <h3>Design Complexity</h3>
                <p>
                  Custom layouts, responsive behaviour, animations and
                  specialised interface requirements can increase design and
                  implementation work.
                </p>
              </article>

              <article>
                <span>03</span>
                <h3>CMS &amp; Database Requirements</h3>
                <p>
                  Admin dashboards, editable content, structured data and
                  database workflows require additional architecture and
                  development.
                </p>
              </article>

              <article>
                <span>04</span>
                <h3>Integrations</h3>
                <p>
                  Payment gateways, analytics, email services, authentication
                  and third-party APIs can affect project complexity and
                  delivery time.
                </p>
              </article>

              <article>
                <span>05</span>
                <h3>Custom Functionality &amp; Automation</h3>
                <p>
                  Business-specific workflows, dashboards, role-based features
                  and automation are scoped according to their technical
                  requirements.
                </p>
              </article>

              <article>
                <span>06</span>
                <h3>Ongoing Support</h3>
                <p>
                  Maintenance, updates, monitoring and post-launch improvements
                  can be included according to the level of ongoing support
                  required.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="pricing-study">
          <div className="container pricing-study-inner">
            <div className="pricing-study-copy">
              <p className="eyebrow">
                2026 INDIA &amp; INTERNATIONAL MARKET COMPARISON
              </p>

              <h2>How Competitive Is PSDigiLabs Pricing?</h2>

              <p>
                We compared PSDigiLabs starting prices with indicative 2026
                market ranges across India, the United States, United Kingdom,
                Canada and Australia for landing pages, business websites, CMS
                platforms, e-commerce and custom web applications.
              </p>

              <p>
                The study shows that PSDigiLabs delivers international-quality
                digital solutions at highly competitive prices - cost-efficient
                in every major market, with exceptional value in advanced
                platforms and custom application development.
              </p>
            </div>

            <div className="pricing-study-actions">
              <a
                className="button button-primary"
                href="/downloads/PSDigiLabs_2026_Market_Pricing_Comparative_Study.pptx"
                download
              >
                DOWNLOAD 2026 PRICING STUDY
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
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}