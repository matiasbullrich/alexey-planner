// The complete Career_Map_Applied_Math sheet (Google Sheets, shared with Alexey), copied tab by tab.
// Source: https://docs.google.com/spreadsheets/d/1oYcdAr8X5mMunvBDQEaQLh5-_trw6TeKkGazcTB1d1A
// If the sheet changes, update this file to match.

export const CAREER_MAP_URL = "https://docs.google.com/spreadsheets/d/1oYcdAr8X5mMunvBDQEaQLh5-_trw6TeKkGazcTB1d1A";

// Tab "All roles": Field, Area, Role, Degree, CS needed, Firms, Notes
export const allRoles: [string, string, string, string, string, string, string?][] = [
  ["Trading & quant", "Equities & statistical arbitrage", "Quant researcher", "PhD", "SOLID", "Renaissance, Two Sigma, D.E. Shaw, Citadel, Millennium, Point72/Cubist, AQR, WorldQuant, Squarepoint, Qube"],
  ["Trading & quant", "Equities & statistical arbitrage", "Quant trader", "MS/PhD", "SOLID", "Renaissance, Two Sigma, D.E. Shaw, Citadel, Millennium, Point72/Cubist, AQR, WorldQuant, Squarepoint, Qube"],
  ["Trading & quant", "Market making & options", "Quant trader", "MS/PhD", "SOLID", "Jane Street, Susquehanna (SIG), Optiver, IMC, Citadel Securities, Hudson River Trading, Jump, Akuna, Flow Traders, Virtu"],
  ["Trading & quant", "Market making & options", "Quant developer", "MS", "HEAVY", "Jane Street, Susquehanna (SIG), Optiver, IMC, Citadel Securities, Hudson River Trading, Jump, Akuna, Flow Traders, Virtu"],
  ["Trading & quant", "Rates, bonds & global macro", "Quant researcher or strategist", "PhD", "SOLID", "Bridgewater, Brevan Howard, Capula, Rokos, PIMCO, Goldman Sachs, JPMorgan"],
  ["Trading & quant", "Derivatives pricing at banks", "Pricing quant (desk quant)", "PhD", "SOLID", "Goldman Sachs, JPMorgan, Morgan Stanley, BNP Paribas, Société Générale, Barclays, UBS", "Black-Scholes and stochastic-volatility models; Paris is the European center"],
  ["Trading & quant", "Derivatives at banks", "Structurer", "MS", "LIGHT", "Goldman Sachs, JPMorgan, Morgan Stanley, BNP Paribas, Société Générale, Barclays, UBS"],
  ["Trading & quant", "Commodities: oil, gas, power, metals, agriculture", "Trader or analyst", "MS", "LIGHT", "Vitol, Trafigura, Glencore, Gunvor, Mercuria; Cargill, ADM, Bunge, Louis Dreyfus; Shell, BP, TotalEnergies, Equinor trading; Macquarie; RWE, Uniper, Engie, Ørsted"],
  ["Trading & quant", "Commodities", "Quant researcher at commodity funds", "MS/PhD", "SOLID", "Citadel and Millennium commodity teams, Andurand"],
  ["Trading & quant", "Crypto", "Quant trader", "MS", "SOLID", "Jump, Wintermute, Cumberland (DRW)"],
  ["Weather for trading", "Trading desks", "Weather analyst on a trading desk", "MS/PhD", "SOLID", "Citadel (in-house weather team), D.E. Shaw, Millennium; Vitol, Trafigura, Cargill, Louis Dreyfus; RWE, Uniper", "Gas, power, grain and coffee prices move on forecasts"],
  ["Weather for trading", "Weather vendors", "Seasonal & climate forecaster for agriculture and energy", "MS/PhD", "SOLID", "Atmospheric G2, Maxar WeatherDesk, The Weather Company, Tomorrow.io"],
  ["Weather for trading", "Weather science", "Numerical weather prediction scientist", "PhD", "SOLID", "ECMWF (Reading, Bonn), UK Met Office, NOAA, NCAR"],
  ["Weather for trading", "Weather science", "Machine-learning weather models", "PhD", "HEAVY", "Google DeepMind, NVIDIA"],
  ["Tail risk (Taleb-style)", "Tail-hedging funds", "Tail-risk researcher", "MS/PhD", "SOLID", "Universa Investments, LongTail Alpha, 36 South", "Small firms, few hires; Taleb is an adviser to Universa"],
  ["Tail risk (Taleb-style)", "Banks & hedge funds", "Market and model risk (stress testing, extreme value theory)", "MS", "LIGHT", "All large banks, Citadel, Millennium, Bridgewater"],
  ["Tail risk (Taleb-style)", "Reinsurance", "Catastrophe and reinsurance risk", "MS/PhD", "SOLID", "Swiss Re, Munich Re, Hannover Re, Lloyd's syndicates, Moody's RMS, Verisk, Fermat Capital, Nephila"],
  ["Tail risk (Taleb-style)", "Regulators", "Systemic risk", "PhD", "LIGHT", "Federal Reserve, ECB, Bank of England, BIS"],
  ["Sports & Moneyball", "Teams", "Front-office analytics", "MS", "SOLID", "Baseball: Rays, Dodgers, Astros, Guardians · Basketball: Rockets, Celtics, Thunder · Football: Liverpool, Brentford, Brighton"],
  ["Sports & Moneyball", "Data companies", "Sports data analyst", "MS", "SOLID", "Stats Perform/Opta, Hudl/StatsBomb, Second Spectrum, Genius Sports, Hawk-Eye"],
  ["Sports & Moneyball", "Betting", "Betting syndicate / sports trader", "MS/PhD", "SOLID", "Starlizard, Smartodds (London), SIG sports desk, Betfair, Pinnacle", "Quant-level pay"],
  ["AI & machine learning", "AI labs", "Research scientist", "PhD", "HEAVY", "Google DeepMind, OpenAI, Anthropic, Meta, Mistral"],
  ["AI & machine learning", "AI labs", "Diffusion and generative-model theory", "PhD", "SOLID", "Google DeepMind, OpenAI, Anthropic, Meta, Mistral", "Diffusion models are Itô calculus"],
  ["AI & machine learning", "AI labs & tech", "ML engineer", "MS", "HEAVY", "Google DeepMind, OpenAI, Anthropic, Meta, Mistral"],
  ["AI & machine learning", "Formal math", "Formal math and Lean", "PhD", "SOLID", "DeepMind, Lean FRO, academia"],
  ["Insurance", "Insurers & consultancies", "Actuary (plus professional exams)", "MS", "LIGHT", "AIG, Chubb, Allianz, AXA, Milliman, WTW"],
  ["Energy", "Grid", "Grid optimization", "MS", "SOLID", "PJM, ERCOT, National Grid"],
  ["Energy", "Nuclear", "Nuclear Monte Carlo methods", "PhD", "SOLID", "Westinghouse, TerraPower, national labs"],
  ["Energy", "Fusion", "Fusion modeling", "PhD", "SOLID", "Commonwealth Fusion, Princeton Plasma Physics Lab, ITER"],
  ["Defense & national labs", "Intelligence", "Mathematician", "MS/PhD", "SOLID", "NSA", "US citizenship generally required"],
  ["Defense & national labs", "National labs", "Research scientist", "PhD", "SOLID", "Los Alamos, Sandia, Livermore, MIT Lincoln Lab", "US citizenship generally required"],
  ["Defense & national labs", "Defense industry", "Guidance and control", "MS/PhD", "SOLID", "Lockheed Martin, Raytheon, Northrop Grumman", "US citizenship generally required"],
  ["Aerospace & autonomy", "Aerospace, robotics, self-driving", "Fluid dynamics, guidance & control, Kalman filtering", "MS/PhD", "SOLID–HEAVY", "SpaceX, Blue Origin, Airbus, Waymo, Boston Dynamics"],
  ["Technology", "Marketplaces", "Pricing and marketplace optimization", "MS", "SOLID", "Uber, Amazon, Airbnb, Lyft"],
  ["Technology", "Airlines", "Revenue management", "MS", "SOLID", "Delta, United, Air France-KLM, Amadeus, Sabre"],
  ["Biomedicine", "Pharma", "Pharmacometrics and biostatistics", "MS/PhD", "LIGHT", "Pfizer, Novartis, Roche, Certara"],
  ["Biomedicine", "Research", "Computational biology", "PhD", "SOLID", "Broad Institute, Genentech, Isomorphic Labs"],
  ["Agriculture", "Agtech", "Crop and yield modeling", "MS", "SOLID", "Bayer Climate, John Deere, Indigo Ag"],
  ["Agriculture", "Genetics", "Quantitative genetics for cattle and horses", "MS/PhD", "LIGHT", "Genus/ABS, Select Sires, Neogen, breed associations"],
  ["Economic consulting", "Litigation & antitrust", "Litigation and antitrust modeling", "MS/PhD", "LIGHT", "Cornerstone Research, Analysis Group, Compass Lexecon, NERA"],
  ["Management consulting", "Strategy firms", "Generalist strategy consultant", "MS/PhD", "LIGHT", "McKinsey, BCG, Bain", "Hire math PhDs as generalists"],
  ["Management consulting", "Analytics arms", "Analytics and data science", "MS/PhD", "SOLID", "QuantumBlack (McKinsey), BCG X, Bain Advanced Analytics"],
  ["Management consulting", "Financial services & risk", "Financial-services and risk consultant", "MS/PhD", "LIGHT", "Oliver Wyman, Deloitte, PwC, EY, KPMG", "Oliver Wyman is the closest fit"],
  ["Management consulting", "Risk advisory", "Quant and model-risk advisory", "MS", "SOLID", "Big Four risk practices, Oliver Wyman, Accenture"],
  ["Other", "Security", "Cryptography", "PhD", "SOLID", "NSA, Google"],
  ["Other", "Quantum", "Quantum algorithms", "PhD", "SOLID", "IBM, Google, Quantinuum"],
  ["Other", "Entertainment", "Graphics simulation", "MS/PhD", "HEAVY", "Pixar, Weta, Epic Games"],
  ["Other", "Language technology", "Computational linguistics", "MS/PhD", "SOLID", "Language-technology teams at AI labs and large tech firms", "His four languages are an edge"],
  ["Other", "Academia", "Professor / researcher", "PhD", "LIGHT–SOLID", "Universities"],
];

// Tab "CS courses": Tier, Course, Title, Why, Suggested year, Notes
export const csCourses: [string, string, string, string, string, string?][] = [
  ["LIGHT", "01:198:111", "Introduction to Computer Science", "Taking it now (Fall 2026); Java", "Year 1"],
  ["LIGHT", "01:198:112", "Data Structures", "Core of all programming", "Year 1"],
  ["LIGHT", "01:198:439", "Introduction to Data Science", "Python, data handling, statistics in code", "Year 3"],
  ["LIGHT", "01:198:323", "Numerical Analysis and Computing", "Turning math into working code", "Year 3", "Check overlap with Math 373"],
  ["SOLID", "01:198:211", "Computer Architecture", "How code actually runs (C, memory)", "Year 2"],
  ["SOLID", "01:198:344", "Design and Analysis of Computer Algorithms", "Algorithms; staple of quant interviews", "Year 2", "Normally requires 205/206; confirm 300H and Math 477 satisfy it"],
  ["SOLID", "01:198:213", "Software Methodology", "Writing real, maintainable software", "Year 2"],
  ["SOLID", "01:198:336", "Principles of Information and Data Management", "Databases and SQL", "Year 3"],
  ["SOLID", "01:198:461", "Machine Learning Principles", "ML from the math side", "Year 3"],
  ["HEAVY", "01:198:214", "Systems Programming", "Low-level programming in C", "Year 4"],
  ["HEAVY", "01:198:440", "Introduction to Artificial Intelligence", "AI breadth", "Year 4"],
  ["HEAVY", "01:198:462", "Introduction to Deep Learning", "Neural networks, the base of AI research", "Year 4"],
  ["HEAVY", "01:198:416", "Operating Systems Design", "Concurrency, memory, performance", "Year 5 (graduate)", "Or a graduate systems course"],
  ["HEAVY", "01:198:417", "Distributed Systems", "Large-scale systems", "Year 5 (graduate)", "Or a graduate equivalent"],
  ["HEAVY", "01:198:431", "Software Engineering", "Team-scale projects", "Year 5 (graduate)"],
  ["HEAVY (optional)", "01:198:419", "Computer Security", "For cryptography or defense", "Graduate school"],
  ["HEAVY (optional)", "01:198:411", "Computer Architecture II", "For performance-critical trading systems", "Graduate school"],
  ["Covered", "01:198:205", "Discrete Structures I", "Covered by Math 300H placement", "—", "Believed equivalent; confirm with CS department"],
  ["Covered", "01:198:206", "Discrete Structures II", "Covered by Math 477 (probability)", "—", "Math 477 counts in its place"],
];

export const csNotes: string[] = [
  "Tiers stack: SOLID includes LIGHT; HEAVY includes SOLID.",
  "Course counts: LIGHT 4 · SOLID 9 · HEAVY 15 (+2 optional).",
  "Timing: LIGHT and SOLID are both complete by the end of year 3; HEAVY adds years 4-5.",
  "Courses not finished as an undergraduate can be completed during the master's or PhD, often as graduate equivalents.",
  "Rutgers intro courses are in Java; Python is learned on his own and in 439, 461, 462.",
  "Prerequisites are approximate; confirm in the Rutgers catalog.",
];

// Tab "Shortlist": Rank, Path, Degree, CS needed, Why
export const shortlist: [string, string, string, string, string][] = [
  ["1", "Derivatives pricing quant", "PhD", "SOLID", "The stochastic-calculus track directly; New York, London, Paris"],
  ["2", "Buy-side quant research or trading", "MS/PhD", "SOLID", "Highest pay ceiling"],
  ["3", "Commodity and weather-driven trading", "MS/PhD", "SOLID", "Close to the family's agricultural world"],
  ["4", "Tail and catastrophe risk", "MS/PhD", "SOLID", "Taleb's mathematics as a profession"],
  ["5", "Sports trading", "MS/PhD", "SOLID", "Quant-level pay in London"],
  ["6", "Generative AI theory", "PhD", "SOLID–HEAVY", "Diffusion models are Itô calculus"],
];

// Tab "Physics & engineering": Added discipline, Field opened, Firms, Notes
export const physicsEngineering: [string, string, string, string?][] = [
  ["Physics", "Plasma, fusion and nuclear", "Commonwealth Fusion, ITER, TerraPower, national labs", "Core staff rather than modeling support"],
  ["Physics", "Quantum computing", "IBM, Google Quantum AI, Quantinuum, IonQ, Pasqal"],
  ["Physics", "Semiconductors and optics", "ASML, Zeiss, TSMC, Intel"],
  ["Physics", "Big-science labs", "CERN, Fermilab, ESA, NASA JPL"],
  ["Physics", "Climate and atmospheric dynamics", "ECMWF, Met Office, NOAA, trading desks", "Strengthens weather trading"],
  ["Physics", "Geophysics", "SLB, Halliburton, TotalEnergies", "Seismic imaging, earthquake hazard"],
  ["Physics", "Medical physics", "Siemens Healthineers, Varian", "MRI, radiation therapy"],
  ["Physics", "Quant finance", "Renaissance, D.E. Shaw, Two Sigma", "Traditional physics-PhD pipeline"],
  ["Engineering", "Control and robotics", "Boston Dynamics, Tesla, ABB, Siemens"],
  ["Engineering", "Signal processing and communications", "Qualcomm, Ericsson, Nokia, defense radar and sonar"],
  ["Engineering", "Power systems", "Siemens Energy, GE Vernova, Schneider Electric, grid operators"],
  ["Engineering", "Motorsport (Formula 1)", "Mercedes, Red Bull, McLaren, Ferrari", "Aerodynamics, vehicle dynamics, race strategy"],
  ["Engineering", "Structural reliability and extremes", "Arup, AECOM, catastrophe modelers", "Earthquake, wind and flood engineering"],
  ["Engineering", "Aerospace", "SpaceX, Airbus, Rolls-Royce, Safran", "Flight dynamics, trajectory optimization"],
  ["Engineering", "Chip design and design automation", "NVIDIA, Synopsys, Cadence"],
];

// Tab "Key": Flag, Value, Meaning
export const key: [string, string, string][] = [
  ["Degree", "MS", "A master's is enough"],
  ["Degree", "PhD", "In practice needs a PhD"],
  ["Degree", "MS/PhD", "Either works; a PhD raises the ceiling"],
  ["CS needed", "LIGHT", "Python, R or MATLAB for analysis"],
  ["CS needed", "SOLID", "Production-quality code, data pipelines, real software habits"],
  ["CS needed", "HEAVY", "Full software engineering, large or low-latency systems"],
  ["Scope", "US and Europe", "Firms listed are examples of employers, not an exhaustive list"],
];
