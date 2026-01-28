import Link from "next/link";

const collections = {
  "eco-tourism": {
    name: "Eco-Tourism",
    tagline: "Sustainable travel that gives back",
    description:
      "Low-impact journeys partnering with conservation teams and community guides to keep ecosystems thriving.",
    gradient: "from-emerald-500 via-emerald-500/90 to-teal-500",
    experiences: [
      { name: "Amazon jungle trek", destination: "Peru", icon: "🌿" },
      { name: "Mountain conservation", destination: "Nepal", icon: "⛰️" },
      { name: "Coral reef restoration", destination: "Indonesia", icon: "🪸" },
    ],
  },
  "cultural-immersion": {
    name: "Cultural Immersion",
    tagline: "Meaningful exchanges with local hosts",
    description:
      "Slow itineraries centered on artisans, food traditions, and living heritage that welcome curious travelers.",
    gradient: "from-amber-500 via-amber-500/90 to-rose-500",
    experiences: [
      { name: "Buddhist temple meditation", destination: "Thailand", icon: "🧘" },
      { name: "Greek cooking class", destination: "Greece", icon: "🍲" },
      { name: "Traditional tea ceremony", destination: "Japan", icon: "🍵" },
    ],
  },
  "adventure-seekers": {
    name: "Adventure Seekers",
    tagline: "High-energy routes with safety first",
    description:
      "Guided summit pushes, glacier traverses, and sky-to-sea thrills curated with vetted outfitters.",
    gradient: "from-orange-500 via-orange-500/90 to-red-500",
    experiences: [
      { name: "Himalayan ridge trek", destination: "Nepal", icon: "🥾" },
      { name: "Northern lights overland", destination: "Iceland", icon: "🌌" },
      { name: "Skydiving coast-to-coast", destination: "New Zealand", icon: "🪂" },
    ],
  },
  "foodie-experiences": {
    name: "Foodie Experiences",
    tagline: "Taste-driven journeys and kitchen time",
    description:
      "Seasonal menus, night markets, vineyard suppers, and hands-on classes led by local chefs and growers.",
    gradient: "from-amber-400 via-amber-400/90 to-orange-500",
    experiences: [
      { name: "Cycladic farm-to-table", destination: "Greece", icon: "🍽️" },
      { name: "Douro valley wine crawl", destination: "Portugal", icon: "🍷" },
      { name: "Bangkok street feast", destination: "Thailand", icon: "🥘" },
    ],
  },
};

export const metadata = {
  title: "Collections – Wanderlast",
  description: "Curated collections of sustainable, culture-rich travel experiences.",
};

export async function generateStaticParams() {
  return Object.keys(collections).map((collectionSlug) => ({ collectionSlug }));
}

function Pill({ children }) {
  return (
    <span className="inline-flex items-center rounded-full bg-white/20 px-3 py-1 text-sm font-semibold text-white shadow-sm ring-1 ring-white/30">
      {children}
    </span>
  );
}

export default function CollectionPage({ params }) {
  const collection = collections[params?.collectionSlug];

  if (!collection) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f9fafb] via-white to-[#eef2f7] text-slate-900">
      <header className={`bg-gradient-to-br ${collection.gradient} text-white`}>
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-14 sm:px-6 lg:px-8">
          <Link
            href="/home"
            className="inline-flex w-fit items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/25"
          >
            ← Back to home
          </Link>
          <div className="text-6xl">{collection.icon}</div>
          <div className="space-y-3">
            <h1 className="text-4xl font-semibold sm:text-5xl">{collection.name}</h1>
            <p className="text-lg text-white/90">{collection.tagline}</p>
            <p className="max-w-2xl text-sm text-white/80">{collection.description}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Pill>Small groups</Pill>
            <Pill>Verified partners</Pill>
            <Pill>UNESCO-inspired routes</Pill>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 pb-6">
          <div>
            <p className="text-sm font-semibold text-wl-primary">Experiences</p>
            <h2 className="text-2xl font-semibold text-slate-900">In this collection</h2>
          </div>
          <Link
            href="/experiences"
            className="rounded-full bg-wl-primary px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-wl-primary/20 transition hover:translate-y-[-1px] hover:shadow-xl"
          >
            Browse all experiences
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {collection.experiences.map((exp) => (
            <article
              key={exp.name}
              className="group rounded-2xl bg-white/90 p-6 shadow-lg ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex items-center justify-between pb-4">
                <span className="text-3xl">{exp.icon}</span>
                <span className="rounded-full bg-wl-primary/10 px-3 py-1 text-xs font-semibold text-wl-primary ring-1 ring-wl-primary/20">
                  {exp.destination}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 group-hover:text-wl-primary">
                {exp.name}
              </h3>
              <p className="pt-2 text-sm text-slate-600">
                Crafted with local hosts to balance impact, comfort, and culture-forward pacing.
              </p>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
