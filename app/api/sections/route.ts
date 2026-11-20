import { NextRequest, NextResponse } from "next/server";
import { getLiveCourse, termLabel } from "@/lib/rutgers";

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("course") ?? "";
  if (!/^\d{3}:\d{3}H?$/.test(id)) return NextResponse.json({ error: "Unknown course" }, { status: 400 });
  // Rutgers lists honors sections under the base number (e.g. 311 section H1).
  const base = id.replace(/H$/, "");
  try {
    const c = await getLiveCourse(base);
    if (!c) return NextResponse.json({ term: termLabel(), sections: [] });
    const sections = id.endsWith("H") ? c.sections.filter((s) => s.number.toUpperCase().startsWith("H")) : c.sections;
    return NextResponse.json({ term: termLabel(), prereqNotes: c.prereqNotes, sections });
  } catch {
    return NextResponse.json({ term: termLabel(), error: "Live sections unavailable right now." });
  }
}
