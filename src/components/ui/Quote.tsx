import type { ReactNode } from "react";

export function Quote({ children, source }: { children: ReactNode; source?: string }) {
  return (
    <figure className="quote-focus">
      <blockquote>{children}</blockquote>
      {source ? <figcaption>— {source}</figcaption> : null}
    </figure>
  );
}
