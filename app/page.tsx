import Link from "next/link";
import AlertBanner from "@/components/AlertBanner";
import { deadlines } from "@/data/opportunities";
import { plans } from "@/data/plans";
import Roadmap from "@/components/Roadmap";
import MinimumCS from "@/components/MinimumCS";

export default function Today() {
  return (
    <>
      <h1>Today</h1>
      <p className="lead">What is due, and where to go next. Deadlines within 14 days are outlined; within 7 days they pulse until you mark them seen.</p>
      <AlertBanner deadlines={deadlines} />
      <p className="small muted">Add these to your phone: subscribe to the <a href="/api/calendar">calendar feed</a> in Google Calendar (Other calendars → From URL).</p>

      <Roadmap />
      <MinimumCS />
      <p className="small">Curious beyond the requirements? <Link href="/explore">Explore</Link> epistemology, cognitive science, and reasoning about knowledge (the muddy children).</p>

      <h2>Explore</h2>
      <div className="grid">
        <Link href="/map" className="card" style={{ textDecoration: "none", color: "inherit" }}>
          <strong>Course map</strong>
          <p className="muted small">Click any course: can you take it, what's missing, live sections this term.</p>
        </Link>
        <Link href="/lanes" className="card" style={{ textDecoration: "none", color: "inherit" }}>
          <strong>Career lanes</strong>
          <p className="muted small">Quant trading, quant research, Silicon Valley, consulting, banking, private equity, turbine metallurgy, founding — each in its own color.</p>
        </Link>
        <Link href="/plans" className="card" style={{ textDecoration: "none", color: "inherit" }}>
          <strong>Plans &amp; goals</strong>
          <p className="muted small">{plans.length} plans checked against SCOFT, quantum, quant trading, combinatorics and AI.</p>
        </Link>
        <Link href="/careers" className="card" style={{ textDecoration: "none", color: "inherit" }}>
          <strong>Internships &amp; careers</strong>
          <p className="muted small">What to do each year, by type, and when each is recruited.</p>
        </Link>
        <Link href="/masters" className="card" style={{ textDecoration: "none", color: "inherit" }}>
          <strong>Four or five years</strong>
          <p className="muted small">Master's options and the year-3 fork.</p>
        </Link>
      </div>
    </>
  );
}
