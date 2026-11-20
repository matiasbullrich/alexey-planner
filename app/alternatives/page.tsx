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
      <h1>All schedule alternatives (vG)</h1>
      <p className="lead">Version G: the complete rutgers_schedule_alternatives_vF workbook (<a href={VF_URL} target="_blank" rel="noreferrer">original sheet</a>), plus the new <strong>5Y ASE Eng Physics + Math</strong> plan, semester by semester. Course numbers link to the course map.</p>
      <p className="flag">Rutgers discontinued the Mathematical Finance master's (MSMF) in January 2025; tabs that name it predate that. See <a href="/masters">4 or 5 years</a> for the current options.</p>
      <div className="toolbar" style={{ marginTop: 12 }}>
        {vfTabs.map((t, i) => (
          <button key={t.name} onClick={() => pick(i)} className={i === tab ? "primary" : undefined}
            style={t.name.startsWith("5Y ASE") ? { background: "#1b5e20", color: "#fff", fontWeight: 700, borderColor: "#1b5e20", boxShadow: i === tab ? "0 0 0 3px #a5d6a7" : undefined } : undefined}>{t.name}</button>
        ))}
      </div>
      <div className="card" style={{ marginTop: 8 }}>
        <SheetTab text={vfTabs[tab].text} />
      </div>
    </>
  );
}
