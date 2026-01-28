// app/[...slug]/page.jsx
import { StoryblokComponent } from "@storyblok/react";
import PageHome from "../../storyblok/components/pages/PageHome";
import PageCountry from "../../storyblok/components/pages/PageCountry";
import PageGreece from "../../storyblok/components/pages/PageGreece";
import PageThailand from "../../storyblok/components/pages/PageThailand";

export const revalidate = 60;

async function fetchStory(slugSegments) {
  const slugPath = slugSegments.length > 0 ? slugSegments.join("/") : "home";
  const token = process.env.NEXT_PUBLIC_STORYBLOK_API_TOKEN;

  try {
    const res = await fetch(
      `https://api.storyblok.com/v1/cdn/stories/${slugPath}?version=draft&cv=${Date.now()}&token=${token}`,
      { next: { revalidate: 60 } }
    );

    if (!res.ok) {
      return null;
    }

    const { story } = await res.json();
    return story;
  } catch (err) {
    console.error("Storyblok fetch failed:", err);
    return null;
  }
}

// Fallback demo content for pages not in Storyblok
const DEMO_CONTENT = {
  home: {
    _uid: "home-demo",
    component: "page_home",
    title: "Home",
    body: [],
  },
  thailand: {
    _uid: "thailand-demo",
    component: "page_thailand",
    title: "Thailand",
    description: "Discover authentic experiences in Thailand",
    body: [],
  },
  greece: {
    _uid: "greece-demo",
    component: "page_greece",
    title: "Greece",
    description: "Explore ancient history and stunning Mediterranean islands",
    body: [],
  },
};

export default async function Page({ params }) {
  const slugSegments = Array.isArray(params.slug)
    ? params.slug.filter(Boolean)
    : params.slug
    ? [params.slug]
    : [];

  const slugPath = slugSegments.length > 0 ? slugSegments.join("/") : "home";

  let story = await fetchStory(slugSegments);

  // Use demo content if story not found
  if (!story) {
    const demoKey = slugSegments[0] || "home";
    if (DEMO_CONTENT[demoKey]) {
      story = { content: DEMO_CONTENT[demoKey] };
    }
  }

  if (!story) {
    return (
      <main style={{ padding: "48px 24px" }}>
        <h1>Page not found</h1>
        <p style={{ color: "#6b7280" }}>
          We couldn&apos;t find the page &quot;/{slugPath}&quot;. 
          <br />
          Create a story in Storyblok with this slug to make it live.
        </p>
      </main>
    );
  }

  const content = story.content || {};
  const body = content.body || [];
  const component = content.component || "page_home";

  return (
    <main
      style={{
        padding: "32px 0",
        background: "var(--surface, #f9fafb)",
        color: "var(--text-primary, #0f172a)",
      }}
    >
      {component === "page_home" && <PageHome blok={content} />}
      {component === "page" && <PageHome blok={content} />}
      {component === "page_country" && <PageCountry blok={content} />}
      {component === "page_greece" && <PageGreece blok={content} />}
      {component === "page_thailand" && <PageThailand blok={content} />}
      
      {/* For other components or manual body rendering */}
      {body.map((blok) => (
        <StoryblokComponent blok={blok} key={blok._uid} />
      ))}
    </main>
  );
}
