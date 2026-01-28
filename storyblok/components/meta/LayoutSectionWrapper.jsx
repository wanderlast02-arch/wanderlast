"use client";

import { storyblokEditable, StoryblokComponent } from "@storyblok/react";

export default function LayoutSectionWrapper({ blok }) {
  const paddingTop = blok.padding_top ?? 32;
  const paddingBottom = blok.padding_bottom ?? 32;
  const content = blok.content || [];

  return (
    <section
      {...storyblokEditable(blok)}
      id={blok.section_id || undefined}
      style={{
        padding: `${paddingTop}px 24px ${paddingBottom}px`,
        margin: "0 auto",
        maxWidth: "1200px",
      }}
    >
      {content.length === 0 && (
        <p style={{ color: "var(--text-secondary, #6b7280)" }}>
          Wanderlast section wrapper — add content blocks in Storyblok.
        </p>
      )}
      {content.map((nested) => (
        <StoryblokComponent blok={nested} key={nested._uid} />
      ))}
    </section>
  );
}
