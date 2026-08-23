import { Container } from "@/components/ui";
import { Block } from "@/lib/layouts/content";
import type { LayoutProps } from "@/lib/layouts/types";

export function Story({ document }: LayoutProps) {
  return (
    <Container width="narrow" className="layout layout-story">
      {document.blocks.map((block, index) => <div className="story-step" key={block.id}><span className="story-number">{String(index + 1).padStart(2, "0")}</span><Block block={block} /></div>)}
    </Container>
  );
}
