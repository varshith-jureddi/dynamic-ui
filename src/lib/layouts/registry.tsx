import type { ComponentType } from "react";
import { SingleColumn } from "@/components/layouts/SingleColumn";
import { Split } from "@/components/layouts/Split";
import { FeatureGrid } from "@/components/layouts/FeatureGrid";
import { Bento } from "@/components/layouts/Bento";
import { Timeline } from "@/components/layouts/Timeline";
import { Comparison } from "@/components/layouts/Comparison";
import { Stats } from "@/components/layouts/Stats";
import { QuoteFocus } from "@/components/layouts/QuoteFocus";
import { Story } from "@/components/layouts/Story";
import { Magazine } from "@/components/layouts/Magazine";
import { Minimal } from "@/components/layouts/Minimal";
import { Highlight } from "@/components/layouts/Highlight";
import type { LayoutProps, LayoutType } from "./types";

export const layouts: Record<LayoutType, ComponentType<LayoutProps>> = {
  "single-column": SingleColumn,
  split: Split,
  "feature-grid": FeatureGrid,
  bento: Bento,
  timeline: Timeline,
  comparison: Comparison,
  stats: Stats,
  "quote-focus": QuoteFocus,
  story: Story,
  magazine: Magazine,
  minimal: Minimal,
  highlight: Highlight,
};

export function isLayoutType(value: string): value is LayoutType {
  return value in layouts;
}

export function getLayout(layout: LayoutType) {
  return layouts[layout];
}
