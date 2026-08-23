import type { ReactNode } from "react";

type TableRow = Record<string, unknown> | unknown[];

function isArrayRow(row: TableRow): row is unknown[] {
  return Array.isArray(row);
}

function cellValue(value: unknown): ReactNode {
  if (value === null || value === undefined) return "";
  if (typeof value === "string" || typeof value === "number") return String(value);
  return JSON.stringify(value);
}

export function Table({ rows }: { rows: TableRow[] }) {
  if (!rows.length) return null;

  const first = rows[0];
  if (isArrayRow(first)) {
    return (
      <div className="table-scroll">
        <table className="ui-table">
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {isArrayRow(row) ? row.map((value, cellIndex) => <td key={cellIndex}>{cellValue(value)}</td>) : null}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  const keys = Object.keys(first);
  return (
    <div className="table-scroll">
      <table className="ui-table">
        <thead>
          <tr>{keys.map((key) => <th scope="col" key={key}>{key}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {keys.map((key) => <td key={key}>{cellValue((row as Record<string, unknown>)[key])}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
