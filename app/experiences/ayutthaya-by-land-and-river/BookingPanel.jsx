"use client";

import { useState } from "react";
import styles from "./page.module.css";

const options = [
  { name: "Shared small group", price: 38, note: "Most booked", details: "Max 12 travelers · English-speaking guide · Air-con minivan", includes: "Hotel pickup, temple entry fees, guide, buffet lunch on the river cruise back to Bangkok" },
  { name: "Private day with your own guide", price: 129, details: "Just your group · Flexible pace & stops · Private car", includes: "Price per traveler for 2 people · Everything in the shared option, plus a pickup time that suits you" },
  { name: "Temples only, back by 14:30", price: 29, details: "Morning loop by minivan · No river cruise", includes: "Hotel pickup, temple entry fees, guide and bottled water · Lunch not included" },
];

export default function BookingPanel() {
  const [optionIndex, setOptionIndex] = useState(0);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [date, setDate] = useState("");

  const option = options[optionIndex];
  const total = option.price * (adults + children);
  const subject = encodeURIComponent("Ayutthaya day trip reservation request");
  const body = encodeURIComponent(
    `I'd like to request ${option.name} for ${adults} adult(s) and ${children} child(ren). Date: ${date || "to be confirmed"}.`
  );

  return (
    <aside className={styles.booking} id="booking" aria-labelledby="booking-title">
      <p className={styles.bookingLabel} id="booking-title">Plan your trip</p>
      <p className={styles.bookingPrice}>
        <strong>from ${option.price}</strong> / traveler
      </p>
      {optionIndex === 0 && <p className={styles.oldPrice}>$46 · Save 17% this week</p>}

      <label className={styles.bookingLabel} htmlFor="trip-date">Pick a date</label>
      <input
        className={styles.dateInput}
        id="trip-date"
        type="date"
        value={date}
        onChange={(event) => setDate(event.target.value)}
      />

      <p className={styles.bookingLabel}>Travelers</p>
      <div className={styles.counterRow}>
        <span>Adults <small>Age 12+</small></span>
        <Counter value={adults} onChange={setAdults} min={1} />
      </div>
      <div className={styles.counterRow}>
        <span>Children <small>Age 4–11</small></span>
        <Counter value={children} onChange={setChildren} min={0} />
      </div>

      <label className={styles.bookingLabel} htmlFor="trip-option">Option</label>
      <select
        className={styles.optionSelect}
        id="trip-option"
        value={optionIndex}
        onChange={(event) => setOptionIndex(Number(event.target.value))}
      >
        {options.map((item, index) => (
          <option value={index} key={item.name}>{item.name} · ${item.price}</option>
        ))}
      </select>

      <ul className={styles.bookingBenefits}>
        <li>Send your selected option and dates by email</li>
        <li>Availability and terms will be confirmed by our team</li>
      </ul>

      <div className={styles.totalRow}>
        <span>Total · {adults + children} traveler{adults + children === 1 ? "" : "s"}</span>
        <strong>${total}</strong>
      </div>
      <a
        className={styles.reserveButton}
        href={`mailto:wanderlast02@gmail.com?subject=${subject}&body=${body}`}
      >
        Request availability
      </a>
      <p className={styles.noCharge}>This is an inquiry, not a confirmed booking.</p>
      <a className={styles.mobileBookingBar} href="#booking">
        <span>
          <strong>From ${option.price}</strong>
          <small>Request availability</small>
        </span>
        <b>Check dates</b>
      </a>
    </aside>
  );
}

function Counter({ value, onChange, min }) {
  return (
    <div className={styles.counter}>
      <button
        type="button"
        aria-label="Decrease travelers"
        disabled={value <= min}
        onClick={() => onChange(Math.max(min, value - 1))}
      >
        −
      </button>
      <span aria-live="polite">{value}</span>
      <button
        type="button"
        aria-label="Increase travelers"
        onClick={() => onChange(value + 1)}
      >
        +
      </button>
    </div>
  );
}
