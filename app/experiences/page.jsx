import ExperienceDiscovery from "./ExperienceDiscovery";

export const metadata = {
  title: "Tours & Experiences | Wanderlast",
  description:
    "Discover tours, local activities, cruises, day trips and authentic experiences in Thailand and beyond.",
};

export default function ExperiencesPage({ searchParams }) {
  const initialQuery = typeof searchParams.q === "string" ? searchParams.q.trim() : "";
  return <ExperienceDiscovery initialQuery={initialQuery} />;
}
