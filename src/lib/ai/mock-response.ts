// import fs from "node:fs";
// import path from "node:path";

// import type { ContentDocument } from "@/lib/content/types";
// import type { LayoutSpec } from "./types";

// const DEFAULT_MOCK_RESPONSE = "content/mocks/01_product-story-mock.json";

// export function createDemoLayoutSpec(document: ContentDocument): LayoutSpec {
//   const configuredFile =
//     process.env.MOCK_RESPONSE_FILE?.trim() || DEFAULT_MOCK_RESPONSE;

//   const projectRoot = process.cwd();
//   const filePath = path.resolve(projectRoot, configuredFile);

//   // Prevent the mock response loader from reading outside the project.
//   if (!filePath.startsWith(projectRoot + path.sep)) {
//     throw new Error("MOCK_RESPONSE_FILE must point inside the project.");
//   }

//   if (!fs.existsSync(filePath)) {
//     throw new Error(`Mock response file not found: ${configuredFile}`);
//   }

//   const raw = fs.readFileSync(filePath, "utf-8");

//   let parsed: unknown;

//   try {
//     parsed = JSON.parse(raw);
//   } catch {
//     throw new Error(`Invalid JSON in mock response: ${configuredFile}`);
//   }

//   if (!isObject(parsed)) {
//     throw new Error(`Mock response must contain a JSON object: ${configuredFile}`);
//   }

//   // Support either:
//   //
//   // {
//   //   "root": {...},
//   //   "designSpec": {...}
//   // }
//   //
//   // or:
//   //
//   // {
//   //   "layoutSpec": {
//   //     "root": {...},
//   //     "designSpec": {...}
//   //   }
//   // }
//   //
//   const candidate =
//     "layoutSpec" in parsed && isObject(parsed.layoutSpec)
//       ? parsed.layoutSpec
//       : parsed;

//   return candidate as LayoutSpec;
// }

// function isObject(value: unknown): value is Record<string, unknown> {
//   return typeof value === "object" && value !== null && !Array.isArray(value);
// }



import type { ContentDocument } from "@/lib/content/types";
import type { LayoutSpec } from "./types";

export function createDemoLayoutSpec(_document: ContentDocument): LayoutSpec {
  return DEMO_LAYOUT_SPEC;
}

const DEMO_LAYOUT_SPEC: LayoutSpec = {
  "root": {
    "type": "section",
    "children": [
      {
        "type": "hero",
        "props": {
          "eyebrow": "Adaptive UI showcase"
        }
      },
      {
        "type": "section",
        "children": [
          {
            "type": "section",
            "layout": "single-column",
            "contentIds": [
              "intro-heading",
              "intro-text"
            ]
          },
          {
            "type": "section",
            "layout": "split",
            "contentIds": [
              "split-main",
              "split-side",
              "split-list"
            ]
          },
          {
            "type": "section",
            "layout": "feature-grid",
            "contentIds": [
              "feat-1",
              "feat-2",
              "feat-3"
            ]
          },
          {
            "type": "section",
            "layout": "bento",
            "contentIds": [
              "bento-1",
              "bento-2",
              "bento-3"
            ]
          },
          {
            "type": "section",
            "layout": "timeline",
            "contentIds": [
              "time-1",
              "time-2",
              "time-3"
            ]
          },
          {
            "type": "section",
            "layout": "comparison",
            "contentIds": [
              "comp-1",
              "comp-2",
              "comp-3",
              "comp-4"
            ]
          },
          {
            "type": "section",
            "layout": "stats",
            "contentIds": [
              "stat-1",
              "stat-2",
              "stat-3"
            ]
          },
          {
            "type": "section",
            "layout": "quote-focus",
            "contentIds": [
              "quote-1",
              "quote-2"
            ]
          },
          {
            "type": "section",
            "layout": "story",
            "contentIds": [
              "story-1",
              "story-2",
              "story-3"
            ]
          },
          {
            "type": "section",
            "layout": "magazine",
            "contentIds": [
              "mag-1",
              "mag-2",
              "mag-3"
            ]
          },
          {
            "type": "section",
            "layout": "minimal",
            "contentIds": [
              "min-1",
              "min-2"
            ]
          },
          {
            "type": "section",
            "layout": "highlight",
            "contentIds": [
              "highlight-1",
              "highlight-2"
            ]
          }
        ]
      },
      {
        "type": "section",
        "children": [
          {
            "type": "text",
            "contentIds": [
              "component-text"
            ]
          },
          {
            "type": "card",
            "contentIds": [
              "component-card"
            ]
          },
          {
            "type": "grid",
            "contentIds": [
              "component-grid-1",
              "component-grid-2"
            ]
          },
          {
            "type": "list",
            "contentIds": [
              "component-list"
            ]
          },
          {
            "type": "list",
            "contentIds": [
              "component-list-2"
            ]
          },
          {
            "type": "callout",
            "contentIds": [
              "component-callout"
            ],
            "props": {
              "label": "Component showcase",
              "tone": "accent"
            }
          },
          {
            "type": "quote",
            "contentIds": [
              "component-quote"
            ],
            "props": {
              "source": "Demo"
            }
          },
          {
            "type": "table",
            "contentIds": [
              "component-table"
            ]
          }
        ]
      }
    ]
  },
  "designSpec": {
    "density": "comfortable",
    "visualStyle": "editorial",
    "emphasis": "visual-first",
    "maxContentWidth": "wide",
    "sectionSpacing": "large"
  }
};
