"use client";

import { storyblokEditable, StoryblokComponent } from "@storyblok/react";

export default function DestinationGrid({ blok }) {
  const items = blok.items || blok.destinations || [];

  return (
    <section
      {...storyblokEditable(blok)}
      style={{ padding: "20px 0", maxWidth: "1200px", margin: "0 auto" }}
    >
      {items.length === 0 && (
        <div
          style={{
            border: "1px dashed #cbd5e1",
            borderRadius: "12px",
            padding: "16px",
            color: "#475569",
            background: "#f8fafc",
          }}
        >
          Add destination_card items in Storyblok to populate this grid.
        </div>
      )}
      <div
        style={{
          display: "grid",
          gap: "20px",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        }}
      >
        {items.map((item) => (
          <StoryblokComponent blok={item} key={item._uid} />
        ))}
      </div>
    </section>
  );
}
