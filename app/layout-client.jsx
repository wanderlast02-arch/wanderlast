"use client";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function LayoutClient({ children }) {
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
