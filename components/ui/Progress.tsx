export default function Progress({ title, value, max = 100, description }: { title: string; value: number; max?: number; description?: string }) {
  const safeMax = max > 0 ? max : 100;
  const percent = Math.max(0, Math.min(100, (value / safeMax) * 100));
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div><p className="font-semibold text-slate-900">{title}</p>{description && <p className="mt-1 text-xs text-slate-500">{description}</p>}</div>
        <span className="text-sm font-semibold text-slate-700">{value}/{max}</span>
      </div>
      <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-slate-100" role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={safeMax}>
        <div className="h-full rounded-full bg-slate-900 transition-all duration-500" style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}
