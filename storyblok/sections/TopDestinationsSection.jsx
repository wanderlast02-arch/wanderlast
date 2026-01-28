"use client";

import { storyblokEditable, StoryblokComponent } from "@storyblok/react";

const DUMMY_DESTINATIONS = [
  {
    _uid: "dest-1",
    component: "destination_card",
    name: "Phuket",
    image: {
      filename: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&h=300&fit=crop",
    },
  },
  {
    _uid: "dest-2",
    component: "destination_card",
    name: "Chiang Mai",
    image: {
      filename: "https://images.unsplash.com/photo-1552520514-5fefe8c9ef14?w=400&h=300&fit=crop",
    },
  },
  {
    _uid: "dest-3",
    component: "destination_card",
    name: "Bangkok",
    image: {
      filename: "https://images.unsplash.com/photo-1533900298318-6b8da08a523e?w=400&h=300&fit=crop",
    },
  },
  {
    _uid: "dest-4",
    component: "destination_card",
    name: "Bali",
    image: {
      filename: "https://images.unsplash.com/photo-1572632202926-69f6ef4c4c7d?w=400&h=300&fit=crop",
    },
  },
];

export default function TopDestinationsSection({ blok }) {
  const destinations = blok.destinations?.length > 0 ? blok.destinations : DUMMY_DESTINATIONS;
  const title = blok.title || "Top Destinations";

  return (
    <section
      {...storyblokEditable(blok)}
      style={{ padding: "40px 24px", maxWidth: "1200px", margin: "0 auto" }}
    >
      <h2
        style={{
          fontSize: "28px",
          marginBottom: "20px",
        }}
      >
        {title}
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
          gap: "20px",
        }}
      >
        {destinations.map((dest) => (
          <StoryblokComponent blok={dest} key={dest._uid} />
        ))}
      </div>
    </section>
  );
}
