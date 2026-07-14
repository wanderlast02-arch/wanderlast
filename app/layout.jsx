// app/layout.jsx
import "../styles/globals.css";
import StoryblokProvider from "../storyblok/StoryblokProvider";
import LayoutClient from "./layout-client";
import Script from "next/script";

export const metadata = {
  title: "Wanderlast - Authentic Travel Experiences",
  description: "Discover authentic experiences and sustainable travel with verified local guides.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://app.storyblok.com/f/storyblok-v2-latest.js"
          strategy="beforeInteractive"
        />
      </head>
      <body>
        <StoryblokProvider>
          <LayoutClient>{children}</LayoutClient>
        </StoryblokProvider>
      </body>
    </html>
  );
}
