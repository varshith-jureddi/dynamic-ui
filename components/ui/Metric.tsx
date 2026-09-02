export default function Metric({ title, value, description, trend, trendDirection = "neutral", comparison, icon }: {
  title: string; value: string | number; description?: string; trend?: string;
  trendDirection?: "up" | "down" | "neutral"; comparison?: string; icon?: string;
}) {
  const trendClass = trendDirection === "up" ? "text-emerald-600" : trendDirection === "down" ? "text-rose-600" : "text-slate-500";
  const arrow = trendDirection === "up" ? "↑" : trendDirection === "down" ? "↓" : "→";
  return (
    <div className="group rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm font-medium text-slate-500">{title}</p>
        {icon && <span className="text-base text-slate-400" aria-hidden="true">{icon}</span>}
      </div>
      <p className="mt-2 text-[clamp(1.65rem,3vw,2.15rem)] font-semibold tracking-tight text-slate-950">{String(value)}</p>
      {(trend || comparison || description) && (
        <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs">
          {trend && <span className={`font-semibold ${trendClass}`}>{arrow} {trend}</span>}
          {comparison && <span className="text-slate-400">{comparison}</span>}
          {description && <span className="text-slate-500">{description}</span>}
        </div>
      )}
    </div>
  );
}
