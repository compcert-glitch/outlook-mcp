# Fee board reports

Working papers behind the weekly fee board review.

## Week 1

- `week1-fee-board-review.html` — the review as presented at the managers' meeting.
  Published as an Artifact; open the file directly in a browser for an offline copy.
- `week1-fee-board-data.js` — the board transcription and the variance arithmetic.
  Run `node reports/week1-fee-board-data.js` to re-derive every figure in the report
  and to re-run the cross-cast against the board's own total row.

The transcription is taken from a photograph of the fee board. Tuesday, Thursday and
Friday sum exactly to the board's total line; Wednesday differs by £201. Two figures
were recovered arithmetically from the total row where the handwriting was unclear —
T6 Tuesday (£31,221) and T10 Thursday (£35,846) — and should be confirmed against the
accounts system.

## Presentation

- `week1-fee-board-review.pptx` — eight slides, five charts, with Alice's script
  already in the speaker notes slide by slide.
- `alice-presenter-script.txt` — the same script as a standalone file for pasting
  into a voice tool. SSML `<break time="0.7s"/>` tags set the pacing; a tag-free
  version is appended at the end of the file.
- `week1-deck-generator.js` — regenerates the deck. `npm install pptxgenjs`, then
  `node reports/week1-deck-generator.js`. Edit the `addNotes()` blocks to change
  the script; both the notes and the standalone file are generated from them.

Run time is approximately 3m 43s at 138 words per minute, inside the 4-minute limit.
