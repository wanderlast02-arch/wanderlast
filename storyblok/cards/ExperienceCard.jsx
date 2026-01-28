"use client";

import { storyblokEditable } from "@storyblok/react";

export default function ExperienceCard({ blok }) {
  const title = blok.title || "Ancient Temple Tour";
  const location = blok.location || "Bangkok";
  const price = blok.price ? `${blok.price}` : "49";
  const duration = blok.duration || "3 hours";
  const image =
    blok.image?.filename ||
    "https://picsum.photos/400/300?random=1";
  
  // Wanderlast values
  const sustainabilityScore = blok.sustainability_score || 0;
  const communityImpact = blok.community_impact || null;
  const whyItMatters = blok.why_it_matters?.content?.[0]?.content?.[0]?.text || "";
  
  // Extract 1-2 line excerpt from why_it_matters (first ~100 chars)
  const excerpt = whyItMatters.substring(0, 100).trim() + (whyItMatters.length > 100 ? "..." : "");

  return (
    <article
      {...storyblokEditable(blok)}
      style={{
        borderRadius: "12px",
        overflow: "hidden",
        background: "white",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 4px 12px rgba(15, 23, 42, 0.08)",
        transition: "all 0.3s ease",
        cursor: "pointer",
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 16px 24px rgba(15, 23, 42, 0.15)";
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 4px 12px rgba(15, 23, 42, 0.08)";
      }}
    >
      {/* Image Section */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "240px",
          overflow: "hidden",
          backgroundColor: "#f3f4f6",
        }}
      >
        <img
          src={image}
          alt={title}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          onError={(e) => {
            e.target.src = "https://picsum.photos/400/300?random=fallback";
          }}
        />
        {/* Dark overlay with title and price */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0))",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "16px",
            color: "white",
          }}
        >
          <div></div>
          <div>
            <h3 style={{ fontSize: "16px", fontWeight: 600, margin: "0 0 8px 0" }}>
              {title}
            </h3>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <p style={{ fontSize: "12px", opacity: 0.9, margin: "0" }}>
                {location}
              </p>
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: 700,
                  backgroundColor: "#2D5F4F",
                  padding: "6px 12px",
                  borderRadius: "6px",
                }}
              >
                €{price}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "12px", flex: 1 }}>
        {/* Duration */}
        <p style={{ fontSize: "12px", color: "#4B5563", margin: "0" }}>
          ⏱️ {duration}
        </p>

        {/* Why It Matters Excerpt */}
        {excerpt && (
          <p style={{
            fontSize: "13px",
            color: "#4B5563",
            margin: "0",
            lineHeight: "1.4",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}>
            {excerpt}
          </p>
        )}

        {/* Badges Row */}
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "8px" }}>
          {/* Low-Impact Badge */}
          {sustainabilityScore >= 4 && (
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "4px 10px",
                borderRadius: "999px",
                backgroundColor: "rgba(123, 166, 142, 0.1)",
                color: "#2D5F4F",
                fontSize: "11px",
                fontWeight: 600,
              }}
            >
              🌱 Low-impact
            </span>
          )}

          {/* Community Powered Badge */}
          {communityImpact && (
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "4px 10px",
                borderRadius: "999px",
                backgroundColor: "rgba(45, 95, 79, 0.1)",
                color: "#2D5F4F",
                fontSize: "11px",
                fontWeight: 600,
              }}
            >
              👥 Community Powered
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
