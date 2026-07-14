import "../../../styles/globals.css";
import StoryblokProvider from "../../../storyblok/StoryblokProvider";
import Script from "next/script";

export default function DestinationDetailLayout({ children }) {
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
          <main>
            {children}
          </main>
        </StoryblokProvider>
      </body>
    </html>
  );
}
