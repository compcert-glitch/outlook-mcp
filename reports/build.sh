#!/usr/bin/env bash
# Rebuilds every deliverable in this folder from its source data.
#
#   ./reports/build.sh
#
# Requires node (npm install pptxgenjs) and, for the geometry check,
# python3 with python-pptx installed.
set -euo pipefail
cd "$(dirname "$0")"

# pptxgenjs builds the decks. Install it into reports/ only - it is a build-time
# tool for these documents, not a dependency of the MCP server in the repo root,
# so it must never be written into the root package.json.
if ! node -e "require.resolve('pptxgenjs')" >/dev/null 2>&1; then
  echo "installing pptxgenjs into reports/ ..."
  [ -f package.json ] || echo '{"name":"fee-board-reports","private":true}' > package.json
  npm install --silent --no-audit --no-fund --prefix . pptxgenjs
fi
# python-pptx runs the geometry check; skip that step if it is missing
HAVE_PPTX=$(python3 -c "import pptx" 2>/dev/null && echo yes || echo no)

echo "== figures =================================================="
node week1-fee-board-data.js
node ytd-data.js

echo
echo "== decks ===================================================="
node week1-deck-generator.js
node ytd-deck-generator.js

echo
echo "== presenter scripts ========================================"
node make-presenter-script.js week1-deck-generator.js \
  "Title slide|Graph 1 — Where the week landed|Graph 2 — Who the gap belongs to|Graph 3 — How the week flowed|Graph 4 — Where the income comes from|Graph 5 — The target rises as the gap opens|Queries on the board itself|For decision today" \
  "WEEK 1 FEE BOARD REVIEW — PRESENTER SCRIPT FOR ALICE" \
  "alice-presenter-script.txt"

node make-presenter-script.js ytd-deck-generator.js \
  "Title — The Road to £9 Million|The year month by month|September week by week|Where we stand — £6.00m of £9m|What each team lead owns|Recommendations — six changes that would move the number|The bonus — £5,000 each per £200,000 over £9m|The stretch — what £10m actually takes" \
  "YEAR TO DATE & THE ROAD TO £9 MILLION — PRESENTER SCRIPT FOR ALICE" \
  "alice-script-road-to-9m.txt"

echo
echo "== slide geometry check ====================================="
if [ "$HAVE_PPTX" = yes ]; then
  python3 check-slide-geometry.py week1-fee-board-review.pptx
  python3 check-slide-geometry.py ytd-road-to-9m.pptx
else
  echo "skipped - run 'pip install python-pptx' to enable"
fi

echo
echo "== per-team figures ========================================="
node per-team-figures.js
node september-weeks.js

echo
echo "Done."
