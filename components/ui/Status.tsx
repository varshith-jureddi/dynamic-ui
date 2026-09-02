const variants = {
  success: "bg-emerald-50 text-emerald-700 ring-emerald-600/15", warning: "bg-amber-50 text-amber-700 ring-amber-600/15",
  danger: "bg-rose-50 text-rose-700 ring-rose-600/15", info: "bg-sky-50 text-sky-700 ring-sky-600/15", neutral: "bg-slate-100 text-slate-700 ring-slate-500/15"
} as const;
export default function Status({ label, variant = "neutral" }: { label: string; variant?: keyof typeof variants }) {
  return <span className={`inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${variants[variant]}`}><span className="h-1.5 w-1.5 rounded-full bg-current" />{label}</span>;
}
