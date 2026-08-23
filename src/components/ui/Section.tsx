import type { ReactNode } from "react";

export function Section({
  children,
  title,
  label,
  className = "",
}: {
  children: ReactNode;
  title?: ReactNode;
  label?: ReactNode;
  className?: string;
}) {
  return (
    <section className={`ui-section ${className}`.trim()}>
      {label ? <p className="section-label">{label}</p> : null}
      {title ? <h2 className="section-title">{title}</h2> : null}
      {children}
    </section>
  );
}
