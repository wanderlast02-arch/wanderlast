"use client";

import { storyblokEditable } from "@storyblok/react";

export default function MapEmbed({ blok }) {
  const mapUrl =
    blok.map_url ||
    "https://www.openstreetmap.org/export/embed.html?bbox=100.5018%2C13.7563%2C100.6018%2C13.8563&layer=mapnik";

  return (
    <div
      {...storyblokEditable(blok)}
      style={{ borderRadius: "12px", overflow: "hidden", marginTop: "20px" }}
    >
      <iframe
        src={mapUrl}
        width="100%"
        height="300"
        style={{ border: "0" }}
        loading="lazy"
        title="Map location"
      ></iframe>
    </div>
  );
}
