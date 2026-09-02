import type { ReactNode } from "react";

export default function Card({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg">
      {title && <h3 className="mb-4 font-bold text-slate-900">{title}</h3>}
      <div className="space-y-4">{children}</div>
    </div>
  );
}
