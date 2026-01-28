"use client";

import { storyblokEditable, StoryblokComponent } from "@storyblok/react";

export default function Breadcrumbs({ blok }) {
  const items = blok.items || [];

  return (
    <nav
      {...storyblokEditable(blok)}
      aria-label="Breadcrumbs"
      style={{
        display: "flex",
        gap: "8px",
        flexWrap: "wrap",
        fontSize: "14px",
        color: "var(--text-secondary, #4b5563)",
      }}
    >
      {items.length === 0 && (
        <span style={{ color: "var(--text-secondary, #6b7280)" }}>
          Wanderlast / Discover / Experiences
        </span>
      )}
      {items.map((item, idx) => (
        <span key={item._uid || idx} style={{ display: "flex", gap: "6px" }}>
          <StoryblokComponent blok={item} />
          {idx < items.length - 1 && <span>/</span>}
        </span>
      ))}
    </nav>
  );
}
