import type { ContentDocument } from "@/lib/content/types";
import type { DesignSpec } from "@/lib/design-system/types";
import { COMPONENT_TYPES, LAYOUT_TYPES, type LayoutNode, type LayoutSpec } from "./types";

const componentSet = new Set<string>(COMPONENT_TYPES);
const layoutSet = new Set<string>(LAYOUT_TYPES);
const designValues = {
  density: new Set(["compact", "comfortable", "spacious"]),
  visualStyle: new Set(["minimal", "editorial", "modern", "playful"]),
  emphasis: new Set(["balanced", "content-first", "visual-first"]),
  maxContentWidth: new Set(["narrow", "medium", "wide"]),
  sectionSpacing: new Set(["small", "medium", "large"]),
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function validateDesignSpec(value: unknown): DesignSpec | undefined {
  if (value === undefined) return undefined;
  if (!isRecord(value)) throw new Error("designSpec must be an object.");

  for (const key of Object.keys(value)) {
    if (!(key in designValues)) throw new Error(`Unsupported designSpec property: ${key}.`);
  }

  const required = ["density", "visualStyle", "emphasis", "maxContentWidth", "sectionSpacing"] as const;
  for (const key of required) {
    const candidate = value[key];
    if (typeof candidate !== "string" || !designValues[key].has(candidate)) {
      throw new Error(`Invalid designSpec.${key}.`);
    }
  }

  return value as DesignSpec;
}

function validateProps(value: unknown, type: string): Record<string, unknown> | undefined {
  if (value === undefined) return undefined;
  if (!isRecord(value)) throw new Error(`props for ${type} must be an object.`);

  const allowedByType: Record<string, Set<string>> = {
    hero: new Set(["eyebrow"]),
    callout: new Set(["label", "tone"]),
    quote: new Set(["source"]),
  };
  const allowed = allowedByType[type] ?? new Set<string>();

  for (const key of Object.keys(value)) {
    if (!allowed.has(key)) throw new Error(`Unsupported prop '${key}' on ${type}.`);
    if (typeof value[key] !== "string") throw new Error(`Prop '${key}' on ${type} must be a string.`);
  }
  return value;
}

function validateNode(
  value: unknown,
  validIds: Set<string>,
  referencedIds: Set<string>,
  depth = 0,
): LayoutNode {
  if (depth > 8) throw new Error("LayoutSpec nesting is too deep.");
  if (!isRecord(value)) throw new Error("Each layout node must be an object.");

  const { type, layout, contentIds, children } = value;
  if (typeof type !== "string" || !componentSet.has(type)) throw new Error(`Unsupported component type: ${String(type)}.`);
  if (layout !== undefined && (typeof layout !== "string" || !layoutSet.has(layout))) {
    throw new Error(`Unsupported layout type: ${String(layout)}.`);
  }

  const validatedContentIds: string[] | undefined = contentIds === undefined ? undefined : (() => {
    if (!Array.isArray(contentIds) || !contentIds.every((id) => typeof id === "string")) {
      throw new Error(`contentIds on ${type} must be an array of strings.`);
    }
    for (const id of contentIds) {
      if (!validIds.has(id)) throw new Error(`Unknown content ID: ${id}.`);
      if (referencedIds.has(id)) throw new Error(`Content ID referenced more than once: ${id}.`);
      referencedIds.add(id);
    }
    return [...contentIds];
  })();

  let validatedChildren: LayoutNode[] | undefined;
  if (children !== undefined) {
    if (!Array.isArray(children)) throw new Error(`children on ${type} must be an array.`);
    validatedChildren = children.map((child) => validateNode(child, validIds, referencedIds, depth + 1));
  }

  const props = validateProps(value.props, type);
  const result: LayoutNode = { type: type as LayoutNode["type"] };
  if (layout !== undefined) result.layout = layout as LayoutNode["layout"];
  if (validatedContentIds !== undefined) result.contentIds = validatedContentIds;
  if (validatedChildren !== undefined) result.children = validatedChildren;
  if (props !== undefined) result.props = props;
  return result;
}

export function validateLayoutSpec(value: unknown, document: ContentDocument): LayoutSpec {
  if (!isRecord(value)) throw new Error("LayoutSpec must be a JSON object.");
  const validIds = new Set(document.blocks.map((block) => block.id));
  if (validIds.size !== document.blocks.length) throw new Error("Content block IDs must be unique.");
  if (!("root" in value)) throw new Error("LayoutSpec.root is required.");

  const referencedIds = new Set<string>();
  const root = validateNode(value.root, validIds, referencedIds);

  if (referencedIds.size !== validIds.size) {
    const missing = document.blocks.map((block) => block.id).filter((id) => !referencedIds.has(id));
    throw new Error(`LayoutSpec does not render all content blocks: ${missing.join(", ")}.`);
  }

  return {
    root,
    designSpec: validateDesignSpec(value.designSpec),
  };
}
