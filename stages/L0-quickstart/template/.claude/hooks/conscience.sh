#!/usr/bin/env bash
# BOSS conscience hook (Quickstart) — moment #1: "what does this prove?"
#
# Fires on UserPromptSubmit. Detection only: if the project is drifting (capturing
# a lot, validating nothing), it hands Claude a SIGNAL — never canned copy, never a
# block. Claude keeps the voice and the judgment: it decides whether this is the
# right moment to speak, says it once in BOSS's register, or stays quiet.
#
# Invoked as `bash conscience.sh`, so it needs no execute bit. Always exits 0.

DIR="${CLAUDE_PROJECT_DIR:-.}/docs/ideas"
[ -d "$DIR" ] || exit 0

# How much has been captured? (dated capture-log bullets across idea docs)
captures=$(grep -rhE '^- [0-9]{4}-[0-9]{2}-[0-9]{2}' "$DIR" 2>/dev/null | wc -l | tr -d ' ')

# Has anything been validated? (a canvas with a *filled* riskiest assumption —
# the line present and not the _(placeholder)_)
validated=false
for c in "$DIR"/*canvas*.md; do
  [ -e "$c" ] || continue
  if grep -Eq 'Riskiest assumption:\*\*[[:space:]]+[^_[:space:]]' "$c" 2>/dev/null; then
    validated=true
    break
  fi
done

if [ "${captures:-0}" -ge 3 ] && [ "$validated" = false ]; then
  cat <<'JSON'
{
  "hookSpecificOutput": {
    "hookEventName": "UserPromptSubmit",
    "additionalContext": "[BOSS conscience — validation drift] Several ideas/notes are captured but none has a tested riskiest assumption yet (capturing a lot, validating nothing). If — and only if — it fits this moment, surface BOSS's validation nudge in your own voice: name the drift in one spare line, ask what would make it real, point at /canvas, hand the decision back. Say it at most once; if you've already raised it this session, or the user is clearly mid-other-work, stay silent. It's a nudge, never a gate."
  }
}
JSON
fi
exit 0
