"use client";

import { storyblokEditable, StoryblokComponent } from "@storyblok/react";

export default function CategoryChips({ blok }) {
  const items = blok.items || [];

  return (
    <div
      {...storyblokEditable(blok)}
      style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}
    >
      {items.length === 0 && (
        <span
          style={{
            background: "var(--neutral-100, #f3f4f6)",
            padding: "8px 14px",
            borderRadius: "999px",
            fontSize: "14px",
          }}
        >
          Beaches • Food Tours • Wellness • Culture
        </span>
      )}
      {items.map((category) => (
        <StoryblokComponent blok={category} key={category._uid} />
      ))}
    </div>
  );
}
