"use client";

import { storyblokEditable, StoryblokComponent } from "@storyblok/react";

const HERO_CONTENT = {
  title: "Let's Start YOUR JOURNEY!",
  subtitle: "Discover authentic experiences in Southeast Asia",
  backgroundImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=600&fit=crop",
};

const WHY_CHOOSE_US = [
  {
    icon: "🌍",
    title: "Vetted Local Guides",
    description: "Hand-picked guides who know their destinations inside out",
  },
  {
    icon: "♻️",
    title: "Sustainable Travel",
    description: "Support communities and protect nature with eco-conscious experiences",
  },
  {
    icon: "⭐",
    title: "Authentic Experiences",
    description: "Skip the tourist traps and discover hidden gems",
  },
  {
    icon: "💰",
    title: "Best Prices",
    description: "Direct booking means more value for your money",
  },
];

const BEST_OFFERS = [
  {
    _uid: "offer-1",
    component: "experience_card",
    title: "Angkor Wat Sunrise Tour",
    location: "Cambodia",
    price: 59,
    duration: "4 hours",
    image: {
      filename: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
    },
  },
  {
    _uid: "offer-2",
    component: "experience_card",
    title: "Bali Temple & Rice Terraces",
    location: "Indonesia",
    price: 49,
    duration: "5 hours",
    image: {
      filename: "https://images.unsplash.com/photo-1537225228614-b4fad34a0b60?w=400&h=300&fit=crop",
    },
  },
  {
    _uid: "offer-3",
    component: "experience_card",
    title: "Halong Bay Cruise",
    location: "Vietnam",
    price: 82,
    duration: "8 hours",
    image: {
      filename: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
    },
  },
];

export default function PageHome({ blok }) {
  const body = blok.body || [];

  return (
    <div {...storyblokEditable(blok)}>
      {/* Hero Section */}
      <section
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('${HERO_CONTENT.backgroundImage}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          height: "500px",
          display: "flex",
          alignItems: "flex-end",
          padding: "60px 24px 40px",
          color: "white",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto", width: "100%" }}>
          <h1 style={{ fontSize: "var(--font-h1)", fontWeight: 700, marginBottom: "12px" }}>
            {HERO_CONTENT.title}
          </h1>
          <p style={{ fontSize: "var(--font-body-xl)", opacity: 0.9, marginBottom: "24px" }}>
            {HERO_CONTENT.subtitle}
          </p>
          <div style={{ display: "flex", gap: "12px" }}>
            <input
              type="text"
              placeholder="Search destination..."
              style={{
                padding: "12px 16px",
                borderRadius: "8px",
                border: "none",
                flex: 1,
                maxWidth: "300px",
                fontSize: "14px",
              }}
            />
            <button
              style={{
                padding: "12px 24px",
                backgroundColor: "var(--primary)",
                color: "white",
                border: "none",
                borderRadius: "8px",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Search
            </button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section style={{ padding: "80px 24px", maxWidth: "1200px", margin: "0 auto" }}>
        <h2 style={{ fontSize: "var(--font-h2)", marginBottom: "12px" }}>
          Why clients choose Wanderlast
        </h2>
        <p style={{ fontSize: "var(--font-body-xl)", color: "var(--text-secondary)", marginBottom: "48px" }}>
          Experience travel redefined with authentic guides and sustainable practices.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "32px",
          }}
        >
          {WHY_CHOOSE_US.map((item, idx) => (
            <div key={idx}>
              <div style={{ fontSize: "48px", marginBottom: "16px" }}>{item.icon}</div>
              <h3 style={{ fontSize: "var(--font-h4)", marginBottom: "8px" }}>{item.title}</h3>
              <p style={{ fontSize: "var(--font-body-m)", color: "var(--text-secondary)" }}>
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Best Offers */}
      <section style={{ padding: "60px 24px", backgroundColor: "var(--neutral-50)", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "48px" }}>
          <div>
            <h2 style={{ fontSize: "var(--font-h2)", marginBottom: "12px" }}>Best offers</h2>
            <p style={{ fontSize: "var(--font-body-m)", color: "var(--text-secondary)" }}>
              Handpicked experiences at unbeatable prices
            </p>
          </div>
          <a href="/explore" style={{ color: "var(--primary)", fontWeight: 600, textDecoration: "none" }}>
            View all offers →
          </a>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: "20px",
          }}
        >
          {BEST_OFFERS.map((exp) => (
            <StoryblokComponent key={exp._uid} blok={exp} />
          ))}
        </div>
      </section>

      {/* Dynamic Sections from Storyblok */}
      {body.map((nested) => (
        <StoryblokComponent blok={nested} key={nested._uid} />
      ))}

      {/* Top Destinations Preview */}
      <section style={{ padding: "60px 24px", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
          <h2 style={{ fontSize: "var(--font-h2)" }}>Discover most popular places to visit</h2>
          <a href="/explore" style={{ color: "var(--primary)", fontWeight: 600, textDecoration: "none" }}>
            View all
          </a>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
            gap: "16px",
          }}
        >
          {["Thailand", "Greece", "Vietnam", "Indonesia", "Cambodia"].map((destination) => (
            <a
              key={destination}
              href={`/${destination.toLowerCase()}`}
              style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=300&h=300&fit=crop')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: "12px",
                height: "200px",
                display: "flex",
                alignItems: "flex-end",
                padding: "16px",
                textDecoration: "none",
                color: "white",
                fontSize: "18px",
                fontWeight: 600,
                textShadow: "0 2px 8px rgba(0,0,0,0.3)",
              }}
            >
              {destination}
            </a>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section
        style={{
          padding: "60px 24px",
          backgroundColor: "var(--primary)",
          color: "white",
          textAlign: "center",
          maxWidth: "1200px",
          margin: "80px auto 0",
          borderRadius: "12px",
        }}
      >
        <h2 style={{ fontSize: "var(--font-h2)", marginBottom: "16px" }}>
          Ready to explore?
        </h2>
        <p style={{ fontSize: "var(--font-body-xl)", opacity: 0.9, marginBottom: "32px" }}>
          Start discovering unique experiences today
        </p>
        <button
          style={{
            padding: "14px 32px",
            backgroundColor: "white",
            color: "var(--primary)",
            border: "none",
            borderRadius: "8px",
            fontSize: "16px",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Explore Destinations
        </button>
      </section>
    </div>
  );
}
