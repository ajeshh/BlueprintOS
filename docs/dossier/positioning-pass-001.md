---
id: POSITIONING-001
type: positioning
owner: pm
status: active
created: 2026-05-23
framework: April Dunford — *Obviously Awesome* (positioning by competitive alternatives)
informed_by: [boss-advisory-pass-001.md, persona-reactions/conscience-moment-1.md, IDEA-012]
---

# Positioning pass 001 — what BOSS is, in the founder's frame

> First execution of the Dunford exercise — explicitly recommended in the v0.15 advisory pass,
> deferred through 8 capability releases, finally landing as v0.24 work per IDEA-012's
> killer-use-case finding. The output: a one-sentence killer description that survives the
> stranger-read test, cohort-tailored variants per persona, and the positioning that the next
> 3-5 feature decisions get calibrated against.
>
> **The frame: positioning is not what BOSS says about itself; it's what the founder hears
> BOSS as, against the alternatives they're already using.** Anything that doesn't survive
> the comparison is aspirational, not positioning.

## 1. Who loves BOSS today (honest)

**One user: Ajesh.** BOSS is self-hosted; it dogfoods itself; no non-Ajesh founder has used
it in earnest yet. This is recorded honestly — see the extended override on advisory-pass #1.
That fact is load-bearing: positioning today is *target* positioning, not validated
positioning. The Dunford discipline asks us to imagine the cohort we'd *build for if we got
to choose*, not the cohort that's already loving the product (because there isn't one yet).

## 2. Target cohort (the smallest viable audience)

From the canvas v0.2 People cell + the persona-reactions in v0.19:

> **The founder who's already used Claude Code or Cursor for 3+ months, has 2+ unfinished
> projects in their git, and is starting to suspect they need a bit more structure but
> doesn't want a heavyweight framework.**

That's the cohort. Specifically: indie-hacker + vibe-virtuoso + returning-founder shapes
overlap here. Eng-builder partially overlaps (newer to founder skills than to engineering).
**Less-served by today's BOSS:** first-product (needs more teaching than BOSS currently
delivers), non-tech-founder (needs less terminal), domain-expert (needs domain-aware features
not yet built).

This is **not** the cohort BOSS has the most love for; it's the cohort BOSS can credibly
serve *today* with its current capability. The under-served cohorts are honest gaps the
roadmap addresses over time.

## 3. Competitive alternatives — what this founder uses today if BOSS doesn't exist

Honest list of what the target founder reaches for:

| Alternative | Shape | Strengths | Weaknesses for our cohort |
|---|---|---|---|
| **Cursor + a folder of projects** | The "no scaffold" default | Frictionless start; familiar IDE; AI in the loop | No discipline; no shape; the founder reinvents the same scaffolding every time |
| **Claude Code + a folder + ad-hoc prompts** | Same shape, different IDE | Frictionless; first-class agent/skill ecosystem | Same — no integrated discipline |
| **`npx create-next-app` / `create-vite` / etc.** | Lightweight stack scaffolders | Generate working code in seconds | Generate code, not discipline; stack-specific only |
| **Lovable / v0 / Bolt** | AI-first scaffolders | Generate working apps from prompts; impressive demos | Weak on what-to-build-next; the discipline gap is bigger, not smaller, because speed compounds drift |
| **YC Startup School / Reforge / Lenny's Newsletter** | Reading-based discipline | Real wisdom; established frameworks | Separate from the build; the founder has to translate; nothing in the IDE |
| **Notion / Linear / spreadsheet PM** | Project tracking | Familiar; flexible | Tracks tasks; doesn't shape work; doesn't catch drift; doesn't show up at the right moment |
| **A consultant / advisor / coach** | Human mentor | Real wisdom in context | Expensive; intermittent; not in the IDE; doesn't remember your project |
| **The cobble: Cursor + Notion + a YouTube about Lean + a founder friend on Discord** | The real-world default | Whatever works | Tool-juggling; vocabulary mismatch; nothing integrates |

The most common alternative is the cobble. BOSS competes *against the cobble*, not against
any single tool.

## 4. Unique attributes — what BOSS has that survive scrutiny

For each attribute, the test: *does this exist in the alternatives above?* If yes, drop it.
If no, keep it. After the cut:

| Attribute | Why it survives |
|---|---|
| **A conscience that nudges JIT (moment-based, structured signal, cohort-aware voice)** | Nothing else has this. Notion can remind you; Cursor can complete code; YC docs can teach. None of them speak to the founder *at the right moment, in BOSS's voice, with override available.* |
| **The loop primitive (declarative composable discipline)** | Frameworks have processes; tools have features; nobody has *predicates-evaluating-against-filesystem-state-driving-cohort-aware-voice-composition* as a generic mechanism. |
| **A mentor board with named-practice attribution** | YC has advice; consultants have advice; LLM-as-coach gives advice. Nobody composes 8 distinct mentor agents who cite specific practitioners by name and never impersonate them. |
| **The override grammar (deviation conscious, recorded, never blocked)** | This is rare. Most discipline tools either fight the founder (block) or stay silent (no signal). The override-record-respect pattern is BOSS-distinctive. |
| **Cohort-aware delivery (one tool, N voices)** | Most tools are one-sized. BOSS's `.boss/config.json cohort` + composeContext + cohort-specific framing is novel as a runtime pattern, even if "cohorts" exist in marketing. |
| **Right-sized / calm-company default** | Most founder tools default to venture-shape (growth-hacking, scale-pressure, "you should raise"). BOSS defaults to "don't raise / don't hire / stay right-sized" and earns the other paths only on evidence. |
| **Persona-reactions as build-integrated eval channel** | NN/Group + Indi Young have written on AI personas; nobody has personas-as-loops integrated into the build cadence. |
| **Stage-based scaffolding (modes earn ceremony additively)** | Enterprise scaffolders go all-in; lightweight scaffolders give you nothing. The progressive-unlock pattern (Quickstart → MVP → V1 → Scale) is BOSS-distinctive. |

Eight attributes survive. **None of them are about generating code.** BOSS doesn't compete on
the "generates working app from prompt" axis at all — that's Lovable / v0 / Bolt's turf.
BOSS's whole leg-up is in the *founder's thinking layer*.

## 5. Map attributes to value (what those enable)

| Attribute | Value to the founder |
|---|---|
| Conscience JIT | *"I'm not fooling myself."* The founder catches drift before it compounds. |
| Loop primitive | *"I can remix the discipline."* The founder isn't trapped in a framework. |
| Mentor board | *"I don't have to know what I don't know."* Coverage of founder-craft the code can't teach. |
| Override grammar | *"The tool doesn't fight me."* Speed in flow + recorded deviation when it matters. |
| Cohort-aware delivery | *"The tool meets me where I am."* No one-sized-fits-all condescension. |
| Calm-company default | *"This won't push me toward shapes that hurt me."* No growth-hacking pressure. |
| Persona-reactions | *"I can pre-filter what to ask real users."* Cheap signal before expensive validation. |
| Stage scaffolding | *"I don't drown in ceremony or in a blank repo."* Ceremony scales with evidence. |

## 6. Market frame options

Several plausible frames; each has implications:

| Frame | Pro | Con |
|---|---|---|
| **AI-native incubator** (BOSS's current self-description) | Honest; descriptive | "Incubator" reads YC-shaped to most strangers — wrong association |
| **Founder development environment** | IDE-analog is clean; reads like a category | New category; high-cost to establish |
| **Calm-company scaffolder** | Sharp differentiation vs. enterprise + vs. growth-hack tools | Misses the conscience |
| **Conscience layer for AI-native building** | Leads with the most-distinctive feature | Possibly too narrow; "conscience" reads ambiguously |
| **Just-in-time discipline for founder + AI** | Captures JIT + AI + discipline | Wordy; "discipline" reads as heavy to some cohorts |
| **The thinking layer for AI-native founders** | Distinguishes from "code-generating layer" (Lovable et al.) | Possibly too abstract |
| **The override-friendly incubator** | Distinguishes from frameworks that fight you | Lands well with eng-builder; vague to others |

**Strongest frame after stranger-test:** *"The thinking layer for AI-native founders."*

Reasoning: it explicitly distinguishes BOSS from the code-generating layer (Lovable / v0 /
Bolt own that turf) — and *most founders today don't have a thinking layer.* Naming the empty
space is sharper than claiming a crowded one. Cursor and Claude Code are *thinking
companions*; they don't structure the thinking layer. BOSS is what structures it.

Secondary frame, complementary: *"calm-company alternative to scaffolders that turn you into
a developer of the framework."* This is the right secondary frame for indie-hacker /
returning-founder cohorts specifically.

## 7. The killer one-sentence test — candidates + stranger verdicts

For each candidate: would a stranger who reads it (cohort: the target founder above) form an
accurate, leaning-in mental model in under 5 seconds? (Krug's bar.) Then: would the cohort
*want to try* the thing it describes?

| # | Candidate | Words | Stranger-verdict |
|---|---|---|---|
| 1 | *"BOSS is the just-in-time incubator for founders building with AI — it catches you drifting, scales ceremony to evidence, and gets out of your way when you're in flow."* | 29 | Accurate but mouthful. "Incubator" likely reads YC-shaped. Stranger nods politely; doesn't lean in. |
| 2 | *"A conscience while you build — discipline that shows up when it can help and gets out of the way when you're in flow."* | 25 | Voice-y; nice rhythm; missing *who it's for*. Stranger thinks "for whom?" Doesn't lean in. |
| 3 | *"For founders building with AI: the smallest discipline that helps you ship something worth shipping — and the smallest ceremony that doesn't slow you down."* | 26 | Clear audience + value; "smallest discipline" + "smallest ceremony" is the discipline-language. Honest. Lean-in: medium. |
| 4 | *"BOSS is the thinking layer for AI-native founders — a conscience that nudges (never blocks), modes that scale ceremony to evidence, and a mentor board for the parts code can't teach."* | 32 | Names the empty space (*thinking layer*); explicit feature list; possibly too long. Lean-in: medium-high. |
| 5 | *"The override-friendly conscience for AI-native building. Nudges, never blocks. Pause it for the all-night sprint."* | 18 | Sharp; voice-y; signals two key features (override, pause). Stranger has to infer *what kind of tool*. Lean-in: medium for the cohort already in the AI-native frame. |
| 6 | *"BOSS is what the founder of your project would have wanted on their last one."* | 15 | Voice-y; emotionally evocative; aspirational; specific only to returning-founder cohort. Misses the cohort that hasn't shipped before. Lean-in: high for the cohort it lands on; opaque to others. |
| 7 | *"BOSS is the just-in-time conscience for AI-native founders. Pause it any time."* | 13 | Tight; names the audience + the JIT principle + the override; "conscience" requires inference but it lands. **Lean-in: highest of the candidates.** |
| 8 | *"For founders building with AI — the thinking layer that nudges when you're drifting and pauses on command. No growth-hacking pressure. Override-friendly."* | 22 | Strong: cohort + value + values-stance + override. Reads as positioning, not branding. Lean-in: high. |

**Winners (in order):**

1. **#7 — *"BOSS is the just-in-time conscience for AI-native founders. Pause it any time."*** —
   The killer for the elevator pitch. 13 words. Has all the load-bearing pieces.
2. **#8 — *"For founders building with AI — the thinking layer that nudges when you're
   drifting and pauses on command. No growth-hacking pressure. Override-friendly."*** — The
   killer for the README opening + landing page hero. 22 words. Explicit positioning.
3. **#4** — Strong for the longer pitch (paragraph-3 territory) when there's room to enumerate
   the features.

**Discarded:** #1 (mouthful), #2 (no audience), #3 (vague), #5 (too feature-y), #6 (too
narrow to one cohort).

## 8. Cohort-tailored variants (per the 8 personas)

The persona-reactions discipline (IDEA-009) says BOSS's surfaces should be cohort-aware. The
positioning sentence is the most-load-bearing surface. Per-cohort variants — each tested
against what the persona's archetype would lean into:

| Persona | Variant |
|---|---|
| **vibe-coder-newbie** | *"You're using AI tools but starting from a blank repo each time. BOSS is the thing that scaffolds the project, shows you what to do next, and doesn't lecture."* |
| **eng-builder** | *"A conscience layer for AI-native building. Loop-based discipline. Override-friendly. Pause-on-command. Zero deps; inspectable; source on GitHub."* |
| **non-tech-founder** | *"A team-in-a-box for building with AI. Mentors who advise. A conscience that catches drift early. Nothing imposed; everything overridable."* |
| **first-product** | *"For your first product: the friendlier scaffold. Shows you what to do next, defines terms inline, and waits until you've earned the next step."* |
| **vibe-virtuoso** | *"For founders who ship more than they sustain — the discipline that pauses on command, records every override, and asks the harder question on the third capture."* |
| **indie-hacker** | *"A calm-company alternative to scaffolders that turn you into a developer of the framework. Anti-VC. Override-friendly. Pause anytime. Open source."* |
| **returning-founder** | *"The conscience for AI-native building you wished you'd had on the last one. Pauses when you need to ship. Speaks when you need to slow down."* |
| **domain-expert** | *"For founders building with AI in high-stakes domains — the discipline layer that takes harm seriously. mentor-humane has override authority. Real domain caveats. Override discipline at every layer."* |

**Pattern across the variants:** each one names *who it's for* in the first phrase, then a
specific feature that lands hardest for that cohort. The cohort-aware delivery pattern
(v0.20) applied to positioning copy.

## 9. The trend layer (Dunford's optional step)

Why now matters:

> AI raised the *speed limit* on what a founder can build. Almost no tool raised the
> *discipline limit* to match. Most founders are shipping faster + drifting faster — the
> 47 blues / pile-of-half-finished-projects / didn't-validate-the-bet pattern is now
> default, not exception. The question stopped being "can I build this?" (the AI tools
> answered yes) and started being "should I be building this, and how do I know?"
>
> BOSS exists for the second question.

That's the trend frame. Real (we're observably in this moment); narrow enough to be sharp;
broad enough to apply across cohorts.

## 10. Decisions to act on (the output of this exercise)

The positioning pass commits BOSS to specific decisions. Recording each:

1. **Lead sentence (single-line elevator):** *"BOSS is the just-in-time conscience for
   AI-native founders. Pause it any time."* (Candidate #7, won the stranger-test.) — Use in
   pitch contexts; tweet bios; verbal intros.

2. **README opening sentence:** *"For founders building with AI — the thinking layer that
   nudges when you're drifting and pauses on command. No growth-hacking pressure. Override-
   friendly."* (Candidate #8, won the readable-positioning test.) — Update README's opening
   per this; the current TL;DR is close but the *"thinking layer for AI-native founders"*
   framing is sharper than *"just-in-time incubator."*

3. **Drop "incubator" as the primary category.** Use *"thinking layer for AI-native
   founders"* instead. *"Incubator"* stays valid as a secondary descriptor (it's still
   accurate — BOSS does what an incubator does) but it's not the lead because it reads
   YC-shaped. **The category claim BOSS is making: the thinking layer that sits between
   the code-generating layer (Cursor/Lovable/etc.) and the founder.**

4. **Per-cohort variant pool established.** Eight versions above. When BOSS speaks
   cohort-aware, the positioning sentence varies too — not just the conscience nudge text.

5. **The trend layer is on the record.** *"AI raised the speed limit; almost nothing raised
   the discipline limit."* Use in pitches when there's room for two sentences instead of
   one.

6. **What BOSS doesn't compete on, named explicitly:** code generation (Lovable / v0 / Bolt).
   **BOSS is complementary to those.** A founder could use Lovable to scaffold the app + BOSS
   to scaffold the *thinking about what to build / when to ship / when to override discipline*.
   Naming this prevents confused positioning.

## 11. Downstream consequences

- **README update needed.** The current README's TL;DR opens with *"a just-in-time incubator
  for AI-native projects."* Replace with the candidate #8 framing. Small edit; high leverage.
- **Canvas Promise cell may want updating.** The v0.2 canvas's Promises cell is good but
  pre-positioning; could now read more sharply. Consider in a future canvas v0.3.
- **All mentor agents could cite the positioning sentence.** Specifically `mentor-pitch` (its
  domain) and `mentor-gtm` (positioning-against-alternatives is core to its lens).
- **The cohort-tailored variants enable cohort-aware skill copy.** A future enhancement: when
  `/boss` is run with a cohort declared, it could use that cohort's variant in its
  introduction. Small. Loop-aware.

## 12. What this positioning is NOT

- **Not validated.** Until a real (non-Ajesh) founder reads the README's new opening and can
  articulate back what BOSS does, this positioning is synthetic-tested only. The same
  override discipline as everywhere else: take it seriously, hold it lightly, revise on real
  evidence.
- **Not permanent.** Positioning evolves with the product. v0.25+ might invalidate one of the
  cohort variants; future feature releases will shift the unique-attribute list.
- **Not the only positioning frame BOSS could use.** I picked the "thinking layer" frame; a
  different frame ("calm-company scaffolder") would surface different feature priorities.
  Both are honest. The choice commits BOSS to the *AI-native founder* audience over the
  *anti-VC indie-hacker* audience — those overlap but aren't identical.

## 13. Open questions (re-opens on real founder contact)

- **"Thinking layer" — does it land or read as abstract?** Stranger-test on a real
  non-Ajesh founder will tell us; until then we're guessing.
- **The 8 cohort variants — are they useful or are they overfitting to synthetic personas?**
  Real evidence from any cohort would either validate one variant or surface that BOSS's
  voice is actually more uniform than the persona work suggested.
- **Should there be a hosted demo / landing page that puts this positioning in front of real
  founders?** That's a v0.25+ question (probably v0.26 — externalization phase). Premature
  to spend on now.
- **Does the discarded "anti-VC indie-hacker" frame deserve its own surface?** If BOSS
  serves both AI-native-founders generally + indie-hackers specifically, two landing surfaces
  (or a cohort-driven home page) might be right.

## Next pass

This positioning re-opens when:
- A real (non-Ajesh) founder reads BOSS and articulates back what they think it does — if
  what they articulate doesn't match candidate #7 or #8, the positioning failed and needs
  re-work
- A new BOSS feature shifts the unique-attribute list materially
- The persona-reactions surface a cohort whose variant doesn't fit any of the 8 above
- A real competitor enters the *thinking-layer* category that we currently claim
