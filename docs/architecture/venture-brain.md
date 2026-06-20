# Architecture note — the venture brain (FEAT-022 spine)

> mentor-architect pass, 2026-06-12. Grounds Track 0 of [IDEA-022](../ideas/IDEA-022-ai-native-boss-living-conscience.md).
> Advisory design note — no product code. Pairs with `tester` on the write-path eval (decision 2).
> Status: proposed. Decisions below are the calls I'd make; the one I'd hand back to Ajesh is flagged.

## The thesis I'm holding the design to

What makes the conscience feel like its own AI is **continuity + a held point of view** — not voice.
So the brain's job is exactly one thing: let the conscience say something on Tuesday that is only
true *because* of what it understood on Monday. Every decision below is graded against "does this
make continuity real and earned" — not "is this a richer data model." A richer data model that
doesn't change what the conscience *says* is the gold-plating failure (decision 5).

## What it is NOT (the four-way cut, sharpened)

This is the load-bearing distinction, because three of the four neighbours are also "memory."

| Surface | Author | Tense | Mutability | The cut |
|---|---|---|---|---|
| **canvas** | founder | declarative snapshot | founder edits | what the founder *claims* is true |
| **RESUME** | model+founder | imperative, now | rewritten each session | what to *do next* |
| **conscience-log.jsonl** | hook | frequency facts | append-only | how often it *fired* |
| **memory-seed / durable-facts** | learning loop | third-person facts | slow | what is *settled and true* |
| **venture brain (NEW)** | **conscience (model)** | **first-person, evolving** | **append-mostly, founder-overridable** | the conscience's *read on you* — its interpretation, not the facts |

The brain is the only surface that is **subjective and the conscience's own**. The others are facts,
tasks, claims. The brain is a *point of view about* those facts. That's why it can't be derived from
them deterministically, and why it earns its own home rather than a field on the canvas.

The sharpest test for "does this belong in the brain": **could the canvas/RESUME/durable-facts hold
it without loss?** If yes, it goes there — the brain stays small. The brain holds only what is
*interpretation across time*: "they keep rebuilding onboarding instead of talking to users," "their
conviction on the wedge has been hardening, not drifting," "last session they pushed back on the
drift nudge and they were right." None of those are facts; all of them are the read.

---

## Decision 1 — Where it lives and what shape

**Decision: hybrid, with a hard split. A thin deterministic INDEX (JSON, CLI-owned) + a
first-person NARRATIVE (markdown, model-owned). Not regenerated-on-read.**

```
.boss/brain/
  index.json        # CLI-owned. {version, created, last_write_ts, entries:[{id, ts, kind, source_moment, headline}], overrides:[...]}
  read.md           # model-owned. The first-person POV. Append-mostly, sectioned, human-readable.
  relationship.md   # model-owned. The relationship log: what was said, what the founder did with it.
```

Why this shape and not the two alternatives:

- **Pure JSON state (CLI-owned)** — *rejected as the whole answer.* A point of view forced into
  enum fields stops being a point of view; the CLI would have to model "subjective read" as schema,
  which it can't honestly do (the CLI never calls a model — IDEA-006 layer 1). JSON is right for the
  *index over* the brain, not the brain.
  **reversible.**
- **Model artifact regenerated on read** — *rejected, and this is the load-bearing rejection.* A
  brain that re-derives itself from the repo on every read has **no continuity** — it has a fresh
  impression each time, which is precisely the ChatGPT-can't-be-a-conscience failure IDEA-006 names.
  Continuity *requires* persistence that survives the model forgetting. It also re-incurs the v0.34
  cost trap (re-reading the whole project) on every read. Regeneration is the anti-pattern here, not
  a cheaper variant. **one-way door** — if you build the conscience to assume regeneration, you've
  designed continuity out and can't add it back without re-architecting.
- **Hybrid (chosen)** — markdown *is* the brain (continuity lives in a file that persists and that
  the founder can read in plain English); JSON indexes it so the CLI can do deterministic things
  (show it, diff it, stamp it, gate writes) **without parsing the prose**. The CLI owns the index;
  the model owns the prose. This is the same successful split FEAT-020 already shipped:
  `.claude/rules/*.md` (host-bound render) + `.boss/working-context.json` (host-neutral ledger).
  The brain is that pattern applied to *interpretation* instead of *working-context*.
  **reversible** — markdown + a JSON index is the most movable shape there is.

**Why markdown, not JSON, for the read itself (the moat decision):** CANVAS §2's Modes-of-Engagement
moat is *inspectable + overridable + reversible*. A founder must be able to open the brain, read what
the conscience thinks of them in plain English, disagree, and edit it. A JSON blob of subjective
judgments fails the humane test the hardest of any surface in BOSS — it's the one place the product
literally records an opinion *about the person*. If they can't read and correct it, it's a dark
pattern dressed as personalization (the exact line this mentor holds). **Markdown is not a convenience
here; it is the trust mechanism.** The override path (a founder editing `read.md`, or a
`## Founder correction:` block) must be a first-class, documented gesture, not an afterthought.

**Inspectability gets a CLI verb:** `boss brain` (read it), `boss brain --diff` (what changed since
last session, from the index), `boss brain --forget <id>` (reversibility — drop an entry). This is
layer-1, zero-dep, host-agnostic, and it's what makes "the conscience holds an opinion of you" a
*legible* feature rather than a creepy one. The verb is cheap and it's the moat made concrete.

---

## Decision 2 — Who writes it, and when

**Decision: the model writes it, at exactly two cadences — a deep write at `/close` (and `boss
adopt`), and an opportunistic append only at a judge-moment that *already fired*. Never on every
prompt. Never a dedicated always-on pass.**

This is the v0.34 frequency-ledger discipline applied directly. The cost trap is *re-summarizing the
whole project on every prompt*. The defense is: the brain is only written when the model is **already
doing a bounded read for another reason**, or at an **explicit session boundary**.

Two write paths, and only two:

1. **The boundary write (`/close`, and the seed write at `boss adopt`).** This is the primary path.
   At `/close` the model already reviews the session; that's the cheap, natural moment to update the
   read. One write per session, founder-present, founder-confirmable. This *exactly mirrors FEAT-020's
   locked Decision 2*: model suggests the brain update, surfaced at `/close`, and the durable write is
   founder-confirmable. **Do not invent a new write trigger when `/close` already is one.**

2. **The opportunistic append (piggyback on an existing judge-moment).** `drift`, `caution`, `capture`
   already induce a bounded read in the live turn (`JUDGE_MOMENTS` in loop-runtime.js). When one of
   those *fires and the model reaches a judgment*, it may append one line to `relationship.md` — "noted
   drift on the wedge; founder said the rebuild was deliberate." This adds **zero new model calls**: it
   rides a read that already happened. It is append-only and never triggers a fresh judge.

**The discipline, stated as a rule the way FEAT-020 states its:** *the brain never causes a model call
that wasn't already going to happen.* No brain-specific hook. No per-prompt summarization. No
background re-read. If you ever find yourself adding a `Stop`-hook that re-reads the project to keep
the brain fresh, you've rebuilt the v0.34 cost trap with extra steps — that's the Phase-4 freshness
predicate of FEAT-020, deferred there for the same reason, and it should stay deferred here.

**This write path needs an eval, and the harness already exists.** A model writing a *durable,
first-person opinion about the founder* is the highest-stakes model-judgment write in BOSS. It must
be graded the same way `drift` and `caution` are: this is `tester`'s job, and it slots into the
existing `docs/architecture/conscience-evals/judgment/` harness (golden transcripts + voice-hash
tripwire + out-of-band `regrade.js`). The new eval question: *given a session, does the model write a
true, fair, specific read — and NOT a flattering, projecting, or over-confident one?* The
`must_not` rubric writes itself: no flattery, no diagnosing the founder, no claiming certainty the
sessions don't support. **No brain write-path without its judgment set** — same floor `eval.md` already
holds for moments. This is the architecture problem moments #3/#4 were going to hit anyway; the brain
hits it first and harder.

---

## Decision 3 — The read path (layered, not one blob)

**Decision: three layers, read selectively by consumer. Not one artifact everyone slurps.**

The brain is layered because its consumers need different slices, and slurping the whole thing into
every context is the cost trap on the *read* side:

| Layer | File | Who reads it | When |
|---|---|---|---|
| **Index** | `index.json` | the CLI; `boss brain`; the hook (cheap freshness/diff check) | every relevant CLI call (zero-dep, instant) |
| **The read (POV)** | `read.md` | the conscience (voicing); `/consult` mentors; the scaffolder | when composing a nudge / a board session / a scaffold |
| **Relationship log** | `relationship.md` | the conscience (continuity moments); mentors who need history | the "I remember you" moment, sparingly |

- **`boss adopt`** seeds `read.md` + `index.json` by doing the one expensive thing once: a 1M-ctx
  whole-repo read at adoption. That's the right place to spend the big read — it's a one-time door
  cost, not a per-turn cost. This is also why adopt *seeds the brain* in the IDEA-022 dependency
  graph: the brain is what makes the conscience fire well from day one on a brownfield repo.
- **`/consult` mentors** read `read.md` so the board reasons over the actual venture, not a generic
  prompt. They read it; they don't write it (one owner for the write path — the conscience — keeps
  the POV coherent rather than six mentors each appending their own read).
- **The conscience hook** does NOT read `read.md` on the fire path — that would put a model read on
  the unprompted path, which the hook must never have (it's a zero-model detector). It reads at most
  `index.json` (cheap, deterministic: "is there a brain, when was it last touched"). The *voicing* of
  the brain happens in the live turn, where a judge-moment already induced a read; that read can pull
  `read.md`. **Keep the brain off the hook's fire path** — same line as keeping `statSync` unused in
  loop-runtime.

One-write-owner, many-readers is the integrity rule: the **conscience writes**, everyone else reads.
This keeps the POV singular (the thing that makes it feel like *one* mind) and avoids merge conflicts
between mentors' competing reads.

---

## Decision 4 — Host-binding (IDEA-006)

The brain splits cleanly across the IDEA-006 three-layer model, and the split is the whole point:

- **CLI-owned, host-agnostic (layer 1):** `index.json`, the `boss brain` verbs (read/diff/forget),
  the freshness stamp, the write-gate plumbing, the storage location. **Travels everywhere.** On any
  host — Codex, a future agent, headless — the brain is still an inspectable file with a CLI over it.
- **Model-owned, host-bound (layer 2):** writing `read.md` (the judgment), voicing it in continuity
  moments, the opportunistic append. **Travels nowhere** without a host that has model + context
  injection. This is the same conclusion IDEA-006 reached for the conscience generally: the
  unprompted, model-judgment part is the least portable, and that's acceptable.

**Graceful degradation (the honest answer):** on a weaker host with no hooks and no judge-moment, the
brain degrades to *a markdown file the founder and any model can read, that only gets richer when the
founder explicitly runs `/close` or `boss adopt`.* That's a real, useful artifact — "here's the
conscience's read on my venture, in a file I own" — just without the *unprompted* continuity. Layer 1
keeps earning its keep exactly as `boss board` did. **The brain does not make BOSS more host-bound
than it already is** — the new dependency (model writes a POV) sits entirely inside the layer that was
already Claude-bound. Name this in IDEA-006's host-contract doc as one more layer-2 capability
("durable per-project POV memory the host maintains"), don't build a port.

**What I'd explicitly defer, loudly:** do not design the brain's write format to be host-portable.
Don't abstract "the model that writes the read" behind an interface for a hypothetical Codex. No
non-Claude founder is asking (Principle 2). Markdown + JSON index is *already* the portable substrate;
the writing is Claude's job today, and naming that boundary in IDEA-006 is the entire portability
deliverable for this window. Building for host-neutrality of the *write* is the premature-ceremony
trap one level up.

---

## Decision 5 — The trap, and the smallest honest v1

**Where this becomes gold-plating:** the moment the brain grows a schema. The failure mode is a brain
that models "venture stage" and "founder archetype" and "conviction score" and "momentum trend" as
structured fields — a CRM for the founder's psyche. That is the pseudo-app failure BOSS exists to warn
against, turned inward: an impressive-looking data model with no evidence it changes what the
conscience *says*. The brain is worth exactly as much as the *specific true sentence* it lets the
conscience say that it otherwise couldn't. Everything past that is a richer model serving itself.

The other trap: **the brain becoming a second canvas.** If the conscience's "read" starts recording
the founder's claims (their wedge, their riskiest assumption), it's duplicating the canvas and will
drift out of sync with it. The brain holds *interpretation across time*, never *claims* — the moment
a brain entry could be a canvas edit, it belongs on the canvas.

### The smallest honest v1 (what I'd actually build in the 10-day window)

A v1 that proves the continuity thesis with the least machine:

1. **One file: `.boss/brain/read.md`** — first-person, free-form markdown, sectioned by date. No
   `relationship.md`, no layers yet. One artifact.
2. **One thin `index.json`** — just `{last_write_ts, entries:[{ts, headline}]}`. Enough for
   `boss brain --diff` and a freshness stamp. Nothing semantic.
3. **One write path: `/close`.** The model appends a dated first-person read at session close,
   founder-confirmable (reuse FEAT-020 Decision 2's confirm gesture verbatim). No opportunistic
   append yet — that's the second increment, and only if the `/close` write proves too sparse.
4. **One read path: the conscience, in the live turn, when a judge-moment fires** — pulls the last
   1–2 `read.md` entries to make the nudge *continuous* ("last week you flagged the wedge was the
   bet; this week's work still isn't testing it"). This is the single screenshot-worthy behavior
   that proves the whole thesis. If this one sentence lands, the brain is real.
5. **One CLI verb: `boss brain`** — read it. (`--diff` and `--forget` are the second increment.)
6. **One eval: a `brain-write.judgment.yml`** in the existing harness — fair/true/specific vs.
   flattering/projecting/over-confident. `tester` owns it. This ships *with* the write path, not
   after.

**What the v1 deliberately omits** (defer loudly): `relationship.md` as a separate file; the
opportunistic judge-moment append; the layered read path; `boss adopt` seeding (adopt seeds the brain
in the *next* increment — v1 grows the brain from `/close` cycles on BOSS's own repo first, the same
"let BOSS feel it before building the cure" posture FEAT-020 took); any host-portability of the write;
any schema beyond `{ts, headline}`.

**The dogfood test that tells you v1 worked:** run BOSS on its own repo for a week of `/close` cycles.
If, in a real session, the conscience says something *specifically true about this venture's history*
that it could only know from `read.md` — and Ajesh's reaction is "how did it know that" rather than
"that's generic" — the continuity thesis is proven and the next increment is earned. If after a week
the read.md entries are bland summaries the canvas already held, the brain is duplicating substrate
and v1 is the stop point. That's the same `/close`-read-first, build-the-machine-on-trigger discipline
FEAT-020 used — the brain should earn each layer the way every BOSS mode does.

---

## Open question I'd hand back to Ajesh (not mine to settle)

**Founder-present vs. silent on the `/close` write.** FEAT-020 Decision 2 locked "model suggests,
founder confirms" for durable promotions. The brain's `/close` write is *more* intimate (an opinion
about the founder, not a context slice) — which argues even harder for founder-confirmation. But there's
a real cost: a conscience that asks permission before forming a view of you feels less like a mind with
its own read and more like a form you fill out, which cuts against the "feels like its own AI" thesis.

My lean: **confirm for the first few writes (trust-building, and it generates the eval ground truth),
then graduate to silent-but-inspectable** once the eval shows the writes are trustworthy — the founder
can always read and correct via `boss brain`. That's the optionality-preserving default (Principle 5):
start confirmable, earn silence. But the "how present should the conscience be when forming its read of
you" call is a *taste + trust* decision that's the designer's and yours, not the architect's — it
pairs with the designer's "speaks-as-a-being vs. stays-a-tool" question in IDEA-022. I'd pressure-test
my own lean once: silent writes are a **one-way door for trust** — if the first silent write is wrong
and the founder catches it, the "creepy AI that decided things about me" reaction is hard to walk back.
That asymmetry is why I'd start confirmable. But I'll back off after saying it once.

## Citations

- Shape split mirrors **FEAT-020**'s two-homes (`rules/*.md` render + `working-context.json` ledger).
- Write discipline is **v0.34**'s frequency-ledger cost-trap defense, applied to writes.
- Eval path reuses the **`conscience-evals/judgment/`** harness (golden transcripts + voice-hash
  tripwire + out-of-band `regrade.js`) — no new eval machinery, one new dataset.
- Host split is **IDEA-006**'s three layers; the brain adds one layer-2 capability to name, no port.
- Restraint posture (v1 stop conditions, dogfood-first) is **PRINCIPLE #2** and FEAT-020's own note.
