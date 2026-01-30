// FIGMA_LOCK — Experience Detail MVP (mock data)
// Structure: Hero → Sticky Action Bar → Overview → Sustainability → Included/Not Included → Itinerary → Reviews → Host Card → Related

import Link from "next/link";

const FALLBACK = "/images/figma/placeholder.jpg";

// Safe image resolver: blocks problematic paths, URL-encodes spaces
function safeImg(src, fallback = FALLBACK) {
  if (!src || !src.trim().length) return fallback;

  const blocked = ["color palette", "home page", "press-logos"];
  if (blocked.some((b) => src.toLowerCase().includes(b))) return fallback;

  if (!src.includes("/")) src = `/images/figma/${src}`;

  return src.replace(/ /g, "%20");
}

// Mock experience data
const EXPERIENCES_DB = {
  "bangkok-street-food-tour": {
    id: "bangkok-street-food-tour",
    title: "Bangkok Street Food Tour",
    location: "Bangkok, Thailand",
    price: 38,
    rating: 4.8,
    reviewCount: 124,
    image: "/images/figma/experiences/bangkok-street-food.jpg",
    type: "Small group",
    guide: "Local guide",
    description: [
      "Experience the vibrant heart of Bangkok's street food culture on this immersive evening walking tour. Led by a licensed local guide, you'll explore the bustling lanes of Chinatown, discovering hidden food stalls and family-owned vendors that have served locals for generations.",
      "This isn't a typical tourist experience—we keep groups small (max 8 people) to ensure an authentic, personalized encounter. You'll taste regional specialties, learn the stories behind each dish, and connect with the vendors who have dedicated their lives to their craft.",
      "Perfect for food lovers and adventurous travelers, this tour showcases why Bangkok is one of the world's greatest food cities, while supporting small businesses and sustainable travel practices.",
    ],
    highlights: {
      included: ["Food tastings (6-8 items)", "Local guide", "Cultural insights", "Walking tour", "Reusable water bottle"],
      notIncluded: ["Hotel pickup", "Alcoholic drinks", "Travel insurance", "Photography guide"],
    },
    itinerary: [
      { time: "18:00", title: "Meet in Chinatown", desc: "Gather at the entrance of Sampeng Lane market. Your guide will brief you on the evening ahead." },
      { time: "18:30", title: "Street Food Tasting", desc: "Sample pad Thai from a family-run stall, followed by fresh spring rolls and local snacks." },
      { time: "19:30", title: "Neighborhood Walk", desc: "Stroll through hidden alleyways and learn about the history and culture of Old Bangkok." },
      { time: "20:00", title: "Sweet Finish", desc: "Enjoy local desserts including mango sticky rice and Thai custard (khao tom mud)." },
      { time: "21:30", title: "Tour Ends", desc: "We'll part ways in the heart of Chinatown. You're welcome to stay and explore!" },
    ],
    sustainability: [
      "Led by locally licensed guides who live and work in Bangkok",
      "100% of tips support the family-owned food vendors we visit",
      "Small groups (max 8) to minimize impact on local neighborhoods",
      "Walk-based tour—zero carbon emissions from transportation",
      "We use reusable water bottles and minimize single-use plastic",
    ],
    guide: {
      name: "Somchai",
      role: "Licensed Local Guide",
      location: "Bangkok, Thailand",
      bio: "Somchai has been guiding food tours for 8 years and is a true Bangkok native. His passion for street food and local culture is infectious, and he's known for his warm hospitality and deep knowledge of Chinatown's hidden gems.",
    },
    reviews: [
      {
        id: 1,
        name: "Emma M.",
        rating: 5,
        text: "Absolutely incredible! Somchai made us feel like locals, not tourists. The food was authentic and delicious.",
      },
      {
        id: 2,
        name: "James K.",
        rating: 4.8,
        text: "Best food experience in Southeast Asia. The small group size made it personal and fun. Would do it again!",
      },
      {
        id: 3,
        name: "Sofia P.",
        rating: 4.7,
        text: "A real window into Bangkok street culture. Somchai's stories about each vendor brought everything to life.",
      },
    ],
    related: [
      {
        id: "grand-palace-tour",
        title: "Grand Palace Tour",
        price: 42,
        rating: 4.9,
        reviewCount: 295,
        image: "/images/figma/experiences/grand-palace-tour.jpg",
      },
      {
        id: "floating-markets",
        title: "Floating Markets Experience",
        price: 55,
        rating: 4.8,
        reviewCount: 168,
        image: "/images/figma/experiences/floating-markets.jpg",
      },
      {
        id: "cooking-school",
        title: "Thai Cooking Class",
        price: 45,
        rating: 4.9,
        reviewCount: 156,
        image: "/images/figma/experiences/cooking-school.jpg",
      },
    ],
  },
};

// Reusable review card
function ReviewCard({ review }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <div className="flex items-start gap-3 mb-3">
        <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex-shrink-0" />
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-gray-900">{review.name}</h3>
          <div className="flex items-center gap-1 mt-1">
            <span className="text-amber-400 text-xs">★</span>
            <span className="text-xs text-gray-600">{review.rating}</span>
          </div>
        </div>
      </div>
      <p className="text-sm text-gray-700 leading-relaxed">{review.text}</p>
    </div>
  );
}

// Reusable related experience card
function RelatedCard({ exp }) {
  return (
    <Link href={`/experiences/${exp.id}`} className="block group">
      <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow border border-gray-200">
        {/* Image */}
        <div className="relative h-40 bg-gray-200 overflow-hidden">
          <img
            src={safeImg(exp.image)}
            alt={exp.title}
            className="w-full h-full object-cover group-hover:brightness-110 transition-all"
          />
          <div className="absolute top-2 left-2 bg-black text-white px-2 py-1 text-xs font-bold rounded">TOP</div>
        </div>
        {/* Content */}
        <div className="p-3 flex flex-col gap-2">
          <h3 className="text-[13px] font-semibold text-gray-900 line-clamp-2">{exp.title}</h3>
          <div className="flex justify-between items-start gap-2">
            <div className="flex items-center gap-1">
              <span className="text-amber-400 text-xs">★</span>
              <span className="text-xs font-medium text-gray-500">{exp.rating}</span>
              <span className="text-[11px] text-gray-400">({exp.reviewCount})</span>
            </div>
            <span className="text-sm font-medium text-gray-900">from ${exp.price}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export async function generateMetadata({ params }) {
  const experience = EXPERIENCES_DB[params.slug];
  if (!experience) return { title: "Experience Not Found" };

  return {
    title: experience.title,
    description: experience.description[0],
    openGraph: {
      title: experience.title,
      description: experience.description[0],
      image: experience.image,
    },
  };
}

export default function ExperiencePage({ params }) {
  const experience = EXPERIENCES_DB[params.slug];
  
  // Show "Experience not found" state for unknown slugs (not a 404)
  if (!experience) {
    return (
      <main className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <h1 className="text-4xl font-semibold text-gray-900 mb-4">Experience not found</h1>
          <p className="text-gray-600 mb-8">The experience you're looking for isn't available right now. Please check the URL or browse other experiences.</p>
          <Link href="/" className="inline-block px-6 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition">
            Back to home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main>
      {/* ========== SECTION 1: HERO ========== */}
      <section className="relative w-full min-h-[60vh] flex items-end px-4 overflow-hidden bg-gray-900">
        {/* Background image */}
        <img
          src={safeImg(experience.image || "/images/figma/placeholder.jpg")}
          alt={experience.title}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/50" />

        {/* Content */}
        <div className="max-w-6xl mx-auto w-full relative z-10 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end">
            {/* Left: Title + Meta */}
            <div className="md:col-span-2">
              <h1 className="text-5xl md:text-6xl font-semibold tracking-tight text-white drop-shadow-lg mb-8">
                {experience.title}
              </h1>

              {/* Meta row */}
              <div className="flex flex-wrap gap-6 text-white/90">
                <div className="flex items-center gap-2">
                  <span className="text-amber-400">★</span>
                  <span className="text-sm font-medium">
                    {experience.rating} ({experience.reviewCount} reviews)
                  </span>
                </div>
                <span className="text-sm">{experience.location}</span>
                <span className="text-sm">{experience.type}</span>
                <span className="text-sm">{experience.guide.role}</span>
              </div>
            </div>

            {/* Right: Price Badge */}
            <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg text-center">
              <p className="text-xs text-gray-600 mb-2">Starting price</p>
              <p className="text-2xl font-bold text-gray-900">From ${experience.price}</p>
              <p className="text-xs text-gray-600 mt-1">per person</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== SECTION 2: STICKY ACTION BAR (Desktop only) ========== */}
      <div className="hidden lg:block sticky top-[72px] z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <p className="text-xs text-gray-600">From</p>
            <p className="text-2xl font-bold text-gray-900">${experience.price}/person</p>
          </div>
          <button className="px-8 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition">
            Reserve a spot
          </button>
        </div>
      </div>

      {/* ========== SECTION 3: EXPERIENCE OVERVIEW ========== */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-normal text-gray-900 mb-5">About this experience</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {experience.description.map((para, idx) => (
                <p key={idx} className="text-gray-700 leading-loose mb-6 text-base">
                  {para}
                </p>
              ))}
            </div>
            {/* Side info box */}
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 h-fit">
              <h3 className="text-sm font-medium text-gray-900 mb-4">Quick facts</h3>
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex gap-2">
                  <span className="text-gray-400">•</span>
                  <span>Duration: 3.5 hours</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-gray-400">•</span>
                  <span>Group size: Up to 8 people</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-gray-400">•</span>
                  <span>Level: Easy (walking tour)</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-gray-400">•</span>
                  <span>Language: English</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ========== SECTION 4: SUSTAINABILITY & LOCAL IMPACT ========== */}
      <section className="py-16 px-4 bg-green-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-normal text-gray-900 mb-5">Local impact & sustainability</h2>
          <p className="text-gray-700 mb-8 max-w-3xl">
            We believe travel should benefit local communities. This tour is designed to support family-owned vendors and reduce environmental impact while giving you an authentic, memorable experience.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {experience.sustainability.map((item, idx) => (
              <div key={idx} className="flex gap-4">
                <div className="text-green-600 text-2xl flex-shrink-0">✓</div>
                <p className="text-gray-700 text-base">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== SECTION 5: WHAT'S INCLUDED / NOT INCLUDED ========== */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-normal text-gray-900 mb-12">What's included</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Included */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-6">In your experience</h3>
              <ul className="space-y-4">
                {experience.highlights.included.map((item, idx) => (
                  <li key={idx} className="flex gap-3">
                    <span className="text-green-600 font-bold flex-shrink-0">✓</span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Not Included */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-6">Not included</h3>
              <ul className="space-y-4">
                {experience.highlights.notIncluded.map((item, idx) => (
                  <li key={idx} className="flex gap-3">
                    <span className="text-gray-400">–</span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ========== SECTION 6: ITINERARY ========== */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-normal text-gray-900 mb-12">Itinerary</h2>
          <div className="space-y-0">
            {experience.itinerary.map((stop, idx) => (
              <div key={idx} className="flex gap-6 pb-8 border-b border-gray-200 last:border-b-0">
                {/* Time badge */}
                <div className="flex-shrink-0 w-20">
                  <div className="bg-white border border-gray-300 rounded-lg py-2 px-3 text-center">
                    <p className="text-sm font-semibold text-gray-900">{stop.time}</p>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 pt-2">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{stop.title}</h3>
                  <p className="text-gray-700 text-sm">{stop.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== SECTION 7: REVIEWS PREVIEW ========== */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-normal text-gray-900 mb-12">What guests say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {experience.reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </div>
      </section>

      {/* ========== SECTION 8: HOST / GUIDE CARD ========== */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-normal text-gray-900 mb-12">Meet your guide</h2>
          <div className="bg-white border border-gray-200 rounded-xl p-8 max-w-xl">
            <div className="flex items-start gap-6">
              {/* Avatar */}
              <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex-shrink-0" />

              {/* Info */}
              <div className="flex-1">
                <h3 className="text-2xl font-semibold text-gray-900">{experience.guide.name}</h3>
                <p className="text-sm text-gray-600 mt-1">
                  {experience.guide.role} · {experience.guide.location}
                </p>
                <p className="text-gray-700 mt-4 leading-relaxed text-base">{experience.guide.bio}</p>

                {/* Stats */}
                <div className="flex gap-6 mt-6 pt-6 border-t border-gray-200">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">8+</p>
                    <p className="text-xs text-gray-600">Years guiding</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">400+</p>
                    <p className="text-xs text-gray-600">Happy travelers</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== SECTION 9: RELATED EXPERIENCES ========== */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-normal text-gray-900 mb-12">Similar experiences</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {experience.related.map((exp) => (
              <RelatedCard key={exp.id} exp={exp} />
            ))}
          </div>
        </div>
      </section>

      {/* ========== MOBILE CTA BAR (Fixed bottom) ========== */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg p-4 z-40">
        <div className="flex gap-4 items-center">
          <div>
            <p className="text-xs text-gray-600">From</p>
            <p className="text-xl font-bold text-gray-900">${experience.price}</p>
          </div>
          <button className="flex-1 px-4 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition">
            Reserve
          </button>
        </div>
      </div>

      {/* Spacer for mobile fixed bar */}
      <div className="lg:hidden h-20" />
    </main>
  );
}
