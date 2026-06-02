---
dropped: 2026-06-02
source: Reddit r/vibecoding (thelocalnative), via Ajesh — 296 upvotes, ~55 comments
status: resolved — RVW-003 (NOT-YET; founder-facing plumbing-awareness skill, re-open when founder-facing build lands)
---

# Claim: teach vibe coders system architecture / "the plumbing" first, not code

A decade-experienced software engineer's advice for people new to building with AI.

## Core assertion (the load-bearing claim)

*If you're new to coding but vibe-coding non-stop, don't start at the lowest level (the code) — start
at the **highest** level: system architecture. AI can already produce a frontend/backend/database
easily; the highest-impact gap is **"the plumbing"** — how everything connects and stays standing —
because the AI will happily skip it unless you know to ask. You don't need every piece on day one,
but you need to know they exist by name so you know what to ask your AI to build.*

**Four components:** frontend (what the user sees) · backend (logic/rules) · database (where data
lives) · **the plumbing** (how it all connects + stays up — the iceberg below the waterline).

**The plumbing, as four questions:**
1. **How does everything talk?** → APIs (the "doors" the frontend uses to ask the backend for things).
2. **Where does it live / get online?** → hosting, domains & DNS, deployment pipeline, environment
   variables & secrets ("people get burned by this constantly").
3. **Who's allowed in, and is it safe?** → authentication (who you are), authorization (what you can
   do), security (broad — issues at every layer), backups ("a backup you never tested" is worse).
4. **How do you know it's working, not quietly on fire?** → version control ("start here, day one"),
   testing, monitoring & error tracking, analytics.

> "None of this shows up in the demo. All of it shows up the moment real people arrive."

## Comment additions worth vetting alongside

- **Friendly_Gold3533 (top comment):** add **rate limiting** — "missing it cost me $500 once." Frames
  the post's gift as *vocabulary* — "now they can ask AI for the right things." (Also plugs a checklist
  tool "runable" — one checklist per app: auth? yes. rate limiting? yes. backups tested? yes.)
- **ymddev:** the plumbing is also where **AI quietly creates *new* risks** — agentic tools/IDEs have
  their own ToS/privacy terms nobody fully understands; AI is a black box on massive data. If you
  don't know the plumbing exists you'll never ask for auth/secrets/backups/monitoring.
- **rash3rr:** emphasize **secrets management** — beginners commit API keys to public repos because the
  AI hardcoded them and they didn't know better; costs real money fast. The deeper gap: vibe coders
  **don't know when something is broken vs. working by accident** — the feedback loop doesn't kick in
  until users arrive. Version control day one.
- **dev_dan_2 (dev):** add the mental model **"where and when does this code run"** — local vs remote,
  server-side vs client-side. Also: **agency from understanding** — don't just take the LLM's artifact;
  use the LLM to *build understanding faster* (links "the cult of the artifact"). Learning needs
  struggle; vibe coding rewards fast and skips the struggle.
- **RADICCHI0 (dissent):** would invert it — learn **infrastructure, security, database FIRST**, even
  before app design + basic UX/usability, or you won't ship generally-useful apps. (Self-described
  non-programmer.)

## Why this is worth a careful vet later (my read — not the verdict)

Lands right on BOSS's turf: the AI-first template (`/ai-first-init`), `/ai-failure-states`, `/ai-cost`,
the cohort-aware conscience, and the `vibe-virtuoso` / `vibe-coder-newbie` / `first-product` cohorts.
Open questions for the vet: does BOSS already give vibe coders this "plumbing" map JIT, or is there a
real ADAPT here (a cohort-aware plumbing-awareness checklist that fires at the right mode)? Does the
"know it exists so you can ask the AI" framing duplicate BOSS's whole thesis or sharpen a specific
gap? Watch evidence grade (popular + practitioner, but n=1 experience) and the humane/security angle
(domain-expert cohort, secrets-in-repo harm).
