import type { ReactNode } from "react";

export function Callout({
  children,
  label = "Important",
  tone = "accent",
}: {
  children: ReactNode;
  label?: string;
  tone?: "accent" | "info" | "success" | "attention";
}) {
  return (
    <aside className={`callout callout-${tone}`}>
      <p className="callout-label">{label}</p>
      <div className="callout-content">{children}</div>
    </aside>
  );
}
