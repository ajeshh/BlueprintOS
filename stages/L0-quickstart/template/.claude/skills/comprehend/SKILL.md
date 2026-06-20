---
name: comprehend
description: AI-native scaffold tailoring — read what BOSS can actually understand about this project (the captured idea, the source material, or the adopted repo) and tailor the scaffold to it non-destructively, plus seed the venture brain with an honest first read so the conscience has continuity from day one. Augments the deterministic template scaffold; never replaces it. Opt-in via `boss new --ai` / `boss adopt --ai`. Usage - /comprehend
---

# /comprehend — tailor the scaffold to what BOSS understands

The deterministic scaffold (the `stages/L{0..3}` templates) is the same for every project — that's the
point: it's the reversible, diffable base. `/comprehend` is the **augmentation**: it reads what's
actually here and tailors that base to *this* venture, so BOSS starts from understanding instead of a
generic copy.

> **The guardrail (IDEA-022 Track 3 — read this first):** everything `/comprehend` does is **additive
> and reversible** — plain-text writes the founder can diff and `git revert`. It **never** deletes or
> rewrites the deterministic scaffold; it fills in placeholders and seeds the brain. A model-generated
> scaffold you can't inspect is exactly what BOSS warns founders against. If it can't be diffed, it
> doesn't ship. Run only when `aiNative` is set (`boss new --ai` / `boss adopt --ai`) or the founder
> asks; otherwise the plain template is correct.

## When to run it

- Right after `boss new --ai <idea>` (once there's a captured idea / source) or `boss adopt --ai` (the
  existing repo is the material).
- Any time later, to re-tailor after the understanding has grown (it re-reads and updates, idempotent).

## What it reads (what BOSS can honestly understand)

In order of strength — use whatever exists, say what you used:
1. **An adopted repo** (`boss adopt --ai`) — read the code, README, structure, deps (use the wide
   context; this is the strongest signal). Infer what it is, who it's for, what stage it's at.
2. **Captured idea + source** — `docs/ideas/*.md` + anything under `docs/source/` (`/import`/`/boss`
   pulled it in).
3. **Nothing yet** — if there's no idea and no repo, say so and stop: *"Nothing to comprehend yet —
   run `/boss <your idea>` or `/import` first, then come back."* Don't invent understanding.

## What it does (all additive, all reversible)

1. **Fill the project overview** — replace the `_TBD_` overview placeholder in **`AGENTS.md`** (the
   host-neutral file) with a real, honest 2–4 line read of what this is, who it's for, and the stage
   it's at. Mark anything you're unsure of as an open question, not a claim.
2. **Seed the venture brain** — write the *first* dated read into `.boss/brain/read.md` (create it):
   a short, first-person, **honest** standing summary of what you understand and — crucially — **what
   you don't know yet** (the questions a real conversation would answer). Then stamp it:
   `boss brain record --headline "<one line>"`. This is what gives the conscience continuity from day
   one (it can now voice *with* this read — IDEA-022 Track 4). Honor the brain's must-nots: no
   flattery, no diagnosing the founder, no certainty the material doesn't support; if thin, say less.
3. **Suggest the disciplines that fit** (recommend, don't auto-apply) — based on what you read, name
   the 1–3 optional disciplines worth turning on, and why: AI in the path → `/ai-first-init`; UI
   accumulating → `/design-tokens-init`; untrusted input / regulated data → opt into `secrets-guard` +
   `/red-team`; a target user worth modeling → `/persona`. The founder confirms each.
4. **Show your work** — end with a 3-line summary of exactly what you wrote (which files), so it's
   obvious what to keep or revert. *"I tailored AGENTS.md's overview, seeded the brain with a first
   read, and suggested `/ai-first-init`. All of it is in your working tree — diff or revert anything."*

## Cohort-aware
- `first-product` / `non-tech-founder` — plain language; frame it as "I read what's here and wrote down
  what I understand — correct me where I'm wrong."
- `eng-builder` / `returning-founder` — terse; lead with the inferred stage + the open questions; make
  the diff-and-revert affordance explicit up front.
- `domain-expert` — flag that domain stakes aren't fully in training data; your read is a starting
  point, their expertise outranks it.

## Rules

- **Augment, never replace.** The deterministic scaffold is the base; you fill and seed, you don't
  rewrite. Never touch the template skills/agents/hooks.
- **Inspectable + reversible or it doesn't ship.** Everything is a plain-text write in the working
  tree. Show what you wrote.
- **Honest understanding only.** Read what's there; mark guesses as guesses; "I don't know yet" is a
  valid (and valuable) output. No invented depth — that's the fortune-cookie failure the brain forbids.
- **Recommend disciplines, don't impose them.** Principle #2 (just-in-time): suggest what fits, the
  founder turns it on.
