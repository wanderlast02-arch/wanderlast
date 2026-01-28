
import { storyblokInit, apiPlugin } from "@storyblok/react";

// ========== SECTIONS ==========
import EcotourismSection from "./sections/EcotourismSection.jsx";
import FeaturedExperiencesSectionBlock from "./sections/FeaturedExperiencesSection.jsx";
import FooterSection from "./sections/FooterSection.jsx";
import HeroBanner from "./sections/HeroBanner.jsx";
import SearchBarSection from "./sections/SearchBarSection.jsx";
import TopDestinationsSection from "./sections/TopDestinationsSection.jsx";
import TopExperiencesSection from "./sections/TopExperiencesSection.jsx";
import TrustedOrganizationsSection from "./sections/TrustedOrganizationsSection.jsx";
import WhyWanderlastSection from "./sections/WhyWanderlastSection.jsx";

// ========== COMPONENTS ==========
import CategoryChips from "./components/CategoryChips.jsx";
import FilterBar from "./components/FilterBar.jsx";
import IconTag from "./components/IconTag.jsx";
import MapEmbed from "./components/MapEmbed.jsx";
import SearchBar from "./components/SearchBar.jsx";
import Tag from "./components/Tag.jsx";

// ========== META & LAYOUTS ==========
import Breadcrumbs from "./components/meta/Breadcrumbs.jsx";
import LayoutDefault from "./components/meta/LayoutDefault.jsx";
import LayoutSectionWrapper from "./components/meta/LayoutSectionWrapper.jsx";
import Seo from "./components/meta/Seo.jsx";

// ========== PAGES ==========
import PageCity from "./components/pages/PageCity.jsx";
import PageCountry from "./components/pages/PageCountry.jsx";
import PageExperience from "./components/pages/PageExperience.jsx";
import PageHome from "./components/pages/PageHome.jsx";
import PageGreece from "./components/pages/PageGreece.jsx";
import PageThailand from "./components/pages/PageThailand.jsx";

// ========== CARDS ==========
import CityCard from "./cards/CityCard.jsx";
import DestinationCard from "./cards/DestinationCard.jsx";
import ExperienceCard from "./cards/ExperienceCard.jsx";

// ========== GRIDS ==========
import DestinationGrid from "./grids/DestinationGrid.jsx";
import ExperienceGrid from "./grids/ExperienceGrid.jsx";

// ========== COMPONENT REGISTRY ==========
export const components = {
  // Sections
  ecotourism_section: EcotourismSection,
  featured_experiences_section: FeaturedExperiencesSectionBlock,
  footer_section: FooterSection,
  hero_banner: HeroBanner,
  search_bar_section: SearchBarSection,
  top_destinations_section: TopDestinationsSection,
  top_experiences_section: TopExperiencesSection,
  trusted_organizations_section: TrustedOrganizationsSection,
  why_wanderlast_section: WhyWanderlastSection,

  // Components
  category_chips: CategoryChips,
  filter_bar: FilterBar,
  icon_tag: IconTag,
  map_embed: MapEmbed,
  search_bar: SearchBar,
  tag: Tag,

  // Meta & Layouts
  breadcrumbs: Breadcrumbs,
  layout_default: LayoutDefault,
  layout_section_wrapper: LayoutSectionWrapper,
  seo: Seo,

  // Pages
  page_city: PageCity,
  page_country: PageCountry,
  page_experience: PageExperience,
  page_home: PageHome,
  page_greece: PageGreece,
  page_thailand: PageThailand,

  // Cards
  city_card: CityCard,
  destination_card: DestinationCard,
  experience_card: ExperienceCard,

  // Grids
  destination_grid: DestinationGrid,
  experience_grid: ExperienceGrid,
};

export function initStoryblok() {
  storyblokInit({
    accessToken: process.env.STORYBLOK_API_TOKEN,
    use: [apiPlugin],
    components,
  });
}

export default components;


