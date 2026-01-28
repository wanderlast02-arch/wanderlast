"use client";

import Link from "next/link";
import "../styles/header.css";

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200">
      {/* FIGMA_LOCK: Header locked to Figma design authority. Allowed: routing only. Forbidden: height, spacing, typography, layout. */}
      <nav className="max-w-6xl mx-auto px-6 grid grid-cols-[1fr_auto_1fr] items-center h-[72px]">
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
        <nav className="justify-self-center flex items-center gap-8">
          {[
            { href: "/destinations", label: "Explore Destinations" },
            { href: "/experiences", label: "Tours & Experience" },
            { href: "/", label: "About us" },
          ].map((link) => (
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
        <div className="justify-self-end flex items-center gap-5 text-sm font-medium">
          <Link href="#" className="text-gray-700 hover:text-gray-900 transition">USD</Link>
          <Link href="#" className="text-gray-700 hover:text-gray-900 transition">Help</Link>
          <Link href="/signup" className="text-green-600 hover:text-green-700 font-semibold transition">Sign Up</Link>
        </div>
      </nav>
    </header>
  );
}
