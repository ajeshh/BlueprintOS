---
dropped: 2026-06-02
source: "The Production Gap / Gen AI Demystified" — Hamza Farooq & Jaya Rajwani, "Understanding Context Engineering" (2025-07-13), via Ajesh
url: https://substack.com/home/post/p-167841557
status: resolved — RVW-009 (NOT-YET/reference; rationale under the cluster; re-open at conscience context-injection review)
note: images not retrievable (fetch is text-only); the diagrams are conceptual (failure-mode + solutions maps) and the text covers them.
---

# Claim: context engineering — manage the context window deliberately; four failure modes

More a *conceptual / reference* piece than a single prescriptive practice. Defines context engineering
(right info, right format, right time, dynamically) as the superset of prompt engineering (cites
Shopify's Tobi, Karpathy, LangChain).

## Core content (the load-bearing material)

**Four context failure modes:**
1. **Context poisoning** — hallucinated/wrong info enters context and gets repeatedly referenced;
   model reinforces the false belief (DeepMind Gemini 2.5 agent fixating on wrong goals over turns).
2. **Context distraction** — oversized context makes the model over-focus on repeated/irrelevant
   content and neglect training knowledge → less creativity. A "distraction ceiling" kicks in past a
   threshold (~100k tokens Gemini Pro; ~32k for smaller models). **Bigger context ≠ better.**
3. **Context confusion** — irrelevant data (esp. too many tool descriptions) → low-quality outputs;
   models randomly invoke irrelevant tools. **Cap active tools ~10-15** (a model failed at 46 tools,
   better at 19).
4. **Context clash** — conflicting instructions in context → inconsistent output. Sharding
   instructions across turns is worse than one concise unified prompt (Microsoft/Salesforce: up to
   39% drop; one model 98%→64%).

**Solutions:** RAG (rank/filter to most relevant; narrow the visible toolset) · context quarantine /
multi-agent isolated contexts (specialized agents, dedicated context, clean handoffs) · context
pruning (drop stale/irrelevant; the "Provenance" filter model) · summarization (compress near token
limits, carefully) · context offloading / memory systems (store outside the window).

## Why this matters for BOSS (my read — NOT the verdict)

This is the *theory layer under several other drops* — it reframes them from "tips" to "mitigations
of named failure modes." Likely a **REFERENCE** verdict (educational, not a single adoptable practice)
that nonetheless **strengthens an emerging cluster**:
- **Directly reinforces [[RVW-002]]** (lean the always-loaded doc): "context distraction" is the
  *mechanism* explaining why BOSS's 650-line `RESUME.md` loaded every session is a real cost, not just
  tidiness. Gives RVW-002 a research-backed rationale.
- **Bears on the conscience's design.** BOSS's hook injects `additionalContext` every prompt — that's
  context engineering. "Poisoning" + "distraction" are real risks for a conscience that fires often
  (ties to [[IDEA-013]] frequency ledger / over-fire smell). "Clash" warns against the conscience's
  voice contradicting CLAUDE.md (the v0.19 voice-fights-itself finding the indie-hacker persona
  caught).
- **"Quarantine / isolated context per agent"** ≈ BOSS's multi-agent (mentors/builders/personas)
  design — quiet validation that BOSS's agent isolation is sound.
- **Cap tools 10-15 / confusion** — relevant if BOSS ever ships many skills/MCP into one context
  (cohort-aware skill-set scoping?).

Tensions: evidence grade is *good* (synthesizes named research — DeepMind, MS/Salesforce, LangChain),
but it's a **survey, not a BOSS-adoptable practice**; the adoptable bits are downstream (RVW-002,
token-optimization drop). Promotional wrapper (subscriber funnel). Some specifics (token thresholds)
are model-version-bound → recalibration-sensitive ([[IDEA-014]]).
