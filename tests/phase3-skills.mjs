import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";

const root = process.cwd();
const dirs = (await readdir(join(root, "skills"), { withFileTypes: true }))
  .filter((x) => x.isDirectory())
  .map((x) => x.name)
  .sort();

const required = ["article", "dashboard", "documentation", "table", "timeline", "visualization"];
for (const name of required) {
  if (!dirs.includes(name)) throw new Error(`missing skill: ${name}`);
  const md = await readFile(join(root, "skills", name, "SKILL.md"), "utf8");
  if (!md.includes("## Purpose")) throw new Error(`${name}: missing Purpose`);
  if (!md.includes("## Recommended Components")) throw new Error(`${name}: missing Recommended Components`);
}

const selector = await readFile(join(root, "lib/skills/selector.ts"), "utf8");
if (!selector.includes("validateSelectedSkills")) throw new Error("skill validation helper missing");

console.log(`PASS ${dirs.length} skills discovered`);
console.log("PASS every required skill has SKILL.md metadata");
console.log("PASS selected-skill validation helper exists");
console.log("Phase 3 skill tests passed.");
