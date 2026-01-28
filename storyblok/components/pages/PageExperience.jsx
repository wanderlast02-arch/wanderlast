"use client";

import { storyblokEditable, StoryblokComponent } from "@storyblok/react";
import { renderRichText } from "../../utils/richtext";

export default function PageExperience({ blok }) {
  const body = blok.body || [];
  const title = blok.title || "Ancient Temple Tour";
  const subtitle = blok.subtitle || "Bangkok • 3 hours • Small-group tour";
  const description =
    blok.description_long ||
    renderRichText({
      content: [
        {
          type: "paragraph",
          content: [
            {
              text: "Hand-picked experiences selected by Wanderlast. Meet your local guide and uncover hidden gems.",
              type: "text",
            },
          ],
        },
      ],
    });

  return (
    <article {...storyblokEditable(blok)} style={{ padding: "48px 24px" }}>
      <h1 style={{ fontSize: "34px", marginBottom: "8px" }}>{title}</h1>
      <p style={{ color: "#6b7280", marginBottom: "16px" }}>{subtitle}</p>
      <div style={{ color: "#4b5563", marginBottom: "24px" }}>{description}</div>
      {body.map((nested) => (
        <StoryblokComponent blok={nested} key={nested._uid} />
      ))}
    </article>
  );
}
