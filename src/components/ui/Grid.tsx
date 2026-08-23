import type { ReactNode } from "react";

export function Grid({
  children,
  columns = 3,
  className = "",
}: {
  children: ReactNode;
  columns?: 2 | 3 | 4;
  className?: string;
}) {
  return <div className={`grid grid-${columns} ${className}`.trim()}>{children}</div>;
}
