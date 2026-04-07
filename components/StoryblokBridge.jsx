"use client";

import { useStoryblokState, StoryblokComponent } from "@storyblok/react";

export default function StoryblokBridge({ story: initialStory, preview }) {
  const story = useStoryblokState(initialStory, {
    resolveRelations: ["featured_experiences", "destinations", "experiences", "country", "destination"],
  }, preview);

  return <StoryblokComponent blok={story.content} />;
}
