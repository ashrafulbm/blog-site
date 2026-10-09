// Small helpers for displaying posts. Safe to use anywhere.

/** First part of the post, used on the list page. */
export function excerpt(content: string, length = 180) {
  const text = content.replace(/\s+/g, " ").trim();
  return text.length > length ? text.slice(0, length).trimEnd() + "…" : text;
}

/** Estimated reading time, assuming ~200 words per minute. */
export function readingMinutes(content: string) {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(date);
}
