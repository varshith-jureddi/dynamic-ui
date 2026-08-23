import { Container, Card } from "@/components/ui";
import { Block } from "@/lib/layouts/content";
import type { LayoutProps } from "@/lib/layouts/types";

export function FeatureGrid({ document }: LayoutProps) {
  return (
    <Container width="wide" className="layout layout-feature-grid">
      <div className="layout-feature-grid-items">
        {document.blocks.map((block) => <Card key={block.id} className="layout-card"><Block block={block} /></Card>)}
      </div>
    </Container>
  );
}
