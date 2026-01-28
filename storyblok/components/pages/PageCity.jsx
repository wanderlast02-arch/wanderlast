"use client";

import { storyblokEditable, StoryblokComponent } from "@storyblok/react";
import { renderRichText } from "../../utils/richtext";

export default function PageCity({ blok }) {
  const body = blok.body || [];
  const title = blok.title || "Explore Charming Cities";
  const description =
    blok.description ||
    renderRichText({
      content: [
        {
          type: "paragraph",
          content: [
            {
              text: "Discover vibrant streets, hidden cafes, and cultural gems curated by Wanderlast.",
              type: "text",
            },
          ],
        },
      ],
    });

  return (
    <article {...storyblokEditable(blok)} style={{ padding: "48px 24px" }}>
      <h1 style={{ fontSize: "32px", marginBottom: "12px" }}>{title}</h1>
      <div style={{ color: "#4b5563", marginBottom: "24px" }}>{description}</div>
      {body.map((nested) => (
        <StoryblokComponent blok={nested} key={nested._uid} />
      ))}
    </article>
  );
}
