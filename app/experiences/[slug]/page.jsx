// FIGMA_LOCK — Experience Detail MVP (mock data)
// Structure: Hero → Sticky Action Bar → Overview → Sustainability → Included/Not Included → Itinerary → Reviews → Host Card → Related

import Link from "next/link";
import { notFound } from "next/navigation";
import ExperienceStoryblokPreview from "../../../components/ExperienceStoryblokPreview";
import { isStoryblokPreview } from "../../../lib/storyblok/isPreview";

const FALLBACK = "/images/figma/placeholder.jpg";

function normalizeAssetList(value) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => {
      if (typeof item === "string") {
        return item;
      }

      if (item?.filename) {
        return item.filename;
      }

      return null;
    })
    .filter(Boolean);
}

function normalizeNumber(value) {
  if (typeof value === "number") {
    return value;
  }

  if (typeof value === "string") {
    const parsed = Number(value.replace(/[^\d.]/g, ""));
    return Number.isFinite(parsed) ? parsed : null;
  }

  return null;
}

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

function normalizeTagList(items) {
  if (!Array.isArray(items)) {
    return normalizeList(items);
  }

  return items
    .map((item) => {
      if (typeof item === "string") return item;
      if (item?.label) return item.label;
      if (item?.text) return item.text;
      if (item?.title) return item.title;
      if (item?.content?.label) return item.content.label;
      if (item?.content?.text) return item.content.text;
      return null;
    })
    .filter(Boolean);
}

function normalizeFacts(items) {
  if (!Array.isArray(items)) {
    return [];
  }

  return items
    .map((item) => {
      const content = item?.content || item;
      if (!content?.label || !content?.value) {
        return null;
      }

      return {
        label: content.label,
        value: content.value,
      };
    })
    .filter(Boolean);
}

function normalizeItineraryBlocks(items) {
  if (!Array.isArray(items)) {
    return normalizeItinerary(items);
  }

  return items
    .map((item, index) => {
      const content = item?.content || item;
      const title = content?.title?.trim();
      const desc = content?.description?.trim();

      if (!title && !desc) {
        return null;
      }

      return {
        time: content?.time?.trim() || `${index + 1}`.padStart(2, "0") + ":00",
        title: title || `Stop ${index + 1}`,
        desc: desc || title || "",
      };
    })
    .filter(Boolean);
}

function normalizeReviews(items) {
  if (!Array.isArray(items)) {
    return [];
  }

  return items
    .map((item, index) => {
      const content = item?.content || item;
      if (!content?.name && !content?.text) {
        return null;
      }

      return {
        id: item?._uid || index + 1,
        name: content.name || `Guest ${index + 1}`,
        rating: content.rating || 5,
        text: content.text || "",
      };
    })
    .filter(Boolean);
}

function extractRichTextText(node) {
  if (!node) return "";

  if (typeof node === "string") {
    return node;
  }

  if (Array.isArray(node)) {
    return node.map(extractRichTextText).filter(Boolean).join("\n");
  }

  if (typeof node.text === "string") {
    return node.text;
  }

  if (Array.isArray(node.content)) {
    return node.content
      .map(extractRichTextText)
      .filter(Boolean)
      .join(node.type === "paragraph" ? "" : "\n");
  }

  return "";
}

function normalizeParagraphs(value) {
  const text = typeof value === "string" ? value : extractRichTextText(value);

  return text
    .split(/\n{2,}|\r\n\r\n/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function normalizeList(value) {
  if (Array.isArray(value)) {
    return value.map((item) => `${item}`.trim()).filter(Boolean);
  }

  const text = typeof value === "string" ? value : extractRichTextText(value);

  return text
    .split(/\r?\n|,/)
    .map((item) => item.replace(/^[\-•\*]\s*/, "").trim())
    .filter(Boolean);
}

function normalizeItinerary(value) {
  const items = normalizeParagraphs(value);

  return items.map((item, index) => {
    const [title, ...rest] = item.split(/[:\-]\s+/);
    return {
      time: `${index + 1}`.padStart(2, "0") + ":00",
      title: rest.length ? title.trim() : `Stop ${index + 1}`,
      desc: rest.length ? rest.join(": ").trim() : item,
    };
  });
}

const DEFAULT_EXPERIENCE_CONTENT = {
  location: "Bangkok, Thailand",
  price: 38,
  priceDisplay: "$38",
  rating: 4.8,
  reviewCount: 124,
  type: "Small group",
  duration: "3.5 hours",
  storyHighlights: ["Small group experience", "Local verified partner", "Curated by Wanderlast"],
  trustText: "Curated by Galini Beach Hotel\nTested local partners\nFast response booking",
  urgencyText: "Usually booked 2-3 days in advance",
  facts: [
    { label: "Duration", value: "3.5 hours" },
    { label: "Group size", value: "Up to 8 people" },
    { label: "Level", value: "Easy (walking tour)" },
    { label: "Language", value: "English" },
  ],
  description: [
    "Experience the vibrant heart of Bangkok's street food culture on this immersive evening walking tour. Led by a licensed local guide, you'll explore the bustling lanes of Chinatown, discovering hidden food stalls and family-owned vendors that have served locals for generations.",
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
    image: "",
    yearsGuiding: "8+",
    happyTravelers: "400+",
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
};

async function getExperience(slug) {
  const story = await getExperienceStory(slug);

  if (!story) {
    return null;
  }

  try {
    const data = { story };
    const experience = {
      title: data.story.content.title,
      images: normalizeAssetList(data.story.content.images),
      image:
        data.story.content.images?.[0]?.filename ||
        data.story.content.cover_image?.filename ||
        data.story.content.hero_image?.filename ||
        "/images/placeholder.jpg",
      location: data.story.content.location,
      rating: data.story.content.rating,
      reviewCount: data.story.content.reviews_count,
      price: normalizeNumber(data.story.content.price) ?? normalizeNumber(data.story.content.price_display),
      priceDisplay: data.story.content.price_display,
      groupType: data.story.content.group_type,
      description: data.story.content.short_description || data.story.content.about_experience,
      highlights: normalizeHighlights(data.story.content.highlights),
      trustText: data.story.content.trust_text || data.story.content.availability_notes,
      urgencyText: data.story.content.urgency_text || data.story.content.availability_notes,
      facts: normalizeFacts(data.story.content.facts),
      included: normalizeTagList(data.story.content.included_items || data.story.content.included || data.story.content.highlights),
      notIncluded: normalizeTagList(data.story.content.not_included_items || data.story.content.not_included || data.story.content.excluded_items),
      itinerary: normalizeItineraryBlocks(data.story.content.itinerary),
      duration: data.story.content.duration,
      sustainability: normalizeList(data.story.content.sustainability_points),
      guideName: data.story.content.guide_name,
      guideDescription: data.story.content.guide_description,
      guideImage: data.story.content.guide_image?.filename,
      guideYears: data.story.content.guide_years,
      happyTravelers: data.story.content.happy_travelers,
      reviews: normalizeReviews(data.story.content.reviews),
      ctaText: data.story.content.call_to_action_text,
      seoTitle: data.story.content.seo_title,
      seoDescription: data.story.content.seo_description,
    };

    return {
      ...DEFAULT_EXPERIENCE_CONTENT,
      id: slug,
      title: experience.title,
      image: experience.image,
      location: experience.location || DEFAULT_EXPERIENCE_CONTENT.location,
      rating: experience.rating ?? DEFAULT_EXPERIENCE_CONTENT.rating,
      reviewCount: experience.reviewCount ?? DEFAULT_EXPERIENCE_CONTENT.reviewCount,
      price: experience.price ?? DEFAULT_EXPERIENCE_CONTENT.price,
      priceDisplay: experience.priceDisplay || DEFAULT_EXPERIENCE_CONTENT.priceDisplay,
      type: experience.groupType || DEFAULT_EXPERIENCE_CONTENT.type,
      description: normalizeParagraphs(experience.description).length
        ? normalizeParagraphs(experience.description)
        : DEFAULT_EXPERIENCE_CONTENT.description,
      duration: experience.duration ?? DEFAULT_EXPERIENCE_CONTENT.duration,
      storyHighlights: experience.highlights.length ? experience.highlights : DEFAULT_EXPERIENCE_CONTENT.storyHighlights,
      trustText: experience.trustText?.trim() || DEFAULT_EXPERIENCE_CONTENT.trustText,
      urgencyText: experience.urgencyText?.trim() || DEFAULT_EXPERIENCE_CONTENT.urgencyText,
      facts: experience.facts.length ? experience.facts : DEFAULT_EXPERIENCE_CONTENT.facts,
      highlights: {
        included: experience.included.length
          ? experience.included
          : experience.highlights.length
          ? experience.highlights
          : DEFAULT_EXPERIENCE_CONTENT.highlights.included,
        notIncluded: experience.notIncluded.length
          ? experience.notIncluded
          : DEFAULT_EXPERIENCE_CONTENT.highlights.notIncluded,
      },
      itinerary: experience.itinerary.length ? experience.itinerary : DEFAULT_EXPERIENCE_CONTENT.itinerary,
      sustainability: experience.sustainability.length
        ? experience.sustainability
        : DEFAULT_EXPERIENCE_CONTENT.sustainability,
      guide: {
        ...DEFAULT_EXPERIENCE_CONTENT.guide,
        name: experience.guideName || DEFAULT_EXPERIENCE_CONTENT.guide.name,
        role: experience.groupType || DEFAULT_EXPERIENCE_CONTENT.guide.role,
        location: experience.location || DEFAULT_EXPERIENCE_CONTENT.guide.location,
        bio: experience.guideDescription || DEFAULT_EXPERIENCE_CONTENT.guide.bio,
        image: experience.guideImage || DEFAULT_EXPERIENCE_CONTENT.guide.image,
        yearsGuiding: experience.guideYears || DEFAULT_EXPERIENCE_CONTENT.guide.yearsGuiding,
        happyTravelers: experience.happyTravelers || DEFAULT_EXPERIENCE_CONTENT.guide.happyTravelers,
      },
      reviews: experience.reviews.length ? experience.reviews : DEFAULT_EXPERIENCE_CONTENT.reviews,
      ctaText: experience.ctaText || "Check availability on WhatsApp",
      seoTitle: experience.seoTitle,
      seoDescription: experience.seoDescription,
    };
  } catch (error) {
    console.error("Error fetching Storyblok experience:", error);
    return null;
  }
}

async function getExperienceStory(slug) {
  const token = process.env.STORYBLOK_API_TOKEN || process.env.NEXT_PUBLIC_STORYBLOK_API_TOKEN;

  if (!token) {
    console.error("Missing Storyblok token for experience detail");
    return null;
  }

  try {
    const candidatePaths = [`experiences/${slug}`, `experience/${slug}`];
    let data = null;

    for (const path of candidatePaths) {
      const res = await fetch(
        `https://api.storyblok.com/v2/cdn/stories/${path}?version=draft&token=${token}`,
        { next: { revalidate: 60 } }
      );

      if (!res.ok) {
        continue;
      }

      data = await res.json();

      if (data.story) {
        break;
      }
    }

    if (!data?.story) {
      return null;
    }

    return data.story;
  } catch (error) {
    console.error("Error fetching Storyblok experience:", error);
    return null;
  }
}

// Safe image resolver: blocks problematic paths, URL-encodes spaces
function safeImg(src, fallback = FALLBACK) {
  if (!src || !src.trim().length) return fallback;

  const blocked = ["color palette", "home page", "press-logos"];
  if (blocked.some((b) => src.toLowerCase().includes(b))) return fallback;

  if (!src.includes("/")) src = `/images/figma/${src}`;

  return src.replace(/ /g, "%20");
}

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
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow border border-gray-200">
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
  const experience = await getExperience(params.slug);
  if (!experience) return { title: "Experience Not Found" };

  return {
    title: experience.seoTitle || experience.title,
    description: experience.seoDescription || experience.description[0],
    openGraph: {
      title: experience.seoTitle || experience.title,
      description: experience.seoDescription || experience.description[0],
      image: experience.image,
    },
  };
}

export default async function ExperiencePage({ params, searchParams }) {
  const { slug } = params;

  if (isStoryblokPreview(searchParams)) {
    const story = await getExperienceStory(slug);

    if (!story) {
      return notFound();
    }

    return <ExperienceStoryblokPreview story={story} slug={slug} preview />;
  }

  const experience = await getExperience(slug);

  if (!experience) {
    return notFound();
  }

  const whyExperience = (experience.storyHighlights && experience.storyHighlights.length
    ? experience.storyHighlights
    : ["Small group experience", "Local verified partner", "Curated by Wanderlast"]
  ).slice(0, 3);
  const message = `Hi, I'm staying at Galini Beach Hotel and I'm interested in ${experience.title}`;
  const whatsappUrl = `https://wa.me/35799645094?text=${encodeURIComponent(message)}`;

  return (
    <main>
      {/* ========== SECTION 1: HERO ========== */}
      <section className="relative w-full min-h-[45vh] sm:min-h-[65vh] flex items-end px-4 sm:px-6 lg:px-8 overflow-hidden bg-gray-900">
        {/* Background image */}
        <img
          src={safeImg(experience.image || "/images/figma/placeholder.jpg")}
          alt={experience.title}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/50" />

        {/* Content */}
        <div className="max-w-6xl mx-auto w-full relative z-10 py-8 sm:py-12 md:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-end">
            {/* Left: Title + Meta */}
            <div className="md:col-span-2">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-white drop-shadow-lg mb-6 sm:mb-8">
                {experience.title}
              </h1>

              {/* Meta row */}
              <div className="flex flex-wrap gap-3 sm:gap-6 text-white/90 text-xs sm:text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-amber-400">★</span>
                  <span className="font-medium">
                    {experience.rating} ({experience.reviewCount} reviews)
                  </span>
                </div>
                <span>Curated by Wanderlast</span>
                <span>{experience.type}</span>
                <span>Local partner verified</span>
                <span>{experience.location}</span>
                <span>{experience.guide.role}</span>
                <span>{experience.duration}</span>
              </div>
            </div>

            {/* Right: Price Badge */}
            <div className="bg-white/95 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-lg text-center">
              <p className="text-xs text-gray-600 mb-2">Starting price</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">{experience.priceDisplay}</p>
              <p className="text-xs text-gray-600 mt-1">per person</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-normal text-gray-900 mb-5">Why this experience</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {whyExperience.map((item) => (
              <div key={item} className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                <p className="text-sm font-medium text-gray-900">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== SECTION 2: STICKY ACTION BAR (Desktop only) ========== */}
      <div className="hidden lg:block sticky top-[72px] z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <p className="text-xs text-gray-600">From</p>
            <p className="text-2xl font-bold text-gray-900">{experience.priceDisplay}/person</p>
          </div>
          <div className="text-right">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <button className="px-8 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition">
                {experience.ctaText}
              </button>
            </a>
            <p className="text-xs text-gray-600 mt-2">{experience.urgencyText}</p>
          </div>
        </div>
      </div>

      {/* ========== SECTION 3: EXPERIENCE OVERVIEW ========== */}
      <section className="py-8 sm:py-12 md:py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-normal text-gray-900 mb-5">About this experience</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {experience.description.slice(0, 1).map((para, idx) => (
                <p key={idx} className="text-gray-700 leading-loose mb-6 text-base line-clamp-3 max-w-3xl">
                  {para}
                </p>
              ))}
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-200 max-w-3xl">
                <p className="text-sm font-medium text-gray-900 whitespace-pre-line">
                  {experience.trustText}
                </p>
              </div>
            </div>
            {/* Side info box */}
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 h-fit">
              <h3 className="text-sm font-medium text-gray-900 mb-4">Quick facts</h3>
              <ul className="space-y-3 text-sm text-gray-700">
                {experience.facts.map((fact) => (
                  <li key={fact.label} className="flex gap-2">
                    <span className="text-gray-400">•</span>
                    <span>
                      {fact.label}: {fact.value}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ========== SECTION 4: SUSTAINABILITY & LOCAL IMPACT ========== */}
      <section className="py-10 md:py-16 px-4 sm:px-6 lg:px-8 bg-green-50 rounded-2xl">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-normal text-gray-900 mb-5">Local impact & sustainability</h2>
          <p className="text-gray-700 mb-8 max-w-3xl">
            {experience.trustText.split("\n")[0]}
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
      <section className="py-8 sm:py-12 md:py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-normal text-gray-900 mb-12">What's included</h2>
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
      <section className="py-8 sm:py-12 md:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-normal text-gray-900 mb-12">Itinerary</h2>
          <div className="space-y-6">
            {experience.itinerary.map((stop, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row gap-4 sm:gap-6 pb-8 border-b border-gray-200 last:border-b-0">
                {/* Time badge */}
                <div className="sm:flex-shrink-0 sm:w-20">
                  <div className="bg-white border border-gray-300 rounded-lg py-2 px-3 text-center">
                    <p className="text-sm font-semibold text-gray-900">{stop.time}</p>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 sm:pt-2">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{stop.title}</h3>
                  <p className="text-gray-700 text-sm">{stop.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== SECTION 7: REVIEWS PREVIEW ========== */}
      <section className="py-8 sm:py-12 md:py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto space-y-5">
          <h2 className="text-3xl sm:text-4xl font-normal text-gray-900 mb-12">What guests say</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {experience.reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </div>
      </section>

      {/* ========== SECTION 8: HOST / GUIDE CARD ========== */}
      <section className="py-8 sm:py-12 md:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-normal text-gray-900 mb-12">Meet your guide</h2>
          <div className="bg-white border border-gray-200 rounded-xl p-8 max-w-xl">
            <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
              {/* Avatar */}
              {experience.guide.image ? (
                <img
                  src={safeImg(experience.guide.image)}
                  alt={experience.guide.name}
                  className="w-20 h-20 rounded-full flex-shrink-0 object-cover"
                />
              ) : (
                <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex-shrink-0" />
              )}

              {/* Info */}
              <div className="flex-1">
                <h3 className="text-2xl font-semibold text-gray-900">{experience.guide.name}</h3>
                <p className="text-sm text-gray-600 mt-1">
                  {experience.guide.role} · {experience.guide.location}
                </p>
                <p className="text-gray-700 mt-4 leading-relaxed text-base">{experience.guide.bio}</p>

                {/* Stats */}
                <div className="flex flex-wrap gap-6 mt-6 pt-6 border-t border-gray-200">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{experience.guide.yearsGuiding}</p>
                    <p className="text-xs text-gray-600">Years guiding</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{experience.guide.happyTravelers}</p>
                    <p className="text-xs text-gray-600">Happy travelers</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== SECTION 9: RELATED EXPERIENCES ========== */}
      <section className="py-8 sm:py-12 md:py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto space-y-6">
          <h2 className="text-3xl sm:text-4xl font-normal text-gray-900 mb-12">Similar experiences</h2>
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
            <p className="text-xl font-bold text-gray-900">{experience.priceDisplay}</p>
          </div>
          <div className="flex-1">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="block">
              <button className="w-full px-4 py-3 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition">
                {experience.ctaText}
              </button>
            </a>
            <p className="text-[11px] text-gray-600 mt-2 text-center">{experience.urgencyText}</p>
          </div>
        </div>
      </div>

      {/* Spacer for mobile fixed bar */}
      <div className="lg:hidden h-[88px]" />
    </main>
  );
}
