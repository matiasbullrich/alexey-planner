import { masters } from "@/data/plans";

export default function MastersPage() {
  return (
    <>
      <h1>Four years or five</h1>
      <p className="lead">The fork is in year 3: math majors apply for a five-year B.A./master's track before senior year. Rutgers discontinued its Mathematical Finance master's (MSMF) in January 2025, so the old five-year finance plan points to the options below instead.</p>
      <table>
        <thead><tr><th>Route</th><th>Years</th><th>The master's year</th><th>Best for</th></tr></thead>
        <tbody>
          {masters.map((m) => (
            <tr key={m.route}><td><strong>{m.route}</strong>{m.link ? <> · <a href={m.link} target="_blank" rel="noreferrer">source</a></> : null}</td><td>{m.years}</td><td>{m.what}</td><td>{m.best}</td></tr>
          ))}
        </tbody>
      </table>
      <h2>Five years</h2>
      <p>Years 1–3 follow the chosen plan; in year 3 apply to the five-year track; as a senior take two or three graduate courses that count toward the master's; year 5 is the master's plus an internship. Cost: one more year of tuition. Gain: a master's and a second internship summer before the full-time job.</p>
      <h2>Four years</h2>
      <p>The same first three years, then a senior year of graduate courses and research, with PhD or outside master's applications in the fall of senior year. Gain: a year earlier into a funded PhD or the job market. Cost: no Rutgers master's to fall back on.</p>
      <p className="small muted">Sources: <a href="https://catalogs.rutgers.edu/generated/nb-ug_2425/pg465.html">Rutgers five-year tracks</a> · <a href="https://finmath.rutgers.edu/news-events-finmath/latest-news-finmath">MSMF discontinuance notice</a></p>
    </>
  );
}
