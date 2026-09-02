export default function Heading({ text, level = 2 }: { text: string; level?: 1 | 2 | 3 }) {
  const classes = level === 1 ? "text-3xl font-bold" : level === 2 ? "text-2xl font-bold" : "text-xl font-semibold";
  const Tag = `h${level}` as "h1" | "h2" | "h3";
  return <Tag className={classes}>{text}</Tag>;
}