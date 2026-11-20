// Career lanes. Each lane has its own color on the map and its own card.
// Alexey has said he does not want to be a professor: lanes are industry, finance and founding.
// CS tiers come from the "CS courses" tab of the Career_Map_Applied_Math sheet shared with Alexey:
//   Light (4): 198:111, 112, 439, 323 · Solid (9): Light + 211, 344, 213, 336, 461 · Heavy (15): Solid + 214, 440, 462, 416, 417, 431.
//   Light and Solid are complete by the end of year 3. 205/206 are covered by Math 300H and Math 477.

export type Lane = {
  id: string;
  name: string;
  color: string;
  summary: string;
  degree: string;
  cs: string;
  courses: string[];
  prep: string[];
  recruiting: string;
  firms: string;
  earlierWork?: string;
};

const CS_LIGHT = ["198:111", "198:112", "198:439", "198:323"];
const CS_SOLID = [...CS_LIGHT, "198:211", "198:344", "198:213", "198:336", "198:461"];
const CS_HEAVY = [...CS_SOLID, "198:214", "198:440", "198:462"];

export const lanes: Lane[] = [
  {
    id: "quant-trading",
    name: "Quant trading",
    color: "#e8590c",
    summary: "Market making and options at proprietary trading firms: probability under time pressure, game theory, fast mental math. A strong bachelor's is enough at market makers.",
    degree: "B.S. at market makers; MS/PhD raises the ceiling",
    cs: "Solid — 9 CS courses by the end of year 3 (quant developers: Heavy)",
    courses: ["640:477", "640:481", "640:350H", "640:454", "640:354", "640:478", ...CS_SOLID],
    prep: ["Probability puzzles: “A Practical Guide to Quantitative Finance Interviews” (the Green Book), “Heard on the Street”", "Mental-math speed drills", "Betting and game-theory thinking (poker-style expected value)", "First-year and sophomore programs: Jane Street FTTP, SIG Discovery, Optiver FutureFocus, Citadel Spark"],
    recruiting: "Junior-summer internships open July–August of the year before (for Alexey: summer 2028 for summer 2029).",
    firms: "Jane Street, SIG, Optiver, IMC, Citadel Securities, Hudson River Trading, Jump",
    earlierWork: "Career map shortlist: buy-side quant research or trading ranked #2 (highest pay ceiling), commodity and weather-driven trading #3 (close to the family's agricultural world), sports trading #5.",
  },
  {
    id: "quant-research",
    name: "Quant research",
    color: "#7048e8",
    summary: "Statistical models at hedge funds and derivatives pricing at banks. The SCOFT ladder (probability → real analysis → measure theory → stochastic calculus) is this lane's backbone.",
    degree: "PhD typical (MS/PhD at some firms)",
    cs: "Solid — 9 CS courses by the end of year 3",
    courses: ["640:477", "640:478", "640:481", "640:350H", "640:354", "640:373", "640:411", "640:412", "640:501", "640:502", "640:575", "960:463", "960:486", ...CS_SOLID],
    prep: ["Research experience: Aresty, REUs, a faculty project", "Real data projects in Python", "Stochastic calculus (Shreve) once 477/478 are done"],
    recruiting: "Same summer calendar as trading; PhD researchers are hired from the PhD.",
    firms: "Renaissance, Two Sigma, D.E. Shaw, Citadel, Millennium, Point72/Cubist, AQR; pricing desks at Goldman Sachs, JPMorgan, Morgan Stanley, BNP Paribas",
    earlierWork: "Career map shortlist: derivatives pricing quant ranked #1 (the stochastic-calculus track directly), tail and catastrophe risk #4 (Taleb's mathematics as a profession), generative AI theory #6 (diffusion models are Itô calculus).",
  },
  {
    id: "silicon-valley",
    name: "Road to Silicon Valley",
    color: "#1c7ed6",
    summary: "Software or machine-learning engineering at tech companies and AI labs. CS depth and shipped projects matter most.",
    degree: "B.S. for engineering; PhD for research scientist roles",
    cs: "Heavy — 15 CS courses (some finished in a master's)",
    courses: [...CS_HEAVY, "640:350H", "640:477", "640:354"],
    prep: ["Algorithms interview practice", "Personal projects and open source", "One shipped product he owns end to end"],
    recruiting: "Internship applications open August–October of the year before.",
    firms: "Google DeepMind, OpenAI, Anthropic, Meta, NVIDIA, startups",
  },
  {
    id: "consulting",
    name: "Road to consulting",
    color: "#0ca678",
    summary: "Strategy consulting. Any major works; what counts is GPA, case interviews and leadership. An MBA usually follows a few years in.",
    degree: "B.S. or B.A.; MBA later",
    cs: "Light",
    courses: ["220:102", "220:103", "640:477", "640:354"],
    prep: ["Case-interview practice (“Case in Point”, partner drills)", "Leadership roles in clubs or teams", "Sophomore programs: McKinsey Sophomore Summer Business Analyst, BCG Growing Future Leaders"],
    recruiting: "Moving earlier, toward banking's calendar; sophomore programs are the entry point.",
    firms: "McKinsey, BCG, Bain, Oliver Wyman, Deloitte, EY-Parthenon",
  },
  {
    id: "ibanking",
    name: "Road to investment banking",
    color: "#c2255c",
    summary: "Mergers, acquisitions and capital raising: valuation, financial models, long hours. Any major; accounting and Excel are learned on the side.",
    degree: "B.S. or B.A.",
    cs: "Light",
    courses: ["220:102", "220:103", "640:485", "640:477"],
    prep: ["Accounting and valuation technicals (three statements, DCF, comparables)", "Excel modeling", "Networking from freshman year; an introductory accounting course (Business School — may need permission for SAS students)"],
    recruiting: "The junior-summer analyst internship is recruited during sophomore year, main wave December–January, about 18 months ahead.",
    firms: "Goldman Sachs, Morgan Stanley, JPMorgan, Evercore, Lazard, Centerview, PJT, Moelis",
  },
  {
    id: "private-equity",
    name: "Private equity",
    color: "#2b8a3e",
    summary: "Buying, improving and selling companies with investors' capital. Usually entered after about two years as an investment-banking analyst; recruiting for those jobs starts within months of starting at the bank.",
    degree: "B.S. or B.A.; MBA common later",
    cs: "Light",
    courses: ["220:102", "220:103", "640:485", "640:477"],
    prep: ["Everything in the banking lane", "Leveraged-buyout modeling", "A view on industries and companies"],
    recruiting: "Through investment banking first; direct undergraduate PE internships exist but are rare.",
    firms: "Blackstone, KKR, Apollo, Carlyle, Warburg Pincus, General Atlantic",
  },
  {
    id: "turbine-metallurgy",
    name: "Turbine metallurgy",
    color: "#8d5524",
    summary: "Superalloys and single-crystal blades for jet engines and gas turbines: deep industrial work where physics, chemistry and failure mechanics meet.",
    degree: "MS or PhD in materials science",
    cs: "Light–solid (simulation, numerical methods)",
    courses: ["635:203", "635:205", "635:362", "635:407", "635:314", "750:351", "640:421", "640:423", "640:373", "750:227", "750:229"],
    prep: ["Route: Materials Science & Engineering major (school-to-school transfer into Engineering) or Applied Sciences in Engineering; physics plus a materials master's also works", "Summer research in a materials lab", "Industry internships at engine makers"],
    recruiting: "Engineering internships, fall of the year before.",
    firms: "GE Aerospace, Pratt & Whitney, Rolls-Royce, Siemens Energy, Howmet, Precision Castparts, Safran",
  },
  {
    id: "founder",
    name: "Start his own company",
    color: "#495057",
    summary: "Build something of his own. No required courses; deep technical skill (quant, AI, materials) is the edge, plus building, selling and finding a co-founder.",
    degree: "Any",
    cs: "Solid",
    courses: [...CS_SOLID, "640:354", "220:102"],
    prep: ["Ship small products and own every account they run on", "Learn to sell and to raise money", "Work a few years in a lane above to find the problem worth solving"],
    recruiting: "—",
    firms: "—",
  },
];

export const laneById: Record<string, Lane> = Object.fromEntries(lanes.map((l) => [l.id, l]));
