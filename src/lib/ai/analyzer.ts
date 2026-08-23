import type { ContentDocument } from "@/lib/content/types";

export type ContentProfile = {
  blockCount: number;
  types: string[];
  counts: Record<string, number>;
  hasHeadings: boolean;
  hasLists: boolean;
  hasQuotes: boolean;
  hasTables: boolean;
  hasCode: boolean;
  hasMetrics: boolean;
  hasChronology: boolean;
  hasLongFormText: boolean;
};

function looksLikeMetric(value: unknown) {
  if (typeof value !== "string") return false;
  return /(?:^|\s)(?:\d+(?:\.\d+)?%|\$\s?\d|€\s?\d|£\s?\d|\d[\d,]*\s?(?:users|customers|items|ms|sec|seconds|minutes))\b/i.test(value);
}

function looksChronological(block: ContentDocument["blocks"][number]) {
  const text = typeof block.content === "string" ? block.content : JSON.stringify(block.content);
  return /\b(?:19|20)\d{2}\b/.test(text) || /\b(?:jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\b/i.test(text);
}

export function analyzeContent(document: ContentDocument): ContentProfile {
  const counts: Record<string, number> = {};
  for (const block of document.blocks) counts[block.type] = (counts[block.type] ?? 0) + 1;

  const types = Object.keys(counts).sort();
  const textValues = document.blocks.map((block) =>
    typeof block.content === "string" ? block.content : JSON.stringify(block.content),
  );

  return {
    blockCount: document.blocks.length,
    types,
    counts,
    hasHeadings: document.blocks.some((block) => block.type.startsWith("heading-")),
    hasLists: document.blocks.some((block) => block.type === "list" || block.type === "ordered-list"),
    hasQuotes: document.blocks.some((block) => block.type === "quote"),
    hasTables: document.blocks.some((block) => block.type === "table"),
    hasCode: document.blocks.some((block) => block.type === "code"),
    hasMetrics: document.blocks.some((block) => looksLikeMetric(block.content)),
    hasChronology: document.blocks.some(looksChronological),
    hasLongFormText: textValues.some((value) => value.length > 500),
  };
}
