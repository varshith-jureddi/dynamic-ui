import Status from "./Status";
export default function Table({ title, columns, rows }: { title?: string; columns: string[]; rows: (string | number)[][] }) {
  return <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
    {title && <div className="border-b border-slate-100 px-5 py-4"><h3 className="font-semibold text-slate-900">{title}</h3></div>}
    <div className="overflow-x-auto"><table className="min-w-full text-sm"><thead className="bg-slate-50/80"><tr>{columns.map(c => <th key={c} className="whitespace-nowrap px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">{c}</th>)}</tr></thead>
    <tbody>{rows.map((row,i)=><tr key={i} className="border-t border-slate-100 hover:bg-slate-50/70">{columns.map((_,j)=>{const v=String(row[j] ?? ""); const low=v.toLowerCase(); const variant=low.includes("risk")||low.includes("late")||low.includes("failed")?"danger":low.includes("pending")||low.includes("warning")?"warning":low.includes("active")||low.includes("on track")||low.includes("complete")||low.includes("success")?"success":null; return <td key={j} className="whitespace-nowrap px-5 py-3.5 text-slate-700">{variant?<Status label={v} variant={variant}/>:v}</td>})}</tr>)}</tbody></table></div>
  </div>;
}
