import type { DesignSpec } from "./types";

export const designTokens = {
  contentWidth: {
    narrow: "var(--content-narrow)",
    medium: "var(--content-medium)",
    wide: "var(--content-wide)",
  },
  density: {
    compact: "var(--density-compact)",
    comfortable: "var(--density-comfortable)",
    spacious: "var(--density-spacious)",
  },
  sectionSpacing: {
    small: "var(--section-small)",
    medium: "var(--section-medium)",
    large: "var(--section-large)",
  },
} as const;

export const defaultDesignSpec: DesignSpec = {
  density: "comfortable",
  visualStyle: "editorial",
  emphasis: "content-first",
  maxContentWidth: "medium",
  sectionSpacing: "medium",
};
