import fs from "node:fs";
const panel=fs.readFileSync("components/DemoPanel.tsx","utf8");
if (!panel.includes("Generate another dashboard")) throw new Error("Regeneration control missing.");
if (panel.includes("/api/files")) throw new Error("Input file endpoint should not be exposed by the UI.");
if (panel.includes("Skill Inspector")) throw new Error("Developer inspector should not be visible.");
console.log("Phase 5 demo tests passed.");
