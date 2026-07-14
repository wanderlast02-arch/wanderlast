"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function LayoutClient({ children }) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Hide header/footer for destination detail pages (crete, etc.)
  // Match /destinations/[slug] but NOT /destinations
  const isDestinationDetail = /^\/destinations\/[^\/]+$/.test(pathname);
  
  // During hydration, render with both (will be corrected after hydration)
  // After hydration, render conditionally
  if (!mounted) {
    return (
      <>
        <Header />
        <main style={{ minHeight: "calc(100vh - 60px)" }}>
          {children}
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      {!isDestinationDetail && <Header />}
      <main style={{ minHeight: isDestinationDetail ? "100vh" : "calc(100vh - 60px)" }}>
        {children}
      </main>
      {!isDestinationDetail && <Footer />}
    </>
  );
}
