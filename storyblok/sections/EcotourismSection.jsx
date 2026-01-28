"use client";

import { storyblokEditable } from "@storyblok/react";

export default function EcotourismSection({ blok }) {
  const title = blok.title || "Eco-friendly adventures";
  const description =
    blok.description ||
    "Discover sustainable experiences that protect nature and support local communities.";

  return (
    <section
      {...storyblokEditable(blok)}
      style={{
        padding: "48px 24px",
        background: "var(--neutral-100, #f3f4f6)",
        borderRadius: "16px",
        marginTop: "32px",
        maxWidth: "1200px",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <h2 style={{ fontSize: "28px", marginBottom: "16px" }}>{title}</h2>

      <p style={{ fontSize: "18px", maxWidth: "720px", color: "#4b5563" }}>
        {description}
      </p>
    </section>
  );
}
