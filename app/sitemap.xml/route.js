const STORYBLOK_API_BASE = "https://api.storyblok.com/v2/cdn/stories";

function getStoryblokToken() {
  return process.env.STORYBLOK_API_TOKEN || process.env.NEXT_PUBLIC_STORYBLOK_API_TOKEN;
}

async function fetchStories(startsWith) {
  const token = getStoryblokToken();

  if (!token) {
    return [];
  }

  const params = new URLSearchParams({
    version: "draft",
    token,
    starts_with: startsWith,
  });

  const res = await fetch(`${STORYBLOK_API_BASE}?${params.toString()}`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error(`Storyblok sitemap fetch failed for ${startsWith}: ${res.status}`);
  }

  const data = await res.json();
  return data?.stories || [];
}

async function getSitemapData() {
  try {
    const token = getStoryblokToken();

    if (!token) {
      console.warn("Storyblok token unavailable; returning empty sitemap lists");
      return {
        countries: [],
        destinations: [],
        experiences: [],
        collections: [],
        merchants: [],
      };
    }

    const [countries, destinations, experiencesLegacy, experiencesCurrent, collections, merchants] = await Promise.all([
      fetchStories("country/"),
      fetchStories("destination/"),
      fetchStories("experience/"),
      fetchStories("experiences/"),
      fetchStories("collections/"),
      fetchStories("merchant/"),
    ]);

    return {
      countries,
      destinations,
      experiences: [...experiencesLegacy, ...experiencesCurrent],
      collections,
      merchants,
    };
  } catch (error) {
    console.error("Error fetching sitemap data:", error);
    return {
      countries: [],
      destinations: [],
      experiences: [],
      collections: [],
      merchants: [],
    };
  }
}

function formatDate(dateString) {
  return new Date(dateString).toISOString().split("T")[0];
}

export async function GET() {
  const data = await getSitemapData();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Home -->
  <url>
    <loc>https://wanderlast.com</loc>
    <lastmod>${formatDate(new Date())}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>

  <!-- Countries -->
  ${data.countries
    .map(
      (country) => `
  <url>
    <loc>https://wanderlast.com/country/${country.slug}</loc>
    <lastmod>${formatDate(country.published_at)}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`
    )
    .join("")}

  <!-- Destinations -->
  ${data.destinations
    .map(
      (destination) => `
  <url>
    <loc>https://wanderlast.com/destination/${destination.slug}</loc>
    <lastmod>${formatDate(destination.published_at)}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`
    )
    .join("")}

  <!-- Experiences -->
  ${data.experiences
    .map(
      (experience) => `
  <url>
    <loc>https://wanderlast.com/experience/${experience.slug}</loc>
    <lastmod>${formatDate(experience.published_at)}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`
    )
    .join("")}

  <!-- Collections -->
  ${data.collections
    .map(
      (collection) => `
  <url>
    <loc>https://wanderlast.com/collections/${collection.slug}</loc>
    <lastmod>${formatDate(collection.published_at)}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`
    )
    .join("")}

  <!-- Merchants -->
  ${data.merchants
    .map(
      (merchant) => `
  <url>
    <loc>https://wanderlast.com/merchant/${merchant.slug}</loc>
    <lastmod>${formatDate(merchant.published_at)}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`
    )
    .join("")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
