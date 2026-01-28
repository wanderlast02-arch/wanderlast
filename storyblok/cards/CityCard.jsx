"use client";

import { storyblokEditable } from "@storyblok/react";

export default function CityCard({ blok }) {
  const name = blok.name || "Chiang Mai";
  const image =
    blok.image?.filename ||
    "https://source.unsplash.com/random/300x300/?thailand,city";

  return (
    <div
      {...storyblokEditable(blok)}
      style={{ textAlign: "center", cursor: "pointer" }}
    >
      <img
        src={image}
        alt={name}
        style={{
          width: "120px",
          height: "120px",
          borderRadius: "100%",
          objectFit: "cover",
          border: "3px solid var(--neutral-100, #f3f4f6)",
          boxShadow: "0 4px 12px rgba(15, 23, 42, 0.08)",
        }}
      />
      <p style={{ marginTop: "12px", fontSize: "15px", fontWeight: 600 }}>
        {name}
      </p>
    </div>
  );
}
