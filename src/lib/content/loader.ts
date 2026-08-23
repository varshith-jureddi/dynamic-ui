import "server-only";

import { promises as fs } from "node:fs";
import path from "node:path";
import { normalizeJson, normalizeMarkdown } from "./normalize";
import type { ContentDocument } from "./types";

const DEFAULT_CONTENT_FILE = "content/content.md";

function resolveContentPath(): string {
  const configured = process.env.CONTENT_FILE?.trim() || DEFAULT_CONTENT_FILE;
  const root = process.cwd();
  const resolved = path.resolve(root, configured);

  if (resolved !== root && !resolved.startsWith(`${root}${path.sep}`)) {
    throw new Error("CONTENT_FILE must point to a file inside the project.");
  }

  return resolved;
}

export async function loadContent(): Promise<ContentDocument> {
  const filePath = resolveContentPath();
  const extension = path.extname(filePath).toLowerCase();
  const sourceName = path.basename(filePath);
  const raw = await fs.readFile(filePath, "utf8");

  if (extension === ".json") {
    try {
      return normalizeJson(JSON.parse(raw));
    } catch {
      throw new Error(`Invalid JSON in ${sourceName}.`);
    }
  }

  if (extension === ".md" || extension === ".markdown") {
    return normalizeMarkdown(raw, sourceName);
  }

  throw new Error(`Unsupported content file: ${sourceName}. Use JSON or Markdown.`);
}
