"use client";

import { useEffect } from "react";
import { storyblokInit, apiPlugin } from "@storyblok/react";

// Import all components
import EcotourismSection from "./sections/EcotourismSection.jsx";
import FeaturedExperiencesSectionBlock from "./sections/FeaturedExperiencesSection.jsx";
import FooterSection from "./sections/FooterSection.jsx";
import HeroBanner from "./sections/HeroBanner.jsx";
import SearchBarSection from "./sections/SearchBarSection.jsx";
import TopDestinationsSection from "./sections/TopDestinationsSection.jsx";
import TopExperiencesSection from "./sections/TopExperiencesSection.jsx";
import TrustedOrganizationsSection from "./sections/TrustedOrganizationsSection.jsx";
import WhyWanderlastSection from "./sections/WhyWanderlastSection.jsx";

import CategoryChips from "./components/CategoryChips.jsx";
import FilterBar from "./components/FilterBar.jsx";
import IconTag from "./components/IconTag.jsx";
import MapEmbed from "./components/MapEmbed.jsx";
import SearchBar from "./components/SearchBar.jsx";
import Tag from "./components/Tag.jsx";

import Breadcrumbs from "./components/meta/Breadcrumbs.jsx";
import LayoutDefault from "./components/meta/LayoutDefault.jsx";
import LayoutSectionWrapper from "./components/meta/LayoutSectionWrapper.jsx";
import Seo from "./components/meta/Seo.jsx";

import PageCity from "./components/pages/PageCity.jsx";
import PageCountry from "./components/pages/PageCountry.jsx";
import PageExperience from "./components/pages/PageExperience.jsx";
import PageHome from "./components/pages/PageHome.jsx";

import CityCard from "./cards/CityCard.jsx";
import DestinationCard from "./cards/DestinationCard.jsx";
import ExperienceCard from "./cards/ExperienceCard.jsx";

import DestinationGrid from "./grids/DestinationGrid.jsx";
import ExperienceGrid from "./grids/ExperienceGrid.jsx";

const componentRegistry = {
  ecotourism_section: EcotourismSection,
  featured_experiences_section: FeaturedExperiencesSectionBlock,
  footer_section: FooterSection,
  hero_banner: HeroBanner,
  search_bar_section: SearchBarSection,
  top_destinations_section: TopDestinationsSection,
  top_experiences_section: TopExperiencesSection,
  trusted_organizations_section: TrustedOrganizationsSection,
  why_wanderlast_section: WhyWanderlastSection,

  category_chips: CategoryChips,
  filter_bar: FilterBar,
  icon_tag: IconTag,
  map_embed: MapEmbed,
  search_bar: SearchBar,
  tag: Tag,

  breadcrumbs: Breadcrumbs,
  layout_default: LayoutDefault,
  layout_section_wrapper: LayoutSectionWrapper,
  seo: Seo,

  page_city: PageCity,
  page_country: PageCountry,
  page_experience: PageExperience,
  page_home: PageHome,

  city_card: CityCard,
  destination_card: DestinationCard,
  experience_card: ExperienceCard,

  destination_grid: DestinationGrid,
  experience_grid: ExperienceGrid,
};

// Suppress Storyblok component warnings during SSR and dev
if (typeof window !== "undefined") {
  const originalWarn = console.warn;
  const originalError = console.error;

  console.warn = (...args) => {
    const message = args[0]?.toString?.() || String(args[0]);
    if (message.includes("doesn't exist")) {
      return;
    }
    originalWarn(...args);
  };

  console.error = (...args) => {
    const message = args[0]?.toString?.() || String(args[0]);
    if (message.includes("doesn't exist")) {
      return;
    }
    originalError(...args);
  };
}

// Suppress SSR warnings globally
if (typeof global !== "undefined") {
  const originalConsoleError = console.error;
  console.error = (...args) => {
    const message = args[0]?.toString?.() || String(args[0]);
    if (message.includes("Component") && message.includes("doesn't exist")) {
      return;
    }
    originalConsoleError(...args);
  };
}

export default function StoryblokProvider({ children }) {
  useEffect(() => {
    // Initialize on module load
    storyblokInit({
      accessToken: process.env.NEXT_PUBLIC_STORYBLOK_API_TOKEN,
      use: [apiPlugin],
      components: componentRegistry,
    });
  }, []);

  return <>{children}</>;
}
