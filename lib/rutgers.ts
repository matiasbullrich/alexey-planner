// Live sections from the public Rutgers Schedule of Classes feed (the same JSON the public
// classes.rutgers.edu page loads). No login involved. Cached for 6 hours on the server.
import { unstable_cache } from "next/cache";

export type Meeting = { day: string; start: string; end: string; campus: string; building: string; room: string; mode: string };
export type Section = { index: string; number: string; open: boolean; instructors: string[]; meetings: Meeting[]; notes: string };
export type LiveCourse = { id: string; title: string; prereqNotes: string; sections: Section[] };

const SUBJECTS = new Set(["640", "642", "750", "960", "198"]);

function hhmm(t?: string) {
  if (!t || t.length < 3) return "";
  const s = t.padStart(4, "0");
  return `${s.slice(0, 2)}:${s.slice(2)}`;
}

async function fetchAll(): Promise<Record<string, LiveCourse>> {
  const year = process.env.RUTGERS_YEAR ?? "2027";
  const term = process.env.RUTGERS_TERM ?? "1";
  const campus = process.env.RUTGERS_CAMPUS ?? "NB";
  const url = `https://classes.rutgers.edu/soc/api/courses.json?year=${year}&term=${term}&campus=${campus}`;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`Rutgers feed returned ${res.status}`);
  const data = (await res.json()) as any[];
  const out: Record<string, LiveCourse> = {};
  for (const c of data) {
    if (!SUBJECTS.has(String(c?.subject))) continue;
    const id = `${c.subject}:${c.courseNumber}`;
    out[id] = {
      id,
      title: c.title ?? "",
      prereqNotes: (c.preReqNotes ?? "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim(),
      sections: (c.sections ?? []).map((s: any) => ({
        index: String(s.index ?? ""),
        number: String(s.number ?? ""),
        open: Boolean(s.openStatus),
        instructors: (s.instructors ?? []).map((i: any) => i?.name).filter(Boolean),
        notes: [s.sectionNotes, s.comments?.map?.((x: any) => x?.description).join("; ")].filter(Boolean).join(" · "),
        meetings: (s.meetingTimes ?? []).map((m: any) => ({
          day: ({ M: "Mon", T: "Tue", W: "Wed", H: "Thu", F: "Fri", S: "Sat", U: "Sun" } as Record<string, string>)[m.meetingDay] ?? m.meetingDay ?? "",
          start: hhmm(m.startTimeMilitary),
          end: hhmm(m.endTimeMilitary),
          campus: m.campusName ?? m.campusAbbrev ?? "",
          building: m.buildingCode ?? "",
          room: m.roomNumber ?? "",
          mode: m.meetingModeDesc ?? "",
        })),
      })),
    };
  }
  return out;
}

// Cached per course, so each cache entry stays small.
export function getLiveCourse(id: string): Promise<LiveCourse | null> {
  return unstable_cache(async () => (await fetchAll())[id] ?? null, ["rutgers-soc", id, process.env.RUTGERS_YEAR ?? "", process.env.RUTGERS_TERM ?? ""], {
    revalidate: 60 * 60 * 6,
  })();
}

export function termLabel() {
  const t: Record<string, string> = { "0": "Winter", "1": "Spring", "7": "Summer", "9": "Fall" };
  return `${t[process.env.RUTGERS_TERM ?? "1"] ?? ""} ${process.env.RUTGERS_YEAR ?? "2027"}`;
}
