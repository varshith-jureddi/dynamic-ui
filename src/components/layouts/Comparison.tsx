import { Container, Card } from "@/components/ui";
import { Block } from "@/lib/layouts/content";
import type { LayoutProps } from "@/lib/layouts/types";

export function Comparison({ document }: LayoutProps) {
  const midpoint = Math.ceil(document.blocks.length / 2);
  return (
    <Container width="wide" className="layout layout-comparison">
      <Card className="comparison-column"><p className="comparison-label">Option A</p>{document.blocks.slice(0, midpoint).map((block) => <Block block={block} key={block.id} />)}</Card>
      <Card className="comparison-column"><p className="comparison-label">Option B</p>{document.blocks.slice(midpoint).map((block) => <Block block={block} key={block.id} />)}</Card>
    </Container>
  );
}
