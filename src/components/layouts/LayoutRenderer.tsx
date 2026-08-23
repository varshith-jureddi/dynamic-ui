import type { ContentDocument } from "@/lib/content/types";
import { getLayout } from "@/lib/layouts/registry";
import type { LayoutType } from "@/lib/layouts/types";

export function LayoutRenderer({ document, layout }: { document: ContentDocument; layout: LayoutType }) {
  const Layout = getLayout(layout);
  return <Layout document={document} />;
}
