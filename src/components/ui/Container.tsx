import type { ReactNode } from "react";
import type { ContentWidth } from "@/lib/design-system/types";

export function Container({
  children,
  width = "medium",
  className = "",
}: {
  children: ReactNode;
  width?: ContentWidth;
  className?: string;
}) {
  return <div className={`container container-${width} ${className}`.trim()}>{children}</div>;
}
