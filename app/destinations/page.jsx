import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
const { data } = require("../../lib/data");

export const metadata = {
  title: "Destinations - Wanderlast",
  description: "Explore authentic destinations around the world",
};

const FALLBACK = "/images/figma/placeholder.jpg";
const pickImage = (src) => src || FALLBACK;

export default function DestinationsPage() {
  const countries = data.listCountries();
  if (!countries) notFound();
  return (
    <div className="min-h-screen bg-white">
      {/* HERO - Image-led */}
      <section className="relative min-h-96 flex items-center justify-center overflow-hidden mb-24">
        <Image
          src="/images/destinations/santorini.svg"
          alt="All Destinations"
          fill
          sizes="100vw"
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative text-center text-white px-4">
          <h1 className="text-5xl md:text-6xl font-light leading-tight mb-4">
            All Destinations
          </h1>
          <p className="text-lg md:text-xl font-light opacity-95">
            Explore authentic experiences in {countries.length} incredible destinations worldwide
          </p>
        </div>
      </section>

      {/* Destinations Grid - Image-first with minimal padding */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {countries.map((country) => {
            const exps = data.listExperiences({ countrySlug: country.slug });
            const rating = exps.length
              ? (
                  exps.reduce((sum, e) => sum + (e.rating || 0), 0) / exps.length
                ).toFixed(1)
              : "4.8";
            return (
            <Link
              key={country.slug}
              href={`/destinations/${country.slug}`}
              className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all h-72"
            >
              <Image
                src={pickImage(country.heroImage)}
                alt={country.name}
                fill
                sizes="(min-width: 1280px) 20vw, (min-width: 768px) 33vw, 100vw"
                className="object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors" />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                <h3 className="text-white text-xl font-semibold mb-2">{country.name}</h3>
                <div className="flex justify-between items-center text-sm text-white/90">
                  <span>{exps.length} experiences</span>
                  <span>★ {rating}</span>
                </div>
              </div>
            </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
