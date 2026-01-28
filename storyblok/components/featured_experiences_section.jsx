"use client";

import { storyblokEditable, StoryblokComponent } from "@storyblok/react";

export default function FeaturedExperiencesSection({ blok }) {
  const experiences = blok.experiences || [];
  const title = blok.title || "Hand-picked experiences selected by Wanderlast";

  return (
    <section
      {...storyblokEditable(blok)}
      style={{ padding: "40px 24px", maxWidth: "1200px", margin: "0 auto" }}
    >
      {title && (
        <h2 style={{ fontSize: "32px", marginBottom: "24px" }}>{title}</h2>
      )}

      {experiences.length === 0 && (
        <div
          style={{
            border: "1px dashed #cbd5e1",
            borderRadius: "12px",
            padding: "20px",
            color: "#475569",
            background: "#f8fafc",
          }}
        >
          Add experience_card blocks in Storyblok to showcase tours and
          activities.
        </div>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "24px",
        }}
      >
        {experiences.map((experienceBlok) => (
          <StoryblokComponent blok={experienceBlok} key={experienceBlok._uid} />
        ))}
      </div>
    </section>
  );
}
