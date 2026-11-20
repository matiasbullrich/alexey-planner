// Deadlines, internships by type, careers and course comparisons.
// Dates are public program deadlines checked in November 2026. Personal items (petitions, bills,
// aid) are NOT stored here; they live in the browser for now and in Supabase after handover.

export type Deadline = { id: string; title: string; date: string; kind: string; link?: string; note?: string; expected?: boolean };

export const deadlines: Deadline[] = [
  { id: "suli-2027", title: "DOE SULI national-lab internship, summer 2027", date: "2027-01-06", kind: "Research", link: "https://science.osti.gov/wdts/suli/Key-Dates", note: "Applications and recommendations due 5:00 PM ET. Check first-year eligibility." },
  { id: "js-fttp-2027", title: "Jane Street First-year Trading and Technology Program (NYC)", date: "2027-01-31", kind: "Quant trading", link: "https://www.janestreet.com/fttp-nyc-email", note: "Due 11:59 PM ET. Program March 21–25, 2027. No finance background needed." },
  { id: "aresty-2027", title: "Aresty Research Assistant + Summer Science applications open", date: "2027-03-01", kind: "Research", link: "https://aresty.rutgers.edu/programs-funding", note: "Expected date: opened March 1 in 2026.", expected: true },
];

export const internshipTypes = [
  { type: "Research at Rutgers", y1: "Aresty Research Assistant (year-long, 3 credits P/NC, ~5 hrs/week); Aresty Summer Science (first-years)", y2: "Faculty research; DIMACS", junior: "Senior-thesis groundwork", when: "Applications each March", link: "https://aresty.rutgers.edu/programs-funding" },
  { type: "Research outside (REUs, labs)", y1: "Rarely open to first-years", y2: "REUs in math and physics", junior: "REU or national lab", when: "REUs: winter; SULI summer: Oct–Jan", link: "https://science.osti.gov/wdts/suli/Key-Dates" },
  { type: "Quant trading and research", y1: "First-year programs (Jane Street FTTP)", y2: "Insight programs (SIG Discovery, Optiver FutureFocus, Explore HRT, Citadel Spark)", junior: "Quant trader / researcher internship", when: "July–August of the year before", link: "https://quantvault.org/quant-early-insight-programs-2027.html" },
  { type: "Investment banking", y1: "Networking; first-year spring weeks", y2: "Sophomore programs; junior applications open", junior: "Summer analyst", when: "Sophomore year, main wave Dec–Jan (18 months ahead)", link: "https://www.extern.com/post/investment-banking-internships-2028-guide" },
  { type: "Consulting", y1: "First-year programs (Oliver Wyman First-Year Immersion)", y2: "McKinsey Sophomore Summer BA, BCG Growing Future Leaders", junior: "Summer associate / business analyst", when: "Moving earlier, toward banking's calendar", link: "https://managementconsulted.com/sophomore-summer-internships-consulting/" },
  { type: "Silicon Valley / software", y1: "Personal projects; open source", y2: "First- and second-year engineering programs", junior: "Software or ML internship", when: "Aug–Oct of the year before" },
  { type: "Engineering and science industry", y1: "—", y2: "Engineering internships", junior: "Engineering or applied-physics internship", when: "Fall of the year before" },
  { type: "Federal Work-Study", y1: "Campus job during the term, if awarded", y2: "Same; research-assistant FWS jobs exist", junior: "Same", when: "Depends on his aid award" },
  { type: "Volunteer, teaching, language", y1: "Any summer", y2: "Any summer", junior: "—", when: "Rolling" },
];

// From the Career_Map_Applied_Math sheet ("All roles" tab).
export const careers: { field: string; role: string; degree: string; cs: string; firms: string; note?: string }[] = [
  { field: "Trading & quant", role: "Quant researcher (equities, stat arb)", degree: "PhD", cs: "Solid", firms: "Renaissance, Two Sigma, D.E. Shaw, Citadel, Millennium, Point72/Cubist, AQR, WorldQuant" },
  { field: "Trading & quant", role: "Quant trader (market making, options)", degree: "MS/PhD", cs: "Solid", firms: "Jane Street, SIG, Optiver, IMC, Citadel Securities, Hudson River Trading, Jump" },
  { field: "Trading & quant", role: "Quant developer", degree: "MS", cs: "Heavy", firms: "Jane Street, SIG, Optiver, IMC, Citadel Securities, HRT, Jump" },
  { field: "Trading & quant", role: "Quant researcher / strategist (rates, macro)", degree: "PhD", cs: "Solid", firms: "Bridgewater, Brevan Howard, Capula, Rokos, PIMCO, Goldman Sachs, JPMorgan" },
  { field: "Trading & quant", role: "Pricing quant (desk quant)", degree: "PhD", cs: "Solid", firms: "Goldman Sachs, JPMorgan, Morgan Stanley, BNP Paribas, Société Générale", note: "Black-Scholes and stochastic-volatility models" },
  { field: "Trading & quant", role: "Structurer", degree: "MS", cs: "Light", firms: "Goldman Sachs, JPMorgan, Morgan Stanley, BNP Paribas, Barclays, UBS" },
  { field: "Trading & quant", role: "Commodities trader or analyst", degree: "MS", cs: "Light", firms: "Vitol, Trafigura, Glencore, Cargill, ADM, Bunge, Louis Dreyfus, Macquarie" },
  { field: "Weather for trading", role: "Weather analyst on a trading desk", degree: "MS/PhD", cs: "Solid", firms: "Citadel, D.E. Shaw, Millennium, Vitol, Cargill", note: "Gas, power, grain and coffee move on forecasts" },
  { field: "Tail risk (Taleb-style)", role: "Tail-risk researcher", degree: "MS/PhD", cs: "Solid", firms: "Universa Investments, LongTail Alpha, 36 South" },
  { field: "Tail risk (Taleb-style)", role: "Catastrophe and reinsurance risk", degree: "MS/PhD", cs: "Solid", firms: "Swiss Re, Munich Re, Hannover Re, Lloyd's, Moody's RMS, Nephila" },
  { field: "Sports & Moneyball", role: "Betting syndicate / sports trader", degree: "MS/PhD", cs: "Solid", firms: "Starlizard, Smartodds, SIG sports desk, Pinnacle" },
  { field: "AI & machine learning", role: "Research scientist", degree: "PhD", cs: "Heavy", firms: "Google DeepMind, OpenAI, Anthropic, Meta, Mistral" },
  { field: "AI & machine learning", role: "Diffusion and generative-model theory", degree: "PhD", cs: "Solid", firms: "Google DeepMind, OpenAI, Anthropic, Meta", note: "Diffusion models are Itô calculus" },
  { field: "AI & machine learning", role: "Formal math and Lean", degree: "PhD", cs: "Solid", firms: "DeepMind, Lean FRO, academia" },
  { field: "Energy", role: "Fusion modeling", degree: "PhD", cs: "Solid", firms: "Commonwealth Fusion, Princeton Plasma Physics Lab, ITER" },
  { field: "Defense & national labs", role: "Research scientist", degree: "PhD", cs: "Solid", firms: "Los Alamos, Sandia, Livermore, MIT Lincoln Lab", note: "US citizenship generally required" },
];

export type Comparison = { id: string; a: string; b: string; rows: [string, string, string][]; prompt: string };

export const comparisons: Comparison[] = [
  {
    id: "421-vs-423",
    a: "640:421",
    b: "640:423",
    rows: [
      ["Written for", "Engineers and physics majors", "Math majors"],
      ["Content", "Laplace transforms, numerical ODEs, series solutions, Fourier series, then heat, wave and Laplace equations", "A full semester of PDEs: derivations, separation of variables, Fourier series, uniqueness and convergence"],
      ["PDE share", "Roughly the second half", "All of it"],
      ["Usual book", "Zill, Advanced Engineering Mathematics", "Logan, Applied PDE (earlier Strauss)"],
      ["Style", "Methods and technique (the Prosperetti side)", "First questions of theory (the Caffarelli side)"],
      ["Credit", "Only one counts; the second is E credit (no degree credit, no GPA effect)", "Same"],
      ["Unlocks", "Physics 464 Mathematical Physics", "Physics 464 Mathematical Physics"],
      ["Real PDE theory comes from", "411/412, then 501/502, then graduate PDE", "Same"],
    ],
    prompt:
      "I'm a Rutgers math/physics student. Compare Math 640:421 (Advanced Calculus for Engineering: Laplace transforms, numerical ODEs, Fourier series, classical PDEs; Zill) with Math 640:423 (Elementary PDE: a full semester on heat/wave/Laplace equations, separation of variables, Fourier series, uniqueness; Logan). Only one counts for credit. Both satisfy the prerequisite for Physics 750:464 Mathematical Physics. Explain what I would gain or miss with each, how each prepares me for (a) mathematical physics in the style of Maldacena, (b) applied methods in the style of Prosperetti, (c) later rigorous PDE theory after real analysis, and show one typical problem from each course.",
  },
  {
    id: "312-vs-411",
    a: "640:312",
    b: "640:411",
    rows: [
      ["Track", "Standard major (closed to honors-track students)", "Honors track; admission by SPN application"],
      ["Content", "Riemann integral; in some years Lebesgue measure and integration on R; series", "Metric spaces, sequences of functions, Riemann–Stieltjes integration (Rudin)"],
      ["Book", "Chosen by instructor", "Rudin, Principles of Mathematical Analysis"],
      ["Leads to", "Measure theory with self-study (Rosenthal, Williams, Axler); 501 by permission", "501/502 directly; counts for the honors B.S."],
      ["Best for", "Keeping SCOFT open without 411", "Math PhD, SCOFT, honors B.S."],
    ],
    prompt:
      "I'm a Rutgers student who finished Honors Real Analysis I (311H, Abbott). Compare taking Math 640:312 (Intro Real Analysis II; some instructors cover Lebesgue measure on R) versus Math 640:411 (Honors Mathematical Analysis I, Rudin). I prefer combinatorics to analysis. Explain which keeps measure-theoretic probability and stochastic calculus open, what each means for graduate study, and what self-study would close the gap if I take 312.",
  },
];
