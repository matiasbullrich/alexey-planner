import { NextRequest, NextResponse } from "next/server";
import { getLiveCourse, DEFAULT_SEMESTER, semesterLabel } from "@/lib/rutgers";

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("course") ?? "";
  const semester = req.nextUrl.searchParams.get("semester") ?? DEFAULT_SEMESTER;
  if (!/^\d{3}:\d{3}H?$/.test(id) || !/^\d{5}$/.test(semester)) return NextResponse.json({ error: "Unknown course" }, { status: 400 });
  // Rutgers lists honors sections under the base number (e.g. 311 section H1).
  const base = id.replace(/H$/, "");
  try {
    const c = await getLiveCourse(base, semester);
    if (!c) return NextResponse.json({ term: semesterLabel(semester), sections: [] });
    const sections = id.endsWith("H") ? c.sections.filter((s) => s.number.toUpperCase().startsWith("H")) : c.sections;
    return NextResponse.json({ term: semesterLabel(semester), prereqNotes: c.prereqNotes, sections });
  } catch {
    return NextResponse.json({ term: semesterLabel(semester), error: "Live sections unavailable right now." });
  }
}
