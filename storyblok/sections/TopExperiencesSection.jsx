"use client";

import { storyblokEditable, StoryblokComponent } from "@storyblok/react";

const DUMMY_EXPERIENCES = [
  {
    _uid: "exp-1",
    component: "experience_card",
    title: "Ancient Temple Tour",
    location: "Bangkok",
    price: 49,
    duration: "3 hours",
    image: {
      filename: "https://images.unsplash.com/photo-1548371528-b595076fc8c1?w=400&h=300&fit=crop",
    },
  },
  {
    _uid: "exp-2",
    component: "experience_card",
    title: "Mountain Jungle Trek",
    location: "Chiang Mai",
    price: 65,
    duration: "5 hours",
    image: {
      filename: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
    },
  },
  {
    _uid: "exp-3",
    component: "experience_card",
    title: "Snorkeling Adventure",
    location: "Phuket",
    price: 55,
    duration: "4 hours",
    image: {
      filename: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop",
    },
  },
  {
    _uid: "exp-4",
    component: "experience_card",
    title: "Street Food Tour",
    location: "Bangkok",
    price: 35,
    duration: "2.5 hours",
    image: {
      filename: "https://images.unsplash.com/photo-1504674900568-a00270e45681?w=400&h=300&fit=crop",
    },
  },
];

export default function TopExperiencesSection({ blok }) {
  const experiences = blok.experiences?.length > 0 ? blok.experiences : DUMMY_EXPERIENCES;
  const title = blok.title || "Popular Things to Do";

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
          gap: "20px",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
        }}
      >
        {experiences.map((exp) => (
          <StoryblokComponent blok={exp} key={exp._uid} />
        ))}
      </div>
    </section>
  );
}
