---
dropped: 2026-06-02
source: Lenny's Newsletter — Hamza Farooq & Jaya Rajwani, "Not all AI agents are created equal" (2026-04-14, paid), via Ajesh
url: https://www.lennysnewsletter.com/p/not-all-ai-agents-are-created-equal
status: resolved — RVW-008 (ADAPT, modest; categorize/start-simplest as a mentor-architect frame, strip stack taxonomy)
note: source images (category diagrams + per-category criteria tables) not retrievable — paywalled + fetch is text-only. Pasted text covers the framework. Re-paste a specific table as an image at vet time if it's load-bearing.
---

# Claim: "agent" is an umbrella term — categorize by architecture, then start at Category 1

Hamza Farooq & Jaya Rajwani (teach agent-engineering courses; enterprise work at Jack in the Box,
Tripadvisor, Home Depot). A prioritization framework for a backlog of agent ideas.

## Core assertion (the load-bearing claim)

*Teams can't prioritize agent initiatives with an impact-vs-effort matrix because they're comparing
**architecturally different systems** ("apples, oranges, and jet engines on the same spreadsheet").
The missing step is **hierarchy**: first classify each idea into one of three architectural
categories — that determines complexity, skills/infra, timeline, operating cost, and how to measure
success. **Start at Category 1; earn your way up.***

**The three categories:**
1. **Deterministic automation** — you define the whole flow; the LLM handles content at specific
   nodes (n8n / Zapier / Make / AgentKit / Gumloop). Finite predictable paths (<15-20 branches),
   seconds-to-minutes, automates a *known* process. **60-70% of opportunities. Where most teams should
   start** — fastest, lowest-risk, quick measurable ROI.
2. **Reasoning & acting (ReAct)** — you define the *tools*; the LLM decides what to do next in an
   observe→reason→act loop (LangGraph / CrewAI / AutoGen / ADK). For ambiguous requests, paths you
   can't map in advance, 5-15+ capabilities chosen by context, multimodal. **25-30%.** Comes *after*
   Category 1, when flexibility is genuinely required. Higher cost/risk/expertise.
3. **Multi-agent networks** — multiple specialized agents, each team-owned, coordinating and
   delegating to each other (ADK / AutoGen). For when one agent spans too many domains, tasks take
   hours/days, hundreds of parallel instances, cross-team ownership. **Reserved for later; almost
   never the starting point.**

**The core failure modes:** (a) building a Category-1 problem with Category-2 frameworks
(overengineering, unnecessary cost/complexity — the common one); (b) solving a Category-2 problem with
Category-1 tools (breaks in production — rarer but worse). **Per-category outgrowth signals** tell you
when to escalate (e.g. Cat-1: flowchart hits 30+ nodes / can't anticipate phrasings / needs
context-based tool choice → go Cat-2).

**Per-category metrics differ** (Cat-1: workflow completion %, automation rate, cost/workflow; Cat-2:
task completion, reasoning accuracy, tool-call efficiency, cost/session, business-impact lift). Real
examples cited with real numbers (email-support agent 52%→87% completion over 8 wks, $18K/mo savings;
shopping assistant conversion lift +8%→+22%).

## Why this is worth a careful vet later (my read — NOT the verdict)

**Possibly the most structurally-aligned drop in the batch** — it's BOSS's own thesis in a different
domain:
- **"Categorize, then start simplest, earn your way up" ≈ PRINCIPLE #2 (JIT, never premature
  ceremony) + the modes (Quickstart→MVP→V1→Scale).** "Don't build a multi-agent network when a
  deterministic workflow ships in 6 weeks" *is* the pseudo-app-vs-real-value-app discipline applied to
  agent architecture. The per-category **outgrowth signals** mirror BOSS's **mode-unlock triggers**.
- **mentor-architect turf** — "what should be AI vs not, start simple, defer complexity" is exactly
  what mentor-architect coaches. Strong **ADAPT** candidate: a Category-triage move inside
  `/ai-first-init` or `/spec` for AI-native FEATs — "which of the three is this agent, and are you
  starting at the right one?" Could pair with `mentor-architect` + `/ai-cost` (Cat-3 = six-figure LLM
  bill).
- Note the **self-reference**: BOSS *is* a Category-3 multi-agent system, and the post even cites
  Claude Code as the Category-2 exemplar — worth a wry check that BOSS practices what this preaches
  (did BOSS earn its multi-agent shape, or is it Cat-3-by-default? the board work / R&H #1 already
  guard this).

Tensions to pressure-test:
- **Scope/audience mismatch.** Written for **enterprise teams** (Fortune 500, ML eng teams, investor
  pressure) prioritizing an agent *backlog*. BOSS serves **solo / small AI-native founders**. Adopt
  the *principle* (categorize + earn-up), not the enterprise framing or the tool taxonomy
  (n8n/LangGraph/ADK — stack-specific, and PRINCIPLE #4 says stacks are learned not assumed).
- **Evidence grade — solid practitioner.** Named instructors with production examples + metrics +
  references (IBM agent types, Levels-of-Autonomy paper). Higher than the hype drops; real-numbers
  back it. The verdict turns on **scope-fit**, not evidence.
- **Promotional wrapper** (paid post + free-tools funnel + their courses) — strip it; vet the
  framework.
- Possible **duplicate risk**: if BOSS already encodes "start simple / earn the ceremony" thoroughly
  (it does, at the *project* mode level), the question is whether an *agent-architecture-level* triage
  adds something new for AI-native founders or just restates PRINCIPLE #2.
