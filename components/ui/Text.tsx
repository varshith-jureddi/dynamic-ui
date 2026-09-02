export default function Text({ text }: { text: string }) {
  return <p className="leading-7 text-slate-700 whitespace-pre-wrap">{text}</p>;
}