import { internshipTypes, careers } from "@/data/opportunities";

export default function CareersPage() {
  return (
    <>
      <h1>Internships &amp; careers</h1>
      <p className="lead">The junior-summer internship decides most first jobs, and banking, consulting and quant recruit it a year or more ahead. Class of 2030: freshman summer 2027, sophomore summer 2028, junior summer 2029.</p>
      <h2>Summers by type</h2>
      <table>
        <thead><tr><th>Type</th><th>Freshman</th><th>Sophomore</th><th>Junior summer</th><th>When the junior internship is recruited</th></tr></thead>
        <tbody>
          {internshipTypes.map((t) => (
            <tr key={t.type}><td><strong>{t.type}</strong>{t.link ? <> · <a href={t.link} target="_blank" rel="noreferrer">source</a></> : null}</td><td>{t.y1}</td><td>{t.y2}</td><td>{t.junior}</td><td>{t.when}</td></tr>
          ))}
        </tbody>
      </table>
      <h2>Career map</h2>
      <p className="muted small">From the Career_Map_Applied_Math sheet. CS tiers: Light = Python/R/MATLAB for analysis; Solid = production code and data pipelines; Heavy = full software engineering.</p>
      <table>
        <thead><tr><th>Field</th><th>Role</th><th>Degree</th><th>CS</th><th>Example firms</th></tr></thead>
        <tbody>
          {careers.map((c, i) => (
            <tr key={i}><td>{c.field}</td><td><strong>{c.role}</strong>{c.note ? <div className="muted small">{c.note}</div> : null}</td><td>{c.degree}</td><td>{c.cs}</td><td className="small">{c.firms}</td></tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
