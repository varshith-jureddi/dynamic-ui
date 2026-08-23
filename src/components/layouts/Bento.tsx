import { Container, Card } from "@/components/ui";
import { Block } from "@/lib/layouts/content";
import type { LayoutProps } from "@/lib/layouts/types";

export function Bento({ document }: LayoutProps) {
  return (
    <Container width="wide" className="layout layout-bento">
      {document.blocks.map((block, index) => (
        <Card key={block.id} className={`layout-bento-item layout-bento-item-${index % 5}`}><Block block={block} /></Card>
      ))}
    </Container>
  );
}
