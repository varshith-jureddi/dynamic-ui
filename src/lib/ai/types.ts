import type { DesignSpec } from "@/lib/design-system/types";

export const COMPONENT_TYPES = [
  "hero",
  "section",
  "text",
  "card",
  "grid",
  "list",
  "callout",
  "quote",
  "table",
] as const;

export type ComponentType = (typeof COMPONENT_TYPES)[number];

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

export type LayoutNode = {
  type: ComponentType;
  layout?: LayoutType;
  contentIds?: string[];
  children?: LayoutNode[];
  props?: Record<string, unknown>;
};

export type LayoutSpec = {
  root: LayoutNode;
  designSpec?: DesignSpec;
};
