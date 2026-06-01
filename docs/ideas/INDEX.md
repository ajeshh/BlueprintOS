---
id: IDEAS-INDEX
type: index
owner: pm
status: active
---

# BlueprintOS — Idea Pool

BOSS's own backlog, dogfooding its own ID system.

| ID | Title | Status | Note |
|---|---|---|---|
| [IDEA-001](IDEA-001-learning-loop.md) | Learning loop (`/boss-learn` two-way router + `/boss-sync`) | ready | next build; closes UP/DOWN extraction (Principle 1) |
| [IDEA-002](IDEA-002-mvp-mode.md) | Author MVP mode (L1-mvp) | shipped | v0.14.0 — `boss unlock mvp` works; `/spec`+FEAT, `/smoke`, `/log`, `/close`, tester + program-manager + mentor-architect + mentor-gtm |
| [IDEA-003](IDEA-003-mentor-layer.md) | Mentor layer — incubator/advisory agents + founder dossier | exploring | the "much bigger idea"; design in `docs/MENTORS.md` |
| [IDEA-004](IDEA-004-temple-culture.md) | Temple culture layer — human-agent collaboration as decision infra | exploring | values as do/avoid/escalate rules + elevation ladder; the claimed differentiator |
| [IDEA-005](IDEA-005-brownfield-adoption.md) | Brownfield adoption — `boss adopt` for an already-started app | exploring | greenfield-only today; non-destructive primitives exist; "lite" = adopt at the register the app earned (Principle 2) |
| [IDEA-006](IDEA-006-conscience-host-portability.md) | Conscience host-portability — host contract for non-Claude agents | exploring | three layers: CLI agnostic, conscience Claude-bound, arc = precondition; name the host contract, don't port yet |
| [IDEA-007](IDEA-007-brand-spectrum-and-alter-ego.md) | Brand spectrum + bad-boss alter-ego ("BOSS.DK") | exploring | "Like a boss!"/"Boss mode"/BOSS.DK = one register-axis; humane = right action + humor, not warm words; alter-ego stays contained (opt-in, parodies the trope) |
| [IDEA-008](IDEA-008-evidence-loops.md) | Evidence-keyed loops + the remix model | shipped | v0.18.0 — promoted to FEAT-001. Generic loop runtime in Node, 2 named loops in Quickstart template, bash hook retired, 43/43 evals pass against the generic detector |
| [IDEA-009](IDEA-009-proto-personas-as-evolving-instruments.md) | Proto-personas as evolving research instruments | exploring | beginner personas that refactor + grow as real evidence arrives; build-integrated via persona-reactions-loop; field survey + BOSS's narrower contribution; Phase 1 (evidence-ledger retrofit) landed 2026-05-23 |
| [IDEA-010](IDEA-010-scalable-ai-design.md) | Scalable AI-assisted design — tokens, drift, prompt patterns | exploring | the AI-design failure-mode catalog (47 blues, pattern reinvention, billion-line drift); field survey + BOSS contribution (build-integration via loops, cohort-aware scaffolding, formalized prompt patterns, JIT design discipline); Phase 1 (practice-doc retrofit) landed 2026-05-23; Phase 2 (design-tokens-loop + /design-tokens-init) shipped v0.21.0; Phase 3 (design-drift-loop + ui-designer + ux-designer + /design-review + /ux-check) shipped v0.22.0 |
| [IDEA-011](IDEA-011-conscience-pause-and-self-discipline.md) | BOSS's own override discipline — conscience pause as session-level escape hatch | shipped | v0.23.0 — Phase 1 (pause primitive) shipped; Phase 2+ (per-loop opt-out, perf instrumentation, override discoverability) queued |
| [IDEA-013](IDEA-013-conscience-frequency-ledger.md) | Conscience frequency ledger — BOSS eats its own /ai-cost dogfood, honestly | shipped | v0.34.0 — reframed cost→frequency (a hook that never calls a model can't honestly price tokens); facts not estimates; `.boss/conscience-log.jsonl` + `boss conscience activity`; measure-only, self-throttle deferred (humane-before-viable); first correctness-invisible fire-path side effect |
| [IDEA-012](IDEA-012-strategic-feature-audit.md) | Strategic feature audit + revised roadmap | adopted-as-backlog | 30+ candidate features cataloged across 10 categories (build/production/primitives/templates/legal/outward-facing/brownfield/architecture/founder-experience/mentor-evolution); persona-reactions overlay; killer-use-case finding (the gap may be positioning, not a feature); revised roadmap v0.24 = positioning pass, v0.25 = AI cost tracking, v0.26+ pulls from catalog |

Canvas for BOSS itself: [CANVAS.md](CANVAS.md).

## Shipped (recent)
- v0.14.0 — MVP mode authored (closes IDEA-002): `boss unlock mvp` adds /spec+FEAT, /smoke, /log, /close, tester + program-manager + mentor-architect + mentor-gtm
- v0.10.0–v0.13.0 — conscience moments #1+#2 live, hook lets #1 fire unprompted, `boss sync` carries hooks/settings
- v0.9.0 — mentor layer structure + cornerstone mentor-venture
- v0.8.0 — learning loop (`boss sync`/`learn`, `claude-append.md`, /boss-sync + /boss-learn)
- v0.5.0 — PRINCIPLES.md + design-system practice
- v0.4.0 — Quickstart incubator: living `/triage` + Humane `/canvas`
- v0.3.0 — modes vocabulary (Quickstart/MVP/V1/Scale)
- v0.2.0 — `/boss` spin-up + repo-creation defaults
- v0.1.0 — walking skeleton (CLI + Quickstart stage)
