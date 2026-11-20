"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { courseById } from "@/data/courses";
import { fall2026, spring2027, targets, seedRecord, PlanItem } from "@/data/myplan";
import { evaluate, courseState, Record_ } from "@/lib/prereq";

const STATUS: Record<PlanItem["status"], { label: string; color: string }> = {
  guaranteed: { label: "Registered", color: "var(--taken)" },
  pending: { label: "Waiting on a form / SPN", color: "var(--perm)" },
  option: { label: "Option", color: "var(--quiet)" },
};

function Term({ title, items }: { title: string; items: PlanItem[] }) {
  return (
    <div className="card">
      <strong>{title}</strong>
      {items.map((i) => (
        <div key={i.id} className="small" style={{ borderTop: "1px solid var(--rule)", padding: "6px 0" }}>
          <span style={{ color: STATUS[i.status].color, fontWeight: 600 }}>{STATUS[i.status].label}</span>{" · "}
          {i.id.includes(":") ? <Link href={`/map?course=${encodeURIComponent(i.id)}`}>{i.id} {courseById[i.id]?.title}</Link> : i.label}
          {i.note ? <div className="muted">{i.note}</div> : null}
        </div>
      ))}
    </div>
  );
}

export default function Roadmap() {
  const [rec, setRec] = useState<Record_>({});
  useEffect(() => {
    // For "next year" questions, count spring's registered courses as in progress too.
    const r: Record_ = { ...seedRecord() };
    spring2027.filter((i) => i.status === "guaranteed" && i.id.includes(":")).forEach((i) => (r[i.id] = "inprogress"));
    setRec(r);
  }, []);
  return (
    <>
      <h2>On the road to next year</h2>
      <div className="grid">
        {targets.map((t) => {
          const c = courseById[t.id];
          if (!c) return null;
          const ev = evaluate(c.prereq, rec);
          const st = courseState(c, rec);
          const ok = st === "eligible" || st === "permission";
          return (
            <div key={t.id} className="card" style={{ borderColor: ok ? "var(--taken)" : "var(--accent)" }}>
              <div className="small muted">{t.when}</div>
              <strong><Link href={`/map?course=${encodeURIComponent(t.id)}`}>{t.id} {c.title}</Link></strong>
              <div className="small" style={{ color: ok ? "var(--taken)" : "var(--accent)", fontWeight: 600, margin: "4px 0" }}>
                {ok ? "On track once this spring's courses are passed" : "Not on track yet — see what's missing"}
              </div>
              <div className="small muted">{t.why}</div>
              <div style={{ marginTop: 6 }}>
                {ev.lines.map((l, i) => <div key={i} className={`rule-line ${l.state}`} style={{ paddingLeft: l.depth * 12 }}>{l.text}</div>)}
              </div>
            </div>
          );
        })}
      </div>
      <h2>This year</h2>
      <div className="grid">
        <Term title="Fall 2026 (now)" items={fall2026} />
        <Term title="Spring 2027" items={spring2027} />
      </div>
    </>
  );
}
