// FIGMA_LOCK: Thailand destination page — 85-90% match (no footer here)
// Structure: Hero → Cities → Top experiences by city → All things to do → Travel tips → Nearby destinations → Discover most popular

import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";
const { data } = require("../../../lib/data");

const FALLBACK = "/images/figma/placeholder.jpg";

// Safe image resolver: blocks problematic paths, URL-encodes spaces, handles relative paths
function safeImg(src, fallback = FALLBACK) {
  if (!src || !src.trim().length) return fallback;
  
  // Hard-block color palette, home page, and press logos
  const blocked = ["color palette", "home page", "press-logos"];
  if (blocked.some(b => src.toLowerCase().includes(b))) return fallback;
  
  // Treat relative filenames as /images/figma/${src}
  if (!src.includes("/")) src = `/images/figma/${src}`;
  
  // URL-encode spaces
  return src.replace(/ /g, "%20");
}

const pickImage = (src) => src || FALLBACK;

// Local mock data for Thailand destination page (conditional by slug)
const THAILAND_MOCK = {
  citiesInThailand: [
    { slug: "ko-chang", name: "Ko Chang", image: "/images/figma/experiences/thailand.jpg" },
    { slug: "hat-yai", name: "Hat Yai", image: "/images/figma/experiences/thailand.jpg" },
    { slug: "satun", name: "Satun", image: "/images/figma/experiences/thailand.jpg" },
    { slug: "pak-chong", name: "Pak Chong", image: "/images/figma/experiences/thailand.jpg" },
    { slug: "chumphon", name: "Chumphon", image: "/images/figma/experiences/thailand.jpg" },
    { slug: "mae-hong-son", name: "Mae Hong Son", image: "/images/figma/experiences/thailand.jpg" },
  ],
  topExperiencesByCity: {
    Bangkok: [
      { slug: "bangkok-street-food", title: "Bangkok Street Food Tour", price: 35, rating: 4.7, ratingCount: 182, image: "/images/figma/experiences/thailand-street-food.jpg" },
      { slug: "grand-palace-tour", title: "Grand Palace Tour", price: 42, rating: 4.9, ratingCount: 295, image: "/images/figma/experiences/thailand-palace.jpg" },
      { slug: "floating-markets", title: "Floating Markets Experience", price: 55, rating: 4.8, ratingCount: 168, image: "/images/figma/experiences/thailand-markets.jpg" },
    ],
    Phuket: [
      { slug: "similan-snorkel", title: "Similan Islands Snorkel", price: 85, rating: 4.9, ratingCount: 342, image: "/images/figma/experiences/thailand-snorkel.jpg" },
      { slug: "old-town-walk", title: "Phuket Old Town Walk", price: 38, rating: 4.6, ratingCount: 124, image: "/images/figma/experiences/thailand-old-town.jpg" },
      { slug: "sunset-catamaran", title: "Sunset Catamaran Cruise", price: 72, rating: 4.8, ratingCount: 267, image: "/images/figma/experiences/thailand-catamaran.jpg" },
    ],
    Pattaya: [
      { slug: "coral-island-tour", title: "Coral Island Day Tour", price: 48, rating: 4.5, ratingCount: 95, image: "/images/figma/experiences/thailand-coral.jpg" },
      { slug: "sanctuary-visit", title: "Elephant Sanctuary Visit", price: 65, rating: 4.9, ratingCount: 512, image: "/images/figma/experiences/thailand-elephant.jpg" },
      { slug: "motorcycle-tour", title: "Scenic Motorcycle Tour", price: 52, rating: 4.7, ratingCount: 141, image: "/images/figma/experiences/thailand-motorbike.jpg" },
    ],
  },
  allThingsMock: [
    { slug: "muay-thai-class", title: "Muay Thai Boxing Class", city: "Bangkok", price: 40, rating: 4.8, image: "/images/figma/experiences/thailand-muay.jpg" },
    { slug: "cooking-school", title: "Thai Cooking Class", city: "Chiang Mai", price: 45, rating: 4.9, image: "/images/figma/experiences/thailand-cooking.jpg" },
    { slug: "jungle-trek", title: "Jungle Trek & Waterfall", city: "Khao Yai", price: 70, rating: 4.7, image: "/images/figma/experiences/thailand-jungle.jpg" },
    { slug: "spa-day", title: "Traditional Thai Spa", city: "Bangkok", price: 55, rating: 4.8, image: "/images/figma/experiences/thailand-spa.jpg" },
    { slug: "rock-climbing", title: "Rock Climbing Excursion", city: "Railay", price: 68, rating: 4.6, image: "/images/figma/experiences/thailand-climbing.jpg" },
    { slug: "night-bazaar", title: "Night Bazaar Shopping Tour", city: "Chiang Mai", price: 30, rating: 4.5, image: "/images/figma/experiences/thailand-bazaar.jpg" },
    { slug: "dive-liveaboard", title: "Dive Liveaboard Adventure", city: "Phuket", price: 350, rating: 4.9, image: "/images/figma/experiences/thailand-dive.jpg" },
    { slug: "temple-monastery", title: "Sunrise Temple Monastery Visit", city: "Chiang Mai", price: 28, rating: 4.8, image: "/images/figma/experiences/thailand-temple.jpg" },
    { slug: "kayak-tour", title: "Phang Nga Bay Kayaking", city: "Phuket", price: 75, rating: 4.7, image: "/images/figma/experiences/thailand-kayak.jpg" },
  ],
  nearbyDestinations: [
    { slug: "cambodia", name: "Cambodia", image: "/images/figma/destinations/cambodia.jpg" },
    { slug: "vietnam", name: "Vietnam", image: "/images/figma/destinations/vietnam.jpg" },
    { slug: "laos", name: "Laos", image: "/images/figma/destinations/laos.jpg" },
    { slug: "malaysia", name: "Malaysia", image: "/images/figma/destinations/malaysia.jpg" },
  ],
  popularPlaces: ["Bangkok", "Phuket", "Pattaya", "Chiang Mai", "Phuket", "Samui", "Krabi", "Phi Phi Islands", "Railay Beach", "Ayutthaya", "Sukhothai", "Hua Hin"],
};

// Helper: render star rating
function StarRating({ rating, count }) {
  return (
    <div className="flex items-center gap-1">
      <span className="text-amber-400 text-xs">★</span>
      <span className="text-xs font-medium text-gray-500">{rating}</span>
      <span className="text-[11px] text-gray-400">({count})</span>
    </div>
  );
}

// Helper: reusable card component (image-first style matching home page)
function ExperienceCard({ exp }) {
  return (
    <Link href={`/experiences/${exp.slug}`} className="block group">
      <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow border border-gray-200">
        {/* Image */}
        <div className="relative h-40 md:h-44 bg-gray-200 overflow-hidden">
          <Image
            src={safeImg(exp.image)}
            alt={exp.title}
            fill
            className="object-cover group-hover:brightness-110 transition-all"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={false}
          />
          {/* TOP badge */}
          <div className="absolute top-2 left-2 bg-black text-white px-2 py-1 text-xs font-bold rounded">
            TOP
          </div>
          {/* Wishlist */}
          <div className="absolute top-2 right-2 text-lg cursor-pointer hover:scale-110 transition-transform">
            ♡
          </div>
        </div>
        {/* Content below image */}
        <div className="p-3 flex flex-col gap-2">
          <h3 className="text-[13px] font-semibold text-gray-900 line-clamp-2">{exp.title}</h3>
          <div className="flex justify-between items-start gap-2">
            <StarRating rating={exp.rating} count={exp.ratingCount} />
            <span className="text-sm font-medium text-gray-900 whitespace-nowrap">from ${exp.price}</span>
          </div>
          <button className="w-full h-8 bg-black text-white text-sm font-semibold rounded-md hover:bg-gray-800 transition mt-1">
            Buy now
          </button>
        </div>
      </div>
    </Link>
  );
}

export async function generateMetadata({ params }) {
  const country = data.getCountry(params.slug);
  if (!country) return { title: "Destination Not Found" };
  return {
    title: country.name,
    description: country.tagline,
    openGraph: {
      title: country.name,
      description: country.tagline,
      image: country.heroImage,
    },
  };
}

export default function DestinationPage({ params }) {
  const country = data.getCountry(params.slug);
  if (!country) notFound();

  // Use Thailand mock data for /destinations/thailand
  const isThailand = params.slug === "thailand";
  const citiesData = isThailand ? THAILAND_MOCK.citiesInThailand : data.listDestinations(country.slug);
  const nearbyData = isThailand ? THAILAND_MOCK.nearbyDestinations : [];
  const popularPlaces = isThailand ? THAILAND_MOCK.popularPlaces : [];

  return (
    <main>
      {/* ========== SECTION 1: HERO ========== */}
      <section className="relative w-full min-h-[60vh] flex items-end pt-20 pb-16 px-4 overflow-hidden">
        {/* Background image element (fixed behind overlay) */}
        <Image
          src="/images/figma/Home%20Page.png"
          alt="Thailand hero background"
          fill
          className="object-cover"
          priority
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/40" />

        <div className="max-w-6xl mx-auto w-full relative z-10">
          {/* Left: Eyebrow + Title + Breadcrumb + Chips */}
          <div>
            {/* Eyebrow */}
            <div className="text-xs uppercase tracking-widest text-white/80 mb-6 font-light">
              UNESCO Heritage, Thailand
            </div>
            
            {/* Big Title */}
            <h1 className="text-5xl md:text-6xl font-semibold tracking-tight text-white drop-shadow-lg mb-6">
              Thailand
            </h1>
            
            {/* Breadcrumb */}
            <div className="text-xs uppercase text-white/80 font-light mb-10">
              <Link href="/" className="hover:text-white/95 transition">
                Home
              </Link>
              {" / "}
              <span>Thailand</span>
            </div>
            
            {/* Category Chips Row */}
            <div className="flex flex-wrap gap-3 mb-12">
              {["Tours", "Attraction Tickets", "Hop on Hop off", "Flights", "Food & Dining", "Car Rentals", "Hotels"].map((chip) => (
                <button
                  key={chip}
                  className="px-4 py-2 bg-white/25 text-white text-xs font-medium rounded-full border border-white/30 backdrop-blur-sm hover:bg-white/30 transition"
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>

          {/* Right: View all offers link */}
          <div className="flex justify-end">
            <Link href="/experiences" className="text-white text-sm font-semibold hover:text-white/90 transition">
              View all offers →
            </Link>
          </div>
        </div>
      </section>

      {/* ========== SECTION 2: CITIES IN THAILAND ========== */}
      {isThailand && (
        <section className="py-16 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-normal text-gray-900 mb-14">Cities in Thailand</h2>
            {/* Horizontal scrollable/wrapping row of circles */}
            <div className="flex flex-wrap gap-6 justify-start">
              {citiesData.map((city) => (
                <Link key={city.slug} href={`/experiences`} className="block group flex-shrink-0">
                  <div className="relative cursor-pointer w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden shadow-sm group-hover:shadow-md transition-shadow border border-gray-200 hover:ring-2 hover:ring-green-600/40">
                    <Image
                      src={safeImg(city.image)}
                      alt={city.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform"
                      sizes="(max-width: 768px) 33vw, (max-width: 1200px) 25vw, 160px"
                    />
                  </div>
                  <p className="text-center text-sm font-medium text-gray-900 mt-3">{city.name}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ========== SECTION 3: TOP EXPERIENCES BY CITY ========== */}
      {isThailand && (
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            {Object.entries(THAILAND_MOCK.topExperiencesByCity).map(([cityName, experiences]) => (
              <div key={cityName} className="mb-16">
                {/* City header */}
                <div className="flex justify-between items-baseline mb-5">
                  <h2 className="text-4xl md:text-5xl font-medium text-gray-900">{cityName}</h2>
                  <Link href="/experiences" className="text-sm font-semibold text-green-700 hover:text-green-800 transition">
                    Explore {cityName} →
                  </Link>
                </div>

                {/* Tabs (UI only) */}
                <div className="flex gap-4 mb-10 border-b border-gray-300">
                  {["Culture & Heritage", "Parks & Gardens", "Animals & Shows", "Food & Dining", "Shopping"].map((tab, idx) => (
                    <button
                      key={tab}
                      className={`pb-3 text-sm font-medium transition ${
                        idx === 0 ? "text-gray-900 border-b-2 border-gray-900" : "text-gray-500 border-b-2 border-transparent hover:text-gray-700"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {/* Cards grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {experiences.map((exp) => (
                    <ExperienceCard key={exp.slug} exp={exp} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ========== SECTION 4: ALL THINGS TO DO ========== */}
      {isThailand && (
        <section className="py-20 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            {/* Two-column layout: sidebar + content */}
            <div className="grid grid-cols-1 lg:grid-cols-[16rem_1fr] gap-12">
              {/* LEFT: Filters sidebar (desktop w-64, collapses on mobile) */}
              <div className="hidden lg:block space-y-8 bg-gray-50 border border-gray-200 rounded-xl p-4">
                {/* Destinations tree */}
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Destinations</h3>
                  <ul className="space-y-2 text-[13px] text-gray-700">
                    <li>
                      <button className="hover:text-green-700 font-medium">▼ Bangkok (45)</button>
                      <ul className="ml-4 mt-2 space-y-1 text-xs text-gray-600">
                        <li>
                          <button className="hover:text-green-700">Phra Nakhon</button>
                        </li>
                        <li>
                          <button className="hover:text-green-700">Sukhumvit</button>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <button className="hover:text-green-700 font-medium">▼ Phuket (38)</button>
                    </li>
                    <li>
                      <button className="hover:text-green-700 font-medium">▼ Pattaya (22)</button>
                    </li>
                    <li>
                      <button className="hover:text-green-700 font-medium">▼ Chiang Mai (31)</button>
                    </li>
                  </ul>
                </div>

                {/* Categories list */}
                <div>
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Categories</h3>
                  <ul className="space-y-2 text-[13px] text-gray-700">
                    <li>
                      <button className="hover:text-green-700">Tours (156)</button>
                    </li>
                    <li>
                      <button className="hover:text-green-700">Adventure (89)</button>
                    </li>
                    <li>
                      <button className="hover:text-green-700">Food & Dining (72)</button>
                    </li>
                    <li>
                      <button className="hover:text-green-700">Culture (95)</button>
                    </li>
                  </ul>
                </div>
              </div>

              {/* RIGHT: Results + Filters + Cards */}
              <div>
                {/* Results count */}
                <div className="mb-6">
                  <p className="text-sm font-medium text-gray-900">2,332 results found</p>
                </div>

                {/* Filter chips + sort */}
                <div className="flex flex-wrap gap-3 items-center mb-10 pb-6 border-b border-gray-300">
                  <span className="text-xs text-gray-600 font-medium">Filter:</span>
                  <button className="px-3 py-1.5 bg-gray-100 text-gray-700 text-xs font-medium rounded-full hover:bg-gray-200 transition">
                    Availability
                  </button>
                  <button className="px-3 py-1.5 bg-gray-100 text-gray-700 text-xs font-medium rounded-full hover:bg-gray-200 transition">
                    Price range
                  </button>
                  <button className="px-3 py-1.5 bg-gray-100 text-gray-700 text-xs font-medium rounded-full hover:bg-gray-200 transition">
                    Instant confirmation
                  </button>
                  <div className="ml-auto">
                    <select className="text-sm px-3 py-1.5 border border-gray-300 rounded-lg bg-white hover:border-gray-400 transition">
                      <option>Recommended</option>
                      <option>Price: Low to High</option>
                      <option>Price: High to Low</option>
                      <option>Top Rated</option>
                    </select>
                  </div>
                </div>

                {/* 3-column grid of cards (responsive: 1 mobile, 2 tablet, 3 desktop) */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-6 mb-10">
                  {THAILAND_MOCK.allThingsMock.map((exp) => (
                    <ExperienceCard key={exp.slug} exp={exp} />
                  ))}
                </div>

                {/* Pagination */}
                <div className="flex justify-between items-center border-t border-gray-300 pt-6">
                  <button className="text-xs text-gray-600 hover:text-gray-900 font-medium">← Previous</button>
                  <span className="text-xs font-semibold text-gray-900">1 of 150</span>
                  <button className="text-xs text-gray-600 hover:text-gray-900 font-medium">Next →</button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ========== SECTION 5: TRAVEL TIPS / ABOUT THAILAND ========== */}
      {isThailand && (
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
              {/* LEFT: Paragraphs + General info */}
              <div>
                <h2 className="text-4xl md:text-5xl font-normal text-gray-900 mb-5">Travel Tips for Thailand</h2>
                <p className="text-gray-700 leading-loose mb-6 text-base">
                  Thailand is one of Southeast Asia's most enchanting destinations, known for its warm hospitality, stunning temples, and vibrant street food culture. Whether you're exploring the bustling streets of Bangkok or relaxing on pristine island beaches, Thailand offers unforgettable experiences for every traveler.
                </p>
                <p className="text-gray-700 leading-loose mb-10 text-base">
                  From world-class diving in the Andaman Sea to trekking through lush northern jungles, Thailand seamlessly blends adventure, culture, and relaxation. The key is to venture beyond the tourist hotspots and connect with local communities to experience authentic Thai life.
                </p>

                <div className="bg-white p-6 rounded-xl border border-gray-300 shadow-sm">
                  <h3 className="text-sm font-bold text-gray-900 mb-5">General Info</h3>
                  <ul className="space-y-4 text-sm text-gray-700">
                    <li>
                      <span className="font-semibold text-gray-900">Currency:</span> Thai Baht (฿)
                    </li>
                    <li>
                      <span className="font-semibold text-gray-900">Language:</span> Thai (English widely spoken in tourist areas)
                    </li>
                    <li>
                      <span className="font-semibold text-gray-900">Best Time to Visit:</span> November to February (cool & dry)
                    </li>
                    <li>
                      <span className="font-semibold text-gray-900">Visa:</span> Most nationalities get 30 days visa-free; extendable
                    </li>
                    <li>
                      <span className="font-semibold text-gray-900">Tipping:</span> Not mandatory but appreciated (5-10%)
                    </li>
                  </ul>
                </div>
              </div>

              {/* RIGHT: Map placeholder */}
              <div>
                <div className="relative w-full h-80 md:h-96 rounded-xl shadow-sm border border-gray-300 overflow-hidden bg-white">
                  <Image
                    src={safeImg("/images/figma/placeholder.jpg")}
                    alt="Thailand map"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 600px"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ========== SECTION 6: NEARBY DESTINATIONS ========== */}
      {isThailand && nearbyData.length > 0 && (
        <section className="py-16 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-normal text-gray-900 mb-14">Nearby Destinations</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {nearbyData.map((dest) => (
                <Link key={dest.slug} href={`/destinations/${dest.slug}`} className="block group">
                  <div className="relative cursor-pointer mx-auto w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden shadow-sm group-hover:shadow-md transition-shadow border border-gray-200 hover:ring-2 hover:ring-green-600/40">
                    <Image
                      src={safeImg("/images/figma/experiences/thailand.jpg")}
                      alt={dest.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform"
                      sizes="(max-width: 768px) 33vw, 160px"
                    />
                  </div>
                  <p className="text-center text-sm font-medium text-gray-900 mt-3">{dest.name}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Minimal fallback for non-Thailand slugs */}
      {!isThailand && (
        <section className="py-20 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">{country.name}</h2>
            <p className="text-gray-700">Destination page coming soon.</p>
          </div>
        </section>
      )}

      {/* ========== SECTION 7: DISCOVER MOST POPULAR PLACES ========== */}
      {isThailand && popularPlaces.length > 0 && (
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-medium text-gray-900 mb-10">
              Discover Most Popular Places to Visit in {country.name}
            </h2>

            {/* Two-toggle pill (UI only) */}
            <div className="flex justify-center gap-2 mb-14">
              <button className="px-6 py-2.5 bg-green-800 text-white text-sm font-semibold rounded-full shadow-sm hover:bg-green-900 transition">
                Top things to do
              </button>
              <button className="px-6 py-2.5 bg-white text-gray-700 text-sm font-semibold rounded-full border border-gray-300 shadow-sm hover:bg-gray-50 transition">
                Top destinations
              </button>
            </div>

            {/* Chip cloud of places (UI only, two-tone border style) */}
            <div className="flex flex-wrap justify-center gap-3">
              {popularPlaces.map((place) => (
                <button
                  key={place}
                  className="px-4 py-2 bg-white border border-gray-400 text-gray-800 text-xs font-medium rounded-full hover:border-green-700 hover:text-green-700 transition"
                >
                  {place}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

