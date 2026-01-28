"use client";

import { storyblokEditable, StoryblokComponent } from "@storyblok/react";
import SearchBar from "../components/SearchBar";

export default function SearchBarSection({ blok }) {
  const nested = blok.search_bar?.[0];

  return (
    <section
      {...storyblokEditable(blok)}
      style={{
        padding: "32px 20px",
        background: "var(--surface, #f9fafb)",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div style={{ width: "100%", maxWidth: "920px" }}>
        {nested ? (
          <StoryblokComponent blok={nested} />
        ) : (
          <SearchBar blok={blok} />
        )}
      </div>
    </section>
  );
}
