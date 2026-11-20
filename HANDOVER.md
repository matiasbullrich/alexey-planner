# Handover — making this yours

Everything here can be moved to your own accounts in about an hour. Do it in this order. You never need anyone else's password: you sign in with your own accounts and accept transfers.

## 1. Code (GitHub)
1. Create your own GitHub account if you don't have one, and turn on two-factor authentication.
2. Matias transfers the repository to you (GitHub → repository Settings → Transfer ownership), or you fork it / upload the code zip into a new private repository of yours.
3. Check you can see it at `github.com/<you>/alexey-planner`.

## 2. Hosting (Vercel)
1. Create a Vercel account by signing in with your GitHub.
2. Either accept the transferred project (Vercel → project Settings → Transfer) or click **Add New → Project**, pick the repository, and Deploy. No settings are needed.
3. Optional environment variables (Settings → Environment Variables): `RUTGERS_YEAR`, `RUTGERS_TERM` (1 spring, 7 summer, 9 fall), `NEXT_PUBLIC_REPO_URL`.
4. Optional domain: buy one in your own name (for example at Cloudflare) and add it under Settings → Domains.

## 3. Database (Supabase) — when you want your data saved online
1. Create a Supabase account and a project in your own organization (Matias can transfer one he set up: Supabase → project Settings → Transfer project).
2. Open SQL Editor and run `supabase/migrations/0001_init.sql`.
3. Turn on Auth → Multi-factor (TOTP).
4. Put `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` into Vercel's environment variables.

## 4. After the transfer
- Replace every key and token that was ever used during the build (Supabase keys, any API keys). Old ones must stop working.
- Decide whether Matias keeps view access (GitHub collaborator, Vercel member, Supabase member) or none.

## Rules that keep this safe
- Passwords live in a password manager (Bitwarden or 1Password), never in this app.
- No full Social Security number anywhere; documents like the FAFSA only as truly redacted copies (text removed, not covered).
- Sensitive fields go in the `vault` table, encrypted in your browser with a passphrase only you know.
- No scraping behind your Rutgers login; the app uses only public Rutgers data plus what you enter.
