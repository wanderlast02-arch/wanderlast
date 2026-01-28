"use client";

import { storyblokEditable, StoryblokComponent } from "@storyblok/react";

const GREECE_HERO = {
  backgroundImage: "https://picsum.photos/1200/400?random=100",
  title: "Greece",
  tagline: "Islands, History, and Mediterranean Magic",
};

const CITIES_IN_GREECE = [
  {
    _uid: "athens",
    component: "city_card",
    name: "Athens",
    image: {
      filename: "https://picsum.photos/300/300?random=101",
    },
  },
  {
    _uid: "santorini",
    component: "city_card",
    name: "Santorini",
    image: {
      filename: "https://picsum.photos/300/300?random=102",
    },
  },
  {
    _uid: "mykonos",
    component: "city_card",
    name: "Mykonos",
    image: {
      filename: "https://picsum.photos/300/300?random=103",
    },
  },
  {
    _uid: "crete",
    component: "city_card",
    name: "Crete",
    image: {
      filename: "https://picsum.photos/300/300?random=104",
    },
  },
  {
    _uid: "rhodes",
    component: "city_card",
    name: "Rhodes",
    image: {
      filename: "https://picsum.photos/300/300?random=105",
    },
  },
  {
    _uid: "delphi",
    component: "city_card",
    name: "Delphi",
    image: {
      filename: "https://picsum.photos/300/300?random=106",
    },
  },
];

const TRAVEL_TIPS = [
  {
    title: "Best Time to Visit",
    content: "April to June and September to October offer perfect weather with fewer crowds.",
  },
  {
    title: "Getting Around",
    content: "Ferry between islands, rent cars, or use buses. Island hopping is a must!",
  },
  {
    title: "Currency & Costs",
    content: "Euro is the currency. Budget for €30-50/day for meals and experiences.",
  },
  {
    title: "Food Culture",
    content: "Don't miss fresh Greek salad, moussaka, souvlaki, and local Greek wine.",
  },
];

const CULTURAL_TIPS = "Respect local traditions: Remove shoes when entering homes or churches, use your right hand when eating or greeting. Greeks value personal connections—learn basic greetings in Greek (Kalispéra for hello). Dress modestly when visiting religious sites. Always ask before photographing locals or sacred spaces. Tipping 5-10% is appreciated but not mandatory.";

const FILTER_OPTIONS = ["All", "Culture", "Beach", "History", "Adventure", "Nightlife"];

export default function PageGreece({ blok }) {
  const body = blok.body || [];
  const title = blok.title || GREECE_HERO.title;
  const description = blok.description || "Experience ancient history, stunning islands, and Mediterranean charm";
  const citiesData = blok.cities?.length > 0 ? blok.cities : CITIES_IN_GREECE;

  return (
    <article {...storyblokEditable(blok)}>
      {/* Hero Banner */}
      <section
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('${GREECE_HERO.backgroundImage}')`,
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
          <p style={{ fontSize: "18px", opacity: 0.9 }}>{GREECE_HERO.tagline}</p>
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
        <h2 style={{ fontSize: "var(--font-h2)", marginBottom: "24px" }}>Cities in Greece</h2>
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

        {/* Respect the Culture - Values-Driven Section */}
        <div
          style={{
            marginTop: "32px",
            padding: "24px",
            backgroundColor: "white",
            borderRadius: "12px",
            borderLeft: "4px solid var(--accent)",
            border: "1px solid var(--border)",
            borderLeftWidth: "4px",
          }}
        >
          <h3
            style={{
              fontSize: "var(--font-h4)",
              marginBottom: "12px",
              color: "var(--primary)",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            🤝 Respect the Culture
          </h3>
          <p
            style={{
              fontSize: "var(--font-body-m)",
              color: "var(--text-secondary)",
              lineHeight: "1.6",
            }}
          >
            {CULTURAL_TIPS}
          </p>
        </div>
      </section>

      {/* About Greece */}
      <section style={{ padding: "60px 24px", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px", alignItems: "center" }}>
          <div>
            <h2 style={{ fontSize: "var(--font-h2)", marginBottom: "16px" }}>About Greece</h2>
            <p style={{ fontSize: "var(--font-body-xl)", color: "var(--text-secondary)", marginBottom: "16px" }}>
              Greece isn't just a destination—it's a living culture. From mountain villages to island communities, real people shape these stories. Our guides are locals who live here, preserving traditions while welcoming respectful travelers.
            </p>
            <p style={{ fontSize: "var(--font-body-m)", color: "var(--text-secondary)" }}>
              When you travel with Wanderlast in Greece, your money goes directly to family-run guesthouses, traditional craftspeople, and guides who depend on tourists understanding their way of life. Small groups, authentic connections, sustainable impact.
            </p>
          </div>
          <div
            style={{
              backgroundImage: "url('https://picsum.photos/500/400?random=107')",
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
          {["Turkey", "Italy", "Croatia", "Portugal", "Spain"].map((country) => (
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
