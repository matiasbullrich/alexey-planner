import Link from "next/link";
import AskClaude from "@/components/AskClaude";

const C = ({ id, children }: { id: string; children?: React.ReactNode }) => (
  <Link href={`/map?course=${encodeURIComponent(id)}`}><strong>{children ?? id.replace("640:", "Math ")}</strong></Link>
);

const levels = [
  {
    name: "Level 1 — Working finance math",
    color: "#007A33",
    mt: "None",
    what: "Binomial trees, no-arbitrage pricing, Black–Scholes through its differential equation, hedging and the Greeks, Monte Carlo pricing.",
    rutgers: "477 → 485 → 489 + 490 (the Mathematical Finance certificate)",
    books: "Stampfli & Goodman (the 485 text); Hull; Shreve vol. I (binomial model)",
    enough: "Trading desks, most quant-trading interviews, quant developer, risk, a finance master's.",
  },
  {
    name: "Level 2 — Stochastic calculus, used carefully",
    color: "#e8590c",
    mt: "Learned inside the book, as you go",
    what: "Brownian motion, Itô's formula, risk-neutral pricing, change of measure (Girsanov) used correctly but not proved from scratch; stochastic differential equations; serious Monte Carlo.",
    rutgers: "478, 481, 421/423 (PDE), 373 (numerical analysis); 311H already gives the rigor needed",
    books: "Shreve vol. II (its first two chapters teach the measure theory it needs); Steele; Glasserman for Monte Carlo",
    enough: "Derivatives-pricing quant, most quant-research roles in industry.",
  },
  {
    name: "Level 3 — The rigorous theory",
    color: "#7048e8",
    mt: "Required — this level is built on it",
    what: "Karatzas & Shreve: construction of Brownian motion, martingale theory, the proofs behind Itô and Girsanov, optimal stopping, fat-tailed (jump) processes.",
    rutgers: "411–412 → 501–502 (where measure theory is actually taught) → graduate probability",
    books: "Karatzas & Shreve; Folland; Durrett",
    enough: "A PhD in probability or mathematical finance; research-heavy quant groups; proving new results rather than using known ones.",
  },
];

const ladder = [
  ["1", "Price a European call by simulation and match Black–Scholes", "Simulate the final stock price 100,000 times, average the discounted payoff, compare with the formula. Report the error bar. This is the 'hello world'.", "Needs 477 + Python"],
  ["2", "Make it converge faster (variance reduction)", "Antithetic variables, then control variates. Measure how many fewer paths you need for the same accuracy.", "477"],
  ["3", "Path-dependent options", "Asian (average-price) and barrier options — cases with no simple formula, where Monte Carlo earns its keep.", "485"],
  ["4", "Simulate a stochastic differential equation", "Euler–Maruyama stepping for a model with changing volatility (Heston). See how step size creates bias.", "478 or Shreve II"],
  ["5", "The Greeks by simulation", "Delta and vega by bump-and-reprice, then by the pathwise method. Compare noise.", "485/489"],
  ["6", "American options (Longstaff–Schwartz)", "Early exercise by regression on simulated paths — the standard industry method.", "489 + 481"],
  ["7", "Quasi-Monte Carlo", "Replace random numbers with Sobol sequences; watch the error shrink faster than 1/√N.", "373"],
  ["8", "Fat tails", "Add jumps (Merton) or heavy-tailed returns; see what the normal model misses in the tails.", "478"],
];

export default function ScoftPage() {
  return (
    <>
      <h1>SCOFT &amp; Monte Carlo: how much measure theory, really?</h1>
      <p className="lead">The honest answer has two parts: you can learn, use and get hired for mathematical finance and Monte Carlo <strong>without a measure-theory course</strong> — and you cannot do the <strong>rigorous</strong> theory (Karatzas &amp; Shreve) without it. Both are true. Which one matters depends on the destination.</p>

      <div className="card" style={{ borderLeft: "5px solid #c92a2a" }}>
        <h2 style={{ marginTop: 0 }}>A correction to earlier advice</h2>
        <p>Earlier planning treated Math 411–412 as the gate to SCOFT: "eventually one needs measure theory." That was accurate for the target then on the table — the full Karatzas &amp; Shreve pathway — but it was stated too broadly. Three things need to be said plainly:</p>
        <ul>
          <li><strong>411–412 (Rudin) is not the measure-theory course.</strong> It builds the analysis maturity; Lebesgue measure and integration are taught properly in the graduate sequence 501–502 (with a taste in 312, depending on the instructor).</li>
          <li><strong>Rutgers' own finance courses don't require it.</strong> <C id="640:485" /> needs only linear algebra, differential equations and <C id="640:477" />. Even the former master's-level Mathematical Finance I listed undergraduate analysis as "recommended but not required" and leaned on Sheldon Ross-level probability.</li>
          <li><strong>411–412 still matters — for different reasons.</strong> It is required for the honors track of the math B.S., it is the strongest signal for a PhD, and it is the road to Level 3 below. It is not a prerequisite for pricing options or running simulations.</li>
        </ul>
        <p className="small" style={{ marginBottom: 0 }}>So: if the 411 special permission doesn't come, or Alexey tires of analysis, the quant-trading and Monte Carlo road stays fully open. What narrows is the PhD / research-theory road.</p>
      </div>

      <h2>Three levels of "stochastic calculus for finance"</h2>
      {levels.map((l) => (
        <div key={l.name} className="card" style={{ borderTop: `5px solid ${l.color}` }}>
          <h3 style={{ marginTop: 0, color: l.color }}>{l.name}</h3>
          <table><tbody>
            <tr><th style={{ width: 170 }}>Measure theory</th><td><strong>{l.mt}</strong></td></tr>
            <tr><th>What you can do</th><td>{l.what}</td></tr>
            <tr><th>At Rutgers</th><td>{l.rutgers}</td></tr>
            <tr><th>Books</th><td>{l.books}</td></tr>
            <tr><th>Enough for</th><td>{l.enough}</td></tr>
          </tbody></table>
        </div>
      ))}

      <h2>Where measure theory actually bites</h2>
      <p>Without it you can compute; with it you know <em>why the computation is allowed</em>. The specific places:</p>
      <ul>
        <li><strong>Conditional expectation given information.</strong> "The expected payoff given everything known at time t" is itself a random quantity. Level 1 handles it on a tree; in continuous time it needs measure theory to even define.</li>
        <li><strong>Changing the probability (Girsanov).</strong> Risk-neutral pricing swaps the real-world probabilities for pricing probabilities. You can use the recipe at Level 2; the proof, and knowing when it fails, is Level 3.</li>
        <li><strong>Swapping limits and averages.</strong> Every Monte Carlo estimate assumes the average of the simulations converges to the right number. The theorems that guarantee it (dominated convergence, the law of large numbers in full strength) are measure theory. When a simulation quietly converges to the wrong answer, this is usually why.</li>
        <li><strong>Brownian motion itself.</strong> A path that is continuous everywhere and smooth nowhere cannot be handled with ordinary calculus — which is the whole reason Itô's calculus exists.</li>
        <li><strong>Fat tails and jumps.</strong> The "FT" in SCOFT. Processes with jumps and infinite variance are where intuition from the normal distribution breaks first.</li>
      </ul>
      <p className="mono-note">Rule of thumb: Level 1–2 lets him USE the tools. Level 3 lets him BUILD new ones and know when the old ones break. Trading firms mostly hire for the first plus speed and judgment; research groups and PhD programs hire for the second.</p>

      <h2>Math 485 and what comes after it</h2>
      <table>
        <thead><tr><th>When</th><th>Course</th><th>What it adds</th></tr></thead>
        <tbody>
          <tr><td>Spring 2027</td><td><C id="640:477" /> Probability</td><td>The real prerequisite for everything here. Guaranteed in his schedule.</td></tr>
          <tr><td>Fall 2027</td><td><C id="640:485" /> Introduction to Mathematical Finance</td><td>Fall only. No-arbitrage, binomial model, Black–Scholes. Text: Stampfli &amp; Goodman. He already has 250 and 252.</td></tr>
          <tr><td>Fall 2027 or Spring 2028</td><td><C id="640:478" /> Stochastic Processes</td><td>Markov chains, Poisson processes, Brownian motion — the bridge to Level 2. Offered both terms.</td></tr>
          <tr><td>Spring 2028</td><td><C id="640:489" /> Computational Finance</td><td>Spring only. <strong>This is the Monte Carlo course</strong>: implementing models in code. Needs 485 + CS 111.</td></tr>
          <tr><td>Spring 2028</td><td><C id="640:490" /> Topics in Mathematical Finance</td><td>Spring only. Small-group research project, presented to the class — good material for a résumé and interviews.</td></tr>
          <tr><td>Any time after 477</td><td><C id="640:481" /> Mathematical Statistics</td><td>Estimation and regression: needed for the American-option method and for any data work.</td></tr>
        </tbody>
      </table>
      <p><strong>485 + 489 + 490 = Rutgers' undergraduate Certificate in Mathematical Finance.</strong> On this timing he would finish it by the end of sophomore year — before junior-summer internship recruiting.</p>
      <p className="flag">Checked against the live schedule: 485 has sections in Fall 2026 only; 489 and 490 in Spring 2027 only. The graduate Mathematical Finance courses (subject 643) that several vF tabs list for senior year — 643:621/622 — show <strong>no sections in Fall 2026</strong>, consistent with the master's program closing. Treat those rows in the alternatives as needing a replacement: the certificate above, <C id="640:478" />, and for a fifth year the Statistics department's financial statistics &amp; risk management courses (subject 958, e.g. Advanced Simulation Methods). <Link href="/schedule?semester=92026&subject=958">See 958 in the schedule</Link>.</p>

      <h2>Training for Monte Carlo: a project ladder</h2>
      <p>Monte Carlo is learned by building, not by reading. Each step is a weekend project in Python (NumPy); together they are a portfolio he can show in an interview. Reference: Glasserman, <em>Monte Carlo Methods in Financial Engineering</em>.</p>
      <table>
        <thead><tr><th>#</th><th>Project</th><th>What he does</th><th>Ready after</th></tr></thead>
        <tbody>{ladder.map((r) => <tr key={r[0]}><td>{r[0]}</td><td><strong>{r[1]}</strong></td><td className="small">{r[2]}</td><td className="small">{r[3]}</td></tr>)}</tbody>
      </table>
      <p className="small">Projects 1–2 are possible this summer, right after 477 — a year before he sits in 489. None of the eight needs a measure-theory course. Understanding <em>why</em> step 4 has bias and step 7 beats 1/√N is where Level 2–3 knowledge starts to pay.</p>

      <h2>What this changes in the plan</h2>
      <ul>
        <li><strong>Nothing is lost by taking 411–412</strong> if he gets the permission and still enjoys analysis: it keeps the honors B.S., the PhD option and Level 3 alive.</li>
        <li><strong>Add the certificate regardless</strong>: 485 in Fall 2027, 489 + 490 in Spring 2028. It is the fastest route to real pricing and simulation work and conflicts with nothing on the analysis ladder.</li>
        <li><strong>If analysis stops at 311H/312</strong>: quant trading, Silicon Valley, consulting, banking and founder lanes are unaffected. Quant research stays reachable through Level 2 (Shreve II is written for exactly this reader). Only the PhD-grade theory closes.</li>
        <li><strong>Decision point</strong>: after 477 and the first two Monte Carlo projects (summer 2027) he will know whether he likes the computing side, the proof side, or both. Decide about 411 with that information, not before.</li>
      </ul>

      <h2>Review of the "courses that don't require Math 350" note</h2>
      <p>That note was pasted into planning as support for this discussion. Checked against the live schedule and the department pages:</p>
      <ul>
        <li><strong>What it gets right:</strong> 477, 478, 481, 485 and 489 do not need 350, and missing 350/350H in spring would not block the finance road. The prerequisites it gives for 485 and 489 match the catalog.</li>
        <li><strong>Its main weakness:</strong> it answers "what can he register for?", not "what does he need to know?". A registration prerequisite is the minimum to enroll, not the preparation that makes the course go well. It never says the thing that matters here — that 485 is taught without measure theory.</li>
        <li><strong>It leaves out timing:</strong> 485 is fall-only and 489/490 are spring-only, so the order is forced: 477 → 485 → 489/490.</li>
        <li><strong>Small errors:</strong> 411–412 is titled Mathematical Analysis I–II (not "Honors"), and it and 451 show no formal prerequisite in the schedule — entry is by department permission. Suggesting 351 as a way to "stay on track for the honors B.S." is doubtful: the honors track is built on 451–452, and 351 is the standard-track version of the same material. Confirm with the adviser before using 351 that way.</li>
        <li><strong>It lists courses he already has</strong> (454, 252) and repeats source labels, which makes it look more thorough than it is.</li>
      </ul>

      <AskClaude prompt="My son Alexey is a Rutgers Honors College math freshman (311H, 252, 454 now; 477 and 421 in spring 2027). Explain, with one worked example, the difference between pricing a European call (a) on a binomial tree, (b) with Itô calculus and no measure theory, and (c) rigorously with measure theory. Then tell me which quant jobs actually need (c), and give him a first Monte Carlo project in Python he can do right after Math 477." />
    </>
  );
}
