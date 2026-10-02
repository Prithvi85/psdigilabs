export function MarketReference() {
  const rows = [
    { service: "Landing Page", india: "₹8,000 – ₹25,000", us: "$3,000 – $10,000", uk: "£500 – £3,000", canada: "CA$2,500 – CA$10,000", australia: "A$3,000 – A$15,000" },
    { service: "Business Website", india: "₹20,000 – ₹60,000", us: "$3,000 – $10,000", uk: "£500 – £3,000", canada: "CA$2,500 – CA$10,000", australia: "A$3,000 – A$15,000" },
    { service: "E-commerce Website", india: "₹60,000 – ₹4,00,000+", us: "$5,000 – $25,000+", uk: "£3,000 – £25,000+", canada: "CA$5,000 – CA$25,000+", australia: "A$8,000 – A$25,000+" },
    { service: "Custom Web App", india: "₹2,00,000 – ₹15,00,000+", us: "$25,000 – $150,000+", uk: "£15,000 – £100,000+", canada: "CA$15,000 – CA$40,000+", australia: "A$20,000 – A$300,000+" },
  ];

  return (
    <section className="container" style={{ padding: "5rem 1.25rem" }}>
      <p style={{
        margin: "0 0 0.75rem",
        color: "var(--blue-primary)",
        fontSize: "0.75rem",
        fontWeight: 700,
        letterSpacing: "0.1em",
        textTransform: "uppercase"
      }}>
        2026 Market Reference
      </p>
      <h2 style={{
        margin: "0 0 1rem",
        color: "var(--text-primary)",
        fontSize: "2rem",
        fontWeight: 800,
        lineHeight: 1.15
      }}>
        What these services typically cost.
      </h2>
      <p style={{
        maxWidth: "44rem",
        margin: "0 0 2.5rem",
        color: "var(--text-secondary)",
        fontSize: "0.9375rem",
        lineHeight: 1.65
      }}>
        Indicative market ranges across five major markets. Every engagement is scoped on its own
        requirements — these ranges are a planning reference, not a quote.
      </p>

      <div className="pricing-comparison-table-wrapper">
        <table className="pricing-comparison-table">
          <thead>
            <tr>
              <th>Service</th>
              <th>India</th>
              <th>United States</th>
              <th>United Kingdom</th>
              <th>Canada</th>
              <th>Australia</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.service}>
                <td style={{ fontWeight: 600 }}>{row.service}</td>
                <td>{row.india}</td>
                <td>{row.us}</td>
                <td>{row.uk}</td>
                <td>{row.canada}</td>
                <td>{row.australia}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p style={{
        marginTop: "1.5rem",
        color: "var(--text-secondary)",
        fontSize: "0.9rem"
      }}>
        Read the full study:{" "}
        <a
          href="/resources/2026-web-development-pricing-benchmark"
          style={{
            color: "var(--blue-primary)",
            textDecoration: "underline",
            fontWeight: 600
          }}
        >
          2026 Web Development Pricing Benchmark →
        </a>
      </p>
    </section>
  );
}