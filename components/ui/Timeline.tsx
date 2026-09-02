export default function Timeline({ items }: {
  items: { title: string; description?: string; date?: string }[];
}) {
  return (
    <div className="space-y-5">
      {items.map((item, i) => (
        <div key={i} className="relative border-l-2 border-slate-200 pl-5">
          <div className="absolute -left-[7px] top-1 h-3 w-3 rounded-full bg-slate-900" />
          {item.date && <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{item.date}</p>}
          <h3 className="font-semibold">{item.title}</h3>
          {item.description && <p className="mt-1 text-sm leading-6 text-slate-600">{item.description}</p>}
        </div>
      ))}
    </div>
  );
}