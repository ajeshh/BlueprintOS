---
id: SESSION-2026-06-19-founder-test
type: ux-research-session
owner: pm
status: active
updated: 2026-06-19
---

# UX Research Session — founder-test (2026-06-19)

**Participant:** Ajesh (builder dogfooding the founder experience)
**Researcher:** Claude (UX-researcher mode — guide-if-stuck, capture-don't-analyze)
**Goal:** start a new BOSS project as a founder would, ask questions freely, surface friction.
**Method:** observe + assist in real time. Capture hesitations, expectation-gaps, and verbatim
quotes even when the researcher unblocks immediately. Analysis deferred until participant says done.

> Rule for this log: **observations only, verbatim where possible.** Interpretation, patterns,
> and severity go in the SYNTHESIS section at the very end — written only when Ajesh says he's done.
> Prior session: [SESSION-2026-06-03-founder-test](SESSION-2026-06-03-founder-test.md).

---

## Observation log

### OBS-001 — `/welcome` too long; loses the "next step"
- **Ajesh, verbatim:** *"With the first welcome message, its a bit too long. I get the gist, but i
  kinda forget after reading it what im supposed to do next, so if its long content, always tie it
  back to what is the next step close up."*
- **Context:** First contact with BOSS was `/welcome`. Comprehension was fine ("I get the gist"); the
  failure was **retention of the call-to-action** — the next step washed out by the time he finished.
- **Stated desire (design principle, founder's own words):** long content should **close by tying back
  to the single next step.** A recency-anchored CTA, not just a CTA buried mid-body.
- **Tags:** friction (onboarding), copy-length, call-to-action-placement, recency
- **Surface:** `/welcome` SKILL — likely also `/boss` wrap-up and any long skill output.
- **BUILT (v0.46.0):** root cause wasn't a missing CTA (one existed) — it was the beginner tour
  printing 3 reference sections (conscience/modes/help) *after* the next step, walling it off. Fix =
  new "close on the action" voice rule + a structural pivot that **offers** those sections instead of
  dumping them (`reference — expand only if asked`). The founder now leaves on `/boss`/`/triage`.

### OBS-002 — wanted to jump to VSCode immediately; didn't know how
- **Ajesh, verbatim:** *"yes I initiated in cli, but I wanted to do vscode immediate and didnt know
  what to do."*
- **Context:** Ran `boss new` in the terminal (CLI). Mental model was "now take me into VSCode" but the
  `boss new` output only says `claude  # open in Claude Code` — ambiguous between CLI Claude and the
  VSCode extension. No path from "scaffolded in terminal" → "now I'm building in my editor."
- **Tags:** friction (handoff-to-editor), host-ambiguity, next-step-after-`boss new`
- **Surface:** `cmdNew` console output (`src/cli.js:94-102`) — the "Next:" block assumes terminal Claude.

### OBS-003 — has existing idea doc(s); no obvious way to "drop them in" or reference them
- **Ajesh, verbatim:** *"if I already have doc or docs that have an idea. I wish there was a way to
  just drop it in. or ref them. I didnt know what to do."*
- **Context:** Founder arrives **with material already written** (one or more docs). The capability
  exists — `/boss path/to/prd.md` reads a PRD path — but it was **undiscoverable** at the moment of
  need, and it's **single-path** (no obvious story for *multiple* docs, or for a "drop folder").
- **Gap:** discovery (the founder didn't know the path arg existed) + capacity (one path, not many).
- **Tags:** friction (bring-your-own-docs), discoverability, single-vs-multi-doc, on-ramp
- **Surface:** `/boss` SKILL §1 (single path); `boss new` output + `/welcome` (neither advertises BYO-docs).

### OBS-004 — wants frictionless switching across hosts (Claude app / VSCode / Cursor)
- **Ajesh, verbatim:** *"one is to use claude app to code, the other is vscode, the other could be
  cursor. so i think having the flexibility to switch easily between any of them should be very easy."*
- **Context:** The founder doesn't think in terms of "Claude Code as host." He thinks: *I have several
  places I might code — the Claude desktop app, VSCode, Cursor — and BOSS should follow me to any of
  them, switchable at will.* The current scaffold writes `.claude/` (Claude Code's convention) — shared
  by the CLI and the VSCode/desktop Claude extensions, but **not** by Cursor (own `.cursor/` convention).
- **Strength of signal:** stated as an expectation ("should be very easy"), not a nice-to-have.
- **Tags:** host-portability, host-agnostic-scaffold, switching-cost, expectation-gap
- **Surface:** ties directly to **IDEA-006 (conscience host-portability)** — already in the backlog;
  this is a live founder pull on it. The whole `.claude/`-coupled scaffold (`stages/*/template/.claude/`).

### OBS-005 — "migrate my idea in from anywhere" (deepens OBS-003)
- **Ajesh, verbatim:** *"I may have jotted the idea anywhere, on a word doc, google doc, obsidian note.
  I think its a huge step for me to wait for the boss app to create a new folder. And then I dont know
  that I can drop it into it. I wish i was able to just point to a file, somewhere and it can create a
  dupe or read it, so that its then brought into the folder. Like I could have a pdf, or presentations
  or online references. Need someway to migrate them in."*
- **Two distinct frictions inside this:**
  1. **Ordering / ceremony:** "huge step to *wait* for BOSS to create a folder" before you can bring
     material in. The folder-first sequence feels backwards — material exists before the project does.
  2. **Source heterogeneity:** the idea lives in Word / Google Doc / Obsidian / PDF / slides / online
     refs (URLs). He wants to **point at any of these and have BOSS pull it in** (copy/duplicate into
     the project, or read-and-capture). No such on-ramp exists.
- **Implied feature:** a `boss import <path|url>` / "ingest sources" capability — point at heterogeneous
  material, BOSS migrates it into the project and seeds the IDEA from it. Could even precede/trigger
  `boss new` (material-first, folder-second).
- **Tags:** import-sources, material-first-vs-folder-first, multi-format (pdf/docx/url/obsidian),
  on-ramp, discoverability
- **Surface:** no current command. Closest is `/boss <path>` (single local path, founder didn't know).
- **CONFIRMED live (2026-06-19):** Ajesh had already run `boss new fraands` (`~/Projects/fraands`,
  healthy L0 scaffold — manifest/CLAUDE.md/`.claude/`/git all present). He read the project as
  *"empty… because i didnt know how to add"* and *"im stuck."* **Key insight:** the scaffold succeeded,
  but with **no captured idea**, the founder *experiences a working Quickstart project as "empty/stuck."*
  The missing on-ramp doesn't just cost convenience — it makes a correctly-scaffolded project read as
  broken. Ajesh, verbatim: *"the point is we need the import right?"* → import is the felt blocker.
- **Severity bump:** OBS-003/005 move from "discoverability nit" → "first-run dead-end." A founder who
  arrives with material (the common case) hits a wall right after `boss new`.
- **Decision (2026-06-19):** Ajesh declined the manual unstick — *"i dont need to have you unstick, i
  think its that we need to build out the import and then i can resume it in the fraands folder."* The
  fix is a **first-class import capability**, not a one-off assist. fraands becomes the dogfood target:
  build import → resume fraands through it. (Researcher hat pauses; builder hat on.)

---

## SYNTHESIS (write only when Ajesh says "done")

_— deferred —_
