"use client";

import Image from "next/image";
import { storyblokEditable } from "@storyblok/react";

// Simple data sources to mirror the reference layout
const CATEGORY_CHIPS = [
  "Tours",
  "Attractions & tickets",
  "Hop-on hop-off",
  "Flights",
  "Food & drink",
  "Car rentals",
  "Hotels",
];

const CITY_CHIPS = [
  { name: "Ko Chang", image: "https://picsum.photos/320/320?random=1" },
  { name: "Hat Yai", image: "https://picsum.photos/320/320?random=2" },
  { name: "Satun", image: "https://picsum.photos/320/320?random=3" },
  { name: "Pak Chang", image: "https://picsum.photos/320/320?random=4" },
  { name: "Chumphon", image: "https://picsum.photos/320/320?random=5" },
  { name: "Mae Hong Son", image: "https://picsum.photos/320/320?random=6" },
];

const EXPERIENCES = {
  Bangkok: [
    {
      title: "Bangkok: Grand Pearl Dinner Cruise on the Chao Phraya River",
      price: 44,
      duration: "2 hours",
      rating: 4.5,
      reviews: 418,
      image: "https://picsum.photos/480/320?random=10",
    },
    {
      title: "Bangkok: Chao Phraya River Cruise",
      price: 12,
      duration: "1.5 hours",
      rating: 4.4,
      reviews: 242,
      image: "https://picsum.photos/480/320?random=11",
    },
    {
      title: "Bangkok to Ayutthaya Van Tour",
      price: 37,
      duration: "8 hours",
      rating: 4.5,
      reviews: 58,
      image: "https://picsum.photos/480/320?random=12",
    },
  ],
  Phuket: [
    {
      title: "Phi Phi, Maya Bay, Bamboo Island Tour",
      price: 53,
      duration: "8 hours",
      rating: 4.7,
      reviews: 106,
      image: "https://picsum.photos/480/320?random=13",
    },
    {
      title: "Phuket: James Bond & Hong Island Tour",
      price: 52,
      duration: "8 hours",
      rating: 4.7,
      reviews: 49,
      image: "https://picsum.photos/480/320?random=14",
    },
    {
      title: "Phuket: 7 Islands Sunset Tour",
      price: 49,
      duration: "7 hours",
      rating: 4.7,
      reviews: 36,
      image: "https://picsum.photos/480/320?random=15",
    },
  ],
};

const LISTING_RESULTS = [
  "Bangkok",
  "Pattaya",
  "Phuket",
  "Chiang Mai",
  "Krabi",
  "Kanchanaburi",
  "Ayutthaya",
  "Ko Samui",
];

const LISTING_ITEMS = Array.from({ length: 12 }).map((_, idx) => ({
  title: `Bangkok Skywalk Ticket ${idx + 1}`,
  price: idx % 3 === 0 ? 26 : idx % 3 === 1 ? 15 : 22,
  rating: 4.6,
  reviews: 200 + idx * 3,
  duration: "2 hours",
  image: `https://picsum.photos/480/320?random=${30 + idx}`,
}));

const NEARBY_DESTINATIONS = [
  { name: "Cambodia", image: "https://picsum.photos/300/300?random=20" },
  { name: "Vietnam", image: "https://picsum.photos/300/300?random=21" },
  { name: "Australia", image: "https://picsum.photos/300/300?random=22" },
  { name: "Croatia", image: "https://picsum.photos/300/300?random=23" },
  { name: "US", image: "https://picsum.photos/300/300?random=24" },
];

const POPULAR_TAGS = [
  "Bangkok",
  "Chiang Mai",
  "Phuket",
  "Koh Samui",
  "Ayutthaya",
  "Krabi",
  "Pattaya",
  "Railay Beach",
  "Khao Sok",
  "Koh Tao",
  "Kanchanaburi",
  "Sukhothai",
];

const CULTURAL_TIPS = "Respect the monarchy: Images of the Royal family are sacred—never disrespect them. Dress respectfully when visiting temples: cover shoulders and knees. The Buddha is revered; never touch it or step over Buddha images. Greet with a 'wai' (palms together). Remove shoes when entering homes or sacred spaces. Don't point your feet at people or religious objects. Keep right-hand etiquette for eating. Haggling is expected in markets but with respect and a smile.";

function Pill({ text, active = false }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "8px 14px",
        borderRadius: "999px",
        border: active ? "1px solid var(--primary)" : "1px solid var(--border)",
        background: active ? "rgba(45,95,79,0.08)" : "white",
        color: "var(--text-primary)",
        fontSize: "12px",
        fontWeight: 600,
        marginRight: "8px",
        marginBottom: "8px",
        cursor: "pointer",
      }}
    >
      {text}
    </span>
  );
}

function ExperienceCard({ item }) {
  return (
    <div
      style={{
        border: "1px solid var(--border)",
        borderRadius: "12px",
        overflow: "hidden",
        background: "white",
        boxShadow: "var(--shadow-sm, 0 1px 2px rgba(0,0,0,0.05))",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          backgroundImage: `url('${item.image}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "170px",
        }}
      />
      <div style={{ padding: "12px", display: "flex", flexDirection: "column", gap: "6px" }}>
        <div style={{ fontSize: "12px", color: "var(--primary)", fontWeight: 600 }}>Top • Cultural • Experiences</div>
        <div style={{ fontSize: "14px", fontWeight: 700, color: "var(--text-primary)", lineHeight: 1.3 }}>{item.title}</div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "4px" }}>
          <div style={{ fontSize: "14px", fontWeight: 700 }}>${item.price}</div>
          <div style={{ fontSize: "12px", color: "var(--text-secondary)" }}>⭐ {item.rating} ({item.reviews})</div>
        </div>
      </div>
    </div>
  );
}

function ListingCard({ item }) {
  return (
    <div
      style={{
        border: "1px solid var(--border)",
        borderRadius: "12px",
        overflow: "hidden",
        background: "white",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          backgroundImage: `url('${item.image}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "140px",
        }}
      />
      <div style={{ padding: "10px", display: "flex", flexDirection: "column", gap: "6px" }}>
        <div style={{ display: "flex", gap: "6px", fontSize: "11px", color: "var(--primary)", fontWeight: 700 }}>
          <span>Top</span>
          <span style={{ color: "var(--text-secondary)" }}>• Attractions & tickets</span>
        </div>
        <div style={{ fontSize: "13px", fontWeight: 700, color: "var(--text-primary)", lineHeight: 1.4 }}>{item.title}</div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "var(--text-secondary)" }}>
          <span>⭐ {item.rating} ({item.reviews})</span>
          <span>${item.price}</span>
        </div>
      </div>
    </div>
  );
}

export default function PageThailand({ blok }) {
  return (
    <article {...storyblokEditable(blok)}>
      {/* Hero */}
      <section
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.25), rgba(0,0,0,0.25)), url('/images/destinations/thailand-temple.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "400px",
          display: "flex",
          alignItems: "flex-end",
          padding: "32px 24px",
          color: "white",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto", width: "100%" }}>
          <h1 style={{ fontSize: "40px", fontWeight: 700 }}>Thailand</h1>
        </div>
      </section>

      {/* Breadcrumbs */}
      <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "12px 24px", fontSize: "12px", color: "var(--text-secondary)" }}>
        Home › Thailand
      </section>

      {/* Category chips */}
      <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "8px 24px", display: "flex", flexWrap: "wrap", gap: "8px" }}>
        {CATEGORY_CHIPS.map((cat, idx) => (
          <Pill key={cat} text={cat} active={idx === 0} />
        ))}
      </section>

      {/* City chips */}
      <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "16px 24px" }}>
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", alignItems: "center" }}>
          {CITY_CHIPS.map((city) => (
            <div key={city.name} style={{ textAlign: "center" }}>
              <div
                style={{
                  width: "96px",
                  height: "96px",
                  borderRadius: "50%",
                  backgroundImage: `url('${city.image}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  border: "2px solid white",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.12)",
                  margin: "0 auto 8px",
                }}
              />
              <div style={{ fontSize: "12px", fontWeight: 600 }}>{city.name}</div>
            </div>
          ))}
          <a href="#" style={{ marginLeft: "auto", fontSize: "12px", color: "var(--primary)", textDecoration: "none" }}>View all offers</a>
        </div>
      </section>

      {/* Top experiences by city */}
      <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "8px 24px 32px" }}>
        <h2 style={{ fontSize: "18px", fontWeight: 700, margin: "12px 0" }}>Top experiences by city</h2>
        {Object.entries(EXPERIENCES).map(([city, items]) => (
          <div key={city} style={{ marginBottom: "28px" }}>
            <div style={{ fontSize: "16px", fontWeight: 700, marginBottom: "12px", color: "var(--text-primary)" }}>{city}</div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                gap: "16px",
              }}
            >
              {items.map((item, idx) => (
                <ExperienceCard key={`${city}-${idx}`} item={item} />
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* All things to do */}
      <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "8px 24px 32px" }}>
        <h2 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "12px" }}>All things to do in Thailand</h2>
        <div style={{ display: "grid", gridTemplateColumns: "240px 1fr", gap: "16px" }}>
          <div
            style={{
              border: "1px solid var(--border)",
              borderRadius: "12px",
              padding: "12px",
              background: "white",
              maxHeight: "520px",
              overflow: "hidden",
            }}
          >
            <div style={{ fontSize: "13px", fontWeight: 700, marginBottom: "8px" }}>Destinations</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "4px", fontSize: "12px", color: "var(--text-primary)" }}>
              {LISTING_RESULTS.map((name) => (
                <div key={name} style={{ padding: "6px 0", borderBottom: "1px solid var(--border)" }}>
                  {name}
                </div>
              ))}
            </div>
            <div style={{ marginTop: "12px", fontSize: "13px", fontWeight: 700 }}>Categories</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "4px", fontSize: "12px", color: "var(--text-primary)" }}>
              {CATEGORY_CHIPS.map((cat) => (
                <div key={cat} style={{ padding: "6px 0", borderBottom: "1px solid var(--border)" }}>
                  {cat}
                </div>
              ))}
            </div>
          </div>

          <div>
            <div style={{ display: "flex", gap: "8px", alignItems: "center", fontSize: "12px", marginBottom: "8px" }}>
              <Pill text="Availability" />
              <Pill text="Price range" />
              <Pill text="Select an experience" />
              <Pill text="Sort by" />
              <Pill text="Recommended" />
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                gap: "12px",
              }}
            >
              {LISTING_ITEMS.map((item, idx) => (
                <ListingCard key={idx} item={item} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Travel tips / About */}
      <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "16px 24px 32px" }}>
        <h2 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "12px" }}>Travel tips</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: "20px", alignItems: "start" }}>
          <div>
            <h3 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "8px" }}>About Thailand</h3>
            <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
              Thailand's warmth comes from its people, not just its beaches. Every experience you book with us directly supports local guides, artisans, and communities who trust us with their stories. Small groups. Real connections. Fair wages that sustain families and traditions.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "8px", marginTop: "12px" }}>
              <div style={{ fontSize: "12px", color: "var(--text-secondary)" }}>USD ≈ 32.41 THB (mid-bank)</div>
              <div style={{ fontSize: "12px", color: "var(--text-secondary)" }}>Language(s): Thai, English widely understood</div>
              <div style={{ fontSize: "12px", color: "var(--text-secondary)" }}>Airports: BKK Suvarnabhumi, DMK Don Mueang</div>
              <div style={{ fontSize: "12px", color: "var(--text-secondary)" }}>Visa: Most tourists receive visa on arrival</div>
            </div>

            {/* Respect the Culture - Values-Driven Section */}
            <div
              style={{
                marginTop: "20px",
                padding: "16px",
                backgroundColor: "rgba(123, 166, 142, 0.05)",
                borderRadius: "8px",
                borderLeft: "4px solid var(--accent)",
              }}
            >
              <h4
                style={{
                  fontSize: "14px",
                  fontWeight: 700,
                  marginBottom: "8px",
                  color: "var(--primary)",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                🤝 Respect the Culture
              </h4>
              <p
                style={{
                  fontSize: "12px",
                  color: "var(--text-secondary)",
                  lineHeight: "1.5",
                }}
              >
                {CULTURAL_TIPS}
              </p>
            </div>
          </div>
          <div
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1505761671935-60b3a7427bad?w=600&h=360&fit=crop')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: "12px",
              height: "260px",
              border: "1px solid var(--border)",
            }}
          />
        </div>
      </section>

      {/* Nearby destinations */}
      <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "16px 24px 32px" }}>
        <h2 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "12px" }}>Nearby destinations</h2>
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", alignItems: "center" }}>
          {NEARBY_DESTINATIONS.map((dest) => (
            <div key={dest.name} style={{ textAlign: "center" }}>
              <div
                style={{
                  width: "110px",
                  height: "110px",
                  borderRadius: "50%",
                  backgroundImage: `url('${dest.image}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  border: "2px solid white",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.12)",
                  margin: "0 auto 8px",
                }}
              />
              <div style={{ fontSize: "12px", fontWeight: 600 }}>{dest.name}</div>
            </div>
          ))}
          <a href="#" style={{ marginLeft: "auto", fontSize: "12px", color: "var(--primary)", textDecoration: "none" }}>View all offers</a>
        </div>
      </section>

      {/* Popular places tag cloud */}
      <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "16px 24px 48px" }}>
        <h2 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "12px" }}>
          Discover most popular places to visit in Thailand
        </h2>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          <Pill text="Top experiences" active />
          <Pill text="Top destinations" />
        </div>
        <div style={{ marginTop: "12px", display: "flex", flexWrap: "wrap" }}>
          {POPULAR_TAGS.map((tag) => (
            <Pill key={tag} text={tag} />
          ))}
        </div>
      </section>
    </article>
  );
}
