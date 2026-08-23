import { Container } from "@/components/ui";
import { Blocks } from "@/lib/layouts/content";
import type { LayoutProps } from "@/lib/layouts/types";

export function Minimal({ document }: LayoutProps) {
  return <Container width="medium" className="layout layout-minimal"><Blocks document={document} /></Container>;
}
