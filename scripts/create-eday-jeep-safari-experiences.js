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
  partner_label: "Operated by eDay Travel Tours",
  verification_label: "Jeep safari excursion",
  price_label: "Tour price",
  price_suffix: "per booking",
  why_section_title: "Why this experience",
  about_section_title: "About this experience",
  facts_section_title: "Quick facts",
  sustainability_section_title: "Booking notes",
  included_section_title: "What is included",
  included_label: "Included",
  not_included_label: "Not included",
  itinerary_section_title: "Schedule",
  reviews_section_title: "Guest feedback",
  guide_section_title: "Tour operator",
  years_guiding_label: "Operator",
  happy_travelers_label: "Availability",
  related_section_title: "Similar experiences",
  call_to_action_text: "Ask for availability",
};

function multiline(values) {
  return values.filter(Boolean).join("\n");
}

const experiences = [
  {
    name: "Menies and Diktinna Jeep Safari",
    slug: "menies-diktinna-jeep-safari",
    content: {
      component: "experience",
      title: "Menies and Diktinna Jeep Safari",
      short_description:
        "Full-day private jeep safari to Diktinna and Menies, with monastery stop, beach time, winery visit, and tasting. Operates on Monday, Wednesday, and Friday.",
      price_display: "350 EUR for 1-3 persons",
      duration: "8-9 hours",
      location: "Menies and Diktinna, Crete",
      rating: 0,
      reviews_count: 0,
      group_type: "Private jeep safari",
      trust_text: multiline([
        "Operated by eDay Travel Tours",
        "Runs Monday, Wednesday, and Friday",
        "Departure region: Chania",
        "Bookings should be arranged one day in advance",
      ]),
      urgency_text: "Advance arrangement required at least one day before",
      availability_notes:
        "Pickup and drop-off included. Suitable for all ages except children under 2 years old. Reservation should be arranged one day in advance.",
      facts: [
        { component: "fact_item", _uid: "menies-f1", label: "Operating days", value: "Monday, Wednesday, Friday" },
        { component: "fact_item", _uid: "menies-f2", label: "1-3 persons", value: "350 EUR" },
        { component: "fact_item", _uid: "menies-f3", label: "4 persons", value: "430 EUR" },
        { component: "fact_item", _uid: "menies-f4", label: "5 persons", value: "490 EUR" },
        { component: "fact_item", _uid: "menies-f5", label: "6 persons", value: "550 EUR" },
        { component: "fact_item", _uid: "menies-f6", label: "Fitness level", value: "Level 2" },
        { component: "fact_item", _uid: "menies-f7", label: "Departure region", value: "Chania" },
        { component: "fact_item", _uid: "menies-f8", label: "Commission", value: "15% of listed price" },
      ],
      included_items: multiline([
        "Pickup and return",
        "Coffee, soft drink, water, and beer",
        "Light meal",
        "Wine tasting",
        "Public liability insurance",
        "Guide-driver",
      ]),
      not_included_items: multiline([
        "Anything not explicitly listed under included services",
      ]),
      itinerary: [
        {
          component: "itinerary_item",
          _uid: "menies-i1",
          time: "07:30-08:30",
          title: "Hotel pickup",
          description: "Pickup from your hotel in the Chania region.",
        },
        {
          component: "itinerary_item",
          _uid: "menies-i2",
          time: "09:50",
          title: "Saint John Gkionas old church",
          description: "Arrival at the old church and first stop of the route.",
        },
        {
          component: "itinerary_item",
          _uid: "menies-i3",
          time: "10:10",
          title: "Depart for Menies beach",
          description: "Continue off-road toward Menies beach.",
        },
        {
          component: "itinerary_item",
          _uid: "menies-i4",
          time: "11:10",
          title: "Menies beach and Diktinna sanctuary",
          description: "Visit the old sanctuary of Goddess Artemis and enjoy about 3 hours and 20 minutes of free time for swimming and relaxation.",
        },
        {
          component: "itinerary_item",
          _uid: "menies-i5",
          time: "14:30",
          title: "Depart for winery",
          description: "Leave Menies and head toward the winery facilities.",
        },
        {
          component: "itinerary_item",
          _uid: "menies-i6",
          time: "16:00",
          title: "Pnevmatikakis Winery",
          description: "Tour the facilities and enjoy wine tasting at the winery.",
        },
        {
          component: "itinerary_item",
          _uid: "menies-i7",
          time: "16:40",
          title: "Depart winery",
          description: "Start the return route after the tasting stop.",
        },
        {
          component: "itinerary_item",
          _uid: "menies-i8",
          time: "17:40",
          title: "Hotel drop-off",
          description: "Drop-off back at your hotel.",
        },
      ],
      sustainability_points: multiline([
        "Bring comfortable shoes",
        "Bring a camera",
        "Wear comfortable clothes and swimwear",
        "Bring cash, a daypack, and a beach towel",
        "Suitable for all ages except children under 2 years old",
      ]),
      guide_name: "eDay Travel Tours Team",
      guide_description:
        "Visit the small monastery dedicated to Saint John the Baptist, continue to the ancient sanctuary of Diktinna, swim at Menies beach, enjoy panoramic views toward Kissamos Bay and Gramvousa, and finish with a winery stop and tasting.",
      guide_years: "eDay Travel Tours",
      happy_travelers: "Mon/Wed/Fri",
      reviews: [],
      highlights: [
        { component: "tag", _uid: "menies-h1", text: "Private jeep safari" },
        { component: "tag", _uid: "menies-h2", text: "Menies beach swim stop" },
        { component: "tag", _uid: "menies-h3", text: "Winery tasting" },
      ],
      seo_title: "Menies and Diktinna Jeep Safari",
      seo_description:
        "Private Menies and Diktinna jeep safari by eDay Travel Tours with daily availability on request.",
      ...DEFAULT_LABELS,
    },
  },
  {
    name: "Balos and Falassarna Jeep Safari",
    slug: "balos-falassarna-jeep-safari",
    content: {
      component: "experience",
      title: "Balos and Falassarna Jeep Safari",
      short_description:
        "Full-day private jeep safari through wild Cretan landscapes to Balos Lagoon and Falassarna Beach, with beach time and scenic off-road driving. Operates on Tuesday, Thursday, and Saturday.",
      price_display: "350 EUR for 1-3 persons",
      duration: "8-9 hours",
      location: "Balos and Falassarna, Crete",
      rating: 0,
      reviews_count: 0,
      group_type: "Private jeep safari",
      trust_text: multiline([
        "Operated by eDay Travel Tours",
        "Runs Tuesday, Thursday, and Saturday",
        "Departure region: Chania",
        "Bookings should be arranged one day in advance",
      ]),
      urgency_text: "Advance arrangement required at least one day before",
      availability_notes:
        "Pickup and drop-off included. Reservation should be arranged one day in advance.",
      facts: [
        { component: "fact_item", _uid: "balosf-f1", label: "Operating days", value: "Tuesday, Thursday, Saturday" },
        { component: "fact_item", _uid: "balosf-f2", label: "1-3 persons", value: "350 EUR" },
        { component: "fact_item", _uid: "balosf-f3", label: "4 persons", value: "430 EUR" },
        { component: "fact_item", _uid: "balosf-f4", label: "5 persons", value: "490 EUR" },
        { component: "fact_item", _uid: "balosf-f5", label: "6 persons", value: "550 EUR" },
        { component: "fact_item", _uid: "balosf-f6", label: "Fitness level", value: "Level 2" },
        { component: "fact_item", _uid: "balosf-f7", label: "Departure region", value: "Chania" },
        { component: "fact_item", _uid: "balosf-f8", label: "Commission", value: "15% of listed price" },
      ],
      included_items: multiline([
        "Pickup and return",
        "Coffee, soft drink, water, and beer",
        "Light meal",
        "Wine tasting",
        "Public liability insurance",
        "Guide-driver",
      ]),
      not_included_items: multiline([
        "Personal expenses at Falassarna beach",
      ]),
      itinerary: [
        {
          component: "itinerary_item",
          _uid: "balosf-i1",
          time: "07:30-08:30",
          title: "Hotel pickup",
          description: "Pickup from your hotel.",
        },
        {
          component: "itinerary_item",
          _uid: "balosf-i2",
          time: "10:00",
          title: "Arrive at Balos parking",
          description: "Arrival at the parking area before Balos Lagoon.",
        },
        {
          component: "itinerary_item",
          _uid: "balosf-i3",
          time: "10:00-13:00",
          title: "Balos beach free time",
          description: "Walk about 20 minutes down to Balos Beach and enjoy around 3 hours for swimming and relaxing.",
        },
        {
          component: "itinerary_item",
          _uid: "balosf-i4",
          time: "13:00",
          title: "Depart Balos",
          description: "Continue the route toward Falassarna.",
        },
        {
          component: "itinerary_item",
          _uid: "balosf-i5",
          time: "14:15",
          title: "Falassarna beach stop",
          description: "Arrive at Falassarna beach and stay for about 2 hours.",
        },
        {
          component: "itinerary_item",
          _uid: "balosf-i6",
          time: "16:15",
          title: "Depart Falassarna",
          description: "Start the return route after the beach stop.",
        },
        {
          component: "itinerary_item",
          _uid: "balosf-i7",
          time: "17:30",
          title: "Hotel drop-off",
          description: "Return to your hotel.",
        },
      ],
      sustainability_points: multiline([
        "Bring comfortable shoes",
        "Bring a camera",
        "Wear comfortable clothes and swimwear",
        "Bring cash, a daypack, and a beach towel",
        "The Balos path requires a short walk down to the beach",
      ]),
      guide_name: "eDay Travel Tours Team",
      guide_description:
        "Drive through Kaliviani and along a dirt road to Balos, enjoy time at the lagoon, then continue off-road with panoramic views toward Falassarna before relaxing by the beach.",
      guide_years: "eDay Travel Tours",
      happy_travelers: "Tue/Thu/Sat",
      reviews: [],
      highlights: [
        { component: "tag", _uid: "balosf-h1", text: "Private jeep safari" },
        { component: "tag", _uid: "balosf-h2", text: "Balos Lagoon" },
        { component: "tag", _uid: "balosf-h3", text: "Falassarna beach stop" },
      ],
      seo_title: "Balos and Falassarna Jeep Safari",
      seo_description:
        "Private Balos and Falassarna jeep safari by eDay Travel Tours with daily availability on request.",
      ...DEFAULT_LABELS,
    },
  },
  {
    name: "Prophet Helias Chapel and Falassarna Beach Jeep Safari",
    slug: "prophet-helias-falassarna-jeep-safari",
    content: {
      component: "experience",
      title: "Prophet Helias Chapel and Falassarna Beach Jeep Safari",
      short_description:
        "Full-day jeep safari with mountain trails, wind turbines, a short hike to Prophet Helias Chapel, and beach time at Falassarna. Daily departure from the Chania region.",
      price_display: "350 EUR for 1-3 persons",
      duration: "8-9 hours",
      location: "Prophet Helias Chapel and Falassarna Beach, Crete",
      rating: 0,
      reviews_count: 0,
      group_type: "Private jeep safari",
      trust_text: multiline([
        "Operated by eDay Travel Tours",
        "Daily tour",
        "Departure region: Chania",
        "Bookings should be arranged one day in advance",
      ]),
      urgency_text: "Advance arrangement required at least one day before",
      availability_notes:
        "Pickup and drop-off included. Suitable for all ages except children under 2 years old. Reservation should be arranged one day in advance.",
      facts: [
        { component: "fact_item", _uid: "prophet-f1", label: "Availability", value: "Every day, on request" },
        { component: "fact_item", _uid: "prophet-f2", label: "1-3 persons", value: "350 EUR" },
        { component: "fact_item", _uid: "prophet-f3", label: "4 persons", value: "430 EUR" },
        { component: "fact_item", _uid: "prophet-f4", label: "5 persons", value: "490 EUR" },
        { component: "fact_item", _uid: "prophet-f5", label: "6 persons", value: "550 EUR" },
        { component: "fact_item", _uid: "prophet-f6", label: "Fitness level", value: "Level 3" },
        { component: "fact_item", _uid: "prophet-f7", label: "Departure region", value: "Chania" },
        { component: "fact_item", _uid: "prophet-f8", label: "Commission", value: "15% of listed price" },
      ],
      included_items: multiline([
        "Pickup and return",
        "Coffee, soft drink, water, and beer",
        "Light meal",
        "Wine tasting",
        "Public liability insurance",
        "Guide-driver",
      ]),
      not_included_items: multiline([
        "Personal expenses at Falassarna beach",
      ]),
      itinerary: [
        {
          component: "itinerary_item",
          _uid: "prophet-i1",
          time: "07:30-08:30",
          title: "Hotel pickup",
          description: "Pickup from your hotel.",
        },
        {
          component: "itinerary_item",
          _uid: "prophet-i2",
          time: "10:00",
          title: "Arrive at Pateriana",
          description: "First stop with free time for coffee, snacks, and drinks.",
        },
        {
          component: "itinerary_item",
          _uid: "prophet-i3",
          time: "10:30",
          title: "Depart from Pateriana",
          description: "Continue toward the wind turbine park.",
        },
        {
          component: "itinerary_item",
          _uid: "prophet-i4",
          time: "11:30",
          title: "Wind turbine park stop",
          description: "Short 10-15 minute visit with panoramic views and a stop to learn about renewable energy in the area.",
        },
        {
          component: "itinerary_item",
          _uid: "prophet-i5",
          time: "12:00-12:20",
          title: "Hike to Prophet Helias Chapel",
          description: "Walk from the trailhead up to the chapel summit in about 20 minutes.",
        },
        {
          component: "itinerary_item",
          _uid: "prophet-i6",
          time: "12:20-13:00",
          title: "Summit break and descent",
          description: "Enjoy the mountain summit, take photos, then descend along the scenic route.",
        },
        {
          component: "itinerary_item",
          _uid: "prophet-i7",
          time: "13:05",
          title: "Depart for Falassarna Beach",
          description: "Continue from the mountain route toward the coast.",
        },
        {
          component: "itinerary_item",
          _uid: "prophet-i8",
          time: "14:10",
          title: "Falassarna beach free time",
          description: "Spend around 2 hours and 20 minutes at Falassarna Beach.",
        },
        {
          component: "itinerary_item",
          _uid: "prophet-i9",
          time: "16:30",
          title: "Depart Falassarna",
          description: "Begin the return route.",
        },
        {
          component: "itinerary_item",
          _uid: "prophet-i10",
          time: "17:30",
          title: "Hotel drop-off",
          description: "Return to your hotel.",
        },
      ],
      sustainability_points: multiline([
        "Bring comfortable shoes",
        "Bring a camera",
        "Wear comfortable clothes and swimwear",
        "Bring cash, a daypack, and a beach towel",
        "Suitable for all ages except children under 2 years old",
      ]),
      guide_name: "eDay Travel Tours Team",
      guide_description:
        "Travel mountain trails toward the Prophet Helias peak, stop at the wind turbines above Kissamos, take a short summit hike to the chapel, and continue down to Falassarna Beach for free time by the sea.",
      guide_years: "eDay Travel Tours",
      happy_travelers: "Daily on request",
      reviews: [],
      highlights: [
        { component: "tag", _uid: "prophet-h1", text: "Private jeep safari" },
        { component: "tag", _uid: "prophet-h2", text: "Prophet Helias summit" },
        { component: "tag", _uid: "prophet-h3", text: "Falassarna beach stop" },
      ],
      seo_title: "Prophet Helias Chapel and Falassarna Beach Jeep Safari",
      seo_description:
        "Private Prophet Helias Chapel and Falassarna Beach jeep safari by eDay Travel Tours with daily availability on request.",
      ...DEFAULT_LABELS,
    },
  },
  {
    name: "Balos Beach by Road",
    slug: "balos-beach-by-road",
    content: {
      component: "experience",
      title: "Balos Beach by Road",
      short_description:
        "Daily road transfer to Balos Beach from Kissamos by eDay Travel Tours. A simple beach-focused option with one daytime departure and municipal tax charged separately.",
      price_display: "35 EUR",
      duration: "Approx. 6.5 hours",
      location: "Balos Beach via Kissamos, Crete",
      rating: 0,
      reviews_count: 0,
      group_type: "Shared road excursion",
      trust_text: multiline([
        "Operated by eDay Travel Tours",
        "Daily by road from Kissamos",
        "Municipal tax applies separately",
        "Please book in advance",
      ]),
      urgency_text: "Reserve one day in advance",
      availability_notes:
        "Every day by road. Start from Kissamos at 09:00 and return to Kissamos at 15:30. Bring comfortable shoes, swimwear, cash, a daypack, and a beach towel.",
      facts: [
        { component: "fact_item", _uid: "balosroad-f1", label: "Availability", value: "Every day" },
        { component: "fact_item", _uid: "balosroad-f2", label: "Departure", value: "Kissamos 09:00" },
        { component: "fact_item", _uid: "balosroad-f3", label: "Return", value: "Kissamos 15:30" },
        { component: "fact_item", _uid: "balosroad-f4", label: "Price", value: "35 EUR per person" },
        { component: "fact_item", _uid: "balosroad-f5", label: "Municipal tax", value: "+1 EUR per person" },
        { component: "fact_item", _uid: "balosroad-f6", label: "Departure area", value: "Kissamos" },
        { component: "fact_item", _uid: "balosroad-f7", label: "Commission", value: "5 EUR per passenger" },
      ],
      included_items: multiline([
        "Road transfer to Balos Beach",
        "Daily departure from Kissamos",
      ]),
      not_included_items: multiline([
        "1 EUR municipal tax per person",
        "Anything not explicitly listed by the operator",
      ]),
      itinerary: [
        {
          component: "itinerary_item",
          _uid: "balosroad-i1",
          time: "09:00",
          title: "Departure from Kissamos",
          description: "Road departure toward Balos Beach.",
        },
        {
          component: "itinerary_item",
          _uid: "balosroad-i2",
          time: "15:30",
          title: "Return to Kissamos",
          description: "Return arrival in Kissamos after the beach visit.",
        },
        {
          component: "itinerary_item",
          _uid: "balosroad-i3",
          time: "Booking",
          title: "Reserve one day in advance",
          description: "All listed jeep safari bookings are arranged upon request at least one day before departure.",
        },
      ],
      sustainability_points: multiline([
        "Bring comfortable shoes",
        "Bring a camera",
        "Wear comfortable clothes and swimwear",
        "Bring cash, a daypack, and a beach towel",
        "Please do not remove natural materials from the beach",
      ]),
      guide_name: "eDay Travel Tours Team",
      guide_description:
        "Shared Balos beach road excursion arranged by eDay Travel Tours with departures from Kissamos.",
      guide_years: "eDay Travel Tours",
      happy_travelers: "Every day",
      reviews: [],
      highlights: [
        { component: "tag", _uid: "balosroad-h1", text: "Balos by road" },
        { component: "tag", _uid: "balosroad-h2", text: "Two daily departures" },
        { component: "tag", _uid: "balosroad-h3", text: "Minimum 2 persons" },
      ],
      seo_title: "Balos Beach by Road",
      seo_description:
        "Balos Beach by road with two daily departures from Kissamos by eDay Travel Tours.",
      ...DEFAULT_LABELS,
      price_suffix: "per person",
    },
  },
  {
    name: "Elafonissi Beach Day Trip",
    slug: "elafonissi-beach-day-trip",
    content: {
      component: "experience",
      title: "Elafonissi Beach Day Trip",
      short_description:
        "Full-day beach excursion from Chania to Elafonissi Beach by eDay Travel Tours, with a long seaside stop and optional lunch stop in Elos village.",
      price_display: "Price on request",
      duration: "8-10 hours",
      location: "Elafonissi Beach, Crete",
      rating: 0,
      reviews_count: 0,
      group_type: "Beach day excursion",
      trust_text: multiline([
        "Operated by eDay Travel Tours",
        "No fitness level required",
        "Departure area: Chania",
      ]),
      urgency_text: "Timetable may change, always confirm with your guide",
      availability_notes:
        "Indicative timetable only. The schedule may be subject to change, so guests should always confirm with the guide.",
      facts: [
        { component: "fact_item", _uid: "elafonissi-f1", label: "Departure area", value: "Chania" },
        { component: "fact_item", _uid: "elafonissi-f2", label: "Duration", value: "8-10 hours" },
        { component: "fact_item", _uid: "elafonissi-f3", label: "Fitness", value: "No fitness required" },
        { component: "fact_item", _uid: "elafonissi-f4", label: "Arrival at beach", value: "11:00-11:30" },
        { component: "fact_item", _uid: "elafonissi-f5", label: "Departure from beach", value: "15:00-15:30" },
      ],
      included_items: multiline([
        "Transport to and from Elafonissi Beach",
        "Full-day beach excursion",
      ]),
      not_included_items: multiline([
        "Beach equipment",
        "Optional lunch in Elos village",
        "Taking seashells or pink sand from the beach is strictly prohibited",
      ]),
      itinerary: [
        {
          component: "itinerary_item",
          _uid: "elafonissi-i1",
          time: "07:30-09:35",
          title: "Departure from Chania",
          description: "Morning departure toward Elafonissi Beach.",
        },
        {
          component: "itinerary_item",
          _uid: "elafonissi-i2",
          time: "11:00-11:30",
          title: "Arrival at Elafonissi Beach",
          description: "Arrive at the beach for swimming and free time.",
        },
        {
          component: "itinerary_item",
          _uid: "elafonissi-i3",
          time: "15:00-15:30",
          title: "Departure from Elafonissi",
          description: "Leave the beach and begin the return journey.",
        },
        {
          component: "itinerary_item",
          _uid: "elafonissi-i4",
          time: "16:00",
          title: "Elos village stop",
          description: "Optional lunch stop in Elos village.",
        },
        {
          component: "itinerary_item",
          _uid: "elafonissi-i5",
          time: "18:00-19:00",
          title: "Return to Chania",
          description: "Estimated arrival back in Chania.",
        },
      ],
      sustainability_points: multiline([
        "Bring comfortable clothes and shoes for a bus trip",
        "Bring beach equipment, a hat, and sunscreen",
        "Do not dispose of rubbish at the beach",
        "Do not remove seashells or pink sand from Elafonissi",
      ]),
      guide_name: "eDay Travel Tours Team",
      guide_description:
        "Elafonissi is one of Crete's most famous beaches, known for its turquoise water, shallow lagoon, pink-toned sand, and protected natural environment. This day trip focuses on free beach time with an optional lunch stop on the return journey.",
      guide_years: "eDay Travel Tours",
      happy_travelers: "Check operator schedule",
      reviews: [],
      highlights: [
        { component: "tag", _uid: "elafonissi-h1", text: "Pink sand beach" },
        { component: "tag", _uid: "elafonissi-h2", text: "Family-friendly lagoon" },
        { component: "tag", _uid: "elafonissi-h3", text: "Optional Elos stop" },
      ],
      seo_title: "Elafonissi Beach Day Trip",
      seo_description:
        "Full-day Elafonissi Beach excursion from Chania by eDay Travel Tours.",
      ...DEFAULT_LABELS,
      verification_label: "Beach excursion",
      price_label: "Price",
      price_suffix: "check with operator",
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