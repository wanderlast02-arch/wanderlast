import Link from "next/link";
import {
  FiArrowUpRight,
  FiCalendar,
  FiCheck,
  FiClock,
  FiGlobe,
  FiMap,
  FiMapPin,
  FiMessageCircle,
  FiSmartphone,
  FiSun,
  FiUsers,
} from "react-icons/fi";
import BookingPanel from "./BookingPanel";
import styles from "./page.module.css";

export const metadata = {
  title: "Ayutthaya by Land & River",
  description:
    "Temples of the old Siamese capital by morning, a slow cruise down the Chao Phraya by afternoon.",
};

const facts = [
  { icon: FiClock, label: "Duration", value: "10–11 hours" },
  { icon: FiMapPin, label: "Starts", value: "07:00 · hotel pickup" },
  { icon: FiGlobe, label: "Guide", value: "English & Thai" },
  { icon: FiUsers, label: "Group size", value: "Max 12 travelers" },
  { icon: FiSmartphone, label: "Ticket", value: "Mobile e-ticket" },
  { icon: FiCalendar, label: "Cancellation", value: "Free up to 24 h before" },
];

const reasons = [
  {
    number: "01",
    title: "Two capitals in one day",
    text: "Walk the ruins of Siam’s 400-year-old capital, then sail back into modern Bangkok — no backtracking on the highway.",
  },
  {
    number: "02",
    title: "Guides who grew up here",
    text: "Licensed local guides share family stories, temple etiquette and the quiet corners most groups walk past.",
  },
  {
    number: "03",
    title: "Small groups, real breaks",
    text: "Never more than 12 travelers and unhurried stops — time to wander, not just snap a photo and run.",
  },
  {
    number: "04",
    title: "Lunch on the water",
    text: "A Thai buffet on deck as the boat drifts past stilt houses and riverside temples. Veggie & halal options.",
  },
];

const itinerary = [
  {
    time: "07:00",
    duration: "30–45 min drive",
    title: "Hotel pickup in central Bangkok",
    text: "Your guide meets you in the lobby. Air-con minivan, cold towels and water on board.",
  },
  {
    time: "08:30",
    duration: "1 h stop",
    title: "Bang Pa-In Royal Palace",
    text: "The kings’ summer retreat: lakeside pavilions, topiary gardens and a Chinese-style throne hall.",
    image: "/images/figma/experiences/ayutthaya-bang-pa-in.jpg",
  },
  {
    time: "10:00",
    duration: "45 min stop",
    title: "Wat Yai Chai Mongkhon",
    text: "Walk among rows of saffron-robed Buddhas and climb the great chedi for a view over the old capital.",
    image: "/images/figma/experiences/ayutthaya-yai-chai.jpg",
  },
  {
    time: "11:00",
    duration: "1 h 15 min stop",
    title: "Wat Mahathat & Wat Phra Si Sanphet",
    text: "Find the Buddha head wrapped in tree roots, then walk the three royal chedis of the former palace temple.",
    image: "/images/figma/experiences/ayutthaya-temple.jpg",
  },
  {
    time: "12:30",
    duration: "30 min stop",
    title: "Wat Phanan Choeng",
    text: "A 19-metre golden Buddha that sailors prayed to before leaving the city by river.",
    image: "/images/figma/experiences/ayutthaya-buddha.jpg",
  },
  {
    time: "13:15",
    duration: "3 h on board",
    title: "River cruise with buffet lunch",
    text: "Settle in on deck with Thai buffet lunch as the boat glides down the Chao Phraya toward Bangkok.",
    image: "/images/figma/experiences/ayutthaya-river-cruise.jpg",
  },
  {
    time: "16:30",
    duration: "End of tour",
    title: "Arrive at River City pier, Bangkok",
    text: "Step off near the old town, or take the included minivan back to your hotel.",
    image: "/images/figma/experiences/ayutthaya-river-city.jpg",
  },
];

const included = [
  "Hotel pickup & drop-off in central Bangkok",
  "Licensed English-speaking guide",
  "Entry tickets to all four temples",
  "Thai buffet lunch on the river cruise",
  "Bottled water & cold towels",
];

const notIncluded = [
  "Tips for guide & driver (optional)",
  "Drinks other than water",
  "Pickup outside central Bangkok (+$8)",
];

const preparation = [
  {
    icon: FiSun,
    title: "Dress for the temples",
    text: "Shoulders and knees covered. Forgot? Sarongs are lent at the entrance.",
  },
  {
    icon: FiMap,
    title: "Bring some cash",
    text: "Small notes for snacks, souvenirs and tips — most stalls don’t take cards.",
  },
  {
    icon: FiSun,
    title: "It gets hot",
    text: "Hat, sunscreen and comfortable shoes — there’s 4–5 km of walking.",
  },
  {
    icon: FiUsers,
    title: "Accessibility",
    text: "Steps at most temples; not suitable for wheelchairs. Ask us about a private car.",
  },
];

const reviews = [
  {
    initials: "AM",
    name: "Anna M.",
    location: "Germany · October 2026",
    trip: "Couple · Shared small group",
    rating: "5.0",
    text: "Our guide Nok made the temples come alive — stories, shortcuts away from the crowds and perfect photo spots. The cruise back at sunset was the best way to end the day.",
    helpful: 24,
  },
  {
    initials: "JK",
    name: "James K.",
    location: "United Kingdom · September 2026",
    trip: "Solo traveler · Shared small group",
    rating: "5.0",
    text: "Perfect for a first trip to Thailand. Pickup was right on time, the group was tiny and the history never felt like a lecture. Bring a hat — it’s hot out there!",
    helpful: 17,
  },
  {
    initials: "SL",
    name: "Sofia L.",
    location: "Spain · October 2026",
    trip: "Family · Private day",
    rating: "4.0",
    text: "We booked the private option with two kids and it was worth it — we skipped the palace and spent longer at the ruins. Lunch on the boat was the kids’ favourite part.",
    helpful: 11,
  },
  {
    initials: "DT",
    name: "Daniel T.",
    location: "Australia · August 2026",
    trip: "Friends · Shared small group",
    rating: "5.0",
    text: "Great value for everything included. The river cruise is the perfect reset after a morning of walking, and you see a side of Bangkok you’d miss from the road.",
    helpful: 9,
  },
];

const questions = [
  {
    question: "Is lunch included in the price?",
    answer: "Yes — a Thai buffet is served on board the river cruise in the shared and private options. Vegetarian and halal dishes are available; tell us about allergies when you book.",
  },
  {
    question: "What happens if it rains?",
    answer: "The trip runs in most weather. Bring a light rain jacket, and your guide will adjust the order of stops if needed.",
  },
  {
    question: "Can I cancel or change my date?",
    answer: "You can cancel for free up to 24 hours before the trip. Contact us if you need to change your date.",
  },
  {
    question: "Is this day trip suitable for children?",
    answer: "Yes. Children are welcome, but expect several hours of walking in warm weather. The private option offers a more flexible pace.",
  },
  {
    question: "Do I need to bring my passport?",
    answer: "Bring a valid photo ID and your booking confirmation. Your guide will share any additional meeting details before the trip.",
  },
];

const related = [
  {
    location: "Ratchaburi",
    rating: "4.8",
    reviews: "12,406",
    title: "Damnoen Saduak Floating Market & Maeklong Railway Market",
    price: "$27",
    image: "/images/figma/experiences/floating-market-day-trip.jpg",
  },
  {
    location: "Kanchanaburi",
    rating: "4.9",
    reviews: "8,215",
    title: "River Kwai Bridge & Erawan Falls day trip",
    price: "$45",
    image: "/images/figma/experiences/river-kwai-day-trip.jpg",
  },
  {
    location: "Bangkok",
    rating: "4.7",
    reviews: "21,930",
    title: "Chao Phraya dinner cruise with live music",
    price: "$32",
    image: "/images/figma/experiences/chao-phraya-dinner-cruise.jpg",
  },
  {
    location: "Samut Prakan",
    rating: "4.9",
    reviews: "31,183",
    title: "Ancient City & Erawan Museum",
    price: "$22",
    image: "/images/figma/experiences/ancient-city-day-trip.jpg",
  },
];

export default function AyutthayaPage() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
          <Link href="/home">Home</Link>
          <span aria-hidden="true">›</span>
          <Link href="/destinations/thailand">Thailand</Link>
          <span aria-hidden="true">›</span>
          <Link href="/destinations/thailand/bangkok">Bangkok</Link>
          <span aria-hidden="true">›</span>
          <Link href="/experiences">Tours &amp; experiences</Link>
          <span aria-hidden="true">›</span>
          <span>Day trips</span>
          <span aria-hidden="true">›</span>
          <span aria-current="page">Ayutthaya by Land &amp; River</span>
        </nav>

        <section className={styles.hero} aria-label="Ayutthaya by Land and River">
          <div className={styles.mainPhoto}>
            <img
              src="/images/figma/experiences/ayutthaya-hero.jpg"
              alt="Ancient temple ruins in Ayutthaya"
            />
            <div className={styles.shade} />
            <div className={styles.tags}>
              <span className={styles.pick}>Wanderlast pick</span>
              <span>Day trip</span>
              <span>Small group</span>
              <span>Lunch included</span>
            </div>
            <div className={styles.desktopIntro}>
              <Intro />
            </div>
          </div>

          <div className={styles.sidePhotos} aria-label="More views of Ayutthaya">
            <img
              src="/images/figma/experiences/ayutthaya-temple.jpg"
              alt="Ayutthaya temple at dusk"
            />
            <img
              src="/images/figma/experiences/ayutthaya-buddha.jpg"
              alt="Historic temple in Ayutthaya"
            />
          </div>
          <div className={styles.mobileIntro}>
            <Intro mobile />
          </div>
        </section>

        <section className={styles.facts} aria-label="Trip details">
          {facts.map(({ icon: Icon, label, value }) => (
            <div className={styles.fact} key={label}>
              <Icon aria-hidden="true" />
              <div>
                <span>{label}</span>
                <strong>{value}</strong>
              </div>
            </div>
          ))}
        </section>

        <div className={styles.detailsGrid}>
          <div className={styles.mainContent}>
            <section className={styles.section} aria-labelledby="reasons-title">
              <p className={styles.eyebrow}>The short version</p>
              <h2 id="reasons-title">Four reasons travelers love this day</h2>
              <div className={styles.reasonsGrid}>
                {reasons.map((reason) => (
                  <article className={styles.reason} key={reason.number}>
                    <span>{reason.number}</span>
                    <div>
                      <h3>{reason.title}</h3>
                      <p>{reason.text}</p>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className={styles.section} aria-labelledby="options-title">
              <p className={styles.eyebrow}>Make it yours</p>
              <h2 id="options-title">Choose how you travel</h2>
              <div className={styles.tourOptions}>
                <TourOption
                  title="Shared small group"
                  badge="Most booked"
                  details="Max 12 travelers · English-speaking guide · Air-con minivan"
                  description="Includes hotel pickup, temple entry fees, guide, buffet lunch on the river cruise back to Bangkok"
                  price="$38"
                  featured
                />
                <TourOption
                  title="Private day with your own guide"
                  details="Just your group · Flexible pace & stops · Private car"
                  description="Price per traveler for 2 people · Everything in the shared option, plus a pickup time that suits you"
                  price="$129"
                />
                <TourOption
                  title="Temples only, back by 14:30"
                  details="Morning loop by minivan · No river cruise"
                  description="Includes hotel pickup, temple entry fees, guide and bottled water · Lunch not included"
                  price="$29"
                />
              </div>
              <a className={styles.textLink} href="mailto:wanderlast02@gmail.com?subject=Question%20about%20the%20Ayutthaya%20trip">
                <FiMessageCircle aria-hidden="true" />
                Questions about this trip? Chat with a local trip expert
                <FiArrowUpRight aria-hidden="true" />
              </a>
            </section>

            <section className={styles.section} aria-labelledby="itinerary-title">
              <p className={styles.eyebrow}>The plan</p>
              <h2 id="itinerary-title">Your day, hour by hour</h2>
              <p className={styles.sectionIntro}>
                Times are approximate and can shift with Bangkok traffic — your guide keeps the group updated on the day.
              </p>
              <div className={styles.itinerary}>
                {itinerary.map((stop) => (
                  <article className={styles.stop} key={stop.time}>
                    <div className={styles.stopTime}>
                      <strong>{stop.time}</strong>
                      <span aria-hidden="true" />
                    </div>
                    <div className={`${styles.stopCard} ${!stop.image ? styles.noStopImage : ""}`}>
                      {stop.image && <img src={stop.image} alt="" />}
                      <div>
                        <span className={styles.stopDuration}>{stop.duration}</span>
                        <h3>{stop.title}</h3>
                        <p>{stop.text}</p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className={styles.section} aria-labelledby="included-title">
              <p className={styles.eyebrow}>No surprises</p>
              <h2 id="included-title">What your ticket covers</h2>
              <div className={styles.includedGrid}>
                <div>
                  <h3>Included</h3>
                  <ul>
                    {included.map((item) => (
                      <li key={item}><FiCheck aria-hidden="true" />{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3>Not included</h3>
                  <ul>
                    {notIncluded.map((item) => (
                      <li className={styles.notIncludedItem} key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            <section className={styles.section} aria-labelledby="pickup-title">
              <p className={styles.eyebrow}>Getting there</p>
              <h2 id="pickup-title">Pickup &amp; drop-off</h2>
              <div className={styles.mapCard}>
                <img
                  src="/images/figma/experiences/ayutthaya-pickup-map.jpg"
                  alt="Map showing the Bangkok pickup area"
                />
                <span><FiMapPin aria-hidden="true" /> Pickup zone: Silom, Sukhumvit, Siam, Riverside &amp; Old Town</span>
              </div>
              <div className={styles.pickupGrid}>
                <article>
                  <span>Pickup · 06:30–07:15</span>
                  <p>We send the exact time and your guide’s WhatsApp the evening before. Wait in the hotel lobby.</p>
                </article>
                <article>
                  <span>Drop-off · around 16:30</span>
                  <p>River City pier near the old town, or back at your hotel by minivan (about 17:30).</p>
                </article>
              </div>
            </section>

            <section className={styles.section} aria-labelledby="prepare-title">
              <p className={styles.eyebrow}>Pack &amp; prepare</p>
              <h2 id="prepare-title">Before you set off</h2>
              <div className={styles.preparationGrid}>
                {preparation.map(({ icon: Icon, title, text }) => (
                  <article className={styles.preparationCard} key={title}>
                    <Icon aria-hidden="true" />
                    <div>
                      <h3>{title}</h3>
                      <p>{text}</p>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className={styles.section} aria-labelledby="reviews-title">
              <div className={styles.sectionHeading}>
                <div>
                  <p className={styles.eyebrow}>Real trips, real people</p>
                  <h2 id="reviews-title">Traveler stories</h2>
                </div>
                <a className={styles.outlineLink} href="mailto:wanderlast02@gmail.com?subject=Ayutthaya%20traveler%20stories">Read all 2,914 stories</a>
              </div>
              <div className={styles.reviewSummary}>
                <div className={styles.reviewScore}>
                  <strong>4.8<span>/5</span></strong>
                  <span className={styles.stars}>★★★★★</span>
                  <p>Excellent · 2,914 trip reports</p>
                </div>
                <div className={styles.ratingBars}>
                  <RatingBar label="Guide" value="4.9" percentage="96%" />
                  <RatingBar label="Route & pacing" value="4.8" percentage="91%" />
                  <RatingBar label="Transport" value="4.7" percentage="87%" />
                  <RatingBar label="Value for money" value="4.8" percentage="91%" />
                </div>
                <div className={styles.mentions}>
                  <strong>Travelers mention most</strong>
                  <span>Knowledgeable guide · 812</span>
                  <span>Photo stops · 640</span>
                  <span>Tasty lunch · 391</span>
                  <span>Well paced · 377</span>
                </div>
              </div>
              <div className={styles.reviewsGrid}>
                {reviews.map((review) => <ReviewCard key={review.initials} review={review} />)}
              </div>
            </section>

            <section className={styles.section} aria-labelledby="faq-title">
              <p className={styles.eyebrow}>Still wondering?</p>
              <h2 id="faq-title">Questions, answered</h2>
              <p className={styles.sectionIntro}>
                Can’t find what you need? Our trip experts are locals and usually reply in under 10 minutes.
              </p>
              <div className={styles.faqGrid}>
                <a className={styles.outlineLink} href="mailto:wanderlast02@gmail.com?subject=Question%20about%20the%20Ayutthaya%20trip">
                  Chat with a trip expert
                </a>
                <div className={styles.faqList}>
                  {questions.map(({ question, answer }, index) => (
                    <details key={question} open={index === 0}>
                      <summary>{question}</summary>
                      <p>{answer}</p>
                    </details>
                  ))}
                </div>
              </div>
            </section>

            <section className={styles.section} aria-labelledby="related-title">
              <div className={styles.sectionHeading}>
                <div>
                  <p className={styles.eyebrow}>Keep exploring</p>
                  <h2 id="related-title">Pair it with another day out</h2>
                </div>
                <Link className={styles.outlineLink} href="/experiences">All day trips from Bangkok</Link>
              </div>
              <div className={styles.relatedGrid}>
                {related.map((item) => <RelatedCard key={item.title} item={item} />)}
              </div>
            </section>
          </div>

          <BookingPanel />
        </div>
      </div>
    </div>
  );
}

function TourOption({ title, badge, details, description, price, featured = false }) {
  return (
    <article className={`${styles.tourOption} ${featured ? styles.featuredOption : ""}`}>
      <div className={styles.optionHeader}>
        <h3>{title}</h3>
        {badge && <span>{badge}</span>}
        <strong>{price}</strong>
      </div>
      <p className={styles.optionDetails}>{details}</p>
      <p>{description}</p>
      <a href="#booking">Check availability</a>
    </article>
  );
}

function RatingBar({ label, value, percentage }) {
  return (
    <div className={styles.ratingBar}>
      <span>{label}</span>
      <div><i style={{ width: percentage }} /></div>
      <strong>{value}</strong>
    </div>
  );
}

function ReviewCard({ review }) {
  return (
    <article className={styles.reviewCard}>
      <div className={styles.reviewer}>
        <span className={styles.avatar}>{review.initials}</span>
        <div>
          <strong>{review.name}</strong>
          <span>{review.location}</span>
        </div>
        <b>{review.rating} <span>★</span></b>
      </div>
      <p className={styles.reviewTrip}>{review.trip}</p>
      <p className={styles.reviewText}>{review.text}</p>
      <span className={styles.helpful}>Helpful · {review.helpful}</span>
    </article>
  );
}

function RelatedCard({ item }) {
  return (
    <article className={styles.relatedCard}>
      <div className={styles.relatedImage}>
        <img src={item.image} alt="" />
        <span>TOP</span>
      </div>
      <div className={styles.relatedBody}>
        <span>{item.location}</span>
        <strong className={styles.relatedRating}>★ {item.rating} <small>({item.reviews})</small></strong>
        <h3>{item.title}</h3>
        <div className={styles.relatedFooter}>
          <span>from <strong>{item.price}</strong></span>
          <a href="mailto:wanderlast02@gmail.com?subject=Day%20trip%20availability">Ask about dates</a>
        </div>
      </div>
    </article>
  );
}

function Intro({ mobile = false }) {
  const Heading = mobile ? "div" : "h1";

  return (
    <>
      <p className={styles.location}>Day trip from Bangkok · Ayutthaya, Thailand</p>
      <Heading
        className={mobile ? styles.mobileTitle : undefined}
        role={mobile ? "heading" : undefined}
        aria-level={mobile ? 1 : undefined}
      >
        Ayutthaya by Land &amp; River
      </Heading>
      <p className={styles.description}>
        Temples of the old Siamese capital by morning, a slow cruise down the
        Chao Phraya by afternoon.
      </p>
      <p className={styles.rating}>
        <span aria-label="Rated 4.8 out of 5">★★★★★</span>
        {" "}4.8 2,914 trip reports · 18K+ travelers went
      </p>
    </>
  );
}
