import { AIEnvelopeSchema, type AIEnvelope } from "@/lib/validation/ui-schema";
import { askClaude } from "./claude";
import { buildSystemPrompt, buildUserPrompt } from "./prompt";
import { createDemoEnvelope } from "./demo-generator";
import type { Skill } from "@/lib/skills/loader";
import type { InputFormat } from "@/lib/input/loader";

function extractJson(raw: string): unknown {
  try { return JSON.parse(raw.trim()); } catch {}
  const fenced = raw.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
  if (fenced) { try { return JSON.parse(fenced[1]); } catch {} }
  const start = raw.indexOf("{"), end = raw.lastIndexOf("}");
  if (start >= 0 && end > start) { try { return JSON.parse(raw.slice(start, end + 1)); } catch {} }
  throw new Error("Claude returned a response that was not valid JSON.");
}

export async function generateUISpec(content: string, format: InputFormat, skills: Skill[], filename: string): Promise<{ envelope: AIEnvelope; raw: string; mode: "claude" | "demo" }> {
  if (process.env.DEMO_MODE === "true" || !process.env.ANTHROPIC_API_KEY) {
    const envelope = createDemoEnvelope(filename, format, content);
    return { envelope, raw: JSON.stringify(envelope), mode: "demo" };
  }

  const system = buildSystemPrompt(skills);
  const user = buildUserPrompt(content, format);
  let raw = await askClaude(system, user);
  let parsed: unknown;

  try { parsed = extractJson(raw); }
  catch {
    raw = await askClaude(system, `${user}\n\nYour previous response was invalid JSON. Return ONLY one valid JSON object matching the required envelope.`);
    parsed = extractJson(raw);
  }

  const result = AIEnvelopeSchema.safeParse(parsed);
  if (!result.success) {
    console.error("Invalid Claude UI response:", result.error.issues, raw);
    throw new Error("Claude generated an invalid UI specification.");
  }
  return { envelope: result.data, raw, mode: "claude" };
}
