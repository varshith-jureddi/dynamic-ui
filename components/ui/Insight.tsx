const variants = { warning: "border-amber-200 bg-amber-50", success: "border-emerald-200 bg-emerald-50", info: "border-sky-200 bg-sky-50", neutral: "border-slate-200 bg-slate-50" } as const;
export default function Insight({ variant = "info", title, description }: { variant?: keyof typeof variants; title: string; description: string }) {
  return <div className={`rounded-2xl border p-5 ${variants[variant]}`}><div className="flex gap-3"><span className="mt-0.5 text-sm font-bold" aria-hidden="true">✦</span><div><p className="font-semibold text-slate-900">{title}</p><p className="mt-1 text-sm leading-6 text-slate-600">{description}</p></div></div></div>;
}
