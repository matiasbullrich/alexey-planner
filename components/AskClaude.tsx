"use client";
import { useState } from "react";

// Version 1: copy the prompt and open Claude in a new tab with it pre-filled.
// Version 2 (later, after handover): call the Claude API from a server route with Alexey's own key.
export default function AskClaude({ prompt, label = "Ask Claude about this" }: { prompt: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  const open = async () => {
    try { await navigator.clipboard.writeText(prompt); setCopied(true); } catch {}
    window.open(`https://claude.ai/new?q=${encodeURIComponent(prompt)}`, "_blank", "noopener");
  };
  return (
    <span>
      <button className="primary" onClick={open}>{label}</button>{" "}
      {copied ? <span className="muted small">Prompt copied — paste it if Claude opens empty.</span> : null}
    </span>
  );
}
