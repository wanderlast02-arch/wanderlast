export function getStoryblokAssetFilename(value) {
  if (!value) {
    return null;
  }

  if (typeof value === "string") {
    return value;
  }

  if (Array.isArray(value)) {
    return getStoryblokAssetFilename(value[0]);
  }

  if (typeof value === "object") {
    if (typeof value.filename === "string") {
      return value.filename;
    }

    if (typeof value.url === "string") {
      return value.url;
    }
  }

  return null;
}