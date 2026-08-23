import { Container } from "@/components/ui";
import { Block } from "@/lib/layouts/content";
import type { LayoutProps } from "@/lib/layouts/types";

export function Magazine({ document }: LayoutProps) {
  return (
    <Container width="wide" className="layout layout-magazine">
      {document.blocks.map((block, index) => <div className={`magazine-item magazine-item-${index % 4}`} key={block.id}><Block block={block} /></div>)}
    </Container>
  );
}
