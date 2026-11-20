// "Explore" topics beyond the degree requirements. Course numbers and the semesters they ran come from
// the live Rutgers Schedule of Classes (checked November 2026). F26 = Fall 2026, S27 = Spring 2027, etc.

export type ExploreCourse = { id: string; title: string; seen: string; why: string };
export type ExploreTopic = { id: string; name: string; color: string; question: string; summary: string; courses: ExploreCourse[]; reading?: string[]; note?: string };

export const minimumCS = {
  title: "Minimum computer science",
  courses: [
    { id: "198:111", title: "Introduction to Computer Science", when: "Fall 2026 (taking now)", why: "The required intro; Java." },
    { id: "198:112", title: "Data Structures", when: "Spring 2027 (guaranteed)", why: "The course every technical interview assumes." },
    { id: "198:344", title: "Design and Analysis of Computer Algorithms", when: "Fall 2027 or later", why: "Algorithms and complexity. Rutgers accepts 198:112 + Math 477 as the prerequisite, so he can skip both discrete-structures courses (198:205/206)." },
  ],
  optional: [
    { id: "198:440", title: "Introduction to Artificial Intelligence", why: "Lists 198:205 or an ECE discrete-math course among its prerequisites; ask for a special permission number (SPN), citing 300H." },
    { id: "198:461", title: "Machine Learning Principles", why: "Needs 640:250 + 198:112 + 198:206 or a probability course; ask for an SPN, citing 477." },
  ],
  caveat: "Skipping 198:205/206 means picking up computer scientists' logic notation (∀, ∃, ⊢, ⊨, induction proofs written their way) on his own. It's easy for him, but worth a weekend.",
};

export const exploreTopics: ExploreTopic[] = [
  {
    id: "knowledge",
    name: "Reasoning about knowledge (the muddy children)",
    color: "#7048e8",
    question: "What does it mean for a group to know something — and for everyone to know that everyone knows it?",
    summary: "The muddy-children puzzle is the classic example from Fagin, Halpern, Moses and Vardi's book Reasoning About Knowledge (MIT Press, 1995): epistemic logic, common knowledge, distributed systems, and game theory. Rutgers has no course with that name; the pieces are spread across philosophy, math logic and CS. The book itself is best done as an independent study with a professor.",
    courses: [
      { id: "730:201", title: "Introduction to Logic", seen: "F26 · S27", why: "Gateway to 730:407; he could test out or take it quickly." },
      { id: "730:407", title: "Intermediate Logic I", seen: "S27", why: "Metalogic; modal logic is the language of knowledge operators. Prereq 730:201." },
      { id: "640:461", title: "Mathematical Logic", seen: "S27", why: "Completeness, compactness, computability — the math side." },
      { id: "730:424", title: "Logic of Decision", seen: "F25 · F26", why: "Decision theory and rational choice: what an agent should do given what it knows." },
      { id: "730:413", title: "Social Epistemology", seen: "S26", why: "Knowledge in groups — closest in spirit to common knowledge. Not offered every year." },
      { id: "198:440", title: "Introduction to Artificial Intelligence", seen: "every term", why: "Knowledge representation and multi-agent reasoning." },
      { id: "198:493", title: "Independent Study in Computer Science", seen: "every term", why: "The way to read Reasoning About Knowledge chapter by chapter with a faculty member." },
    ],
    reading: ["Fagin, Halpern, Moses, Vardi — Reasoning About Knowledge (chapters 1–2 hold the muddy children)", "Aumann (1976), 'Agreeing to Disagree' — common knowledge in game theory, used by quants and economists"],
  },
  {
    id: "epistemology",
    name: "Epistemology",
    color: "#c2255c",
    question: "What is knowledge, what justifies a belief, and how do evidence and probability fit in?",
    summary: "Philosophy's theory of knowledge. Rutgers philosophy is ranked among the very best in the world, especially in epistemology, mind and language — a real asset to use.",
    courses: [
      { id: "730:220", title: "Theory of Knowledge", seen: "S26 · S27", why: "The introductory epistemology course." },
      { id: "730:225", title: "Introduction to the Philosophy of Science", seen: "S26 · S27", why: "Evidence, confirmation, explanation." },
      { id: "730:109", title: "Introduction to Formal Reasoning and Decision Making", seen: "F26 · S27", why: "Probability and rational belief — close to how quants think." },
      { id: "730:413", title: "Social Epistemology", seen: "S26", why: "Testimony, disagreement, group knowledge." },
      { id: "730:226 / 730:426", title: "Philosophy of Physics", seen: "F26 / S27", why: "What quantum mechanics says about knowledge and measurement." },
    ],
  },
  {
    id: "cogsci",
    name: "Cognitive science",
    color: "#0ca678",
    question: "How do minds — human and machine — represent, learn and decide?",
    summary: "An interdisciplinary program (psychology, philosophy, linguistics, computer science). It connects to his languages through linguistics and to AI through computation. A minor is possible.",
    courses: [
      { id: "185:201", title: "Cognitive Science: A Multidisciplinary Introduction", seen: "F26 · S27", why: "The entry point." },
      { id: "185:301", title: "Cognition and Decision Making", seen: "F26 · S27", why: "Judgment under uncertainty — behavioral side of trading." },
      { id: "185:340", title: "Language and Cognition", seen: "F26 · S27", why: "Links to his multilingual side." },
      { id: "730:329", title: "Minds, Machines, and Persons", seen: "F26 · S27", why: "Can machines think? Very relevant to AI." },
      { id: "730:360", title: "Philosophical Issues in Cognitive Science", seen: "F26", why: "" },
      { id: "615:325", title: "Semantics", seen: "every term", why: "Formal meaning — uses logic and set theory." },
      { id: "615:350", title: "Pragmatics", seen: "every term", why: "What speakers know about each other's knowledge — close cousin of the muddy children." },
    ],
  },
];
