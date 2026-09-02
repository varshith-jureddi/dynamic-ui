import { z } from "zod";
const Scalar = z.union([z.string(), z.number()]);
const UIComponentSchema: z.ZodType<any> = z.lazy(() => z.discriminatedUnion("type", [
  z.object({ type:z.literal("heading"), text:z.string().min(1), level:z.union([z.literal(1),z.literal(2),z.literal(3)]).optional() }).strict(),
  z.object({ type:z.literal("text"), text:z.string() }).strict(),
  z.object({ type:z.literal("metric"), title:z.string().min(1), value:Scalar, description:z.string().optional(), trend:z.string().optional(), trendDirection:z.enum(["up","down","neutral"]).optional(), comparison:z.string().optional(), icon:z.string().optional() }).strict(),
  z.object({ type:z.literal("list"), items:z.array(z.string()) }).strict(),
  z.object({ type:z.literal("table"), title:z.string().optional(), columns:z.array(z.string()).min(1), rows:z.array(z.array(Scalar)) }).strict(),
  z.object({ type:z.literal("chart"), chartType:z.enum(["bar","line","area","pie","donut"]), title:z.string().optional(), data:z.array(z.record(z.string(),z.unknown())) }).strict(),
  z.object({ type:z.literal("timeline"), items:z.array(z.object({title:z.string().min(1),description:z.string().optional(),date:z.string().optional()}).strict()) }).strict(),
  z.object({ type:z.literal("progress"), title:z.string().min(1), value:z.number().finite(), max:z.number().positive().optional(), description:z.string().optional() }).strict(),
  z.object({ type:z.literal("status"), label:z.string().min(1), variant:z.enum(["success","warning","danger","info","neutral"]).optional() }).strict(),
  z.object({ type:z.literal("activityFeed"), title:z.string().optional(), items:z.array(z.object({title:z.string().min(1),description:z.string().optional(),timestamp:z.string().optional()}).strict()) }).strict(),
  z.object({ type:z.literal("insight"), variant:z.enum(["warning","success","info","neutral"]).optional(), title:z.string().min(1), description:z.string().min(1) }).strict(),
  z.object({ type:z.literal("card"), title:z.string().optional(), children:z.array(UIComponentSchema) }).strict(),
  z.object({ type:z.literal("section"), title:z.string().optional(), layout:z.enum(["stack","twoColumn","threeColumn"]).optional(), children:z.array(UIComponentSchema) }).strict(),
  z.object({ type:z.literal("statGrid"), children:z.array(UIComponentSchema) }).strict(),
  z.object({ type:z.literal("tabs"), tabs:z.array(z.object({label:z.string().min(1),children:z.array(UIComponentSchema)}).strict()) }).strict()
]));
export const UISpecSchema = z.object({ type:z.literal("page"), title:z.string().optional(), description:z.string().optional(), layout:z.enum(["default","dashboard","twoColumn","threeColumn","wideChart","article","grid"]).optional(), children:z.array(UIComponentSchema) }).strict();
export const AIEnvelopeSchema = z.object({ title:z.string().optional(), selectedSkills:z.array(z.string()).default([]), reasoning:z.string().default(""), ui:UISpecSchema }).strict();
export type UISpec=z.infer<typeof UISpecSchema>; export type AIEnvelope=z.infer<typeof AIEnvelopeSchema>; export type UIComponent=z.infer<typeof UIComponentSchema>;
