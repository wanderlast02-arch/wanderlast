"use client";

import { StoryblokComponent } from "@storyblok/react";
import { Suspense, useEffect } from "react";

// Fallback components for server-side rendering
const COMPONENT_FALLBACKS = {
  hero_banner: () => <div style={{ background: "#f3f4f6", height: "200px" }} />,
  search_bar_section: () => <div style={{ padding: "20px" }} />,
  featured_experiences_section: () => <div style={{ padding: "20px" }} />,
  city_card: () => <div style={{ padding: "20px" }} />,
  destination_card: () => <div style={{ padding: "20px" }} />,
  experience_card: () => <div style={{ padding: "20px" }} />,
};

// Suppress known component warnings in development
const SUPPRESSED_WARNINGS = [
  "doesn't exist",
];

export default function SafeStoryblokComponent({ blok }) {
  if (!blok) return null;

  useEffect(() => {
    // Suppress specific console warnings on client-side
    const originalWarn = console.warn;
    console.warn = (...args) => {
      const message = args[0]?.toString() || "";
      if (SUPPRESSED_WARNINGS.some(warning => message.includes(warning))) {
        return;
      }
      originalWarn(...args);
    };

    return () => {
      console.warn = originalWarn;
    };
  }, []);

  // Use fallback if component doesn't exist yet
  const Fallback = COMPONENT_FALLBACKS[blok.component];

  return (
    <Suspense fallback={Fallback ? <Fallback /> : <div />}>
      <StoryblokComponent blok={blok} />
    </Suspense>
  );
}
