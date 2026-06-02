---
id: RVW-012
type: verdict
owner: pm
status: recorded
created: 2026-06-02
verdict: NOT-YET
route: n/a (reference — informs IDEA-006 host contract + backs the cluster's enforce-in-harness principle)
---

# RVW-012 — Agent = Model + Harness; safety/permissions live in the harness

## The claim
- **Source:** Hamza Farooq & Aishwarya Ashok, "AI Agent Harnesses Explained." `docs/research/inbox/agent-harnesses-explained.md`
- **Core assertion:** *Every production agent is Model + Harness; the harness (not the model) does tool
  execution, memory, sandboxing, state, and **permission enforcement**. "If you trust the model to
  refuse bad actions, you have no safety." Codex vs Claude Code = opposite host bets; harness maturity
  levels 0-3; harness ≠ framework ≠ orchestrator.*

## Rubric
| # | Question | Finding |
|---|---|---|
| 1 | Contradicts a PRINCIPLE? | No. |
| 2 | Evidence grade | Practitioner + synthesizes Anthropic's own best-practices + real systems (Codex/Claude Code). Hamza corpus — discount the wrapper. |
| 3 | Duplicate or sharpen? | **Theory, not a practice.** Provides vocabulary for [[IDEA-006]] and the conceptual backing for the cluster. |
| 4 | Who serves / harms? | Informs IDEA-006; the **multi-user + governance half is out of scope** (BOSS is single-founder, local). |
| 5 | Cost / ceremony | N/A (reference). |

## Verdict: NOT-YET (reference)

Not a standalone practice. Two real uses, both deferred to the work they inform:
- **[[IDEA-006]] (host-portability / the host contract)** — the best vocabulary yet for that idea.
  BOSS's conscience *is* a harness-level hook (`UserPromptSubmit` → `additionalContext`); "hook =
  detection, model = voice" is this article's "enforcement lives in the harness." The Codex-vs-
  Claude-Code "opposite bets" framing is exactly the multi-host surface IDEA-006 defers. It could
  sharpen *how IDEA-006 names the contract* (which of the five harness responsibilities BOSS depends
  on the host for vs. provides itself).
- **Backs the cluster** — "enforce in the harness, don't trust the model to refuse" is the principle
  under [[RVW-005]] (`permissions.deny` > prompting) and [[RVW-010]].

## If REJECT / NOT-YET
- **Why not (as a practice):** conceptual survey + enterprise multi-user framing out of scope.
- **Re-open condition:** when [[IDEA-006]] is next worked — cite this for the host-contract vocabulary
  (the five responsibilities, the host-bet axis). **Optional now:** add a one-line cite to IDEA-006
  (like the [[RVW-001]]→IDEA-014 cite) — surfaced as a hand-off, not auto-applied.

## Notes
- Codex/Claude-Code specifics are host-version-bound → [[IDEA-014]] recalibration-sensitive.
- Author-concentration discount applies.
- BOSS version when recorded: 0.41.0
