// Alexey's current schedule (course enrolment only — no grades, aid or other personal data).
// Edit this file as registration settles. The map uses it as the starting record in a new browser.

export type PlanItem = { id: string; label?: string; status: "guaranteed" | "pending" | "option"; note?: string };

// Credit already on the record (proficiency exams and placement).
export const baseline: string[] = ["640:151", "640:152", "640:250", "640:251", "640:300H"];

export const fall2026: PlanItem[] = [
  { id: "640:311H", status: "guaranteed" },
  { id: "640:252", status: "guaranteed" },
  { id: "640:454", status: "guaranteed" },
  { id: "750:123", status: "guaranteed" },
  { id: "198:111", status: "guaranteed" },
  { id: "core", label: "SAS Core course", status: "guaranteed" },
];

export const spring2027: PlanItem[] = [
  { id: "640:477", status: "guaranteed" },
  { id: "640:421", status: "guaranteed", note: "Switch to 423 if the closed-class form comes through." },
  { id: "198:112", status: "guaranteed" },
  { id: "750:124", status: "guaranteed", note: "The course that opens Physics 381 next year." },
  { id: "640:350H", status: "pending", note: "Honors SPN pending; 350 (regular) is the backup — its closed-class form is also pending." },
  { id: "640:403", status: "option", note: "Applied for in case 350H does not come through." },
  { id: "640:423", status: "pending", note: "Needs the closed-class form; would replace 421 (only one counts)." },
  { id: "640:354", status: "option", note: "Maybe, if a slot opens." },
  { id: "english-1", label: "English course", status: "guaranteed" },
  { id: "english-2", label: "English seminar", status: "guaranteed" },
];

// Targets to keep visible on the Today page.
export const targets: { id: string; when: string; why: string }[] = [
  { id: "750:381", when: "Fall 2027", why: "Mechanics I — the gate to the upper-division physics sequence." },
  { id: "750:227", when: "Fall 2027", why: "E&M intro; with 228 it opens 361 Quantum and 385 Electromagnetism." },
  { id: "750:464", when: "Fall 2027 or later (fall only)", why: "Mathematical Physics; opened by 421 or 423." },
];

// Starting record for the map: baseline = taken; fall = in progress.
export function seedRecord(): Record<string, "taken" | "inprogress"> {
  const r: Record<string, "taken" | "inprogress"> = {};
  baseline.forEach((id) => (r[id] = "taken"));
  fall2026.filter((i) => i.id.includes(":")).forEach((i) => (r[i.id] = "inprogress"));
  return r;
}
