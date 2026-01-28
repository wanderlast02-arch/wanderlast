"use client";
import { storyblokEditable } from "@storyblok/react";

export default function FeaturedExperiencesSection({ blok }) {
  return (
    <section {...storyblokEditable(blok)} style={{ padding: "40px" }}>
      <h2>Featured Experiences Section</h2>
      <pre>{JSON.stringify(blok, null, 2)}</pre>
    </section>
  );
}
