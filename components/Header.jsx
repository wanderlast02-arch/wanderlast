"use client";

import Link from "next/link";
import { useState } from "react";
import "../styles/header.css";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: "/destinations", label: "Explore Destinations" },
    { href: "/experiences", label: "Tours & Experience" },
    { href: "/", label: "About us" },
  ];

  const actionLinks = [
    { href: "#", label: "USD" },
    { href: "#", label: "Help" },
    { href: "/signup", label: "Sign Up", accent: true },
  ];

  return (
    <header className="bg-white border-b border-gray-200">
      {/* FIGMA_LOCK: Header locked to Figma design authority. Allowed: routing only. Forbidden: height, spacing, typography, layout. */}
      <nav className="max-w-6xl mx-auto px-6 grid grid-cols-[1fr_auto_1fr] items-center h-[72px] relative">
        {/* Left: Logo (justify-self-start) */}
        <div className="justify-self-start flex items-center">
          <Link href="/home" className="flex items-center">
            <img
              src="/images/figma/logo.svg"
              alt="Wanderlast"
              onError={(e) => { e.target.src = "/logo.svg"; }}
              className="h-9 w-auto"
            />
          </Link>
        </div>

        {/* Center: Navigation (justify-self-center) */}
        <nav className="justify-self-center hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-1.5 text-sm font-medium text-gray-700 hover:text-gray-900 transition"
            >
              <span>{link.label}</span>
              <span className="text-xs text-gray-400">▾</span>
            </Link>
          ))}
        </nav>

        {/* Right: Controls (justify-self-end) */}
        <div className="justify-self-end hidden md:flex items-center gap-5 text-sm font-medium">
          {actionLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={link.accent ? "text-green-600 hover:text-green-700 font-semibold transition" : "text-gray-700 hover:text-gray-900 transition"}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <button
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          onClick={() => setMenuOpen((open) => !open)}
          className="md:hidden absolute right-6 top-1/2 -translate-y-1/2 text-sm font-semibold text-gray-700 hover:text-gray-900 transition"
        >
          {menuOpen ? "Close" : "Menu"}
        </button>
      </nav>

      <div
        id="mobile-nav"
        className={`md:hidden border-t border-gray-200 bg-white ${menuOpen ? "block" : "hidden"}`}
      >
        <div className="px-6 py-4 flex flex-col gap-4 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-gray-700 hover:text-gray-900 transition"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-3 border-t border-gray-200 flex flex-col gap-3">
            {actionLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={link.accent ? "text-green-600 hover:text-green-700 font-semibold transition" : "text-gray-700 hover:text-gray-900 transition"}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
