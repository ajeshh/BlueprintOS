#!/usr/bin/env bash
# BOSS conscience hook (Quickstart) — moment #1: "what does this prove?"
#
# Fires on UserPromptSubmit. Detection only: if the project is drifting (capturing
# a lot, validating nothing), it hands Claude a SIGNAL — never canned copy, never a
# block. Claude keeps the voice and the judgment: it decides whether this is the
# right moment to speak, says it once in BOSS's register, or stays quiet.
#
# Output (v0.16.0+): structured JSON the model can compose against:
#   { moment, confidence, evidence, suppress_if }
# Plus an `additionalContext` string for hosts that need a single field. The
# structured shape makes the hook eval-runnable (docs/architecture/conscience-evals/).
#
# Detection rules (v0.16.0):
#  - Only counts captures across ACTIVE ideas (skips `status: dropped`).
#  - Validated = a canvas for an *active* idea has a real riskiest-assumption
#    answer (at least 3 alphanumeric chars; rejects `_(placeholder)_`, `_TBD_`,
#    `?`, and other minimal-substance fills).
#
# Invoked as `bash conscience.sh`; needs no execute bit. Always exits 0.

DIR="${CLAUDE_PROJECT_DIR:-.}/docs/ideas"
[ -d "$DIR" ] || exit 0

# Build the ACTIVE idea-file list (exclude `status: dropped`, exclude canvas files).
active_files=()
for f in "$DIR"/IDEA-*.md; do
  [ -e "$f" ] || continue
  case "$f" in *-canvas.md) continue;; esac
  if ! grep -qE '^status:[[:space:]]+dropped' "$f" 2>/dev/null; then
    active_files+=("$f")
  fi
done

# Count captures across ACTIVE ideas only.
captures=0
for f in "${active_files[@]}"; do
  n=$(grep -cE '^- [0-9]{4}-[0-9]{2}-[0-9]{2}' "$f" 2>/dev/null || echo 0)
  captures=$((captures + n))
done

# Validated = a canvas tied to an ACTIVE idea has a real riskiest-assumption.
# "Real" = first non-space char after `:**` is NOT `_`, AND the line has at least
# 3 alphanumeric chars. This rejects `?`, `??`, `_(...)`, `_TBD_`, empty, etc.
validated=false
for c in "$DIR"/*-canvas.md; do
  [ -e "$c" ] || continue
  base="${c%-canvas.md}.md"
  # Skip canvas if the matching idea is dropped (or missing — treat as inactive).
  [ -e "$base" ] || continue
  if grep -qE '^status:[[:space:]]+dropped' "$base" 2>/dev/null; then continue; fi
  if grep -Eq 'Riskiest assumption:\*\*[[:space:]]+[^_].*[[:alnum:]]{3,}' "$c" 2>/dev/null; then
    validated=true
    break
  fi
done

if [ "${captures:-0}" -ge 3 ] && [ "$validated" = false ]; then
  # Confidence scales with how much drift exists past the threshold.
  if [ "${captures:-0}" -ge 6 ]; then
    confidence="high"
  elif [ "${captures:-0}" -ge 4 ]; then
    confidence="medium"
  else
    confidence="low"
  fi

  cat <<JSON
{
  "hookSpecificOutput": {
    "hookEventName": "UserPromptSubmit",
    "moment": "caution",
    "confidence": "${confidence}",
    "evidence": {
      "capture_count": ${captures},
      "canvases_with_filled_assumption": 0,
      "active_idea_count": ${#active_files[@]}
    },
    "suppress_if": [],
    "additionalContext": "[BOSS conscience — validation drift] Several ideas/notes are captured but none has a tested riskiest assumption yet (capturing a lot, validating nothing). If — and only if — it fits this moment, surface BOSS's validation nudge in your own voice: name the drift in one spare line, ask what would make it real, point at /canvas, hand the decision back. Say it at most once; if you've already raised it this session, or the user is clearly mid-other-work, stay silent. It's a nudge, never a gate."
  }
}
JSON
fi
exit 0
