---
id: DOSSIER-002
type: playbook
owner: pm
status: superseded-pending
created: 2026-05-22
practitioners: [mollick, karpathy, willison, rauch, ries, maurya, savoia, husain, liu]
companion_to: boss-advisory-pass-001.md
superseded_by: ../ideas/IDEA-008-evidence-loops.md
---

# AI-MVP playbook 001 — the two voices and how to balance them

> ⚠️ **Cadence section superseded by [IDEA-008 — evidence-keyed loops](../ideas/IDEA-008-evidence-loops.md)
> (2026-05-22).** Ajesh observed that time is the wrong unit (founders ship in weekends now) AND
> that each founder remixes methods. Those two facts collapsed the 4-week cadence below into a
> loop-graph primitive that supports remix natively. **The practitioner material in Groups A + B
> remains correct and reusable** — each section becomes a *practice* attached to one or more
> named loops once IDEA-008 lands. Read IDEA-008 for the new shape; read the practitioner
> sections here for the citable heuristics they distill.
>
> ---
>
> Companion to [`boss-advisory-pass-001.md`](boss-advisory-pass-001.md). The advisory pass said
> *pause to earn founder contact and eval the conscience.* This doc is the **practitioner-level
> material** behind that recommendation — what nine specific voices actually teach about starting
> an MVP, organized into the two camps Ajesh named, then synthesized into an MVP cadence BOSS can
> use *and* hand to the projects it scaffolds.
>
> **A note on method:** these sections distill what each practitioner has actually written or
> taught — not an impersonation, not the mentor agent speaking. The mentor agents we just
> authored *cite* this kind of material; this is the material to cite.

---

## Group A — the speed / AI voices

> "If AI raises the speed limit, *use the speed.* Most MVPs die from being too slow to learn, not
> from shipping too fast."

### Ethan Mollick — *AI as co-worker, not search engine*

- **"Always invite AI to the table."** When in doubt, try the task with AI first. You learn its
  shape only by doing — not by reading about it. For an MVP, this means the question is rarely
  "should I use AI here" but "*how is AI playing this role*"?
- **Use frontier models.** The gap between best-in-class and average is wide for serious work.
  Don't cheap out on the model for the parts that matter (architecture sketching, customer
  letter drafting, edge-case probing). It's a $20/month decision dressed up as a budget question.
- **"The Jagged Frontier."** AI is great at some things, terrible at others, and the boundary
  isn't intuitive. Map your product's needs against it constantly — probe, don't predict.
- **Use AI as different roles to pressure-test cheaply.** Critic, customer, competitor, lawyer,
  skeptical investor, hostile reviewer. Costs nothing; surfaces real holes. This is the cheapest
  validation loop available pre-real-users.
- **MVP-level move:** before any user research budget kicks in, run your idea through 5 AI
  personas, capture what each one finds wrong. Then go to humans with the surviving idea.

### Andrej Karpathy — *AI-native intuition + system understanding*

- **"The hottest new programming language is English"** — but it's a leaky abstraction. You still
  need to understand the underlying system. For MVPs, this cuts both ways: you can ship faster
  than ever, *and* you'll fail in new ways if you don't grok what's actually happening.
- **Iterate in tight loops with the model, not handoffs.** Don't toss a problem over the wall;
  steer it sentence by sentence. Karpathy's coding videos show this — small steps, observe
  state, correct. Treat the model as a pair, not a contractor.
- **Think in distributions, edge cases, and evals.** Not "does it work" but "what's the failure
  surface." For an MVP, the spec must include the failure modes you're explicitly accepting.
- **Don't fight the model.** Work with what it's empirically good at. If the model is bad at
  spatial reasoning, don't build a feature whose core *is* spatial reasoning and hope it
  improves.
- **MVP-level move:** the smallest piece that produces signal beats the complete plan. Demo > spec.
  A working ugly thing > a beautiful diagram.

### Simon Willison — *pragmatism, prompt-as-code, and security*

- **"LLMs are calculators for words."** Useful framing. They compose plausible text against
  context. They are not oracles, not search engines, and not databases. Build accordingly.
- **Prompt is code; treat it like code.** Version it, test it, document it. The prompt is part of
  your codebase even if it lives in a string. If you wouldn't write production logic with no
  tests, don't ship a load-bearing prompt with none.
- **Prompt injection is real and under-defended.** Any AI feature that consumes untrusted text
  (user input, scraped pages, RAG sources) is an attack surface. Plan for it; don't bolt it on
  after a launch. *Especially* for agents that act on output.
- **"Vibe coding"** — letting the LLM drive, steering with intuition. Powerful for prototypes;
  dangerous for production code you don't read. Know which mode you're in. Mark vibe-coded code
  for later real reading.
- **Use evals; share evals.** Willison repeatedly says: write down what good looks like in
  concrete cases, run them as tests, iterate.
- **MVP-level move:** ship the boring, well-understood parts with normal code; use AI for the
  parts where "approximately right and fast" beats "exactly right and slow." Don't AI everything.

### Guillermo Rauch — *move at the speed of thought*

- **The dev loop is the constraint.** If your edit-deploy-observe cycle is longer than your
  attention span, you can't think in the system — you think in plans. Reduce friction
  ruthlessly: hot reload, deploy-on-commit, instant feedback.
- **Deploy on day one.** Production-from-day-one beats local-forever. A URL you can share, a
  staging that's always live. The friction between *idea* and *shipped* is the enemy.
- **Pick the stack that's fast now *and* still fine at 10k users.** Don't optimize for the
  prototype phase only to throw it out — Rauch's case for Next.js + Vercel + serverless data
  stores boils down to: same shape from day one to scale, never a rewrite.
- **AI tools should fit your existing loop, not require a new one.** If a tool slows down the
  edit-deploy-observe cycle (even with AI magic), it's the wrong tool.
- **Demos over docs.** A working URL beats a long README. For an MVP, the demo *is* the spec.
- **MVP-level move:** before you write a line of product code, set up the deploy pipeline. Get
  the URL live serving "Hello world" branded to the product. The path from idea to shipped is
  now ~5 minutes, not ~5 days.

---

## Group B — the discipline / measurement voices

> "Speed without measurement is the same as not moving — you just arrive at the wrong place faster."

### Eric Ries — *build → measure → learn, validated learning as the unit*

- **The MVP is the minimum *experiment* that produces validated learning, not the minimum
  *product* you can polish.** This is the single most-misunderstood phrase in startup language.
  An MVP isn't an "MVP version of the product" — it's whatever produces the next bit of learning,
  even if that's a landing page or a wizard-of-oz simulation.
- **Build → Measure → Learn loop.** The smallest viable cycle wins. Most teams measure
  acceptance criteria; Ries measures *behavior change in cohorts.*
- **Validated learning is the unit of progress, not features.** A feature shipped without a
  learning is technical debt against the bet. The question isn't *what did we build* — it's
  *what did we learn that we can act on.*
- **Pivot or persevere — explicit decision.** Each loop closure gets a verdict. Drifting between
  loops with no decision is the most common failure mode.
- **Vanity metrics vs. actionable metrics.** Aggregate signups are vanity; per-cohort retention
  is actionable. Pick metrics that *change your decisions*. Innovation accounting is per-cohort,
  not in-aggregate.
- **MVP-level move:** before you build *anything*, name what you'll learn from it. If you can't,
  it's not an experiment; it's a wish.

### Ash Maurya — *Lean Canvas, riskiest assumption, problem-solution-fit*

- **"Your business model is the product."** Pivot on the canvas before you pivot the code.
  Pivoting code without pivoting the model is just thrashing.
- **Lean Canvas (one page):** problem, customer segments, UVP, solution, channels, revenue, cost,
  key metrics, unfair advantage. Fill in JIT — blanks are honest; guesses are poison.
- **Order experiments by riskiest assumption.** What could kill the model? Test that first. Not
  the cheapest test, not the most fun — the *most fatal-if-true.*
- **Three stages, in order: Problem-Solution Fit → Product-Market Fit → Scale.** Don't skip
  levels. Most teams jump to scale-shaped work (growth tactics, hiring) while still un-fit at
  problem-solution.
- **The 10x test for value props.** The new solution must be 10x better than the alternative on
  *at least one* dimension. Not 2x better on five; 10x on one. If you can't articulate the 10x,
  the prop isn't sharp enough.
- **Customer factory.** Model the funnel as conversion stages; the bottleneck stage is the only
  one that matters at MVP. Optimizing non-bottleneck stages is theater.
- **MVP-level move:** before any feature, ask "if this works *perfectly*, which canvas cell does
  it validate?" If the answer is "none," don't build it.

### Alberto Savoia — *pretotyping — make sure you're building the right It*

- **"Most new products fail not because they're built poorly, but because they're the wrong
  product."** Internalize this. Most engineering teams optimize for *building it right* while
  building the *wrong thing*.
- **Pretotype = pretend prototype.** Test demand *before* you build. The fake door, the wizard
  of oz, the Pinocchio test (it works as if real even without backend), the Mechanical Turk
  (humans do what code eventually will), the YouTube test (record a demo of something not yet
  built), the impresario test (announce + take signups).
- **YODA — Your Own Data > Anything.** Don't rely on benchmarks, surveys, or "the market." Run
  *your own* pretotype, collect *your own* data, in *your own* context.
- **TRI metric — Tangible, Real-time, Imminent.** Useful data is concrete (signups, not "would
  you use"), recent (last 7 days, not last quarter), and decision-relevant.
- **"Make sure you're building the right It, before you build It right."** This rhymes with
  Cagan's build trap and Ries's validated learning — the consensus across discipline voices.
- **MVP-level move:** before you build, run two pretotypes against the same demand
  hypothesis. If both fail, the demand isn't real; pivot the bet before writing code.

### Hamel Husain — *evals, look at your data*

- **"Look at your data."** Almost all AI quality problems are visible in the data, and almost
  nobody looks. Set up a regular practice of reading actual model outputs against actual inputs.
- **Build an eval set FIRST.** Even 20-50 examples beats nothing. Write them *before* you build
  the system, so the system has a target. Most teams skip this and never recover the discipline.
- **Failure modes > success modes.** Categorize what *goes wrong*, not just what works.
  Categorize systematically (taxonomy of failures) — those become the targets for the next
  iteration.
- **Vibes-based eval is a starting point, not a destination.** Move to actual rubrics fast.
  "It feels better" is fine for the first 5 iterations; it's poison after that.
- **LLM-as-judge can work — but only when you have examples of the judge being *wrong*.** Without
  that, you're just adding a confidently-wrong layer on top of a confidently-wrong layer.
- **Domain experts > LLM evals when stakes are real.** A doctor reviewing 30 medical AI outputs
  beats GPT-5 reviewing 3000. Same for legal, finance, etc.
- **MVP-level move:** ship with evals from day one. The question isn't "is this good enough" —
  it's "how would I know." Write that down as 20-50 concrete examples before the system exists.

### Jason Liu — *structured outputs, RAG is mostly retrieval*

- **Pydantic-first.** Never call an LLM expecting prose if a downstream system consumes it.
  Define a schema, validate the output, retry on failure. Free-form is for human eyeballs only.
  This single discipline eliminates ~80% of LLM-pipeline brittleness.
- **"RAG is mostly retrieval, occasionally G."** The hard work is getting the right chunks to
  the model — query expansion, hybrid search, reranking, chunking strategy. The LLM is the easy
  part. Teams obsess over prompt; they should obsess over retrieval.
- **Synthetic data + iteration beats one perfect prompt.** Generate test cases programmatically,
  iterate against them. Same eval set, same prompt-under-test, measurable improvement per round.
- **"Most companies have a data problem, not an LLM problem."** This rhymes with Husain. The
  intelligence is the cheap part now; the data work is where the leverage is.
- **Programmatic instruction-tuning.** Treat prompting like calibration — same eval set, prompt
  variants, measure deltas. Stop A/B-vibing.
- **MVP-level move:** define your output schema before your prompt. If you can't articulate the
  shape of the answer, you don't yet know what question you're asking the model.

---

## The synthesis — how to balance the two voices at MVP

> The voices don't oppose each other; they *sequence*. Discipline tells you which experiments
> matter. Speed produces the experiments. Without speed, you ship nothing. Without discipline,
> you ship the wrong thing fast.

### The default MVP cadence (4-week rhythm)

```
┌──────────────┬─────────────────┬───────────────────┬─────────────────┐
│  PRETOTYPE   │   PROTOTYPE     │   USERS + EVALS   │  PIVOT/PERSEVERE│
│  (week 0)    │   (week 1-2)    │   (week 2-3)      │   (week 4)      │
├──────────────┼─────────────────┼───────────────────┼─────────────────┤
│ Group B-led: │ Group A-led:    │ Both:             │ Group B-led:    │
│ Savoia       │ Mollick         │ Husain + Liu      │ Ries + Maurya   │
│ Maurya       │ Karpathy        │ (evals, schemas)  │ (pivot decision)│
│ Ries         │ Willison        │ + Fitzpatrick/Mom │ + Mollick (next │
│              │ Rauch           │ Test interviews   │  bet sketches)  │
│              │                 │                   │                 │
│ "right It?"  │ "ship fast"     │ "actually right?" │ "what's next?"  │
└──────────────┴─────────────────┴───────────────────┴─────────────────┘
```

### Week-by-week balance

**Week 0 — pretotype (discipline lead):**
- Lean Canvas filled, riskiest assumption named (Maurya).
- One pretotype design — fake door, landing page, wizard-of-oz, mechanical turk (Savoia).
- The single learning the pretotype will produce (Ries).
- Eval set sketched (Husain) — even rough — *for the prototype that's coming.*
- AI is used here to *pressure-test the canvas* — run it past 5 AI personas (Mollick), patch
  weak cells.

**Week 1-2 — prototype (speed lead):**
- Deploy on day one (Rauch). URL live serving the brand before product code exists.
- Build the spine in normal code; use AI for parts where "approximately right + fast" wins
  (Willison).
- Schema all LLM outputs (Liu). Pydantic-style. No free-form-in-control-flow.
- Tight iteration loops (Karpathy) — small steps, observe, correct. Not handoffs.
- Use AI personas continuously as critic / customer / hostile reviewer (Mollick).
- *Don't write the eval set retroactively here* — it was Week 0's job.

**Week 2-3 — users + evals (discipline lead, speed pace):**
- Run the eval set on every commit (Husain). At least 20-50 examples. Look at the data.
- Categorize failures by mode (Husain).
- Improve retrieval/structure before improving the prompt (Liu).
- **5 Mom Test conversations** (Maurya + Fitzpatrick) — "show me your last project, where did
  you stall, what would have helped." Not "would you use this."
- Both signals converge in one weekly review: *what does the eval say + what did founders say.*

**Week 4 — pivot or persevere (discipline lead):**
- Explicit verdict, written down (Ries). Three options: persevere with the current bet, pivot
  on one canvas cell (Maurya — which cell?), or stop and pretotype a different bet.
- The decision is based on **validated learning** (Ries), not "we worked hard" or "we shipped a
  lot." If no learning landed, the loop didn't close — that's the diagnosis.
- The next bet sketches start *here*, with Mollick-style AI persona pressure-testing — back to
  Week 0 of the next cycle.

### Decision rules for choosing a voice in the moment

| Situation | Lead voice | Why |
|---|---|---|
| "Should I build this?" | Group B (Maurya, Ries, Savoia) | Build trap risk; demand-test first |
| "How do I build it fast?" | Group A (Karpathy, Rauch) | Reduce friction; tight loops |
| "Is the AI part working?" | Group B (Husain, Liu) | Vibes ≠ evidence; schema + evals |
| "Should I trust the demo?" | Mixed (Mollick personas + Husain evals) | Probe with AI; verify with data |
| "Is the prompt good enough?" | Group B (Husain → Liu) | Eval set; structure; iterate |
| "Should I show users yet?" | Group A (Rauch) + Group B (Ries) | Yes — sooner than feels right |
| "What did we learn?" | Group B (Ries, Maurya) | Validated learning is the unit |

### The single hardest discipline

**Writing the eval set before the system exists** (Husain). Every other practice is easier and
also gets done more often. This one feels like overhead at the start and is the highest-leverage
discipline 6 weeks in. The voice in the room that resists this hardest is the same voice that
will later say "we should have done that from the start."

---

## Applied to BOSS itself — what to do *next*

Reading the advisory pass against this playbook, three moves snap into clarity:

### 1. Conscience evals (Husain + Liu, this week)

The advisory pass already named this. The playbook sharpens it:

- **Husain move:** write `docs/architecture/conscience-evals.md` with **20+ should-fire and
  20+ should-NOT-fire examples per moment.** Each example is a concrete scenario: the state of
  `docs/ideas/`, what the user just typed, what the conscience should (or should not) say.
  Categorize the should-NOT cases by failure mode (over-fires-on-fresh-project,
  fires-mid-other-work, repeats-itself, shame-toned).
- **Liu move:** refactor the hook output from string-`additionalContext` to structured
  `{moment, confidence, evidence, suppress_if}`. The model composes the voice; the hook ships a
  schema. This makes the eval set *runnable*.

### 2. The five founder conversations (Maurya + Ries via Fitzpatrick, this week)

The playbook sharpens the advisory pass's recommendation:

- **The wrong question:** "would you use BOSS?" / "does the conscience feel naggy?"
- **The right question (Maurya's customer-development discipline + Fitzpatrick's Mom Test):**
  "Show me the last project you stalled on. Walk me through what you actually did. Where did you
  feel stuck? What did you try that didn't help? What — *not BOSS, not AI* — would have helped?"
- **What to record:** the exact moment of stall + the alternative they reached for + the
  feeling word. Those three pieces are what the conscience should be *responding to.*
- **5 conversations × 30 min = 2.5 hours. Synthesizing them is another 2-3.** That's a half-day.
  We are not too busy for this; we have been too busy with shipping.

### 3. Pretotype the conscience for a stranger (Savoia + Mollick, this week)

- **Savoia move:** record a 60-second screen demo of moment #1 firing in `/triage`. That's the
  pretotype. Show it to the same 5 founders from #2 (or 5 different ones if you want a clean
  read). Capture: "what did you just see" (recognition test), "how did that feel"
  (emotional read), "have you ever wished you had something like that" (demand signal).
- **Mollick move (preparatory):** before showing humans, run the demo's premise past 5 AI
  personas: a first-time founder, a serial founder who'd find this patronizing, a non-builder PM,
  a Cursor power-user, a calm-company indie hacker. Patch what each one finds wrong.

These three moves cost ~10 hours total and close the three loops the advisory pass said were
load-bearing. Everything else (moments #3/#4, brownfield, host portability) can wait.

---

## Applied to projects BOSS scaffolds — what this should change in MVP mode

The MVP mode shipped in v0.14.0 is a good first cut. The playbook above suggests three concrete
upgrades for when this material is encoded properly (IDEA-003 finish):

### 1. `/spec` should ask "what does this validate?" up front

Currently the FEAT template has goal, acceptance criteria, smoke check, out-of-scope. Per Ries:
**add a "Validated learning" field**: "If this FEAT works perfectly, what do we learn?" If the
answer is "none / users like it" the FEAT shouldn't be built. This is the build-trap guard the
spec is currently missing.

### 2. `/smoke` should be paired with `/evals` (new skill, MVP-era)

For any FEAT with AI in it, `/smoke` answers "is it alive" and a new `/evals` skill answers "is
it correct." Husain's discipline encoded as a skill — the user writes the eval set in
`docs/evals/<feat>.md`, `/evals` runs it. Without this, BOSS-scaffolded projects ship
AI-MVPs without measurement, which is what the playbook says is the highest-leverage gap.

### 3. The pretotype layer is missing from Quickstart → MVP

Today's arc: `/triage` (capture) → `/canvas` (pressure-test) → `boss unlock mvp` (build).
Savoia's discipline says there should be a pretotype step *between* canvas and unlock — a
demand-test, not just a pressure-test of the bet. A new skill, possibly `/pretotype`, that walks
the founder through picking one of Savoia's pretotype patterns and *running it* before any code.

Of these three, **#1 (`/spec` adds validated-learning field) is the smallest cut and the highest
leverage**, and could ship in a v0.16.x patch without waiting for IDEA-003 finish.

---

## Open questions for Ajesh

- **The pretotype layer.** Is `/pretotype` a real skill we should design, or does it fold into
  `/canvas`'s "Experiment this week" cell? The canvas already names the experiment; what's
  missing is *running it*. Worth a `/triage` on its own.
- **The eval set for the conscience — who writes the examples?** Ajesh has the model in his
  head. But a second opinion (a real founder or a researcher) cross-checking would catch the
  examples Ajesh is blind to. Cheap if found.
- **The Mom Test discipline as a project-level practice.** Should it be a `library/practices/`
  entry (Fitzpatrick attributed) that `mentor-venture` cites? Almost certainly yes; it's the
  most-cited discipline across the playbook.

---

## Next pass

After items 1–3 of the *applied to BOSS itself* section land, re-open this doc and check: did
the founder conversations confirm or refute the canvas's riskiest assumption? Did the evals
catch real failures? Did the pretotype generate honest demand signal? Each answer reorders the
next loop's priorities.
