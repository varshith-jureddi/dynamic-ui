import { Container } from "@/components/ui";
import { Block } from "@/lib/layouts/content";
import type { LayoutProps } from "@/lib/layouts/types";

export function Timeline({ document }: LayoutProps) {
  return (
    <Container width="medium" className="layout layout-timeline">
      {document.blocks.map((block, index) => (
        <div className="timeline-item" key={block.id}>
          <span className="timeline-marker" aria-hidden="true" />
          <div className="timeline-content"><span className="timeline-index">{String(index + 1).padStart(2, "0")}</span><Block block={block} /></div>
        </div>
      ))}
    </Container>
  );
}
