import { Course, Rule, courseById } from "@/data/courses";

export type Status = "taken" | "inprogress" | "planned";
export type Record_ = Record<string, Status>;

export type Eval = {
  ok: boolean; // satisfied counting taken + in-progress
  needsPermission: boolean; // satisfied except for a permission line
  lines: Line[];
};
export type Line = { depth: number; text: string; state: "met" | "missing" | "perm" | "note" | "coreq" | "group" };

const label = (id: string) => {
  const c = courseById[id];
  return c ? `${id} ${c.title}` : id;
};

// Evaluate a rule tree against Alexey's record. "inprogress" counts as met (it will be, by next term).
export function evaluate(rule: Rule | undefined, rec: Record_, depth = 0, out: Line[] = []): { ok: boolean; perm: boolean; lines: Line[] } {
  if (!rule) return { ok: true, perm: false, lines: out };
  if (typeof rule === "string") {
    const s = rec[rule];
    const met = s === "taken" || s === "inprogress";
    out.push({ depth, text: `${label(rule)}${s === "inprogress" ? " (in progress)" : ""}`, state: met ? "met" : "missing" });
    return { ok: met, perm: false, lines: out };
  }
  if ("coreq" in rule) {
    const s = rec[rule.coreq];
    out.push({ depth, text: `${label(rule.coreq)} — may be taken at the same time`, state: s ? "met" : "coreq" });
    return { ok: true, perm: false, lines: out };
  }
  if ("perm" in rule) {
    const what = { SPN: "Special permission number (SPN)", placement: "Placement or proficiency", instructor: "Permission of instructor", honors: "Honors placement", graduate: "Graduate-course permission" }[rule.perm];
    out.push({ depth, text: `${what}${rule.note ? ` — ${rule.note}` : ""}`, state: "perm" });
    return { ok: true, perm: true, lines: out };
  }
  if ("note" in rule) {
    out.push({ depth, text: rule.note, state: "note" });
    return { ok: true, perm: false, lines: out };
  }
  const isAll = "all" in rule;
  const items = isAll ? rule.all : rule.any;
  out.push({ depth, text: isAll ? "All of:" : "One of:", state: "group" });
  const results = items.map((r) => evaluate(r, rec, depth + 1, out));
  const ok = isAll ? results.every((r) => r.ok) : results.some((r) => r.ok && !r.perm) || results.some((r) => r.ok);
  const perm = isAll ? results.some((r) => r.perm) : !results.some((r) => r.ok && !r.perm) && results.some((r) => r.perm);
  return { ok, perm, lines: out };
}

export function courseState(c: Course, rec: Record_): "taken" | "inprogress" | "eligible" | "permission" | "blocked" {
  const s = rec[c.id];
  if (s === "taken") return "taken";
  if (s === "inprogress") return "inprogress";
  const r = evaluate(c.prereq, rec);
  if (!r.ok) return "blocked";
  return r.perm ? "permission" : "eligible";
}

// Shortest list of missing courses (direct prerequisites that are not yet met), for the "walk back".
export function missingCourses(rule: Rule | undefined, rec: Record_): string[] {
  if (!rule) return [];
  if (typeof rule === "string") return rec[rule] ? [] : [rule];
  if ("coreq" in rule || "perm" in rule || "note" in rule) return [];
  if ("all" in rule) return rule.all.flatMap((r) => missingCourses(r, rec));
  const options = rule.any.map((r) => missingCourses(r, rec));
  if (options.some((o) => o.length === 0)) return [];
  return options.sort((a, b) => a.length - b.length)[0] ?? [];
}

// Courses this one unlocks (appear anywhere in their prerequisite tree).
export function mentions(rule: Rule | undefined, id: string): boolean {
  if (!rule) return false;
  if (typeof rule === "string") return rule === id;
  if ("coreq" in rule) return rule.coreq === id;
  if ("perm" in rule || "note" in rule) return false;
  return ("all" in rule ? rule.all : rule.any).some((r) => mentions(r, id));
}
