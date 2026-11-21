"use client";
import { useEffect, useState } from "react";
import { shopping, setup, type Item } from "@/data/security";

const KEY = "alexey-security-done";
const WORDS = "anchor basil canyon delta ember falcon garnet harbor island jaguar kettle lantern mango nectar oyster pampas quartz river saddle tango umber velvet walnut yonder zephyr acacia bramble cobalt dune estancia fjord glacier hazel indigo juniper kiwi lagoon meadow nutmeg orchid polo quince rambla sierra tundra urchin violet willow xenon yerba zenith".split(" ");

function rand(n: number) { const a = new Uint32Array(1); crypto.getRandomValues(a); return a[0] % n; }
function scramblePassword(len = 20) {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%&*?-_";
  return Array.from({ length: len }, () => chars[rand(chars.length)]).join("");
}
function scramblePhrase(n = 5) { return Array.from({ length: n }, () => WORDS[rand(WORDS.length)]).join("-") + "-" + (10 + rand(90)); }

function Row({ item, done, toggle }: { item: Item; done: boolean; toggle: () => void }) {
  return (
    <tr>
      <td style={{ width: 120 }}>
        <button onClick={toggle} style={{ fontWeight: 700, color: "#fff", border: "none", borderRadius: 6, padding: "4px 10px", background: done ? "#007A33" : "#c92a2a", cursor: "pointer" }}>
          {done ? "✓ Done" : "Missing"}
        </button>
      </td>
      <td><strong>{item.title}</strong>{item.cost ? <span className="small"> · {item.cost}</span> : null}<div className="small">{item.detail}{item.link ? <> · <a href={item.link} target="_blank" rel="noreferrer">Link</a></> : null}</div></td>
    </tr>
  );
}

export default function SecurityPage() {
  const [done, setDone] = useState<Record<string, boolean>>({});
  const [out, setOut] = useState<{ value: string; copied: boolean } | null>(null);
  useEffect(() => { try { setDone(JSON.parse(localStorage.getItem(KEY) || "{}")); } catch {} }, []);
  const toggle = (id: string) => { const next = { ...done, [id]: !done[id] }; setDone(next); try { localStorage.setItem(KEY, JSON.stringify(next)); } catch {} };
  const all = [...shopping, ...setup];
  const missing = all.filter((i) => !done[i.id]);
  const scramble = async (v: string) => { let copied = false; try { await navigator.clipboard.writeText(v); copied = true; } catch {} setOut({ value: v, copied }); setTimeout(() => setOut(null), 30000); };

  return (
    <>
      <h1>Passwords &amp; recovery</h1>
      <p className="lead">The plan: passwords live in Alexey's own <strong>Bitwarden</strong> vault, protected by <strong>three security keys</strong>, a handwritten passphrase in the safe, a recovery code, an emergency contact and a yearly export. This site never stores a password — it only tracks what's done.</p>
      <div className="card" style={{ borderLeft: `5px solid ${missing.length ? "#c92a2a" : "#007A33"}` }}>
        <h2 style={{ marginTop: 0 }}>{missing.length ? `We're missing ${missing.length} of ${all.length}` : "Everything is in place ✓"}</h2>
        {missing.length ? <ul style={{ margin: 0 }}>{missing.map((m) => <li key={m.id}>We're missing: {m.title}</li>)}</ul> : null}
        <p className="small muted" style={{ marginBottom: 0 }}>Tap "Missing" to mark an item done. Ticks are saved in this browser only, until the database is connected.</p>
      </div>

      <h2>1 · What to buy</h2>
      <table><tbody>{shopping.map((i) => <Row key={i.id} item={i} done={!!done[i.id]} toggle={() => toggle(i.id)} />)}</tbody></table>
      <p className="small muted">Prices checked November 2026; Bitwarden Premium $19.80/yr and Families $47.88/yr after their January 2026 increase.</p>

      <h2>2 · Set it up</h2>
      <table><tbody>{setup.map((i) => <Row key={i.id} item={i} done={!!done[i.id]} toggle={() => toggle(i.id)} />)}</tbody></table>

      <h2>3 · Scramble</h2>
      <p className="small">Makes a new password right here in the browser and copies it. Nothing is sent or saved — paste it into the site and into Bitwarden.</p>
      <div className="toolbar">
        <button className="primary" style={{ background: "#007A33", borderColor: "#007A33", fontWeight: 700 }} onClick={() => scramble(scramblePassword())}>Scramble password</button>
        <button onClick={() => scramble(scramblePhrase())}>Scramble passphrase</button>
      </div>
      {out ? <p className="mono-note" style={{ fontSize: 16, wordBreak: "break-all" }}>{out.value}<br /><span className="small">{out.copied ? "Copied to the clipboard." : "Copy it by hand."} This disappears in 30 seconds.</span></p> : null}

      <h2>Why this works</h2>
      <ul className="small">
        <li><strong>Forgot the passphrase?</strong> It's handwritten on the Emergency Kit in the safe, and the emergency contact can request access.</li>
        <li><strong>Lost a key?</strong> Two others still work; remove the lost one and register a new one.</li>
        <li><strong>Bitwarden goes out of business?</strong> Its code is open source, his devices keep a copy, and the yearly export is on the USB sticks.</li>
        <li><strong>Someone gets into the vault?</strong> With the pepper rule, ordinary passwords are stored incomplete ("S……A").</li>
      </ul>
    </>
  );
}
