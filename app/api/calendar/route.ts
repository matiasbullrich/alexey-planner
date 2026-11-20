// Private calendar feed (iCalendar) of every deadline, with phone alerts 7 days and 2 days before.
import { deadlines } from "@/data/opportunities";

export const dynamic = "force-static";

const esc = (s: string) => s.replace(/[\;,]/g, (m) => "\\" + m).replace(/\n/g, "\\n");

export function GET() {
  const stamp = new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d+/, "");
  const lines = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//alexey-planner//EN", "X-WR-CALNAME:Alexey · Rutgers deadlines", "CALSCALE:GREGORIAN"];
  for (const d of deadlines) {
    const day = d.date.replace(/-/g, "");
    lines.push(
      "BEGIN:VEVENT", `UID:${d.id}@alexey-planner`, `DTSTAMP:${stamp}`, `DTSTART;VALUE=DATE:${day}`,
      `SUMMARY:${esc((d.expected ? "Expected: " : "Due: ") + d.title)}`,
      `DESCRIPTION:${esc([d.note, d.link].filter(Boolean).join("\n"))}`,
      ...(d.link ? [`URL:${d.link}`] : []),
      "BEGIN:VALARM", "ACTION:DISPLAY", "DESCRIPTION:Deadline in 7 days", "TRIGGER:-P7D", "END:VALARM",
      "BEGIN:VALARM", "ACTION:DISPLAY", "DESCRIPTION:Deadline in 2 days", "TRIGGER:-P2D", "END:VALARM",
      "END:VEVENT",
    );
  }
  lines.push("END:VCALENDAR");
  return new Response(lines.join("\r\n"), { headers: { "Content-Type": "text/calendar; charset=utf-8" } });
}
