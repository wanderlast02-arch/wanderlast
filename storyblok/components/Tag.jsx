"use client";

import { storyblokEditable } from "@storyblok/react";

export default function Tag({ blok }) {
  const label = blok.label || "Curated by Wanderlast";

  return (
    <span
      {...storyblokEditable(blok)}
      style={{
        background: "var(--accent-green-200, #dcfce7)",
        padding: "6px 14px",
        borderRadius: "40px",
        fontSize: "13px",
        color: "var(--primary-700, #0f766e)",
        border: "1px solid var(--accent-green-300, #bbf7d0)",
      }}
    >
      {label}
    </span>
  );
}
