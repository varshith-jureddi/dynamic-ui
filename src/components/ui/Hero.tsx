import type { ReactNode } from "react";

export function Hero({
  eyebrow = "Document",
  title,
  description,
  meta,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  meta?: ReactNode;
}) {
  return (
    <header className="hero">
      <div className="hero-main">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="hero-title">{title}</h1>
        {description ? <p className="hero-description">{description}</p> : null}
      </div>
      {meta ? <div className="hero-meta">{meta}</div> : null}
    </header>
  );
}
