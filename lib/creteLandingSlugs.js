const CRETE_LANDING_ORDER = [
  "elafonissi-beach-day-trip",
  "balos-beach-by-road",
  "balos-falassarna-jeep-safari",
  "menies-diktinna-jeep-safari",
  "prophet-helias-falassarna-jeep-safari",
  "elafonisi-day-trip",
  "imbros-gorge-day-trip",
  "knossos-day-trip",
  "sunset-boat-tour",
];

function getCreteLandingSlugs() {
  return [...CRETE_LANDING_ORDER];
}

module.exports = { CRETE_LANDING_ORDER, getCreteLandingSlugs };
