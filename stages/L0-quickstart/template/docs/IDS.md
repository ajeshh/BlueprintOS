---
id: IDS
type: index
owner: pm
status: active
---

# ID System — {{PROJECT_NAME}}

Stable IDs make work addressable across sessions and docs. New types unlock as the project matures.

## Active in Quickstart mode

| Prefix | Means | Lives in |
|---|---|---|
| `IDEA-NNN` | A raw idea, bug, or ask | `docs/ideas/` |

## Unlocks later

| Prefix | Means | Unlocks in mode |
|---|---|---|
| `FEAT-NNN` | A scoped feature with a spec | MVP |
| `FIX-NNN` / `BUG-NNN` | A cross-cutting fix or bug | MVP |
| `EXTR-NNN` | A pattern extraction decision (UP into library / DOWN into app core; PRINCIPLE #1) | MVP |
| `DEC-YYYY-MM-DD-NNN` | A logged decision | V1 |
| `RFC-NNN` | A decision document | Scale |
| `EXP-NNN` | A lab experiment | Scale |

## Frontmatter (required on every new doc)

```yaml
---
id: <ID or slug>
type: <idea | feature | fix | decision | index | spec | ...>
owner: <agent or person>
status: <seedling | exploring | ready | building | shipped | dropped>
---
```

Numbering: allocate the next free integer per prefix. Before reserving a `FEAT-NNN`,
grep all of `docs/` (not just an index) so planning docs that reserve numbers ahead of
folders don't get clobbered.
