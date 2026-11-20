export default function CodePage() {
  const repo = process.env.NEXT_PUBLIC_REPO_URL;
  return (
    <>
      <h1>Code &amp; handover</h1>
      <p className="lead">This site is yours. Everything that runs it is in one code repository; read HANDOVER.md there first.</p>
      <div className="card">
        <p><strong>Code:</strong> {repo ? <a href={repo} target="_blank" rel="noreferrer">{repo}</a> : <span className="muted">repository link not set yet (NEXT_PUBLIC_REPO_URL)</span>}</p>
        <p><strong>Hosting:</strong> Vercel, deployed automatically from the repository's main branch.</p>
        <p><strong>Database (next step):</strong> Supabase. The schema is ready in <code>supabase/migrations/0001_init.sql</code>.</p>
      </div>
      <h2>Where things live in the code</h2>
      <table>
        <tbody>
          <tr><td><code>data/courses.ts</code></td><td>Every course and its prerequisite rule. Edit a rule here to fix it; a “?” on the map means the rule is not yet verified.</td></tr>
          <tr><td><code>data/plans.ts</code></td><td>Degree programs, named plans, goals, master's routes.</td></tr>
          <tr><td><code>data/opportunities.ts</code></td><td>Deadlines (they drive the alerts and the calendar feed), internships, careers, course comparisons.</td></tr>
          <tr><td><code>lib/prereq.ts</code></td><td>The logic that decides eligible / blocked / needs permission.</td></tr>
          <tr><td><code>lib/rutgers.ts</code></td><td>Reads live sections from the public Rutgers Schedule of Classes. Change the term in the Vercel environment variables.</td></tr>
          <tr><td><code>components/CourseMap.tsx</code></td><td>The interactive map and the course bubble.</td></tr>
        </tbody>
      </table>
      <h2>Your data</h2>
      <p>Courses you mark as taken are stored only in your browser for now. Nothing personal is in the code or on the server. When you connect your own Supabase project, it moves there behind your login with two-factor authentication.</p>
    </>
  );
}
