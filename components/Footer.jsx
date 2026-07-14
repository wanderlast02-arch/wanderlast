"use client";

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-white">
      {/* Logo Section */}
      <div className="border-b border-white/10 px-6 py-10 sm:py-12 max-w-7xl mx-auto">
        <a href="/destinations/crete" className="text-2xl font-semibold text-white hover:text-white/80 transition">
          Galini Beach Hotel
        </a>
      </div>

      {/* Terms Section */}
      <div className="border-t border-white/10 px-6 py-6 max-w-7xl mx-auto flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-4 items-center">
          <a href="#" className="text-sm text-neutral-400 hover:text-white transition">Privacy Policy</a>
          <a href="#" className="text-sm text-neutral-400 hover:text-white transition">Terms of Service</a>
          <a href="#" className="text-sm text-neutral-400 hover:text-white transition">Cookie Policy</a>
        </div>
        <p className="text-sm text-neutral-400 m-0">
          © 2026 W - Created with love in Cyprus&Crete
        </p>
      </div>
    </footer>
  );
}
