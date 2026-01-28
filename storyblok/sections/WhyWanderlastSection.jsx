"use client";

import { storyblokEditable } from "@storyblok/react";

const VALUE_CARDS = [
  {
    icon: "🎯",
    title: "Authentic Experiences",
    description: "Curated by local hosts, not algorithms. Real connections with people who know their land.",
  },
  {
    icon: "🌱",
    title: "Sustainable by Design",
    description: "Small groups, low-impact choices. Travel that protects the places you love.",
  },
  {
    icon: "🤝",
    title: "Human Connections",
    description: "Meaningful encounters, not checklist tourism. Stories that stay with you.",
  },
  {
    icon: "💚",
    title: "Fair to Locals",
    description: "Fair pay and community-first initiatives. Your money supports livelihoods.",
  },
];

export default function WhyWanderlastSection({ blok }) {
  const title = blok.title || "Why choose Wanderlast?";
  const description =
    blok.description ||
    "We believe travel should be authentic, sustainable, and meaningful. Every experience is designed to benefit travelers and local communities.";
  const cards = blok.cards?.length > 0 ? blok.cards : VALUE_CARDS;

  return (
    <section
      {...storyblokEditable(blok)}
      style={{
        padding: "60px 24px",
        background: "linear-gradient(135deg, rgba(45, 95, 79, 0.03) 0%, rgba(123, 166, 142, 0.05) 100%)",
        maxWidth: "1200px",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "48px" }}>
        <h2
          style={{
            fontSize: "var(--font-h2, 32px)",
            fontWeight: 700,
            marginBottom: "16px",
            color: "var(--text-primary, #111827)",
          }}
        >
          {title}
        </h2>
        <p
          style={{
            fontSize: "var(--font-body-lg, 18px)",
            color: "var(--text-secondary, #4b5563)",
            maxWidth: "600px",
            marginLeft: "auto",
            marginRight: "auto",
            lineHeight: "1.6",
          }}
        >
          {description}
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "24px",
        }}
      >
        {cards.map((card, idx) => (
          <div
            key={idx}
            style={{
              padding: "32px 24px",
              backgroundColor: "white",
              borderRadius: "12px",
              border: "1px solid rgba(45, 95, 79, 0.1)",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
              transition: "all 0.3s ease",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow = "0 12px 24px rgba(0, 0, 0, 0.08)";
              e.currentTarget.style.borderColor = "var(--accent, #7BA68E)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.04)";
              e.currentTarget.style.borderColor = "rgba(45, 95, 79, 0.1)";
            }}
          >
            <div
              style={{
                fontSize: "48px",
                lineHeight: 1,
                marginBottom: "8px",
              }}
            >
              {card.icon || "●"}
            </div>

            <h3
              style={{
                fontSize: "var(--font-h4, 18px)",
                fontWeight: 700,
                color: "var(--primary, #2D5F4F)",
                margin: 0,
              }}
            >
              {card.title}
            </h3>

            <p
              style={{
                fontSize: "var(--font-body-m, 14px)",
                color: "var(--text-secondary, #4b5563)",
                lineHeight: "1.5",
                margin: 0,
              }}
            >
              {card.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
