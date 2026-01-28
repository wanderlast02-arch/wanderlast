"use client";

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "var(--neutral-900)", color: "white", marginTop: "80px" }}>
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "60px 24px",
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "40px",
        }}
      >
        {/* Explore Destinations */}
        <div>
          <h3 style={{ fontSize: "16px", fontWeight: 600, marginBottom: "24px" }}>Explore Destinations</h3>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {["Europe", "Asia", "North America", "South America", "Africa", "Oceania", "Middle East"].map((link) => (
              <li key={link} style={{ marginBottom: "12px" }}>
                <a
                  href="#"
                  style={{
                    color: "#999",
                    textDecoration: "none",
                    fontSize: "14px",
                  }}
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Tours & Experience */}
        <div>
          <h3 style={{ fontSize: "16px", fontWeight: 600, marginBottom: "24px" }}>Tours & Experience</h3>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {["Tour Packages", "Flight Booking", "Hotel Reservations", "Transfers", "Passes & Tickets", "Car Rentals", "Travel Insurance", "Visa Assistance"].map((link) => (
              <li key={link} style={{ marginBottom: "12px" }}>
                <a
                  href="#"
                  style={{
                    color: "#999",
                    textDecoration: "none",
                    fontSize: "14px",
                  }}
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* About us */}
        <div>
          <h3 style={{ fontSize: "16px", fontWeight: 600, marginBottom: "24px" }}>About us</h3>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {["Company", "Our Team", "Careers", "Press", "Blog", "Contact"].map((link) => (
              <li key={link} style={{ marginBottom: "12px" }}>
                <a
                  href="#"
                  style={{
                    color: "#999",
                    textDecoration: "none",
                    fontSize: "14px",
                  }}
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Get in Touch */}
        <div>
          <h3 style={{ fontSize: "16px", fontWeight: 600, marginBottom: "24px" }}>Get in Touch</h3>
          <div style={{ marginBottom: "16px" }}>
            <p style={{ fontSize: "14px", color: "#999", margin: "0 0 8px 0" }}>📞 +1 (555) 123-4567</p>
            <p style={{ fontSize: "14px", color: "#999", margin: "0 0 8px 0" }}>✉️ info@wanderlast.com</p>
            <p style={{ fontSize: "14px", color: "#999", margin: "0" }}>📍 123 Travel Street Adventure City, AC 12345</p>
          </div>
          <div style={{ display: "flex", gap: "16px", marginTop: "20px" }}>
            <a href="#" style={{ width: "40px", height: "40px", borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", textDecoration: "none" }}>f</a>
            <a href="#" style={{ width: "40px", height: "40px", borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", textDecoration: "none" }}>📷</a>
            <a href="#" style={{ width: "40px", height: "40px", borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", textDecoration: "none" }}>💬</a>
            <a href="#" style={{ fontSize: "14px", color: "#4A90E2", textDecoration: "none", paddingLeft: "8px", lineHeight: "40px" }}>Subscribe</a>
          </div>
        </div>
      </div>

      {/* Logo Section */}
      <div
        style={{
          borderTop: "1px solid rgba(255, 255, 255, 0.1)",
          padding: "60px 24px",
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        <img
          src="/logo-footer.svg"
          alt="Wanderlast"
          style={{ height: "auto", width: "100%", maxWidth: "400px" }}
        />
      </div>

      {/* Bottom Section */}
      <div
        style={{
          borderTop: "1px solid rgba(255, 255, 255, 0.1)",
          padding: "24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
          <a href="#" style={{ fontSize: "14px", color: "#999", textDecoration: "none" }}>Privacy Policy</a>
          <a href="#" style={{ fontSize: "14px", color: "#999", textDecoration: "none" }}>Terms of Service</a>
          <a href="#" style={{ fontSize: "14px", color: "#999", textDecoration: "none" }}>Cookie Policy</a>
        </div>
        <p style={{ fontSize: "14px", color: "#999", margin: 0 }}>
          © 2025 Wanderlast. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
