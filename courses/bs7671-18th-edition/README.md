# BS 7671 18th Edition — Exam Trainer

Interactive revision and mock-exam tool for City & Guilds 2382, covering
BS 7671:2018 + A2:2022 + A3:2024 + A4:2026.

**Start with [HANDOVER.md](HANDOVER.md)** — it covers status, what is verified, the
open decisions, and the content caveats.

## Layout

```
source/18th-edition-exam-prep.md   Master content, verbatim as supplied
data/questions.json                152 questions, structured
data/questions.csv                 Same, flat, for LMS quiz importers
build/exam-trainer-standalone.html Complete hostable page — upload and link
build/exam-trainer.artifact.html   Same page as a Claude Artifact body
src/                               Extraction and build scripts, page template
```

## Running it

No build or server needed. Open `build/exam-trainer-standalone.html` in a browser,
or host it anywhere that serves static files.

## Rebuilding after a content or design change

Requires Node (no npm dependencies).

```sh
cd courses/bs7671-18th-edition/src

# Only if source/18th-edition-exam-prep.md changed — regenerates the question
# bank and the notes HTML, and re-checks every answer key entry against its option.
node extract.js
node notes.js

# Always — injects data + notes into template.html, then produces the
# standalone hostable page and the CSV export.
node build.js
node package.js
```

`extract.js` fails loudly if any question loses an option, if a question has no
answer-key entry, or if a key entry's answer text disagrees with the option letter
it points at. A clean run reports `answerText mismatches: 0`.

Edit the page itself — layout, palette, copy — in `src/template.html`. The colour
system is a single block of CSS custom properties at the top, defined for light and
redefined for dark; change them there rather than in individual rules.

The pipeline is reproducible: re-running all four scripts against an unchanged
source regenerates `data/` and `build/` byte-for-byte.
