"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  FiArrowRight,
  FiCalendar,
  FiClock,
  FiCompass,
  FiMapPin,
  FiSearch,
  FiShoppingBag,
  FiStar,
  FiSun,
  FiUsers,
} from "react-icons/fi";
import styles from "./page.module.css";

const categories = [
  {
    name: "Bangkok",
    detail: "Top tours & attractions",
    count: "300+ activities",
    image: "/images/figma/experiences/grand-palace-tour.jpg",
    href: "/destinations/thailand/bangkok",
  },
  {
    name: "Ayutthaya",
    detail: "Historic sites",
    count: "300+ activities",
    image: "/images/figma/experiences/ayutthaya-hero.jpg",
    href: "/experiences/ayutthaya-by-land-and-river",
  },
  {
    name: "Floating Markets",
    detail: "Local markets",
    count: "300+ activities",
    image: "/images/figma/experiences/floating-market-day-trip.jpg",
    href: "/experiences",
  },
  {
    name: "Kanchanaburi",
    detail: "Family & wildlife",
    count: "300+ activities",
    image: "/images/figma/experiences/river-kwai-day-trip.jpg",
    href: "/experiences",
  },
  {
    name: "Beach Escapes",
    detail: "Phuket, Krabi & nearby islands",
    count: "300+ activities",
    image: "/images/figma/experiences/coral-island-tour.jpg",
    href: "/experiences",
  },
  {
    name: "Cultural Highlights",
    detail: "Temples & cultural landmarks",
    count: "300+ activities",
    image: "/images/figma/experiences/temple-monastery.jpg",
    href: "/experiences",
  },
];

const featuredExperiences = [
  {
    title: "Ancient City & Erawan Museum",
    location: "Bangkok",
    rating: "4.9",
    reviews: "31,183",
    price: "$22",
    image: "/images/figma/experiences/ancient-city-day-trip.jpg",
    tag: "First time",
    family: true,
  },
  {
    title: "Mahanakhon SkyWalk",
    location: "Bangkok",
    rating: "4.9",
    reviews: "13,183",
    price: "$26",
    image: "/images/figma/experiences/grand-palace-tour.jpg",
    tag: "First time",
  },
  {
    title: "Chao Phraya River Cruise",
    location: "Bangkok",
    rating: "4.9",
    reviews: "31,183",
    price: "$7",
    image: "/images/figma/experiences/ayutthaya-river-cruise.jpg",
    tag: "Short stays",
  },
  {
    title: "Damnoen Saduak Floating Market",
    location: "Bangkok",
    rating: "4.9",
    reviews: "31,183",
    price: "$16",
    image: "/images/figma/experiences/floating-market-day-trip.jpg",
    tag: "Food & dining",
    family: true,
  },
];

const offerSections = [
  {
    title: "Cruises",
    icon: FiCompass,
    tone: "blue",
    offers: [
      { title: "Chao Phraya Princess Cruise in Bangkok", rating: "4.9", reviews: "31,183", duration: "4–6 h", price: "$53", image: "/images/figma/experiences/ayutthaya-river-city.jpg" },
      { title: "Chao Phraya White Orchid Cruise", rating: "4.9", reviews: "31,183", duration: "4–6 h", price: "$53", image: "/images/figma/experiences/chao-phraya-dinner-cruise.jpg" },
      { title: "Meridian Dinner Cruise in Bangkok", rating: "4.9", reviews: "31,183", duration: "4–6 h", price: "$53", image: "/images/figma/experiences/ayutthaya-river-cruise.jpg" },
      { title: "Royal Princess Dinner Cruise", rating: "4.9", reviews: "31,183", duration: "4–6 h", price: "$53", image: "/images/figma/experiences/sunset-catamaran.jpg" },
    ],
  },
  {
    title: "Spas",
    icon: FiSun,
    tone: "green",
    offers: [
      { title: "Let’s Relax Spa Treatment at CentralWorld", rating: "4.9", reviews: "31,183", duration: "4–6 h", price: "$53", image: "/images/figma/experiences/spa-day.jpg" },
      { title: "Lek Gold Massage and Spa at Sukhumvit", rating: "4.9", reviews: "31,183", duration: "4–6 h", price: "$53", image: "/images/figma/experiences/spa-day.jpg" },
      { title: "Lek Massage & Salon Sukhumvit 24", rating: "4.9", reviews: "31,183", duration: "4–6 h", price: "$53", image: "/images/figma/experiences/spa-day.jpg" },
      { title: "Health Land Spa at Asoke in Bangkok", rating: "4.9", reviews: "31,183", duration: "4–6 h", price: "$53", image: "/images/figma/experiences/spa-day.jpg" },
    ],
  },
  {
    title: "Day trips",
    icon: FiCalendar,
    tone: "sand",
    offers: [
      { title: "Damnoen Saduak Floating Market and Railway Market", rating: "4.9", reviews: "31,183", duration: "4–6 h", price: "$27", image: "/images/figma/experiences/floating-market-day-trip.jpg" },
      { title: "Bangkok Safari World Shared and Private Tour", rating: "4.9", reviews: "31,183", duration: "4–6 h", price: "$26", image: "/images/figma/experiences/sanctuary-visit.jpg" },
      { title: "Ayutthaya by Land & River", rating: "4.8", reviews: "2,914", duration: "10–11 h", price: "$38", image: "/images/figma/experiences/ayutthaya-bang-pa-in.jpg", href: "/experiences/ayutthaya-by-land-and-river" },
      { title: "Bangkok Temple Tour: Grand Palace", rating: "4.9", reviews: "31,183", duration: "4–6 h", price: "$22", image: "/images/figma/experiences/ancient-city-day-trip.jpg" },
    ],
  },
];

const trending = {
  All: ["Bangkok National Museum", "King Power Mahanakhon", "Koh Lanta", "Lumphini Park", "Museum of Siam", "Phaya Thai Palace", "Phrom Phong", "Safari World Bangkok", "Queen Sirikit Park", "Wat Arun"],
  Castles: ["The Grand Palace", "Bang Pa-In Royal Palace", "Phaya Thai Palace"],
  Churches: ["Wat Arun", "Wat Pho", "Wat Benchamabophit"],
  Museums: ["Bangkok National Museum", "Museum of Siam", "Erawan Museum"],
  Parks: ["Lumphini Park", "Queen Sirikit Park", "Safari World Bangkok"],
  Towers: ["King Power Mahanakhon", "Baiyoke Tower", "Wat Arun"],
};

const filters = ["First time", "Budget & free", "Short stays", "Food & dining", "Family-friendly"];
const trendingTabs = Object.keys(trending);

function ExperienceCard({ item }) {
  const href = item.href || `mailto:wanderlast02@gmail.com?subject=${encodeURIComponent(`Availability inquiry: ${item.title}`)}`;

  return (
    <article className={styles.experienceCard}>
      <Link href={href} className={styles.cardImage}>
        <img src={item.image} alt="" />
        <span className={styles.topBadge}><FiStar aria-hidden="true" /> TOP</span>
        <span className={styles.favorite} aria-hidden="true">♡</span>
      </Link>
      <div className={styles.cardBody}>
        <div className={styles.cardMeta}>
          <span><FiMapPin aria-hidden="true" /> {item.location || "Bangkok"}</span>
          <span className={styles.cardRating}>★ {item.rating} <small>({item.reviews})</small></span>
        </div>
        <Link href={href} className={styles.cardTitle}>{item.title}</Link>
        {item.duration && <span className={styles.cardDuration}><FiClock aria-hidden="true" /> {item.duration}</span>}
        <div className={styles.cardFooter}>
          <span>from <strong>{item.price}</strong></span>
          <Link href={href}>{item.href ? "View experience" : "Ask about dates"}</Link>
        </div>
      </div>
    </article>
  );
}

function OfferCard({ item }) {
  const href = item.href || `mailto:wanderlast02@gmail.com?subject=${encodeURIComponent(`Availability inquiry: ${item.title}`)}`;

  return (
    <article className={styles.offerCard}>
      <Link href={href} className={styles.offerPhoto}>
        <img src={item.image} alt="" />
        <span className={styles.offerPrice}>from {item.price}</span>
        <span className={styles.offerStats}>★ {item.rating} ({item.reviews}) <span>◷ {item.duration}</span></span>
        <span className={styles.offerCaption}>{item.title}</span>
      </Link>
    </article>
  );
}

export default function ExperienceDiscovery({ initialQuery = "" }) {
  const [query, setQuery] = useState(initialQuery || "Bangkok");
  const [appliedQuery, setAppliedQuery] = useState(initialQuery);
  const [activeFilter, setActiveFilter] = useState("");
  const [activeTrending, setActiveTrending] = useState("All");

  const visibleExperiences = useMemo(() => {
    const search = appliedQuery.toLowerCase();
    return featuredExperiences.filter((item) => {
      const matchesSearch = !search || `${item.title} ${item.location}`.toLowerCase().includes(search);
      const matchesFilter = !activeFilter
        || (activeFilter === "Family-friendly" && item.family)
        || (activeFilter === "Food & dining" && item.tag === "Food & dining")
        || (activeFilter === "Short stays" && item.tag === "Short stays")
        || (activeFilter === "First time" && item.tag === "First time")
        || (activeFilter === "Budget & free" && Number(item.price.replace("$", "")) <= 25);
      return matchesSearch && matchesFilter;
    });
  }, [activeFilter, appliedQuery]);

  function submitSearch(event) {
    event.preventDefault();
    setAppliedQuery(query.trim());
    setActiveFilter("");
  }

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <img
          className={styles.heroPhoto}
          src="/images/figma/experiences/grand-palace-tour.jpg"
          alt=""
          fetchPriority="high"
        />
        <div className={styles.heroShade} />
        <div className={styles.heroContent}>
          <h1>Tours &amp; experiences</h1>
          <p>Tours, activities, attractions, and local experiences<br />all in one place.</p>
          <form className={styles.search} onSubmit={submitSearch}>
            <label className={styles.srOnly} htmlFor="experience-search">Search destinations and activities</label>
            <FiSearch aria-hidden="true" />
            <input id="experience-search" value={query} onChange={(event) => setQuery(event.target.value)} />
            <button type="submit">Search</button>
          </form>
        </div>
      </section>

      <main className={styles.container}>
        <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
          <Link href="/home">Home</Link><span>›</span>
          <Link href="/destinations/thailand">Thailand</Link><span>›</span>
          <Link href="/destinations/thailand/bangkok">Bangkok</Link><span>›</span>
          <span aria-current="page">Tours &amp; experiences</span>
        </nav>

        <section className={styles.categoryRail} aria-label="Popular destinations and activities">
          {categories.map((category) => (
            <Link href={category.href} className={styles.categoryCard} key={category.name}>
              <div className={styles.categoryPhoto}>
                <img src={category.image} alt="" />
              </div>
              <strong>{category.name}</strong>
              <span>{category.detail}</span>
              <span className={styles.activityCount}><FiArrowRight aria-hidden="true" /> {category.count}</span>
            </Link>
          ))}
        </section>

        <section className={styles.featuredSection} id="highlights">
          <div className={styles.sectionTitleRow}>
            <h2>Top experiences in {appliedQuery || "Bangkok"}</h2>
            <div className={styles.filterList} aria-label="Filter top experiences">
              {filters.map((filter) => (
                <button
                  type="button"
                  key={filter}
                  className={activeFilter === filter ? styles.activeFilter : ""}
                  aria-pressed={activeFilter === filter}
                  onClick={() => setActiveFilter(activeFilter === filter ? "" : filter)}
                >
                  {filter}
                </button>
              ))}
            </div>
            <Link className={styles.viewAll} href="/destinations/thailand/bangkok">Explore Bangkok</Link>
          </div>
          {visibleExperiences.length ? (
            <div className={styles.featuredGrid}>
              {visibleExperiences.map((item) => <ExperienceCard item={item} key={item.title} />)}
            </div>
          ) : (
            <p className={styles.emptyState}>No matching Bangkok experiences. Try a different search or filter.</p>
          )}
        </section>

        <Link className={styles.inspiration} href="/destinations/thailand/bangkok">
          <img src="/images/figma/experiences/sanctuary-visit.jpg" alt="" />
          <span className={styles.inspirationShade} />
          <span className={styles.inspirationText}>
            <strong>Not sure where to start?</strong>
            <small>Explore Bangkok’s must-see experiences — handpicked and easy to book.</small>
            <b>Explore highlights</b>
          </span>
        </Link>

        <div className={styles.offerSections}>
          {offerSections.map(({ title, icon: Icon, tone, offers }) => (
            <section className={`${styles.offerSection} ${styles[tone]}`} key={title}>
              <div className={styles.offerHeader}>
                <h2><Icon aria-hidden="true" /> {title}</h2>
                <a href={`mailto:wanderlast02@gmail.com?subject=${encodeURIComponent(`Inquiry: ${title} in Bangkok`)}`}>Ask about {title.toLowerCase()}</a>
              </div>
              <div className={styles.offerRail}>
                {offers.map((offer) => <OfferCard item={offer} key={offer.title} />)}
              </div>
            </section>
          ))}
        </div>

        <section className={styles.promotions} aria-label="Booking promo codes">
          <div>
            <span>Promo codes</span>
            <h2>Redeem and save on bookings</h2>
          </div>
          <div className={styles.promoCards}>
            {["25%", "15%", "10%"].map((discount) => (
              <article className={styles.promoCard} key={discount}>
                <FiShoppingBag aria-hidden="true" />
                <strong>{discount} off</strong>
                <span>No min. spend</span>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.trendingSection}>
          <h2>Discover trending places with us</h2>
          <div className={styles.trendingPanel}>
            <div className={styles.trendingTabs} role="tablist" aria-label="Trending place categories">
              {trendingTabs.map((tab) => (
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTrending === tab}
                  className={activeTrending === tab ? styles.selectedTrendingTab : ""}
                  key={tab}
                  onClick={() => setActiveTrending(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className={styles.trendingPlaces} role="tabpanel">
              {trending[activeTrending].map((place, index) => (
                <Link href="/destinations/thailand/bangkok" key={`${activeTrending}-${place}`}>
                  <FiMapPin aria-hidden="true" />
                  {place}
                  {index === 0 && activeTrending === "All" && <span>Popular</span>}
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
