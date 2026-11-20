"use client";
import { useEffect, useState } from "react";
import { exploreTopics } from "@/data/explore";
import MinimumCS from "@/components/MinimumCS";
import AskClaude from "@/components/AskClaude";

const subjectOf = (id: string) => id.slice(0, 3);
const numOf = (id: string) => id.slice(4, 7);
const termCode = (seen: string) => (/S27/.test(seen) && !/F26/.test(seen) ? "12027" : "92026");

export default function ExplorePage() {
  const [open, setOpen] = useState<string>("");
  useEffect(() => { const h = window.location.hash.slice(1); if (h) setOpen(h); }, []);
  const toggle = (id: string) => { const next = open === id ? "" : id; setOpen(next); history.replaceState(null, "", next ? `#${next}` : " "); };
  return (
    <>
      <h1>Explore</h1>
      <p className="lead">Beyond the requirements: ideas worth a course or two. Click a bubble to open it. Course numbers open the live schedule (days, times, rooms).</p>
      <MinimumCS />
      <div style={{ display: "flex", gap: 14, flexWrap: "wrap", margin: "22px 0 12px" }}>
        {exploreTopics.map((t) => (
          <button key={t.id} onClick={() => toggle(t.id)}
            style={{ borderRadius: 999, padding: "14px 22px", fontSize: 15, fontWeight: 600, border: `2px solid ${t.color}`, background: open === t.id ? t.color : "var(--panel)", color: open === t.id ? "#fff" : t.color, cursor: "pointer" }}>
            Explore {t.name}
          </button>
        ))}
      </div>
      {exploreTopics.filter((t) => t.id === open).map((t) => (
        <div key={t.id} className="card" style={{ borderTop: `5px solid ${t.color}` }}>
          <h2 style={{ marginTop: 0, color: t.color }}>{t.name}</h2>
          <p><em>{t.question}</em></p>
          <p>{t.summary}</p>
          <table>
            <thead><tr><th>Course</th><th>Offered</th><th>Why it's here</th></tr></thead>
            <tbody>
              {t.courses.map((c) => (
                <tr key={c.id}>
                  <td><a href={`/schedule?semester=${termCode(c.seen)}&subject=${subjectOf(c.id)}&q=${numOf(c.id)}`}><strong>{c.id}</strong></a> {c.title}</td>
                  <td className="small">{c.seen}</td>
                  <td className="small">{c.why}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {t.reading ? <><h3>Reading</h3><ul>{t.reading.map((r) => <li key={r} className="small">{r}</li>)}</ul></> : null}
          <p className="small muted">Offered = semesters seen in the Rutgers schedule (F = fall, S = spring). Not every course runs every year.</p>
          <AskClaude prompt={`My son Alexey is a Rutgers Honors College math student (freshman, analysis/probability/combinatorics; possible paths: quant, research, Silicon Valley, founder). Help him explore ${t.name}. ${t.question} Which of these Rutgers courses should he take first and why, and what should he read on his own? Courses: ${t.courses.map((c) => `${c.id} ${c.title}`).join("; ")}.`} />
        </div>
      ))}
    </>
  );
}
