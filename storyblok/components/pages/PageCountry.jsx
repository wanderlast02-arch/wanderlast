"use client";

import { storyblokEditable, StoryblokComponent } from "@storyblok/react";

const THAILAND_HERO = {
  backgroundImage: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&h=400&fit=crop",
  title: "Thailand",
  tagline: "Land of Smiles, Experiences, and Adventures",
};

const CITIES_IN_THAILAND = [
  {
    _uid: "bangkok",
    component: "city_card",
    name: "Bangkok",
    image: {
      filename: "https://images.unsplash.com/photo-1533900298318-6b8da08a523e?w=300&h=300&fit=crop",
    },
  },
  {
    _uid: "chiangmai",
    component: "city_card",
    name: "Chiang Mai",
    image: {
      filename: "https://images.unsplash.com/photo-1552520514-5fefe8c9ef14?w=300&h=300&fit=crop",
    },
  },
  {
    _uid: "phuket",
    component: "city_card",
    name: "Phuket",
    image: {
      filename: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=300&h=300&fit=crop",
    },
  },
  {
    _uid: "krabi",
    component: "city_card",
    name: "Krabi",
    image: {
      filename: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=300&h=300&fit=crop",
    },
  },
  {
    _uid: "kohsamui",
    component: "city_card",
    name: "Koh Samui",
    image: {
      filename: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=300&h=300&fit=crop",
    },
  },
  {
    _uid: "chiangrai",
    component: "city_card",
    name: "Chiang Rai",
    image: {
      filename: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop",
    },
  },
];

const TRAVEL_TIPS = [
  {
    title: "Best Time to Visit",
    content: "November to February offers the best weather with temperatures between 20-32°C.",
  },
  {
    title: "Getting Around",
    content: "Use trains, buses, and domestic flights to explore. Taxis and tuk-tuks are affordable.",
  },
  {
    title: "Currency & Costs",
    content: "Thai Baht is the currency. Budget experiences cost $10-25 per day.",
  },
  {
    title: "Food Culture",
    content: "Don't miss street food, curry, and pad thai. Always say 'kop khun ka/krap' (thank you).",
  },
];

const FILTER_OPTIONS = ["All", "Adventure", "Cultural", "Relaxation", "Food & Dining", "Nature"];

export default function PageCountry({ blok }) {
  const body = blok.body || [];
  const title = blok.title || THAILAND_HERO.title;
  const description = blok.description || "Discover authentic experiences, hidden gems, and unforgettable moments across Thailand";
  const citiesData = blok.cities?.length > 0 ? blok.cities : CITIES_IN_THAILAND;

  return (
    <article {...storyblokEditable(blok)}>
      {/* Hero Banner */}
      <section
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('${THAILAND_HERO.backgroundImage}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "350px",
          display: "flex",
          alignItems: "flex-end",
          padding: "48px 24px",
          color: "white",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto", width: "100%" }}>
          <p style={{ fontSize: "14px", opacity: 0.8, marginBottom: "8px" }}>Wanderlast › Destinations</p>
          <h1 style={{ fontSize: "48px", fontWeight: 700, marginBottom: "8px" }}>{title}</h1>
          <p style={{ fontSize: "18px", opacity: 0.9 }}>{THAILAND_HERO.tagline}</p>
        </div>
      </section>

      {/* Filter Bar */}
      <section style={{ padding: "24px", borderBottom: "1px solid var(--border)", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          {FILTER_OPTIONS.map((filter) => (
            <button
              key={filter}
              style={{
                padding: "8px 16px",
                border: "1px solid var(--border)",
                borderRadius: "20px",
                backgroundColor: filter === "All" ? "var(--primary)" : "transparent",
                color: filter === "All" ? "white" : "var(--text-primary)",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: 500,
              }}
            >
              {filter}
            </button>
          ))}
        </div>
      </section>

      {/* Cities Section */}
      <section style={{ padding: "48px 24px", maxWidth: "1200px", margin: "0 auto" }}>
        <h2 style={{ fontSize: "var(--font-h2)", marginBottom: "24px" }}>Cities in Thailand</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
            gap: "20px",
          }}
        >
          {citiesData.map((city) => (
            <StoryblokComponent key={city._uid} blok={city} />
          ))}
        </div>
      </section>

      {/* Dynamic Sections from Storyblok */}
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {body.map((nested) => (
          <StoryblokComponent blok={nested} key={nested._uid} />
        ))}
      </div>

      {/* Travel Tips */}
      <section style={{ padding: "48px 24px", backgroundColor: "var(--neutral-50)", maxWidth: "1200px", margin: "0 auto" }}>
        <h2 style={{ fontSize: "var(--font-h2)", marginBottom: "24px" }}>Travel Tips</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "24px",
          }}
        >
          {TRAVEL_TIPS.map((tip, idx) => (
            <div
              key={idx}
              style={{
                padding: "20px",
                backgroundColor: "white",
                borderRadius: "12px",
                border: "1px solid var(--border)",
              }}
            >
              <h3 style={{ fontSize: "var(--font-h4)", marginBottom: "8px" }}>{tip.title}</h3>
              <p style={{ fontSize: "var(--font-body-m)", color: "var(--text-secondary)" }}>{tip.content}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About Thailand */}
      <section style={{ padding: "60px 24px", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px", alignItems: "center" }}>
          <div>
            <h2 style={{ fontSize: "var(--font-h2)", marginBottom: "16px" }}>About Thailand</h2>
            <p style={{ fontSize: "var(--font-body-xl)", color: "var(--text-secondary)", marginBottom: "16px" }}>
              Thailand is Southeast Asia's beating heart. From the bustling energy of Bangkok to the serene temples of Chiang Mai, golden beaches of Phuket, and limestone cliffs of Krabi, Thailand offers unforgettable experiences for every traveler.
            </p>
            <p style={{ fontSize: "var(--font-body-m)", color: "var(--text-secondary)" }}>
              With warm hospitality, world-class cuisine, and affordable luxury, Thailand remains one of the most visited countries in Asia. Experience authentic culture, thrilling adventures, and peaceful retreats all in one destination.
            </p>
          </div>
          <div
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=400&fit=crop')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: "12px",
              height: "400px",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
            }}
          />
        </div>
      </section>

      {/* Nearby Destinations */}
      <section style={{ padding: "48px 24px", backgroundColor: "var(--neutral-50)", maxWidth: "1200px", margin: "0 auto" }}>
        <h2 style={{ fontSize: "var(--font-h2)", marginBottom: "24px" }}>Nearby Destinations</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
            gap: "20px",
          }}
        >
          {["Cambodia", "Laos", "Vietnam", "Myanmar", "Malaysia"].map((country) => (
            <div
              key={country}
              style={{
                padding: "24px",
                backgroundColor: "white",
                borderRadius: "12px",
                textAlign: "center",
                cursor: "pointer",
                border: "1px solid var(--border)",
                transition: "transform 0.2s",
              }}
            >
              <p style={{ fontSize: "var(--font-h4)", fontWeight: 600 }}>{country}</p>
            </div>
          ))}
        </div>
      </section>
    </article>
  );
}
