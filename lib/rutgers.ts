// Live sections from the public Rutgers Schedule of Classes feed (the same JSON the public
// classes.rutgers.edu page loads). No login involved. Cached on the server.
//
// Semester codes follow the Schedule of Classes URLs: term digit + year.
//   92026 = Fall 2026 · 12027 = Spring 2027 · 72027 = Summer 2027 · 02027 = Winter 2027
import { unstable_cache } from "next/cache";

export type Meeting = { day: string; start: string; end: string; campus: string; building: string; room: string; mode: string };
export type Section = { index: string; number: string; open: boolean; instructors: string[]; meetings: Meeting[]; notes: string };
export type LiveCourse = { id: string; title: string; credits: string; prereqNotes: string; sections: Section[] };

export const SEMESTERS = [
  { code: "92026", label: "Fall 2026" },
  { code: "12027", label: "Spring 2027" },
  { code: "72027", label: "Summer 2027" },
  { code: "92027", label: "Fall 2027" },
];
export const DEFAULT_SEMESTER = process.env.RUTGERS_SEMESTER ?? "12027";
export const semesterLabel = (code: string) => SEMESTERS.find((s) => s.code === code)?.label ?? code;

const DAYS: Record<string, string> = { M: "Mon", T: "Tue", W: "Wed", H: "Thu", F: "Fri", S: "Sat", U: "Sun" };
const PM_FIX = (t?: string) => {
  if (!t || t.length < 3) return "";
  const s = t.padStart(4, "0");
  return `${s.slice(0, 2)}:${s.slice(2)}`;
};

async function fetchSubject(subject: string, semester: string): Promise<LiveCourse[]> {
  const term = semester.slice(0, 1), year = semester.slice(1);
  const campus = process.env.RUTGERS_CAMPUS ?? "NB";
  const url = `https://classes.rutgers.edu/soc/api/courses.json?year=${year}&term=${term}&campus=${campus}`;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`Rutgers feed returned ${res.status}`);
  const data = (await res.json()) as any[];
  return data
    .filter((c) => String(c?.subject) === subject)
    .map((c) => ({
      id: `${c.subject}:${c.courseNumber}`,
      title: c.expandedTitle?.trim() || c.title || "",
      credits: c.credits != null ? String(c.credits) : "",
      prereqNotes: (c.preReqNotes ?? "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim(),
      sections: (c.sections ?? []).map((s: any) => ({
        index: String(s.index ?? ""),
        number: String(s.number ?? ""),
        open: Boolean(s.openStatus),
        instructors: (s.instructors ?? []).map((i: any) => i?.name).filter(Boolean),
        notes: [s.sectionNotes, s.comments?.map?.((x: any) => x?.description).join("; ")].filter(Boolean).join(" · "),
        meetings: (s.meetingTimes ?? []).map((m: any) => ({
          day: DAYS[m.meetingDay] ?? m.meetingDay ?? "",
          start: PM_FIX(m.startTimeMilitary),
          end: PM_FIX(m.endTimeMilitary),
          campus: m.campusName ?? m.campusAbbrev ?? "",
          building: m.buildingCode ?? "",
          room: m.roomNumber ?? "",
          mode: m.meetingModeDesc ?? "",
        })),
      })),
    }))
    .sort((a, b) => a.id.localeCompare(b.id));
}

export function getSubject(subject: string, semester: string): Promise<LiveCourse[]> {
  return unstable_cache(() => fetchSubject(subject, semester), ["rutgers-soc-subject", subject, semester], { revalidate: 60 * 60 * 6 })();
}

export async function getLiveCourse(id: string, semester: string = DEFAULT_SEMESTER): Promise<LiveCourse | null> {
  const subject = id.split(":")[0];
  const list = await getSubject(subject, semester);
  return list.find((c) => c.id === id) ?? null;
}
