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

## Year to date — the road to £9m

- `ytd-road-to-9m.pptx` — nine slides: Q1, Q2, the year so far, where we stand
  against £9m, what September must deliver, the plan to year end, the bonus
  ladder, and what £10m actually takes. Script in the speaker notes.

  The bonus scheme pays Emily, Stuart, Cassie and Megan — £5,000 each for every
  £200,000 above £9m, so £25,000 each and £100,000 in total at £10m. That is 10%
  of the excess at every rung.
- `alice-script-road-to-9m.txt` — the same script standalone, approx 3m 50s.
- `ytd-data.js` — the monthly transcription, the reconciliation against the
  board's own monthly total row, the run-rate arithmetic and the bonus ladder.
  `node reports/ytd-data.js` re-derives every figure in the deck.
- `ytd-deck-generator.js` — rebuilds the deck.

CONFIDENCE ON THE MONTHLY FIGURES. The monthly half of the board is written at
two heights per team and the top-left corner is under camera glare. Of the
twelve monthly totals that could be checked against the board's own total row,
five reconcile to within £4 (May, Jun and Aug actual; Feb, Mar and Aug target).
Three need checking before these figures are quoted outside the meeting:

- July actual: the team rows sum to £670,538, the board total row reads £609,584.
- T1's January and February are under the glare and are imputed at T1's own
  monthly mean of £23,201.
- January, April and May targets are out by £5,500, £6,000 and £3,294.

The year-to-date total of £5,880,571 therefore carries an uncertainty of roughly
£60k, or 2% of the remaining gap to £9m.
