import { Container, Quote } from "@/components/ui";
import { Block } from "@/lib/layouts/content";
import type { LayoutProps } from "@/lib/layouts/types";

export function QuoteFocus({ document }: LayoutProps) {
  const quotes = document.blocks.filter((block) => block.type === "quote");
  const others = document.blocks.filter((block) => block.type !== "quote");
  return <Container width="narrow" className="layout layout-quote-focus">{quotes.map((block) => <Quote key={block.id} source={typeof block.metadata?.source === "string" ? block.metadata.source : undefined}>{String(block.content)}</Quote>)}{others.map((block) => <Block block={block} key={block.id} />)}</Container>;
}
