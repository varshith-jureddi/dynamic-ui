import fs from "node:fs/promises";
import path from "node:path";

export type InputFormat = "json" | "markdown";

export type InputFile = {
  filename: string;
  format: InputFormat;
  content: string;
};

const SUPPORTED = new Set([".json", ".md", ".markdown"]);

export async function listInputFiles(): Promise<string[]> {
  const dir = path.join(process.cwd(), "input");
  const entries = await fs.readdir(dir, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isFile() && SUPPORTED.has(path.extname(entry.name).toLowerCase()))
    .map((entry) => entry.name)
    .sort();
}

export async function loadInputFile(filename: string): Promise<InputFile> {
  const safeName = path.basename(filename);
  if (safeName !== filename) throw new Error("Invalid filename.");

  const ext = path.extname(safeName).toLowerCase();
  if (!SUPPORTED.has(ext)) throw new Error("Unsupported input format. Only JSON and Markdown are supported.");

  const filePath = path.join(process.cwd(), "input", safeName);
  const content = await fs.readFile(filePath, "utf8");

  return {
    filename: safeName,
    format: ext === ".json" ? "json" : "markdown",
    content
  };
}