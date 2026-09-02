import { readFile } from "node:fs/promises";
import { join } from "node:path";

const root = process.cwd();
const dashboard = JSON.parse(await readFile(join(root, "input/dashboard.json"), "utf8"));
const project = JSON.parse(await readFile(join(root, "input/project-status.json"), "utf8"));
const article = await readFile(join(root, "input/article.md"), "utf8");
const timeline = await readFile(join(root, "input/timeline.md"), "utf8");

if (!dashboard.kpis || !Array.isArray(dashboard.monthlyRevenue)) throw new Error("dashboard fixture failed");
if (!Array.isArray(project.milestones) || !Array.isArray(project.workstreams)) throw new Error("project fixture failed");
if (!article.includes("# Why Adaptive Interfaces Matter")) throw new Error("article fixture failed");
if (!timeline.includes("# Product Roadmap")) throw new Error("timeline fixture failed");

console.log("PASS dashboard.json");
console.log("PASS project-status.json");
console.log("PASS article.md");
console.log("PASS timeline.md");
console.log("Phase 2 smoke tests passed.");
