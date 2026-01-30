import { notFound } from "next/navigation";
import { getStoryblokApi } from "@storyblok/react";

const FIGMA_COUNTRY_IMAGE = "/images/figma/country-page.png";
const FIGMA_HOME_IMAGE = "/images/figma/home-page.png";

async function getCountryData(slug, preview = false) {
  try {
    const storyblokApi = getStoryblokApi();
    const { data } = await storyblokApi.get(`cdn/stories/country/${slug}`, {
      version: preview ? "draft" : "published",
    });
    return data?.story || null;
  } catch (error) {
    console.error("Error fetching country:", error);
    return null;
  }
}

function pickImage(primary, fallback = FIGMA_COUNTRY_IMAGE) {
  return primary?.filename || fallback;
}

export async function generateMetadata({ params }) {
  const story = await getCountryData(params.slug);
  if (!story) return { title: "Country Not Found" };

  return {
    title: story.content.title || story.name,
    description: story.content.description || story.content.tagline,
    openGraph: {
      title: story.content.title || story.name,
      description: story.content.description || story.content.tagline,
      image: pickImage(story.content.hero_image, FIGMA_COUNTRY_IMAGE),
    },
  };
}

export default async function CountryPage({ params, searchParams }) {
  const preview = searchParams?._storyblok || false;
  const story = await getCountryData(params.slug, preview);

  if (!story) {
    notFound();
  }

  const { content } = story;
  const heroImage = pickImage(content.hero_image, FIGMA_COUNTRY_IMAGE);
  const aboutImage = pickImage(content.about_image, FIGMA_HOME_IMAGE);

  const destinations = content.destinations || [];
  const featuredExperiences = content.featured_experiences || [];
  const travelTips = content.travel_tips || [];

  return (
    <div className="bg-white text-wl-text">
      {/* 1. HERO */}
      <section className="relative min-h-[70vh] flex items-end overflow-hidden">
        <Image
          src={heroImage}
          alt={content.title}
          fill
          sizes="100vw"
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <p className="text-white/80 text-sm mb-3 tracking-[0.2em] uppercase">Wanderlast</p>
          <h1 className="text-white text-4xl sm:text-5xl lg:text-6xl font-light leading-tight mb-3">{content.title}</h1>
          {content.tagline && (
            <p className="text-white/90 text-lg max-w-2xl font-light">{content.tagline}</p>
          )}
        </div>
      </section>

      {/* 2. ABOUT THE COUNTRY */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-sm tracking-[0.2em] uppercase text-wl-muted mb-3">About the Country</p>
            <h2 className="text-4xl font-light text-wl-text mb-6">{content.title}</h2>
            {content.description && (
              <p className="text-lg text-wl-muted leading-relaxed">{content.description}</p>
            )}
          </div>
          <div className="relative w-full h-80 rounded-2xl overflow-hidden shadow-lg border border-emerald-50">
            <Image
              src={aboutImage}
              alt={`${content.title} map or highlight`}
              fill
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* 3. TOP DESTINATIONS */}
      {destinations.length > 0 && (
        <section className="py-20 px-4 bg-wl-surface">
          <div className="max-w-6xl mx-auto">
            <div className="mb-12 text-center">
              <h2 className="text-4xl font-light text-wl-text mb-3">Top Destinations</h2>
              <p className="text-lg text-wl-muted">Explore the best of {content.title}</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-12">
              {destinations.map((dest, idx) => (
                <Link
                  key={idx}
                  href={`/destinations/${dest.slug}`}
                  className="group flex flex-col items-center"
                >
                  <div className="relative w-full aspect-square rounded-full overflow-hidden shadow-lg mb-4 border-4 border-white hover:shadow-2xl transition-shadow">
                    <Image
                      src={pickImage(dest.image, FIGMA_HOME_IMAGE)}
                      alt={dest.name}
                      fill
                      sizes="(min-width: 1024px) 15vw, (min-width: 768px) 22vw, 40vw"
                      className="object-cover"
                    />
                  </div>
                  <p className="text-center font-semibold text-wl-text group-hover:text-wl-primary transition-colors">
                    {dest.name}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 4. FEATURED EXPERIENCES */}
      {featuredExperiences.length > 0 && (
        <section className="py-20 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="mb-12 text-center">
              <h2 className="text-4xl font-light text-wl-text mb-3">Featured Experiences</h2>
              <p className="text-lg text-wl-muted">Handpicked ways to feel {content.title}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredExperiences.map((exp, idx) => (
                <Link
                  key={idx}
                  href={`/experiences/${exp.slug}`}
                  className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all"
                >
                  <div className="relative w-full h-64 bg-gray-200">
                    <Image
                      src={pickImage(exp.image, FIGMA_COUNTRY_IMAGE)}
                      alt={exp.name}
                      fill
                      sizes="(min-width: 1280px) 24vw, (min-width: 1024px) 32vw, (min-width: 768px) 48vw, 100vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent text-white">
                    <h3 className="font-semibold text-sm mb-2">{exp.name}</h3>
                    <div className="flex items-center justify-between text-xs">
                      {exp.content?.price ? <span>${exp.content.price}</span> : <span />}
                      <span className="flex items-center gap-1">{exp.content?.rating ? `★ ${exp.content.rating}` : ""}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 5. TRAVEL TIPS */}
      {travelTips.length > 0 && (
        <section className="py-20 px-4 bg-wl-surface">
          <div className="max-w-6xl mx-auto">
            <div className="mb-12 text-center">
              <h2 className="text-4xl font-light text-wl-text mb-3">Travel Tips</h2>
              <p className="text-lg text-wl-muted">What to know before you go</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {travelTips.slice(0, 4).map((tip, idx) => (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-lg shadow-sm border border-emerald-50 h-full flex flex-col"
                >
                  <h3 className="text-lg font-semibold text-wl-text mb-3">{tip.title}</h3>
                  <p className="text-wl-muted leading-relaxed flex-1">{tip.content}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 6. FINAL CTA */}
      <section className="relative min-h-96 flex items-center justify-center overflow-hidden">
        <Image
          src={heroImage}
          alt={`Ready to explore ${content.title}?`}
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative text-center text-white px-4 max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-light leading-tight mb-6">
            Ready to explore {content.title}?
          </h2>
          <p className="text-lg opacity-95 mb-8">
            Discover authentic destinations and experiences curated for you.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/destinations"
              className="px-8 py-4 bg-wl-primary text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
            >
              Browse Destinations
            </Link>
            <Link
              href="/experiences"
              className="px-8 py-4 bg-white text-wl-primary font-semibold rounded-lg hover:opacity-90 transition-opacity"
            >
              Find Experiences
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
