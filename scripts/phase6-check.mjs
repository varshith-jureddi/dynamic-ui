import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const samples = path.join(root, "content", "samples");
const required = ["technical.md", "product.md", "report.json", "long-form.md", "list.md", "mixed.md"];
const failures = [];

for (const file of required) {
  const full = path.join(samples, file);
  if (!fs.existsSync(full)) failures.push(`Missing representative sample: ${file}`);
}

const requiredFiles = [
  "src/lib/ai/analyzer.ts",
  "src/lib/ai/prompt.ts",
  "src/lib/ai/validator.ts",
  "src/lib/ai/fallback.ts",
  "src/lib/design-system/adapter.ts",
  "src/lib/rendering/AdaptiveRenderer.tsx",
];
for (const file of requiredFiles) {
  if (!fs.existsSync(path.join(root, file))) failures.push(`Missing required implementation: ${file}`);
}

const prompt = fs.readFileSync(path.join(root, "src/lib/ai/prompt.ts"), "utf8");
for (const phrase of ["Never rewrite", "Every content block ID", "Allowed layouts", "contentProfile"]) {
  if (!prompt.toLowerCase().includes(phrase.toLowerCase())) failures.push(`Prompt safeguard missing: ${phrase}`);
}

const css = fs.readFileSync(path.join(root, "src/app/globals.css"), "utf8");
for (const token of ["--color-bg: #F7F5F0", "--color-accent: #D65A3A", "--content-narrow: 680px", "prefers-reduced-motion"]) {
  if (!css.includes(token)) failures.push(`Design-system requirement missing: ${token}`);
}

const report = JSON.parse(fs.readFileSync(path.join(samples, "report.json"), "utf8"));
if (!report.title || !Array.isArray(report.blocks) || report.blocks.some((b) => !b.id || !b.type || !("content" in b))) {
  failures.push("Representative JSON does not match the normalized source shape.");
}

if (failures.length) {
  console.error("Phase 6 checks failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Phase 6 checks passed: ${required.length} representative documents and core safeguards verified.`);
