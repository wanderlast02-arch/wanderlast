"use client";

import { storyblokEditable } from "@storyblok/react";

export default function DestinationCard({ blok }) {
  const name = blok.name || "Phuket";
  const image =
    blok.image?.filename ||
    "https://source.unsplash.com/random/400x300/?thailand,beach";

  return (
    <div
      {...storyblokEditable(blok)}
      style={{
        borderRadius: "16px",
        border: "1px solid var(--neutral-300, #e5e7eb)",
        overflow: "hidden",
        background: "var(--neutral-0, #ffffff)",
        cursor: "pointer",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        boxShadow: "0 4px 12px rgba(15, 23, 42, 0.06)",
      }}
    >
      <img
        src={image}
        alt={name}
        style={{ width: "100%", height: "200px", objectFit: "cover" }}
      />
      <div style={{ padding: "16px" }}>
        <h3 style={{ fontSize: "18px", fontWeight: 600 }}>{name}</h3>
        <p style={{ fontSize: "14px", color: "#4b5563" }}>
          Discover winding streets, hidden food markets, and sunset viewpoints.
        </p>
      </div>
    </div>
  );
}
