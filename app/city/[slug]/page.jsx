import Link from "next/link";
import { notFound } from "next/navigation";

const FALLBACK = "/images/figma/placeholder.jpg";
const STORYBLOK_EXPERIENCE_FALLBACK = "/images/placeholder.jpg";

function normalizeHighlights(highlights) {
  if (Array.isArray(highlights)) {
    return highlights
      .map((item) => {
        if (typeof item === "string") return item;
        if (item && typeof item.text === "string") return item.text;
        return null;
      })
      .filter(Boolean);
  }

  if (typeof highlights === "string") {
    return highlights
      .split(/\r?\n/)
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
}

async function getExperiences() {
  const token = process.env.STORYBLOK_API_TOKEN || process.env.NEXT_PUBLIC_STORYBLOK_API_TOKEN;

  if (!token) {
    console.error("Missing Storyblok token for city experiences");
    return [];
  }

  try {
    let stories = [];

    for (const startsWith of ["experiences/", "experience/"]) {
      const params = new URLSearchParams({
        starts_with: startsWith,
        version: "draft",
        token,
      });

      const res = await fetch(`https://api.storyblok.com/v2/cdn/stories?${params.toString()}`, {
        next: { revalidate: 60 },
      });

      if (!res.ok) {
        continue;
      }

      const data = await res.json();
      if (Array.isArray(data.stories) && data.stories.length) {
        stories = data.stories;
        break;
      }
    }

    if (!stories.length) {
      console.error("Storyblok experiences fetch returned no stories");
      return [];
    }

    return stories
      .filter((story) => story?.content?.status === "active")
      .map((story) => ({
        title: story.content.title,
        image: story.content.cover_image?.filename || STORYBLOK_EXPERIENCE_FALLBACK,
        price: story.content.price,
        description: story.content.short_description,
        highlights: normalizeHighlights(story.content.highlights),
      }));
  } catch (error) {
    console.error("Error fetching Storyblok experiences:", error);
    return [];
  }
}

function safeImg(src, fallback = FALLBACK) {
  if (!src || !src.trim().length) return fallback;
  if (!src.includes("/")) src = `/images/figma/${src}`;
  return src.replace(/ /g, "%20");
}

const CITY_MOCKS = {
  bangkok: {
    slug: "bangkok",
    name: "Bangkok",
    country: "Thailand",
    heroImage: "/images/figma/city/bangkok/hero.jpg",
    mapImage: "/images/figma/city/bangkok/map.jpg",
    intro:
      "Discover top attractions, local experiences, and unforgettable moments — curated by real travelers, locals, and experts.",
    topThingsFilters: ["All", "Culture", "Food & Dining", "Shopping", "Family", "Nightlife"],
    topThings: [
      {
        slug: "ancient-city-erawan",
        title: "Ancient City & Erawan Museum",
        price: 72,
        rating: 4.8,
        image: "/images/figma/city/bangkok/top-things/ancient-city-erawan.jpg",
      },
      {
        slug: "mahankhon-skywalk",
        title: "Mahanakhon Skywalk",
        price: 26,
        rating: 4.7,
        image: "/images/figma/city/bangkok/top-things/mahankhon-skywalk.jpg",
      },
      {
        slug: "chao-phraya-cruise",
        title: "Chao Phraya River Cruise",
        price: 37,
        rating: 4.9,
        image: "/images/figma/city/bangkok/top-things/chao-phraya-cruise.jpg",
      },
      {
        slug: "damnoen-saduak",
        title: "Damnoen Saduak Floating Market",
        price: 38,
        rating: 4.8,
        image: "/images/figma/city/bangkok/top-things/damnoen-saduak.jpg",
      },
    ],
    attractions: [
      {
        slug: "grand-palace",
        title: "The Grand Palace",
        price: 33,
        rating: 4.9,
        image: "/images/figma/city/bangkok/attractions/grand-palace.jpg",
      },
      {
        slug: "wat-arun",
        title: "Wat Arun (Temple of Dawn)",
        price: 21,
        rating: 4.8,
        image: "/images/figma/city/bangkok/attractions/wat-arun.jpg",
      },
      {
        slug: "chatuchak",
        title: "Chatuchak Weekend Market",
        price: 18,
        rating: 4.7,
        image: "/images/figma/city/bangkok/attractions/chatuchak.jpg",
      },
      {
        slug: "khao-san",
        title: "Khao San Road Night Walk",
        price: 16,
        rating: 4.6,
        image: "/images/figma/city/bangkok/attractions/khao-san.jpg",
      },
    ],
    categories: [
      {
        slug: "hotels",
        title: "Hotels",
        image: "/images/figma/city/bangkok/categories/hotels.jpg",
      },
      {
        slug: "transport",
        title: "Transport",
        image: "/images/figma/city/bangkok/categories/transport.jpg",
      },
      {
        slug: "food-dining",
        title: "Food & Dining",
        image: "/images/figma/city/bangkok/categories/food-dining.jpg",
      },
      {
        slug: "events-shows",
        title: "Events & Shows",
        image: "/images/figma/city/bangkok/categories/events-shows.jpg",
      },
    ],
    travelBasics: [
      {
        slug: "airport-transfer",
        title: "Getting from the Airport",
        date: "Feb 12, 2026",
        readTime: "4 min",
        image: "/images/figma/city/bangkok/articles/airport.jpg",
      },
      {
        slug: "safety-tips",
        title: "Safety Tips in Bangkok",
        date: "Feb 08, 2026",
        readTime: "5 min",
        image: "/images/figma/city/bangkok/articles/safety.jpg",
      },
      {
        slug: "best-time",
        title: "Best Time to Visit",
        date: "Feb 02, 2026",
        readTime: "6 min",
        image: "/images/figma/city/bangkok/articles/best-time.jpg",
      },
      {
        slug: "where-to-stay",
        title: "Where to Stay in Bangkok",
        date: "Jan 30, 2026",
        readTime: "5 min",
        image: "/images/figma/city/bangkok/articles/where-to-stay.jpg",
      },
    ],
    reviews: [
      { name: "Maya L.", rating: 5, text: "Perfect for our first time in Bangkok — easy to book and unforgettable." },
      { name: "Lucas T.", rating: 4.9, text: "Authentic experiences with great local insights. Highly recommend." },
      { name: "Sofia P.", rating: 4.8, text: "Loved the river cruise and street food tour. Will come back!" },
      { name: "Ava K.", rating: 4.7, text: "Smooth planning and great value across all activities." },
    ],
    quickFacts: {
      currency: "THB (Thai Baht)",
      language: "Thai",
      timezone: "GMT+7",
      bestTime: "Nov – Feb",
      localWeather: "30° / 24°",
      transport: "BTS, MRT, Taxi",
    },
    whatToKnow: [
      {
        title: "Dress modestly at temples",
        desc: "Cover shoulders and knees when visiting sacred sites such as Wat Arun or the Grand Palace.",
      },
      {
        title: "Use BTS/MRT to avoid traffic",
        desc: "Bangkok traffic can be heavy; the Skytrain and Metro are often the fastest options.",
      },
      {
        title: "Carry small cash",
        desc: "Street markets and local vendors often prefer cash for quick payments.",
      },
    ],
    nearbyCities: [
      { slug: "ko-chang", name: "Ko Chang", image: "/images/figma/city/bangkok/nearby/ko-chang.jpg" },
      { slug: "hat-yai", name: "Hat Yai", image: "/images/figma/city/bangkok/nearby/hat-yai.jpg" },
      { slug: "satun", name: "Satun", image: "/images/figma/city/bangkok/nearby/satun.jpg" },
      { slug: "pak-chong", name: "Pak Chong", image: "/images/figma/city/bangkok/nearby/pak-chong.jpg" },
      { slug: "chumphon", name: "Chumphon", image: "/images/figma/city/bangkok/nearby/chumphon.jpg" },
      { slug: "mae-hong-son", name: "Mae Hong Son", image: "/images/figma/city/bangkok/nearby/mae-hong-son.jpg" },
    ],
    popularChips: [
      "Top things to do",
      "Top attractions",
      "Food tours",
      "River cruise",
      "Night markets",
      "Temple visits",
      "Family friendly",
      "Shopping",
    ],
  },
};

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-1 text-xs text-gray-600">
      <span className="text-amber-400">★</span>
      <span className="font-medium">{rating}</span>
    </div>
  );
}

function ExperienceCard({ item }) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow border border-gray-200">
      <div className="relative h-40 sm:h-44 bg-gray-200 overflow-hidden">
        <img src={safeImg(item.image)} alt={item.title} className="w-full h-full object-cover" />
        <div className="absolute top-2 left-2 bg-black text-white px-2 py-1 text-xs font-bold rounded">TOP</div>
        <div className="absolute top-2 right-2 text-lg cursor-pointer hover:scale-110 transition-transform">♡</div>
      </div>
      <div className="p-3 flex flex-col gap-2">
        <h3 className="text-[13px] font-semibold text-gray-900 line-clamp-2">{item.title}</h3>
        <div className="flex justify-between items-start gap-2">
          <StarRating rating={item.rating} />
          <span className="text-sm font-medium text-gray-900 whitespace-nowrap">from ${item.price}</span>
        </div>
        <Link href="/experiences" className="w-full h-8 bg-black text-white text-sm font-semibold rounded-md hover:bg-gray-800 transition mt-1 inline-flex items-center justify-center">
          Buy now
        </Link>
      </div>
    </div>
  );
}

export async function generateMetadata({ params }) {
  const city = CITY_MOCKS[params.slug];
  if (!city) return { title: "City Not Found" };
  return {
    title: `${city.name} — Wanderlast`,
    description: city.intro,
    openGraph: {
      title: `${city.name} — Wanderlast`,
      description: city.intro,
      image: city.heroImage,
    },
  };
}

export default async function CityPage({ params }) {
  const city = CITY_MOCKS[params.slug];
  const experiences = await getExperiences();

  if (!city) notFound();

  return (
    <main className="bg-white text-wl-text overflow-x-hidden">
      <section className="relative w-full min-h-[42vh] sm:min-h-[60vh] flex items-end overflow-hidden">
        <img src={safeImg(city.heroImage)} alt={`${city.name} hero`} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/20 to-black/50" />
        <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-6 sm:pb-10 relative z-10">
          <p className="text-white/80 text-xs uppercase tracking-[0.2em] mb-2">{city.country}</p>
          <h1 className="text-white text-3xl sm:text-5xl font-light leading-tight mb-3">Things To Do in {city.name}</h1>
          <p className="text-white/90 text-sm sm:text-base max-w-2xl">{city.intro}</p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-xs text-gray-500">
        <Link href="/" className="hover:text-gray-700">Home</Link> /{" "}
        <Link href="/destinations/thailand" className="hover:text-gray-700">Thailand</Link> /{" "}
        <span className="text-gray-700 font-medium">{city.name}</span>
      </div>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 mb-4">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Top things to do in {city.name}</h2>
          <Link href="/experiences" className="text-xs sm:text-sm text-wl-primary hover:opacity-80">View all offers</Link>
        </div>

        <div className="flex gap-4 overflow-x-auto whitespace-nowrap pb-2 scrollbar-hide snap-x snap-mandatory">
          {city.topThingsFilters.map((tab) => (
            <button
              key={tab}
              className="px-4 py-2 rounded-full text-xs font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition flex-shrink-0 snap-start"
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {experiences.map((item, index) => (
            <ExperienceCard key={`${item.title}-${index}`} item={{ ...item, rating: 4.8 }} />
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 mb-4">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Top attractions in {city.name}</h2>
          <Link href="/experiences" className="text-xs sm:text-sm text-wl-primary hover:opacity-80">Explore all</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {city.attractions.map((item) => (
            <ExperienceCard key={item.slug} item={item} />
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 mb-4">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Experiences by category</h2>
          <Link href="/experiences" className="text-xs sm:text-sm text-wl-primary hover:opacity-80">Explore all categories</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {city.categories.map((cat) => (
            <div key={cat.slug} className="relative rounded-xl overflow-hidden shadow-sm border border-gray-200">
              <div className="relative h-40 sm:h-44 bg-gray-200">
                <img src={safeImg(cat.image)} alt={cat.title} className="w-full h-full object-cover" />
              </div>
              <div className="absolute inset-0 bg-black/25" />
              <div className="absolute inset-0 flex items-center justify-center text-white font-semibold text-sm">
                {cat.title}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 mb-4">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Travel Basics</h2>
          <Link href="/experiences" className="text-xs sm:text-sm text-wl-primary hover:opacity-80">Read all articles</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {city.travelBasics.map((article) => (
            <div key={article.slug} className="rounded-xl overflow-hidden shadow-sm border border-gray-200 bg-white">
              <div className="relative h-40 sm:h-44 bg-gray-200">
                <img src={safeImg(article.image)} alt={article.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-3">
                <p className="text-[11px] text-gray-500 mb-2">{article.date} • {article.readTime}</p>
                <h3 className="text-sm font-semibold text-gray-900 mb-2">{article.title}</h3>
                <Link href="/experiences" className="text-xs text-wl-primary">Read more</Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 mb-4">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900">What Travelers Are Saying</h2>
          <Link href="/experiences" className="text-xs sm:text-sm text-wl-primary hover:opacity-80">Read all reviews</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {city.reviews.map((review, idx) => (
            <div key={idx} className="rounded-xl border border-gray-200 p-4 bg-white">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-amber-400 text-xs">★</span>
                <span className="text-xs font-medium text-gray-700">{review.rating}</span>
              </div>
              <p className="text-sm font-semibold text-gray-900 mb-2">{review.name}</p>
              <p className="text-sm text-gray-600">{review.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="rounded-xl border border-gray-200 p-5">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick facts about {city.name}</h3>
            <ul className="text-sm text-gray-700 space-y-2">
              <li><span className="font-medium">Local weather:</span> {city.quickFacts.localWeather}</li>
              <li><span className="font-medium">Currency:</span> {city.quickFacts.currency}</li>
              <li><span className="font-medium">Language:</span> {city.quickFacts.language}</li>
              <li><span className="font-medium">Time zone:</span> {city.quickFacts.timezone}</li>
              <li><span className="font-medium">Best time:</span> {city.quickFacts.bestTime}</li>
              <li><span className="font-medium">Transport:</span> {city.quickFacts.transport}</li>
            </ul>
          </div>
          <div className="rounded-xl overflow-hidden border border-gray-200">
            <img src={safeImg(city.mapImage)} alt={`${city.name} map`} className="w-full h-56 sm:h-72 lg:h-96 object-cover" />
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">What to know before visiting {city.name}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {city.whatToKnow.map((tip) => (
            <div key={tip.title} className="rounded-xl border border-gray-200 p-4 bg-white">
              <h3 className="text-sm font-semibold text-gray-900 mb-2">{tip.title}</h3>
              <p className="text-sm text-gray-600">{tip.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 mb-4">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Try Other Cities in Thailand</h2>
          <Link href="/experiences" className="text-xs sm:text-sm text-wl-primary hover:opacity-80">View all cities</Link>
        </div>
        <div className="flex gap-4 overflow-x-auto whitespace-nowrap pb-2 scrollbar-hide sm:flex-wrap sm:overflow-visible">
          {city.nearbyCities.map((c) => (
            <div key={c.slug} className="flex-shrink-0 text-center">
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden shadow-sm border border-white">
                <img src={safeImg(c.image)} alt={c.name} className="w-full h-full object-cover" />
              </div>
              <p className="text-xs font-medium text-gray-900 mt-2">{c.name}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Discover most popular places to visit in {city.name}</h2>
        <div className="flex gap-4 overflow-x-auto whitespace-nowrap pb-2 scrollbar-hide snap-x snap-mandatory">
          {city.popularChips.map((chip) => (
            <button key={chip} className="px-4 py-2 rounded-full border border-gray-300 text-xs font-medium text-gray-700 bg-white hover:bg-gray-50 transition flex-shrink-0 snap-start">
              {chip}
            </button>
          ))}
        </div>
      </section>
    </main>
  );
}
