# Alexey · Rutgers planner

A private web app for planning Rutgers courses, degree paths, internships and deadlines.

**Owner:** Alexey. Built by Matias with Claude, then handed over. Read **HANDOVER.md** first.

## What it does (version 0.1)

- **Today** — deadlines with alerts (outlined at 14 days, a gentle pulse at 7), this year's schedule, and whether next year's targets (Physics 381, 227, 464) are on track.
- **Course map** — every relevant math, physics, statistics and CS course with prerequisite arrows. Click a course: what it needs (✓ / ✗ against your record), the shortest way to anything missing, what it unlocks, the plans it belongs to, and this term's live sections from the public Rutgers Schedule of Classes.
- **Plans & goals** — degree programs, named plans, and which plans reach SCOFT, quantum physics/computing, quant research/trading, combinatorics and AI theory.
- **Compare** — side-by-side course comparisons with an “Ask Claude” button.
- **Internships & careers** — what to do each year by type, and when each is recruited.
- **4 or 5 years** — master's routes.
- **Calendar feed** at `/api/calendar` — subscribe in Google Calendar to get every deadline with alerts 7 and 2 days before.

## Run it locally

```bash
npm install
cp .env.example .env.local   # optional
npm run dev                  # http://localhost:3000
```

## Edit the content

| To change | Edit |
| --- | --- |
| A course or its prerequisites | `data/courses.ts` (set `verified: true` once checked against the catalog) |
| This year's schedule | `data/myplan.ts` |
| Plans, programs, goals, master's routes | `data/plans.ts` |
| Deadlines, internships, careers, comparisons | `data/opportunities.ts` |

Push to `main` and Vercel redeploys in about a minute.

## Roadmap

1. Connect Supabase (schema in `supabase/migrations/0001_init.sql`), login with two-factor, move the personal record from the browser to the database.
2. WhatsApp reminders (weekly digest + 7-day and 2-day alerts) through the WhatsApp Business Platform.
3. Ask Claude inside the app (Claude API under his own key) instead of opening a new tab.
4. Job leads, research opportunities, Federal Work-Study, bills.
