"use client";
import { useEffect, useState } from "react";
import { vfTabs, VF_URL } from "@/data/vf";
import SheetTab from "@/components/SheetTab";

export default function AlternativesPage() {
  const [tab, setTab] = useState(0);
  useEffect(() => {
    const h = decodeURIComponent(window.location.hash.slice(1));
    const i = vfTabs.findIndex((t) => t.name === h);
    if (i >= 0) setTab(i);
  }, []);
  const pick = (i: number) => { setTab(i); history.replaceState(null, "", `#${encodeURIComponent(vfTabs[i].name)}`); };
  return (
    <>
      <h1>All schedule alternatives (vF)</h1>
      <p className="lead">The complete rutgers_schedule_alternatives_vF workbook, all {vfTabs.length} tabs, semester by semester. Course numbers link to the course map. <a href={VF_URL} target="_blank" rel="noreferrer">Open the original sheet</a>.</p>
      <p className="flag">Rutgers discontinued the Mathematical Finance master's (MSMF) in January 2025; tabs that name it predate that. See <a href="/masters">4 or 5 years</a> for the current options.</p>
      <div className="toolbar" style={{ marginTop: 12 }}>
        {vfTabs.map((t, i) => (
          <button key={t.name} onClick={() => pick(i)} className={i === tab ? "primary" : undefined}>{t.name}</button>
        ))}
      </div>
      <div className="card" style={{ marginTop: 8 }}>
        <SheetTab text={vfTabs[tab].text} />
      </div>
    </>
  );
}
