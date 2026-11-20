// Courses and prerequisite rules.
//
// A rule is a small tree:
//   "640:311"                         -> that course
//   { all: [...] }                    -> every item needed
//   { any: [...] }                    -> one of the items
//   { coreq: "640:251" }              -> may be taken at the same time
//   { perm: "SPN" | "placement" | "instructor" | "honors" | "graduate" , note }
//   { note: "..." }                   -> plain-language condition the app cannot check
//
// `verified` = checked against a Rutgers catalog or department page in our planning sessions.
// Anything not verified must be confirmed in the Rutgers catalog before relying on it.

export type Rule =
  | string
  | { all: Rule[] }
  | { any: Rule[] }
  | { coreq: string }
  | { perm: "SPN" | "placement" | "instructor" | "honors" | "graduate"; note?: string }
  | { note: string };

export type Dept = "Math" | "Math grad" | "Statistics" | "Physics" | "Computer Science" | "Engineering" | "Economics";

export type Course = {
  id: string; // "640:311H"
  title: string;
  dept: Dept;
  credits?: number;
  level: 1 | 2 | 3 | 4 | 5; // map column: 1 = 100s, 2 = 200s, 3 = 300s, 4 = 400s, 5 = graduate
  prereq?: Rule;
  excludes?: string[]; // credit not given for both
  terms?: ("Fall" | "Spring" | "Summer")[];
  verified?: boolean;
  notes?: string;
  book?: string;
};

const CALC3: Rule = { any: ["640:251", "640:291"] };
const CALC4: Rule = { any: ["640:244", "640:252", "640:292"] };

export const courses: Course[] = [
  // ---------- Math, 100–200 level ----------
  { id: "640:151", title: "Calculus I (Math & Physical Sciences)", dept: "Math", level: 1, credits: 4, prereq: { perm: "placement" } },
  { id: "640:152", title: "Calculus II (Math & Physical Sciences)", dept: "Math", level: 1, credits: 4, prereq: "640:151", verified: true },
  { id: "640:250", title: "Introductory Linear Algebra", dept: "Math", level: 2, credits: 3, prereq: { note: "Math 112 or 115, or placement" }, verified: true },
  { id: "640:251", title: "Multivariable Calculus", dept: "Math", level: 2, credits: 4, prereq: "640:152", verified: true },
  { id: "640:291", title: "Honors Calculus III", dept: "Math", level: 2, credits: 4, prereq: { perm: "SPN", note: "Special permission only" }, terms: ["Fall"], verified: true },
  { id: "640:244", title: "Differential Equations for Engineering and Physics", dept: "Math", level: 2, credits: 4, prereq: CALC3 },
  { id: "640:252", title: "Elementary Differential Equations", dept: "Math", level: 2, credits: 3, prereq: { all: ["640:250", CALC3] }, verified: true },
  { id: "640:292", title: "Honors Calculus IV", dept: "Math", level: 2, credits: 4, prereq: "640:291" },

  // ---------- Math, 300 level ----------
  { id: "640:300", title: "Introduction to Mathematical Reasoning", dept: "Math", level: 3, credits: 3, prereq: { all: ["640:250", CALC3] } },
  { id: "640:300H", title: "Intro to Math Reasoning (Honors / oral exam)", dept: "Math", level: 3, credits: 3, prereq: { all: ["640:250", CALC3, { perm: "honors" }] }, notes: "Can be satisfied by the honors oral proficiency exam." },
  { id: "640:311", title: "Introduction to Real Analysis I", dept: "Math", level: 3, credits: 4, prereq: { all: [CALC4, { any: ["640:300", "640:300H"] }] }, verified: true, notes: "C or better in 300 required.", book: "Gaughan (regular); Abbott, Understanding Analysis (honors)" },
  { id: "640:311H", title: "Introduction to Real Analysis I (Honors)", dept: "Math", level: 3, credits: 4, prereq: { all: [CALC4, { any: ["640:300", "640:300H"] }, { perm: "honors" }] }, verified: true, book: "Abbott, Understanding Analysis" },
  { id: "640:312", title: "Introduction to Real Analysis II", dept: "Math", level: 3, credits: 3, prereq: { any: ["640:311", "640:311H"] }, terms: ["Spring"], verified: true, notes: "Syllabus varies with instructor; some versions cover Lebesgue measure and integration on R. Not open to students on the honors math track." },
  { id: "640:350", title: "Linear Algebra", dept: "Math", level: 3, credits: 3, prereq: { all: ["640:250", { any: ["640:300", "640:300H"] }] } },
  { id: "640:350H", title: "Linear Algebra (Honors)", dept: "Math", level: 3, credits: 3, prereq: { all: ["640:250", { any: ["640:300", "640:300H"] }, { perm: "SPN" }] }, book: "Friedberg, Insel & Spence" },
  { id: "640:351", title: "Introduction to Abstract Algebra I", dept: "Math", level: 3, credits: 3, prereq: { all: ["640:250", { any: ["640:300", "640:300H"] }] } },
  { id: "640:352", title: "Introduction to Abstract Algebra II", dept: "Math", level: 3, credits: 3, prereq: "640:351" },
  { id: "640:354", title: "Linear Optimization", dept: "Math", level: 3, credits: 3, prereq: "640:250", notes: "ML-via-math core; linear algebra is the only prerequisite." },
  { id: "640:356", title: "Theory of Numbers", dept: "Math", level: 3, credits: 3, prereq: { all: [{ any: ["640:300", "640:300H"] }, CALC3] } },
  { id: "640:373", title: "Numerical Analysis I", dept: "Math", level: 3, credits: 3, prereq: { all: [CALC4, "640:250"] }, verified: true, notes: "Uses MATLAB." },

  // ---------- Math, 400 level ----------
  { id: "640:403", title: "Introductory Theory of Functions of a Complex Variable", dept: "Math", level: 4, credits: 3, prereq: { any: [CALC4, "640:300H"] }, notes: "An earlier session found 300H enough for Alexey; confirm the exact catalog wording." },
  { id: "640:411", title: "Mathematical Analysis I (Honors)", dept: "Math", level: 4, credits: 3, prereq: { all: [{ any: ["640:311", "640:311H"] }, { perm: "SPN", note: "Application through the Special Permission for Honors Courses system; most admitted students did well in 311, preferably honors." }] }, terms: ["Fall"], verified: true, book: "Rudin, Principles of Mathematical Analysis" },
  { id: "640:412", title: "Mathematical Analysis II (Honors)", dept: "Math", level: 4, credits: 3, prereq: "640:411", terms: ["Spring"], verified: true },
  { id: "640:421", title: "Advanced Calculus for Engineering", dept: "Math", level: 4, credits: 3, prereq: CALC4, excludes: ["640:423"], verified: true, book: "Zill, Advanced Engineering Mathematics", notes: "Aimed at engineers and physics majors. Laplace transforms, numerical ODEs, Fourier series, then the classical PDEs." },
  { id: "640:423", title: "Elementary Partial Differential Equations", dept: "Math", level: 4, credits: 3, prereq: CALC4, excludes: ["640:421"], verified: true, book: "Logan, Applied Partial Differential Equations", notes: "Aimed at math majors. Heat, wave and Laplace equations, separation of variables, Fourier series." },
  { id: "640:428", title: "Graph Theory", dept: "Math", level: 4, credits: 3, prereq: { all: ["640:250", CALC3] }, verified: true },
  { id: "640:432", title: "Introduction to Differential Geometry", dept: "Math", level: 4, credits: 3, prereq: { any: ["640:311", "640:311H"] } },
  { id: "640:441", title: "Introductory Topology I", dept: "Math", level: 4, credits: 3, prereq: { any: ["640:311", "640:311H"] } },
  { id: "640:451", title: "Abstract Algebra I (Honors)", dept: "Math", level: 4, credits: 3, prereq: { all: [{ any: ["640:300", "640:300H"] }, { perm: "SPN" }] }, verified: true, notes: "Admission by application (Special Permission for Honors Courses)." },
  { id: "640:452", title: "Abstract Algebra II (Honors)", dept: "Math", level: 4, credits: 3, prereq: "640:451", verified: true },
  { id: "640:454", title: "Combinatorics", dept: "Math", level: 4, credits: 3, prereq: { all: ["640:250", "640:152"] } },
  { id: "640:461", title: "Mathematical Logic", dept: "Math", level: 4, credits: 3, prereq: { all: [{ any: ["640:300", "640:300H"] }, CALC3] }, terms: ["Spring"] },
  { id: "640:477", title: "Mathematical Theory of Probability", dept: "Math", level: 4, credits: 3, prereq: CALC3, notes: "Counts in place of 960:381 for statistics routes." },
  { id: "640:478", title: "Probability II (Stochastic Processes)", dept: "Math", level: 4, credits: 3, prereq: "640:477" },
  { id: "640:481", title: "Mathematical Theory of Statistics", dept: "Math", level: 4, credits: 3, prereq: { all: ["640:477", "640:250"] } },
  { id: "640:485", title: "Mathematical Finance", dept: "Math", level: 4, credits: 3, prereq: { all: ["640:477", CALC4, "640:250"] } },

  // ---------- Graduate math ----------
  { id: "640:501", title: "Theory of Functions of a Real Variable I", dept: "Math grad", level: 5, credits: 3, prereq: { all: [{ any: ["640:411", "640:312"] }, { perm: "graduate", note: "Undergraduates normally after 411/412; permission of instructor otherwise." }] } },
  { id: "640:502", title: "Theory of Functions of a Real Variable II", dept: "Math grad", level: 5, credits: 3, prereq: "640:501", book: "Folland, Real Analysis" },
  { id: "640:575", title: "Graduate probability / stochastic calculus (SCOFT)", dept: "Math grad", level: 5, credits: 3, prereq: { all: ["640:501", "640:478"] }, notes: "Course number taken from the vF workbook; confirm the current graduate listing." },
  { id: "642:581", title: "Graduate Combinatorics I", dept: "Math grad", level: 5, credits: 3, prereq: { all: ["640:454", { perm: "graduate" }] } },
  { id: "642:582", title: "Graduate Combinatorics II", dept: "Math grad", level: 5, credits: 3, prereq: "642:581" },
  { id: "642:583", title: "Graduate Combinatorics III", dept: "Math grad", level: 5, credits: 3, prereq: "642:582" },
  { id: "640:640", title: "Experimental Mathematics (Zeilberger)", dept: "Math grad", level: 5, credits: 3, prereq: { perm: "instructor" } },

  // ---------- Statistics ----------
  { id: "960:384", title: "Intermediate Statistical Analysis", dept: "Statistics", level: 3, credits: 3, prereq: { any: ["640:477", "960:212"] }, notes: "Entered through the probability route (477)." },
  { id: "960:212", title: "Statistics II", dept: "Statistics", level: 2, credits: 3 },
  { id: "960:463", title: "Regression Methods", dept: "Statistics", level: 4, credits: 3, prereq: { any: ["960:384", "960:212"] } },
  { id: "960:486", title: "Computing and Statistical Learning", dept: "Statistics", level: 4, credits: 3, prereq: { any: ["960:384", "960:212"] } },

  // ---------- Physics ----------
  { id: "750:123", title: "Analytical Physics Ia", dept: "Physics", level: 1, credits: 2, prereq: { coreq: "640:151" } },
  { id: "750:124", title: "Analytical Physics Ib", dept: "Physics", level: 1, credits: 2, prereq: "750:123" },
  { id: "750:227", title: "Analytical Physics IIA (E&M)", dept: "Physics", level: 2, credits: 3, prereq: { all: [{ any: ["750:124", { perm: "SPN", note: "SPN to skip 123/124" }] }, { coreq: "750:229" }] } },
  { id: "750:228", title: "Analytical Physics IIB (Modern)", dept: "Physics", level: 2, credits: 3, prereq: { all: ["750:227", { coreq: "750:230" }] } },
  { id: "750:229", title: "Analytical Physics II Lab", dept: "Physics", level: 2, credits: 1, prereq: { coreq: "750:227" } },
  { id: "750:230", title: "Analytical Physics II Lab", dept: "Physics", level: 2, credits: 1, prereq: { coreq: "750:228" } },
  { id: "750:271", title: "Honors Physics I", dept: "Physics", level: 2, credits: 4, prereq: { perm: "honors" }, terms: ["Fall"], notes: "Single section; clashed with 311H in Fall 2026." },
  { id: "750:272", title: "Honors Physics II", dept: "Physics", level: 2, credits: 4, prereq: "750:271" },
  { id: "750:273", title: "Honors Physics III", dept: "Physics", level: 2, credits: 4, prereq: "750:272" },
  { id: "750:351", title: "Thermal Physics", dept: "Physics", level: 3, credits: 3, prereq: { all: [{ any: ["750:228", "750:272"] }, CALC3] } },
  { id: "750:361", title: "Quantum Mechanics & Atomic Physics", dept: "Physics", level: 3, credits: 3, prereq: { all: [CALC4, { any: ["750:228", "750:273"] }] }, verified: true },
  { id: "750:381", title: "Mechanics I", dept: "Physics", level: 3, credits: 3, prereq: { all: [{ any: ["750:124", "750:271"] }, { coreq: "640:251" }] }, verified: true, book: "Taylor, Classical Mechanics" },
  { id: "750:382", title: "Mechanics II", dept: "Physics", level: 3, credits: 3, prereq: "750:381", verified: true },
  { id: "750:385", title: "Electromagnetism I", dept: "Physics", level: 3, credits: 3, prereq: { all: [{ any: ["750:228", "750:273"] }, CALC3] }, verified: true },
  { id: "750:386", title: "Electromagnetism II", dept: "Physics", level: 3, credits: 3, prereq: "750:385", verified: true },
  { id: "750:464", title: "Mathematical Physics", dept: "Physics", level: 4, credits: 3, prereq: { any: ["640:421", "640:423"] }, terms: ["Fall"], verified: true, notes: "Cross-listed with graduate 750:511." },

  // ---------- Computer Science ----------
  { id: "198:111", title: "Introduction to Computer Science", dept: "Computer Science", level: 1, credits: 4 },
  { id: "198:112", title: "Data Structures", dept: "Computer Science", level: 1, credits: 4, prereq: "198:111" },
  { id: "198:205", title: "Discrete Structures I", dept: "Computer Science", level: 2, credits: 4, prereq: "198:111", notes: "Believed covered by Math 300H; confirm with CS." },
  { id: "198:206", title: "Discrete Structures II", dept: "Computer Science", level: 2, credits: 4, prereq: "198:205", notes: "Math 477 counts in its place." },
  { id: "198:211", title: "Computer Architecture", dept: "Computer Science", level: 2, credits: 4, prereq: "198:112" },
  { id: "198:344", title: "Design and Analysis of Computer Algorithms", dept: "Computer Science", level: 3, credits: 4, prereq: { all: ["198:112", { any: ["198:206", "640:477"] }] }, verified: true, notes: "Rutgers accepts 198:112 + Math 477 — no discrete-structures courses needed. Part of the minimum CS." },
  { id: "198:439", title: "Introduction to Data Science", dept: "Computer Science", level: 4, credits: 4, prereq: "198:112" },
  { id: "198:461", title: "Machine Learning Principles", dept: "Computer Science", level: 4, credits: 4, prereq: { all: ["198:112", "640:250"] } },
  { id: "198:462", title: "Introduction to Deep Learning", dept: "Computer Science", level: 4, credits: 4, prereq: "198:461" },
  { id: "198:213", title: "Software Methodology", dept: "Computer Science", level: 2, credits: 4, prereq: "198:112" },
  { id: "198:214", title: "Systems Programming", dept: "Computer Science", level: 2, credits: 4, prereq: "198:211" },
  { id: "198:323", title: "Numerical Analysis and Computing", dept: "Computer Science", level: 3, credits: 4, prereq: { all: ["198:112", CALC3] }, notes: "Check overlap with Math 373." },
  { id: "198:336", title: "Principles of Information and Data Management", dept: "Computer Science", level: 3, credits: 4, prereq: "198:112" },
  { id: "198:440", title: "Introduction to Artificial Intelligence", dept: "Computer Science", level: 4, credits: 4, prereq: { any: ["198:205", { perm: "SPN", note: "No 198:205: ask the CS department for an SPN, citing Math 300H" }] } },

  // ---------- Economics ----------
  { id: "220:102", title: "Introduction to Microeconomics", dept: "Economics", level: 1, credits: 3 },
  { id: "220:103", title: "Introduction to Macroeconomics", dept: "Economics", level: 1, credits: 3 },

  // ---------- Engineering: Materials Science (School of Engineering; SAS students may need permission) ----------
  { id: "635:203", title: "Introduction to Materials Science and Engineering", dept: "Engineering", level: 2, credits: 3, prereq: { perm: "instructor", note: "School of Engineering course" } },
  { id: "635:205", title: "Crystal Chemistry and Structure of Materials", dept: "Engineering", level: 2, credits: 3, prereq: "635:203" },
  { id: "635:314", title: "Strength of Materials", dept: "Engineering", level: 3, credits: 3, prereq: "635:203" },
  { id: "635:362", title: "Physical Metallurgy", dept: "Engineering", level: 3, credits: 3, prereq: "635:203", notes: "Core course for turbine alloys (superalloys)." },
  { id: "635:407", title: "Mechanical Properties of Materials", dept: "Engineering", level: 4, credits: 3, prereq: { all: ["750:227", "750:229"] }, notes: "Elasticity, plasticity, fracture, time-dependent deformation (creep) — the failure modes of turbine blades. Offered in alternate years." },
];

export const courseById: Record<string, Course> = Object.fromEntries(courses.map((c) => [c.id, c]));
