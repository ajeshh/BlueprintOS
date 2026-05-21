---
id: IDS
type: index
owner: pm
status: active
---

# ID System — BlueprintOS

| Prefix | Means | Lives in |
|---|---|---|
| `IDEA-NNN` | A raw idea / planned capability | `docs/ideas/` |
| `FEAT-NNN` | An idea in active build (promoted from IDEA) | `docs/ideas/` (or a `docs/features/` folder if it grows) |
| `vX.Y.Z` | A released BOSS version | `registry/CHANGELOG.md` |

Frontmatter on every doc: `id`, `type`, `owner`, `status` (`seedling | exploring | ready | building | shipped | dropped`).
