"use client";

import { storyblokEditable } from "@storyblok/react";

export default function HeroBanner({ blok }) {
  const title = blok.title || "Discover Stunning Beaches in Thailand";
  const subtitle =
    blok.subtitle ||
    "Hand-picked experiences selected by Wanderlast. Small-group adventures led by local experts.";
  const cta = blok.cta_label || "Book Now";

  return (
    <section
      {...storyblokEditable(blok)}
      style={{
        padding: "72px 24px",
        background: "linear-gradient(135deg, #0ea5e9, #22d3ee)",
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        gap: "20px",
      }}
    >
      <h1 style={{ fontSize: "42px", fontWeight: 700 }}>{title}</h1>

      {subtitle && (
        <p
          style={{
            maxWidth: "680px",
            fontSize: "18px",
            opacity: 0.9,
          }}
        >
          {subtitle}
        </p>
      )}

      {cta && (
        <button
          style={{
            padding: "14px 24px",
            background: "rgba(255,255,255,0.12)",
            color: "white",
            borderRadius: "10px",
            fontSize: "16px",
            border: "1px solid rgba(255,255,255,0.3)",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          {cta}
        </button>
      )}
    </section>
  );
}
