import Link from "next/link";
import { notFound } from "next/navigation";
const {
  getCreteLandingSlugs,
  getStoryblokExperienceCards,
  sortExperienceCardsForCrete,
} = require("../../../lib/storyblok/experienceCards");

const FALLBACK = "/images/figma/placeholder.jpg";

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
        <Link href={`/experiences/${item.slug}`} className="w-full h-8 bg-black text-white text-sm font-semibold rounded-md hover:bg-gray-800 transition mt-1 inline-flex items-center justify-center">
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
  const experiences = await getStoryblokExperienceCards({
    includeSlugs: getCreteLandingSlugs(),
    sortBy: sortExperienceCardsForCrete,
  });

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
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
        <div className="mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900">Best experiences for your stay</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {experiences.map((item, index) => (
            <ExperienceCard key={`${item.slug}-${index}`} item={item} />
          ))}
        </div>
      </section>
    </main>
  );
}
