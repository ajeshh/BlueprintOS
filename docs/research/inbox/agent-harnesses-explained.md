---
dropped: 2026-06-02
source: boringbot / "The Production Gap" — Hamza Farooq & Aishwarya Ashok, "AI Agent Harnesses Explained" (2026-05-08, paid), via Ajesh
url: https://boringbot.substack.com/p/ai-agent-harnesses-explained-architecture
status: resolved — RVW-012 (NOT-YET/reference; informs IDEA-006 host contract + backs enforce-in-harness; optional IDEA-006 cite)
note: images not retrievable (text-only fetch); they're architecture diagrams — the text conveys the concepts.
---

# Claim: Agent = Model + Harness; safety + permissions live in the harness, not the model

A conceptual/reference piece. Frames every production agent as **Model + Harness** — the model
generates tool calls; the harness decides which actually execute.

## Core content (the load-bearing material)

- **Five harness responsibilities:** tool execution · memory/context management · sandboxing · state
  persistence · **permission enforcement** (at execution time, not by trusting the model to
  self-police).
- **"Safety lives in the harness, not the model."** "If you're trusting the model to refuse bad
  actions, you have no safety. Refusals only count when the harness validates the tool-call schema and
  rejects it before execution."
- **Codex vs Claude Code = opposite bets:** Codex isolates via fresh cloud container per task; Claude
  Code runs locally and asks **explicit consent on each consequential action** (developer as
  co-signer). Both valid for different workflow profiles.
- **Harness maturity levels 0-3:** L0 bare invocation → L1 tool-calling wrapper → L2 session-aware
  (memory + snapshot rollback + sandbox, single user) → L3 multi-user production (per-user isolation,
  scoped permission matrices, attributed audit logs).
- **Harness ≠ framework ≠ orchestrator:** framework (LangChain/CrewAI) = construction kit;
  orchestrator (Temporal/Airflow) = task sequencing; **harness = the job site** that enforces
  constraints and is the safety boundary.
- **Multi-user + governance** (per-user permission inheritance, namespaced memory, tamper-evident
  logs; "who configures the tool registry / approves shared-memory writes / reviews audit logs" is an
  org-design problem) — the enterprise half.

## Why this matters for BOSS (my read — NOT the verdict)

Reference-grade, like [[context-engineering-failure-modes]] (#7) — the *theory layer*, not a single
adoptable practice. Two real connections:
- **IDEA-006 (conscience host-portability / the host contract).** This is the best vocabulary yet for
  that idea. BOSS's conscience is a **harness-level hook** (`UserPromptSubmit` → `additionalContext`),
  and "hook = detection, model = voice" is *exactly* this article's "safety/enforcement lives in the
  harness." The Codex-vs-Claude-Code "opposite bets" framing is precisely the multi-host surface
  IDEA-006 defers — this could sharpen how IDEA-006 *names* the host contract (which of the five
  responsibilities BOSS depends on the host for vs. provides itself). Strong **REFERENCE → informs
  IDEA-006** outcome.
- **Reinforces the context-discipline cluster (#3 deny-.env, #8 token-optimization).** "Enforce in the
  harness, not by prompting the model" is the *principle* under `permissions.deny` (a hard block) being
  better than `.claudeignore` (a signal) or a steering prompt. This article is the conceptual backing
  for why the deny-list drop is sound. Vet alongside the cluster.

Tensions: **mostly conceptual/educational** (a survey, not a BOSS practice); the **multi-user +
governance half is out of scope** (BOSS is single-founder, local). Codex/Claude-Code specifics are
host-version-bound → recalibration-sensitive ([[IDEA-014]]). Likely verdict: **REFERENCE / NOT-YET as
practice → cite in IDEA-006**, not a standalone ADOPT.

## ⚠️ Batch-level note for the sweep (author concentration)

This is the **~6th piece by Hamza Farooq** in the queue (three-categories #6, context-engineering #7,
token-optimization #8, n8n-travel-agent #9, this #10 + the couch-to-5k is a different author). The
"respected practitioner" rung of the evidence rubric (#2) should **not be counted six times** — it's
one author's ecosystem/worldview, much of it course/newsletter-funnel content. Cross-confirmation
*within* one author's corpus isn't independent evidence. Worth flagging at sweep so the cluster's
weight reflects *distinct* sources (the deny-.env PSA, slaorta, StokeJar, DeepMind/MS research cited
*inside* the pieces) rather than repetition of one voice.
