"use client";

import { storyblokEditable, StoryblokComponent } from "@storyblok/react";

export default function FilterBar({ blok }) {
  const filters = blok.filters || [];

  return (
    <div
      {...storyblokEditable(blok)}
      style={{
        display: "flex",
        gap: "12px",
        margin: "20px 0",
        overflowX: "auto",
        paddingBottom: "8px",
      }}
    >
      {filters.length === 0 && (
        <>
          <span
            style={{
              padding: "10px 18px",
              borderRadius: "20px",
              border: "1px solid var(--neutral-300, #e5e7eb)",
              background: "var(--neutral-0, #ffffff)",
              fontSize: "14px",
            }}
          >
            Popular
          </span>
          <span
            style={{
              padding: "10px 18px",
              borderRadius: "20px",
              border: "1px solid var(--neutral-300, #e5e7eb)",
              background: "var(--neutral-0, #ffffff)",
              fontSize: "14px",
            }}
          >
            Outdoor
          </span>
        </>
      )}
      {filters.map((filter) => (
        <StoryblokComponent blok={filter} key={filter._uid} />
      ))}
    </div>
  );
}
