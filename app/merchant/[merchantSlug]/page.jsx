import Image from "next/image";
import Link from "next/link";

const merchants = {
	"aurora-adventures": {
		name: "Aurora Adventures",
		location: "Reykjavik, Iceland",
		tagline: "Chasing northern lights with low-impact travel.",
		rating: 4.8,
		reviews: 214,
		specialties: ["Arctic glamping", "Glacier hikes", "Eco-sailing"],
		heroImage: "/images/destinations/aurora-placeholder.svg",
	},
	"andes-trails": {
		name: "Andes Trails",
		location: "Cusco, Peru",
		tagline: "Guided treks woven with Quechua hospitality.",
		rating: 4.9,
		reviews: 341,
		specialties: ["Machu Picchu treks", "Community stays", "High-altitude wellness"],
		heroImage: "/images/destinations/machu-picchu.svg",
	},
	"aegean-escape": {
		name: "Aegean Escape",
		location: "Santorini, Greece",
		tagline: "Slow travel across the Cyclades with sunset sails.",
		rating: 4.7,
		reviews: 189,
		specialties: ["Island hopping", "Vineyard tastings", "Caldera cruises"],
		heroImage: "/images/destinations/santorini.svg",
	},
};

const fallbackMerchant = {
	name: "Independent Host",
	location: "Global",
	tagline: "Curated stays and experiences crafted locally.",
	rating: 4.6,
	reviews: 120,
	specialties: ["Boutique stays", "Local guides", "Seasonal menus"],
	heroImage: "/images/placeholders/hero-01.svg",
};

function MerchantBadge({ label }) {
	return (
		<span className="inline-flex items-center rounded-full bg-surface px-3 py-1 text-xs font-medium text-wl-primary shadow-sm ring-1 ring-wl-primary/10">
			{label}
		</span>
	);
}

export const metadata = {
	title: "Merchant - Wanderlast",
	description: "Local guide and experience provider",
};

export default function MerchantPage({ params }) {
	const slug = params?.merchantSlug;
	const merchant = merchants[slug] || { ...fallbackMerchant, slug };

	return (
		<div className="min-h-screen bg-gradient-to-b from-[#f9fafb] via-white to-[#f3f4f6] text-slate-900">
			<div className="mx-auto flex max-w-6xl flex-col gap-12 px-4 py-12 sm:px-6 lg:px-8">
				<div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
					<div className="space-y-4">
						<div className="inline-flex items-center gap-2 rounded-full bg-wl-primary/10 px-3 py-1 text-sm font-semibold text-wl-primary">
							<span className="h-2 w-2 rounded-full bg-wl-primary"></span>
							Merchant profile
						</div>
						<div className="space-y-3">
							<h1 className="text-3xl font-semibold leading-tight text-slate-900 sm:text-4xl">
								{merchant.name}
							</h1>
							<p className="text-lg text-slate-600">{merchant.tagline}</p>
						</div>
						<div className="flex flex-wrap items-center gap-3 text-sm text-slate-600">
							<span className="rounded-full bg-white px-3 py-1 shadow ring-1 ring-slate-200">
								{merchant.location}
							</span>
							<span className="rounded-full bg-white px-3 py-1 shadow ring-1 ring-slate-200">
								{merchant.rating} ★ ({merchant.reviews} reviews)
							</span>
							<span className="rounded-full bg-white px-3 py-1 shadow ring-1 ring-slate-200">
								Verified sustainable partner
							</span>
						</div>
						<div className="flex flex-wrap gap-2">
							{merchant.specialties.map((item) => (
								<MerchantBadge key={item} label={item} />
							))}
						</div>
						<div className="flex items-center gap-3 pt-2 text-sm text-slate-700">
							<Link
								href="/home"
								className="inline-flex items-center gap-2 rounded-full bg-wl-primary px-4 py-2 font-semibold text-white shadow-lg shadow-wl-primary/20 transition hover:translate-y-[-1px] hover:shadow-xl"
							>
								Explore home
							</Link>
							<Link
								href="/destinations"
								className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 font-semibold text-wl-primary ring-1 ring-wl-primary/20 transition hover:translate-y-[-1px] hover:shadow"
							>
								View destinations
							</Link>
						</div>
					</div>
					<div className="relative h-64 w-full overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-slate-200 lg:h-80 lg:w-[420px]">
						<Image
							src={merchant.heroImage}
							alt={merchant.name}
							fill
							className="object-cover"
							sizes="(max-width: 1024px) 100vw, 420px"
							priority
						/>
					</div>
				</div>

				<div className="grid gap-6 lg:grid-cols-3">
					{[
						{
							title: "Highlights",
							items: [
								"Hosted small-group experiences (max 12)",
								"Local guides and regenerative practices",
								"Seasonal menus featuring regional producers",
							],
						},
						{
							title: "How we host",
							items: [
								"Transparent pricing and carbon-light transport",
								"Certified accommodations where available",
								"On-the-ground support and flexible rebooking",
							],
						},
						{
							title: "Upcoming departures",
							items: [
								"Shoulder-season escapes with fewer crowds",
								"Hands-on workshops with artisans",
								"Sunrise-to-sunset wellness itineraries",
							],
						},
					].map((card) => (
						<div
							key={card.title}
							className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-slate-200"
						>
							<h3 className="mb-4 text-lg font-semibold text-slate-900">{card.title}</h3>
							<ul className="space-y-3 text-sm text-slate-700">
								{card.items.map((item) => (
									<li key={item} className="flex items-start gap-3">
										<span className="mt-1 h-2 w-2 rounded-full bg-wl-primary"></span>
										<span>{item}</span>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>

				<div className="rounded-3xl bg-gradient-to-r from-wl-primary via-wl-primary/90 to-wl-accent/80 p-[1px] shadow-xl">
					<div className="flex flex-col gap-6 rounded-[22px] bg-white p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
						<div className="space-y-3">
							<p className="text-sm font-semibold uppercase tracking-wide text-wl-primary">
								Plan with Wanderlast
							</p>
							<h2 className="text-2xl font-semibold text-slate-900">
								Curate a UNESCO-inspired getaway with this merchant
							</h2>
							<p className="text-sm text-slate-700">
								Share your dates, group size, and interests. We will match you with the best departures and tailor experiences that keep impact low and wonder high.
							</p>
						</div>
						<div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
							<Link
								href={`/experiences`}
								className="inline-flex items-center justify-center gap-2 rounded-full bg-wl-primary px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-wl-primary/20 transition hover:translate-y-[-1px] hover:shadow-xl"
							>
								Browse experiences
							</Link>
							<Link
								href={`/destinations`}
								className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-wl-primary ring-1 ring-wl-primary/20 transition hover:translate-y-[-1px] hover:shadow"
							>
								See destinations
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
