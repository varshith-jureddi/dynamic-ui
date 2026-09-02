import type { ReactNode } from "react";
export default function Section({ title, layout = "stack", children }: { title?: string; layout?: "stack" | "twoColumn" | "threeColumn"; children: ReactNode }) {
  const grid = layout === "twoColumn" ? "grid gap-5 lg:grid-cols-2" : layout === "threeColumn" ? "grid gap-5 lg:grid-cols-3" : "space-y-4";
  return <section className="space-y-4">{title && <div className="flex items-center justify-between"><h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">{title}</h2></div>}<div className={grid}>{children}</div></section>;
}
