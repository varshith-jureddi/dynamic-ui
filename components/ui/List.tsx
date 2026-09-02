export default function List({ items }: { items: string[] }) {
  return <ul className="list-disc space-y-2 pl-5 text-slate-700">{items.map((item, i) => <li key={i}>{item}</li>)}</ul>;
}