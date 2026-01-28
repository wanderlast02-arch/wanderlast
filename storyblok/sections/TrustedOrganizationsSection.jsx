"use client";

import { storyblokEditable } from "@storyblok/react";

const DUMMY_LOGOS = [
  {
    _uid: "logo-1",
    filename: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/272px-Google_2015_logo.svg.png",
  },
  {
    _uid: "logo-2",
    filename: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/320px-Amazon_logo.svg.png",
  },
  {
    _uid: "logo-3",
    filename: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Airbnb_logo.svg/360px-Airbnb_logo.svg.png",
  },
  {
    _uid: "logo-4",
    filename: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Tripadvisor_logo.svg/320px-Tripadvisor_logo.svg.png",
  },
];

export default function TrustedOrganizationsSection({ blok }) {
  const title = blok.title || "Trusted by international organizations";
  const logos = blok.logos?.length > 0 ? blok.logos : DUMMY_LOGOS;

  return (
    <section
      {...storyblokEditable(blok)}
      style={{ padding: "40px 24px", maxWidth: "1200px", margin: "0 auto" }}
    >
      <h2
        style={{
          fontSize: "28px",
          marginBottom: "24px",
        }}
      >
        {title}
      </h2>

      <div
        style={{
          display: "flex",
          gap: "40px",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {logos.map((logo, idx) => (
          <img
            key={logo._uid || idx}
            src={logo.filename || logo.url}
            alt="Organization"
            style={{ height: "50px", opacity: 0.8, objectFit: "contain" }}
          />
        ))}
      </div>
    </section>
  );
}
