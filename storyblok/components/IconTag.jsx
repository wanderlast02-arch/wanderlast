"use client";

import { storyblokEditable } from "@storyblok/react";

export default function IconTag({ blok }) {
  const label = blok.label || "Guided tour";
  const icon = blok.icon?.filename;

  return (
    <div
      {...storyblokEditable(blok)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        padding: "6px 12px",
        borderRadius: "12px",
        background: "var(--neutral-100, #f3f4f6)",
      }}
    >
      {icon && (
        <img
          src={icon}
          alt=""
          style={{ width: "20px", height: "20px", objectFit: "contain" }}
        />
      )}
      <span style={{ fontSize: "14px" }}>{label}</span>
    </div>
  );
}
