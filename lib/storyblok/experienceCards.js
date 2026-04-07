const STORYBLOK_EXPERIENCE_FALLBACK = "/images/placeholder.jpg";
const DEFAULT_EXCLUDED_SLUGS = new Set(["curator-reference-experience"]);
const CRETE_LANDING_ORDER = [
  "elafonissi-beach-day-trip",
  "balos-beach-by-road",
  "balos-falassarna-jeep-safari",
  "menies-diktinna-jeep-safari",
  "prophet-helias-falassarna-jeep-safari",
  "elafonisi-day-trip",
  "imbros-gorge-day-trip",
  "knossos-day-trip",
  "sunset-boat-tour",
];

function normalizeHighlights(highlights) {
  if (Array.isArray(highlights)) {
    return highlights
      .map((item) => {
        if (typeof item === "string") return item;
        if (typeof item?.text === "string") return item.text;
        if (typeof item?.content?.text === "string") return item.content.text;
        if (typeof item?.content?.label === "string") return item.content.label;
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

function getStoryImage(content = {}) {
  const imageField = content.images;

  if (Array.isArray(imageField) && imageField[0]?.filename) {
    return imageField[0].filename;
  }

  if (imageField?.filename) {
    return imageField.filename;
  }

  if (content.cover_image?.filename) {
    return content.cover_image.filename;
  }

  if (content.hero_image?.filename) {
    return content.hero_image.filename;
  }

  return STORYBLOK_EXPERIENCE_FALLBACK;
}

function mapStoryToExperienceCard(story) {
  const content = story?.content || {};
  const slug = story?.slug || content.slug;

  if (!slug || !content.title) {
    return null;
  }

  return {
    slug,
    title: content.title,
    image: getStoryImage(content),
    price: normalizeNumber(content.price) ?? normalizeNumber(content.price_display) ?? 0,
    rating: normalizeNumber(content.rating) ?? 4.8,
    description: content.short_description || "",
    highlights: normalizeHighlights(content.highlights),
    location: content.location || "",
  };
}

async function getStoryblokExperienceCards({
  startsWith = ["experiences/", "experience/"],
  includeSlugs,
  excludeSlugs = [],
  sortBy,
} = {}) {
  const token = process.env.STORYBLOK_API_TOKEN || process.env.NEXT_PUBLIC_STORYBLOK_API_TOKEN;

  if (!token) {
    console.error("Missing Storyblok token for experience cards");
    return [];
  }

  try {
    let stories = [];

    for (const prefix of startsWith) {
      const params = new URLSearchParams({
        starts_with: prefix,
        version: "draft",
        token,
        per_page: "100",
      });

      const response = await fetch(`https://api.storyblok.com/v2/cdn/stories?${params.toString()}`, {
        next: { revalidate: 60 },
      });

      if (!response.ok) {
        continue;
      }

      const data = await response.json();

      if (Array.isArray(data.stories) && data.stories.length) {
        stories = [...stories, ...data.stories];
      }
    }

    const excludedSlugs = new Set([...DEFAULT_EXCLUDED_SLUGS, ...excludeSlugs]);
    const includedSlugSet = Array.isArray(includeSlugs) && includeSlugs.length ? new Set(includeSlugs) : null;

    const items = stories
      .filter((story) => story?.content?.component === "experience")
      .filter((story) => !excludedSlugs.has(story.slug))
      .map(mapStoryToExperienceCard)
      .filter(Boolean)
      .filter((story) => (includedSlugSet ? includedSlugSet.has(story.slug) : true));

    if (typeof sortBy === "function") {
      return [...items].sort(sortBy);
    }

    return items;
  } catch (error) {
    console.error("Error fetching Storyblok experience cards:", error);
    return [];
  }
}

function sortExperienceCardsForCrete(a, b) {
  const aIndex = CRETE_LANDING_ORDER.indexOf(a.slug);
  const bIndex = CRETE_LANDING_ORDER.indexOf(b.slug);
  const safeAIndex = aIndex === -1 ? Number.MAX_SAFE_INTEGER : aIndex;
  const safeBIndex = bIndex === -1 ? Number.MAX_SAFE_INTEGER : bIndex;

  if (safeAIndex !== safeBIndex) {
    return safeAIndex - safeBIndex;
  }

  return a.title.localeCompare(b.title);
}

function getCreteLandingSlugs() {
  return [...CRETE_LANDING_ORDER];
}

module.exports = {
  getCreteLandingSlugs,
  getStoryblokExperienceCards,
  sortExperienceCardsForCrete,
};