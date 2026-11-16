"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  FiArrowRight,
  FiChevronDown,
  FiClock,
  FiMapPin,
  FiStar,
} from "react-icons/fi";
import styles from "./BangkokCityPage.module.css";

const featuredExperiences = [
  {
    title: "Ancient City & Erawan Museum",
    category: "Museums",
    price: "$26",
    rating: "4.9",
    reviews: "1,834",
    tag: "First time",
    image: "/images/figma/experiences/ancient-city-day-trip.jpg",
  },
  {
    title: "Mahanakhon SkyWalk",
    category: "Attractions",
    price: "$26",
    rating: "4.9",
    reviews: "3,183",
    tag: "Short stays",
    image: "/images/figma/experiences/grand-palace-tour.jpg",
  },
  {
    title: "Chao Phraya River Cruise",
    category: "Cruises",
    price: "$22",
    rating: "4.9",
    reviews: "1,542",
    tag: "Short stays",
    image: "/images/figma/experiences/chao-phraya-dinner-cruise.jpg",
  },
  {
    title: "Damnoen Saduak Floating Market",
    category: "Food & dining",
    price: "$22",
    rating: "4.8",
    reviews: "1,209",
    tag: "Budget & free",
    image: "/images/figma/experiences/floating-market-day-trip.jpg",
  },
];

const attractionCategories = ["All", "Cruises", "Water activities", "Zoos & aquarium", "Shopping", "Museums"];

const attractions = [
  {
    title: "The Grand Palace",
    detail: "Bangkok's most famous landmark and home of Thai royal history.",
    category: "Museums",
    rating: "4.9",
    reviews: "31,184",
    price: "$22",
    image: "/images/figma/experiences/grand-palace-tour.jpg",
  },
  {
    title: "Wat Arun",
    detail: "An iconic riverside temple best seen at sunrise or sunset.",
    category: "Water activities",
    rating: "4.9",
    reviews: "12,640",
    price: "$16",
    image: "/images/figma/experiences/ayutthaya-river-city.jpg",
  },
  {
    title: "Safari World Bangkok",
    detail: "A family-friendly wildlife park with open safaris and live shows.",
    category: "Zoos & aquarium",
    rating: "4.8",
    reviews: "8,901",
    price: "$30",
    image: "/images/figma/experiences/sanctuary-visit.jpg",
  },
  {
    title: "CentralWorld & City Highlights",
    detail: "Modern Bangkok shopping, dining, and entertainment in one place.",
    category: "Shopping",
    rating: "4.8",
    reviews: "5,210",
    price: "$18",
    image: "/images/figma/experiences/bangkok-street-food-tour.jpg",
  },
  {
    title: "Chao Phraya River Cruise",
    detail: "See the city skyline and riverside temples from the water.",
    category: "Cruises",
    rating: "4.9",
    reviews: "9,382",
    price: "$22",
    image: "/images/figma/experiences/chao-phraya-dinner-cruise.jpg",
  },
];

const travelBasics = [
  {
    title: "Getting from the Airport",
    description: "Learn the easiest ways to reach the city from Bangkok's airports.",
    image: "/images/figma/experiences/ayutthaya-river-city.jpg",
  },
  {
    title: "Moving Around the City",
    description: "Understand Bangkok's BTS, MRT, river ferries, and local transport.",
    image: "/images/figma/experiences/bangkok-street-food.jpg",
  },
  {
    title: "Where to Stay",
    description: "Explore the best neighborhoods for your kind of trip.",
    image: "/images/figma/experiences/grand-palace-tour.jpg",
  },
  {
    title: "City Passes & Tickets",
    description: "Find attraction tickets and passes that help you save time.",
    image: "/images/figma/experiences/ancient-city-day-trip.jpg",
  },
  {
    title: "Best Time to Visit",
    description: "Discover the weather, festivals, and seasons to plan around.",
    image: "/images/figma/destinations/thailand/travel-tips.jpg",
  },
];

const reviews = [
  {
    title: "Perfect for our first time in Bangkok",
    text: "The booking process was simple, instructions were clear, and the experience matched the description perfectly. No surprises — just great planning.",
    name: "Emma, Canada",
    image: "/images/figma/experiences/floating-market-day-trip.jpg",
  },
  {
    title: "Authentic training with real fighters",
    text: "This felt like a real local experience, not a tourist show. Tough but motivating, and the trainers were patient and encouraging.",
    name: "Sophie, France",
    image: "/images/figma/experiences/muay-thai-class.jpg",
  },
  {
    title: "So much fun — even for beginners!",
    text: "The instructors made it easy and safe. Great energy, good music, and a really fun way to spend time in the city.",
    name: "Alex, UK",
    image: "/images/figma/experiences/rock-climbing.jpg",
  },
];

const travelTips = [
  {
    title: "Stay connected with an eSIM",
    text: "Set up a Thailand eSIM before you arrive so you can use maps, translation apps, and rideshare services like Grab.",
  },
  {
    title: "Dress respectfully at temples",
    text: "Cover your shoulders and knees when visiting religious sites such as the Grand Palace and Wat Pho.",
  },
  {
    title: "Learn the wai greeting",
    text: "A small bow with your palms together is a polite way to greet and thank people in Thailand.",
  },
  {
    title: "Tipping is appreciated",
    text: "Tipping is not required, but leaving a little extra for good service is always welcome.",
  },
  {
    title: "Haggle politely at markets",
    text: "Bargaining is common at markets. Keep it friendly and agree on a price before you buy.",
  },
];

const questions = [
  {
    question: "Is Bangkok safe?",
    answer: "Bangkok is generally safe for visitors. Stay aware in crowded places, use registered transport, and check prices before accepting services.",
  },
  {
    question: "Where should I stay in Bangkok?",
    answer: "Sukhumvit is convenient for transport and dining, Riverside is close to historic sights, and Siam is a good base for shopping.",
  },
  {
    question: "Where is Bangkok?",
    answer: "Bangkok is in central Thailand, on the Chao Phraya River near the Gulf of Thailand.",
  },
  {
    question: "Is Bangkok cheap or expensive?",
    answer: "Bangkok suits a range of budgets, with affordable street food and public transport alongside premium hotels and restaurants.",
  },
  {
    question: "When is the best time to visit Bangkok?",
    answer: "November to February is generally cooler and drier. April is hot and lively, with Songkran celebrations across the city.",
  },
  {
    question: "What is Bangkok best known for?",
    answer: "Bangkok is known for its temples, royal palaces, street food, riverside neighborhoods, and energetic markets.",
  },
];

const otherCities = [
  { name: "Ko Chang", image: "/images/figma/destinations/thailand/cities/ko-chang.jpg" },
  { name: "Hat Yai", image: "/images/figma/destinations/thailand/cities/hat-yai.jpg" },
  { name: "Satun", image: "/images/figma/destinations/thailand/cities/satun.jpg" },
  { name: "Pak Chong", image: "/images/figma/destinations/thailand/cities/pak-chong.jpg" },
  { name: "Chumphon", image: "/images/figma/destinations/thailand/cities/chumphon.jpg" },
  { name: "Mae Hong Son", image: "/images/figma/destinations/thailand/cities/mae-hong-son.jpg" },
];

const popularPlaces = [
  "Bangkok National Museum",
  "King Power Mahanakhon",
  "Lumphini Park",
  "Safari World Bangkok",
  "Wat Benchamabophit",
  "Museum of Siam",
  "Queen Sirikit Park",
  "Wat Paknam Phasi Charoen",
  "Phrom Phong",
  "Wat Arun",
  "Wat Saket (Golden Mount)",
];

const popularDestinations = ["Bangkok", "Ko Chang", "Hat Yai", "Satun", "Pak Chong", "Chumphon", "Mae Hong Son", "Phuket", "Chiang Mai"];

function Rating({ rating, reviews }) {
  return (
    <span className={styles.rating}>
      <FiStar aria-hidden="true" />
      {rating}
      <small>({reviews})</small>
    </span>
  );
}

function ExperienceCard({ item }) {
  const inquiryHref = `mailto:wanderlast02@gmail.com?subject=${encodeURIComponent(`Availability inquiry: ${item.title}`)}`;
  return (
    <article className={styles.experienceCard}>
      <a href={inquiryHref} className={styles.experiencePhoto} aria-label={`Ask about ${item.title}`}>
        <img src={item.image} alt="" />
        <span className={styles.imageBadge}>{item.tag}</span>
        <span className={styles.photoHeart} aria-hidden="true">♡</span>
      </a>
      <div className={styles.experienceBody}>
        <div className={styles.cardMeta}>
          <span><FiMapPin aria-hidden="true" /> Bangkok</span>
          <Rating rating={item.rating} reviews={item.reviews} />
        </div>
        <a href={inquiryHref} className={styles.cardTitle}>{item.title}</a>
        <span className={styles.cardCategory}>{item.category}</span>
        <div className={styles.cardFooter}>
          <span>from <strong>{item.price}</strong></span>
          <a href={inquiryHref}>Ask about dates <FiArrowRight aria-hidden="true" /></a>
        </div>
      </div>
    </article>
  );
}

function AttractionCard({ item }) {
  const inquiryHref = `mailto:wanderlast02@gmail.com?subject=${encodeURIComponent(`Availability inquiry: ${item.title}`)}`;
  return (
    <article className={styles.attractionCard}>
      <a href={inquiryHref} className={styles.attractionImage} aria-label={`Ask about ${item.title}`}>
        <img src={item.image} alt="" />
        <span className={styles.imageBadge}>{item.category}</span>
      </a>
      <div className={styles.attractionBody}>
        <div className={styles.attractionTitleRow}>
          <h3>{item.title}</h3>
          <Rating rating={item.rating} reviews={item.reviews} />
        </div>
        <p>{item.detail}</p>
        <div className={styles.cardFooter}>
          <span>from <strong>{item.price}</strong></span>
          <a href={inquiryHref}>Ask about dates <FiArrowRight aria-hidden="true" /></a>
        </div>
      </div>
    </article>
  );
}

export default function BangkokCityPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [activeCategory, setActiveCategory] = useState("All");
  const [guideTab, setGuideTab] = useState("Top attractions");
  const [openQuestion, setOpenQuestion] = useState(0);
  const [popularMode, setPopularMode] = useState("Top things to do");

  const visibleExperiences = useMemo(
    () => featuredExperiences.filter((item) => activeFilter === "All" || item.tag === activeFilter),
    [activeFilter]
  );
  const visibleAttractions = useMemo(
    () => attractions.filter((item) => activeCategory === "All" || item.category === activeCategory),
    [activeCategory]
  );

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <img
          className={styles.heroImage}
          src="/images/figma/experiences/grand-palace-tour.jpg"
          alt=""
        />
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <p className={styles.eyebrow}>THAILAND · CITY GUIDE</p>
          <h1>Things to do in Bangkok</h1>
          <p className={styles.heroDescription}>
            Discover top attractions and local experiences, curated for your travel style, budget, and the moments you came for.
          </p>
          <div className={styles.breadcrumbs}>
            <Link href="/">Home</Link><span>›</span><Link href="/destinations/thailand">Thailand</Link><span>›</span><span>Bangkok</span>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeading}>
            <div>
              <p className={styles.kicker}>MAKE THE MOST OF YOUR STAY</p>
              <h2>Top things to do in Bangkok</h2>
            </div>
            <Link href="/experiences" className={styles.textLink}>View 705 offers <FiArrowRight aria-hidden="true" /></Link>
          </div>
          <div className={styles.filters} aria-label="Filter experiences">
            {["All", "First time", "Short stays", "Budget & free"].map((filter) => (
              <button
                type="button"
                key={filter}
                className={activeFilter === filter ? styles.activePill : styles.pill}
                aria-pressed={activeFilter === filter}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
          <div className={styles.experienceGrid}>
            {visibleExperiences.map((item) => <ExperienceCard key={item.title} item={item} />)}
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.softSection}`}>
        <div className={styles.container}>
          <div className={styles.sectionHeading}>
            <div>
              <p className={styles.kicker}>PLAN YOUR CITY DAYS</p>
              <h2>Top attractions in Bangkok</h2>
            </div>
            <Link href="/experiences" className={styles.textLink}>View all offers <FiArrowRight aria-hidden="true" /></Link>
          </div>
          <div className={styles.categoryTabs} role="group" aria-label="Filter attractions">
            {attractionCategories.map((category) => (
              <button
                type="button"
                key={category}
                className={activeCategory === category ? styles.activeTab : styles.tab}
                aria-pressed={activeCategory === category}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
          <div className={styles.attractionGrid}>
            {visibleAttractions.map((item) => <AttractionCard key={item.title} item={item} />)}
          </div>
        </div>
      </section>

      <section className={styles.featureSection}>
        <div className={styles.container}>
          <div className={styles.featureIntro}>
            <div>
              <p className={styles.kicker}>LOCAL FAVORITES</p>
              <h2>Explore Bangkok&apos;s must-see experiences</h2>
              <p>Find a new favorite around every corner, from riverside temples to lively local markets.</p>
            </div>
            <Link href="/experiences" className={styles.outlineLink}>Explore highlights <FiArrowRight aria-hidden="true" /></Link>
          </div>
          <div className={styles.highlightGrid}>
            {attractions.slice(0, 4).map((item, index) => (
              <a href={`mailto:wanderlast02@gmail.com?subject=${encodeURIComponent(`Availability inquiry: ${item.title}`)}`} className={styles.highlightCard} key={item.title}>
                <img src={item.image} alt="" />
                <span className={styles.highlightShade} />
                <span className={styles.highlightIndex}>0{index + 1}</span>
                <span className={styles.highlightText}><strong>{item.title}</strong><small>{item.detail}</small></span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.softSection}`}>
        <div className={styles.container}>
          <div className={styles.sectionHeading}>
            <div>
              <p className={styles.kicker}>GET TO KNOW THE CITY</p>
              <h2>Travel basics</h2>
              <p className={styles.headingDescription}>Practical tips for a smoother Bangkok trip.</p>
            </div>
          </div>
          <div className={styles.basicsGrid}>
            {travelBasics.map((article, index) => (
              <article className={styles.basicCard} key={article.title}>
                <div className={styles.basicImage}>
                  <img src={article.image} alt="" />
                  <span>{index === 0 ? "CITY GUIDE" : "TRAVEL TIPS"}</span>
                </div>
                <div className={styles.basicBody}>
                  <small>11 January, 2026 <span>·</span> 4 min read</small>
                  <h3>{article.title}</h3>
                  <p>{article.description}</p>
                  <span className={styles.comingSoon}>Article coming soon</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeading}>
            <div>
              <p className={styles.kicker}>REAL STORIES, REAL TRIPS</p>
              <h2>What travelers are saying</h2>
            </div>
            <Link href="/experiences" className={styles.textLink}>Read all reviews <FiArrowRight aria-hidden="true" /></Link>
          </div>
          <div className={styles.reviewGrid}>
            {reviews.map((review) => (
              <article className={styles.reviewCard} key={review.title}>
                <div className={styles.reviewTop}><span className={styles.reviewStars}>★★★★★</span><strong>5.0</strong></div>
                <h3>{review.title}</h3>
                <p>{review.text}</p>
                <div className={styles.reviewer}>
                  <img src={review.image} alt="" />
                  <span>{review.name}<small>21 July, 2025</small></span>
                  <span className={styles.verified}>✓ Verified</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.factsSection}`}>
        <div className={styles.container}>
          <div className={styles.sectionHeading}>
            <div>
              <p className={styles.kicker}>BEFORE YOU GO</p>
              <h2>Quick facts about Bangkok</h2>
            </div>
          </div>
          <div className={styles.factsLayout}>
            <div className={styles.factsGrid}>
              <article className={styles.weatherCard}>
                <span>Local weather</span><strong>32°</strong><small>Warm · Mostly sunny</small><span className={styles.weatherIcon}>☀</span>
              </article>
              <article className={styles.factCard}><span>Time zone</span><strong>GMT +07:00</strong><small>No time difference</small></article>
              <article className={styles.factCard}><span>Currency</span><strong>Thai Baht (฿)</strong><small>1 USD ≈ 32.48 THB</small></article>
              <article className={styles.factCard}><span>Language</span><strong>Thai</strong><small>English in tourist areas</small></article>
              <article className={styles.factCard}><span>Best time to visit</span><strong>Nov – Feb</strong><small>Cooler, drier weather</small></article>
              <article className={styles.factCard}><span>Recommended trip</span><strong>3 days</strong><small>Longer for nearby day trips</small></article>
              <article className={styles.factCard}><span>Local celebrations</span><strong>Songkran</strong><small>Thai New Year · April</small></article>
            </div>
            <div className={styles.mapCard}>
              <img src="/images/figma/destinations/thailand/travel-tips.jpg" alt="Map and travel information for Bangkok" />
              <span><FiMapPin aria-hidden="true" /> Bangkok, Thailand</span>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.guideSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeading}>
            <div>
              <p className={styles.kicker}>YOUR CITY GUIDE</p>
              <h2>What to know before visiting Bangkok</h2>
            </div>
          </div>
          <div className={styles.guidePanel}>
            <div className={styles.guideTabs} role="tablist" aria-label="Bangkok travel guide">
              {["Top attractions", "Tips before visiting", "FAQs"].map((tab) => (
                <button
                  type="button"
                  role="tab"
                  key={tab}
                  aria-selected={guideTab === tab}
                  className={guideTab === tab ? styles.activeGuideTab : styles.guideTab}
                  onClick={() => setGuideTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
            {guideTab === "Top attractions" && (
              <div className={styles.guideCopy}>
                <h3>Top attractions in Bangkok City, Thailand</h3>
                <p>When you visit Bangkok, the Grand Palace is a must-see. It is the city&apos;s most famous landmark, home to Wat Phra Kaew, or the Temple of the Emerald Buddha. Its golden roofs and detailed Thai architecture tell the story of Bangkok&apos;s royal history.</p>
                <p>Across the Chao Phraya River, Wat Arun is one of the city&apos;s most beautiful temples. Climb its central tower for sweeping views, especially at sunrise or sunset.</p>
                <p>Shop like a local at Chatuchak Weekend Market, then try Bangkok&apos;s street food. For nightlife, head to Khao San Road; for modern shopping, explore Siam Paragon and MBK Center.</p>
              </div>
            )}
            {guideTab === "Tips before visiting" && (
              <div className={styles.tipGrid}>
                {travelTips.map((tip, index) => (
                  <article className={styles.tipCard} key={tip.title}>
                    <span className={styles.tipNumber}>0{index + 1}</span>
                    <h3>{tip.title}</h3>
                    <p>{tip.text}</p>
                  </article>
                ))}
              </div>
            )}
            {guideTab === "FAQs" && (
              <div className={styles.faqList}>
                {questions.map(({ question, answer }, index) => (
                  <div className={styles.faqItem} key={question}>
                    <button
                      type="button"
                      aria-expanded={openQuestion === index}
                      onClick={() => setOpenQuestion(openQuestion === index ? -1 : index)}
                    >
                      <span>{question}</span><FiChevronDown aria-hidden="true" />
                    </button>
                    {openQuestion === index && <p>{answer}</p>}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeading}>
            <div>
              <p className={styles.kicker}>EXPLORE MORE OF THAILAND</p>
              <h2>Try other cities in Thailand</h2>
            </div>
            <Link href="/destinations/thailand" className={styles.textLink}>Explore destinations <FiArrowRight aria-hidden="true" /></Link>
          </div>
          <div className={styles.cityGrid}>
            {otherCities.map((city) => (
              <Link href="/destinations/thailand" className={styles.cityCard} key={city.name}>
                <span className={styles.cityImage}><img src={city.image} alt="" /></span>
                <strong>{city.name}</strong>
                <span>Explore city <FiArrowRight aria-hidden="true" /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.popularSection}`}>
        <div className={styles.container}>
          <div className={styles.popularContent}>
            <p className={styles.kicker}>MORE TO DISCOVER</p>
            <h2>Discover the most popular places to visit in Bangkok</h2>
            <div className={styles.popularTabs}>
              <button
                type="button"
                className={popularMode === "Top things to do" ? styles.popularActive : styles.popularInactive}
                aria-pressed={popularMode === "Top things to do"}
                onClick={() => setPopularMode("Top things to do")}
              >
                Top things to do
              </button>
              <button
                type="button"
                className={popularMode === "Top destinations" ? styles.popularActive : styles.popularInactive}
                aria-pressed={popularMode === "Top destinations"}
                onClick={() => setPopularMode("Top destinations")}
              >
                Top destinations
              </button>
            </div>
            <div className={styles.popularTags}>
              {(popularMode === "Top things to do" ? popularPlaces : popularDestinations).map((place) => (
                <Link href={popularMode === "Top things to do" ? "/experiences" : "/destinations/thailand"} key={place}>
                  {place}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
