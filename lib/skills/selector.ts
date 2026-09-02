import type { Skill } from "./loader";

export function formatSkills(skills: Skill[]): string {
  return skills
    .map((skill) => `--- ${skill.name} ---\n${skill.content}`)
    .join("\n\n");
}

/**
 * This is intentionally not an AI router. Phase 3 keeps discovery simple:
 * all skills are supplied to Claude, while this helper exposes the discovered
 * names for validation and UI inspection.
 */
export function getSkillNames(skills: Skill[]): string[] {
  return skills.map((skill) => skill.name);
}

export function validateSelectedSkills(selected: string[], skills: Skill[]): string[] {
  const available = new Set(getSkillNames(skills));
  return [...new Set(selected)].filter((name) => available.has(name));
}
