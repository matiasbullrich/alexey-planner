import DiscreteNote from "@/components/DiscreteNote";
import { allRoles, csCourses, csNotes, shortlist, physicsEngineering, key, CAREER_MAP_URL } from "@/data/careerMap";

const TABS = [
  ["all-roles", "All roles"],
  ["cs-courses", "CS courses"],
  ["shortlist", "Shortlist"],
  ["physics-engineering", "Physics & engineering"],
  ["key", "Key"],
] as const;

const csColor: Record<string, string> = { LIGHT: "var(--taken)", SOLID: "var(--eligible)", HEAVY: "var(--accent)" };
const tier = (t: string) => <span style={{ color: csColor[t.split(/[ –(]/)[0]] ?? "var(--quiet)", fontWeight: 600 }}>{t}</span>;

export default function CareerMapPage() {
  const fields = Array.from(new Set(allRoles.map((r) => r[0])));
  return (
    <>
      <h1>Career map</h1>
      <p className="lead">The full Career_Map_Applied_Math sheet, all five tabs. {allRoles.length} roles across {fields.length} fields. <a href={CAREER_MAP_URL} target="_blank" rel="noreferrer">Open the original sheet</a>.</p>
      <div className="toolbar">{TABS.map(([id, label]) => <a key={id} className="btn" href={`#${id}`}>{label}</a>)}</div>

      <h2 id="all-roles">All roles</h2>
      <p className="small muted">Firms listed are examples of employers, not an exhaustive list — many more exist in each field.</p>
      <div className="legend">{fields.map((f) => <a key={f} href={`#f-${f.replace(/\W+/g, "-")}`}>{f}</a>)}</div>
      <table>
        <thead><tr><th>Field</th><th>Area</th><th>Role</th><th>Degree</th><th>CS needed</th><th>Firms</th><th>Notes</th></tr></thead>
        <tbody>
          {allRoles.map((r, i) => {
            const first = i === 0 || allRoles[i - 1][0] !== r[0];
            return (
              <tr key={i} id={first ? `f-${r[0].replace(/\W+/g, "-")}` : undefined} style={first && i ? { borderTop: "2px solid var(--rule)" } : undefined}>
                <td>{first ? <strong>{r[0]}</strong> : <span className="muted small">{r[0]}</span>}</td>
                <td>{r[1]}</td><td><strong>{r[2]}</strong></td><td>{r[3]}</td><td>{tier(r[4])}</td><td className="small">{r[5]}</td><td className="small muted">{r[6] ?? ""}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <h2 id="cs-courses">CS courses</h2>
      <DiscreteNote />
      <table>
        <thead><tr><th>Tier</th><th>Course</th><th>Title</th><th>Why</th><th>Suggested year</th><th>Notes</th></tr></thead>
        <tbody>{csCourses.map((r) => <tr key={r[1]}><td>{tier(r[0])}</td><td>{r[1]}</td><td><strong>{r[2]}</strong></td><td>{r[3]}</td><td>{r[4]}</td><td className="small muted">{r[5] ?? ""}</td></tr>)}</tbody>
      </table>
      <ul className="small muted">{csNotes.map((n) => <li key={n}>{n}</li>)}</ul>

      <h2 id="shortlist">Shortlist</h2>
      <table>
        <thead><tr><th>Rank</th><th>Path</th><th>Degree</th><th>CS needed</th><th>Why</th></tr></thead>
        <tbody>{shortlist.map((r) => <tr key={r[0]}><td><strong>{r[0]}</strong></td><td><strong>{r[1]}</strong></td><td>{r[2]}</td><td>{tier(r[3])}</td><td>{r[4]}</td></tr>)}</tbody>
      </table>

      <h2 id="physics-engineering">Physics &amp; engineering</h2>
      <p className="small muted">Fields that open up when physics or engineering is added to the math.</p>
      <table>
        <thead><tr><th>Added discipline</th><th>Field opened</th><th>Firms</th><th>Notes</th></tr></thead>
        <tbody>{physicsEngineering.map((r, i) => <tr key={i}><td>{r[0]}</td><td><strong>{r[1]}</strong></td><td className="small">{r[2]}</td><td className="small muted">{r[3] ?? ""}</td></tr>)}</tbody>
      </table>

      <h2 id="key">Key</h2>
      <table>
        <thead><tr><th>Flag</th><th>Value</th><th>Meaning</th></tr></thead>
        <tbody>{key.map((r, i) => <tr key={i}><td>{r[0]}</td><td>{r[1].match(/LIGHT|SOLID|HEAVY/) ? tier(r[1]) : <strong>{r[1]}</strong>}</td><td>{r[2]}</td></tr>)}</tbody>
      </table>
    </>
  );
}
