import fs from "node:fs/promises";
import path from "node:path";

export type Skill = {
  name: string;
  content: string;
  purpose: string;
  recommendedComponents: string[];
};

function extractSection(markdown: string, heading: string): string {
  const escaped = heading.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = markdown.match(new RegExp(`##\\s+${escaped}\\s*\\n([\\s\\S]*?)(?=\\n##\\s+|$)`, "i"));
  return match?.[1]?.trim() ?? "";
}

function bullets(text: string): string[] {
  return text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => /^[-*]\s+/.test(line))
    .map((line) => line.replace(/^[-*]\s+/, "").trim());
}

export async function loadSkills(): Promise<Skill[]> {
  const root = path.join(process.cwd(), "skills");
  const entries = await fs.readdir(root, { withFileTypes: true });
  const skills: Skill[] = [];

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const skillPath = path.join(root, entry.name, "SKILL.md");
    try {
      const content = await fs.readFile(skillPath, "utf8");
      skills.push({
        name: entry.name,
        content,
        purpose: extractSection(content, "Purpose"),
        recommendedComponents: bullets(
          extractSection(content, "Recommended Components")
        )
      });
    } catch {
      // Incomplete skill folders are ignored in the MVP.
    }
  }

  return skills.sort((a, b) => a.name.localeCompare(b.name));
}
