"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { courses, courseById, Rule, Course } from "@/data/courses";
import { plans } from "@/data/plans";
import { comparisons } from "@/data/opportunities";
import { evaluate, courseState, missingCourses, mentions, Record_, Status } from "@/lib/prereq";
import AskClaude from "./AskClaude";
import { seedRecord } from "@/data/myplan";
import { lanes } from "@/data/lanes";

const W = 172, H = 42, COLW = 222, ROWH = 52, PADX = 16, PADY = 40;
const LEVELS = ["100s", "200s", "300s", "400s", "Graduate"];
const DEPT_ORDER = ["Math", "Math grad", "Statistics", "Physics", "Engineering", "Computer Science", "Economics"];
const COLORS: Record<string, string> = {
  taken: "var(--taken)", inprogress: "var(--inprog)", eligible: "var(--eligible)", permission: "var(--perm)", blocked: "var(--blocked)",
};
const STATE_LABEL: Record<string, string> = {
  taken: "Taken", inprogress: "In progress", eligible: "Can take now", permission: "Needs permission (SPN, placement or instructor)", blocked: "Blocked — prerequisites missing",
};

function refs(rule: Rule | undefined, out: { id: string; coreq: boolean }[] = []) {
  if (!rule) return out;
  if (typeof rule === "string") out.push({ id: rule, coreq: false });
  else if ("coreq" in rule) out.push({ id: rule.coreq, coreq: true });
  else if ("all" in rule) rule.all.forEach((r) => refs(r, out));
  else if ("any" in rule) rule.any.forEach((r) => refs(r, out));
  return out;
}

type LiveSection = { index: string; number: string; open: boolean; instructors: string[]; notes: string; meetings: { day: string; start: string; end: string; campus: string; building: string; room: string; mode: string }[] };

export default function CourseMap() {
  const [rec, setRec] = useState<Record_>({});
  const [sel, setSel] = useState<string | null>(null);
  const [planId, setPlanId] = useState<string>("");
  const [laneId, setLaneId] = useState<string>("");
  const [live, setLive] = useState<{ id: string; term?: string; sections?: LiveSection[]; prereqNotes?: string; error?: string } | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("alexey-record");
      setRec(saved ? JSON.parse(saved) : seedRecord());
    } catch { setRec(seedRecord()); }
    const q = new URLSearchParams(window.location.search).get("course");
    if (q && courseById[q]) setSel(q);
    const l = new URLSearchParams(window.location.search).get("lane");
    if (l && lanes.some((x) => x.id === l)) setLaneId(l);
  }, []);
  const save = (next: Record_) => { setRec(next); try { localStorage.setItem("alexey-record", JSON.stringify(next)); } catch {} };
  const setStatus = (id: string, s: Status | null) => {
    const next = { ...rec };
    if (s) next[id] = s; else delete next[id];
    save(next);
  };

  // Layout: one column per level, grouped by department.
  const pos = useMemo(() => {
    const p: Record<string, { x: number; y: number }> = {};
    for (let lv = 1; lv <= 5; lv++) {
      const col = courses.filter((c) => c.level === lv).sort((a, b) => DEPT_ORDER.indexOf(a.dept) - DEPT_ORDER.indexOf(b.dept) || a.id.localeCompare(b.id));
      col.forEach((c, i) => (p[c.id] = { x: PADX + (lv - 1) * COLW, y: PADY + i * ROWH }));
    }
    return p;
  }, []);
  const height = Math.max(...Object.values(pos).map((v) => v.y)) + H + 24;
  const width = PADX * 2 + 4 * COLW + W;

  const edges = useMemo(() => courses.flatMap((c) => refs(c.prereq).filter((r) => courseById[r.id]).map((r) => ({ from: r.id, to: c.id, coreq: r.coreq }))), []);
  const plan = plans.find((p) => p.id === planId);
  const lane = lanes.find((l) => l.id === laneId);
  const inPlan = (id: string) => (!plan || plan.courses.includes(id)) && (!lane || lane.courses.includes(id));

  const course = sel ? courseById[sel] : null;
  const evalSel = course ? evaluate(course.prereq, rec) : null;
  const stateSel = course ? courseState(course, rec) : null;
  const unlocks = course ? courses.filter((c) => mentions(c.prereq, course.id)) : [];
  const missing = course ? missingCourses(course.prereq, rec) : [];
  const plansWith = course ? plans.filter((p) => p.courses.includes(course.id)) : [];
  const lanesWith = course ? lanes.filter((l) => l.courses.includes(course.id)) : [];
  const comps = course ? comparisons.filter((c) => c.a === course.id || c.b === course.id) : [];

  useEffect(() => {
    if (!sel) return;
    setLive({ id: sel });
    fetch(`/api/sections?course=${encodeURIComponent(sel)}`)
      .then((r) => r.json())
      .then((d) => setLive({ id: sel, ...d }))
      .catch(() => setLive({ id: sel, error: "Live sections unavailable." }));
  }, [sel]);

  const askPrompt = (c: Course) =>
    `I'm a Rutgers student planning my courses. Tell me about ${c.id} ${c.title}${c.book ? ` (usual book: ${c.book})` : ""}. ` +
    `What does it cover, how hard is it, what does it prepare me for, and how does it fit plans aimed at quantitative finance, mathematical physics and combinatorics? ` +
    `My completed or current courses: ${Object.keys(rec).join(", ") || "not recorded yet"}.`;

  return (
    <div>
      <div className="toolbar">
        <label className="small muted" htmlFor="plan">Highlight a plan</label>
        <select id="plan" value={planId} onChange={(e) => setPlanId(e.target.value)}>
          <option value="">All courses</option>
          {plans.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
        <label className="small muted" htmlFor="lane">Career lane</label>
        <select id="lane" value={laneId} onChange={(e) => setLaneId(e.target.value)} style={lane ? { borderColor: lane.color, color: lane.color, fontWeight: 600 } : undefined}>
          <option value="">None</option>
          {lanes.map((l) => <option key={l.id} value={l.id}>{l.name}</option>)}
        </select>
        <button onClick={() => save(seedRecord())}>Reset to current schedule</button>
        <span className="muted small">Click a course to see whether you can take it. Changes you make stay in this browser only.</span>
      </div>
      <div className="legend">
        {Object.entries(STATE_LABEL).map(([k, v]) => (
          <span key={k}><span className="dot" style={{ background: COLORS[k] }} />{v}</span>
        ))}
        <span>Dashed line = may be taken at the same time</span>
      </div>
      <div className="map-wrap">
        <div className="map-scroll">
          <svg width={width} height={height} role="img" aria-label="Rutgers prerequisite map">
            {LEVELS.map((l, i) => (
              <text key={l} x={PADX + i * COLW} y={22} fontSize={12} fill="var(--quiet)" fontWeight={600}>{l}</text>
            ))}
            {edges.map((e, i) => {
              const a = pos[e.from], b = pos[e.to];
              if (!a || !b) return null;
              const hot = sel && (e.from === sel || e.to === sel);
              const dim = plan && !(inPlan(e.from) && inPlan(e.to));
              const x1 = a.x + W, y1 = a.y + H / 2, x2 = b.x, y2 = b.y + H / 2;
              const backward = x2 <= x1;
              const d = backward
                ? `M${a.x + W / 2} ${a.y + H} C ${a.x + W / 2} ${a.y + H + 30}, ${b.x + W / 2} ${b.y - 30}, ${b.x + W / 2} ${b.y}`
                : `M${x1} ${y1} C ${x1 + 40} ${y1}, ${x2 - 40} ${y2}, ${x2} ${y2}`;
              return (
                <path key={i} d={d} fill="none" stroke={hot ? "var(--ink)" : "var(--rule)"} strokeWidth={hot ? 1.8 : 1}
                  strokeDasharray={e.coreq ? "4 4" : undefined} opacity={dim ? 0.15 : 1} />
              );
            })}
            {courses.map((c) => {
              const p = pos[c.id];
              const st = courseState(c, rec);
              const isSel = sel === c.id;
              const dim = !inPlan(c.id);
              const title = c.title.length > 24 ? c.title.slice(0, 23) + "…" : c.title;
              return (
                <g key={c.id} className="node" transform={`translate(${p.x},${p.y})`} opacity={dim ? 0.25 : 1} onClick={() => setSel(c.id)}>
                  <rect width={W} height={H} rx={8} fill={lane && lane.courses.includes(c.id) ? lane.color : "var(--panel)"} fillOpacity={lane && lane.courses.includes(c.id) ? 0.14 : 1} stroke={lane && lane.courses.includes(c.id) && !isSel ? lane.color : COLORS[st]} strokeWidth={isSel ? 3 : lane && lane.courses.includes(c.id) ? 2.2 : 1.5} />
                  <rect width={6} height={H} rx={3} fill={COLORS[st]} />
                  <text x={14} y={17} fontSize={12.5} fontWeight={700} fill="var(--ink)">{c.id}</text>
                  <text x={14} y={33} fontSize={11} fill="var(--quiet)">{title}</text>
                  {!c.verified ? <text x={W - 10} y={15} fontSize={10} fill="var(--perm)" textAnchor="end">?</text> : null}
                </g>
              );
            })}
          </svg>
        </div>

        <aside className="card bubble">
          {!course ? (
            <div>
              <h3 style={{ marginTop: 0 }}>Pick a course</h3>
              <p className="muted small">The bubble shows its prerequisites, marked against your record, the shortest way back to anything missing, what it unlocks, and this term's live sections.</p>
              <p className="muted small">A “?” on a course means its rule has not yet been checked against the Rutgers catalog.</p>
            </div>
          ) : (
            <div>
              <div className="muted small">{course.dept} · {course.credits ?? "?"} credits{course.terms ? ` · ${course.terms.join("/")} only` : ""}</div>
              <h3 style={{ margin: "2px 0 6px" }}>{course.id} {course.title}</h3>
              <div style={{ color: COLORS[stateSel!], fontWeight: 600, fontSize: 14 }}>{STATE_LABEL[stateSel!]}</div>
              <div className="toolbar" style={{ marginTop: 8 }}>
                <button onClick={() => setStatus(course.id, "taken")}>Mark taken</button>
                <button onClick={() => setStatus(course.id, "inprogress")}>In progress</button>
                <button onClick={() => setStatus(course.id, null)}>Clear</button>
              </div>

              <h3>Prerequisites</h3>
              {course.prereq ? evalSel!.lines.map((l, i) => (
                <div key={i} className={`rule-line ${l.state}`} style={{ paddingLeft: l.depth * 14 }}>{l.text}</div>
              )) : <div className="muted small">None listed.</div>}
              {!course.verified ? <p className="small" style={{ color: "var(--perm)" }}>Rule not yet checked against the catalog.</p> : null}

              {missing.length ? (
                <>
                  <h3>Shortest way there</h3>
                  {missing.map((m) => (
                    <div key={m} className="small">
                      <a href="#" onClick={(e) => { e.preventDefault(); setSel(m); }}>{m}</a> {courseById[m]?.title}
                      {courseById[m]?.terms ? <span className="muted"> ({courseById[m]!.terms!.join("/")} only)</span> : null}
                    </div>
                  ))}
                </>
              ) : null}

              {course.excludes?.length ? <p className="flag">Credit is given for only one of {course.id} and {course.excludes.join(", ")}; the second is recorded as E credit (no degree credit, no GPA effect).</p> : null}
              {course.notes ? <p className="small">{course.notes}</p> : null}
              {course.book ? <p className="small muted">Usual book: {course.book}</p> : null}

              {unlocks.length ? (
                <>
                  <h3>Unlocks</h3>
                  <div className="small">{unlocks.map((u, i) => (
                    <span key={u.id}>{i ? ", " : ""}<a href="#" onClick={(e) => { e.preventDefault(); setSel(u.id); }}>{u.id}</a></span>
                  ))}</div>
                </>
              ) : null}

              {lanesWith.length ? (<><h3>Career lanes</h3><div className="small" style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>{lanesWith.map((l) => (
                <a key={l.id} href="#" onClick={(e) => { e.preventDefault(); setLaneId(l.id); }} className="tag" style={{ borderColor: l.color, color: l.color }}>{l.name}</a>
              ))}</div></>) : null}
              {plansWith.length ? (<><h3>In these plans</h3><div className="small">{plansWith.map((p) => p.name).join(" · ")}</div></>) : null}
              {comps.length ? (<><h3>Compare</h3>{comps.map((c) => <div key={c.id} className="small"><Link href={`/compare#${c.id}`}>{c.a} vs {c.b}</Link></div>)}</>) : null}

              <h3>Sections {live?.term ? `· ${live.term}` : ""}</h3>
              {!live || live.id !== course.id || (!live.sections && !live.error) ? <div className="muted small">Loading…</div> :
                live.error ? <div className="muted small">{live.error}</div> :
                live.sections!.length === 0 ? <div className="muted small">Not offered this term.</div> :
                live.sections!.map((s) => (
                  <div key={s.index} className="small" style={{ borderTop: "1px solid var(--rule)", padding: "6px 0" }}>
                    <strong style={{ color: s.open ? "var(--taken)" : "var(--accent)" }}>{s.open ? "Open" : "Closed"}</strong> · section {s.number} · index {s.index}
                    {s.instructors.length ? <> · {s.instructors.join(", ")}</> : null}
                    {s.meetings.map((m, i) => <div key={i} className="muted">{m.day} {m.start}–{m.end} · {m.campus} {m.building} {m.room} {m.mode}</div>)}
                    {s.notes ? <div className="muted">{s.notes}</div> : null}
                  </div>
                ))}
              <div style={{ marginTop: 14 }}><AskClaude prompt={askPrompt(course)} /></div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
