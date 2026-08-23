export type ContentDocument = {
  title?: string;
  blocks: ContentBlock[];
};

export type ContentBlock = {
  id: string;
  type: string;
  content: unknown;
  metadata?: Record<string, unknown>;
};
