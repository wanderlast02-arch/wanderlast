# 🚀 Quick Start - Wanderlast Hierarchical Routing

## TL;DR - What to Do Now

1. **Start dev server**:
   ```bash
   npm run dev
   ```

2. **Import schemas to Storyblok** (5 minutes):
   - Settings → Components
   - Create 3 components from JSON files in `/storyblok/schemas/`

3. **Create test content in Storyblok** (15 minutes):
   - 1 country story
   - 2-3 destination stories (link to country)
   - 2-3 experience stories (link to destination + country)

4. **Test routes** (5 minutes):
   ```
   http://localhost:3000/country/your-slug
   http://localhost:3000/destination/your-slug
   http://localhost:3000/experience/your-slug
   ```

5. **Check homepage**:
   ```
   http://localhost:3000
   ```
   Should show "Explore Countries", "Featured Destinations", "Featured Experiences" sections

---

## 📁 Key Files Reference

| Purpose | Location |
|---------|----------|
| Country page | `/app/country/[slug]/page.jsx` |
| Destination page | `/app/destination/[slug]/page.jsx` |
| Experience page | `/app/experience/[slug]/page.jsx` |
| Breadcrumbs | `/components/Breadcrumbs.jsx` |
| Query utils | `/lib/storyblok.js` |
| Sitemap | `/app/sitemap.xml/route.js` |
| Schemas | `/storyblok/schemas/*_page.schema.json` |

---

## 🎯 Storyblok Setup (Step by Step)

### Import Schemas

1. Go to your Storyblok space
2. **Settings** → **Components**
3. Click **"Create Component"** for each:
   - `country_page` (from `/storyblok/schemas/country_page.schema.json`)
   - `destination_page` (from `/storyblok/schemas/destination_page.schema.json`)
   - `experience_page` (from `/storyblok/schemas/experience_page.schema.json`)

### Configure Multilinks

After importing, set up field filters:

**country_page**:
- `destinations` → Filter by: `destination_page`
- `featured_experiences` → Filter by: `experience_page`

**destination_page**:
- `country` → Filter by: `country_page` (max 1)
- `experiences` → Filter by: `experience_page`

**experience_page**:
- `destination` → Filter by: `destination_page` (max 1)
- `country` → Filter by: `country_page` (max 1)

---

## 📝 Create Content

### Story 1: Country
```
Component: country_page
Slug: cambodia
Fields:
  title: "Cambodia"
  tagline: "Land of temples and ancient wonders"
  hero_image: [Choose image]
  description: "Cambodia is home to..."
  travel_tips: [Add 1-2 tips]
Action: Publish
```

### Story 2-3: Destinations
```
Component: destination_page
Slug: angkor-wat
Fields:
  title: "Angkor Wat"
  country: [Link to Cambodia story]
  hero_image: [Choose image]
  short_description: "The largest religious monument"
  about_destination: "[Richtext] Angkor Wat is..."
  travel_tips: [Add tips]
Action: Publish
```

### Story 4-5: Experiences
```
Component: experience_page
Slug: angkor-sunrise-tour
Fields:
  title: "Angkor Sunrise Temple Tour"
  destination: [Link to Angkor Wat]
  country: [Link to Cambodia]
  price: 59
  duration: "4 hours"
  sustainability_score: 4
  hero_image: [Choose image]
  about_experience: "[Richtext] Watch the sunrise..."
  highlights: "✓ Best sunrise views\n✓ Expert guide\n✓ Small group"
  itinerary: "[Richtext] 5:00 AM pickup...\n6:00 AM arrive at temple..."
  included: "• Hotel pickup\n• Breakfast\n• Expert guide"
  not_included: "• Lunch\n• Hotel dropoff"
  call_to_action_text: "Book This Tour"
Action: Publish
```

Repeat for 1-2 more experiences.

---

## ✅ Testing Checklist

After creating content, test these URLs:

- [ ] `http://localhost:3000` → Homepage loads, shows featured sections
- [ ] `http://localhost:3000/country/cambodia` → Country page shows
- [ ] `http://localhost:3000/destination/angkor-wat` → Destination loads, breadcrumb correct
- [ ] `http://localhost:3000/experience/angkor-sunrise-tour` → Full breadcrumb chain visible
- [ ] Click country card on homepage → Goes to `/country/[slug]`
- [ ] Click destination card → Goes to `/destination/[slug]`
- [ ] Click experience card → Goes to `/experience/[slug]`
- [ ] Breadcrumb links work (navigate up hierarchy)
- [ ] Images load
- [ ] Hover effects smooth
- [ ] Prices display on experience cards
- [ ] Sustainability score visible on experience page
- [ ] `/sitemap.xml` shows XML with all content

---

## 🎨 What You'll See

### Homepage (New Sections)
```
┌─────────────────────────────┐
│    Explore Countries        │  ← New dynamic section
├─────────────────────────────┤
│  [Country 1] [Country 2]... │
├─────────────────────────────┤
│  Featured Destinations      │  ← New dynamic section
├─────────────────────────────┤
│  [Dest 1] [Dest 2]...       │
├─────────────────────────────┤
│  Featured Experiences       │  ← Updated with Storyblok
├─────────────────────────────┤
│  [Exp 1] €59 [Exp 2] €79... │
└─────────────────────────────┘
```

### Country Page
```
┌─────────────────────────────┐
│      Cambodia               │  ← Breadcrumb: Home › Cambodia
│ [Hero Image]                │
├─────────────────────────────┤
│  Explore 3 Destinations     │
│  [Angkor Wat] [Phnom Penh]..│
├─────────────────────────────┤
│  Featured Experiences       │
│  [Tour 1] €59 [Tour 2] €79..│
└─────────────────────────────┘
```

### Experience Page
```
┌─────────────────────────────┐
│  Breadcrumb: Home › Cambodia │  ← Full hierarchy
│    › Angkor Wat › Tour Name │
├─────────────────────────────┤
│  €59 • 4 hours    [Hero]    │
├─────────────────────────────┤
│ About | Itinerary | Included│  │ Sustainability  │
│ ... content ...             │  │ Score: 4/5 🌱  │
│                             │  │ [Book Button]   │
└─────────────────────────────┘  └─────────────────┘
```

---

## 🐛 Troubleshooting

**Routes not working?**
- Check: Schemas imported to Storyblok?
- Check: Is content published (not draft)?
- Check: Are slugs correct in URL?

**Images not showing?**
- Check: hero_image field filled in Storyblok?
- Check: Image URL is accessible?
- Fallback: Gradient backgrounds will display

**Breadcrumbs broken?**
- Check: Are multilink fields configured?
- Check: Is destination linked to country?
- Check: Is experience linked to both?

**Homepage sections not showing?**
- Check: Are countries/destinations/experiences published?
- Check: Do they have at least 1 story each?

**Sitemap empty?**
- Check: Are all stories published?
- Visit: `http://localhost:3000/sitemap.xml` to see

---

## 📞 Documentation

For more details, see:
- `IMPLEMENTATION_SUMMARY.md` → Overview of what was built
- `ROUTING_IMPLEMENTATION.md` → Complete technical guide
- `SETUP_CHECKLIST.md` → Detailed checklist

---

## ✨ You're All Set!

The code is complete and ready. Just:
1. Import schemas
2. Create test content
3. Test the routes

That's it! The rest is automatic. 🎉

---

**Estimated time**: 30 minutes  
**Difficulty**: Easy (just content creation)  
**Result**: Fully functional hierarchical routing system! 🚀
