import { Container } from "@/components/ui";
import { Block } from "@/lib/layouts/content";
import type { LayoutProps } from "@/lib/layouts/types";

export function Split({ document }: LayoutProps) {
  const midpoint = Math.ceil(document.blocks.length / 2);
  return (
    <Container width="wide" className="layout layout-split">
      <div className="layout-split-main">{document.blocks.slice(0, midpoint).map((block) => <Block block={block} key={block.id} />)}</div>
      <aside className="layout-split-support">{document.blocks.slice(midpoint).map((block) => <Block block={block} key={block.id} />)}</aside>
    </Container>
  );
}
