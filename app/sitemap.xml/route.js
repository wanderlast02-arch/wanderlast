import { getStoryblokApi } from "@storyblok/react";

async function getSitemapData() {
  try {
    const storyblokApi = getStoryblokApi();

    // If Storyblok API is not initialized (e.g., during static build without env), bail out gracefully
    if (!storyblokApi || typeof storyblokApi.get !== 'function') {
      console.warn('Storyblok API unavailable; returning empty sitemap lists');
      return {
        countries: [],
        destinations: [],
        experiences: [],
        collections: [],
        merchants: [],
      };
    }

    // Fetch all countries, destinations, experiences, collections, merchants
    const [countries, destinations, experiences, collections, merchants] = await Promise.all([
      storyblokApi.get("cdn/stories", { starts_with: "country/" }),
      storyblokApi.get("cdn/stories", { starts_with: "destination/" }),
      storyblokApi.get("cdn/stories", { starts_with: "experience/" }),
      storyblokApi.get("cdn/stories", { starts_with: "collections/" }),
      storyblokApi.get("cdn/stories", { starts_with: "merchant/" }),
    ]);

    return {
      countries: countries.data.stories,
      destinations: destinations.data.stories,
      experiences: experiences.data.stories,
      collections: collections.data.stories,
      merchants: merchants.data.stories,
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
