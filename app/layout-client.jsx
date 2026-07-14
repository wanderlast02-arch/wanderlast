"use client";
import { usePathname } from "next/navigation";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function LayoutClient({ children }) {
  const pathname = usePathname();
  
  // Hide header/footer for destination detail pages (crete, etc.)
  // Match /destinations/[slug] but NOT /destinations
  const isDestinationDetail = /^\/destinations\/[^\/]+$/.test(pathname);

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
