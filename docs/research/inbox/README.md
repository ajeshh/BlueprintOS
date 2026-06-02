---
id: RESEARCH-INBOX
type: readme
owner: pm
status: active
---

# Research inbox — the drop zone

Drop unproven outside claims here, then run `/vet` to get a principled read on whether **BOSS**
should adopt them. This is the inverse of `/boss-learn` (which routes patterns you already proved);
here the input has earned nothing — `/vet`'s whole job is to decide whether it deserves to become
practice at all. See [IDEA-016](../../ideas/IDEA-016-research-intake-and-vetting.md).

## What to drop

Low ceremony in — any of:
- A `.md` note with the claim in your own words.
- A pasted article or thread.
- A one-line file holding a URL (`/vet` will fetch and read it).

Name files however you like (`onboarding-thread.md`, `some-paper.md`). One claim per file is cleanest.

## What happens

`/vet <file>` (or `/vet` with no arg → takes the oldest item) reads the claim, scores it against the
NO-biased rubric, and writes a verdict to [`../verdicts/`](../verdicts/) — **ADOPT** (→ `/boss-learn`),
**ADAPT**, **REJECT** (with reason, logged), or **NOT-YET** (with a re-open condition).

The default answer is *no*. Most best practices on the internet don't apply to BOSS, at its stage,
for its thesis. That's the point.

## After vetting

Once an item has a verdict file, it's recorded — clear it from here. Keep NOT-YET sources around
(you'll want them when the re-open condition hits); the verdict names which.
