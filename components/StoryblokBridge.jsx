"use client";

import { useEffect } from "react";
import { useStoryblokState, StoryblokComponent } from "@storyblok/react";

export default function StoryblokBridge({ story: initialStory, preview }) {
  const story = useStoryblokState(initialStory, {
    resolveRelations: ["featured_experiences", "destinations", "experiences", "country", "destination"],
  }, preview);

  useEffect(() => {
    const initBridge = () => {
      if (typeof window !== "undefined" && window.storyblok) {
        window.storyblok.init();
        
        window.storyblok.on(["input", "published", "change"], (event) => {
          if (event.action === "input") {
            if (event.story.id === story.id) {
              // Reload the page to get fresh content
              window.location.reload();
            }
          }
        });
      }
    };

    if (preview) {
      // Wait for storyblok script to load
      if (typeof window !== "undefined") {
        if (window.storyblok) {
          initBridge();
        } else {
          const checkInterval = setInterval(() => {
            if (window.storyblok) {
              initBridge();
              clearInterval(checkInterval);
            }
          }, 100);

          return () => clearInterval(checkInterval);
        }
      }
    }
  }, [preview, story?.id]);

  return <StoryblokComponent blok={story.content} />;
}
