/**
 * Image Reference Guide for Wanderlast
 * 
 * Copy your images to these locations and update paths in components:
 */

export const imageMapping = {
  // Destination Hero Images
  destinations: {
    thailand: {
      heroPath: "/images/destinations/thailand-temple.jpg",
      description: "Beautiful Thai temple (Ayutthaya) - Use for hero banner",
      useIn: ["PageThailand hero section", "Featured destination card"]
    },
    india: {
      heroPath: "/images/destinations/india-palace.jpg",
      description: "Maharaja Palace - Use as India hero background",
      useIn: ["PageIndia hero section"]
    }
  },

  // Experience Categories
  experiences: {
    adventure: [
      {
        path: "/images/experiences/hiking-mountains.jpg",
        title: "Mountain Hiking",
        category: "Adventure",
        useIn: ["Mountain trekking experience cards"]
      },
      {
        path: "/images/experiences/forest-trek.jpg",
        title: "Forest Trekking",
        category: "Adventure",
        useIn: ["Jungle trek experience cards"]
      },
      {
        path: "/images/experiences/cave-adventure.jpg",
        title: "Cave Exploration",
        category: "Adventure",
        useIn: ["Cave tour experience cards"]
      }
    ],
    cultural: [
      {
        path: "/images/experiences/temple-spiritual.jpg",
        title: "Temple Visits",
        category: "Cultural",
        useIn: ["Spiritual heritage cards"]
      },
      {
        path: "/images/experiences/religious-landmark.jpg",
        title: "Religious Sites",
        category: "Cultural",
        useIn: ["Sacred monument cards"]
      }
    ],
    nature: [
      {
        path: "/images/experiences/forest-nature.jpg",
        title: "Forest Exploration",
        category: "Nature",
        useIn: ["Nature exploration cards"]
      },
      {
        path: "/images/experiences/jungle-plants.jpg",
        title: "Plant & Wildlife",
        category: "Nature",
        useIn: ["Flora/fauna observation cards"]
      }
    ]
  },

  // Featured Images for Sections
  featured: {
    topDestinations: [
      "/images/destinations/thailand-temple.jpg",
      "/images/destinations/india-palace.jpg"
    ],
    topExperiences: [
      "/images/experiences/hiking-mountains.jpg",
      "/images/experiences/temple-spiritual.jpg",
      "/images/experiences/forest-nature.jpg"
    ]
  }
};

/**
 * Instructions to integrate images:
 * 
 * 1. Save all your photos to:
 *    - /public/images/destinations/ (for destination-specific images)
 *    - /public/images/experiences/ (for experience/activity images)
 * 
 * 2. Use these filename patterns:
 *    - Destinations: {country}-{landmark}.jpg (e.g., thailand-temple.jpg)
 *    - Experiences: {category}-{type}.jpg (e.g., hiking-mountains.jpg)
 * 
 * 3. Update components to reference these paths instead of Unsplash
 * 
 * 4. For optimization:
 *    - Use Next.js Image component for auto-optimization
 *    - Set widths: hero=1400px, cards=400px
 *    - Add loading="lazy" for below-fold images
 */
