import { Container } from "@/components/ui";
import { Blocks } from "@/lib/layouts/content";
import type { LayoutProps } from "@/lib/layouts/types";

export function SingleColumn({ document }: LayoutProps) {
  return <Container width="narrow" className="layout layout-single-column"><Blocks document={document} /></Container>;
}
