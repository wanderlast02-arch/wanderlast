export function isStoryblokPreview(searchParams) {
  if (!searchParams) {
    return false;
  }

  const entries = Object.entries(searchParams);

  return entries.some(([key, value]) => {
    if (!key.startsWith("_storyblok")) {
      return false;
    }

    if (Array.isArray(value)) {
      return value.length > 0;
    }

    return value !== undefined && value !== null && value !== "";
  });
}