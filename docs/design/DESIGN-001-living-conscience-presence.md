---
id: DESIGN-001
type: design-note
owner: designer
status: proposed
created: 2026-06-12
informs: FEAT-022 (venture brain) · IDEA-022 Track 4 (living conscience)
pairs_with: voice-keeper (identity call) · mentor-architect (brain shape)
---

# DESIGN-001 — The living conscience: what "feels like its own AI" actually feels like

> Design spec for IDEA-022's center. Answers the five design questions concretely, with actual
> copy. The thesis I'm building to (from IDEA-022): **aliveness is continuity + a held point of
> view, not performance.** Every design choice below is in service of that and against the
> failure mode the voice memory names explicitly — *performed warmth is anti-voice.*

---

## The one-line read

The conscience today is **weather** — it fires when conditions cross a threshold, says a true
thing, vanishes, and forgets you. A living conscience is **a witness** — it was in the room the
whole time, it remembers what you did last week, and it holds an opinion about where you're
headed. Same restraint. Same rarity. The difference is entirely *whether the thing that speaks
has a memory and a stake.*

The mistake to avoid: making it talk *more* to feel alive. Aliveness is not volume. **A witness
who's been quietly watching for three weeks and says one specific sentence is more alive than a
chatbot that greets you every morning.** Hold that. The whole design is "earn the right to say
one piercing thing by genuinely knowing the story," not "add presence theater."

---

## Q2 first, because it's the crux: where it speaks vs. stays a tool

I'm answering this one before the others because it's the constraint every other answer has to
satisfy. The founder named it right: a conscience that *performs* aliveness betrays the voice.

The line is this — and it's a clean one:

> **The conscience never speaks to prove it's alive. It speaks because a principle is at stake,
> and the aliveness shows up in HOW MUCH IT KNOWS when it does — never in extra speaking acts
> added for presence.**

Concretely, two columns. This is the load-bearing distinction in the whole spec:

| Continuity makes the EXISTING moment *deeper* (do this) | Continuity becomes a NEW speaking act (never do this) |
|---|---|
| The caution moment now says *"third time you've rebuilt onboarding"* because the brain remembers the first two. | A "good morning, here's where we left off" session greeting. |
| The done moment lands harder: *"This is the thing you've been circling since week one."* | A "just checking in — how are you feeling about the venture?" prompt. |
| `boss status` carries one line of the conscience's current read. | The conscience volunteering its read unprompted, mid-work. |
| When you ASK it (Q3), it answers with the full arc. | The conscience narrating its own memory ("I remember when you...") to seem warm. |

**The test:** every time the conscience adds words, ask — *would it still be firing if it had no
memory?* If the answer is "the memory is the only reason it's speaking," that's presence theater,
kill it. The memory's job is to make a **principle-triggered** utterance *specific and true*, not
to manufacture a reason to talk. The brain deepens the moments that already exist; it does not
mint new ones. (This is Principle 2 — restraint — applied to the brain itself. The brain has
earned no new interrupts.)

One sharp consequence: **the continuity is mostly invisible.** The founder doesn't see the brain
working most of the time. They see it in two places only — when a moment fires *and lands with
uncanny specificity*, and when they deliberately reach for it (status, or asking it). That
invisibility IS the design. A conscience you feel watching you all the time is a surveillance
product, not a colleague. (Humane Principle 6 — the line I hold.)

---

## Q1 — The continuity moment: what it says on session 2, session 5

There is no "session greeting." That's the trap. Continuity surfaces in **three** places, in
ascending order of how much story is required to pull it off. I'll give actual copy for each.

### Surface A — `boss status` gets one conscience line (the ambient, pull-not-push)

This is the cheapest, safest continuity surface and it ships first. The founder runs `boss status`
of their own volition; the conscience adds ONE line — its current held read. No push, no
interrupt. It's a status field, the way visibility-of-system-status (Nielsen) should work.

Today `boss status` shows mode, loops, fires. Add a single line at the top, only once the brain
has a real read (silent until then — empty cells are the diagnostic):

```
  conscience read   (.boss/brain.md · updated 2d ago)
    You've been building around the onboarding rebuild for three weeks. The bet you
    named — that solo founders will pay — still has no one talked to. That's the gap.
```

Session 1 of a fresh project: this line is **absent.** The brain has nothing earned to say yet,
and faking a read would be the fortune-cookie failure. Silence is correct. The line appears when
there's genuinely a story to hold — which is itself a signal to the founder that something real
has accumulated.

### Surface B — the moment fire, now carrying memory (the deepened existing moment)

This is where "it remembers you" lands hardest, because it's *unsolicited and specific.* The
founder didn't ask; they submitted a prompt, drift crossed threshold, and the thing that spoke
**knew their history.** Same moment that fires today — but the model now reads `.boss/brain.md`
alongside the canvas/devlog and composes with the arc.

**Today's caution voice (one-sized, no memory):**
> *"That's the third thing you've added here, and none of it's been tested yet. What would show
> you it's real? `/canvas` will name the riskiest bet."*

**With the brain (session 5, it's been holding your story):**
> *"This is the fourth idea you've captured since we started, and the pattern's the same as the
> last three — you sharpen it on paper, then move to a new one before anyone outside this repo
> sees it. The thing you keep coming back to is the solo-founder angle. Maybe that's the one
> worth showing someone. Who'd tell you the truth about it?"*

The difference isn't tone. It's that the second one **could only be said by something that was
there for the first three.** That's the uncanny part. That's the screenshot (Q4).

### Surface C — session start, but ONLY as a returning-context line, never a greeting

There IS a legitimate session-start surface, but it's tightly bounded. When the founder opens
Claude Code on a project the brain has a read on, and *only* if something material shifted since
last session (a moment fired and went un-acted, a loop closed, a stretch of silence on a named
risk), the conscience may surface **one** line of continuity — framed as picking up the thread,
not greeting:

> *"Last we worked, you'd just named the pricing risk and then spent the session on the editor
> instead. Still want to leave the pricing question for later, or is now the time?"*

Rules that keep this from becoming needy:
- **At most one line. Never two sessions in a row** on the same unaddressed thing (that's nagging).
- **Only if there's a real thread**, never "welcome back." If nothing shifted, stay silent — the
  founder just gets their normal session.
- **It's a question handed back, not an observation parked.** The conscience surfaces the thread
  and immediately returns the call. (Manner axis: asks, never blocks; founder always decides.)

Surface C is the riskiest of the three and should ship LAST, behind the brain being genuinely
good. If the read is wrong, a session-start line is the most annoying place to be wrong. Sequence:
A (status) → B (deepened moments) → C (session thread). B is the viral one; A is the safe one; C
is the one that needs the most trust before it earns its place.

---

## Q3 — Can you talk TO it? Yes. `/boss-think` (a skill, not an agent, not a mode)

This is the affordance that flips the conscience from *fires-at-you* to *available-to-you*, and
it's the single biggest "feels like its own AI" unlock after the deepened moments. Right now there
is no way to ask the conscience anything. There should be.

**Category call (this is the kind of thing I'm here to get right):** it's a **skill**, not an
agent, not a mode. Reasoning:

- **Not an agent.** An agent is a *role you converse with* — pm, mentor-venture. The conscience is
  not a role; it's the build's judgment, and the ethos is explicit that it is "internal, not
  consulted — judgment applied in the flow of building," NOT "a separate class of agents you
  visit." Making the conscience an agent you open a thread with would re-make the exact category
  error boss-ethos warns against (the mentor-layer-as-coaches mistake). It would also dilute it —
  a thing you can chat with anytime stops being rare, and rarity is its power.
- **Not a mode.** Modes are ceremony tiers (Quickstart→Scale). Talking to the conscience isn't a
  ceremony level.
- **It's a skill** — a verb the founder *deliberately invokes* when they want the conscience's read
  on something. That deliberateness is the whole point: the conscience speaks unprompted only at
  the cliff edge (the moments); but the founder can always *choose* to ask it. That's the
  user-control-and-freedom heuristic — the founder controls the conversation, the conscience
  controls the interrupts.

**What `/boss-think` does** (the interaction):

```
/boss-think should I kill the export feature?
/boss-think                         ← no argument: "what do you see right now?"
```

It loads the full brain (`.boss/brain.md` + canvas + recent devlog + loop state + the relationship
memory) and answers **in character, with the whole arc**, holding a point of view. Not a chatbot.
The seasoned hand, asked a direct question, gives you a direct read — and hands the call back.

Actual copy, `/boss-think should I kill the export feature?`:

> *"You shipped export in week two and it's been touched twice since — both times to fix it, never
> to extend it. No one's asked for it in anything you've captured. The honest read: it's not
> earning its keep, and it's the kind of thing you keep half-maintaining instead of cutting. If
> you kill it and someone screams, that's the best signal you'll have gotten all month. But it's
> your call — you're closer to the users than I am. What's the actual cost of cutting it?"*

Note what that does: it has a **view** ("it's not earning its keep"), it's **specific to this
project's history** (week two, touched twice), it **hands the call back** ("your call"), and it
**asks a sharper question** rather than deciding. That's the voice, with continuity. That's the
thing nothing else can do — Cursor has no arc memory, ChatGPT wasn't in the room.

`/boss-think` with no argument is the "read the room" move — the founder wants the conscience's
current point of view on the whole venture, unprompted-by-a-specific-question. This is where the
held POV lives most fully. It's also the second-most-screenshottable surface after the deepened
moment.

**Restraint guard on `/boss-think`:** it is honest when it doesn't know. If the brain is thin
(fresh project, n=0 captures), `/boss-think` says so rather than inventing a read:

> *"Too early for me to have a real read — you've captured one idea and built nothing yet. Ask me
> again when there's a week of work to look at, and I'll have something worth saying."*

That honesty is *more* convincing than a fabricated read. It's the same discipline as the empty
artifact cell — the conscience refuses to fake the read it hasn't earned. (This is what stops
`/boss-think` from being a fortune-cookie generator, which is the thing that would kill the whole
viral thesis on contact.)

---

## Q4 — The shareable moment: what has to be true for it to land

The viral artifact is **a moment a founder screenshots because it said something piercingly true
and specific that only something watching their whole build could say.** "You've rebuilt
onboarding three times and still haven't talked to a user." The name carries it — *"my BOSS told
me to kill the feature."*

Four things have to be true or it reads as a generic fortune cookie and the whole thesis dies:

**1. Specificity from real artifacts, never adjectives.** The line must name *things that
happened* — "rebuilt onboarding three times," "touched export twice, both fixes," "named the
pricing risk in week one, never returned to it." These come from the brain reading the actual
devlog/loop history, not from generic startup wisdom. A line that could apply to any startup
("have you validated your assumptions?") is worthless. A line that could ONLY apply to THIS repo
is the screenshot. **Mechanism: every conscience utterance that claims a fact must be groundable
in a brain entry or live state.** If the model can't cite where it knows something, it doesn't
say it. (This is the same anti-hallucination discipline BOSS already preaches for AI products,
applied to the conscience itself — and it's load-bearing: one fabricated "fact" that the founder
knows is wrong destroys trust in everything the conscience says.)

**2. It costs the founder something to hear.** A screenshot-worthy conscience line tells you the
thing you've been avoiding. "Kill the feature." "You haven't talked to a user." "This is the
fourth idea." The shareable quality comes from candor (voice constant) — it said the hard true
thing. Flattery never gets screenshotted. The brand of the artifact is *"BOSS was right and it
stung."*

**3. It hands the call back — the founder stays the boss.** The line names the truth and returns
the decision. "Kill the feature — but it's your call." That's why the founder can screenshot it
*and still feel respected.* A line that ordered them around ("you must talk to users") is
condescending and gets resented, not shared. The shareable version respects the founder's agency
*while* telling them the truth. (This is the BOSS name's whole meaning — boss-as-camaraderie, it
makes YOU the boss. The screenshot says "my BOSS told me" the way you'd quote a sharp friend, not
a manager.)

**4. It's rare enough to mean something.** If the conscience said piercing things every session,
none would be worth screenshotting. The scarcity IS the value. This is why Q2's restraint isn't
just voice hygiene — it's what *protects the viral asset.* A chatty conscience has no screenshot
moments because nothing it says is an event.

**The design of the moment itself** — when does the screenshot-grade line fire? It rides the
EXISTING moments (caution/drift/done), deepened by the brain. It is not a new "say something
profound" trigger. The drift moment, with the brain, IS the "you've rebuilt onboarding three
times" line — because drift fires when work accumulates against an un-tested named risk, and the
brain supplies the *three times.* The viral line is the existing conscience, finally specific.

---

## Q5 — Identity/presence: lean into BOSS, no new name or face

My read: **lean all the way into "BOSS" as the character. No second name, no avatar, no signature
glyph beyond what exists.** (Flagging for voice-keeper as asked — this is a voice-ownership call —
but here's my reasoning as the experience designer.)

- **The name is already the asset and already a character.** boss-ethos establishes BOSS as
  camaraderie-not-rank, the seasoned hand, the peer who hands you the keys. That's a fully-formed
  identity. A second name (a "Clippy with a real name" move) would *fragment* it and read as
  mascot-ification — exactly the performed-personality the voice memory forbids. The viral phrase
  is already perfect: "my BOSS told me to kill the feature." Don't dilute it with "BOSS's
  conscience, named Ada, says..."
- **No face/avatar.** BOSS is a terminal + Claude Code experience. A face would be skeuomorphic
  presence theater — the opposite of the restraint that defines it. Its presence is *what it knows
  and when it speaks*, per Spool's "experience is a system property, not a surface." Giving it a
  face would be designing the surface BOSS deliberately doesn't have.
- **One light signature, already present: the `✦` mark.** The conscience already uses `✦` in
  pause/resume output. Keep that as its quiet glyph — the visual stamp that "this line is the
  conscience speaking, not the build agent." That's enough signifier (Norman) to distinguish *the
  conscience's voice* from *the coder's voice* in a shared terminal, without becoming a mascot.
  One character. That's the whole identity system Quickstart has earned.

What the conscience DOES need for presence is not a name — it's the **first-person continuity of
the brain.** When it says "we've been building around this for three weeks" and means it (because
the brain holds the three weeks), *that* is the presence. Identity through memory, not through
costume. The "seasoned hand who was in the room" is a presence you feel because it remembers, not
because it has a face.

---

## What surfaces, in build order (the sequencing)

Maps onto IDEA-022's "spine first, then fan out." All of Track 4 depends on the brain (FEAT-022)
existing. Within Track 4:

| Order | Surface | Risk if read is wrong | Why this order |
|---|---|---|---|
| 1 | **`boss status` conscience line** (Surface A) | Low — founder pulled it, can ignore | Safest place to debut the brain's read; pull-not-push; ships with the spine |
| 2 | **Deepened moments** (Surface B) | Medium — unsolicited, but rides existing rare moments | The viral surface; the screenshot; the core of the thesis |
| 3 | **`/boss-think`** (Q3) | Low — founder asked; honest-when-thin guard | The "talk to it" unlock; deliberate, controllable |
| 4 | **Session-thread line** (Surface C) | Highest — unsolicited at session start | Needs the most trust in the brain before it earns the right; ship last |

**Hold the line:** none of these is a greeting, a check-in, a streak, an engagement loop, or a
manufactured-urgency nudge. Every one is either pulled by the founder (A, C-as-question, /boss-think)
or rides a principle-triggered moment that already exists (B). If a future iteration proposes "BOSS
hasn't heard from you in a while, everything okay?" — that's the dark pattern, and it's
disqualified, not debated (Principle 6). The conscience that doesn't design like that is the whole
product.

---

## Concrete changes this argues for (for coder-generalist / mentor-architect)

These are the implementation handoffs. I own the experience spec; these are the diffs it implies.

1. **`composeContext()` (loop-runtime.js) reads the brain.** Today the model composes from
   signal + cohort framing. Add: when `.boss/brain.md` exists, the moment-composition directive
   instructs the model to read it alongside the canvas/devlog and ground the utterance in the held
   read. The per-moment phrasing already tells the model to do bounded reads (drift/caution/capture
   already read devlog + canvas) — extend those instructions to include the brain, and add the
   **groundability rule**: claim no fact the brain/state can't support. (Architect owns the brain's
   shape/location; this is the read-path into the existing compose step.)

2. **`statusConscience()` (src/conscience.js) gets a brain-read line.** Add one block at the top of
   `boss status` output: if `.boss/brain.md` exists and has a current read, print the `conscience
   read` line (Surface A). Silent if absent. This is purely additive to the existing status render.

3. **New skill: `/boss-think`** at `stages/L0-quickstart/template/.claude/skills/boss-think/SKILL.md`.
   Loads the full brain + canvas + recent devlog + loop state, answers in-character with a held POV,
   honest-when-thin, hands the call back. Spec'd above (Q3). This is the "talk to it" affordance and
   should be authored in the voice (per boss-voice memory) — pair with voice-keeper on the exemplar
   lines.

4. **Session-thread surface (Surface C) — defer.** Needs a SessionStart hook reading the brain for a
   "material shift since last session" delta. Ship only after 1-3 prove the brain's read is reliable.
   Don't build it on an unproven brain.

## Open questions handed onward

- **voice-keeper:** ratify the no-second-name call (Q5) and author the `/boss-think` exemplar lines.
  The copy in this doc is my draft in the voice; voice-keeper owns final ring-true.
- **mentor-architect:** the brain's shape determines what `composeContext` can read and what
  `/boss-think` can load. The groundability rule (Q4 #1) needs the brain to be *inspectable enough
  that a claim can be traced to an entry* — that's a constraint on the brain format, surfaced from
  the experience side.
- **prompt-coach:** `/boss-think`'s no-argument mode ("read the room") depends on the founder
  knowing they can ask open-endedly. The skill description (the founder's prompt INTO it) needs to
  make both modes — specific question and open ask — legible.
