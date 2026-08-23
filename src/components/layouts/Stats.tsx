import { Container, Card } from "@/components/ui";
import { Block } from "@/lib/layouts/content";
import type { LayoutProps } from "@/lib/layouts/types";

function metricParts(blockContent: unknown) {
  if (typeof blockContent !== "string") return { value: String(blockContent), label: "" };
  const match = blockContent.match(/^([^\n]+)(?:\n+)([\s\S]+)$/);
  return match ? { value: match[1], label: match[2] } : { value: blockContent, label: "" };
}

export function Stats({ document }: LayoutProps) {
  return (
    <Container width="wide" className="layout layout-stats">
      {document.blocks.map((block) => {
        const parts = metricParts(block.content);
        return <Card key={block.id} className="stat-card"><div className="stat-value">{parts.value}</div>{parts.label ? <div className="stat-label">{parts.label}</div> : <Block block={block} />}</Card>;
      })}
    </Container>
  );
}
