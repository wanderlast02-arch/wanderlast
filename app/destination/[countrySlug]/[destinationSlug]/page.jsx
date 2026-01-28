import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
const { data } = require("../../../../lib/data");

const FALLBACK = "/images/figma/placeholder.jpg";
const pickImage = (src) => src || FALLBACK;

export default function DestinationDetailPage({ params }) {
  const { countrySlug, destinationSlug } = params;
  const destination = data.getDestination(countrySlug, destinationSlug);
  if (!destination) notFound();
  const experiences = data.listExperiences({ countrySlug, destinationSlug });

  return (
    <main>
      {/* HERO */}
      <section
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(45, 95, 79, 0.4) 0%, rgba(123, 166, 142, 0.3) 100%), url('${pickImage(
            destination.image
          )}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "420px",
          display: "flex",
          alignItems: "flex-end",
          padding: "48px 24px 56px 24px",
          color: "white",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto", width: "100%" }}>
          <div style={{ fontSize: "12px", opacity: 0.85, marginBottom: "16px", letterSpacing: "0.5px" }}>
            <Link href="/">HOME</Link>{" › "}
            <Link href="/destinations">DESTINATIONS</Link>{" › "}
            <Link href={`/destinations/${countrySlug}`}>{countrySlug.toUpperCase()}</Link>{" › "}
            <span style={{ opacity: 0.9 }}>{destination.name.toUpperCase()}</span>
          </div>
          <h1 style={{ fontSize: "48px", fontWeight: 300, letterSpacing: "2px", margin: 0 }}>{destination.name}</h1>
        </div>
      </section>

      {/* EXPERIENCES LIST */}
      <section style={{ padding: "80px 24px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ marginBottom: "32px" }}>
            <h2 style={{ fontSize: "32px", fontWeight: 300, color: "var(--primary)", margin: 0 }}>Experiences</h2>
            <p style={{ color: "var(--text-secondary)" }}>Curated activities in {destination.name}</p>
          </div>
          {experiences.length ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "24px" }}>
              {experiences.map((exp) => (
                <Link
                  key={exp.slug}
                  href={`/experience/${exp.slug}`}
                  style={{
                    background: "white",
                    borderRadius: "12px",
                    overflow: "hidden",
                    textDecoration: "none",
                    color: "inherit",
                    border: "1px solid rgba(45,95,79,0.08)",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
                  }}
                >
                  <div
                    style={{
                      height: "200px",
                      backgroundImage: `url('${pickImage(exp.image)}')`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                  <div style={{ padding: "20px" }}>
                    <h3 style={{ fontSize: "18px", fontWeight: 700, margin: "0 0 8px 0" }}>{exp.title}</h3>
                    <p style={{ margin: 0, color: "var(--text-secondary)" }}>
                      {exp.duration} • ${exp.price} • ★ {exp.rating}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div style={{ padding: "40px", background: "#f9fafb", borderRadius: "12px", textAlign: "center" }}>
              <p style={{ color: "var(--text-secondary)" }}>No experiences yet. Check back soon.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
