import type { ContentDocument } from "@/lib/content/types";

export const LAYOUT_TYPES = [
  "single-column",
  "split",
  "feature-grid",
  "bento",
  "timeline",
  "comparison",
  "stats",
  "quote-focus",
  "story",
  "magazine",
  "minimal",
  "highlight",
] as const;

export type LayoutType = (typeof LAYOUT_TYPES)[number];

export type LayoutProps = {
  document: ContentDocument;
};
