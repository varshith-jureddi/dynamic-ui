import { Card, Callout, Grid, Hero, List, Quote, Section, Table } from "@/components/ui";
import { Block, renderContentBlock } from "@/lib/layouts/content";
import { LayoutRenderer } from "@/components/layouts/LayoutRenderer";
import type { ContentBlock, ContentDocument } from "@/lib/content/types";
import type { LayoutNode, LayoutSpec } from "@/lib/ai/types";
import { designClasses, resolveDesignTokens } from "@/lib/design-system/adapter";

function subset(document: ContentDocument, ids?: string[]): ContentDocument {
  if (!ids) return document;
  const byId = new Map(document.blocks.map((block) => [block.id, block]));
  return { title: document.title, blocks: ids.map((id) => byId.get(id)!).filter(Boolean) };
}

function blocksFor(document: ContentDocument, ids?: string[]): ContentBlock[] {
  return subset(document, ids).blocks;
}

function renderComponent(node: LayoutNode, document: ContentDocument) {
  const blocks = blocksFor(document, node.contentIds);
  const children = node.children?.map((child, index) => (
    <AdaptiveNode key={`${child.type}-${index}`} node={child} document={document} />
  ));
  const props = node.props ?? {};

  switch (node.type) {
    case "hero":
      return <Hero eyebrow={typeof props.eyebrow === "string" ? props.eyebrow : "Document"} title={document.title || "Untitled document"} />;
    case "section":
      return children ? <Section>{children}</Section> : blocks.map((block) => <Block key={block.id} block={block} />);
    case "text":
      return blocks.map((block) => <Block key={block.id} block={block} />);
    case "card":
      return <div className="adaptive-node-card">{blocks.map((block) => <Block key={block.id} block={block} />)}</div>;
    case "grid":
      return <Grid columns={3}>{blocks.map((block) => <Card key={block.id}>{renderContentBlock(block)}</Card>)}</Grid>;
    case "list":
      return blocks.map((block) => <Block key={block.id} block={block} />);
    case "callout":
      return <Callout label={typeof props.label === "string" ? props.label : "Important"} tone={isCalloutTone(props.tone) ? props.tone : "accent"}>{blocks.map((block) => <Block key={block.id} block={block} />)}</Callout>;
    case "quote":
      return blocks.map((block) => <Quote key={block.id} source={typeof props.source === "string" ? props.source : undefined}>{String(block.content)}</Quote>);
    case "table":
      return blocks.map((block) => <Block key={block.id} block={block} />);
  }
}

function isCalloutTone(value: unknown): value is "accent" | "info" | "success" | "attention" {
  return value === "accent" || value === "info" || value === "success" || value === "attention";
}

export function AdaptiveNode({ node, document }: { node: LayoutNode; document: ContentDocument }) {
  if (node.layout) {
    return (
      <div className="adaptive-layout-node">
        <LayoutRenderer document={subset(document, node.contentIds)} layout={node.layout} />
        {node.children?.map((child, index) => <AdaptiveNode key={`${child.type}-${index}`} node={child} document={document} />)}
      </div>
    );
  }

  return <div className="adaptive-component-node">{renderComponent(node, document)}</div>;
}

export function AdaptiveRenderer({ document, spec }: { document: ContentDocument; spec: LayoutSpec }) {
  const designSpec = spec.designSpec;
  return (
    <div
      className={`adaptive-design ${designClasses(designSpec)}`}
      style={resolveDesignTokens(designSpec)}
      data-density={designSpec?.density}
      data-visual-style={designSpec?.visualStyle}
      data-emphasis={designSpec?.emphasis}
      data-content-width={designSpec?.maxContentWidth}
      data-section-spacing={designSpec?.sectionSpacing}
    >
      <AdaptiveNode node={spec.root} document={document} />
    </div>
  );
}
