// lib/data/mockProvider.js

const FALLBACK_IMAGE = "/images/figma/placeholder.jpg";
const pickImage = (p) => p || FALLBACK_IMAGE;

const countries = [
  {
    slug: "greece",
    name: "Greece",
    tagline: "Ancient history meets Mediterranean magic",
    heroImage: "/images/figma/country-greece.jpg",
  },
  {
    slug: "thailand",
    name: "Thailand",
    tagline: "Land of smiles, temples, and tropical escapes",
    heroImage: "/images/figma/country-thailand.jpg",
  },
];

const destinations = [
  {
    slug: "athens",
    name: "Athens",
    countrySlug: "greece",
    image: "/images/figma/destination-athens.jpg",
  },
  {
    slug: "santorini",
    name: "Santorini",
    countrySlug: "greece",
    image: "/images/figma/destination-santorini.jpg",
  },
  {
    slug: "bangkok",
    name: "Bangkok",
    countrySlug: "thailand",
    image: "/images/figma/destination-bangkok.jpg",
  },
];

const experiences = [
  {
    slug: "acropolis-walking-tour",
    title: "Acropolis & Ancient Agora Tour",
    countrySlug: "greece",
    destinationSlug: "athens",
    image: "/images/figma/experience-acropolis.jpg",
    price: 45,
    duration: "3 hours",
    rating: 4.9,
  },
  {
    slug: "caldera-sunset-catamaran",
    title: "Caldera Sunset by Catamaran",
    countrySlug: "greece",
    destinationSlug: "santorini",
    image: "/images/figma/experience-caldera.jpg",
    price: 120,
    duration: "5 hours",
    rating: 4.8,
  },
  {
    slug: "bangkok-street-food-tour",
    title: "Bangkok Street Food Night Tour",
    countrySlug: "thailand",
    destinationSlug: "bangkok",
    image: "/images/figma/experiences/bangkok-street-food.jpg",
    price: 35,
    duration: "4 hours",
    rating: 4.7,
  },
];

module.exports = {
  listCountries() {
    return countries.map((c) => ({ ...c, heroImage: pickImage(c.heroImage) }));
  },

  getCountry(slug) {
    const c = countries.find((c) => c.slug === slug);
    return c ? { ...c, heroImage: pickImage(c.heroImage) } : null;
  },

  listDestinations(countrySlug) {
    const list = countrySlug
      ? destinations.filter((d) => d.countrySlug === countrySlug)
      : destinations;
    return list.map((d) => ({ ...d, image: pickImage(d.image) }));
  },

  getDestination(countrySlug, destinationSlug) {
    const d =
      destinations.find(
        (d) => d.countrySlug === countrySlug && d.slug === destinationSlug
      ) || null;
    return d ? { ...d, image: pickImage(d.image) } : null;
  },

  listExperiences({ countrySlug, destinationSlug } = {}) {
    return experiences
      .filter((e) => {
        if (countrySlug && e.countrySlug !== countrySlug) return false;
        if (destinationSlug && e.destinationSlug !== destinationSlug) return false;
        return true;
      })
      .map((e) => ({ ...e, image: pickImage(e.image) }));
  },

  getExperience(slug) {
    const e = experiences.find((e) => e.slug === slug) || null;
    return e ? { ...e, image: pickImage(e.image) } : null;
  },
};
