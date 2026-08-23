import type { ContentBlock, ContentDocument } from "./types";

type JsonRecord = Record<string, unknown>;

function asRecord(value: unknown): JsonRecord | null {
  return typeof value === "object" && value !== null && !Array.isArray(value)
    ? (value as JsonRecord)
    : null;
}

function createBlock(id: string, type: string, content: unknown, metadata?: Record<string, unknown>): ContentBlock {
  return metadata ? { id, type, content, metadata } : { id, type, content };
}

export function normalizeJson(input: unknown): ContentDocument {
  const record = asRecord(input);

  if (record && Array.isArray(record.blocks)) {
    return {
      title: typeof record.title === "string" ? record.title : undefined,
      blocks: record.blocks.map((block, index) => {
        const item = asRecord(block);
        if (!item) return createBlock(`block-${index + 1}`, "text", block);

        const id = typeof item.id === "string" ? item.id : `block-${index + 1}`;
        const type = typeof item.type === "string" ? item.type : "text";
        const metadata = asRecord(item.metadata) ?? undefined;
        const content = "content" in item ? item.content : item;

        return createBlock(id, type, content, metadata ?? undefined);
      }),
    };
  }

  if (Array.isArray(input)) {
    return {
      blocks: input.map((value, index) => createBlock(`block-${index + 1}`, "text", value)),
    };
  }

  return {
    title: record && typeof record.title === "string" ? record.title : undefined,
    blocks: [createBlock("block-1", "text", input)],
  };
}

export function normalizeMarkdown(markdown: string, sourceName = "content.md"): ContentDocument {
  const lines = markdown.replace(/\r\n?/g, "\n").split("\n");
  const blocks: ContentBlock[] = [];
  let paragraph: string[] = [];
  let listItems: string[] = [];
  let listOrdered = false;
  let quoteLines: string[] = [];
  let codeLines: string[] = [];
  let inCode = false;
  let codeLanguage: string | undefined;
  let title: string | undefined;

  const flushParagraph = () => {
    if (paragraph.length) {
      blocks.push(createBlock(`block-${blocks.length + 1}`, "text", paragraph.join(" ").trim()));
      paragraph = [];
    }
  };

  const flushList = () => {
    if (listItems.length) {
      blocks.push(
        createBlock(`block-${blocks.length + 1}`, listOrdered ? "ordered-list" : "list", listItems),
      );
      listItems = [];
      listOrdered = false;
    }
  };

  const flushQuote = () => {
    if (quoteLines.length) {
      blocks.push(createBlock(`block-${blocks.length + 1}`, "quote", quoteLines.join(" ").trim()));
      quoteLines = [];
    }
  };

  const flushCode = () => {
    if (codeLines.length) {
      blocks.push(
        createBlock(`block-${blocks.length + 1}`, "code", codeLines.join("\n"), {
          language: codeLanguage,
        }),
      );
      codeLines = [];
    }
    codeLanguage = undefined;
  };

  const flushOpenBlocks = () => {
    flushParagraph();
    flushList();
    flushQuote();
  };

  for (const line of lines) {
    if (line.startsWith("```")) {
      flushOpenBlocks();
      if (!inCode) {
        inCode = true;
        codeLanguage = line.slice(3).trim() || undefined;
      } else {
        inCode = false;
        flushCode();
      }
      continue;
    }

    if (inCode) {
      codeLines.push(line);
      continue;
    }

    if (!line.trim()) {
      flushOpenBlocks();
      continue;
    }

    const heading = /^(#{1,6})\s+(.+)$/.exec(line);
    if (heading) {
      flushOpenBlocks();
      const level = heading[1].length;
      const content = heading[2].trim();
      if (!title && level === 1) title = content;
      blocks.push(createBlock(`block-${blocks.length + 1}`, `heading-${level}`, content));
      continue;
    }

    const unordered = /^[-*+]\s+(.+)$/.exec(line);
    const ordered = /^\d+[.)]\s+(.+)$/.exec(line);
    if (unordered || ordered) {
      flushParagraph();
      flushQuote();
      const isOrdered = Boolean(ordered);
      if (listItems.length && listOrdered !== isOrdered) flushList();
      listOrdered = isOrdered;
      listItems.push((ordered ?? unordered)![1].trim());
      continue;
    }

    if (line.startsWith(">")) {
      flushParagraph();
      flushList();
      quoteLines.push(line.replace(/^>\s?/, "").trim());
      continue;
    }

    paragraph.push(line.trim());
  }

  if (inCode) flushCode();
  flushOpenBlocks();

  return {
    title,
    blocks: blocks.length
      ? blocks
      : [createBlock("block-1", "text", "")],
  };
}

export function normalizeContent(input: unknown, sourceName: string): ContentDocument {
  const extension = sourceName.toLowerCase().split(".").pop();
  if (extension === "json") return normalizeJson(input);
  if (extension === "md" || extension === "markdown") return normalizeMarkdown(String(input), sourceName);
  throw new Error(`Unsupported content format: ${extension ?? "unknown"}`);
}
