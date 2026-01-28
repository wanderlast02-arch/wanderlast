import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Wanderlast - Authentic Travel Experiences",
  description: "Discover authentic experiences and sustainable travel with verified local guides.",
};

// Arrow dot pattern (reusable for multiple sections)
function ArrowDots({ size = "w-24 h-24", dotSize = "w-2 h-2", gap = "gap-3" }) {
  const pattern = [
    'bg-wl-primary', 'bg-wl-primary', 'bg-wl-primary', 'bg-wl-primary',
    'bg-gray-300', 'bg-gray-300', 'bg-wl-primary', 'bg-wl-primary',
    'bg-gray-300', 'bg-wl-primary', 'bg-gray-300', 'bg-wl-primary',
    'bg-wl-primary', 'bg-gray-300', 'bg-gray-300', 'bg-wl-primary',
  ];
  return (
    <div className={`grid grid-cols-4 ${gap} ${size}`}>
      {pattern.map((color, i) => (
        <div key={i} className={`${color} rounded-full ${dotSize}`}></div>
      ))}
    </div>
  );
}

function img(src) {
  if (!src || !src.trim().length) return "/images/figma/placeholder.jpg";
  // URL encode spaces for valid paths
  return src.replace(/ /g, "%20");
}

// Helper to resolve experience images with slug-based fallback (bulletproof)
function pickExperienceImage(item) {
  // Block design screenshots from being used as card images
  if (item.image && item.image.trim().length) {
    if (!item.image.includes("Home Page") && !item.image.includes("Color Palette")) {
      return img(item.image);
    }
  }
  // Cascading fallback: try multiple paths in order
  // Note: Next.js Image component will handle actual file existence
  // We provide the first likely path; client-side error handlers can retry
  const slug = item.slug || 'placeholder';
  return `/images/figma/experiences/${slug}.jpg`;
  // Fallback chain if needed: .jpg → .png → placeholder.jpg → placeholder.png
}

// Arrow pattern for hover effect (4x4 dot grid with green arrows)
function ArrowPattern() {
  return (
    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/30">
      <ArrowDots size="w-20 h-20" dotSize="w-2 h-2" gap="gap-2" />
    </div>
  );
}

// Inline mock data (homepage only)
const HERO_IMG = "/images/figma/Home Page.png";
const MOCK = {
  bestOffers: [
    { slug: "caldera-sunset-catamaran", title: "Caldera Sunset by Catamaran", subtitle: "Santorini, Greece", price: 120, rating: 4.8, image: "/images/figma/experiences/greece.jpg" },
    { slug: "acropolis-walking-tour", title: "Acropolis & Ancient Agora Tour", subtitle: "Athens, Greece", price: 45, rating: 4.9, image: "/images/figma/experiences/greece.jpg" },
    { slug: "bangkok-street-food-tour", title: "Bangkok Street Food Night Tour", subtitle: "Bangkok, Thailand", price: 35, rating: 4.7, image: "/images/figma/experiences/thailand.jpg" },
  ],
  featured: [
    { slug: "santorini-sailing", title: "Aegean Sailing Experience", subtitle: "Santorini, Greece", price: 140, rating: 4.8, image: "/images/figma/experiences/greece.jpg" },
    { slug: "athens-history-walk", title: "Athens History Walk", subtitle: "Athens, Greece", price: 35, rating: 4.7, image: "/images/figma/experiences/japan.jpg" },
    { slug: "tokyo-night-neon", title: "Tokyo Night Neon Stroll", subtitle: "Tokyo, Japan", price: 60, rating: 4.9, image: "/images/figma/experiences/japan.jpg" },
    { slug: "thailand-island-hop", title: "Thailand Island Hopping", subtitle: "Phuket, Thailand", price: 110, rating: 4.6, image: "/images/figma/experiences/thailand.jpg" },
  ],
  logos: [
    "/images/figma/placeholder.jpg",
    "/images/figma/placeholder.jpg",
    "/images/figma/placeholder.jpg",
    "/images/figma/placeholder.jpg",
    "/images/figma/placeholder.jpg",
  ],
  collections: [
    { slug: "eco-tourism", title: "Rainforest Trek", subtitle: "Chiang Mai, Thailand", price: 55, rating: 4.7, image: "/images/figma/experiences/thailand.jpg" },
    { slug: "eco-diving", title: "Coral Reef Dive", subtitle: "Phuket, Thailand", price: 90, rating: 4.8, image: "/images/figma/experiences/cambodia.jpg" },
    { slug: "eco-biking", title: "Countryside Biking", subtitle: "Ubud, Indonesia", price: 40, rating: 4.6, image: "/images/figma/experiences/peru.jpg" },
  ],
  destinations: [
    { slug: "greece", title: "Greece", image: "/images/figma/destinations/greece.jpg" },
    { slug: "thailand", title: "Thailand", image: "/images/figma/destinations/thailand.jpg" },
    { slug: "japan", title: "Japan", image: "/images/figma/destinations/japan.jpg" },
    { slug: "peru", title: "Peru", image: "/images/figma/destinations/peru.jpg" },
    { slug: "cambodia", title: "Cambodia", image: "/images/figma/destinations/cambodia.jpg" },
  ],
  tokyoPopular: [
    { slug: "tsukiji-food-walk", title: "Tsukiji Food Walk", subtitle: "Tokyo, Japan", price: 48, rating: 4.8, image: "/images/figma/experiences/japan.jpg" },
    { slug: "asakusa-temple-tour", title: "Asakusa Temple Tour", subtitle: "Tokyo, Japan", price: 42, rating: 4.7, image: "/images/figma/experiences/japan.jpg" },
    { slug: "shibuya-nightlife", title: "Shibuya Nightlife", subtitle: "Tokyo, Japan", price: 59, rating: 4.9, image: "/images/figma/experiences/japan.jpg" },
  ],
  tags: ["Tokyo", "Kyoto", "Osaka", "Mt. Fuji", "Nara", "Sapporo", "Nikko", "Hakone", "Okinawa"],
};

const WHY_WANDERLAST = [
  { title: "Local Guides", desc: "Expert locals who know every hidden corner and story" },
  { title: "Sustainable travel", desc: "Travel that benefits communities and preserves culture" },
  { title: "Authentic experiences", desc: "Real moments beyond the typical tourist path" },
  { title: "Curated", desc: "Hand-selected destinations and activities" },
];

export default function HomePage() {
  return (
    <div className="bg-white text-wl-text">
      {/* FIGMA_LOCK: Hero section locked to Figma design authority. Typography, spacing, shadow, overlay locked. Allowed: copy updates only. */}
      <section className="relative min-h-[640px] flex items-center justify-center overflow-hidden">
        <Image src={img(HERO_IMG)} alt="Wanderlast homepage hero" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/30 to-black/45" />

        <div className="relative text-center text-white px-4 max-w-4xl mx-auto py-16 flex flex-col items-center">
          {/* Two-line headline: refined hierarchy for Figma match */}
          <div className="text-center mb-12">
            <div className="text-3xl md:text-4xl font-light leading-tight drop-shadow-lg opacity-85 mb-1">
              Let&apos;s start
            </div>
            <div className="text-6xl md:text-7xl font-black tracking-[0.15em] drop-shadow-lg uppercase leading-[1.0]">
              YOUR JOURNEY!
            </div>
          </div>

          {/* Single pill search bar: premium polish */}
          <div className="max-w-[520px] w-full mx-auto">
            <div className="bg-white/95 backdrop-blur-sm text-gray-700 rounded-full shadow-lg border border-gray-200 flex items-center h-14 overflow-hidden">
              <span className="text-gray-400 text-xl pl-5" aria-hidden="true">🔍</span>
              <input
                type="text"
                placeholder="Search journey destinations here"
                className="flex-1 bg-transparent text-sm text-gray-700 placeholder-gray-500 focus:outline-none px-4"
              />
              <button className="bg-wl-primary text-white px-7 h-12 rounded-full text-sm font-semibold hover:opacity-90 transition whitespace-nowrap mr-1 my-1">
                Search
              </button>
            </div>
          </div>

          {/* Explore CTA */}
          <Link
            href="/experiences"
            className="inline-block px-8 py-3 bg-white/10 backdrop-blur-sm text-white font-medium rounded-lg hover:bg-white/20 transition border border-white/30 text-sm mt-6"
          >
            Explore Experiences
          </Link>
        </div>

        {/* Social icons bottom-left */}
        <div className="absolute left-4 md:left-6 bottom-4 md:bottom-6 flex items-center gap-3 text-white/80">
          {["F", "IG", "IN"].map((label) => (
            <span key={label} className="h-9 w-9 rounded-full border border-white/30 bg-black/30 backdrop-blur-sm flex items-center justify-center text-xs font-semibold hover:bg-black/40 transition cursor-pointer">
              {label}
            </span>
          ))}
        </div>
        
        {/* View location bottom-right */}
        <div className="absolute right-4 md:right-6 bottom-4 md:bottom-6 text-white/80 text-sm hover:text-white transition cursor-pointer">— View location</div>
      </section>

      {/* FIGMA_LOCK: Why clients section locked to Figma. Card layout, spacing, icon sizes, colors locked. Allowed: text content updates only. */}
      {/* Why clients choose Wanderlast */}
      <section className="py-20 px-4 bg-amber-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Left: Description */}
            <div>
              <p className="text-xs uppercase tracking-wider text-gray-500 mb-4 font-semibold">OUR ADVANTAGES</p>
              <h2 className="text-3xl md:text-4xl font-semibold mb-4">Why clients choose Wanderlast</h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-6 max-w-md">
                Choose an online travel agency for convenience, better deals, and expert support. Easily compare prices, access special offers, and book anytime, anywhere — all in one place. Save time and travel smarter with trusted guidance at your fingertips.
              </p>
              <Link href="#" className="text-wl-primary text-sm font-semibold hover:opacity-70 transition">Learn more</Link>
              
              {/* Decorative arrow pattern */}
              <div className="mt-10">
                <ArrowDots size="w-24 h-24" dotSize="w-2.5 h-2.5" gap="gap-3" />
              </div>
            </div>

            {/* Right: 4-card grid with one highlighted */}
            <div className="grid grid-cols-2 gap-6">
              {[
                { icon: "🍃", title: "Discover the possibilities", desc: "With nearly half a million attractions, hotels & more, you're sure to find the perfect fit.", highlight: true },
                { icon: "💧", title: "Enjoy deals & delights", desc: "Quality activities. Great prices. Plus, earn credits to save more." },
                { icon: "📱", title: "Exploring made easy", desc: "Book last minute, skip lines & get free cancellation for easier exploring." },
                { icon: "🧭", title: "Travel you can trust", desc: "Read reviews & get reliable customer support. We are with you at every step." },
              ].map((c, idx) => (
                <div 
                  key={idx} 
                  className={`rounded-lg border p-6 transition-all duration-200 cursor-pointer ${
                    c.highlight 
                      ? 'bg-green-50 border-green-200 hover:border-green-300 shadow-sm' 
                      : 'bg-white border-gray-200 hover:bg-green-50 hover:border-green-300 shadow-sm'
                  }`}
                >
                  <div className="text-3xl mb-3">{c.icon}</div>
                  <h3 className="text-sm font-bold text-gray-900 mb-2">{c.title}</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Best offers */}
      {/* FIGMA_LOCK: Best offers — 3-card grid, badges, wishlist icon, darker overlay, description right */}
      <section className="py-20 px-4 bg-wl-surface">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-12 gap-8">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">TOP TOURS</p>
              <h2 className="text-3xl md:text-4xl font-light">Best offers</h2>
            </div>
            <div className="md:max-w-xs text-sm text-gray-600 leading-relaxed">
              <p>Start your journey with our top-rated tours, trusted by real travelers worldwide. Handpicked for quality, experience, and value. Explore the most loved experiences.</p>
              <Link href="/experiences" className="text-wl-primary font-semibold hover:opacity-80 mt-4 inline-block">View all offers</Link>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {MOCK.bestOffers.map((e, idx) => (
              <div key={e.slug} className="group rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all bg-white">
                <div className="relative w-full h-56">
                  <Image src={img(pickExperienceImage(e))} alt={e.title} fill className="object-cover group-hover:brightness-75 transition-all duration-200" sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />
                  <ArrowPattern />
                  
                  {/* Badge — rotating between "GO NOW" and "TOP" */}
                  <div className="absolute top-4 left-4 bg-black text-white text-xs px-3 py-1.5 rounded-md font-semibold">
                    {idx % 2 === 0 ? 'GO NOW' : 'TOP'}
                  </div>
                  
                  {/* Wishlist icon */}
                  <button className="absolute top-4 right-4 text-white text-lg hover:scale-110 transition-transform">
                    ♡
                  </button>
                </div>
                
                {/* Card content below image */}
                <div className="p-4 flex flex-col gap-3">
                  <h3 className="text-base font-semibold text-gray-900 leading-tight">{e.title}</h3>
                  <p className="text-sm text-gray-600">{e.subtitle || "Amazing experience & top location"}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-1 text-gray-600">
                      ★ {e.rating} <span className="text-gray-400">({e.reviews || "35.1k"})</span>
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                    <div>
                      <span className="text-xl font-bold text-gray-900">${e.price}</span>
                      <span className="text-sm text-gray-500 ml-1">per person</span>
                    </div>
                    <Link href={`/experiences/${e.slug}`} className="px-6 py-2 rounded-md bg-gray-900 text-white text-sm font-semibold hover:bg-gray-800 transition-colors">
                      Buy now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FIGMA_LOCK: Featured Experiences — 4-card grid with arrow pattern hover, description right */}
      <section className="py-20 px-4 bg-amber-50">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-12 gap-8">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">RECOMMENDED SERVICES</p>
              <h2 className="text-3xl md:text-4xl font-light">Featured Experiences</h2>
            </div>
            <div className="md:max-w-xs text-sm text-gray-600 leading-relaxed">
              <p>Explore top-rated travel services and experiences handpicked for you. It helps you find the most popular options to enrich your journey. Book directly on the platform for a smooth and simple experience.</p>
              <Link href="/experiences" className="text-wl-primary font-semibold hover:opacity-80 mt-4 inline-block">View all offers</Link>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {MOCK.featured.slice(0, 4).map((e, idx) => (
              <div key={e.slug} className="group rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all bg-white">
                <div className="relative w-full h-56">
                  <Image src={img(pickExperienceImage(e))} alt={e.title} fill className="object-cover group-hover:brightness-75 transition-all duration-200" sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" />
                  <ArrowPattern />
                  
                  {/* Price badge overlay */}
                  <div className="absolute bottom-4 left-4 bg-black/80 text-white text-xs px-3 py-1.5 rounded-md font-semibold">
                    from ${e.price}
                  </div>
                </div>
                
                {/* Card content below image */}
                <div className="p-4 flex flex-col gap-2">
                  <h3 className="text-sm font-semibold text-gray-900 leading-tight">{e.title}</h3>
                  <Link href={`/experiences/${e.slug}`} className="w-full px-4 py-2.5 rounded-md bg-teal-700 text-white text-xs font-semibold hover:bg-teal-800 transition-colors text-center">
                    View details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted Organizations & Press */}
      <section className="py-16 px-4 bg-gradient-to-b from-green-50 to-green-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-center text-xs uppercase tracking-[0.25em] text-gray-600 font-semibold mb-8">TRUSTED BY ORGANIZATIONS & PRESS</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8 items-center justify-items-center opacity-60">
            {["Hilton", "AXON", "BÜNGE", "Summit", "Aurora", "Northwind"].map((name, i) => (
              <div key={name + i} className="text-gray-500 text-sm font-medium tracking-wide">
                {name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FIGMA_LOCK: Sport/Ecotourism — 3-card grid with arrow pattern hover, description right */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-12 gap-8">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">ACTIVITIES</p>
              <h2 className="text-3xl md:text-4xl font-light">Sport/Ecotourism</h2>
            </div>
            <div className="md:max-w-xs text-sm text-gray-600 leading-relaxed">
              <p>Explore nature while staying active — from hiking and kayaking to eco-friendly tours designed for adventure lovers. These offers handpicked experiences that combine movement, fresh air, and sustainability.</p>
              <Link href="/collections/eco-tourism" className="text-wl-primary font-semibold hover:opacity-80 mt-4 inline-block">View all offers</Link>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {MOCK.collections.map((c, idx) => (
              <div key={c.slug} className="group rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all bg-white">
                <div className="relative w-full h-56">
                  <Image src={img(pickExperienceImage(c))} alt={c.title} fill className="object-cover group-hover:brightness-75 transition-all duration-200" sizes="(min-width: 768px) 33vw, 100vw" />
                  <ArrowPattern />
                  
                  {/* GO NOW badge */}
                  <div className="absolute top-4 left-4 bg-black text-white text-xs px-3 py-1.5 rounded-md font-semibold">
                    GO NOW
                  </div>
                  
                  {/* Wishlist icon */}
                  <button className="absolute top-4 right-4 text-white text-lg hover:scale-110 transition-transform">
                    ♡
                  </button>
                </div>
                
                {/* Card content below image */}
                <div className="p-4 flex flex-col gap-3">
                  <h3 className="text-base font-semibold text-gray-900 leading-tight">{c.title}</h3>
                  <p className="text-sm text-gray-600">{c.subtitle || "Amazing experience & top location"}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-1 text-gray-600">
                      ★ {c.rating} <span className="text-gray-400">({c.reviews || "20.1k"})</span>
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                    <div>
                      <span className="text-xl font-bold text-gray-900">${c.price}</span>
                      <span className="text-sm text-gray-500 ml-1">per group/unit</span>
                    </div>
                    <Link href={`/collections/${c.slug}`} className="px-6 py-2 rounded-md bg-gray-900 text-white text-sm font-semibold hover:bg-gray-800 transition-colors">
                      Buy now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Destinations */}
      <section className="py-20 px-4 bg-wl-surface">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-12 gap-8">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">DESTINATIONS</p>
              <h2 className="text-3xl md:text-4xl font-light">Top Destinations</h2>
            </div>
            <div className="md:max-w-xs text-sm text-gray-600 leading-relaxed">
              <p>Discover the most loved destinations around the world — from iconic cities rich in culture and history to hidden natural gems perfect for peaceful escapes.</p>
              <Link href="/destinations" className="text-wl-primary font-semibold hover:opacity-80 mt-4 inline-block">View all offers</Link>
            </div>
          </div>
          <div className="flex flex-nowrap justify-center gap-8 overflow-x-auto snap-x snap-mandatory pb-2 scrollbar-hide">
            {MOCK.destinations.map((d) => (
              <Link key={d.slug} href={`/destinations/${d.slug}`} className="group flex-shrink-0 snap-center">
                <div className="relative w-40 h-40 rounded-full overflow-hidden shadow-sm">
                  <Image src={img(d.image)} alt={d.title} fill className="object-cover" />
                  {/* Name + hover arrow pattern overlay */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-white text-sm font-semibold drop-shadow">{d.title}</span>
                    <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <div className="grid grid-cols-4 gap-2">
                        {[
                          'bg-wl-primary', 'bg-wl-primary', 'bg-wl-primary', 'bg-wl-primary',
                          'bg-gray-300', 'bg-gray-300', 'bg-wl-primary', 'bg-wl-primary',
                          'bg-gray-300', 'bg-wl-primary', 'bg-gray-300', 'bg-wl-primary',
                          'bg-wl-primary', 'bg-gray-300', 'bg-gray-300', 'bg-wl-primary',
                        ].map((color, i) => (
                          <div key={i} className={`${color} w-2 h-2 rounded-full`}></div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* The most popular things to do in Tokyo */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-12 gap-8">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">THINGS TO DO</p>
              <h2 className="text-3xl md:text-4xl font-light">The most popular things to do in Tokyo</h2>
            </div>
            <div className="md:max-w-xs text-sm text-gray-600 leading-relaxed">
              <p>From ancient temples and neon-lit streets to sushi workshops and sumo shows — explore the experiences that make Tokyo unforgettable. Perfect for first-time visitors and returning travelers alike.</p>
              <Link href="/experiences" className="text-wl-primary font-semibold hover:opacity-80 mt-4 inline-block">View all offers</Link>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {MOCK.tokyoPopular.map((e) => (
              <div key={e.slug} className="group rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all bg-white">
                <div className="relative w-full h-56">
                  <Image src={img(pickExperienceImage(e))} alt={e.title} fill className="object-cover group-hover:brightness-75 transition-all duration-200" sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />
                  
                  {/* TOP badge */}
                  <div className="absolute top-4 left-4 bg-black text-white text-xs px-3 py-1.5 rounded-md font-semibold">
                    TOP
                  </div>
                  
                  {/* Wishlist icon */}
                  <button className="absolute top-4 right-4 text-white text-lg hover:scale-110 transition-transform">
                    ♡
                  </button>
                  
                  {/* Hover dark overlay */}
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  {/* Hover arrow pattern */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="grid grid-cols-4 gap-2">
                      {[
                        'bg-wl-primary', 'bg-wl-primary', 'bg-wl-primary', 'bg-wl-primary',
                        'bg-gray-300', 'bg-gray-300', 'bg-wl-primary', 'bg-wl-primary',
                        'bg-gray-300', 'bg-wl-primary', 'bg-gray-300', 'bg-wl-primary',
                        'bg-wl-primary', 'bg-gray-300', 'bg-gray-300', 'bg-wl-primary',
                      ].map((color, i) => (
                        <div key={i} className={`${color} w-2 h-2 rounded-full`}></div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Card content below image */}
                <div className="p-4 flex flex-col gap-3">
                  <h3 className="text-base font-semibold text-gray-900 leading-tight">{e.title}</h3>
                  <p className="text-sm text-gray-600">{e.subtitle || "Tokyo, Japan"}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-1 text-gray-600">
                      ★ {e.rating} <span className="text-gray-400">({e.reviews || "12.1k"})</span>
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                    <div>
                      <span className="text-xl font-bold text-gray-900">${e.price}</span>
                      <span className="text-sm text-gray-500 ml-1">per person</span>
                    </div>
                    <Link href={`/experiences/${e.slug}`} className="px-6 py-2 rounded-md bg-gray-900 text-white text-sm font-semibold hover:bg-gray-800 transition-colors">
                      Buy now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Book your next Trip */}
      <section className="py-20 px-4 bg-wl-surface">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div className="relative h-72 md:h-96 rounded-2xl overflow-hidden shadow-md">
            <Image src={img(HERO_IMG)} alt="Book your next trip" fill className="object-cover" />
          </div>
          <div className="space-y-8">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">READY TO GET STARTED</p>
              <h2 className="text-3xl md:text-4xl font-light">Book your next Trip</h2>
            </div>
            <div className="space-y-4">
              {[
                { text: "Search & Discover", desc: "Explore thousands of activities and experiences handpicked for you" },
                { text: "Select & Customize", desc: "Personalize your selection with special dates, tour guides and special details" },
                { text: "Book & Confirm", desc: "Secure payment processing and instant confirmation. Get trip details sent to your email immediately" },
              ].map((item, idx) => (
                <div key={item.text} className="flex items-start gap-4 p-5 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="h-10 w-10 rounded-full bg-wl-primary text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {idx + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 text-sm mb-1">{item.text}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Discover tickets most popular places to visit */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light mb-12 text-center">Discover tickets most popular places to visit</h2>
          <div className="flex flex-wrap gap-3 justify-center mb-6">
            {MOCK.tags.slice(0, 20).map((t) => (
              <span key={t} className="px-4 py-2 bg-wl-surface rounded-full text-sm border border-gray-300 hover:bg-gray-100 transition cursor-pointer">{t}</span>
            ))}
          </div>
          <div className="flex gap-4 justify-center">
            <button className="px-6 py-2 bg-wl-primary text-white text-sm font-semibold rounded-full hover:opacity-90 transition">
              See more
            </button>
            <button className="px-6 py-2 bg-gray-200 text-gray-700 text-sm font-semibold rounded-full hover:bg-gray-300 transition">
              See less
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
