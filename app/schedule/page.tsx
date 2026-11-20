"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { courseById } from "@/data/courses";

const SEMESTERS = [
  { code: "92026", label: "Fall 2026" },
  { code: "12027", label: "Spring 2027" },
  { code: "72027", label: "Summer 2027" },
  { code: "92027", label: "Fall 2027" },
];
const SUBJECTS = [
  { code: "640", label: "640 Mathematics" },
  { code: "642", label: "642 Mathematics (graduate, applied)" },
  { code: "750", label: "750 Physics" },
  { code: "960", label: "960 Statistics" },
  { code: "198", label: "198 Computer Science" },
  { code: "220", label: "220 Economics" },
  { code: "635", label: "635 Materials Science (Engineering)" },
];

type Meeting = { day: string; start: string; end: string; campus: string; building: string; room: string; mode: string };
type Section = { index: string; number: string; open: boolean; instructors: string[]; meetings: Meeting[]; notes: string };
type Course = { id: string; title: string; credits: string; prereqNotes: string; sections: Section[] };

export default function SchedulePage() {
  const [semester, setSemester] = useState("12027");
  const [subject, setSubject] = useState("640");
  const [q, setQ] = useState("");
  const [openOnly, setOpenOnly] = useState(false);
  const [data, setData] = useState<{ term?: string; courses?: Course[]; error?: string } | null>(null);

  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    if (p.get("semester")) setSemester(p.get("semester")!);
    if (p.get("subject")) setSubject(p.get("subject")!);
  }, []);
  useEffect(() => {
    setData(null);
    fetch(`/api/subject?subject=${subject}&semester=${semester}`).then((r) => r.json()).then(setData).catch(() => setData({ error: "Rutgers schedule unavailable right now." }));
    history.replaceState(null, "", `?semester=${semester}&subject=${subject}`);
  }, [semester, subject]);

  const courses = useMemo(() => {
    const term = q.trim().toLowerCase();
    return (data?.courses ?? [])
      .filter((c) => !term || c.id.includes(term) || c.title.toLowerCase().includes(term))
      .map((c) => ({ ...c, sections: openOnly ? c.sections.filter((s) => s.open) : c.sections }))
      .filter((c) => c.sections.length);
  }, [data, q, openOnly]);

  return (
    <>
      <h1>Class schedule</h1>
      <p className="lead">Every section with its days, times, campus, room, instructor and open/closed status, read live from the public Rutgers Schedule of Classes (refreshed every 6 hours).</p>
      <div className="toolbar">
        <select value={semester} onChange={(e) => setSemester(e.target.value)}>{SEMESTERS.map((s) => <option key={s.code} value={s.code}>{s.label}</option>)}</select>
        <select value={subject} onChange={(e) => setSubject(e.target.value)}>{SUBJECTS.map((s) => <option key={s.code} value={s.code}>{s.label}</option>)}</select>
        <input placeholder="Filter: 421, analysis…" value={q} onChange={(e) => setQ(e.target.value)} style={{ font: "inherit", fontSize: 14, padding: "6px 8px", borderRadius: 8, border: "1px solid var(--rule)", background: "var(--panel)", color: "var(--ink)" }} />
        <label className="small"><input type="checkbox" checked={openOnly} onChange={(e) => setOpenOnly(e.target.checked)} /> Open sections only</label>
        <a className="small" href={`https://classes.rutgers.edu/soc/#courses?subject=${subject}&semester=${semester}&campus=NB&level=U`} target="_blank" rel="noreferrer">Rutgers page</a>
      </div>
      {!data ? <p className="muted">Loading {SEMESTERS.find((s) => s.code === semester)?.label}…</p> : data.error ? <p className="muted">{data.error}</p> : courses.length === 0 ? <p className="muted">No sections found.</p> : (
        <table>
          <thead><tr><th>Course</th><th>Sec</th><th>Index</th><th>Status</th><th>Days &amp; times</th><th>Where</th><th>Instructor</th></tr></thead>
          <tbody>
            {courses.flatMap((c) => c.sections.map((s, j) => (
              <tr key={c.id + s.index} style={j === 0 ? { borderTop: "2px solid var(--rule)" } : undefined}>
                <td>{j === 0 ? <>
                  {courseById[c.id] ? <Link href={`/map?course=${encodeURIComponent(c.id)}`}><strong>{c.id}</strong></Link> : <strong>{c.id}</strong>}
                  <div className="small">{c.title}{c.credits ? ` · ${c.credits} cr` : ""}</div>
                  {c.prereqNotes ? <div className="small muted">Prereq: {c.prereqNotes}</div> : null}
                </> : null}</td>
                <td>{s.number}</td>
                <td className="small">{s.index}</td>
                <td><strong style={{ color: s.open ? "var(--taken)" : "var(--accent)" }}>{s.open ? "Open" : "Closed"}</strong></td>
                <td className="small">{s.meetings.filter((m) => m.day).map((m, k) => <div key={k}>{m.day} {m.start}–{m.end}</div>)}{s.meetings.every((m) => !m.day) ? <span className="muted">By arrangement / online</span> : null}</td>
                <td className="small">{s.meetings.filter((m) => m.day).map((m, k) => <div key={k}>{m.campus} {m.building} {m.room}</div>)}</td>
                <td className="small">{s.instructors.join(", ")}</td>
              </tr>
            )))}
          </tbody>
        </table>
      )}
    </>
  );
}
