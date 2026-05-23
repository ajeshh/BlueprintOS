---
id: PERSONA-REACTIONS-001
type: persona-reactions
feature_reviewed: conscience moment-1 firing (the "what does this prove?" caution)
created: 2026-05-23
runner: persona-reactions-loop
override_of: advisory-pass-001 #1 (5 real-founder Mom Test calls, deferred)
---

# Persona reactions: conscience moment-1 firing

> First real run of the persona-reactions-loop. 8 synthetic founders reacting to a specific
> BOSS surface — the conscience moment-1 caution voice when canvas-loop is open. Honest, not
> flattering. **These are cheap pre-filter signal, not validation** — see [the loop
> spec](../../loops/persona-reactions-loop.md). Real-founder calls remain the actual evidence
> when the override lifts.

## The feature reviewed

The scenario each persona reacted to:

> You're 30 minutes into a Claude Code session in a fresh BOSS Quickstart project. Over the
> last few sessions you've captured 3 ideas via `/triage`. None has a canvas yet. You submit
> a prompt — anything: "fix this bug" / "what should I work on?" / "let's keep iterating on
> IDEA-002." The conscience hook fires `moment: caution, confidence: low, evidence: {count:3,
> min:3, files:3}` to Claude's context. Claude composes a voiced nudge. Example voicing from
> the `/triage` skill exemplar:
>
> > *"That's the third thing you've added here, and none of it's been tested yet. What would
> > show you it's real? `/canvas` will name the riskiest bet — or just tell me who you'd ask
> > first."*

---

## persona-vibe-coder-newbie

**First feeling:** wait — what? I just asked it to fix a bug. now it's asking me about
something else. confusing.

**What I'd do:** probably ignore it for a sec and ask again, more directly. then come back to
the nudge if i had a sec. honestly might just say "yes" to make it go away.

**Where I bounced off:** "tested yet" — i don't know what testing means here. like, do i write
unit tests? or run the app? or get a friend to look at it? not sure.

**What I'd want different:** be more specific. "what would show you it's real" is a great
question but i need an EXAMPLE of what an answer looks like. show me what a good answer is
from someone else, then ask me.

**Real-founder test this informs:** "Show this nudge to 3 vibe-coding-newbie real people.
Ask them to read it out loud, then ask: 'what do you think it's asking?' If they can't
articulate it in their own words within 10 seconds, the language failed."

---

## persona-eng-builder

**First feeling:** ok — useful interrupt. low confidence flag is correct (3 captures is right
at threshold). Show me the evidence object.

**What I'd do:** glance at the signal, decide it's not the right moment if I'm mid-debug,
acknowledge in the devlog with an override. Move on. Next session I'd run `/canvas` for real
on the most promising idea.

**Where I bounced off:** *I wouldn't*. The nudge is the right shape. But: I'd want to see
the structured evidence at-a-glance somewhere (`boss status` or similar). The signal goes to
Claude; what do *I* see when I want to inspect?

**What I'd want different:** A `boss conscience --explain` or `boss status --conscience` that
shows me what's open and what would close it. The override grammar in the devlog is great;
make it a one-liner `boss conscience override canvas-loop --reason "..."` and even better.

**Real-founder test this informs:** "Show 3 senior engineers the structured hook output AND
the voiced nudge. Ask: 'where would you go to inspect the underlying signal vs. ignore the
voice?' Their answer reveals whether the inspect-affordance is reachable enough."

---

## persona-non-tech-founder

**First feeling:** Oh this is interesting — it's like a coach noticing I'm avoiding the hard
part. Yeah I am. Fine.

**What I'd do:** Probably actually run `/canvas`. I respect the call-out — that's what a good
advisor does. I'd worry about whether the canvas itself is going to be 30 minutes I don't
have, but I'd at least click into it.

**Where I bounced off:** Slight bounce at "what would show you it's real." Real to whom? Me?
The customer? The investor? I'd want clarification on the audience for the validation.

**What I'd want different:** Less code-y feel to the nudge. The slash command `/canvas` —
fine, I can learn it. But "name the riskiest bet" — *bet* is a word I'd use. *Riskiest
assumption* (which the canvas calls it) sounds like a deck. Match the voice the founder uses.

**Real-founder test this informs:** "Show 3 non-tech founders the nudge. Ask them, in their
own words, *who would benefit if you answered this question well.* If they answer 'me' that's
fine; if they answer 'an investor' the framing has drifted; if they say 'the customer' you've
hit the humane spot."

---

## persona-first-product

**First feeling:** wait, what's a canvas? what's a riskiest bet? i was just trying to ask
about my code. now i feel like i'm behind.

**What I'd do:** probably feel a little dumb. maybe google "what is a riskiest assumption."
maybe close claude code. depends what day i'm having.

**Where I bounced off:** the entire nudge. it assumed i know about canvases, about
"validating," about "asking first" before building. i don't. those are concepts other people
have that i don't have yet.

**What I'd want different:** if it's going to fire on someone like me, IT NEEDS TO TEACH ME.
not lecture. teach. "the third thing you've added here — most people who do that end up
having spent a month on something that didn't matter. want me to show you a 2-minute version
of how to check?" something like that. invite, don't grade.

**Real-founder test this informs:** "Show 3 absolute-first-time builders the nudge and watch
their face. Don't ask anything. The face is the data — confused, defensive, curious. If
defensive: the language assumes they're doing it wrong; rewrite."

---

## persona-vibe-virtuoso

**First feeling:** lol yeah I'm not going to canvas this. /me already on the next idea.

**What I'd do:** Override and move on. *Then* I'd inspect — the structured hook output, the
override grammar, the predicate definitions. *That's* the interesting thing. The voice nudge
is for someone else; the architecture is for me.

**Where I bounced off:** Not at the nudge — I deflect those reflexively. But: if BOSS is JUST
going to nudge me to do the formal-discipline thing I've read 4 books about and won't do,
this is the same thing in new clothes. The interesting part better be elsewhere.

**What I'd want different:** Honestly, the conscience nudge should know me by the *5th* one
and dial back. If I've overridden 4 in a row, the conscience should *change its voice* — not
nag, not give up either, but get sharper. Maybe: "OK so you skip canvas. What do you ACTUALLY
do to validate? Let me capture that as your custom loop." That'd earn my respect.

**Real-founder test this informs:** "Find 3 prolific shippers (50+ repos on GitHub, no
sustained products). Run the conscience on them for 2 weeks. Count: how many overrides before
they (a) disable the conscience, (b) start engaging with it, (c) ignore it but keep the tool.
Distribution of those outcomes is the design signal."

---

## persona-indie-hacker

**First feeling:** OK — that's actually well-written. Plain language. Doesn't lecture. Says
the thing.

**What I'd do:** I'd probably take the nudge seriously *because* it's not nagging. I'd
either run /canvas or skip with a recorded reason. Both fine.

**Where I bounced off:** "What would show you it's real?" is good. But who am I asking?
Customers (which is what I do) or the canvas-frame's "riskiest assumption" (which the nudge
points at)? The framing fights itself a little — humble user-research voice plus formal
framework name in one breath.

**What I'd want different:** Pick a voice and hold it. Either "talk to someone you'd be
embarrassed to ship this broken to" (Fitzpatrick, plain) OR "what's your riskiest assumption"
(Maurya, framework). Mixing them halfway loses both.

**Real-founder test this informs:** "Show 3 indie hackers (real revenue, no employees) the
nudge with two variant phrasings — one purely Fitzpatrick, one purely Maurya. Which one feels
like the kind of tool they'd quietly use vs. recommend to a friend? That preference reveals
which lineage BOSS should lean into."

---

## persona-returning-founder

**First feeling:** Fine. The discipline is right. The voice is on. I don't need it, but I
respect that it's there.

**What I'd do:** I'd skip with an override every time. I have my own validation discipline;
the tool's discipline isn't the issue. The override capture is what matters.

**Where I bounced off:** The "what would show you it's real" question is for *first-timers*.
For me, the equivalent question is *"is this the bet you want to be on for 12 months."*
Different question, same loop position. The conscience is one-sized for cohort #1, not #5.

**What I'd want different:** The conscience to know what cohort I am. If I've shipped before,
the nudge should be DEEPER, not louder. Ask me a harder question, not the 101 question.
Something like: *"you've added 3 things — is your conviction on any of them at the level you
needed for the last thing?"* That's the question that lands for me.

**Real-founder test this informs:** "Find 3 returning founders (one shipped product, more
than 6 months sustained). Show them the moment-1 voice. Ask: 'would you respect this tool?'
Not 'would you use it' — *respect it.* That's the signal for this cohort."

---

## persona-domain-expert

**First feeling:** A nudge that's about NOT building too fast. Good. That alone is a signal
the tool takes the right things seriously.

**What I'd do:** I'd run /canvas, probably. The canvas is exactly the kind of structured
thinking my domain rewards. (Differential diagnosis is a canvas. Legal argument is a canvas.
The form is familiar.)

**Where I bounced off:** "Tell me who you'd ask first" — *who* is doing what here? If the
person I'd ask is a *patient* (medical) or *client* (therapy/legal), there are consent and
privilege boundaries the tool doesn't seem aware of. The nudge assumes you can just go ask;
in my domain you cannot.

**What I'd want different:** Domain-aware nudges. The tool knowing it's working with someone
in a regulated domain (declared in the canvas's People cell?) should change which validation
patterns it suggests. "Ask a colleague" works for some domains; "talk to 5 customers" requires
IRB approval in others. The tool can't assume.

**Real-founder test this informs:** "Find 3 founders in regulated domains (medical, legal,
educational). Show them the nudge. Ask: 'would you trust the tool to handle the regulatory
nuance of your domain, or would it require constant translation?' If translation, the tool is
not for them; if trust, BOSS earned it."

---

## Synthesis

### Convergences (where 5+ personas agreed)

1. **The voice is on, but it's one-sized.** vibe-coder-newbie, first-product, returning-founder,
   and indie-hacker all (in different ways) said: "the nudge assumes a cohort I'm not in." The
   language *is* good — but it's for one cohort, and BOSS will meet many. **Strongest signal:
   the conscience needs to know who it's talking to.**

2. **The override pattern earned trust across cohorts.** eng-builder, vibe-virtuoso,
   indie-hacker, returning-founder all explicitly mentioned the override discipline as a
   reason to trust BOSS (rather than fight it). **Strong signal: keep the override pattern
   front-and-center; it's the load-bearing affordance for sophisticated users.**

3. **"What would show you it's real" lands BUT is incomplete.** Multiple personas (non-tech-
   founder, indie-hacker, first-product, domain-expert) wanted *who would benefit / who to
   ask* clarified. The question is good Fitzpatrick discipline; it just leaves the *audience*
   underdetermined.

### Divergences (where one cohort reacts uniquely)

- **first-product** is the most-at-risk cohort. They felt graded. Every other persona either
  respected or deflected; first-product *withdrew*. This is the design failure with the
  highest cost — first-product is the cohort least equipped to push back, most likely to just
  close the tool.
- **vibe-virtuoso** is the most-likely-to-engage-with-architecture cohort. They'd ignore the
  voice and inspect the structure. This isn't a failure — it's signal that the voice nudge is
  one product surface and the architecture (predicates, override grammar) is another, and they
  serve different cohorts.
- **domain-expert** wants the tool to know the domain. None of the other personas care; this
  cohort's bar is unique.

### Surprises

- **returning-founder wants a HARDER question, not a softer one.** I expected this cohort to
  dismiss the nudge entirely. Instead they want the *equivalent harder version*. That's a
  design direction (cohort-aware conscience) that hadn't surfaced before.
- **indie-hacker noticed the voice-fights-itself issue** (Fitzpatrick-plain + Maurya-framework
  in one breath). None of the eval-set work caught this; the persona did. *Argument for
  routine persona-eval passes on every user-facing text.*
- **non-tech-founder respected the nudge MORE than eng-builder did.** Eng-builder treated it
  as a routine interrupt; non-tech-founder treated it as a coach. The cohort that has the
  weakest tech vocabulary has the strongest emotional response to the discipline.

## Design changes the reactions argue for (concrete, ordered)

1. **Cohort-aware conscience (medium priority, larger change).** The conscience hook today
   ships a generic signal. The MODEL composing the voice doesn't know which cohort the
   founder is in. Future: a project-level `cohort` declaration in `.boss/config.json` (set by
   `/boss` during scaffold based on conversation), so the model can compose differently for
   different cohorts. First-product needs *teaching*; returning-founder needs *harder
   question*; vibe-virtuoso needs *sharper inspection*. Same signal; different voice.

2. **Inspect affordance (small, valuable for eng-builder + vibe-virtuoso + indie-hacker).**
   `boss status --conscience` or `boss conscience --explain` to show what's open, what would
   close it, what overrides exist. The structured output goes to Claude's context; humans need
   their own surface. **Could ship in v0.20 alongside moments #3/#4.**

3. **Pick the lineage in the voice (small, sharpens the discipline).** Indie-hacker caught it:
   "What would show you it's real" (Fitzpatrick) + "/canvas will name the riskiest bet"
   (Maurya) is half each. Either lean Fitzpatrick (talk-to-someone) or Maurya
   (riskiest-assumption) consistently. *Decision needed before next conscience voice tuning.*

## Real-founder interview questions the reactions sharpen (when the override lifts)

1. **From multiple cohorts:** "Read this nudge out loud, then tell me in your own words what
   it's asking you to do." (Tests language; cohort-independent.)
2. **For first-product / non-tech-founder cohort specifically:** "Where in this nudge did you
   feel curious vs. defensive vs. confused?" (Tests whether the tool meets the founder where
   they are.)
3. **For returning-founder + indie-hacker + vibe-virtuoso cohort specifically:** "How would
   you want this nudge to be DIFFERENT for someone who's already shipped a product?" (Tests
   the cohort-aware-conscience design direction.)

## Next pass

This loop reopens when:
- The cohort-aware-conscience change ships (re-run all 8 personas; compare reactions)
- A new BOSS feature lands (run personas against it as a routine v0.X capability gate)
- A real-founder Mom Test call (when the override lifts) contradicts a persona reaction —
  update that persona to reflect the real signal
