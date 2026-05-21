---
id: IDEA-003
type: idea
owner: pm
status: exploring
created: 2026-05-21
---

# Mentor layer — incubator/advisory agents + founder dossier

## Current shape
- **What:** A second class of agents beyond builders. **Mentors** (`mentor-*`) sit outside the app
  and *coach the founder* — ask hard questions, give counsel, help build concepts (business model,
  architecture strategy, fundraising, hiring). They accumulate a **founder dossier** that eventually
  helps real funding or recruiting a team.
- **Who it's for:** entrepreneurs — including those who don't know how to start a company — who want
  to be mentored from idea to fundable/hireable venture, if they choose.
- **Mentor roster (proposed):** venture-lead, business-strategist, technical-architect (advisory),
  go-to-market, fundraising-advisor, talent/team-building, pitch-coach, humane/ethics.
- **JIT per mode:** Quickstart = venture-lead (+ canvas); MVP = + architect, GTM; V1 = + fundraising,
  pitch, talent; Scale = full board.
- **Dossier artifacts:** Humane canvas → business proposal → architecture brief → pitch/deck outline
  → hiring plan → fundraising one-pager / data room.

## Capture log
- 2026-05-21 — Ajesh: "BOSS helps entrepreneurs bootstrap an idea and mentor them into a successful company if they choose." Two agent classes: builders vs mentors.
- 2026-05-21 — seed cornerstone `mentor-venture` into Quickstart; full board unlocks per mode.
- 2026-05-21 — Ajesh has **a list of real people whose best-practices for starting a new app**
  we should study and encode into the mentor roster (and likely `library/practices/` +
  `memory-seed/` via `/boss-learn`). *Awaiting the list.* Each person → source material for a
  mentor's voice/heuristics, or a named practice doc. (See open question on attribution below.)

## Open questions
- Where mentors live (project `.claude/agents/` with `mentor-` prefix vs a separate surface)?
- How much dossier is auto-generated vs founder-authored with mentor guidance?
- Business model for BOSS itself if this becomes its differentiator (see [CANVAS.md](CANVAS.md)).
- **Encoding real people:** do we map one person → one mentor agent, or distill many people into a
  few archetypal mentor roles (with attributed heuristics)? How to attribute/credit without
  misrepresenting anyone's actual views? (Lean toward archetypes seeded by named practices.)

## Design home
`docs/MENTORS.md` (to author) — the two-class model, roster, JIT mapping, dossier.
