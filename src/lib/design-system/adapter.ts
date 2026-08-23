import { defaultDesignSpec } from "./tokens";
import type { CSSProperties } from "react";
import type { DesignSpec } from "./types";

export type DesignTokenStyle = CSSProperties & {
  "--density-gap"?: string;
  "--section-gap"?: string;
  "--content-max"?: string;
};

const tokenMap = {
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
  maxContentWidth: {
    narrow: "var(--content-narrow)",
    medium: "var(--content-medium)",
    wide: "var(--content-wide)",
  },
} as const;

export function resolveDesignTokens(spec?: DesignSpec): DesignTokenStyle {
  const value = spec ?? defaultDesignSpec;
  return {
    "--density-gap": tokenMap.density[value.density],
    "--section-gap": tokenMap.sectionSpacing[value.sectionSpacing],
    "--content-max": tokenMap.maxContentWidth[value.maxContentWidth],
  };
}

export function designClasses(spec?: DesignSpec): string {
  const value = spec ?? defaultDesignSpec;
  return [
    `density-${value.density}`,
    `style-${value.visualStyle}`,
    `emphasis-${value.emphasis}`,
    `width-${value.maxContentWidth}`,
    `spacing-${value.sectionSpacing}`,
  ].join(" ");
}
