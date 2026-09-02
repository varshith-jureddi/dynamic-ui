import type { InputFile } from "./loader";

export type ParsedInput = {
  value: unknown;
  rawContent: string;
};

export function parseInput(input: InputFile): ParsedInput {
  if (input.format === "json") {
    try {
      return { value: JSON.parse(input.content), rawContent: input.content };
    } catch {
      throw new Error("Unable to parse JSON input.");
    }
  }

  // Preserve Markdown exactly for Claude. Rendering is a frontend concern.
  return { value: input.content, rawContent: input.content };
}