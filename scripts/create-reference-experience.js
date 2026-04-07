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

const referenceStory = {
  story: {
    name: "Curator Reference Experience",
    slug: "curator-reference-experience",
    parent_id: EXPERIENCES_FOLDER_ID,
    is_folder: false,
    is_startpage: false,
    published: false,
    content: {
      component: "experience",
      title: "Curator Reference Experience",
      short_description:
        "Reference entry showing how to fill in an experience. Use this as a model, not as live content.",
      price_display: "42 EUR",
      duration: "180min",
      images: [
        {
          filename:
            "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&h=900&fit=crop",
        },
      ],
      location: "Chania, Crete",
      rating: 4.8,
      reviews_count: 124,
      group_type: "Small group",
      trust_text: "Curated local partner\nFast response booking\nGreat for sunset lovers",
      urgency_text: "Usually booked 2-3 days in advance",
      facts: [
        {
          component: "fact_item",
          _uid: "ref-fact-duration",
          label: "Duration",
          value: "180min",
        },
        {
          component: "fact_item",
          _uid: "ref-fact-group",
          label: "Group size",
          value: "Up to 10 guests",
        },
        {
          component: "fact_item",
          _uid: "ref-fact-language",
          label: "Language",
          value: "English",
        },
      ],
      included_items: "Boat trip\nLocal host\nSafety gear",
      not_included_items: "Hotel transfer\nPersonal expenses",
      itinerary: [
        {
          component: "itinerary_item",
          _uid: "ref-iti-1",
          time: "17:30",
          title: "Meet at harbor",
          description: "Arrive 15 minutes early and meet the host.",
        },
        {
          component: "itinerary_item",
          _uid: "ref-iti-2",
          time: "18:00",
          title: "Depart by boat",
          description: "Set off for the sunset cruise.",
        },
        {
          component: "itinerary_item",
          _uid: "ref-iti-3",
          time: "20:30",
          title: "Return to harbor",
          description: "Disembark and continue your evening in town.",
        },
      ],
      sustainability_points:
        "Supports local skippers\nSmall-group format\nLow-impact coastal route",
      guide_name: "Example Host Name",
      guide_description:
        "Use this field for a short guide biography and personality notes.",
      guide_years: "8+",
      happy_travelers: "400+",
      reviews: [
        {
          component: "review_item",
          _uid: "ref-review-1",
          name: "Example Guest",
          rating: 5,
          text: "Beautiful example review text for curators.",
        },
      ],
      highlights: [
        {
          component: "tag",
          _uid: "ref-highlight-1",
          text: "Sunset views",
        },
        {
          component: "tag",
          _uid: "ref-highlight-2",
          text: "Small group",
        },
        {
          component: "tag",
          _uid: "ref-highlight-3",
          text: "Local host",
        },
      ],
      call_to_action_text: "Check availability",
      partner_label: "Curated by Wanderlast",
      verification_label: "Local partner verified",
      price_label: "Starting price",
      price_suffix: "per person",
      why_section_title: "Why this experience",
      about_section_title: "About this experience",
      facts_section_title: "Quick facts",
      sustainability_section_title: "Local impact & sustainability",
      sustainability_intro:
        "Use this intro to explain the local impact in one sentence.",
      included_section_title: "What is included",
      included_label: "In your experience",
      not_included_label: "Not included",
      itinerary_section_title: "Itinerary",
      reviews_section_title: "What guests say",
      guide_section_title: "Meet your guide",
      years_guiding_label: "Years guiding",
      happy_travelers_label: "Happy travelers",
      related_section_title: "Similar experiences",
      availability_widget:
        "https://wa.me/306934126131?text=Hi%20I%20am%20interested%20in%20this%20reference%20experience",
      seo_title: "Curator Reference Experience",
      seo_description:
        "Reference Storyblok experience entry for curator guidance.",
    },
  },
};

async function run() {
  const checkRes = await fetch(
    `https://mapi.storyblok.com/v1/spaces/${SPACE_ID}/stories?per_page=100`,
    {
      headers: { Authorization: TOKEN },
    }
  );

  if (!checkRes.ok) {
    throw new Error(`Failed to list stories: ${checkRes.status}`);
  }

  const existing = await checkRes.json();
  const found = (existing.stories || []).find(
    (story) => story.full_slug === "experiences/curator-reference-experience"
  );

  if (found) {
    console.log(`Reference story already exists: ${found.full_slug} (id: ${found.id})`);
    return;
  }

  const createRes = await fetch(
    `https://mapi.storyblok.com/v1/spaces/${SPACE_ID}/stories`,
    {
      method: "POST",
      headers: {
        Authorization: TOKEN,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(referenceStory),
    }
  );

  const responseText = await createRes.text();

  if (!createRes.ok) {
    throw new Error(`Failed to create reference story: ${createRes.status} ${responseText}`);
  }

  console.log(responseText);
}

run().catch((error) => {
  console.error(error.message || error);
  process.exit(1);
});