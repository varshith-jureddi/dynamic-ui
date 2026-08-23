import { Container, Callout } from "@/components/ui";
import { Block } from "@/lib/layouts/content";
import type { LayoutProps } from "@/lib/layouts/types";

export function Highlight({ document }: LayoutProps) {
  const first = document.blocks[0];
  const rest = document.blocks.slice(1);
  return (
    <Container width="medium" className="layout layout-highlight">
      {first ? <Callout label="Important">{first.type.startsWith("heading-") ? String(first.content) : <span>{String(first.content)}</span>}</Callout> : null}
      {rest.map((block) => <div key={block.id} className="layout-block"><Block block={block} /></div>)}
    </Container>
  );
}
