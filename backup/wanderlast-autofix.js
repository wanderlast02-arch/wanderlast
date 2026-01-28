require("dotenv").config({ path: ".env.local" });
const fs = require("fs");
const path = require("path");
const axios = require("axios");

// =============================
// CONFIG
// =============================
const TOKEN = process.env.STORYBLOK_API_TOKEN;
const SPACE = process.env.STORYBLOK_SPACE_ID;
if (!TOKEN) {
  console.error("❌ Missing STORYBLOK_API_TOKEN in .env.local");
  process.exit(1);
}

// Folders
const SECTIONS = "storyblok/sections";
const COMPONENTS = "storyblok/components";
const CARDS = "storyblok/cards";
const REGISTRY = "storyblok/components.js";

// Tailwind color palette (from your Figma files)
const ui = {
  primary: "#1A73E8",
  secondary: "#F5F7FA",
  textPrimary: "#1A1A1A",
  textSecondary: "#6B7280",
  cardBg: "#FFFFFF",
};

// Ensure folders exist
[SECTIONS, COMPONENTS, CARDS].forEach((dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// =============================
// 1. VALIDATE STORYBLOK API
// =============================
async function verifySB() {
  console.log("🔎 Checking Storyblok API…");

  try {
    await axios.get("https://api.storyblok.com/v2/cdn/spaces/me", {
      params: { token: TOKEN },
    });

    console.log("✔ Storyblok API OK");
  } catch {
    console.error("❌ Invalid Storyblok token");
    process.exit(1);
  }
}

// =============================
// UI COMPONENT TEMPLATES
// =============================

// ---------- Experience Card ----------
function experienceCardTemplate() {
  return `
"use client";
import Image from "next/image";
import { storyblokEditable } from "@storyblok/react";

export default function ExperienceCard({ blok }) {
  const title = blok.title || "Ancient Temple Sunrise Tour";
  const location = blok.location || "Bangkok, Thailand";
  const price = blok.price || 49;
  const duration = blok.duration || "3 hours";
  const image = blok.image?.filename || "https://source.unsplash.com/random/400x300/?thailand,temple";

  return (
    <div {...storyblokEditable(blok)} class="bg-white shadow rounded-xl overflow-hidden hover:scale-[1.02] transition">
      <div class="relative w-full h-48">
        <Image src={image} alt={title} fill class="object-cover" />
      </div>
      <div class="p-4">
        <h3 class="text-lg font-semibold text-gray-900">{title}</h3>
        <p class="text-sm text-gray-600">{location}</p>

        <div class="flex justify-between items-center mt-3">
          <span class="text-blue-600 font-semibold">€{price}</span>
          <span class="text-sm text-gray-500">{duration}</span>
        </div>
      </div>
    </div>
  );
}
`;
}

// ---------- Destination Card ----------
function destinationCardTemplate() {
  return `
"use client";
import Image from "next/image";
import { storyblokEditable } from "@storyblok/react";

export default function DestinationCard({ blok }) {
  const name = blok.name || "Phuket";
  const image = blok.image?.filename || "https://source.unsplash.com/random/400x300/?beach,thailand";

  return (
    <div {...storyblokEditable(blok)} class="rounded-xl overflow-hidden shadow hover:shadow-lg transition bg-white">
      <div class="relative w-full h-48">
        <Image src={image} alt={name} fill class="object-cover" />
      </div>
      <div class="p-4">
        <h3 class="text-lg font-semibold">{name}</h3>
      </div>
    </div>
  );
}
`;
}

// ---------- Hero Banner ----------
function heroBannerTemplate() {
  return `
"use client";
import Image from "next/image";
import { storyblokEditable } from "@storyblok/react";

export default function HeroBanner({ blok }) {
  const title = blok.title || "Discover Thailand";
  const subtitle = blok.subtitle || "Book unforgettable experiences around the world.";
  const image = blok.hero_image?.filename || "https://source.unsplash.com/random/1920x900/?thailand,beach";

  return (
    <section {...storyblokEditable(blok)} class="relative h-[60vh] w-full flex items-center justify-center">
      <Image src={image} alt={title} fill class="object-cover brightness-75" />
      <div class="absolute text-center text-white">
        <h1 class="text-4xl font-bold drop-shadow">{title}</h1>
        <p class="mt-3 text-lg drop-shadow">{subtitle}</p>
      </div>
    </section>
  );
}
`;
}

// ---------- Featured Experiences Section ----------
function featuredExperiencesSectionTemplate() {
  return `
"use client";
import { StoryblokComponent, storyblokEditable } from "@storyblok/react";

export default function FeaturedExperiencesSection({ blok }) {
  return (
    <section {...storyblokEditable(blok)} class="px-6 py-12 bg-gray-50">
      <h2 class="text-2xl font-bold mb-6">{blok.title || "Top Experiences in Thailand"}</h2>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {(blok.experiences || []).map((experience) => (
          <StoryblokComponent blok={experience} key={experience._uid} />
        ))}
      </div>
    </section>
  );
}
`;
}

// ---------- Footer ----------
function footerTemplate() {
  return `
"use client";
import { storyblokEditable } from "@storyblok/react";

export default function FooterSection({ blok }) {
  return (
    <footer {...storyblokEditable(blok)} class="bg-gray-900 text-gray-300 p-10 mt-16">
      <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <h3 class="text-lg font-semibold text-white">Wanderlast</h3>
          <p class="text-sm mt-2">Your gateway to the world’s most meaningful experiences.</p>
        </div>

        <div>
          <h4 class="font-semibold text-white mb-2">Explore</h4>
          <ul class="space-y-1 text-sm">
            <li>Destinations</li>
            <li>Experiences</li>
            <li>Eco Travel</li>
          </ul>
        </div>

        <div>
          <h4 class="font-semibold text-white mb-2">Support</h4>
          <ul class="space-y-1 text-sm">
            <li>Contact</li>
            <li>FAQ</li>
            <li>Bookings</li>
          </ul>
        </div>
      </div>

      <p class="text-center text-sm text-gray-500 mt-10">© 2025 Wanderlast.</p>
    </footer>
  );
}
`;
}

// =============================
// WRITE COMPONENTS
// =============================
function writeIfMissing(file, content) {
  if (!fs.existsSync(file)) {
    fs.writeFileSync(file, content);
    console.log("✔ Created:", file);
  }
}

function generateUI() {
  console.log("🎨 Generating Tailwind UI components…");

  writeIfMissing(`${CARDS}/ExperienceCard.jsx`, experienceCardTemplate());
  writeIfMissing(`${CARDS}/DestinationCard.jsx`, destinationCardTemplate());
  writeIfMissing(`${SECTIONS}/HeroBanner.jsx`, heroBannerTemplate());
  writeIfMissing(`${SECTIONS}/FeaturedExperiencesSection.jsx`, featuredExperiencesSectionTemplate());
  writeIfMissing(`${SECTIONS}/FooterSection.jsx`, footerTemplate());
}

// =============================
//  RUN EVERYTHING
// =============================
(async function run() {
  console.log("🚀 WANDERLAST UI AUTOFIX STARTED");
  await verifySB();
  generateUI();
  console.log("🎉 UI generation complete!");
})();
