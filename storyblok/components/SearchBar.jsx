"use client";

import { storyblokEditable } from "@storyblok/react";

export default function SearchBar({ blok }) {
  const placeholder = blok.placeholder || "Search for trips, cities, or experiences";
  const cta = blok.cta_label || "Book Now";

  return (
    <div
      {...storyblokEditable(blok)}
      style={{
        display: "flex",
        gap: "12px",
        padding: "16px",
        background: "var(--neutral-0, #ffffff)",
        border: "1px solid var(--neutral-300, #e5e7eb)",
        borderRadius: "12px",
        width: "100%",
        maxWidth: "720px",
      }}
    >
      <input
        placeholder={placeholder}
        style={{
          flex: 1,
          border: "none",
          outline: "none",
          fontSize: "16px",
        }}
      />
      <button
        style={{
          background: "var(--primary, #0ea5e9)",
          color: "white",
          border: "none",
          borderRadius: "8px",
          padding: "12px 20px",
          fontWeight: 600,
          cursor: "pointer",
        }}
      >
        {cta}
      </button>
    </div>
  );
}
