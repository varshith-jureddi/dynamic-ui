import type { ReactNode } from "react";
export default function Page({ title, description, layout, children }: { title?: string; description?: string; layout?: string; children: ReactNode }) {
  const layoutClass = layout === "dashboard" ? "space-y-6" : layout === "twoColumn" ? "grid gap-5 lg:grid-cols-2" : layout === "threeColumn" ? "grid gap-5 lg:grid-cols-3" : layout === "wideChart" ? "space-y-5" : layout === "grid" ? "grid gap-5 md:grid-cols-2" : "space-y-6";
  return <div className="min-h-screen bg-[#f7f8fb] text-slate-950"><div className="mx-auto max-w-[1540px] px-4 py-5 sm:px-6 lg:px-8 lg:py-7">
    <header className="mb-6 flex flex-wrap items-end justify-between gap-4"><div>{title && <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h1>}{description && <p className="mt-1.5 max-w-3xl text-sm text-slate-500">{description}</p>}</div><span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 shadow-sm"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />AI generated</span></header>
    <main className={layoutClass}>{children}</main>
  </div></div>;
}
