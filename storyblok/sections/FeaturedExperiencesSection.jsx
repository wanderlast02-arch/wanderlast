"use client";

import { storyblokEditable, StoryblokComponent } from "@storyblok/react";

const DUMMY_EXPERIENCES = [
  {
    _uid: "featured-exp-1",
    component: "experience_card",
    title: "Sunrise Hike & Meditation",
    location: "Chiang Mai",
    price: 45,
    duration: "4 hours",
    image: {
      filename: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
    },
  },
  {
    _uid: "featured-exp-2",
    component: "experience_card",
    title: "Traditional Cooking Class",
    location: "Bangkok",
    price: 52,
    duration: "3 hours",
    image: {
      filename: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
    },
  },
  {
    _uid: "featured-exp-3",
    component: "experience_card",
    title: "Island Hopping Tour",
    location: "Phuket",
    price: 72,
    duration: "6 hours",
    image: {
      filename: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop",
    },
  },
  {
    _uid: "featured-exp-4",
    component: "experience_card",
    title: "Night Market Food Tour",
    location: "Bangkok",
    price: 38,
    duration: "2.5 hours",
    image: {
      filename: "https://images.unsplash.com/photo-1504674900568-a00270e45681?w=400&h=300&fit=crop",
    },
  },
];

export default function FeaturedExperiencesSection({ blok }) {
  const experiences = blok.experiences?.length > 0 ? blok.experiences : DUMMY_EXPERIENCES;

  // Extract "why it matters" text from richtext fields
  const getWhyItMatters = (exp) => {
    if (exp.why_it_matters?.content?.[0]?.content?.[0]?.text) {
      return exp.why_it_matters.content[0].content[0].text;
    }
    return null;
  };

  return (
    <section
      {...storyblokEditable(blok)}
      style={{ padding: "40px 24px", maxWidth: "1200px", margin: "0 auto" }}
    >
      <h2 style={{ fontSize: "var(--font-h2)", marginBottom: "20px" }}>
        {blok.title || "Featured Experiences"}
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "20px",
        }}
      >
        {experiences.map((exp) => (
          <StoryblokComponent key={exp._uid} blok={exp} />
        ))}
      </div>

      {/* Why This Experience Matters - Sub-section */}
      <div style={{ marginTop: "48px", paddingTop: "32px", borderTop: "1px solid var(--border)" }}>
        <h3
          style={{
            fontSize: "var(--font-h3)",
            marginBottom: "24px",
            color: "var(--text-primary)",
          }}
        >
          Why these experiences matter
        </h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "24px",
          }}
        >
          {experiences.map((exp) => {
            const whyItMatters = getWhyItMatters(exp);
            if (!whyItMatters) return null;

            return (
              <div
                key={exp._uid}
                style={{
                  padding: "20px",
                  backgroundColor: "rgba(123, 166, 142, 0.05)",
                  borderRadius: "8px",
                  borderLeft: "4px solid var(--accent)",
                }}
              >
                <p
                  style={{
                    fontSize: "14px",
                    color: "var(--text-primary)",
                    marginBottom: "8px",
                    fontWeight: 600,
                  }}
                >
                  {exp.title}
                </p>
                <p
                  style={{
                    fontSize: "13px",
                    color: "var(--text-secondary)",
                    lineHeight: "1.6",
                  }}
                >
                  {whyItMatters}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
