---
dropped: 2026-06-02
source: Infographic "21 hacks to NEVER hit Claude's limit" — Ruben Hassid, "How to AI" (how-to-ai.guide), via Ajesh
status: resolved — RVW-006 (REJECT; listicle out of scope; kept the "survive a fresh context window" comment as a minor /spec candidate)
---

# Claim(s): "21 hacks to never hit Claude's limit" (+ a high-signal comment)

> **Honest framing for the vet:** this is a *grab-bag listicle*, not one claim — mostly end-user
> Claude **token/usage** hacks, much of it harness-specific (Cowork, Chat, Projects, the 5-hour
> window, wispr.ai). Most are **out of scope** for BOSS (which is about building real businesses
> without fooling yourself, not minimizing token spend). At vet time, triage: isolate the 1-2 with
> real BOSS relevance and reject/skip the rest as out-of-scope. The **comment** is the most vet-worthy
> item.

## The 21 hacks (transcribed from the image)

1. **Convert files before uploading** — don't upload PDFs/screenshots/PPTX raw; paste text into a
   Google Doc, download as `.md`, upload that.
2. **Plan in Chat, Build in Cowork** — plan the structure in Chat first, then move to Cowork with
   "Build this exact file."
3. **Say "Ask me questions"** — "I want to [task] to [success criteria]. Read my folder. Ask me
   questions using AskUserQuestion before you start."
4. **Stop redoing the whole thing** — "Only redo section 3. Keep everything else." Add "No commentary.
   Just the output."
5. **Edit your original message** — in Chat, click Edit on the original instead of a new message;
   regenerate; the old exchange is replaced. (Chat only, not Cowork.)
6. **Reuse the same prompt structure** — keep a prompt library; swap only the variable part. "Same
   30-word prompt for 80% of my Cowork sessions."
7. **Batch tasks into one message** — one prompt "Summarize, list points, suggest a headline" instead
   of three.
8. **Pick the right model** — grammar/reformat → Sonnet or Haiku; save Opus + Extended Thinking for
   the real work.
9. **Keep your files short** — Cowork reads your folder before every task; trim to <2,000 words.
10. **Restart, don't follow up** — when it's wrong, click "Restart the conversation from here" on an
    earlier message instead of "No, I meant…".
11. **Summarize every 15-20 messages** — ask for a summary, copy it, open a new session, paste as the
    first message.
12. **Use Projects for recurring files** — upload the file once instead of to five chats.
13. **Turn off features you don't need** — web search, connectors, Explore mode default off; on per
    task (token cost).
14. **New topic = new chat** — always.
15. **Don't dump your whole folder** — include only files Claude needs; select 0 folders when none
    needed.
16. **Schedule recurring tasks** — use the `/schedule` plugin; set once.
17. **Stop using Claude for things it can't do** — images → ChatGPT; real-time search → Grok.
18. **Speak your prompts for more context** — wispr.ai voice → richer prompts in one shot.
19. **Set up Preferences** — Settings > General > Personal Preferences; set style; turn off Memory.
20. **Prompt Claude Code tightly** — very specific: "Build a bar chart from this CSV. Save as
    chart.png."
21. **Spread across the day** — rolling 5-hour window; earlier usage rolls off.

## The comment (the highest-signal item — likely the load-bearing claim)

> **Update on Hack 14 — use multiple conversations per topic.** Get the first conversation to write
> the plan, a new conversation to review it, a new conversation to execute. **"If your plan can't
> survive a new context window, it's probably not ready to be implemented."**

This is a real *discipline* idea, not a token hack: a plan/spec must be legible enough to survive a
fresh context — a portability/clarity test. Adjacent to BOSS's `/spec` (a spec is the artifact that
makes "we should build this" → "here's how we'll know it's done") and to the canvas's
snapshot-not-blueprint stance.

## My read on which (if any) touch BOSS (NOT the verdict)

- **The comment's "survive a new context window" test** — possible **ADAPT/sharpen** of `/spec`: add a
  fresh-context legibility check to a spec's acceptance, or a plan→review→execute separation. Most
  promising.
- **Hack 6 (prompt library, swap the variable part)** — adjacent to `prompt-coach` + the `library/`,
  but BOSS already has a UP/DOWN library discipline; likely duplicate.
- **Hack 3 ("ask me questions" / AskUserQuestion first)** — already covered (the conscience /
  ask-don't-assume; see [[RVW-001]]). Duplicate.
- **Hack 8 (right model for the task) / Hack 16 (/schedule)** — adjacent to model-recalibration
  ([[IDEA-014]]) and BOSS's loops, but these are usage tips, not BOSS practices.
- **Everything else (1, 2, 4, 5, 7, 9-15, 17-21)** — out of scope: Claude-product token/usage hacks,
  some vendor-specific (wispr.ai, Cowork), some now-stale-prone (5-hour window, feature toggles).
  Evidence grade low (content-marketing infographic).
