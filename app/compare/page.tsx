import { comparisons } from "@/data/opportunities";
import { courseById } from "@/data/courses";
import AskClaude from "@/components/AskClaude";

export default function ComparePage() {
  return (
    <>
      <h1>Compare courses</h1>
      <p className="lead">Side by side, then one click hands the comparison to Claude with a ready-made prompt.</p>
      {comparisons.map((c) => (
        <section key={c.id} id={c.id}>
          <h2>{c.a} {courseById[c.a]?.title} vs {c.b} {courseById[c.b]?.title}</h2>
          <table>
            <thead><tr><th></th><th>{c.a}</th><th>{c.b}</th></tr></thead>
            <tbody>{c.rows.map(([k, a, b]) => <tr key={k}><td><strong>{k}</strong></td><td>{a}</td><td>{b}</td></tr>)}</tbody>
          </table>
          <div style={{ marginTop: 10 }}><AskClaude prompt={c.prompt} label="Ask Claude to compare" /></div>
        </section>
      ))}
    </>
  );
}
