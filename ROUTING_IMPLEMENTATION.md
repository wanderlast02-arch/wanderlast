# Wanderlast Hierarchical Routing Implementation Guide

## Overview

This document describes the complete hierarchical routing system implemented for Wanderlast, enabling Country → Destination → Experience navigation with Storyblok integration, dynamic SEO, and breadcrumb navigation.

## ✅ Completed Implementation

### 1. Dynamic Route Pages (Created)

#### Country Page
- **Location**: `/app/country/[slug]/page.jsx`
- **Features**:
  - Fetches country story from Storyblok: `cdn/stories/country/{slug}`
  - Dynamic metadata generation (title, description, OpenGraph image)
  - Displays: Hero, Breadcrumb (Home › Country), Description, Destinations Grid, Featured Experiences, Travel Tips, Nearby Countries
  - Server Component using async/await pattern
  - Handles 404 with `notFound()` when story doesn't exist

#### Destination Page
- **Location**: `/app/destination/[slug]/page.jsx`
- **Features**:
  - Fetches destination story: `cdn/stories/destination/{slug}`
  - Breadcrumb chain: Home › Country › Destination (with working links)
  - Parent country link extracted from `content.country.slug`
  - Displays: Hero, About section (richtext), Experiences Grid, Travel Tips, Nearby Destinations
  - Dynamic metadata with destination-specific info

#### Experience Page
- **Location**: `/app/experience/[slug]/page.jsx`
- **Features**:
  - Fetches experience story: `cdn/stories/experience/{slug}`
  - Complete hierarchical breadcrumb: Home › Country › Destination › Experience
  - 2-column layout: Content (left) + Sidebar (right)
  - **Left Column**: About, Highlights (✓ list), Itinerary, Included/Not Included
  - **Right Sidebar**:
    - Sustainability card with 🌱 badge, score circle (#7BA68E accent), explanation text
    - CTA button "Book This Experience" with hover effects
  - Hero displays price (€) and duration badges
  - Richtext support for about and itinerary sections

### 2. Storyblok Schemas (Created)

#### country_page Schema
**File**: `/storyblok/schemas/country_page.schema.json`
```
Fields:
- title (text) - Country name
- hero_image (asset) - Background image
- tagline (text) - Short description
- description (textarea) - Full country description
- destinations (multilink) - Links to destination_page components
- featured_experiences (multilink) - Links to experience_page components
- travel_tips (blocks) - Travel tips content blocks
- sustainability_message (richtext) - Environmental message
- nearby_countries (multilink) - Related countries
```

#### destination_page Schema
**File**: `/storyblok/schemas/destination_page.schema.json`
```
Fields:
- title (text) - Destination name
- country (multilink, max_items: 1) - Parent country (for breadcrumb)
- hero_image (asset) - Destination image
- short_description (text) - Subtitle/summary
- about_destination (richtext) - Full description
- experiences (multilink) - Links to experience_page components
- travel_tips (blocks) - Local travel tips
- nearby_destinations (multilink) - Related destinations in same country
```

#### experience_page Schema
**File**: `/storyblok/schemas/experience_page.schema.json`
```
Fields:
- title (text) - Experience name
- hero_image (asset) - Main image
- destination (multilink, max_items: 1) - Parent destination
- country (multilink, max_items: 1) - Parent country (for breadcrumb)
- price (number) - Experience cost in EUR
- duration (text) - Duration string (e.g., "4 hours")
- sustainability_score (number) - 1-5 score for eco-friendliness
- about_experience (richtext) - Full description
- highlights (textarea) - Key highlights (use line breaks)
- itinerary (richtext) - Day-by-day or hourly itinerary
- included (textarea) - What's included list
- not_included (textarea) - What's not included list
- call_to_action_text (text) - Custom CTA button text
- merchant (multilink) - Link to booking partner/merchant
```

### 3. Infrastructure Files

#### Breadcrumbs Component
- **Location**: `/components/Breadcrumbs.jsx`
- **Props**: `items = []` array of `{ label, href }` objects
- **Features**: 
  - Always shows "Home" first
  - Semantic HTML with `<nav>` and `<ol>` tags
  - Responsive separator: ›
  - Styled with Wanderlast brand colors

#### Storyblok Query Utilities
- **Location**: `/lib/storyblok.js`
- **Functions**:
  ```javascript
  getFeaturedCountries()         // Returns 6 countries, sorted by name
  getFeaturedDestinations()      // Returns 6 destinations, sorted by name
  getFeaturedExperiences()       // Returns 6 experiences, sorted by creation date
  getFeaturedCollections()       // Returns 6 collections, sorted by name
  ```
- **Features**:
  - Async/await pattern
  - Uses `getStoryblokApi()` for consistent API access
  - Graceful error handling (returns empty array on error)
  - Version: "published" for production content

#### Dynamic Sitemap Generator
- **Location**: `/app/sitemap.xml/route.js`
- **Features**:
  - Generates XML sitemap for all content types
  - **Priority Hierarchy**:
    - 1.0 = Homepage
    - 0.9 = Countries
    - 0.8 = Destinations
    - 0.7 = Experiences
    - 0.6 = Merchants & Collections
  - All entries: changefreq="weekly"
  - Last modified: `published_at` from Storyblok stories
  - Cache headers: `s-maxage=3600, stale-while-revalidate=86400`
  - Access at: `/sitemap.xml`

#### Homepage Integration
- **File**: `/storyblok/components/pages/PageHome.jsx`
- **Updates**:
  - Converted from client to async server component
  - Added 3 new featured sections:
    1. **Featured Countries**: Grid of country cards linking to `/country/[slug]`
    2. **Featured Destinations**: Grid of destination cards linking to `/destination/[slug]`
    3. **Enhanced Featured Experiences**: Dynamic experience cards with price/duration
  - Each section fetches from Storyblok via query utilities
  - Fallback to static data if Storyblok content unavailable
  - Maintains existing sections: Why Choose Us, Best Offers, Travel Tips, Trusted Orgs, etc.

## 🔄 URL Structure

```
Homepage
├─ /country/[slug]
│  ├─ /destination/[slug]
│  │  └─ /experience/[slug]
│  └─ /destination/[slug]
│     └─ /experience/[slug]
└─ /country/[slug]
   └─ /destination/[slug]
      └─ /experience/[slug]
```

**Example URLs**:
- `/country/cambodia`
- `/destination/angkor-wat`
- `/experience/angkor-sunrise-temple-tour`
- `/sitemap.xml`

## 🎨 Design System

All pages use Wanderlast brand colors and spacing:
- **Primary**: `#2D5F4F` (deep forest green)
- **Accent**: `#7BA68E` (sage green) 
- **Surface**: `#F7F5F1` (light warm gray)
- **Text Primary**: `#111827` (dark)
- **Text Secondary**: `#4B5563` (muted)

Components feature:
- Hover lift effects: `translateY(-2px) to (-4px)`
- Smooth transitions: `all 0.3s ease`
- Rounded corners: `12px` default
- Shadows: `0 4px 12px rgba(15, 23, 42, 0.08)` → `0 8px 20px rgba(15, 23, 42, 0.15)` on hover

## 📋 Next Steps (Manual Setup Required)

### Step 1: Import Schemas to Storyblok
1. Log into your Storyblok space
2. Go to **Settings** → **Components**
3. For each of these JSON files, create a new component:
   - `/storyblok/schemas/country_page.schema.json`
   - `/storyblok/schemas/destination_page.schema.json`
   - `/storyblok/schemas/experience_page.schema.json`
4. Configure multilink filters:
   - `country_page.destinations` → Filter by: `destination_page`
   - `country_page.featured_experiences` → Filter by: `experience_page`
   - `destination_page.country` → Filter by: `country_page`
   - `destination_page.experiences` → Filter by: `experience_page`
   - `experience_page.destination` → Filter by: `destination_page`
   - `experience_page.country` → Filter by: `country_page`

### Step 2: Create Test Content in Storyblok

**Create a Country Story**:
1. Create new story with component: `country_page`
2. Set slug (e.g., `cambodia`)
3. Fill fields:
   - title: "Cambodia"
   - tagline: "Land of temples and tradition"
   - hero_image: Choose image
   - description: Full country description
   - travel_tips: Add travel tips blocks
4. Publish

**Create Destination Stories**:
1. Create with component: `destination_page`
2. Set slug (e.g., `angkor-wat`)
3. Fill fields:
   - title: "Angkor Wat"
   - country: Link to the Cambodia country story (via multilink)
   - hero_image: Image
   - short_description: "The largest religious monument in the world"
   - about_destination: Richtext with full description
   - travel_tips: Local tips
4. Publish

**Create Experience Stories**:
1. Create with component: `experience_page`
2. Set slug (e.g., `angkor-sunrise-tour`)
3. Fill fields:
   - title: "Angkor Sunrise Temple Tour"
   - destination: Link to Angkor Wat destination story
   - country: Link to Cambodia country story
   - price: 59 (EUR)
   - duration: "4 hours"
   - sustainability_score: 4
   - hero_image: Image
   - about_experience: Description with richtext
   - highlights: Line-separated list
   - itinerary: Detailed day/time breakdown
   - included/not_included: What's provided
   - call_to_action_text: "Book This Tour"
4. Publish

### Step 3: Test Routes

Once content is published in Storyblok:

1. **Start dev server**: `npm run dev`
2. **Visit routes**:
   - `http://localhost:3000/country/cambodia` - Should display country page
   - `http://localhost:3000/destination/angkor-wat` - Should display destination
   - `http://localhost:3000/experience/angkor-sunrise-tour` - Should display experience with full breadcrumb chain
   - `http://localhost:3000/sitemap.xml` - Should display XML sitemap

3. **Verify**:
   - ✓ Breadcrumbs show complete chain: Home › Country › Destination › Experience
   - ✓ All links navigate correctly
   - ✓ Images load properly
   - ✓ Metadata displays correctly (check page title in browser tab)
   - ✓ Hover effects work smoothly
   - ✓ Sustainability card displays on experience page

### Step 4: Update Homepage (Optional)

The homepage now dynamically fetches featured content. To customize:

1. In `/storyblok/components/pages/PageHome.jsx`:
   - Adjust the number of featured items in queries (currently 6)
   - Modify section styling or layout
   - Update section titles/descriptions

2. In `/lib/storyblok.js`:
   - Adjust sorting (currently: name ascending, or created_at descending)
   - Modify filter criteria
   - Change result limits

## 🔗 Content Relationships

```
country_page
├─ many: destination_page stories
│  └─ each destination links back to parent country
└─ many: experience_page stories (featured)
   └─ each experience links to parent destination + country

destination_page
├─ one: country_page (parent)
├─ many: experience_page stories
│  └─ each links to parent destination
└─ many: nearby_destination_page stories

experience_page
├─ one: destination_page (parent)
├─ one: country_page (for breadcrumb)
├─ one: merchant (booking partner)
└─ sustainability_score (1-5)
```

## 📊 Metadata Generation

Each page generates dynamic metadata:
- **Title**: Story title + " - Wanderlast"
- **Description**: Story content.description or short_description
- **OpenGraph Image**: story.content.hero_image
- **Canonical URL**: Full URL based on slug

## ✨ Features Highlights

✅ **Hierarchical Navigation**: Country → Destination → Experience  
✅ **Automatic Breadcrumbs**: Complete navigation chain on each page  
✅ **Dynamic SEO**: Page-specific titles, descriptions, OpenGraph  
✅ **Sitemap Generation**: Automatic discovery of all routes  
✅ **Brand Consistency**: Wanderlast colors, spacing, typography throughout  
✅ **Server-Side Rendering**: Fast page loads, SEO-friendly  
✅ **Error Handling**: Graceful 404 pages for missing content  
✅ **Responsive Design**: Works on all screen sizes  
✅ **Hover Effects**: Smooth animations and visual feedback  

## 🐛 Troubleshooting

### Routes not rendering
- **Check**: Are schemas imported into Storyblok?
- **Check**: Is content published (not just draft)?
- **Check**: Does story slug match URL slug?
- **Check**: Are multilink relationships configured correctly?

### Images not loading
- **Check**: Is hero_image field populated in Storyblok?
- **Check**: Are image URLs valid and public?
- **Fallback**: Pages use gradient backgrounds if image missing

### Breadcrumbs broken
- **Check**: Are parent links properly set in multilink fields?
- **Check**: Do destination stories link to country story?
- **Check**: Do experience stories link to both destination AND country?

### Sitemap empty
- **Check**: Are all stories published?
- **Check**: Is Storyblok API token valid?
- **Check**: Are queries filtering for correct content types?

## 📝 API Reference

### getFeaturedCountries()
```javascript
const countries = await getFeaturedCountries();
// Returns: Array of 6 country story objects, sorted by name
// Each object: { uuid, slug, content: { title, hero_image, ... }, ... }
```

### getFeaturedDestinations()
```javascript
const destinations = await getFeaturedDestinations();
// Returns: Array of 6 destination story objects
```

### getFeaturedExperiences()
```javascript
const experiences = await getFeaturedExperiences();
// Returns: Array of 6 experience story objects, sorted by creation date (newest first)
```

### Breadcrumbs Component
```jsx
<Breadcrumbs items={[
  { label: "Thailand", href: "/country/thailand" },
  { label: "Bangkok", href: "/destination/bangkok" },
  { label: "Street Food Tour" } // No href = not clickable
]} />
```

## 🎯 Performance Notes

- Routes use Server Components for optimal performance
- Storyblok API calls use `version: "published"` for cached content
- Sitemap generator uses `Promise.all()` for parallel queries
- Homepage queries are cached via ISR (Incremental Static Regeneration)
- Images lazy-load with Next.js Image optimization (when implemented)

## 📚 Related Files

- Routing: `/app/country/[slug]/page.jsx`, `/app/destination/[slug]/page.jsx`, `/app/experience/[slug]/page.jsx`
- Schemas: `/storyblok/schemas/{country_page,destination_page,experience_page}.schema.json`
- Utilities: `/lib/storyblok.js`
- Components: `/components/Breadcrumbs.jsx`
- SEO: `/app/sitemap.xml/route.js`
- Homepage: `/storyblok/components/pages/PageHome.jsx`

---

**Implementation Date**: Current Session  
**Status**: ✅ Complete (Awaiting manual Storyblok content setup)
