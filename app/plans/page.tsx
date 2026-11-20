import { programs, plans, goals } from "@/data/plans";
import { courseById } from "@/data/courses";

export default function PlansPage() {
  return (
    <>
      <h1>Plans &amp; goals</h1>
      <p className="lead">Five degree programs; every named plan is one of them or a mix. The coverage ratings are first-pass judgments to re-check as the course data firms up.</p>

      <h2>Degree programs</h2>
      <table>
        <thead><tr><th>Program</th><th>Degree</th><th>Core requirements</th><th>Fit</th></tr></thead>
        <tbody>
          {programs.map((p) => (
            <tr key={p.id}><td><strong>{p.name}</strong>{p.source ? <> · <a href={p.source} target="_blank" rel="noreferrer">source</a></> : null}</td><td>{p.degree}</td><td>{p.core}</td><td>{p.fit}</td></tr>
          ))}
        </tbody>
      </table>

      <h2>Which plans reach which goals</h2>
      <p className="small muted">Consulting, investment banking and private equity take any major, so every plan rates Full for them: what decides those paths is GPA, recruiting timing (sophomore year) and preparation outside class — see the <a href="/lanes">Career lanes</a>.</p>
      <table>
        <thead><tr><th>Plan</th>{goals.map((g) => <th key={g.id}>{g.name.split(" (")[0]}</th>)}</tr></thead>
        <tbody>
          {plans.map((p) => (
            <tr key={p.id}>
              <td><strong>{p.name}</strong><div className="muted small">{p.years} yrs · {p.builtOn}</div></td>
              {goals.map((g) => <td key={g.id} className={p.coverage[g.id]}>{p.coverage[g.id]}</td>)}
            </tr>
          ))}
        </tbody>
      </table>

      <h2>What each goal needs</h2>
      <table>
        <thead><tr><th>Goal</th><th>Load-bearing courses</th><th>Degree in practice</th><th>CS</th></tr></thead>
        <tbody>
          {goals.map((g) => (
            <tr key={g.id}><td><strong>{g.name}</strong></td><td>{g.courses.map((c, i) => <span key={c}>{i ? ", " : ""}<a href={`/map?course=${encodeURIComponent(c)}`}>{c}</a></span>)}</td><td>{g.degree}</td><td>{g.cs}</td></tr>
          ))}
        </tbody>
      </table>

      <h2>The plans</h2>
      <div className="grid">
        {plans.map((p) => (
          <div key={p.id} className="card">
            <strong>{p.name}</strong>
            <div className="muted small">{p.years} years · {p.builtOn}</div>
            <p className="small">{p.line}</p>
            {p.flag ? <p className="flag">{p.flag}</p> : null}
            <div className="small muted">{p.courses.filter((c) => courseById[c]).join(" · ")}</div>
          </div>
        ))}
      </div>
    </>
  );
}
