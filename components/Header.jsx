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
          <img
            src="/images/figma/logo.svg"
            alt="Wanderlast"
            onError={(e) => { e.target.src = "/logo.svg"; }}
            className="h-9 w-auto"
          />
        </Link>
      </nav>
    </header>
  );
}
