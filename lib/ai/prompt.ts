import type { Skill } from "@/lib/skills/loader"; import { formatSkills } from "@/lib/skills/selector";
export const COMPONENT_DEFINITIONS=`page: {type:"page",title?,description?,layout:"default"|"dashboard"|"twoColumn"|"threeColumn"|"wideChart"|"article"|"grid",children:UIComponent[]}
heading: {type:"heading",text,level?}
text: {type:"text",text}
metric: {type:"metric",title,value:string|number,description?,trend?,trendDirection:"up"|"down"|"neutral",comparison?,icon?}
statGrid: {type:"statGrid",children:UIComponent[]}
progress: {type:"progress",title,value:number,max?,description?}
status: {type:"status",label,variant:"success"|"warning"|"danger"|"info"|"neutral"}
card: {type:"card",title?,children:UIComponent[]}
section: {type:"section",title?,layout:"stack"|"twoColumn"|"threeColumn",children:UIComponent[]}
chart: {type:"chart",chartType:"line"|"bar"|"area"|"pie"|"donut",title?,data:Record<string,unknown>[]}
table: {type:"table",title?,columns:string[],rows:(string|number)[][]}
activityFeed: {type:"activityFeed",title?,items:{title,description?,timestamp?}[]}
insight: {type:"insight",variant:"warning"|"success"|"info"|"neutral",title,description}
timeline: {type:"timeline",items:{title,description?,date?}[]}
list: {type:"list",items:string[]}
tabs: {type:"tabs",tabs:{label,children:UIComponent[]}[]}`;
export function buildSystemPrompt(skills:Skill[]){return `You are an expert analytics dashboard designer and UI architect.

Analyze the supplied content and create the most useful dashboard/interface using ONLY the controlled components below. The frontend renders your specification; you never write frontend code.

RULES:
1. Preserve source facts and values exactly; never invent data.
2. Select only components that materially help explain the content.
3. For dashboard-like data, prefer: KPI summary -> important trends -> detailed data -> status/activity -> evidence-based insights.
4. Use StatGrid for 3-4 headline metrics.
5. Use line/area for time series; bar for category comparison; pie/donut only for small categorical distributions.
6. Use Progress for completion/target values and Status for operational states.
7. Use tables for repeated records.
8. Use Insight only when the statement can be directly supported or calculated from supplied data.
9. Do not repeat the same information unnecessarily.
10. Never output JavaScript, React, HTML, CSS, or executable code.
11. selectedSkills must contain only available skill names and every materially used skill.
12. Return JSON only.

COMPONENTS:
${COMPONENT_DEFINITIONS}

AVAILABLE SKILLS:
${formatSkills(skills)}

Return exactly: {"title":"...","selectedSkills":["..."],"reasoning":"short explanation","ui":{"type":"page","title":"...","description":"...","layout":"...","children":[]}}`; }
export function buildUserPrompt(content:string,format:string){return `INPUT FORMAT: ${format}

INPUT CONTENT:
<content>
${content}
</content>

Design the best interface for this content. Return only the JSON envelope.`;}
