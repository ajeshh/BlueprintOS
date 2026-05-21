---
name: boss-learn
description: Route a proven pattern two ways — UP into the BOSS library as a reusable superset practice, or DOWN into this app as hardened core functionality. The judgment layer over `boss learn`. Usage - /boss-learn [what to promote]
---

# /boss-learn — the two-destination router

PRINCIPLES #1: BOSS is always scaffolding, but at every natural breakpoint (a mode transition, a
shipped feature, the third time the same work repeats) you **pause and sort the pattern two ways.**
This skill is that router. It is **not** a one-way "promote to BOSS" — deciding UP vs DOWN *is* the
work.

## 0. Orient (silent)

- Read `PRINCIPLES.md` (#1 especially) and `.boss/manifest.json` (which project/mode you're in).
- Identify the concrete pattern: the file(s), prompt, workflow, convention, or token set in question.

## 1. Decide the destination

Ask one question if it's genuinely unclear; otherwise call it and say why.

- **UP → BOSS library** when the pattern is *project-neutral and reusable*: a workflow, an agent or
  skill shape, a hook, a best-practice doc, a memory seed. The test (PRINCIPLES #3): *could a sibling
  project reuse this without copy-pasting code?* If yes, it's superset.
- **DOWN → app core** when the pattern is *this product's actual functionality* that happens to be
  living as scaffold/ad-hoc. It belongs in the app's own modules, with the app's own tests — not in BOSS.

A pattern can route **both**: the generalized shape goes UP, the concrete implementation hardens DOWN.

## 2a. Route UP

1. **Generalize first.** Strip project specifics; replace them with `{{PLACEHOLDERS}}`. Domain logic
   never lands in `library/` (PRINCIPLES: stack- and project-neutral only). Write/clean the file.
2. **Pick a category:** `agents` · `skills` · `hooks` · `practices` · `memory-seed`.
3. **Promote it:**
   ```
   boss learn <path-to-generalized-file-or-dir> --as <category> --note "<one line: what & why>"
   ```
   This copies it into `library/<category>/`, bumps `VERSION` + `package.json` (minor by default;
   `--patch`/`--major`/`--version X.Y.Z` to override), and prepends a `registry/CHANGELOG.md` entry.
4. **Sharpen the CHANGELOG prose** by hand — the auto entry is a stub. The CHANGELOG is what every
   project reads via `/boss-sync`, so make it say what's new and why it matters.
5. Tell the user: connected projects pull this via `boss sync` / `/boss-sync`.

## 2b. Route DOWN

No BOSS version change. This is product, not scaffold. Give concrete guidance (or do it, if asked):
- Move the pattern from ad-hoc/scaffold into a **named, owned module/config** in the app.
- Add the app's own tests around it; wire it into the app's real flow.
- If a *generalizable shape* remains, note it for a follow-up UP — don't lock value into code (PRINCIPLES #3).

## 3. Close the loop

- Update `docs/RESUME.md` if this was a breakpoint worth recording.
- One-line summary: what moved, which direction, the new BOSS version (if UP), the next step.

## Rules

- Deciding the direction is the point — never default to UP. Most app code routes DOWN.
- Never put domain specifics in `library/`. Generalize or don't promote.
- `boss learn` edits the BOSS **source** repo (found via the registry's self-hosted entry, or
  `$BOSS_SRC`). Review its diff and commit deliberately — don't auto-commit BOSS.
- One pattern per run. If the user names several, take the clearest first.
