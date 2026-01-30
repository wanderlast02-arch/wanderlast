"use client";

import Link from "next/link";

const FIGMA_COUNTRY_IMAGE = "/images/figma/country-page.png";

function pickImage(primary, fallback = FIGMA_COUNTRY_IMAGE) {
  return primary?.filename || fallback;
}

export default function TopDestinationsGrid({ destinations, countryTitle }) {
  if (!destinations?.length) return null;

  return (
    <section style={{ padding: "100px 24px", backgroundColor: "#f9fafb" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ marginBottom: "60px" }}>
          <h2 style={{ fontSize: "42px", fontWeight: 300, letterSpacing: "1px", marginBottom: "12px", color: "var(--primary)" }}>
            Top Destinations
          </h2>
          <p style={{ fontSize: "16px", color: "var(--text-secondary)" }}>
            Explore the most iconic places in {countryTitle}
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "32px" }}>
          {destinations.map((dest, idx) => (
            <Link
              key={idx}
              href={`/destination/${dest.slug}`}
              style={{
                textDecoration: "none",
                color: "inherit",
                display: "block",
              }}
            >
              <div
                style={{
                  width: "100%",
                  aspectRatio: "1 / 1",
                  borderRadius: "50%",
                  backgroundImage: `url('${pickImage(dest.image)}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  boxShadow: "0 12px 32px rgba(0, 0, 0, 0.12)",
                  cursor: "pointer",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                  e.currentTarget.style.boxShadow = "0 16px 40px rgba(0, 0, 0, 0.18)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "0 12px 32px rgba(0, 0, 0, 0.12)";
                }}
              />
              <h3 style={{ fontSize: "18px", fontWeight: 600, marginTop: "16px", color: "var(--primary)", textAlign: "center" }}>
                {dest.name || dest.title}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
