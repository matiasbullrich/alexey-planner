import Link from "next/link";
import { lanes } from "@/data/lanes";
import { courseById } from "@/data/courses";
import DiscreteNote from "@/components/DiscreteNote";

export default function LanesPage() {
  return (
    <>
      <h1>Career lanes</h1>
      <p className="lead">Alexey has said he does not want to be a professor, so every lane is industry, finance or his own company; a PhD appears only where industry deep work asks for it. Click a lane's map link to see its courses lit up in its color.</p>
      <div className="legend">
        {lanes.map((l) => <a key={l.id} href={`#${l.id}`} style={{ color: l.color, fontWeight: 600, textDecoration: "none" }}><span className="dot" style={{ background: l.color }} />{l.name}</a>)}
      </div>
      <p className="small muted">CS tiers come from the CS courses tab of the Career_Map_Applied_Math sheet: Light = 4 courses, Solid = 9 (done by the end of year 3), Heavy = 15.</p>
      <DiscreteNote />
      <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 12 }}>
        {lanes.map((l) => (
          <section key={l.id} id={l.id} className="card" style={{ borderLeft: `6px solid ${l.color}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap", alignItems: "baseline" }}>
              <h2 style={{ margin: 0, color: l.color }}>{l.name}</h2>
              <Link className="btn" href={`/map?lane=${l.id}`} style={{ borderColor: l.color, color: l.color }}>Show on the map</Link>
            </div>
            <p>{l.summary}</p>
            <table>
              <tbody>
                <tr><td style={{ width: 170 }}><strong>Degree in practice</strong></td><td>{l.degree}</td></tr>
                <tr><td><strong>Computer science</strong></td><td>{l.cs}</td></tr>
                <tr><td><strong>Courses</strong></td><td>{l.courses.filter((c) => courseById[c]).map((c, i) => <span key={c}>{i ? " · " : ""}<Link href={`/map?lane=${l.id}&course=${encodeURIComponent(c)}`}>{c}</Link> <span className="muted small">{courseById[c].title}</span></span>)}</td></tr>
                <tr><td><strong>Outside class</strong></td><td><ul style={{ margin: 0, paddingLeft: 18 }}>{l.prep.map((p) => <li key={p}>{p}</li>)}</ul></td></tr>
                <tr><td><strong>When it is recruited</strong></td><td>{l.recruiting}</td></tr>
                <tr><td><strong>Types of firms</strong></td><td>{l.firmTypes.join(" · ")}</td></tr>
                <tr><td><strong>Example employers</strong></td><td>{l.firms}<div className="muted small">Examples only — many more firms exist in each type.</div></td></tr>
                {l.earlierWork ? <tr><td><strong>From earlier planning</strong></td><td>{l.earlierWork}</td></tr> : null}
              </tbody>
            </table>
          </section>
        ))}
      </div>
    </>
  );
}
