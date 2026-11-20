import Link from "next/link";
import { minimumCS } from "@/data/explore";

export default function MinimumCS() {
  return (
    <div className="card" style={{ borderLeft: "5px solid #1c7ed6", background: "color-mix(in srgb, #1c7ed6 6%, var(--panel))" }}>
      <h2 style={{ marginTop: 0 }}>⭐ {minimumCS.title}</h2>
      <ol style={{ margin: "0 0 8px 18px", padding: 0 }}>
        {minimumCS.courses.map((c) => (
          <li key={c.id} style={{ marginBottom: 6 }}>
            <Link href={`/map?course=${encodeURIComponent(c.id)}`}><strong>{c.id}</strong></Link> {c.title} — <em>{c.when}</em>. <span className="small">{c.why}</span>
          </li>
        ))}
      </ol>
      <p className="small" style={{ margin: "4px 0" }}><strong>If he wants more (AI lean):</strong> {minimumCS.optional.map((o, i) => <span key={o.id}>{i ? " · " : ""}{o.id} {o.title} ({o.why})</span>)}</p>
      <p className="mono-note small" style={{ marginBottom: 0 }}>{minimumCS.caveat}</p>
    </div>
  );
}
