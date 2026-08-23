import type { ReactNode, ElementType } from "react";
import { Callout, List, Quote, Table } from "@/components/ui";
import type { ContentBlock, ContentDocument } from "@/lib/content/types";

function stringifyContent(value: unknown) {
  return typeof value === "string" ? value : JSON.stringify(value, null, 2);
}

function isTableRows(value: unknown): value is Record<string, unknown>[] {
  return Array.isArray(value) && value.length > 0 && value.every(
    (item) => typeof item === "object" && item !== null && !Array.isArray(item),
  );
}

export function renderContentBlock(block: ContentBlock): ReactNode {
  const content = block.content;

  if (block.type.startsWith("heading-")) {
    const rawLevel = Number(block.type.split("-")[1]);
    const level = Math.min(Math.max(Number.isFinite(rawLevel) ? rawLevel : 2, 2), 6);
    const Heading = `h${level}` as ElementType;
    return <Heading className="content-heading" data-level={level}>{String(content)}</Heading>;
  }

  if (block.type === "list" || block.type === "ordered-list") {
    const items = Array.isArray(content) ? content : [content];
    return <List ordered={block.type === "ordered-list"} items={items.map(stringifyContent)} />;
  }

  if (block.type === "quote") {
    return <Quote source={typeof block.metadata?.source === "string" ? block.metadata.source : undefined}>{String(content)}</Quote>;
  }

  if (block.type === "callout" || block.type === "highlight") {
    return <Callout>{stringifyContent(content)}</Callout>;
  }

  if (block.type === "table" && isTableRows(content)) {
    return <Table rows={content} />;
  }

  if (block.type === "code") {
    return <pre className="content-code"><code>{String(content)}</code></pre>;
  }

  return <p className="content-paragraph">{stringifyContent(content)}</p>;
}

export function Block({ block, className = "" }: { block: ContentBlock; className?: string }) {
  return <div className={`layout-block ${className}`.trim()}>{renderContentBlock(block)}</div>;
}

export function Blocks({ document }: { document: ContentDocument }) {
  return <>{document.blocks.map((block) => <Block block={block} key={block.id} />)}</>;
}

export function nonHeadingBlocks(document: ContentDocument) {
  return document.blocks.filter((block) => !block.type.startsWith("heading-"));
}

export function headingBlocks(document: ContentDocument) {
  return document.blocks.filter((block) => block.type.startsWith("heading-"));
}
