import type { ContentDocument } from "@/lib/content/types";
import { defaultDesignSpec } from "@/lib/design-system/tokens";
import type { LayoutSpec } from "./types";

export function createFallbackLayoutSpec(document: ContentDocument): LayoutSpec {
  return {
    root: {
      type: "section",
      children: [
        {
          type: "section",
          layout: "single-column",
          contentIds: document.blocks.map((block) => block.id),
        },
      ],
    },
    designSpec: defaultDesignSpec,
  };
}
