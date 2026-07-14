"use client";

import Link from "next/link";
import "../styles/header.css";

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200">
      {/* FIGMA_LOCK: Header locked to Figma design authority. Logo only during testing. */}
      <nav className="max-w-6xl mx-auto px-6 flex items-center h-[72px]">
        {/* Logo only */}
        <Link href="/home" className="flex items-center">
          <span className="text-lg font-semibold text-gray-900">Galini Beach Hotel</span>
        </Link>
      </nav>
    </header>
  );
}
