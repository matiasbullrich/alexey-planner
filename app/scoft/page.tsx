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

      <h2>Three roads into SCOFT — and where each class comes from</h2>
      <p>The same subject can be reached from three departments. They are not rivals; the strongest education takes pieces of all three, and five years leaves room for that.</p>
      <table>
        <thead><tr><th style={{ width: 150 }}>Road</th><th>Classes at Rutgers</th><th>What it teaches about randomness</th><th>Style</th></tr></thead>
        <tbody>
          <tr>
            <td><strong style={{ color: "#1c7ed6" }}>Physics</strong></td>
            <td><C id="750:351">Physics 351</C> Thermal Physics (statistical mechanics; spring of sophomore year, after <C id="750:227">227</C>) · <C id="750:381">381</C>–<C id="750:382">382</C> Classical Mechanics · <C id="750:361">361</C> Quantum Mechanics · graduate 611 Statistical Mechanics later</td>
            <td>Random walks, diffusion, Brownian motion, the heat equation, entropy, and Monte Carlo itself — all of which were invented in physics and borrowed by finance. Black–Scholes is the heat equation in disguise.</td>
            <td>Learn the math from the problem. Fast, intuitive, less proof. Alexey says this is the way he enjoys most.</td>
          </tr>
          <tr>
            <td><strong style={{ color: "#007A33" }}>Mathematical finance</strong></td>
            <td><C id="640:477" /> → <C id="640:485" /> → <C id="640:489" /> + <C id="640:490" /> (the certificate), with <C id="640:478" /> and <C id="640:481" /></td>
            <td>The finance vocabulary: no-arbitrage, hedging, risk-neutral pricing, the Greeks, and simulation applied to real contracts.</td>
            <td>Applied and computational. No measure theory required.</td>
          </tr>
          <tr>
            <td><strong style={{ color: "#7048e8" }}>Pure analysis</strong></td>
            <td><C id="640:311H">311H</C> (done this fall) → <C id="640:411" />–<C id="640:412" /> → <C id="640:501">501</C>–<C id="640:502">502</C> → graduate probability</td>
            <td>Why the tools work and exactly when they fail: measure, integration, convergence, martingales — the Karatzas &amp; Shreve end of SCOFT.</td>
            <td>Proof first. Slow and demanding; pays off at the research frontier.</td>
          </tr>
        </tbody>
      </table>

      <h3>What Math 411 gives, concretely</h3>
      <ul>
        <li><strong>The honors track of the math B.S.</strong> — it is a requirement there.</li>
        <li><strong>The entry ticket to 501–502</strong>, which is where measure theory is actually taught, and from there to the rigorous (Karatzas &amp; Shreve) level.</li>
        <li><strong>A second, deeper dose of proof</strong> after 311H: the habit of knowing a statement is true rather than plausible.</li>
        <li><strong>The strongest signal for a math or probability PhD.</strong></li>
      </ul>
      <p>What it does <em>not</em> give: option pricing, Monte Carlo, Itô calculus as practitioners use it, or anything a physicist needs for quantum mechanics or statistical mechanics. Those come from the other two roads.</p>

      <h3>What only the pure road teaches</h3>
      <p>Pure math is not "more math" — it is a different skill. The physics road teaches him to <em>use</em> mathematics; the pure road teaches him to <em>prove</em> it and to notice when a standard move is illegal. That matters most exactly where SCOFT gets interesting: with fat tails, averages converge slowly or not at all, and the usual theorems quietly stop applying. People who work on fat tails for a living usually reached the rigorous math late and on demand, pulled by a real problem — which is a perfectly good way to arrive.</p>

      <h3>311H cost nothing on the physics side</h3>
      <p className="small">Choosing 311H over the honors physics sequence (271–273) in freshman fall did not delay statistical mechanics. Physics 351 runs only in spring and needs second-year physics on either route (272 on the honors side, <C id="750:227">227</C> on his), so the earliest date is spring of sophomore year both ways. The same appears true for Quantum Mechanics (361) in junior fall. What he gave up was the honors version of the intro material, not time.</p>

      <h3>How this maps to quant trading and quant research</h3>
      <table>
        <thead><tr><th style={{ width: 190 }}>Destination</th><th>What the work rewards</th><th>Roads that feed it</th></tr></thead>
        <tbody>
          <tr><td><Link href="/lanes">Quant trading</Link></td><td>Probability at speed, mental math, games and bets, judgment under uncertainty, enough code to test an idea.</td><td>477 above all; the finance road; the Monte Carlo ladder. Level 1 is enough.</td></tr>
          <tr><td><Link href="/lanes">Quant research</Link></td><td>Statistics, modeling, simulation, careful reasoning about data; often a graduate degree.</td><td>Finance + physics roads to Level 2; 481; the pure road if aiming at research-heavy groups.</td></tr>
          <tr><td>Pricing / derivatives quant</td><td>Itô calculus, PDE, numerical methods.</td><td>Finance road + 478 + PDE (421/423); Shreve II.</td></tr>
          <tr><td>PhD (math, probability, physics)</td><td>Depth and proof (math) or depth and physical insight (physics).</td><td>Pure road for math; physics road for physics.</td></tr>
        </tbody>
      </table>
      <p className="small">A five-year plan lets him walk a good stretch of all three roads before choosing between industry, a master's and a PhD — see <Link href="/alternatives">the five-year alternatives</Link> and <Link href="/masters">4 or 5 years</Link>.</p>

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
