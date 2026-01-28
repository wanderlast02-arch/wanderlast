"use client";

import { storyblokEditable, StoryblokComponent } from "@storyblok/react";

export default function LayoutDefault({ blok }) {
  const content = blok.body || blok.content || [];

  return (
    <div
      {...storyblokEditable(blok)}
      style={{
        background: "var(--surface, #f9fafb)",
        color: "var(--text-primary, #0f172a)",
        minHeight: "100vh",
      }}
    >
      {(content || []).map((nested) => (
        <StoryblokComponent blok={nested} key={nested._uid} />
      ))}
    </div>
  );
}
