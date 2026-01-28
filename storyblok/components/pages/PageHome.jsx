"use client";

import { storyblokEditable } from "@storyblok/react";
import ExperienceCard from "../../cards/ExperienceCard";

const HERO_CONTENT = {
  title: "Let's Start",
  titleHighlight: "YOUR JOURNEY!",
  subtitle: "Connect with local communities through authentic, sustainable experiences that matter",
  backgroundImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&h=800&fit=crop",
};

const WHY_CHOOSE_US = [
  {
    icon: "🌍",
    title: "Vetted Local Guides",
    description: "Hand-picked guides who know their destinations inside out and share authentic stories",
  },
  {
    icon: "♻️",
    title: "Sustainable Travel",
    description: "Support communities and protect nature with eco-conscious experiences",
  },
  {
    icon: "⭐",
    title: "Authentic Experiences",
    description: "Skip the tourist traps and discover real, hidden gems",
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
      filename: "https://picsum.photos/400/300?random=200",
    },
  },
];

const FEATURED_EXPERIENCES = [
  {
    title: "Mountain Lake Trek",
    location: "Thailand",
    image: "https://picsum.photos/300/300?random=201",
  },
  {
    title: "Urban Street Tour",
    location: "Vietnam",
    image: "https://picsum.photos/300/300?random=202",
  },
  {
    title: "Jungle Adventure",
    location: "Indonesia",
    image: "https://picsum.photos/300/300?random=203",
  },
  {
    title: "Sacred Temple",
    location: "Cambodia",
    image: "https://picsum.photos/300/300?random=204",
  },
];

const TOP_DESTINATIONS = [
  { name: "Thailand", image: "https://picsum.photos/300/300?random=205", link: "/thailand" },
  { name: "Vietnam", image: "https://picsum.photos/300/300?random=206", link: "/vietnam" },
  { name: "Indonesia", image: "https://picsum.photos/300/300?random=207", link: "/indonesia" },
  { name: "Cambodia", image: "https://picsum.photos/300/300?random=208", link: "/cambodia" },
  { name: "Laos", image: "https://picsum.photos/300/300?random=209", link: "/laos" },
];

const TOKYO_EXPERIENCES = [
  {
    title: "Shibuya Crossing & Street Food",
    location: "Tokyo, Japan",
    price: 47,
    image: "https://picsum.photos/400/300?random=210",
  },
  {
    title: "Traditional Sushi Making Class",
    location: "Tokyo, Japan",
    price: 95,
    image: "https://picsum.photos/400/300?random=211",
  },
  {
    title: "Mount Fuji Day Trip",
    location: "Tokyo, Japan",
    price: 58,
    image: "https://picsum.photos/400/300?random=212",
  },
];

const TRUSTED_ORGS = ["Hilton", "Airbnb", "Booking.com", "Chubb", "Trane", "Coterra"];

export default function PageHome({ blok }) {
  return (
    <div {...storyblokEditable(blok)}>
      {/* Hero Section */}
      <section style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.35)), url('${HERO_CONTENT.backgroundImage}')`,
        backgroundSize: "cover", backgroundPosition: "center", backgroundAttachment: "fixed",
        minHeight: "550px", display: "flex", alignItems: "center", justifyContent: "center",
        padding: "80px 24px", color: "white", textAlign: "center",
      }}>
        <div style={{ maxWidth: "700px" }}>
          <h1 style={{ fontSize: "56px", fontWeight: 300, letterSpacing: "1px", margin: "0 0 12px 0" }}>
            {HERO_CONTENT.title}
          </h1>
          <h2 style={{ fontSize: "56px", fontWeight: 700, letterSpacing: "2px", margin: "0 0 28px 0" }}>
            {HERO_CONTENT.titleHighlight}
          </h2>
          <p style={{ fontSize: "17px", opacity: 0.95, margin: "0 0 44px 0", letterSpacing: "0.5px", lineHeight: "1.6" }}>
            {HERO_CONTENT.subtitle}
          </p>
          <div style={{
            display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap",
            backdropFilter: "blur(10px)", backgroundColor: "rgba(255, 255, 255, 0.08)",
            padding: "16px", borderRadius: "12px", border: "1px solid rgba(255, 255, 255, 0.2)",
            width: "fit-content", margin: "0 auto",
          }}>
            <input type="text" placeholder="Search destination..." style={{
              padding: "14px 20px", borderRadius: "8px", border: "none",
              flex: "1 1 250px", minWidth: "200px", fontSize: "14px",
              backgroundColor: "rgba(255, 255, 255, 0.95)", transition: "all 0.3s",
            }}
            onFocus={(e) => (e.target.style.boxShadow = "0 0 8px rgba(45, 95, 79, 0.3)")}
            onBlur={(e) => (e.target.style.boxShadow = "none")} />
            <button style={{
              padding: "14px 32px", backgroundColor: "var(--primary)", color: "white",
              border: "none", borderRadius: "8px", fontWeight: 700, cursor: "pointer",
              fontSize: "14px", whiteSpace: "nowrap", transition: "all 0.3s",
              boxShadow: "0 4px 12px rgba(45, 95, 79, 0.3)",
            }}
            onMouseOver={(e) => {
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = "0 6px 16px rgba(45, 95, 79, 0.4)";
            }}
            onMouseOut={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 4px 12px rgba(45, 95, 79, 0.3)";
            }}>
              Search
            </button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section style={{ padding: "80px 24px", maxWidth: "1400px", margin: "0 auto" }}>
        <div style={{ marginBottom: "60px" }}>
          <h2 style={{ fontSize: "32px", fontWeight: 600, marginBottom: "12px" }}>Why clients choose Wanderlast</h2>
          <p style={{ fontSize: "14px", color: "var(--text-secondary)", maxWidth: "500px" }}>
            Real connections over tourism. Fair wages over exploitation. Small groups over crowds. Your values matter to us—and to the communities you visit.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "24px" }}>
          {WHY_CHOOSE_US.map((item, idx) => (
            <div key={idx} style={{
              padding: "32px 24px", backgroundColor: idx % 2 === 0 ? "#e8f5e9" : "#f0f4f8",
              borderRadius: "12px", display: "flex", flexDirection: "column", gap: "16px",
            }}>
              <div style={{
                fontSize: "48px", width: "60px", height: "60px", display: "flex",
                alignItems: "center", justifyContent: "center",
                backgroundColor: "rgba(45, 95, 79, 0.1)", borderRadius: "8px",
              }}>
                {item.icon}
              </div>
              <h3 style={{ fontSize: "16px", fontWeight: 600, margin: "0" }}>{item.title}</h3>
              <p style={{ fontSize: "14px", color: "var(--text-secondary)", margin: "0", lineHeight: "1.5" }}>
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Best Offers */}
      <section style={{ padding: "80px 24px", backgroundColor: "#f9fafb" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "48px" }}>
            <div>
              <h2 style={{ fontSize: "28px", fontWeight: 600, margin: "0 0 8px 0" }}>Best offers</h2>
              <p style={{ fontSize: "14px", color: "var(--text-secondary)", margin: "0" }}>Handpicked experiences at unbeatable prices</p>
            </div>
            <a href="/explore" style={{ color: "var(--primary)", fontWeight: 600, textDecoration: "none", fontSize: "14px" }}>
              View all offers →
            </a>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "24px" }}>
            {BEST_OFFERS.map((exp) => (
              <ExperienceCard key={exp._uid} blok={exp} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Experiences */}
      <section style={{ padding: "80px 24px", maxWidth: "1400px", margin: "0 auto" }}>
        <div style={{ marginBottom: "48px" }}>
          <h2 style={{ fontSize: "28px", fontWeight: 600, margin: "0 0 8px 0" }}>Featured Experiences</h2>
          <p style={{ fontSize: "14px", color: "var(--text-secondary)", margin: "0" }}>
            Handpicked moments with local hosts. Beyond the guidebook. Sustainable from start to finish.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "16px" }}>
          {FEATURED_EXPERIENCES.map((exp, idx) => (
            <div key={idx} style={{
              borderRadius: "12px", overflow: "hidden", cursor: "pointer",
              height: "260px", backgroundImage: `linear-gradient(rgba(0,0,0,0.25), rgba(0,0,0,0.25)), url('${exp.image}')`,
              backgroundSize: "cover", backgroundPosition: "center", display: "flex",
              alignItems: "flex-end", padding: "20px", color: "white",
              transition: "transform 0.3s, box-shadow 0.3s", boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "scale(1.04)";
              e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.2)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
            }}>
              <div>
                <h3 style={{ fontSize: "16px", fontWeight: 600, margin: "0 0 6px 0" }}>{exp.title}</h3>
                <p style={{ fontSize: "12px", opacity: 0.9, margin: "0" }}>{exp.location}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Travel that gives back */}
      <section style={{ padding: "80px 24px", maxWidth: "1400px", margin: "0 auto" }}>
        <div style={{ marginBottom: "60px" }}>
          <h2 style={{ fontSize: "28px", fontWeight: 600, margin: "0 0 16px 0" }}>Travel that gives back</h2>
          <p style={{ fontSize: "16px", color: "var(--text-secondary)", margin: "0", lineHeight: "1.6", maxWidth: "700px" }}>
            At Wanderlast, every journey supports local communities and protects the places you love. We're committed to authentic, sustainable travel where your money directly benefits the people and environments you visit.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px", alignItems: "start" }}>
          {/* Left column - Bullet list */}
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            {[
              {
                title: "Authenticity",
                description: "Real stories from real people who live in these places"
              },
              {
                title: "Sustainability",
                description: "Small groups and responsible practices protect natural and cultural heritage"
              },
              {
                title: "Human-centered",
                description: "Meaningful connections that change perspectives, not just check boxes"
              },
              {
                title: "Community Impact",
                description: "Fair wages ensure guides and locals thrive, not just survive"
              }
            ].map((item, idx) => (
              <div key={idx} style={{ display: "flex", gap: "16px" }}>
                <div
                  style={{
                    width: "24px",
                    height: "24px",
                    borderRadius: "50%",
                    backgroundColor: "var(--accent, #7BA68E)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontSize: "14px",
                    fontWeight: 700,
                    flexShrink: 0,
                    marginTop: "2px",
                  }}
                >
                  ✓
                </div>
                <div>
                  <h3 style={{ fontSize: "16px", fontWeight: 700, margin: "0 0 4px 0", color: "var(--text-primary)" }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: "14px", color: "var(--text-secondary)", margin: "0", lineHeight: "1.5" }}>
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Right column - Impact card */}
          <div
            style={{
              padding: "32px",
              backgroundColor: "white",
              borderRadius: "12px",
              border: "1px solid rgba(45, 95, 79, 0.1)",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.04)",
            }}
          >
            <div style={{ marginBottom: "24px" }}>
              <div style={{ fontSize: "48px", marginBottom: "12px" }}>💚</div>
              <h3 style={{ fontSize: "20px", fontWeight: 700, margin: "0 0 8px 0", color: "var(--primary)" }}>
                How Your Booking Helps
              </h3>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div style={{ borderLeft: "3px solid var(--accent)", paddingLeft: "16px" }}>
                <p style={{ fontSize: "12px", fontWeight: 600, color: "var(--accent)", margin: "0 0 4px 0", textTransform: "uppercase" }}>
                  70% Direct to Locals
                </p>
                <p style={{ fontSize: "14px", color: "var(--text-secondary)", margin: "0", lineHeight: "1.5" }}>
                  Your payment goes directly to guides and community partners
                </p>
              </div>

              <div style={{ borderLeft: "3px solid var(--accent)", paddingLeft: "16px" }}>
                <p style={{ fontSize: "12px", fontWeight: 600, color: "var(--accent)", margin: "0 0 4px 0", textTransform: "uppercase" }}>
                  5% Conservation Fund
                </p>
                <p style={{ fontSize: "14px", color: "var(--text-secondary)", margin: "0", lineHeight: "1.5" }}>
                  Supports environmental protection in destination areas
                </p>
              </div>

              <div style={{ borderLeft: "3px solid var(--accent)", paddingLeft: "16px" }}>
                <p style={{ fontSize: "12px", fontWeight: 600, color: "var(--accent)", margin: "0 0 4px 0", textTransform: "uppercase" }}>
                  Fair Wages Guaranteed
                </p>
                <p style={{ fontSize: "14px", color: "var(--text-secondary)", margin: "0", lineHeight: "1.5" }}>
                  Guides earn 3x more than industry average
                </p>
              </div>
            </div>

            <button
              style={{
                marginTop: "24px",
                width: "100%",
                padding: "12px 16px",
                backgroundColor: "var(--primary)",
                color: "white",
                border: "none",
                borderRadius: "8px",
                fontWeight: 600,
                fontSize: "14px",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = "var(--accent)";
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "0 6px 16px rgba(45, 95, 79, 0.3)";
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = "var(--primary)";
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "none";
              }}
            >
              Book an Experience
            </button>
          </div>
        </div>
      </section>

      {/* Trusted Organizations */}
      <section style={{
        padding: "80px 24px", backgroundColor: "#2D5F4F",
        backgroundImage: 'url("https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=400&fit=crop")',
        backgroundSize: "cover", backgroundPosition: "center", backgroundBlend: "multiply",
      }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <div style={{ marginBottom: "48px" }}>
            <h2 style={{ fontSize: "28px", fontWeight: 600, color: "white", margin: "0 0 8px 0" }}>Trusted Organizations & Press</h2>
            <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.8)", margin: "0", maxWidth: "400px" }}>
              Featured in and trusted by leading travel and lifestyle brands worldwide
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))", gap: "24px", alignItems: "center" }}>
            {TRUSTED_ORGS.map((org, idx) => (
              <div key={idx} style={{ padding: "20px", textAlign: "center", color: "white", fontSize: "14px", fontWeight: 500, opacity: 0.8 }}>
                {org}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sport/Ecotourism */}
      <section style={{ padding: "80px 24px", backgroundColor: "#f9fafb" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <div style={{ marginBottom: "48px" }}>
            <h2 style={{ fontSize: "28px", fontWeight: 600, margin: "0 0 8px 0" }}>Sport/Ecotourism</h2>
            <p style={{ fontSize: "14px", color: "var(--text-secondary)", margin: "0" }}>
              Adventure experiences that respect nature and support local communities
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "24px" }}>
            {BEST_OFFERS.map((exp) => (
              <ExperienceCard key={exp._uid} blok={exp} />
            ))}
          </div>
        </div>
      </section>

      {/* Top Destinations */}
      <section style={{ padding: "80px 24px", maxWidth: "1400px", margin: "0 auto" }}>
        <div style={{ marginBottom: "48px" }}>
          <h2 style={{ fontSize: "28px", fontWeight: 600, margin: "0 0 8px 0" }}>Top Destinations</h2>
          <p style={{ fontSize: "14px", color: "var(--text-secondary)", margin: "0" }}>
            Where travelers find meaning. Where communities thrive. Where change happens.
          </p>
        </div>
        <div style={{ display: "flex", gap: "20px", overflowX: "auto", paddingBottom: "12px" }}>
          {TOP_DESTINATIONS.map((dest) => (
            <a key={dest.name} href={dest.link} style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('${dest.image}')`,
              backgroundSize: "cover", backgroundPosition: "center", borderRadius: "50%",
              width: "200px", height: "200px", minWidth: "200px", display: "flex",
              alignItems: "center", justifyContent: "center", textDecoration: "none",
              color: "white", fontSize: "18px", fontWeight: 600,
              textShadow: "0 2px 8px rgba(0,0,0,0.3)", transition: "transform 0.3s",
            }}
            onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}>
              {dest.name}
            </a>
          ))}
        </div>
      </section>

      {/* Tokyo Experiences */}
      <section style={{ padding: "80px 24px", backgroundColor: "#f9fafb" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <div style={{ marginBottom: "48px" }}>
            <h2 style={{ fontSize: "28px", fontWeight: 600, margin: "0 0 8px 0" }}>The most popular things to do in Tokyo</h2>
            <p style={{ fontSize: "14px", color: "var(--text-secondary)", margin: "0" }}>
              Experience the best of Tokyo with our expertly curated experiences
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "24px" }}>
            {TOKYO_EXPERIENCES.map((exp, idx) => (
              <div key={idx} style={{
                borderRadius: "12px", overflow: "hidden", backgroundColor: "white",
                boxShadow: "0 4px 12px rgba(15, 23, 42, 0.08)", transition: "transform 0.3s, box-shadow 0.3s", cursor: "pointer",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 8px 20px rgba(15, 23, 42, 0.15)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(15, 23, 42, 0.08)";
              }}>
                <div style={{ width: "100%", height: "200px", backgroundImage: `url('${exp.image}')`, backgroundSize: "cover", backgroundPosition: "center" }} />
                <div style={{ padding: "20px" }}>
                  <h3 style={{ fontSize: "16px", fontWeight: 600, margin: "0 0 8px 0" }}>{exp.title}</h3>
                  <p style={{ fontSize: "12px", color: "var(--text-secondary)", margin: "0 0 12px 0" }}>{exp.location}</p>
                  <p style={{ fontSize: "16px", fontWeight: 700, color: "var(--primary)", margin: "0" }}>From €{exp.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Book Your Trip */}
      <section style={{ padding: "80px 24px", maxWidth: "1400px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", alignItems: "center" }}>
          <div>
            <h2 style={{ fontSize: "36px", fontWeight: 600, marginBottom: "32px" }}>Book your next Trip</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              {[
                { number: "1", title: "Search & Discover", desc: "Browse thousands of experiences curated by local experts" },
                { number: "2", title: "Select & Customize", desc: "Personalize your perfect itinerary with our smart recommendations" },
                { number: "3", title: "Book & Confirm", desc: "Secure your booking instantly with 24/7 customer support" },
              ].map((step, idx) => (
                <div key={idx} style={{ display: "flex", gap: "20px", alignItems: "flex-start" }}>
                  <div style={{
                    width: "48px", height: "48px", borderRadius: "50%", backgroundColor: "var(--primary)",
                    color: "white", display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "20px", fontWeight: 700, flexShrink: 0,
                  }}>
                    {step.number}
                  </div>
                  <div>
                    <h3 style={{ fontSize: "16px", fontWeight: 600, margin: "0 0 6px 0" }}>{step.title}</h3>
                    <p style={{ fontSize: "14px", color: "var(--text-secondary)", margin: "0", lineHeight: "1.5" }}>{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&h=600&fit=crop")',
            backgroundSize: "cover", backgroundPosition: "center", borderRadius: "16px",
            minHeight: "500px", boxShadow: "0 10px 30px rgba(45, 95, 79, 0.15)",
          }} />
        </div>
      </section>

      {/* Popular Places */}
      <section style={{ padding: "80px 24px", backgroundColor: "#f9fafb" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <div style={{ marginBottom: "48px" }}>
            <h2 style={{ fontSize: "28px", fontWeight: 600, margin: "0 0 8px 0" }}>Where travel becomes meaningful</h2>
            <p style={{ fontSize: "14px", color: "var(--text-secondary)", margin: "0", maxWidth: "600px" }}>
              Browse our complete collection of curated destinations and experiences across Southeast Asia
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))", gap: "16px" }}>
            {["Bangkok", "Phuket", "Chiang Mai", "Pattaya", "Krabi", "Hanoi", "Ho Chi Minh", "Da Nang", "Jakarta", "Bali", "Yogyakarta", "Phnom Penh", "Siem Reap"].map((place, idx) => (
              <a key={idx} href={`/${place.toLowerCase()}`} style={{
                padding: "16px 12px", backgroundColor: "white", border: "1px solid #e5e7eb",
                borderRadius: "8px", textDecoration: "none", color: "var(--text-primary)",
                fontSize: "14px", fontWeight: 500, textAlign: "center", transition: "all 0.3s",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = "var(--primary)";
                e.currentTarget.style.color = "white";
                e.currentTarget.style.borderColor = "var(--primary)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = "white";
                e.currentTarget.style.color = "var(--text-primary)";
                e.currentTarget.style.borderColor = "#e5e7eb";
              }}>
                {place}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section style={{ padding: "100px 24px", backgroundColor: "var(--primary)", color: "white", textAlign: "center" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "36px", fontWeight: 600, margin: "0 0 16px 0" }}>Ready to explore?</h2>
          <p style={{ fontSize: "18px", opacity: 0.95, margin: "0 0 40px 0", lineHeight: "1.6" }}>
            Ready to travel in a way that matters? Start your authentic journey today.
          </p>
          <button style={{
            padding: "16px 40px", backgroundColor: "white", color: "var(--primary)",
            border: "none", borderRadius: "8px", fontSize: "16px", fontWeight: 700,
            cursor: "pointer", transition: "all 0.3s ease",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          }}
          onMouseOver={(e) => {
            e.target.style.transform = "translateY(-2px)";
            e.target.style.boxShadow = "0 8px 20px rgba(0,0,0,0.25)";
          }}
          onMouseOut={(e) => {
            e.target.style.transform = "translateY(0)";
            e.target.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
          }}>
            Explore Destinations
          </button>
        </div>
      </section>
    </div>
  );
}
