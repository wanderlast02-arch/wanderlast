"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getCreteLandingSlugs } from "../lib/creteLandingSlugs";

const creteExperiencePaths = new Set(getCreteLandingSlugs().map((slug) => `/experiences/${slug}`));

export default function LayoutClient({ children }) {
  const pathname = usePathname();
  const isCreteKiosk = pathname === "/destinations/crete" || creteExperiencePaths.has(pathname);

  return (
    <>
      {isCreteKiosk ? (
        <header className="bg-white border-b border-gray-200">
          <nav className="max-w-6xl mx-auto px-6 flex items-center h-[72px]">
            <Link href="/destinations/crete" className="flex items-center">
              <span className="text-lg font-semibold text-gray-900">Galini Beach Hotel</span>
            </Link>
          </nav>
        </header>
      ) : <Header />}
      <main style={{ minHeight: "calc(100vh - 60px)" }} className="overflow-x-hidden bg-white">
        {children}
      </main>
      {isCreteKiosk ? (
        <footer className="bg-neutral-900 text-white">
          <div className="border-b border-white/10 px-6 py-10 sm:py-12 max-w-7xl mx-auto">
            <Link href="/destinations/crete" className="text-2xl font-semibold text-white hover:text-white/80 transition">
              Galini Beach Hotel
            </Link>
          </div>
          <div className="border-t border-white/10 px-6 py-6 max-w-7xl mx-auto flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-4 items-center">
              <a href="#" className="text-sm text-neutral-400 hover:text-white transition">Privacy Policy</a>
              <a href="#" className="text-sm text-neutral-400 hover:text-white transition">Terms of Service</a>
              <a href="#" className="text-sm text-neutral-400 hover:text-white transition">Cookie Policy</a>
            </div>
            <p className="text-sm text-neutral-400 m-0">© 2026 W - Created with love in Cyprus&amp;Crete</p>
          </div>
        </footer>
      ) : <Footer />}
    </>
  );
}
