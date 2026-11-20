import { internshipTypes } from "@/data/opportunities";

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
      <p>All 49 roles, the CS course tiers, the shortlist and the physics &amp; engineering fields are on the <a href="/career-map">Career map</a> page.</p>
    </>
  );
}
