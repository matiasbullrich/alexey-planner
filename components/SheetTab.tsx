import Link from "next/link";
import { courseById } from "@/data/courses";

type TextBlock = { kind: "title" | "sub" | "year" | "term" | "head" | "para"; text: string };
type TableBlock = { kind: "table"; header?: string[]; rows: { cells: string[]; side?: string }[]; hasSide: boolean; sideHead?: string };
type Block = TextBlock | TableBlock;

const YEARS = /^(FRESHMAN|SOPHOMORE|JUNIOR|SENIOR|YEAR 5)/;
const HEADER_FIRST = new Set(["Course", "Requirement", "SCOFT Component", "Path", "Tab"]);

function parse(text: string): Block[] {
  const out: Block[] = [];
  let table: TableBlock | null = null;
  const close = () => { if (table) { out.push(table as TableBlock); table = null; } };
  text.split("\n").forEach((raw, i) => {
    const [mainRaw, side] = raw.split("»");
    const cells = mainRaw.split("|").map((c) => c.trim());
    const multi = cells.length > 1;
    if (!raw.trim()) { close(); return; }
    if (!multi && !side) {
      close();
      const t = cells[0];
      if (i === 0) out.push({ kind: "title", text: t });
      else if (i === 1) out.push({ kind: "sub", text: t });
      else if (YEARS.test(t)) out.push({ kind: "year", text: t });
      else if (t === "Fall" || t === "Spring") out.push({ kind: "term", text: t });
      else if (t === t.toUpperCase() && /[A-Z]{3}/.test(t) && t.length < 140) out.push({ kind: "head", text: t });
      else out.push({ kind: "para", text: t });
      return;
    }
    if (multi && HEADER_FIRST.has(cells[0])) {
      close();
      table = { kind: "table", header: cells, rows: [], hasSide: false };
      if (side) { table.hasSide = true; table.sideHead = side; }
      return;
    }
    if (!table) table = { kind: "table", rows: [], hasSide: false };
    if (side) table.hasSide = true;
    table.rows.push({ cells: multi ? cells : [cells[0]], side });
  });
  close();
  return out;
}

function Cell({ text }: { text: string }) {
  const m = text.match(/^(\d{3}:\d{3}H?)/);
  const color = /^✓/.test(text) ? "var(--taken)" : /^✗|^—$|^○$/.test(text) ? "var(--accent)" : undefined;
  if (m && courseById[m[1]]) {
    return <span><Link href={`/map?course=${encodeURIComponent(m[1])}`}>{m[1]}</Link>{text.slice(m[1].length)}</span>;
  }
  return <span style={color ? { color, fontWeight: 600 } : undefined}>{text}</span>;
}

export default function SheetTab({ text }: { text: string }) {
  const blocks = parse(text);
  return (
    <div>
      {blocks.map((b, i) => {
        if (b.kind === "title") return <h2 key={i} style={{ marginTop: 8 }}>{b.text}</h2>;
        if (b.kind === "sub") return <p key={i} className="lead">{b.text}</p>;
        if (b.kind === "year") return <h2 key={i} style={{ color: "var(--accent)", fontSize: 17, letterSpacing: "0.04em" }}>{b.text}</h2>;
        if (b.kind === "term") return <h3 key={i} style={{ margin: "14px 0 6px" }}>{b.text}</h3>;
        if (b.kind === "head") return <h3 key={i} style={{ marginTop: 24, fontSize: 13.5, letterSpacing: "0.04em", color: "var(--quiet)" }}>{b.text}</h3>;
        if (b.kind === "para") return <p key={i} className="small">{b.text}</p>;
        if (b.kind !== "table") return null;
        const cols = Math.max(b.header?.length ?? 0, ...b.rows.map((r) => r.cells.length));
        return (
          <table key={i} style={{ marginBottom: 6 }}>
            {b.header ? <thead><tr>{b.header.map((h, j) => <th key={j}>{h}</th>)}{b.hasSide ? <th style={{ background: "color-mix(in srgb, #7048e8 12%, var(--panel))" }}>{b.sideHead ?? ""}</th> : null}</tr></thead> : null}
            <tbody>
              {b.rows.map((r, j) => (
                <tr key={j} style={r.cells[0] === "Total" ? { fontWeight: 700 } : undefined}>
                  {r.cells.length === 1 && cols > 1 ? <td colSpan={cols}><Cell text={r.cells[0]} /></td> : r.cells.map((c, k) => <td key={k}><Cell text={c} /></td>)}
                  {r.cells.length > 1 && r.cells.length < cols ? Array.from({ length: cols - r.cells.length }, (_, k) => <td key={`p${k}`} />) : null}
                  {b.hasSide ? <td className="small" style={{ background: "color-mix(in srgb, #7048e8 7%, var(--panel))" }}>{r.side ?? ""}</td> : null}
                </tr>
              ))}
            </tbody>
          </table>
        );
      })}
    </div>
  );
}
