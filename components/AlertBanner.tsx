"use client";
import { useEffect, useState } from "react";
import type { Deadline } from "@/data/opportunities";

const DAY = 86_400_000;

export default function AlertBanner({ deadlines, horizonDays = 120 }: { deadlines: Deadline[]; horizonDays?: number }) {
  const [seen, setSeen] = useState<Record<string, boolean>>({});
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    try { setSeen(JSON.parse(localStorage.getItem("alerts-seen") || "{}")); } catch {}
  }, []);
  if (now === null) return null;
  const items = deadlines
    .map((d) => ({ ...d, days: Math.ceil((Date.parse(d.date + "T23:59:00") - now) / DAY) }))
    .filter((d) => d.days >= 0 && d.days <= horizonDays)
    .sort((a, b) => a.days - b.days);
  if (!items.length) return <p className="muted small">No deadlines in the next {horizonDays} days.</p>;
  const markSeen = (id: string) => {
    const next = { ...seen, [id]: true };
    setSeen(next);
    try { localStorage.setItem("alerts-seen", JSON.stringify(next)); } catch {}
  };
  return (
    <div className="alerts">
      {items.map((d) => {
        const soon = d.days <= 14;
        return (
          <div key={d.id} className={`alert ${soon ? "soon" : ""} ${soon && d.days <= 7 && !seen[d.id] ? "pulse" : ""}`}>
            <span className="days" style={{ color: soon ? "var(--accent)" : undefined }}>{d.days === 0 ? "Today" : `${d.days} days`}</span>
            <span style={{ flex: 1 }}>
              <strong>{d.title}</strong>
              <span className="muted small"> · {d.kind} · {d.expected ? "expected " : "due "}{d.date}</span>
              {d.note ? <div className="muted small">{d.note}</div> : null}
            </span>
            {d.link ? <a className="btn" href={d.link} target="_blank" rel="noreferrer">Open</a> : null}
            {soon && !seen[d.id] ? <button onClick={() => markSeen(d.id)}>Seen</button> : null}
          </div>
        );
      })}
    </div>
  );
}
