// The complete rutgers_schedule_alternatives_vF workbook (Google Sheets), copied tab by tab.
// Source: https://docs.google.com/spreadsheets/d/1Kcd65emY7WgbVRgRu_b2hnpQUo-rbocjR6BsW1zn374
// Format: one line per sheet row. Cells (columns A, C, D, E) are separated by "|".
// Anything in the right-hand parallel columns (G–L) follows "»". An empty line is an empty row.
// Note: the Mathematical Finance master's (MSMF) named in some tabs was discontinued by Rutgers in January 2025.

export const VF_URL = "https://docs.google.com/spreadsheets/d/1Kcd65emY7WgbVRgRu_b2hnpQUo-rbocjR6BsW1zn374";

const AI_COL = [
  "► PARALLEL OPTION — AI-VIA-MATH ELECTIVES (no C++)",
  "A swap-in cluster for the AI lean. All use Python / PyTorch / Lean, not C++.",
  "640:354 Linear Optimization — prereq: 250 lin-alg ONLY. Load-bearing add (gradient descent, duality, convexity = 'learning').",
  "640:373/374 Numerical Analysis — prereq: CALC4 (252/292) + a language. Numerical ODE + linear-algebra computation.",
  "640:481 Math Theory of Statistics — prereq: 477. Statistical-learning-theory base.",
  "640:454 Combinatorics / 640:428 Graph Theory — prereq: 300+250.  (Rutgers = DIMACS: top-tier discrete/TCS.)",
  "640:461 Mathematical Logic — model theory, computability.",
  "495/591 Carbone 'AI Tools for Mathematics' — Lean 4 + LLMs; proof background; NO programming required.",
  "HOW TO USE: swap an SAS/free elective (or this tab's flex slot) for 354 + one more. 354 is the best single add if the AI lean is real.",
];

// Standard honors freshman year used by most tabs (271–273 honors physics version).
const FR_HONORS = (withAi: boolean, spring111Note = "Math major req") => `FRESHMAN
Fall
Course|Credits|Hrs/Wk|Notes${withAi ? "»" + AI_COL[0] : ""}
640:311H — Honors Analysis I|4|15|${withAi ? "»" + AI_COL[1] : ""}
750:271 + 275 lab — Honors Physics I|4|12|${withAi ? "»" + AI_COL[2] : ""}
960:211 — Statistics I|3|8|SAS: QQ${withAi ? "»" + AI_COL[3] : ""}
355:103 — Exposition & Argument|3|7|SAS: WCr/WCd; HC Writing${withAi ? "»" + AI_COL[4] : ""}
HC Forum|3|4|HC requirement${withAi ? "»" + AI_COL[5] : ""}
Cross-Cultural Competency|1|1|SAS: CCD${withAi ? "»" + AI_COL[6] : ""}
Total|18|~47|${withAi ? "»" + AI_COL[7] : ""}
${withAi ? "»" + AI_COL[8] : ""}
Spring
Course|Credits|Hrs/Wk|Notes
640:312 — Real Analysis II|3|12|
750:272 + 276 lab — Honors Physics II|4|12|
640:252 — Differential Equations|3|4|Easy for Alexey
198:111 — Intro to CS (Java)|3|4|${spring111Note}
SAS Core Elective (social sci / humanities)|3|5|SAS: SCL or AH
Intro Accounting (pass/fail)|3|5|Finance foundation
Total|19|~42|
`;

const HC_REQS = (rows: string) => `SAS CORE & HONORS COLLEGE REQUIREMENTS
Requirement|Met?|When / How
Writing (355:103)|✓|Freshman Fall
QQ/QR Quantitative|✓|Math courses
${rows}
Language Requirement|✓|French proficiency — SATISFIED
HC Forum|✓|Freshman Fall
IHS Honors Seminar|✓|Junior Fall
Honors Thesis|✓|Senior year
`;

const LEGEND = "✓✓ = well-positioned, direct path  |  ✓ = possible with some additional work  |  ○ = requires significant further study  |  — = not viable";

export const vfTabs: { name: string; text: string }[] = [
  {
    name: "OVERVIEW",
    text: `RUTGERS PATHWAY OPTIONS — GUIDE (read me first)
Emphasis of each tab, grouped by shape. All assume the same 'Antifragile' math ladder (311H → 312 → 411/412 → grad analysis) and Alexey's SOHS advanced standing. The pending 227/228 SPN only decides whether the physics MAJOR fits in 4 years or needs a 5th — it does not change the math spine.  The AI-via-math elective column (purple, cols H-L) now appears on vE and on every MATH-PRIMARY tab.

DOUBLE MAJOR / 5-YEAR  —  the 'everything' tier
Tab|Yrs|Emphasis — best if — tradeoff
5Y Dbl Major+MSMF|5Y|MAX CREDENTIAL. Both BS degrees + a Mathematical Finance master's (MSMF) in Year 5. Best if quant finance is the destination. Uses the honors 271-273 physics sequence (the one that clashes with 311H).
5Y Math+Phys NoSPN vC|5Y|'HAVE IT ALL' WITHOUT THE SPN. Full Math BS + Physics BS + complete SCOFT over 5 years, standard physics intro, analysis kept contiguous; inline 381 alternative. Best if Lath denies the 227/228 SPN. Trade: 5 years; sophomore physics is review.
5Y MathPhys DynSys vE|5Y|MATHEMATICAL PHYSICS + DEEP DIFFERENTIAL EQUATIONS / DYNAMICAL SYSTEMS — his stated interest ('small variations → huge changes' = bifurcations, chaos). Yr5 capstone 515+517; AI-via-math parallel column. Best if the theory+DE lean is real. Trade: math-dense early terms.
5Y ASE Eng Physics + Math|5Y|NEW IN vG. APPLIED MATH + ENGINEERING PHYSICS (the Prosperetti shape): B.S. Applied Sciences in Engineering + B.S. Math via the SAS/Engineering dual degree. Best for turbine metallurgy, hardware founder, applied physics. Trade: needs a School-to-School transfer; chemistry and engineering mechanics added.
5Y Three Roads (wide)|5Y|NEW IN vG. NO RUSH: physics (mechanics, statistical mechanics, quantum) + the Mathematical Finance certificate + the analysis ladder to measure theory, spread over five years. Main line skips E&M and labs (no physics degree); the variant column keeps them and adds the Physics B.S. Year 5 optional.
MATH-PRIMARY  —  4-year
Tab|Yrs|Emphasis — best if — tradeoff
4Y Math+PhysMinor|4Y|CLEANEST 4-YEAR QUANT / SCOFT. Math honors through grad courses; physics as a minor (no lab overhead). Fastest route to Karatzas & Shreve. Trade: physics is a minor; sophomore is the crunch (~52 hrs).
4Y Math+Quantum|4Y|MATH TOWARD QUANTUM COMPUTING / QUANTUM INFO. Swaps the finance tail (478/575/621) for Intermediate QM, Topology, CS Algorithms & Complexity, PDE. Analysis serves functional analysis. Best if quantum is the target.
4Y Math+Econ-Ling|4Y|MATH + BREADTH. Economics sequence (Micro/Macro/Econometrics) + Linguistics (his multilingual side); no physics past freshman. Best for quant finance or mathematical economics.
4Y Math+ME Bridge|4Y|MATH + APPLIED CONTINUUM MECHANICS. Mechanics of Solids, Fluid Mechanics, PDE (Navier-Stokes prep). Cleanest engineering bridge — no EE prereq battles. Trade: engineering courses are electives, not a major.
4Y Math+EE Bridge|4Y|MATH + SIGNALS / SYSTEMS. EE Principles I & II unlock Linear Systems & Signals. Toward signal processing, control theory, time-series. Trade: EE prereq chain; engineering as electives.
PHYSICS-PRIMARY  —  4-year
Tab|Yrs|Emphasis — best if — tradeoff
4Y Phys+MathMinor|4Y|PHYSICS-PRIMARY, GRAD-SCHOOL TRACK. Full professional physics BS incl. lab sequence; math minor + select SCOFT. Best for a physics PhD or quantum computing. Trade: math capped at minor-plus.
4Y Phys Std (no 271-273)|4Y|PHYSICS MAJOR THAT DODGES THE 311H CLASH. Standard analytical intro (123/124 → 227/228), labs INCLUDED, identical upper division. No SPN, no honors-intro label. Best if he wants the physics major but must protect 311H.
4Y Phys+Eng|4Y|PHYSICS + ENGINEERING CROSSOVER. Full physics BS + ME bridges (Mechanics of Solids, Fluids). Best for applied physics, quantum hardware, or engineering-physics PhD. Trade: heavy; engineering as electives.`,
  },
  {
    name: "5Y Dbl Major+MSMF",
    text: `5-Year Double Major (Math BS + Physics BS) + MSMF
Most ambitious path. Both BS degrees plus Master of Science in Mathematical Finance in Year 5. Full SCOFT with graduate credential.

${FR_HONORS(false)}
SOPHOMORE
Fall
Course|Credits|Hrs/Wk|Notes
640:477 — Probability (Ross)|3|10|SCOFT layer
640:350H — Honors Linear Algebra|3|10|Math honors req
750:381 — Classical Mechanics I (Taylor)|3|10|Physics major
750:273 — Modern Physics|3|8|Physics major
750:326 — Physics Computing & Expt|4|6|Physics major
Total|16|~44|

Spring
Course|Credits|Hrs/Wk|Notes
750:382 — Classical Mechanics II (Taylor)|3|10|Physics major
750:351 — Thermal Physics|3|10|Physics major
750:385 — Electromagnetism I|3|10|Physics major
640:403 — Complex Variables|3|9|SCOFT support
Intro Finance|3|5|Finance foundation
Total|15|~44|

JUNIOR
Fall
Course|Credits|Hrs/Wk|Notes
640:411 — Analysis I (Rudin)|3|18|SCOFT core
750:361 — Quantum Mechanics|3|12|Physics major
750:386 — Electromagnetism II|3|10|Physics major
640:478 — Stochastic Processes|3|8|SCOFT layer
IHS — Interdisciplinary Honors Seminar|3|5|HC requirement
Total|15|~53|

Spring
Course|Credits|Hrs/Wk|Notes
640:412 — Analysis II (Rudin)|3|18|SCOFT core
640:451 — Abstract Algebra I (Artin)|3|10|Math major
750:417 — Intermediate QM|3|10|Physics major
750:327 — Modern Instrumentation|3|6|Physics major
SAS Core Elective|3|5|SAS: HST or AH
Total|15|~49|

SENIOR
Fall
Course|Credits|Hrs/Wk|Notes
640:501 — Grad Real Analysis I|3|15|SCOFT core
640:575 — Grad Probability / Itô|3|12|SCOFT capstone
640:452 — Abstract Algebra II (Artin)|3|10|Math major
750:387 — Expt Modern Physics|3|8|Physics major
Honors Thesis|3|6|HC requirement
Total|15|~51|

Spring
Course|Credits|Hrs/Wk|Notes
643:621 — Mathematical Finance I|3|10|SCOFT capstone
640:502 — Grad Real Analysis II|3|15|SCOFT
750:388 — Expt Modern Physics II|3|8|Physics major
SAS Core Elective|3|5|SAS: CCO
Honors Thesis|3|6|HC requirement
Total|15|~44|

YEAR 5 (MSMF)
Fall
Course|Credits|Hrs/Wk|Notes
643:622 — Mathematical Finance II|3|10|MSMF
960:563 — Bayesian Data Analysis (Grad)|3|8|MSMF
750:611 — Statistical Mechanics (Grad)|3|10|Petition req
960:486 — Applied Statistical Learning|3|8|ML / MSMF
MS Thesis / Capstone|3|6|MSMF requirement
Total|15|~42|

Spring
Course|Credits|Hrs/Wk|Notes
960:463 — Regression Methods|3|8|MSMF
Elective (640:441 Topology or 750:406)|3|8|Depth
MS Thesis / Defense|3|6|MSMF requirement
Total|9|~22|

${HC_REQS(`NS Natural Science|✓|Physics courses
SCL Social Science|✓|Freshman Spring SAS elective
HST Historical Analysis|✓|Junior Spring SAS elective
AH Arts & Humanities|✓|Combined with SCL/HST elective
CCD Cross-Cultural|✓|Freshman Fall (1 cr)
CCO Contemporary Challenges|✓|Senior Spring SAS elective`)}
SCOFT PATHWAY COVERAGE
SCOFT Component|Present?|Timing
311H/312 Analysis foundation|✓|Freshman
477 Classical probability (Ross)|✓|Sophomore Fall
478 Stochastic processes|✓|Junior Fall
411/412 Analysis (Rudin)|✓|Junior
403 Complex variables|✓|Sophomore Spring
501/502 Grad real analysis (Folland)|✓|Senior + Yr 5
575 Grad probability / Itô|✓|Senior Fall
621/622 Mathematical Finance|✓|Senior Sp + Yr 5
563 Grad Bayesian inference|✓|Year 5
611 Statistical mechanics|✓|Year 5
COMPLETE — full Karatzas & Shreve pathway with MSMF credential

CAREER / GRADUATE PATHS ENABLED
Path|Viability|Notes
Pure Math PhD|✓✓|411/412+451/452+501/502; top-20
Applied Math PhD|✓✓|Full analysis + stochastic; top-20
SCOFT / Financial Math|✓✓|575+621/622+MSMF; top-tier
Quant Trading|✓✓|MSMF+Bayesian+ML; direct to industry
Quantum Math|✓✓|361+417+full analysis
Quantum Computing|✓✓|361+417+lin alg+CS
Applied Physics|✓✓|Full BS Physics + lab sequence
Theoretical Physics PhD|✓✓|361+417+611+strong math; top-20

${LEGEND}

NOTES
Highest reward. Jr Fall is peak (~53 hrs). Physics 611 requires petition. MSMF gives graduate credential that pure 5th-year coursework does not.`,
  },
  {
    name: "5Y Math+Phys NoSPN vC",
    text: `5-Year Math BS + Physics BS — No SPN  [vC: contiguous analysis + inline alternative]
Main line = vB (411/412 sophomore, 381/382 junior). Optional elective shown in amber. The alternative (381 → sophomore spring, 382 stays junior) is shown to the RIGHT, columns H–L. No SPN needed; 227/228 + labs sophomore. 227 fall sections mostly clear of 311H (avoid sec 05 & 24, Tue 3:50).

FRESHMAN
Fall
Course|Credits|Hrs/Wk|Notes
640:311H — Honors Analysis I|4|15|Analysis ladder begins
750:123 — Analytical Physics Ia|2|4|Std intro mechanics (no 271)
454|3|8|SAS: QQ
cs111|3|6|SAS: WCr/WCd; HC Writing
252|3|6|HC requirement
byrne|1|2|SAS: CCD
Total|16|41|

Spring
Course|Credits|Hrs/Wk|Notes
640:312 — Real Analysis II|0|0|Analysis ladder cont.
640:350H — Honors Linear Algebra|3|12|Math major
750:124 — Analytical Physics Ib|2|8|Std intro mechanics
477|3|10|Easy for Alexey
423|3|10|Math major req
SAS Core Elective|3|5|SAS: SCL or AH
Total|14|45|

SOPHOMORE
Fall
Course|Credits|Hrs/Wk|Notes
640:411 — Analysis I (Rudin)|3|18|CONTIGUOUS with 312 — no gap
750:227 — Analytical Physics IIA (E&M)|3|8|Std intro E&M; avoid sec 05/24 (Tue 3:50 = 311H)
750:229 — Analytical Physics IIA Lab|1|3|Lab
640:477 — Probability (Ross)|3|10|SCOFT layer
Micro Economics|3|6|SAS: SCL
Total|13|~45|

OPTIONAL elective (not in total) — sophomore has room at 13 cr:
640:454 Combinatorics  (or 481 Math Stats / SAS core)|(3)|(8)|PLACEHOLDER → 16 cr if added

Spring
Course|Credits|Hrs/Wk|Notes
640:412 — Analysis II (Rudin)|3|18|Analysis ladder cont.»► ALTERNATIVE (vC): move 381 into Sophomore Spring
750:228 — Analytical Physics IIB|3|8|Std intro E&M II; unlocks 361»Soph Spring: ADD 750:381 Classical Mechanics I (10 hrs); shift 640:403 Complex to Junior to hold the load.
750:230 — Analytical Physics IIB Lab|1|3|Lab»Junior: 382 stays in junior (moves to Junior Fall); 385/386 unchanged.
640:403 — Complex Variables|3|9|SCOFT support»GAIN: Alexey meets NEW physics in sophomore instead of only reviewing 227/228.
Intro Finance|3|5|Finance foundation»COST: 412 (18h) + 381 (10h) in the same term ≈ 50 hrs — a heavier sophomore spring.
Total|13|~43|»Keep the MAIN line (381 & 382 both junior) to protect the sophomore analysis crunch
»and let all upper-division physics ride together in junior year.
OPTIONAL elective (not in total):
Math or SAS-core elective|(3)|(6)|PLACEHOLDER → 16 cr if added

JUNIOR
Fall
Course|Credits|Hrs/Wk|Notes
750:381 — Classical Mechanics I (Taylor)|3|10|MAIN LINE: taken with 411/412 maturity  [see ALT →]
750:385 — Electromagnetism I|3|10|Pairs with mechanics (field theories)
750:326 — Physics Computing & Expt|4|6|Physics major
640:451 — Abstract Algebra I (Artin)|3|10|Math major
IHS — Interdisciplinary Honors Seminar|3|5|HC requirement
Total|16|~41|

Spring
Course|Credits|Hrs/Wk|Notes
750:382 — Classical Mechanics II (Taylor)|3|10|Physics major (stays junior in BOTH options)
750:386 — Electromagnetism II|3|10|Physics major
750:351 — Thermal Physics|3|10|Physics major; stat-mech prep
750:327 — Modern Instrumentation|3|6|Physics major
SAS Core Elective|3|5|SAS: AH
Total|15|~41|

SENIOR
Fall
Course|Credits|Hrs/Wk|Notes
750:361 — Quantum Mechanics & Atomic Physics|3|12|Physics core (prereq 228 + Calc IV)
750:417 — Intermediate QM|3|10|Physics elective (bold-list)
750:387 — Expt Modern Physics|3|8|Physics senior lab
640:478 — Stochastic Processes|3|8|SCOFT layer
SAS Core Elective|3|5|SAS: HST
Total|15|~43|

Spring
Course|Credits|Hrs/Wk|Notes
640:452 — Abstract Algebra II (Artin)|3|10|Math major
750:421 — Mathematical Physics (PDE)|3|10|Physics methods (421/423 req)
750:388 — Expt Modern Physics II|3|8|Physics lab
640:428 — Graph Theory (or 354 Lin. Opt.)|3|8|Math elective / ML bridge
SAS Core Elective|3|5|SAS: CCO
Total|15|~41|

YEAR 5
Fall
Course|Credits|Hrs/Wk|Notes
640:501 — Grad Real Analysis I|3|15|SCOFT core (Folland)
640:575 — Grad Probability / Itô|3|12|SCOFT capstone
643:621 — Mathematical Finance I|3|10|SCOFT capstone
750:495 — Honors Research I + thesis|3|6|DEPT PHYSICS HONORS + HC thesis
Free / SAS Elective|3|5|
Total|15|~48|

Spring
Course|Credits|Hrs/Wk|Notes
640:502 — Grad Real Analysis II|3|15|SCOFT
643:622 — Mathematical Finance II|3|10|SCOFT capstone
750:406 — Solid State Physics (elective)|3|8|Physics elective (bold-list)
750:496 — Honors Research II + seminar|3|6|DEPT PHYSICS HONORS + HC thesis
Total|12|~39|`,
  },
  {
    name: "5Y MathPhys DynSys vE",
    text: `5-Year Math BS + Physics BS — Mathematical Physics / Dynamical Systems  [vE]
'Math with strong theoretical physics.' Same double-major spine as vC, electives RE-WEIGHTED toward differential equations & dynamical systems (green = the DE thread: 'small variations → huge changes' = bifurcations, chaos). Year 5 is a dynamical-systems/PDE capstone (515+517) instead of finance. AI-via-math electives in the parallel column (H–L). No SPN needed; compresses toward 4 yrs if the SPN lands.

FRESHMAN
Fall
Course|Credits|Hrs/Wk|Notes»${AI_COL[0]}
640:311H — Honors Analysis I|4|15|Analysis spine begins»${AI_COL[1]}
750:123 — Analytical Physics Ia|2|8|Std intro mechanics (no 271)»${AI_COL[2]}
960:211 — Statistics I|3|8|SAS: QQ»${AI_COL[3]}
355:103 — Exposition & Argument|3|7|SAS: WCr/WCd; HC Writing»640:481 Math Theory of Statistics — prereq: 477 (already in plan). Statistical-learning-theory base.
HC Forum|3|4|HC requirement»${AI_COL[5]}
Cross-Cultural Competency|1|1|SAS: CCD»${AI_COL[6]}
Total|16|~43|»${AI_COL[7]}
»HOW TO USE: swap finance (621/622) or an SAS elective for 354 + one more. 354 is the best single add if AI lean is real.
Spring
Course|Credits|Hrs/Wk|Notes
640:312 — Real Analysis II|3|12|Analysis spine
640:292 — Honors Differential Equations|4|10|DE THREAD STARTS: proof-based ODE; take graded (proficiency-out 252)
750:124 — Analytical Physics Ib|2|8|Std intro mechanics
198:111 — Intro to CS (Java)|3|4|Only required CS — no C++
SAS Core Elective|3|5|SAS: SCL or AH
Total|15|~39|

SOPHOMORE
Fall
Course|Credits|Hrs/Wk|Notes
640:411 — Analysis I (Rudin)|3|18|CONTIGUOUS with 312 — no gap
640:350H — Honors Linear Algebra|3|10|Math major
750:227 — Analytical Physics IIA (E&M)|3|8|Std intro E&M; avoid sec 05/24 (Tue 3:50 = 311H)
750:229 — Analytical Physics IIA Lab|1|3|Lab
Micro Economics|3|6|SAS: SCL
Total|13|~45|

Spring
Course|Credits|Hrs/Wk|Notes
640:412 — Analysis II (Rudin)|3|18|Analysis spine
750:228 — Analytical Physics IIB|3|8|Std intro E&M II; unlocks 361
750:230 — Analytical Physics IIB Lab|1|3|Lab
640:477 — Probability (Ross)|3|10|Gates 478/481
Intro Finance|3|5|Finance foundation (swappable — see notes)
Total|13|~44|

JUNIOR
Fall
Course|Credits|Hrs/Wk|Notes
750:381 — Classical Mechanics I (Taylor)|3|10|Lagrangian/Hamiltonian dynamics = DE thread's physical face
750:385 — Electromagnetism I|3|10|Physics major (field theory)
750:326 — Physics Computing & Expt|4|6|Physics major
640:451 — Abstract Algebra I (Artin)|3|10|Math major
IHS — Interdisciplinary Honors Seminar|3|5|HC requirement
Total|16|~41|

Spring
Course|Credits|Hrs/Wk|Notes
750:382 — Classical Mechanics II (Taylor)|3|10|Physics major
750:386 — Electromagnetism II|3|10|Physics major
640:423 — Elementary PDE (Strauss)|3|9|DE THREAD + satisfies physics 421/423 methods req
750:351 — Thermal Physics|3|10|Physics major
SAS Core Elective|3|5|SAS: AH
Total|15|~44|

SENIOR
Fall
Course|Credits|Hrs/Wk|Notes
750:361 — Quantum Mechanics & Atomic Physics|3|12|Physics core (Schrödinger PDE)
750:417 — Intermediate QM|3|10|Physics elective (bold-list)
750:387 — Expt Modern Physics|3|8|Physics senior lab
640:478 — Stochastic Processes|3|8|Prob layer (needs 477)
SAS Core Elective|3|5|SAS: HST
Total|15|~43|

Spring
Course|Credits|Hrs/Wk|Notes
640:452 — Abstract Algebra II (Artin)|3|10|Math major
640:403 — Complex Variables|3|9|Math-physics (contour methods)
750:388 — Expt Modern Physics II|3|8|Physics lab
640:428 — Graph Theory (or 481 Math Stats)|3|8|Math elective
SAS Core Elective|3|5|SAS: CCO
Total|15|~40|

YEAR 5  —  dynamical-systems / PDE capstone
Fall
Course|Credits|Hrs/Wk|Notes
640:501 — Grad Real Analysis I|3|15|Analysis spine (Folland)
640:515 — Grad ODE / Dynamical Systems|3|12|THE CROWN: bifurcations, stable/unstable manifolds, CHAOS
750:495 — Honors Research I + thesis|3|6|DEPT PHYSICS HONORS + HC thesis
750:611 — Statistical Mechanics (Grad)|3|10|Physics grad (petition)
Free / SAS Elective|3|5|
Total|15|~48|

Spring
Course|Credits|Hrs/Wk|Notes
640:502 — Grad Real Analysis II|3|15|Analysis spine
640:517 — Grad PDE I (Evans)|3|12|Math-physics PDE: wave/heat/Schrödinger, Sobolev
750:496 — Honors Research II + seminar|3|6|DEPT PHYSICS HONORS + HC thesis
750:406 — Solid State Physics (elective)|3|8|Physics elective (bold-list)
Total|12|~41|

DIFFERENTIAL-EQUATIONS / DYNAMICAL-SYSTEMS SPINE  (Alexey's 'small variations → huge changes')
640:292 Honors ODE|||Fr Spring — proof-based ODE; the entry point
640:423 Elementary PDE|||Jr Spring — heat/wave/Laplace; also the physics methods req
750:381/382 Classical Mechanics|||Junior — Hamiltonian dynamics = the physics of the same math
640:515 Grad ODE / Dynamical Systems|||Yr5 Fall — BIFURCATIONS, manifolds, CHAOS (computer-verified proofs)
640:517 Grad PDE|||Yr5 Spring — wave/heat/Schrödinger, Sobolev spaces

NOTES
Mathematical physics = Math BS + Physics BS with math electives re-weighted to ODE/PDE/dynamical systems. Methods course is 640:423 (NOT 750:421 — correction); 423 also satisfies the physics 421/423 requirement. Year 5 swaps the finance capstone (621/622) for the dynamical-systems capstone (515+517); put finance back if the quant lean returns. Freshman spring & sophomore fall are the math-dense terms. CS: only 198:111 required; AI-via-math column uses Python/PyTorch/Lean, never C++. ~145 cr.`,
  },
  {
    name: "4Y Math+PhysMinor",
    text: `4-Year Math BS (Honors) + Physics Minor
SCOFT-optimized. Full math honors through graduate courses. Physics minor provides QM/mechanics foundation without lab-sequence overhead. Cleanest 4-year path to Karatzas & Shreve.

${FR_HONORS(true)}
SOPHOMORE
Fall
Course|Credits|Hrs/Wk|Notes
640:411 — Analysis I (Rudin)|3|18|SCOFT — accelerated
640:350H — Honors Linear Algebra|3|10|Math honors req
750:381 — Classical Mechanics I (Taylor)|3|10|Physics minor
750:273 — Modern Physics|3|8|Physics minor
Micro Economics|3|6|SAS: SCL
Total|15|~52|

Spring
Course|Credits|Hrs/Wk|Notes
640:412 — Analysis II (Rudin)|3|18|SCOFT core
640:477 — Probability (Ross)|3|10|SCOFT layer
750:382 — Classical Mechanics II (Taylor)|3|10|Physics minor
750:351 — Thermal Physics|3|10|Stat mech prep
Intro Finance|3|5|Finance foundation
Total|15|~53|

JUNIOR
Fall
Course|Credits|Hrs/Wk|Notes
640:451 — Abstract Algebra I (Artin)|3|10|Math major
750:361 — Quantum Mechanics|3|12|Physics minor + quantum
640:403 — Complex Variables|3|9|SCOFT support
IHS — Interdisciplinary Honors Seminar|3|5|HC requirement
SAS Core Elective|3|5|SAS: AH
Total|15|~41|

Spring
Course|Credits|Hrs/Wk|Notes
640:452 — Abstract Algebra II (Artin)|3|10|Math major
640:478 — Stochastic Processes|3|8|SCOFT layer
750:385 — Electromagnetism I|3|10|Physics minor depth
SAS Core Elective|3|5|SAS: HST
Ling 201 or Macro Economics|3|6|Elective / SAS
Total|15|~39|

SENIOR
Fall
Course|Credits|Hrs/Wk|Notes
640:501 — Grad Real Analysis I|3|15|SCOFT core
640:575 — Grad Probability / Itô|3|12|SCOFT capstone
960:563 — Bayesian Data Analysis|3|8|SCOFT support
Honors Thesis|3|6|HC requirement
SAS Core Elective|3|5|SAS: CCO
Total|15|~46|

Spring
Course|Credits|Hrs/Wk|Notes
643:621 — Mathematical Finance I|3|10|SCOFT capstone
640:502 — Grad Real Analysis II|3|15|SCOFT
Honors Thesis|3|6|HC requirement
Elective|3|5|Ling, Econ, or Math
Total|12|~36|

${HC_REQS(`NS Natural Science|✓|Physics courses
SCL Social Science|✓|Micro Econ (Soph Fall)
HST Historical Analysis|✓|Junior Spring SAS
AH Arts & Humanities|✓|Junior Fall SAS
CCD Cross-Cultural|✓|Freshman Fall (1 cr)
CCO Contemporary Challenges|✓|Senior Fall SAS`)}
SCOFT PATHWAY COVERAGE
SCOFT Component|Present?|Timing
311H/312 Analysis foundation|✓|Freshman
477 Classical probability (Ross)|✓|Sophomore Spring
478 Stochastic processes|✓|Junior Spring
411/412 Analysis (Rudin)|✓|Sophomore (accelerated)
403 Complex variables|✓|Junior Fall
501/502 Grad real analysis|✓|Senior
575 Grad probability / Itô|✓|Senior Fall
621 Mathematical Finance I|✓|Senior Spring
563 Grad Bayesian|✓|Senior Fall
611 Statistical mechanics|✗|Not included
COMPLETE — full Karatzas & Shreve in 4 years

CAREER / GRADUATE PATHS ENABLED
Path|Viability|Notes
Pure Math PhD|✓✓|411/412+451/452+501/502; top-20
Applied Math PhD|✓✓|Analysis+stochastic+complex
SCOFT / Financial Math|✓✓|Full SCOFT; strongest 4Y path
Quant Trading|✓✓|575+621+Bayesian+CS; direct
Quantum Math|✓|361 QM; needs grad QM for depth
Quantum Computing|○|Only one QM course
Applied Physics|○|Minor only; no lab sequence
Theoretical Physics PhD|○|Insufficient physics depth`,
  },
  {
    name: "4Y Phys+MathMinor",
    text: `4-Year Physics BS (Professional) + Math Minor
Physics-primary with full professional track including lab sequence. Math minor plus selected SCOFT courses. Best for physics PhD or quantum computing.

${FR_HONORS(false)}
SOPHOMORE
Fall
Course|Credits|Hrs/Wk|Notes
640:350H — Honors Linear Algebra|3|10|Math minor
640:477 — Probability (Ross)|3|10|SCOFT layer
750:381 — Classical Mechanics I (Taylor)|3|10|Physics major
750:273 — Modern Physics|3|8|Physics major
Intro Finance|3|5|
Total|15|~43|

Spring
Course|Credits|Hrs/Wk|Notes
750:382 — Classical Mechanics II (Taylor)|3|10|Physics major
750:351 — Thermal Physics|3|10|Physics major
750:385 — Electromagnetism I|3|10|Physics major
640:403 — Complex Variables|3|9|SCOFT + physics math
SAS Core Elective|3|5|SAS: AH
Total|15|~44|

JUNIOR
Fall
Course|Credits|Hrs/Wk|Notes
750:361 — Quantum Mechanics|3|12|Physics core
750:386 — Electromagnetism II|3|10|Physics major
750:326 — Physics Computing & Expt|4|6|Physics major
640:478 — Stochastic Processes|3|8|SCOFT layer
IHS — Interdisciplinary Honors Seminar|3|5|HC requirement
Total|16|~41|

Spring
Course|Credits|Hrs/Wk|Notes
750:417 — Intermediate QM|3|10|Physics QM depth
750:327 — Modern Instrumentation|3|6|Physics major
750:387 — Expt Modern Physics|3|8|Physics lab req
SAS Core Elective|3|5|SAS: HST
Ling 201 or Micro Economics|3|6|SAS or elective
Total|15|~35|

SENIOR
Fall
Course|Credits|Hrs/Wk|Notes
640:575 — Grad Probability / Itô|3|12|SCOFT — by petition
750:421 — Math Physics (PDE)|3|10|Physics elective
750:388 — Expt Modern Physics II|3|8|Physics lab
Honors Thesis|3|6|HC requirement
SAS Core Elective|3|5|SAS: CCO
Total|15|~41|

Spring
Course|Credits|Hrs/Wk|Notes
643:621 — Mathematical Finance I|3|10|SCOFT capstone
750:611 — Stat Mechanics (Grad)|3|10|Physics grad; petition
750:406 — Solid State or elective|3|8|Physics elective
Honors Thesis|3|6|HC requirement
Total|12|~34|

${HC_REQS(`NS Natural Science|✓|Physics courses
SCL Social Science|✓|Fr Spring + Jr Spring
HST Historical Analysis|✓|Junior Spring SAS
AH Arts & Humanities|✓|Sophomore Spring SAS
CCD Cross-Cultural|✓|Freshman Fall (1 cr)
CCO Contemporary Challenges|✓|Senior Fall SAS`)}
SCOFT PATHWAY COVERAGE
SCOFT Component|Present?|Timing
311H/312 Analysis foundation|✓|Freshman
477 Classical probability (Ross)|✓|Sophomore Fall
478 Stochastic processes|✓|Junior Fall
411/412 Analysis (Rudin)|✗|NOT INCLUDED — gap
403 Complex variables|✓|Sophomore Spring
501/502 Grad real analysis|✗|NOT INCLUDED
575 Grad probability / Itô|✓|Senior Fall (petition)
621 Mathematical Finance I|✓|Senior Spring
563 Grad Bayesian|✗|Not included
611 Statistical mechanics|✓|Senior Spring (petition)
PARTIAL — probability spine present but measure theory (411/412, 501/502) absent. Full SCOFT requires grad school.

CAREER / GRADUATE PATHS ENABLED
Path|Viability|Notes
Pure Math PhD|○|No 411/412 or 451/452; not viable
Applied Math PhD|○|Insufficient analysis depth
SCOFT / Financial Math|✓|Has prob/stochastic; needs measure theory via grad
Quant Trading|✓|575+621; firms value physics PhDs
Quantum Math|✓✓|361+417+strong analysis foundation
Quantum Computing|✓✓|361+417+326 computing+lin alg
Applied Physics|✓✓|Full BS Physics with lab sequence
Theoretical Physics PhD|✓✓|361+417+611+full BS; top-20

${LEGEND}

NOTES
Best physics path in 4 years. Full professional BS with lab sequence (326+327+387+388). Math minor: 311H+312+252+350H+477 well above min. SCOFT incomplete — missing Rudin means 575/621 rest on weaker foundations. 611 by petition (361+351+381 satisfy actual instructor req). Consider adding 411 as elective if bandwidth permits.`,
  },
  {
    name: "XXXX4Y Phys Std (no 271-273)",
    text: `4-Year Physics BS (Professional) — Standard Intro (No Honors 271-273) plus math
Same professional physics BS, reached WITHOUT the honors 271/272/273 sequence (resolves the 311H Fall clash). Uses the department's published Standard analytical sequence 123/124 -> 227/228 with labs 229/230 INCLUDED. Upper division (381/382, 385/386, 361, 326/327, 351, 387/388) is identical to the honors track. Departmental Honors in Physics is earned via 495/496 senior research + thesis, independent of which intro sequence was used.

FRESHMAN
Fall
Course|Credits|Hrs/Wk|Notes
640:311H - Honors Analysis I|4|25|PROTECTED - drives whole math ladder
750:123 - Analytical Physics Ia|2|3|Standard intro (replaces 271); many sections - no 311H clash
|0|0|SAS: QQ»379
byrne seminar|1|1|
math 252 diff eq|3|6|»477 · 350h · ?
math 454|3|6|
198:111 - Intro to CS (Java)|4|6|Math major req
Total|17|47|

Spring
Course|Credits|Hrs/Wk|Notes

750:124 - Analytical Physics Ib|2|4|Standard intro (replaces 272)»math 481 is missing · needs 477
350h|3|12|350h? 477?»mon wed · 2-320 · cs 112?
477|3|7|»many sections · 423?
SAS Core Elective (social sci / humanities)|3|5|SAS: SCL or AH»statics?
423?|3|10|»mon thu · 1210-130
cs112?||||»many sections
HUMANITIES 2|3|6|
Intro Accounting (pass/fail)|0|0|Finance foundation»432????
Total|17|44|NEED 12 CREDITS MIN???

SOPHOMORE
Fall
Course|Credits|Hrs/Wk|Notes
|0|0|Math honors»mon wed · 2-320
640:411REAL ANALYSIS RUDIN|3|20|SCOFT layer»tue-thu · 2-330
750:227 - Analytical Physics IIA (E&M)|3|6|Standard intro E&M (replaces 273 content)
750:229 - Analytical Physics IIA Lab|1|3|LAB - included»math 481 is missing · needs 477
750:381 - Classical Mechanics I (Taylor)|3|10|Physics major; coreq Calc III done»mon thu · 1210-130
core???
Intro Finance|0|0|Finance foundation»out
Total|10|39|

Spring
Course|Credits|Hrs/Wk|Notes
750:228 - Analytical Physics IIB|3|6|Standard intro E&M II; unlocks 361
750:230 - Analytical Physics IIB Lab|1|3|LAB - included
750:382 - Classical Mechanics II (Taylor)|3|10|Physics major
750:351 - Thermal Physics|3|10|Physics major
412|3|20|Physics math + SCOFT
||0|
SAS Core Elective|0|0|SAS: AH
|math 403??||
Total|16|49|

JUNIOR
Fall
Course|Credits|Hrs/Wk|Notes
750:361 - Quantum Mechanics & Atomic Physics|3|12|Physics core (prereq 228 + Calc IV)»math 481 is missing
750:385 - Electromagnetism I|3|10|Physics major; analysis pays off here
750:326 - Physics Computing & Expt|4|6|Physics major
640:478 - Stochastic Processes|3|8|SCOFT layer
IHS - Interdisciplinary Honors Seminar|3|5|HC requirement
math 451?|3|20|
Total|19|61|

Spring
Course|Credits|Hrs/Wk|Notes
750:386 - Electromagnetism II|3|10|Physics major
750:417 - Intermediate QM|3|10|Physics elective (bold-list)
750:327 - Modern Instrumentation|3|6|Physics major
750:387 - Expt Modern Physics|3|8|Physics senior lab req
SAS Core Elective|3|5|SAS: HST
math 452|3|20|
Total|18|59|

SENIOR
Fall
Course|Credits|Hrs/Wk|Notes
640:575 - Grad Probability / Ito|3|12|SCOFT - by petition
750:421 - Mathematical Physics (PDE)|3|10|Physics methods (satisfies 421/423)
750:388 - Expt Modern Physics II|3|8|Physics lab
750:495 - Honors Research I + thesis|3|6|DEPT PHYSICS HONORS + HC thesis
SAS Core Elective|3|5|SAS: CCO
Total|15|~41|

Spring
Course|Credits|Hrs/Wk|Notes
643:621 - Mathematical Finance I|3|10|SCOFT capstone
750:611 - Statistical Mechanics (Grad)|3|10|Physics grad; petition
750:406 - Solid State Physics (elective)|3|8|Physics elective (bold-list)
750:496 - Honors Research II + seminar|3|6|DEPT PHYSICS HONORS + HC thesis
Total|12|~34|

PHYSICS MAJOR - REQUIREMENT COVERAGE (Professional Option, Standard Intro)
Requirement|Met?|How / When
Intro sequence (123-124, 227-228)|✓|Fr + Soph - replaces 271-273
Intro labs (229, 230)|✓|Sophomore - the labs, included
Mechanics 381-382|✓|Sophomore Fall + Spring
Electromagnetism 385-386|✓|Junior Fall + Spring
Quantum 361 (+417 depth)|✓|Junior
Thermal Physics 351|✓|Sophomore Spring
Computing/Instr 326, 327|✓|Junior
Senior lab 387 (+388)|✓|Junior Spring + Senior Fall
Math methods (421 or 423)|✓|421 - Senior Fall
3 electives, >=1 bold-list|✓|417 + 406 + 421 (two bold)
Honors research 495-496 + thesis|✓|Senior year - the honors mechanism

HOW HONORS IN PHYSICS IS EARNED (independent of intro sequence)
Departmental Honors: chair invites strong majors by end of junior year; candidate takes 01:750:495-496 (2-sem research), writes a thesis, and gives a seminar (or takes two grad physics courses). Judged on the thesis, overall physics performance, and faculty recs. The 271-273 honors INTRO sequence is NOT a factor - dropping it costs nothing toward honors. Action: land a research group by junior year; request SPNs from upd@physics.rutgers.edu for early 381/385/361 entry (311H/312H is more than enough justification).

NOTES
Labs are IN: 229 + 230 replace the honors labs 275/276. Freshman physics (123/124) is only 2 cr each and lighter than 271/272, so Fall frees up cleanly around 311H. The two tracks merge by sophomore year - every upper-division course and elective is identical to the honors sheet. 385 shifted to Junior Fall (pairs with 386) to keep sophomore load sane after adding the labs. Total ~123 cr. 611 by petition (361/351/381 satisfy the instructor's real prereq).`,
  },
  {
    name: "4Y Math+Econ-Ling",
    text: `4-Year Math BS (Honors) + Economics & Linguistics
Math honors with intellectual breadth. Economics sequence (Micro, Macro, Econometrics) and Linguistics electives. No physics beyond freshman. Ideal for quant finance or mathematical economics.

${FR_HONORS(true)}
SOPHOMORE
Fall
Course|Credits|Hrs/Wk|Notes
640:411 — Analysis I (Rudin)|3|18|SCOFT — accelerated
640:350H — Honors Linear Algebra|3|10|Math honors req
220:102 — Micro Economics|3|6|Econ sequence
750:273 — Modern Physics|3|8|NS depth
SAS Core Elective|3|5|SAS: AH
Total|15|~47|

Spring
Course|Credits|Hrs/Wk|Notes
640:412 — Analysis II (Rudin)|3|18|SCOFT core
640:477 — Probability (Ross)|3|10|SCOFT layer
220:103 — Macro Economics|3|6|Econ sequence
Intro Finance|3|5|Finance foundation
615:201 — Intro to Linguistics|3|6|SAS: AH + breadth
Total|15|~45|

JUNIOR
Fall
Course|Credits|Hrs/Wk|Notes
640:451 — Abstract Algebra I (Artin)|3|10|Math major
640:403 — Complex Variables|3|9|SCOFT support
640:478 — Stochastic Processes|3|8|SCOFT layer
220:322 — Econometrics|3|8|Econ depth
IHS — Interdisciplinary Honors Seminar|3|5|HC requirement
Total|15|~40|

Spring
Course|Credits|Hrs/Wk|Notes
640:452 — Abstract Algebra II (Artin)|3|10|Math major
615:305 — Semantics (or 325 Syntax)|3|6|Linguistics depth
SAS Core Elective|3|5|SAS: HST
SAS Core Elective|3|5|SAS: CCO
Math elective or free|3|5|
Total|15|~31|

SENIOR
Fall
Course|Credits|Hrs/Wk|Notes
640:501 — Grad Real Analysis I|3|15|SCOFT core
640:575 — Grad Probability / Itô|3|12|SCOFT capstone
960:563 — Bayesian Data Analysis|3|8|SCOFT support
Honors Thesis|3|6|HC requirement
Total|12|~41|

Spring
Course|Credits|Hrs/Wk|Notes
643:621 — Mathematical Finance I|3|10|SCOFT capstone
640:502 — Grad Real Analysis II|3|15|SCOFT
Honors Thesis|3|6|HC requirement
Econ or free elective|3|5|
Total|12|~36|

${HC_REQS(`NS Natural Science|✓|Physics 271+272+273
SCL Social Science|✓|Micro+Macro Economics
HST Historical Analysis|✓|Junior Spring SAS
AH Arts & Humanities|✓|Soph Fall SAS + Ling 201
CCD Cross-Cultural|✓|Freshman Fall (1 cr)
CCO Contemporary Challenges|✓|Junior Spring SAS`)}
SCOFT PATHWAY COVERAGE
SCOFT Component|Present?|Timing
311H/312 Analysis foundation|✓|Freshman
477 Classical probability (Ross)|✓|Sophomore Spring
478 Stochastic processes|✓|Junior Fall
411/412 Analysis (Rudin)|✓|Sophomore (accelerated)
403 Complex variables|✓|Junior Fall
501/502 Grad real analysis|✓|Senior
575 Grad probability / Itô|✓|Senior Fall
621 Mathematical Finance I|✓|Senior Spring
563 Grad Bayesian|✓|Senior Fall
611 Statistical mechanics|✗|Not included (no physics)
COMPLETE — full Karatzas & Shreve. Economics adds quantitative breadth. Missing stat mech / physics connection.

CAREER / GRADUATE PATHS ENABLED
Path|Viability|Notes
Pure Math PhD|✓✓|411/412+451/452+501/502; top-20
Applied Math PhD|✓✓|Analysis+econometrics crossover
SCOFT / Financial Math|✓✓|Full SCOFT+econ foundation
Quant Trading|✓✓|SCOFT+Econ+Bayesian+CS; strongest quant
Quantum Math|○|Minimal QM (only 271/272)
Quantum Computing|○|No QM beyond intro
Applied Physics|—|No physics beyond freshman
Theoretical Physics PhD|—|No physics depth

${LEGEND}

NOTES
Best for quant finance or mathematical economics. Econ sequence (Micro→Macro→Econometrics) + SCOFT is prized by quant firms. Linguistics adds breadth and satisfies AH. Weakness: almost no physics — quantum paths closed without grad bridging. Add 750:361 QM as free elective if quantum optionality desired.`,
  },
  {
    name: "4Y Math+ME Bridge",
    text: `4-Year Math BS (Honors) + Mech. Engineering Bridges
Math honors with applied engineering: Mechanics of Solids, Fluid Mechanics, PDE. Continuum mechanics and Navier-Stokes preparation. Cleanest engineering bridge (no EE prereq battles).

${FR_HONORS(true)}
SOPHOMORE
Fall
Course|Credits|Hrs/Wk|Notes
640:411 — Analysis I (Rudin)|3|18|SCOFT — accelerated
640:350H — Honors Linear Algebra|3|10|Math honors req
750:381 — Classical Mechanics I (Taylor)|3|10|Physics + eng foundation
750:273 — Modern Physics|3|8|
SAS Core Elective|3|5|SAS: AH
Total|15|~51|

Spring
Course|Credits|Hrs/Wk|Notes
640:412 — Analysis II (Rudin)|3|18|SCOFT core
640:477 — Probability (Ross)|3|10|SCOFT layer
750:351 — Thermal Physics|3|10|Stat mech + eng thermo
14:440:222 — Mechanics of Solids|3|8|ME bridge — prereq for fluids
Intro Finance|3|5|Finance foundation
Total|15|~51|

JUNIOR
Fall
Course|Credits|Hrs/Wk|Notes
640:451 — Abstract Algebra I (Artin)|3|10|Math major
14:650:312 — Fluid Mechanics|3|10|ME bridge — Navier-Stokes
640:403 — Complex Variables|3|9|SCOFT support
IHS — Interdisciplinary Honors Seminar|3|5|HC requirement
Micro Economics|3|6|SAS: SCL
Total|15|~40|

Spring
Course|Credits|Hrs/Wk|Notes
640:478 — Stochastic Processes|3|8|SCOFT layer
640:421 — PDE|3|10|Math + eng crossover
750:361 — Quantum Mechanics|3|12|Physics depth
SAS Core Elective|3|5|SAS: HST
SAS Core Elective|3|5|SAS: CCO
Total|15|~40|

SENIOR
Fall
Course|Credits|Hrs/Wk|Notes
640:501 — Grad Real Analysis I|3|15|SCOFT core
640:575 — Grad Probability / Itô|3|12|SCOFT capstone
Honors Thesis|3|6|HC requirement
Elective (eng or math)|3|6|
Total|12|~39|

Spring
Course|Credits|Hrs/Wk|Notes
643:621 — Mathematical Finance I|3|10|SCOFT capstone
640:502 — Grad Real Analysis II|3|15|SCOFT
Honors Thesis|3|6|HC requirement
Elective (Ling 201 or free)|3|5|
Total|12|~36|

${HC_REQS(`NS Natural Science|✓|Physics courses
SCL Social Science|✓|Micro Economics (Jr Fall)
HST Historical Analysis|✓|Junior Spring SAS
AH Arts & Humanities|✓|Sophomore Fall SAS
CCD Cross-Cultural|✓|Freshman Fall (1 cr)
CCO Contemporary Challenges|✓|Junior Spring SAS`)}
SCOFT PATHWAY COVERAGE
SCOFT Component|Present?|Timing
311H/312 Analysis foundation|✓|Freshman
477 Classical probability (Ross)|✓|Sophomore Spring
478 Stochastic processes|✓|Junior Spring
411/412 Analysis (Rudin)|✓|Sophomore (accelerated)
403 Complex variables|✓|Junior Fall
501/502 Grad real analysis|✓|Senior
575 Grad probability / Itô|✓|Senior Fall
621 Mathematical Finance I|✓|Senior Spring
563 Grad Bayesian|✗|Not included (no room)
611 Statistical mechanics|✗|Not included
COMPLETE — full Karatzas & Shreve. Engineering courses add applied dimension (PDE + fluids + continuum mech).

CAREER / GRADUATE PATHS ENABLED
Path|Viability|Notes
Pure Math PhD|✓✓|411/412+451+501/502; viable
Applied Math PhD|✓✓|Analysis+PDE+fluids; top path
SCOFT / Financial Math|✓✓|Full SCOFT in 4 years
Quant Trading|✓|SCOFT complete; less econ/Bayesian
Quantum Math|✓|361 QM present; needs grad QM
Quantum Computing|○|Only one QM course
Applied Physics|✓|ME bridges + physics minor level
Theoretical Physics PhD|○|Insufficient physics depth

${LEGEND}

NOTES
ME bridge is the cheapest eng path: Mech of Solids (3 cr) unlocks Fluid Mech. With PDE+Thermal, gives continuum mech profile. No 452 (traded for eng). No EE prereq battles. The 14:440:222→14:650:312 chain = 6 cr, 2 courses, no permission needed.`,
  },
  {
    name: "4Y Math+EE Bridge",
    text: `4-Year Math BS (Honors) + EE Bridges (Signals/Systems)
Math honors with signals/systems depth. EE Principles I & II to unlock Linear Systems & Signals. Bridges toward signal processing, control theory, time-series analysis.

${FR_HONORS(true)}
SOPHOMORE
Fall
Course|Credits|Hrs/Wk|Notes
640:411 — Analysis I (Rudin)|3|18|SCOFT — accelerated
640:350H — Honors Linear Algebra|3|10|Math honors req
14:332:221 — Principles of EE I|3|8|EE bridge — circuits
750:273 — Modern Physics|3|8|
SAS Core Elective|3|5|SAS: AH
Total|15|~49|

Spring
Course|Credits|Hrs/Wk|Notes
640:412 — Analysis II (Rudin)|3|18|SCOFT core
640:477 — Probability (Ross)|3|10|SCOFT layer
14:332:222 — Principles of EE II|3|8|EE bridge — Laplace/Fourier
Intro Finance|3|5|Finance foundation
SAS Core Elective|3|5|SAS: SCL
Total|15|~46|

JUNIOR
Fall
Course|Credits|Hrs/Wk|Notes
640:451 — Abstract Algebra I (Artin)|3|10|Math major
14:332:345 — Linear Systems & Signals|3|10|EE capstone
640:403 — Complex Variables|3|9|SCOFT support
IHS — Interdisciplinary Honors Seminar|3|5|HC requirement
Micro Economics|3|6|SAS: SCL
Total|15|~40|

Spring
Course|Credits|Hrs/Wk|Notes
640:478 — Stochastic Processes|3|8|SCOFT layer
640:421 — PDE|3|10|Fourier methods
750:361 — Quantum Mechanics|3|12|Physics depth
SAS Core Elective|3|5|SAS: HST
SAS Core Elective|3|5|SAS: CCO
Total|15|~40|

SENIOR
Fall
Course|Credits|Hrs/Wk|Notes
640:501 — Grad Real Analysis I|3|15|SCOFT core
640:575 — Grad Probability / Itô|3|12|SCOFT capstone
Honors Thesis|3|6|HC requirement
Elective (EE or math)|3|6|
Total|12|~39|

Spring
Course|Credits|Hrs/Wk|Notes
643:621 — Mathematical Finance I|3|10|SCOFT capstone
640:502 — Grad Real Analysis II|3|15|SCOFT
Honors Thesis|3|6|HC requirement
Elective (Ling 201 or free)|3|5|
Total|12|~36|

${HC_REQS(`NS Natural Science|✓|Physics courses
SCL Social Science|✓|Micro + Soph Spring SAS
HST Historical Analysis|✓|Junior Spring SAS
AH Arts & Humanities|✓|Sophomore Fall SAS
CCD Cross-Cultural|✓|Freshman Fall (1 cr)
CCO Contemporary Challenges|✓|Junior Spring SAS`)}
SCOFT PATHWAY COVERAGE
SCOFT Component|Present?|Timing
311H/312 Analysis foundation|✓|Freshman
477 Classical probability (Ross)|✓|Sophomore Spring
478 Stochastic processes|✓|Junior Spring
411/412 Analysis (Rudin)|✓|Sophomore (accelerated)
403 Complex variables|✓|Junior Fall
501/502 Grad real analysis|✓|Senior
575 Grad probability / Itô|✓|Senior Fall
621 Mathematical Finance I|✓|Senior Spring
563 Grad Bayesian|✗|Not included
611 Statistical mechanics|✗|Not included
COMPLETE — full Karatzas & Shreve. EE courses add signal processing / time-series dimension.

CAREER / GRADUATE PATHS ENABLED
Path|Viability|Notes
Pure Math PhD|✓|411/412+451+501/502; viable but no 452
Applied Math PhD|✓✓|Analysis+signals+PDE; control theory
SCOFT / Financial Math|✓✓|Full SCOFT in 4 years
Quant Trading|✓✓|SCOFT+signals (time series, filtering)
Quantum Math|✓|361 QM; needs grad QM
Quantum Computing|✓|361+EE circuits background
Applied Physics|○|Limited physics
Theoretical Physics PhD|○|Insufficient physics depth

${LEGEND}

NOTES
EE bridge is expensive: 221→222→345 = 9 cr (3 courses) before reaching signals. Tradeoff vs ME bridge (only 3 cr prereq). Payoff: 345 teaches Fourier/Laplace/transfer functions from engineering perspective. Directly relevant to quant finance (filtering, signal extraction). No 452 traded for EE. If departmental permission for 345 obtainable without 221/222, this plan becomes much cheaper — worth asking ECE.`,
  },
  {
    name: "4Y Phys+Eng",
    text: `4-Year Physics BS + Engineering Electives (ME/EE)
Full physics professional track with ME engineering bridges. Leverages physics prereqs to unlock Mechanics of Solids and Fluid Mechanics. Best for applied physics, quantum hardware, or engineering physics PhD.

${FR_HONORS(false)}
SOPHOMORE
Fall
Course|Credits|Hrs/Wk|Notes
640:350H — Honors Linear Algebra|3|10|Math minor
640:477 — Probability (Ross)|3|10|SCOFT layer
750:381 — Classical Mechanics I (Taylor)|3|10|Physics major
750:273 — Modern Physics|3|8|Physics major
Micro Economics|3|6|SAS: SCL
Total|15|~44|

Spring
Course|Credits|Hrs/Wk|Notes
750:382 — Classical Mechanics II (Taylor)|3|10|Physics major
750:351 — Thermal Physics|3|10|Physics major
750:385 — Electromagnetism I|3|10|Physics major
14:440:222 — Mechanics of Solids|3|8|ME bridge prereq
SAS Core Elective|3|5|SAS: AH
Total|15|~43|

JUNIOR
Fall
Course|Credits|Hrs/Wk|Notes
750:361 — Quantum Mechanics|3|12|Physics core
750:386 — Electromagnetism II|3|10|Physics major
750:326 — Physics Computing & Expt|4|6|Physics major
14:650:312 — Fluid Mechanics|3|10|ME bridge
IHS — Interdisciplinary Honors Seminar|3|5|HC requirement
Total|16|~43|

Spring
Course|Credits|Hrs/Wk|Notes
750:417 — Intermediate QM|3|10|Physics QM depth
750:327 — Modern Instrumentation|3|6|Physics major
750:387 — Expt Modern Physics|3|8|Physics lab req
640:478 — Stochastic Processes|3|8|SCOFT layer
SAS Core Elective|3|5|SAS: HST
Total|15|~37|

SENIOR
Fall
Course|Credits|Hrs/Wk|Notes
640:575 — Grad Probability / Itô|3|12|SCOFT — by petition
750:421 — Math Physics (PDE)|3|10|Physics+eng elective
750:388 — Expt Modern Physics II|3|8|Physics lab
Honors Thesis|3|6|HC requirement
SAS Core Elective|3|5|SAS: CCO
Total|15|~41|

Spring
Course|Credits|Hrs/Wk|Notes
643:621 — Mathematical Finance I|3|10|SCOFT capstone
750:611 — Stat Mechanics (Grad)|3|10|Physics grad; petition
750:406 — Solid State or elective|3|8|Physics elective
Honors Thesis|3|6|HC requirement
Total|12|~34|

${HC_REQS(`NS Natural Science|✓|Physics courses
SCL Social Science|✓|Micro Economics (Soph Fall)
HST Historical Analysis|✓|Junior Spring SAS
AH Arts & Humanities|✓|Sophomore Spring SAS
CCD Cross-Cultural|✓|Freshman Fall (1 cr)
CCO Contemporary Challenges|✓|Senior Fall SAS`)}
SCOFT PATHWAY COVERAGE
SCOFT Component|Present?|Timing
311H/312 Analysis foundation|✓|Freshman
477 Classical probability (Ross)|✓|Sophomore Fall
478 Stochastic processes|✓|Junior Spring
411/412 Analysis (Rudin)|✗|NOT INCLUDED — gap
403 Complex variables|✗|Not included (E&M covers some)
501/502 Grad real analysis|✗|NOT INCLUDED
575 Grad probability / Itô|✓|Senior Fall (petition)
621 Mathematical Finance I|✓|Senior Spring
563 Grad Bayesian|✗|Not included
611 Statistical mechanics|✓|Senior Spring (petition)
PARTIAL — probability spine present but measure theory absent. Full SCOFT requires grad school math courses.

CAREER / GRADUATE PATHS ENABLED
Path|Viability|Notes
Pure Math PhD|—|Insufficient math depth
Applied Math PhD|✓|PDE+fluids+eng; needs grad analysis
SCOFT / Financial Math|○|Partial; needs measure theory via grad
Quant Trading|✓|575+621; firms value physics PhDs
Quantum Math|✓✓|361+417+strong physics foundation
Quantum Computing|✓✓|361+417+326+lab skills; strongest
Applied Physics|✓✓|Full BS+fluids+solids; eng physics
Theoretical Physics PhD|✓✓|361+417+611+full BS; top-20

${LEGEND}

NOTES
Best for applied/engineering physics. ME bridge (Mech Solids→Fluids) leverages physics prereqs — no EE chain. Full lab sequence (326+327+387+388) essential for experimental PhD apps. 611 by petition (361+351+381 satisfy instructor req). No Rudin analysis — pure SCOFT/math PhD paths need grad coursework. Junior Fall is heaviest (~43 hrs with 4 technical courses).`,
  },
  {
    name: "4Y Math+Quantum",
    text: `4-Year Math BS (Honors) + Quantum Computing / Quantum Math
Math honors optimized for quantum paths. Swaps SCOFT tail (478/575/621) for quantum depth: Intermediate QM, Topology, CS Algorithms & Complexity, PDE. Analysis foundation (411/412/501/502) serves functional analysis. CS211 pulled to sophomore fall.

${FR_HONORS(true, "CS chain start")}
SOPHOMORE
Fall
Course|Credits|Hrs/Wk|Notes
640:411 — Analysis I (Rudin)|3|18|Accelerated; functional analysis prep
640:350H — Honors Linear Algebra|3|10|CRITICAL for QC — Hilbert spaces
198:211 — Data Structures|4|10|CS chain — prereq for Algorithms
750:273 — Modern Physics|3|8|Prereq context for QM
SAS Core Elective|3|5|SAS: AH
Total|16|~51|

Spring
Course|Credits|Hrs/Wk|Notes
640:412 — Analysis II (Rudin)|3|18|Convergence, interchange thms
640:477 — Probability (Ross)|3|10|Quantum measurement theory
198:344 — Design & Analysis of Algorithms|3|8|CS chain — quantum algorithms
Micro Economics|3|6|SAS: SCL
Intro Finance|3|5|Optional breadth
Total|15|~47|

JUNIOR
Fall
Course|Credits|Hrs/Wk|Notes
750:361 — Quantum Mechanics|3|12|Core — Dirac notation, Hilbert spaces
640:451 — Abstract Algebra I (Artin)|3|10|Group theory for quantum symmetries
640:403 — Complex Variables|3|9|Contour methods; QM applications
750:381 — Classical Mechanics I (Taylor)|3|10|Hamiltonian/Lagrangian → canonical quantization
IHS — Interdisciplinary Honors Seminar|3|5|HC requirement
SAS Core Elective|3|5|SAS: HST
Total|18|~51|

Spring
Course|Credits|Hrs/Wk|Notes
750:417 — Intermediate Quantum Mechanics|3|10|QM depth — perturbation, scattering
640:452 — Abstract Algebra II (Artin)|3|10|Representation theory — essential
640:441 — Topology|3|10|Topological QC, error correction
640:421 — PDE|3|10|Schrödinger eqn IS a PDE; math physics
SAS Core Elective|3|5|SAS: CCO
Ling 201 or elective|3|6|Breadth
Total|18|~51|

SENIOR
Fall
Course|Credits|Hrs/Wk|Notes
640:501 — Grad Real Analysis I|3|15|Functional analysis foundations
198:452 — Formal Languages & Automata|3|8|Complexity theory for QC
750:406 — Solid State Physics|3|8|Quantum hardware (swap CS if theory)
960:563 — Bayesian Data Analysis|3|8|Quantum ML, error correction stats
Honors Thesis|3|6|HC req — quantum topic ideal
Total|15|~45|

Spring
Course|Credits|Hrs/Wk|Notes
640:502 — Grad Real Analysis II|3|15|Spectral theory, operators
640:354 — Linear Optimization|3|8|QAOA, quantum optimization algorithms
Quantum research / independent study|3|8|Faculty in QC/QI group
Macro Economics or Ling 305|3|6|Breadth
Honors Thesis|3|6|HC requirement
Total|15|~43|

SAS CORE & HONORS COLLEGE REQUIREMENTS
Requirement|Met?|When / How
Writing (355:103)|✓|Freshman Fall
QQ/QR Quantitative|✓|Math courses
NS Natural Science|✓|Physics courses
SCL Social Science|✓|Micro Econ (Soph Sp) + Macro (Sr Sp)
HST Historical Analysis|✓|Junior Fall SAS
AH Arts & Humanities|✓|Sophomore Fall SAS
CCD Cross-Cultural|✓|Freshman Fall (1 cr)
CCO Contemporary Challenges|✓|Junior Spring SAS
Language Requirement|✓|French proficiency — SATISFIED
HC Forum|✓|Freshman Fall
IHS Honors Seminar|✓|Junior Fall
Honors Thesis|✓|Senior year — quantum topic

SCOFT PATHWAY COVERAGE
SCOFT Component|Present?|Timing
311H/312 Analysis foundation|✓|Freshman
477 Classical probability (Ross)|✓|Sophomore Spring
478 Stochastic processes|✗|DROPPED — slot used for CS344
411/412 Analysis (Rudin)|✓|Sophomore (accelerated)
403 Complex variables|✓|Junior Fall
501/502 Grad real analysis|✓|Senior (functional analysis emphasis)
575 Grad probability / Itô|✗|DROPPED — slot used for 421 PDE
621 Mathematical Finance I|✗|DROPPED — slot used for 406/354
563 Grad Bayesian|✓|Senior Fall (RECOVERED)
611 Statistical mechanics|✗|Not included
PARTIAL — analysis foundation complete (411/412, 501/502) and Bayesian present, but stochastic calculus / financial math tail absent. SCOFT completion would require grad courses.

CAREER / GRADUATE PATHS ENABLED
Path|Viability|Notes
Pure Math PhD|✓✓|411/412+451/452+501/502+441; top-20
Applied Math PhD|✓✓|Analysis+algebra+topology+PDE; strong
SCOFT / Financial Math|○|Missing 575/621; needs grad courses
Quant Trading|○|No stochastic calc or math finance
Quantum Math|✓✓|361+417+451/452+441+501/502+PDE; top-tier
Quantum Computing|✓✓|361+417+CS344/452+350H+441+354; strongest
Applied Physics|✓|361+417+381+406; no full physics BS
Theoretical Physics PhD|✓|Strong math; limited physics courses

✓✓ = well-positioned  |  ✓ = possible with work  |  ○ = requires significant further study  |  — = not viable

NOTES
Clean swap: SCOFT tail (478,575,621) out → quantum courses in (417,441,CS344,CS452,421 PDE). 381 Classical Mechanics added: Hamiltonian/Lagrangian formalism is literally what gets "quantized" — canonical quantization assumes this language. 421 PDE added: the Schrödinger equation IS a PDE; mathematical physics requires this. 563 Bayesian recovered: useful for quantum error correction statistical methods and quantum ML. 354 Linear Optimization added: directly relevant to QAOA and quantum optimization algorithms. Senior year: swap 406 Solid State for more CS if theory-focused. Honors thesis on quantum topic with Rutgers quantum researcher is highest-value PhD admissions activity. Physics minor satisfied by: 271,272,273,381,361,417,406 = well above minimum.`,
  },
{
    name: "5Y ASE Eng Physics + Math",
    text: `5-Year Dual Degree: B.S. Applied Sciences in Engineering (Engineering Physics) + B.S. Mathematics (SAS)  [new in vG]
Applied math + engineering physics: the Prosperetti shape (a mathematician-physicist inside an engineering school). Two diplomas from the SAS/School of Engineering five-year dual-degree program. Freshman year is Alexey's ACTUAL 2026-27 schedule. He stays in SAS + Honors College and applies for the School-to-School transfer into Engineering during sophomore year (not guaranteed; records reviewed). Strongest for turbine metallurgy, hardware/deep-tech founder, applied physics, and applied math PhD; keeps quant open.

FRESHMAN (actual 2026-27)
Fall
Course|Credits|Hrs/Wk|Notes
640:311H — Honors Analysis I|4|15|Analysis spine
640:252 — Differential Equations|3|4|Counts for the engineering 244 requirement
640:454 — Combinatorics|3|8|Math elective
750:123 — Analytical Physics Ia|2|4|Same intro physics engineers take
198:111 — Intro to Computer Science|4|6|Minimum CS 1 of 3
SAS Core|3|5|
Total|19|~42|

Spring
Course|Credits|Hrs/Wk|Notes
640:477 — Probability|3|10|Also unlocks 198:344
640:421 — Advanced Calculus for Engineering|3|9|Fourier/PDE — the engineering-math course
750:124 — Analytical Physics Ib|2|4|
198:112 — Data Structures|4|10|Minimum CS 2 of 3
640:350H — Honors Linear Algebra (or 403)|3|10|Math major
English / writing|3|6|SAS: WC
Total|18|~49|

SOPHOMORE  (apply for School-to-School transfer into Engineering this year)
Fall
Course|Credits|Hrs/Wk|Notes
640:411 — Analysis I (Rudin)|3|18|Analysis spine
750:227 — Analytical Physics IIA|3|8|ASE requirement
750:229 — Analytical Physics II Lab|1|3|ASE requirement
160:159 — General Chemistry for Engineers|3|6|Engineering first-year requirement he lacks
160:171 — Introduction to Experimentation|1|3|Engineering first-year lab
440:221 — Engineering Mechanics: Statics (or 440:291 Honors)|3|7|Engineering elective 1
Total|14|~45|

Spring
Course|Credits|Hrs/Wk|Notes
640:412 — Analysis II (Rudin)|3|18|Analysis spine
750:228 — Analytical Physics IIB|3|8|ASE requirement
750:230 — Analytical Physics II Lab|1|3|ASE requirement
160:160 — General Chemistry for Engineers II|3|6|Engineering first-year requirement
440:222 — Engineering Mechanics: Dynamics (or 440:292 Honors)|3|7|Engineering elective 2
220:102 — Intro to Microeconomics|3|5|ASE requirement; SAS: SCL
Total|16|~47|

JUNIOR  (now in the School of Engineering; ASE adviser approves the plan)
Fall
Course|Credits|Hrs/Wk|Notes
750:381 — Classical Mechanics I|3|10|Engineering-physics core
750:385 — Electromagnetism I|3|10|Engineering-physics core
635:203 — Intro to Materials Science & Engineering|3|7|Engineering elective 3; turbine-metallurgy lane
332:221 — Principles of Electrical Engineering I|3|7|Engineering elective 4
IHS — Interdisciplinary Honors Seminar|3|5|Honors College requirement
Total|15|~39|

Spring
Course|Credits|Hrs/Wk|Notes
750:382 — Classical Mechanics II|3|10|
750:386 — Electromagnetism II|3|10|
750:351 — Thermal Physics|3|10|Engineering-physics option lists thermal physics
650:291 — Mechanics of Materials|3|7|Engineering elective 5
650:312 — Fluid Mechanics|3|8|Engineering elective 6 (Navier-Stokes)
Total|15|~45|

SENIOR
Fall
Course|Credits|Hrs/Wk|Notes
750:361 — Quantum Mechanics|3|12|Option lists modern physics
635:362 — Physical Metallurgy|3|7|Engineering elective 7; turbine alloys
640:451 — Abstract Algebra I|3|10|Math BS requirement
650:351 — Thermodynamics|3|7|Engineering elective 8 (turbines)
198:344 — Algorithms|4|10|Minimum CS 3 of 3
Total|16|~46|

Spring
Course|Credits|Hrs/Wk|Notes
750:406 — Solid State Physics|3|8|Option lists solid-state physics
635:407 — Mechanical Properties of Materials|3|7|Engineering elective 9 (creep, fatigue)
332:222 — Principles of Electrical Engineering II|3|7|Engineering elective 10
640:423 — Elementary PDE|3|9|Option lists PDE; also math elective
615:201 — Intro to Linguistic Theory|3|6|Required H/SS minor (see notes)
Total|15|~37|

YEAR 5
Fall
Course|Credits|Hrs/Wk|Notes
640:501 — Graduate Real Analysis I|3|15|Analysis spine
640:478 — Stochastic Processes|3|8|Keeps quant open
750:387 — Experimental Modern Physics|3|8|Engineering-physics lab
Engineering-physics research / thesis I|3|8|With a faculty lab; also the Honors College thesis
615:325 — Semantics|3|6|Linguistics minor
Total|15|~45|

Spring
Course|Credits|Hrs/Wk|Notes
640:502 — Graduate Real Analysis II|3|15|Analysis spine
332:345 — Linear Systems & Signals|3|10|Engineering elective 11
Engineering-physics research / thesis II|3|8|Honors College thesis
615:350 — Pragmatics|3|6|Linguistics minor (common-knowledge reasoning)
Linguistics minor course|3|6|
Total|15|~45|

DUAL-DEGREE RULES (RUTGERS CATALOG)
Requirement|Met?|How
School-to-School transfer into Engineering|○|Apply sophomore year; not guaranteed
30 credits beyond the engineering B.S. alone|✓|5 years ≈ 160 credits
ASE: 10 engineering electives (3+ credits each)|✓|11 listed: 440:221/222, 635:203/362/407, 332:221/222/345, 650:291/312/351
ASE: 30 technical-elective credits|✓|Physics 381–406 + math electives
ASE: 12 H/SS credits + Micro 220:102|✓|Core, English, IHS, 220:102, linguistics
Technical SAS major → humanities/social-science minor|✓|Linguistics minor (check the course count with Linguistics)
Engineering first-year program (chemistry, intro engineering)|○|Chem 159/160/171 in sophomore year; ask whether 198:111/112 replace 440:101/102
Both diplomas conferred together|✓|End of year 5

CAREER / GRADUATE PATHS ENABLED
Path|Viability|Notes
Turbine metallurgy / materials (GE, Siemens Energy, Pratt)|✓✓|635:203/362/407 + thermo + fluids + solid state
Hardware / deep-tech founder|✓✓|Engineering degree + physics + math
Applied physics / quantum hardware|✓✓|361 + 406 + labs + EE
Applied Math PhD|✓✓|411/412 + 501/502 + PDE + fluids
Quant research / trading|✓|477/478 + analysis + algorithms; add 575 for SCOFT
Silicon Valley (engineering)|✓|Minimum CS + EE; add 198:440/461 for AI
Pure Math PhD|○|451 only; no 452
Theoretical Physics PhD|○|No 417 or grad physics

✓✓ = well-positioned  |  ✓ = possible with some additional work  |  ○ = requires significant further study / not yet secured

NOTES
Built for the version-G site, not in the vF workbook. Applied Sciences in Engineering is NOT ABET-accredited (no PE-license track); for industry R&D, graduate school or a startup that rarely matters. The Engineering Physics option is advised by the Physics department. Catalog guidance favors starting in Engineering, so talk to the SAS dean and the School of Engineering early in sophomore year. Engineering course numbers and titles were checked against the Fall 2026 / Spring 2027 Rutgers schedule; the exact ASE plan must be approved by the ASE adviser.`,
  },
  {
    name: "5Y Three Roads (wide)",
    text: `5-Year Wide Plan: physics + mathematical finance + analysis, without the squeeze  [new in vG]
The three roads into SCOFT spread over five years instead of two, so nothing interesting is sacrificed. MAIN LINE (left) = Math B.S. honors track + the heart of theoretical physics (mechanics, statistical mechanics, quantum) + the Mathematical Finance certificate, with NO physics degree: electricity & magnetism and the lab sequence are left out. RIGHT COLUMN = the variant that keeps E&M and the labs and earns the Physics B.S. as well. Sophomore year is physics-heavy (as already planned); finance moves to junior year. Year 5 is optional: every Math B.S. requirement is done by the end of year 4.

FRESHMAN (actual 2026-27)
Fall
Course|Credits|Hrs/Wk|Notes
640:311H — Honors Analysis I|4|15|Pure road, first dose
640:252 — Differential Equations|3|4|
640:454 — Combinatorics|3|8|
750:123 — Analytical Physics Ia|2|4|
198:111 — Intro to Computer Science|4|6|Minimum CS 1 of 3
SAS Core|3|5|
Total|19|~42|

Spring
Course|Credits|Hrs/Wk|Notes
640:477 — Probability|3|10|The real prerequisite for every road
640:421 — Advanced Calculus for Engineering|3|9|Fourier / PDE methods
750:124 — Analytical Physics Ib|2|4|
198:112 — Data Structures|4|10|Minimum CS 2 of 3
640:350H — Honors Linear Algebra (or 403)|3|10|If no seat: take it sophomore fall
English / writing|3|6|
Total|18|~49|

SOPHOMORE  —  the physics year
Fall
Course|Credits|Hrs/Wk|Notes»► VARIANT: KEEP E&M → ALSO EARN THE PHYSICS B.S.
640:411 — Mathematical Analysis I (Rudin)|3|18|Pure road (by permission). If no permission: 350H / 478 here, decide 411 again next year»Same as the main line, plus:
750:227 — Analytical Physics IIA|3|8|Unlocks Thermal Physics 351»ADD 750:229 lab (1 cr)
750:381 — Classical Mechanics I|3|10|Lagrangian / Hamiltonian mechanics
220:102 — Intro to Microeconomics|3|5|SAS core; useful for consulting and finance
SAS Core|3|5|
Total|15|~46|

Spring
Course|Credits|Hrs/Wk|Notes
640:412 — Mathematical Analysis II|3|18|Pure road»Same as the main line, plus:
750:228 — Analytical Physics IIB|3|8|Unlocks Quantum 361»ADD 750:230 lab (1 cr)
750:351 — Thermal Physics (statistical mechanics)|3|10|PHYSICS ROAD INTO SCOFT: random walks, entropy, diffusion
640:403 — Complex Variables|3|9|Spring only
SAS Core|3|5|
Total|15|~50|

JUNIOR  —  quantum + the finance certificate
Fall
Course|Credits|Hrs/Wk|Notes
640:451 — Abstract Algebra I|3|10|Honors track»REPLACE 750:464 with 750:385 Electromagnetism I (fall only)
750:361 — Quantum Mechanics & Atomic Physics|3|12|Fall only»(464 moves to senior fall)
640:485 — Introduction to Mathematical Finance|3|8|FINANCE ROAD starts. Fall only; no measure theory
750:464 — Mathematical Physics|3|9|Fall only; on his target list — can move up to sophomore fall
IHS — Interdisciplinary Honors Seminar|3|5|Honors College requirement
Total|15|~44|

Spring
Course|Credits|Hrs/Wk|Notes
640:452 — Abstract Algebra II|3|10|Honors track»REPLACE SAS Core with 750:386 Electromagnetism II (spring only)
750:382 — Classical Mechanics II|3|10|Spring only»(core moves to year 5)
640:489 — Computational Finance|3|8|THE MONTE CARLO COURSE. Spring only
640:490 — Topics in Mathematical Finance|3|8|Research project → certificate complete
SAS Core|3|5|
Total|15|~41|

SENIOR  —  depth, and the decision
Fall
Course|Credits|Hrs/Wk|Notes
640:501 — Graduate Real Analysis I|3|15|WHERE MEASURE THEORY IS TAUGHT»REPLACE the Explore elective with 750:326 Physics Computing (4 cr, fall)
640:478 — Stochastic Processes|3|8|Markov chains, Brownian motion»and take 750:464 here
198:344 — Algorithms|4|10|Minimum CS 3 of 3
640:481 — Mathematical Statistics|3|8|
Explore elective (logic, epistemology, cognitive science)|3|6|See the Explore page
Total|16|~47|

Spring
Course|Credits|Hrs/Wk|Notes
640:502 — Graduate Real Analysis II|3|15|Measure and integration, continued»REPLACE the free elective with 750:327 Modern Instrumentation (spring)
750:417 — Intermediate Quantum Mechanics|3|10|
640:423 — Elementary PDE|3|9|Heat equation = Black–Scholes
198:461 — Machine Learning (or 640:354 Linear Optimization)|3|8|AI / data option; 461 needs permission
Free / Explore elective|3|6|
Total|15|~48|
DECISION POINT: all Math B.S. honors requirements are complete here. Graduate now, or take year 5.

YEAR 5  —  optional capstone (choose by destination)
Fall
Course|Credits|Hrs/Wk|Notes
Graduate probability (course number to confirm)|3|12|Karatzas & Shreve level; needs 501»ADD 750:387 Experimental Modern Physics (fall)
16:958:587 — Advanced Simulation Methods|3|8|Statistics dept; graduate Monte Carlo»in place of 642:561
16:642:561 — Introduction to Mathematical Physics I|3|10|Or 640:517 Graduate PDE
Honors thesis I|3|6|With a professor: e.g. the fat-tail simulation experiments (see SCOFT page), written up
Free elective|3|5|
Total|15|~41|

Spring
Course|Credits|Hrs/Wk|Notes
750:611 — Statistical Mechanics (graduate)|3|10|By permission»ADD remaining physics elective(s); Physics B.S. complete
16:642:564 — Statistical Mechanics II: Non-equilibrium|3|10|Stochastic processes the physics way; by permission
Honors thesis II|3|6|
Free elective|3|5|
Total|12|~31|

WHERE EACH ROAD SITS IN THE FIVE YEARS
Road|Courses|Years
Physics|123/124 → 227/228 → 381/382 → 351 → 361 → 417 → 611, 642:564|1–5
Mathematical finance|477 → 485 → 489 + 490 (certificate) → 478, 481 → 958:587|1, 3–5
Pure analysis|311H → 411/412 → 501/502 → graduate probability|1–2, 4–5
Computing|198:111 → 112 → 344 (→ 461)|1, 4

WHAT IT OPENS
Path|Viability|Notes
Quant trading|✓✓|477 + certificate + Monte Carlo by end of junior year (internship recruiting)
Quant research|✓✓|Adds 481, 478, 501/502, simulation; year 5 makes a master's-level profile
Consulting — advanced analytics / deep-tech groups|✓✓|Math B.S. honors + physics + statistics + a thesis; micro included
PhD in probability / applied math|✓✓|411/412 + 451/452 + 501/502 + graduate probability + thesis
PhD in physics|✓ (main line) / ✓✓ (E&M variant)|Physics PhD programs expect E&M; choose the right column if this becomes the goal
Silicon Valley / AI|✓|Minimum CS + 461; add 198:440 for more
Founder|✓✓|Breadth across three fields

✓✓ = well-positioned  |  ✓ = possible with some additional work

NOTES
Built for the planner (vG), not in the vF workbook. Terms checked against the Fall 2026 / Spring 2027 Rutgers schedule: 411, 451, 361, 381, 385, 485, 464, 501 are fall; 412, 452, 351, 382, 386, 403, 489, 490, 502, 611 are spring. Leaving out E&M (385–386) and the labs is what frees the room; it also means no Physics B.S. — check with the Physics department what the main line earns as a minor. If the 411 permission does not come in sophomore fall, nothing breaks: the physics and finance roads continue, and 411 can be asked for again the next fall (501 then moves to year 5). Graduate courses (501/502, 611, 642, 958) need instructor or department permission.`,
  },
];
