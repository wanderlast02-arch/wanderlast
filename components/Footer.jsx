"use client";

export default function Footer() {
  return (
    <footer className="mt-20 bg-neutral-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-12 sm:py-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {/* Explore Destinations */}
        <div>
          <h3 className="text-base font-semibold mb-6">Explore Destinations</h3>
          <ul className="list-none p-0">
            {["Europe", "Asia", "North America", "South America", "Africa", "Oceania", "Middle East"].map((link) => (
              <li key={link} className="mb-3">
                <a
                  href="#"
                  className="text-sm text-neutral-400 hover:text-white transition"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Tours & Experience */}
        <div>
          <h3 className="text-base font-semibold mb-6">Tours & Experience</h3>
          <ul className="list-none p-0">
            {["Tour Packages", "Flight Booking", "Hotel Reservations", "Transfers", "Passes & Tickets", "Car Rentals", "Travel Insurance", "Visa Assistance"].map((link) => (
              <li key={link} className="mb-3">
                <a
                  href="#"
                  className="text-sm text-neutral-400 hover:text-white transition"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* About us */}
        <div>
          <h3 className="text-base font-semibold mb-6">About us</h3>
          <ul className="list-none p-0">
            {["Company", "Our Team", "Careers", "Press", "Blog", "Contact"].map((link) => (
              <li key={link} className="mb-3">
                <a
                  href="#"
                  className="text-sm text-neutral-400 hover:text-white transition"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Get in Touch */}
        <div>
          <h3 className="text-base font-semibold mb-6">Get in Touch</h3>
          <div className="mb-4">
            <p className="text-sm text-neutral-400 mb-2">📞 +30 693 412 6131</p>
            <p className="text-sm text-neutral-400 mb-2">✉️ wanderlast02@gmail.com</p>
            <p className="text-sm text-neutral-400">📍 Limmasol</p>
          </div>
          <div className="flex flex-wrap items-center gap-4 mt-5">
            <a href="#" className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center text-white no-underline">f</a>
            <a href="#" className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center text-white no-underline">📷</a>
            <a href="#" className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center text-white no-underline">💬</a>
            <a href="#" className="text-sm text-blue-400 no-underline hover:text-blue-300">Subscribe</a>
          </div>
        </div>
      </div>

      {/* Logo Section */}
      <div className="border-t border-white/10 px-6 py-10 sm:py-12 max-w-7xl mx-auto">
        <img
          src="/logo-footer.svg"
          alt="Wanderlast"
          className="h-auto w-full max-w-xs sm:max-w-md"
        />
      </div>

      {/* Bottom Section */}
      <div className="border-t border-white/10 px-6 py-6 max-w-7xl mx-auto flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-4 items-center">
          <a href="#" className="text-sm text-neutral-400 hover:text-white transition">Privacy Policy</a>
          <a href="#" className="text-sm text-neutral-400 hover:text-white transition">Terms of Service</a>
          <a href="#" className="text-sm text-neutral-400 hover:text-white transition">Cookie Policy</a>
        </div>
        <p className="text-sm text-neutral-400 m-0">
          © 2026 Wanderlast - Created with love in Cyprus&Crete
        </p>
      </div>
    </footer>
  );
}
