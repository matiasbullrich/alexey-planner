// Alexey's password & recovery plan. Nothing secret is ever stored in this app:
// passwords live in Alexey's own Bitwarden vault; this page tracks only what's done and what's missing.

export type Item = { id: string; title: string; detail: string; cost?: string; link?: string };

export const shopping: Item[] = [
  { id: "buy-keys", title: "3 × YubiKey 5C NFC", cost: "≈ $55–60 each (≈ $170)", detail: "USB-C plugs into the Mac; NFC taps on the iPhone. No battery. One on his keychain, one in the safe at home, one with Dad.", link: "https://www.yubico.com/store/" },
  { id: "buy-bitwarden", title: "Bitwarden Premium (or Families)", cost: "$19.80/yr (Families: $47.88/yr, up to 6 people)", detail: "Premium is needed for security-key login and emergency access. In Alexey's own name, paid with his own card after handover.", link: "https://bitwarden.com/pricing/" },
  { id: "buy-usb", title: "2 small USB sticks", cost: "≈ $10 each", detail: "For the yearly encrypted vault export: one in the home safe, one with Dad." },
  { id: "buy-safe", title: "Fire-resistant document pouch or small safe (if none at home)", cost: "≈ $30–80", detail: "Holds the printed Emergency Kit, a YubiKey, a USB stick." },
];

export const setup: Item[] = [
  { id: "bw-account", title: "Create Alexey's Bitwarden account", detail: "With his own email. He chooses and types the password himself — nobody else." },
  { id: "passphrase", title: "Master passphrase: 4–5 random words", detail: "Use the Scramble button below for ideas. Written by hand (not typed) on the printed Emergency Kit." },
  { id: "kit-printed", title: "Emergency Kit printed and in the safe", detail: "The sheet with his email, the vault address and the handwritten passphrase." },
  { id: "keys-vault", title: "All 3 YubiKeys registered on Bitwarden", detail: "Register every key on every account, so losing one never locks him out." },
  { id: "keys-email", title: "All 3 YubiKeys registered on his main email", detail: "Email is the master key to everything else — protect it first." },
  { id: "keys-bank", title: "YubiKeys (or app codes) on his bank", detail: "Use security keys where the bank allows them; otherwise the authenticator in Bitwarden." },
  { id: "keys-rutgers", title: "Rutgers NetID two-step login checked", detail: "Use whatever strongest method Rutgers offers; note it here." },
  { id: "recovery-code", title: "Bitwarden recovery code printed, stored apart from the kit", detail: "Kept somewhere different from the Emergency Kit, for example with Dad." },
  { id: "emergency-contact", title: "Emergency contact set in Bitwarden", detail: "Dad (or someone Alexey chooses) can request access if he's locked out." },
  { id: "export", title: "First encrypted vault export on the USB sticks", detail: "Then once a year. Protects him even if Bitwarden the company disappeared." },
  { id: "pepper", title: "Pepper rule decided (the 'S……A' method)", detail: "For ordinary accounts the vault stores only part of the password; the middle stays in his head. Middle at least 8–10 characters and varied by site." },
  { id: "iphone-move", title: "Passwords moved out of iPhone/iCloud into Bitwarden", detail: "So nothing depends on one Apple account." },
];
