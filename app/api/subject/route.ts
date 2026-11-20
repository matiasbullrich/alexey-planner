import { NextRequest, NextResponse } from "next/server";
import { getSubject, DEFAULT_SEMESTER, semesterLabel } from "@/lib/rutgers";

export async function GET(req: NextRequest) {
  const subject = req.nextUrl.searchParams.get("subject") ?? "640";
  const semester = req.nextUrl.searchParams.get("semester") ?? DEFAULT_SEMESTER;
  if (!/^\d{3}$/.test(subject) || !/^\d{5}$/.test(semester)) return NextResponse.json({ error: "Bad request" }, { status: 400 });
  try {
    return NextResponse.json({ term: semesterLabel(semester), courses: await getSubject(subject, semester) });
  } catch {
    return NextResponse.json({ term: semesterLabel(semester), error: "Rutgers schedule unavailable right now." });
  }
}
