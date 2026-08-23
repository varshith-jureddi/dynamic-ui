export type Density = "compact" | "comfortable" | "spacious";
export type VisualStyle = "minimal" | "editorial" | "modern" | "playful";
export type Emphasis = "balanced" | "content-first" | "visual-first";
export type ContentWidth = "narrow" | "medium" | "wide";
export type SectionSpacing = "small" | "medium" | "large";

export type DesignSpec = {
  density: Density;
  visualStyle: VisualStyle;
  emphasis: Emphasis;
  maxContentWidth: ContentWidth;
  sectionSpacing: SectionSpacing;
};
