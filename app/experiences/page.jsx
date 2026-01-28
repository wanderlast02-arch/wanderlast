import Link from "next/link";
import Image from "next/image";
import { FiClock, FiDollarSign } from "react-icons/fi";

export const metadata = {
  title: "Experiences - Wanderlast",
  description: "Discover authentic travel experiences around the world",
};

const EXPERIENCES = [
  {
    slug: "temple-meditation-thailand",
    name: "Buddhist Temple Meditation",
    destination: "Thailand",
    image: "/images/destinations/thailand-temple.svg",
    duration: "3 hours",
    price: 45,
    rating: 4.9,
  },
  {
    slug: "greek-island-cooking",
    name: "Greek Cooking Class",
    destination: "Greece",
    image: "/images/destinations/santorini.svg",
    duration: "4 hours",
    price: 65,
    rating: 4.8,
  },
  {
    slug: "peru-amazon-trek",
    name: "Amazon Jungle Trek",
    destination: "Peru",
    image: "/images/destinations/machu-picchu.svg",
    duration: "2 days",
    price: 280,
    rating: 4.9,
  },
  {
    slug: "japan-tea-ceremony",
    name: "Traditional Tea Ceremony",
    destination: "Japan",
    image: "/images/destinations/kyoto.svg",
    duration: "2 hours",
    price: 55,
    rating: 4.7,
  },
  {
    slug: "cambodia-angkor-temples",
    name: "Angkor Archaeological Tour",
    destination: "Cambodia",
    image: "/images/destinations/angkor-wat.svg",
    duration: "3 days",
    price: 320,
    rating: 4.9,
  },
  {
    slug: "myanmar-bagan-balloons",
    name: "Bagan Hot Air Balloon",
    destination: "Myanmar",
    image: "/images/destinations/bagan.svg",
    duration: "5 hours",
    price: 75,
    rating: 4.8,
  },
  {
    slug: "iceland-aurora-hunt",
    name: "Northern Lights Adventure",
    destination: "Iceland",
    image: "/images/placeholders/hero.svg",
    duration: "4 hours",
    price: 120,
    rating: 4.9,
  },
  {
    slug: "indonesia-batik-workshop",
    name: "Traditional Batik Workshop",
    destination: "Indonesia",
    image: "/images/placeholders/hero.svg",
    duration: "3 hours",
    price: 40,
    rating: 4.7,
  },
];

export default function ExperiencesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* HERO - Image-led */}
      <section className="relative min-h-96 flex items-center justify-center overflow-hidden mb-24">
        <Image
          src="/images/destinations/thailand-temple.svg"
          alt="All Experiences"
          fill
          sizes="100vw"
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative text-center text-white px-4">
          <h1 className="text-5xl md:text-6xl font-light leading-tight mb-4">
            All Experiences
          </h1>
          <p className="text-lg md:text-xl font-light opacity-95">
            Discover {EXPERIENCES.length} authentic experiences from around the world
          </p>
        </div>
      </section>

      {/* Experiences Grid - Image-first with minimal padding */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {EXPERIENCES.map((exp) => (
            <Link
              key={exp.slug}
              href={`/experiences/${exp.slug}`}
              className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all h-80"
            >
              <Image
                src={exp.image}
                alt={exp.name}
                fill
                sizes="(min-width: 1280px) 20vw, (min-width: 768px) 33vw, 100vw"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/45 transition-colors" />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="text-white font-semibold text-base mb-1">{exp.name}</h3>
                    <p className="text-white/80 text-xs mb-3">{exp.destination}</p>
                  </div>
                  <span className="text-yellow-300 text-sm font-semibold whitespace-nowrap ml-2">★ {exp.rating}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-white/90">
                  <div className="flex items-center gap-1">
                    <FiClock size={12} /> {exp.duration}
                  </div>
                  <div className="flex items-center gap-1 font-semibold">
                    <FiDollarSign size={12} /> {exp.price}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
