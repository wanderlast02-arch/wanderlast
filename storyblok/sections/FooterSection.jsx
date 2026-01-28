"use client";

import { storyblokEditable } from "@storyblok/react";

export default function FooterSection({ blok }) {
  const text = blok.text || "© Wanderlast — Crafted for modern explorers.";

  return (
    <footer
      {...storyblokEditable(blok)}
      style={{
        padding: "48px 24px",
        background: "var(--primary-700, #0f172a)",
        color: "white",
        marginTop: "48px",
        textAlign: "center",
      }}
    >
      <p style={{ fontSize: "15px" }}>{text}</p>
    </footer>
  );
}
