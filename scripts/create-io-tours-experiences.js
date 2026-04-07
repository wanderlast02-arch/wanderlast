#!/usr/bin/env node
/* eslint-disable no-console */

const SPACE_ID = process.env.STORYBLOK_SPACE_ID || "288724910612784";
const TOKEN =
  process.env.STORYBLOK_PERSONAL_ACCESS_TOKEN ||
  process.env.STORYBLOK_MANAGEMENT_TOKEN ||
  process.env.STORYBLOK_OAUTH_TOKEN;

const EXPERIENCES_FOLDER_ID = 163290671102769;

if (!TOKEN) {
  console.error("Missing Storyblok management token in environment.");
  process.exit(1);
}

const DEFAULT_LABELS = {
  partner_label: "Operated by IO Tours",
  verification_label: "Coach excursion",
  price_label: "Suggested sell price",
  price_suffix: "per adult",
  why_section_title: "Why this experience",
  about_section_title: "About this experience",
  facts_section_title: "Quick facts",
  sustainability_section_title: "Before you go",
  included_section_title: "What is included",
  included_label: "Included",
  not_included_label: "Not included",
  itinerary_section_title: "Useful notes",
  reviews_section_title: "Guest feedback",
  guide_section_title: "Tour operator",
  years_guiding_label: "Operator",
  happy_travelers_label: "Departure plan",
  related_section_title: "Similar experiences",
  call_to_action_text: "Ask for availability",
};

const experiences = [
  {
    name: "Elafonisi Day Trip",
    slug: "elafonisi-day-trip",
    content: {
      component: "experience",
      title: "Elafonisi Day Trip",
      short_description:
        "Full-day coach excursion from the Kalyves area to Elafonisi, with guide included. Scheduled every Monday, Wednesday, and Friday.",
      price_display: "35 EUR",
      duration: "Full day",
      location: "Elafonisi, Crete",
      rating: 0,
      reviews_count: 0,
      group_type: "Shared coach excursion",
      trust_text:
        "Operated by IO Tours\nAir-conditioned coach included\nGuide included",
      urgency_text: "Runs every Monday, Wednesday, and Friday",
      availability_notes:
        "Kalyves area departure. Pickup times pending confirmation from operator file.",
      facts: [
        {
          component: "fact_item",
          _uid: "elafonisi-fact-1",
          label: "Operating days",
          value: "Monday, Wednesday, Friday",
        },
        {
          component: "fact_item",
          _uid: "elafonisi-fact-2",
          label: "Transport",
          value: "Air-conditioned coach",
        },
        {
          component: "fact_item",
          _uid: "elafonisi-fact-3",
          label: "Child bus price",
          value: "10 EUR (ages 4-12)",
        },
        {
          component: "fact_item",
          _uid: "elafonisi-fact-4",
          label: "Infants",
          value: "Free under 4 without own seat",
        },
      ],
      included_items: "Air-conditioned coach\nGuide",
      not_included_items: "Personal expenses\nAnything not listed under included services",
      itinerary: [
        {
          component: "itinerary_item",
          _uid: "elafonisi-itinerary-1",
          time: "Pickup",
          title: "Coach departure from Kalyves area",
          description: "Exact pickup times will be added from the operator file.",
        },
        {
          component: "itinerary_item",
          _uid: "elafonisi-itinerary-2",
          time: "Visit",
          title: "Travel to Elafonisi",
          description: "Shared coach excursion with destination guidance during the day.",
        },
        {
          component: "itinerary_item",
          _uid: "elafonisi-itinerary-3",
          time: "Return",
          title: "Coach transfer back",
          description: "Return transport to the Kalyves area after the excursion.",
        },
      ],
      sustainability_points:
        "Shared coach format reduces per-person transport impact\nGroup departures help consolidate transfers",
      guide_name: "IO Tours Team",
      guide_description:
        "Shared coach excursion operated by IO Tours with guide service included.",
      guide_years: "IO Tours",
      happy_travelers: "Mon/Wed/Fri",
      reviews: [],
      highlights: [
        {
          component: "tag",
          _uid: "elafonisi-highlight-1",
          text: "Elafonisi",
        },
        {
          component: "tag",
          _uid: "elafonisi-highlight-2",
          text: "Guide included",
        },
        {
          component: "tag",
          _uid: "elafonisi-highlight-3",
          text: "Coach transfer",
        },
      ],
      seo_title: "Elafonisi Day Trip",
      seo_description:
        "IO Tours full-day Elafonisi coach excursion from the Kalyves area with guide included.",
      ...DEFAULT_LABELS,
    },
  },
  {
    name: "Knossos Day Trip",
    slug: "knossos-day-trip",
    content: {
      component: "experience",
      title: "Knossos Day Trip",
      short_description:
        "Sunday coach excursion from the Kalyves area to Knossos, with guide and whispers included. Knossos tickets must be prepaid and reserved before the excursion date, and guests should share in advance if they qualify for free or reduced entrance.",
      price_display: "42 EUR",
      duration: "Full day",
      location: "Knossos, Crete",
      rating: 0,
      reviews_count: 0,
      group_type: "Shared coach excursion",
      trust_text:
        "Operated by IO Tours\nAir-conditioned coach included\nGuide and whispers included\nShare ticket eligibility before booking",
      urgency_text: "Runs every Sunday",
      availability_notes:
        "Group tickets for Knossos and the Archaeological Museum must be prepaid before the excursion date. Guests should confirm at booking time whether they qualify for free or reduced entrance and bring the required ID or certificates.",
      facts: [
        {
          component: "fact_item",
          _uid: "knossos-fact-1",
          label: "Operating day",
          value: "Sunday",
        },
        {
          component: "fact_item",
          _uid: "knossos-fact-2",
          label: "Knossos entrance",
          value: "15 EUR",
        },
        {
          component: "fact_item",
          _uid: "knossos-fact-3",
          label: "Museum option",
          value: "12 EUR, optional, without guide",
        },
        {
          component: "fact_item",
          _uid: "knossos-fact-4",
          label: "Child bus price",
          value: "16.50 EUR (ages 4-12)",
        },
        {
          component: "fact_item",
          _uid: "knossos-fact-5",
          label: "Reduced entrance",
          value: "Knossos 8 EUR, Museum 6 EUR",
        },
        {
          component: "fact_item",
          _uid: "knossos-fact-6",
          label: "Free entrance",
          value: "Selected categories with valid ID or certificates",
        },
      ],
      included_items: "Air-conditioned coach\nGuide\nWhispers",
      not_included_items:
        "Knossos entrance ticket (15 EUR standard or 8 EUR reduced)\nArchaeological Museum ticket (12 EUR standard or 6 EUR reduced, optional, no guide)\nPersonal expenses",
      itinerary: [
        {
          component: "itinerary_item",
          _uid: "knossos-itinerary-1",
          time: "Pickup",
          title: "Coach departure from Kalyves area",
          description: "Exact pickup times will be added from the operator file.",
        },
        {
          component: "itinerary_item",
          _uid: "knossos-itinerary-2",
          time: "Visit",
          title: "Visit Knossos",
          description: "Guided excursion with whispers included for the Knossos visit.",
        },
        {
          component: "itinerary_item",
          _uid: "knossos-itinerary-3",
          time: "Optional",
          title: "Archaeological Museum",
          description: "Optional self-guided museum visit without guide service.",
        },
        {
          component: "itinerary_item",
          _uid: "knossos-itinerary-4",
          time: "Booking",
          title: "Prepaid ticket check",
          description:
            "Please confirm during booking whether any guest qualifies for free or reduced entrance, so group tickets can be reserved correctly in advance.",
        },
      ],
      sustainability_points:
        "Shared coach format reduces per-person transport impact\nAdvance ticket planning helps manage group access efficiently",
      guide_name: "IO Tours Team",
      guide_description:
        "Shared coach excursion operated by IO Tours with guide and whisper system included for the Knossos visit. Free entrance applies to EU visitors up to 25 years old, non-EU children up to 5, selected students over 25 in EU or EEA secondary or vocational education, and persons with disabilities plus one escort where applicable, always with the required documentation. Reduced entrance applies to non-EU visitors aged 6 to 25 and seniors over 65 from Greece, the EU, or the EEA.",
      guide_years: "IO Tours",
      happy_travelers: "Sunday",
      reviews: [],
      highlights: [
        {
          component: "tag",
          _uid: "knossos-highlight-1",
          text: "Knossos",
        },
        {
          component: "tag",
          _uid: "knossos-highlight-2",
          text: "Guide included",
        },
        {
          component: "tag",
          _uid: "knossos-highlight-3",
          text: "Whispers included",
        },
      ],
      seo_title: "Knossos Day Trip",
      seo_description:
        "IO Tours Sunday Knossos coach excursion from the Kalyves area with guide and whispers included.",
      ...DEFAULT_LABELS,
    },
  },
  {
    name: "Imbros Gorge Day Trip",
    slug: "imbros-gorge-day-trip",
    content: {
      component: "experience",
      title: "Imbros Gorge Day Trip",
      short_description:
        "Wednesday coach excursion from the Kalyves area to Imbros Gorge, with guide included. Entrance fee is paid separately.",
      price_display: "29 EUR",
      duration: "Full day",
      location: "Imbros Gorge, Crete",
      rating: 0,
      reviews_count: 0,
      group_type: "Shared coach excursion",
      trust_text:
        "Operated by IO Tours\nAir-conditioned coach included\nGuide included",
      urgency_text: "Runs every Wednesday",
      availability_notes:
        "Kalyves area departure. Pickup times pending confirmation from operator file.",
      facts: [
        {
          component: "fact_item",
          _uid: "imbros-fact-1",
          label: "Operating day",
          value: "Wednesday",
        },
        {
          component: "fact_item",
          _uid: "imbros-fact-2",
          label: "Entrance fee",
          value: "2.50 EUR",
        },
        {
          component: "fact_item",
          _uid: "imbros-fact-3",
          label: "Transport",
          value: "Air-conditioned coach",
        },
        {
          component: "fact_item",
          _uid: "imbros-fact-4",
          label: "Child bus price",
          value: "10 EUR (ages 4-12)",
        },
      ],
      included_items: "Air-conditioned coach\nGuide",
      not_included_items:
        "Imbros Gorge entrance fee (2.50 EUR)\nPersonal expenses\nAnything not listed under included services",
      itinerary: [
        {
          component: "itinerary_item",
          _uid: "imbros-itinerary-1",
          time: "Pickup",
          title: "Coach departure from Kalyves area",
          description: "Exact pickup times will be added from the operator file.",
        },
        {
          component: "itinerary_item",
          _uid: "imbros-itinerary-2",
          time: "Visit",
          title: "Travel to Imbros Gorge",
          description: "Shared coach excursion with guide service included.",
        },
        {
          component: "itinerary_item",
          _uid: "imbros-itinerary-3",
          time: "Return",
          title: "Coach transfer back",
          description: "Return transport to the Kalyves area after the excursion.",
        },
      ],
      sustainability_points:
        "Shared coach format reduces per-person transport impact\nGroup departures help consolidate transfers",
      guide_name: "IO Tours Team",
      guide_description:
        "Shared coach excursion operated by IO Tours with guide service included.",
      guide_years: "IO Tours",
      happy_travelers: "Wednesday",
      reviews: [],
      highlights: [
        {
          component: "tag",
          _uid: "imbros-highlight-1",
          text: "Imbros Gorge",
        },
        {
          component: "tag",
          _uid: "imbros-highlight-2",
          text: "Guide included",
        },
        {
          component: "tag",
          _uid: "imbros-highlight-3",
          text: "Coach transfer",
        },
      ],
      seo_title: "Imbros Gorge Day Trip",
      seo_description:
        "IO Tours Wednesday Imbros Gorge coach excursion from the Kalyves area with guide included.",
      ...DEFAULT_LABELS,
    },
  },
];

async function fetchJson(url, options = {}) {
  const response = await fetch(url, options);
  const text = await response.text();

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status} ${text}`);
  }

  return text ? JSON.parse(text) : null;
}

async function listStories() {
  return fetchJson(`https://mapi.storyblok.com/v1/spaces/${SPACE_ID}/stories?per_page=100`, {
    headers: { Authorization: TOKEN },
  });
}

async function createStory(payload) {
  return fetchJson(`https://mapi.storyblok.com/v1/spaces/${SPACE_ID}/stories`, {
    method: "POST",
    headers: {
      Authorization: TOKEN,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
}

async function updateStory(storyId, payload) {
  return fetchJson(`https://mapi.storyblok.com/v1/spaces/${SPACE_ID}/stories/${storyId}`, {
    method: "PUT",
    headers: {
      Authorization: TOKEN,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
}

async function upsertExperience(definition) {
  const existingStories = await listStories();
  const fullSlug = `experiences/${definition.slug}`;
  const existingStory = (existingStories.stories || []).find((story) => story.full_slug === fullSlug);
  const payload = {
    story: {
      name: definition.name,
      slug: definition.slug,
      parent_id: EXPERIENCES_FOLDER_ID,
      is_folder: false,
      is_startpage: false,
      published: false,
      content: definition.content,
    },
  };

  if (existingStory) {
    const response = await updateStory(existingStory.id, payload);
    console.log(`Updated draft: ${response.story.full_slug}`);
    return response.story;
  }

  const response = await createStory(payload);
  console.log(`Created draft: ${response.story.full_slug}`);
  return response.story;
}

async function run() {
  for (const experience of experiences) {
    await upsertExperience(experience);
  }
}

run().catch((error) => {
  console.error(error.message || error);
  process.exit(1);
});