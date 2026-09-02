"use client";
import { ResponsiveContainer, BarChart, Bar, LineChart, Line, AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from "recharts";

type Props = { chartType: "bar" | "line" | "area" | "pie" | "donut"; title?: string; data: Record<string, unknown>[] };
export default function Chart({ chartType, title, data }: Props) {
  const rows = data.map((item, index) => {
    const entries = Object.entries(item);
    const numeric = entries.find(([, v]) => typeof v === "number");
    const label = item.name ?? item.label ?? entries.find(([, v]) => typeof v === "string")?.[1] ?? index + 1;
    return { ...item, name: String(label), value: typeof numeric?.[1] === "number" ? numeric[1] : 0 };
  });
  const tooltip = <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", boxShadow: "0 10px 30px rgba(15,23,42,.08)" }} />;
  return <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
    {title && <div className="mb-4 flex items-center justify-between"><h3 className="font-semibold text-slate-900">{title}</h3><span className="text-xs text-slate-400">AI selected</span></div>}
    <div className="h-72">
      <ResponsiveContainer width="100%" height="100%">
        {chartType === "line" ? <LineChart data={rows}><CartesianGrid strokeDasharray="3 3" vertical={false} /><XAxis dataKey="name" tickLine={false} axisLine={false} /><YAxis tickLine={false} axisLine={false} /><>{tooltip}</><Line type="monotone" dataKey="value" strokeWidth={3} dot={false} /></LineChart>
        : chartType === "area" ? <AreaChart data={rows}><CartesianGrid strokeDasharray="3 3" vertical={false} /><XAxis dataKey="name" tickLine={false} axisLine={false} /><YAxis tickLine={false} axisLine={false} />{tooltip}<Area type="monotone" dataKey="value" strokeWidth={2.5} fillOpacity={0.18} /></AreaChart>
        : chartType === "pie" || chartType === "donut" ? <PieChart>{tooltip}<Legend verticalAlign="bottom" height={30} /><Pie data={rows} dataKey="value" nameKey="name" innerRadius={chartType === "donut" ? 62 : 0} outerRadius={92} paddingAngle={chartType === "donut" ? 3 : 0}>{rows.map((_, i) => <Cell key={i} />)}</Pie></PieChart>
        : <BarChart data={rows}><CartesianGrid strokeDasharray="3 3" vertical={false} /><XAxis dataKey="name" tickLine={false} axisLine={false} /><YAxis tickLine={false} axisLine={false} />{tooltip}<Bar dataKey="value" radius={[7,7,0,0]} /></BarChart>}
      </ResponsiveContainer>
    </div>
  </div>;
}
