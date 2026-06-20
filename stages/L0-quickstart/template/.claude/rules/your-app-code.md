---
paths:
  - "src/**"
---

<!-- This file loads into context ONLY when Claude opens a file under src/ — never at session start.
     That's the whole point: keep app-code conventions here (just-in-time), keep CLAUDE.md for what's
     true all the time. Rescope the paths: glob above to wherever your code actually lives — or delete
     this file if you don't need it yet. A rule with no paths: would load every session, like CLAUDE.md. -->

# Working context — {{PROJECT_NAME}} app code

_Conventions that only matter while writing the app. Replace the examples with your real ones, or
delete what you don't need._

- (example) One responsibility per file; split a module before it grows a second reason to change.
- (example) Validate input at the boundary, not deep in the call stack.
