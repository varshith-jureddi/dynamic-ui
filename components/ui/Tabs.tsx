"use client";

import { useState, type ReactNode } from "react";

export default function Tabs({
  tabs,
  render
}: {
  tabs: { label: string; children: ReactNode }[];
  render: (children: ReactNode) => ReactNode;
}) {
  const [active, setActive] = useState(0);

  if (tabs.length === 0) return null;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3">
        {tabs.map((tab, index) => (
          <button
            key={`${tab.label}-${index}`}
            type="button"
            onClick={() => setActive(index)}
            className={
              active === index
                ? "rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white"
                : "rounded-lg bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200"
            }
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="pt-4">{render(tabs[active]?.children ?? null)}</div>
    </div>
  );
}
