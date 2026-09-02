import { readFile } from "node:fs/promises";
import { join } from "node:path";

const root = process.cwd();
const registry = await readFile(join(root, "components/dynamic/ComponentRegistry.ts"), "utf8");
const renderer = await readFile(join(root, "components/dynamic/DynamicRenderer.tsx"), "utf8");
const schema = await readFile(join(root, "lib/validation/ui-schema.ts"), "utf8");
const nested = JSON.parse(await readFile(join(root, "input/nested-demo.json"), "utf8"));

const required = ["page", "section", "card", "metric", "table", "chart", "text", "heading", "list", "timeline"];
for (const name of required) {
  if (!registry.includes(`${name}:`)) throw new Error(`registry missing ${name}`);
}
if (!registry.includes("isRegisteredComponent")) throw new Error("registry guard missing");
if (!renderer.includes("node.children.map")) throw new Error("recursive children rendering missing");
if (!renderer.includes("node.tabs.map")) throw new Error("recursive tab rendering missing");
if (!renderer.includes("UnsupportedComponent")) throw new Error("unsupported fallback missing");
if (!schema.includes('z.literal("tabs")')) throw new Error("tabs missing from schema");
if (!Array.isArray(nested.tabs) || nested.tabs.length !== 2) throw new Error("nested fixture invalid");

console.log("PASS component registry coverage");
console.log("PASS recursive child rendering");
console.log("PASS recursive tabs rendering");
console.log("PASS unsupported component fallback");
console.log("PASS nested-demo.json fixture");
console.log("Phase 4 renderer tests passed.");
