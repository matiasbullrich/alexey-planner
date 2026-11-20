// Degree programs, named plans and goals.
// Sources: Rutgers math honors-track and majors pages, School of Engineering catalog,
// the rutgers_schedule_alternatives_vF workbook (OVERVIEW tab) and the Career_Map_Applied_Math sheet.

export type Program = {
  id: string;
  name: string;
  degree: "B.S." | "B.A." | "B.S. (Engineering)";
  core: string;
  fit: string;
  source?: string;
};

export const programs: Program[] = [
  {
    id: "math-honors",
    name: "Mathematics, honors track",
    degree: "B.S.",
    core:
      "Calculus sequence + 250; two one-credit honors seminars (one at the 492 level); nine 300+ courses approved by the honors committee, including two rigorous semesters of real analysis (411, 412, 501 or 502) and algebra (451, 452, 551 or 552).",
    fit: "Needs 411. Strongest signal for a math PhD or SCOFT.",
    source: "https://sites.math.rutgers.edu/undergrad/Honors/Track/courseplan.html",
  },
  {
    id: "math-ba",
    name: "Mathematics, standard major (applied focus)",
    degree: "B.A.",
    core: "Eight 300–400-level 640 courses including 300, 311 or 312 (or 411), and linear algebra; CS 111; C or better throughout.",
    fit: "Within reach with 311H. Applied electives: 354, 373, 403, 421 or 423, 428, 454, 477/478, 481.",
    source: "https://math.rutgers.edu/academics/undergraduate/majors",
  },
  {
    id: "physics-pro",
    name: "Physics, professional option",
    degree: "B.S.",
    core: "Intro sequence (123/124 + 227/228 with labs 229/230, or 271–273); 381/382, 385/386, 361, advanced labs, senior electives.",
    fit: "Physics PhD, quantum computing, the Maldacena lane.",
  },
  {
    id: "stat-math",
    name: "Statistics and Mathematics joint major",
    degree: "B.S.",
    core: "Math core plus statistics; 477/481 cover the theory core in place of 960:381.",
    fit: "Cheapest add-on: 477/481 are already on every plan.",
  },
  {
    id: "ase",
    name: "Applied Sciences in Engineering, Engineering Physics",
    degree: "B.S. (Engineering)",
    core: "10 engineering electives (3+ credits each) + 30 technical-elective credits; not ABET-accredited by design.",
    fit: "The Prosperetti route. Requires a school-to-school transfer into Engineering.",
    source: "https://catalogs.rutgers.edu/generated/nb-ug_2224/pg1289.html",
  },
];

export type GoalId = "scoft" | "qphys" | "qcomp" | "qr" | "qt" | "comb" | "ai";

export const goals: { id: GoalId; name: string; courses: string[]; degree: string; cs: string }[] = [
  { id: "scoft", name: "SCOFT (stochastic calculus, Itô, fat tails)", courses: ["640:477", "640:478", "640:411", "640:412", "640:501", "640:502", "640:575"], degree: "PhD for pricing quant", cs: "Solid" },
  { id: "qphys", name: "Quantum physics", courses: ["640:350H", "640:403", "750:361", "750:385", "750:464", "640:351"], degree: "PhD", cs: "Solid" },
  { id: "qcomp", name: "Quantum computing", courses: ["640:350H", "750:361", "640:351", "198:344"], degree: "PhD", cs: "Solid" },
  { id: "qr", name: "Quant researcher", courses: ["640:477", "640:478", "640:481", "640:350H", "640:354"], degree: "PhD (MS/PhD at some firms)", cs: "Solid" },
  { id: "qt", name: "Quant trader", courses: ["640:477", "640:481", "640:350H"], degree: "MS/PhD; strong B.S. at market makers", cs: "Solid" },
  { id: "comb", name: "Combinatorics", courses: ["640:454", "640:428", "640:351", "640:403", "640:477", "642:581"], degree: "PhD for research", cs: "Light–solid" },
  { id: "ai", name: "AI and ML theory", courses: ["640:350H", "640:477", "640:478", "640:354", "640:373", "198:461"], degree: "PhD", cs: "Solid–heavy" },
];

export type Coverage = "Full" | "Partial" | "Weak";

export type Plan = {
  id: string;
  name: string;
  years: string;
  builtOn: string;
  line: string;
  courses: string[];
  coverage: Record<GoalId, Coverage>;
  flag?: string;
};

const cov = (s: string): Record<GoalId, Coverage> => {
  const m: Record<string, Coverage> = { F: "Full", P: "Partial", W: "Weak" };
  const ids: GoalId[] = ["scoft", "qphys", "qcomp", "qr", "qt", "comb", "ai"];
  return Object.fromEntries(ids.map((id, i) => [id, m[s[i]]])) as Record<GoalId, Coverage>;
};

const MATH_SPINE = ["640:300H", "640:311H", "640:350H", "640:477", "640:411", "640:412"];
const PHYS_SPINE = ["750:123", "750:124", "750:227", "750:228", "750:229", "750:230", "750:381", "750:382", "750:385", "750:386", "750:361"];

export const plans: Plan[] = [
  { id: "5y-dbl-msmf", name: "5Y Double Major + master's", years: "5", builtOn: "Math B.S. + Physics B.S. + a Rutgers master's", line: "Maximum credential; quant finance destination.", courses: [...MATH_SPINE, ...PHYS_SPINE, "640:478", "640:501", "640:502", "640:575"], coverage: cov("FFPFFPP"), flag: "The Mathematical Finance master's (MSMF) was discontinued in January 2025; the fifth year now points to the Statistics M.S. or the Master of Quantitative Finance." },
  { id: "5y-nospn", name: "5Y Math + Physics, no SPN (vC)", years: "5", builtOn: "Math B.S. + Physics B.S.", line: "Everything, with the standard physics intro.", courses: [...MATH_SPINE, ...PHYS_SPINE, "640:478", "640:501", "640:502"], coverage: cov("FFPFFPP") },
  { id: "5y-dynsys", name: "5Y Math-Physics, Dynamical Systems (vE)", years: "5", builtOn: "Math B.S. + Physics B.S.", line: "Bifurcations and chaos; graduate DE capstone.", courses: [...MATH_SPINE, ...PHYS_SPINE, "640:423", "750:464"], coverage: cov("PFPFFWP") },
  { id: "4y-math-physminor", name: "4Y Math + Physics minor", years: "4", builtOn: "Math B.S.", line: "Cleanest 4-year SCOFT; fastest to Karatzas & Shreve.", courses: [...MATH_SPINE, "640:478", "640:481", "640:501", "640:502", "640:575", "750:123", "750:124", "750:381"], coverage: cov("FPWFFPP") },
  { id: "4y-math-quantum", name: "4Y Math + Quantum", years: "4", builtOn: "Math B.S.", line: "Quantum computing; topology, algorithms, PDE.", courses: [...MATH_SPINE, "640:441", "640:423", "750:361", "198:344"], coverage: cov("PPFPFPP") },
  { id: "4y-math-econ", name: "4Y Math + Econ/Linguistics", years: "4", builtOn: "Math B.S.", line: "Quant finance or mathematical economics.", courses: [...MATH_SPINE, "640:478", "640:481", "640:501"], coverage: cov("FWWFFPP") },
  { id: "4y-math-comb", name: "4Y Math + Combinatorics", years: "4", builtOn: "Math B.S. or B.A.", line: "454 + 428, then graduate 642:581–583 and Experimental Math.", courses: ["640:300H", "640:311H", "640:350H", "640:477", "640:454", "640:428", "640:351", "640:403", "642:581", "642:582", "640:640"], coverage: cov("PWPPFFP") },
  { id: "4y-phys-mathminor", name: "4Y Physics + Math minor", years: "4", builtOn: "Physics B.S.", line: "Physics PhD or quantum computing.", courses: [...PHYS_SPINE, "640:350H", "640:403", "640:421", "750:464"], coverage: cov("WFFPPWW") },
  { id: "maldacena", name: "Maldacena + combinatorics", years: "4", builtOn: "Physics B.S. + Math B.A. or minor", line: "Math learned through physics; group theory, representation theory, graph theory; no 411 required.", courses: [...PHYS_SPINE, "640:350H", "640:403", "640:421", "640:351", "640:432", "640:454", "640:428", "640:477", "750:464"], coverage: cov("WFPPFFP") },
  { id: "ml-overlay", name: "ML-via-math (overlay)", years: "any", builtOn: "Any math-primary plan", line: "354, 477/478/481, 454, AI Tools for Mathematics; no C++.", courses: ["640:354", "640:477", "640:478", "640:481", "640:454", "640:373", "198:461"], coverage: cov("PWWFFPF") },
  { id: "eng-physics", name: "Engineering Physics", years: "4–5", builtOn: "Applied Sciences in Engineering", line: "The Prosperetti route; transfer into Engineering needed.", courses: [...PHYS_SPINE, "640:421", "750:464"], coverage: cov("WPPWPWW") },
];

export const masters = [
  { route: "B.A. Math + M.S. Statistics (Financial Data Science and Risk Management)", years: "5", what: "30-credit M.S. in Statistics: financial time series, risk evaluation, statistical learning; 477/481 carry straight in.", best: "Quant research and risk", link: "https://fsrm.rutgers.edu/" },
  { route: "B.A. Math + M.S. Financial Technology Analytics", years: "5", what: "New Statistics M.S., first class fall 2026. Five-year track unconfirmed.", best: "Fintech and data roles", link: "https://www.rutgers.edu/news/university-launches-graduate-program-financial-technology-analytics" },
  { route: "B.A. Math + Master of Quantitative Finance (Business School)", years: "5–5.5", what: "45 credits, about 1.5 years on average: stochastic calculus for finance, derivatives, programming in finance, internship.", best: "Closest replacement for the MSMF", link: "https://www.business.rutgers.edu/quantitative-finance" },
  { route: "Math B.S. + Physics B.S. in five years", years: "5", what: "Year five finishes the second major plus graduate courses.", best: "PhD application with two majors" },
  { route: "Four years, then a PhD", years: "4 + 5–6", what: "US PhD programs admit from a bachelor's, funded; graduate courses as a senior strengthen the application.", best: "Quant research, AI theory, physics, combinatorics" },
  { route: "Four years, then an outside quant master's", years: "4 + 1–1.5", what: "Financial engineering at a top program (for example Baruch, Princeton, CMU, Columbia).", best: "Quant trading or desk quant without a PhD" },
];
