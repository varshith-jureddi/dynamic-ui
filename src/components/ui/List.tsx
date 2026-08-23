import type { ReactNode } from "react";

export function List({
  items,
  ordered = false,
}: {
  items: ReactNode[];
  ordered?: boolean;
}) {
  const Tag = ordered ? "ol" : "ul";
  return (
    <Tag className={`ui-list ${ordered ? "ui-list-ordered" : "ui-list-unordered"}`}>
      {items.map((item, index) => <li key={index}>{item}</li>)}
    </Tag>
  );
}
