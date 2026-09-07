# Fee board reports

Working papers and finished deliverables for the managers' meeting.

## Rebuild everything

```bash
./reports/build.sh
```

Re-derives every figure, rebuilds both decks, regenerates both presenter
scripts, and runs the slide geometry check. It installs `pptxgenjs` on first
run. The geometry check needs `pip install python-pptx`; without it that step
is skipped and everything else still runs.

## What to take to the meeting

| File | What it is |
|---|---|
| `ytd-road-to-9m.pptx` | **The main deck.** Nine slides — Q1, Q2, the year so far, the position against £9m, September, the plan to year end, the bonus, and what £10m takes. Alice's script is in the speaker notes. |
| `alice-script-road-to-9m.txt` | The same script standalone, for pasting into the voice tool. Approx 3m 53s. |
| `week1-fee-board-review.pptx` | The Week 1 deck — eight slides on last week's board. Approx 3m 43s. |
| `alice-presenter-script.txt` | Its presenter script. |
| `week1-fee-board-review.html` | The written Week 1 review. Open in any browser. |

## Sources you can edit

| File | What it holds |
|---|---|
| `ytd-data.js` | The monthly transcription, the reconciliation against the board's own total row, the run-rate arithmetic, and the bonus ladder. `node reports/ytd-data.js` prints the lot. |
| `week1-fee-board-data.js` | The Week 1 daily transcription and its cross-cast against the board's total row. |
| `ytd-deck-generator.js` | Builds the year-to-date deck. Figures are constants at the top; the script lives in the `addNotes()` blocks. |
| `week1-deck-generator.js` | Builds the Week 1 deck. |
| `make-presenter-script.js` | Turns a generator's speaker notes into the standalone script file, and times it. |
| `check-slide-geometry.py` | Checks a deck for text overflow, overlaps, out-of-bounds shapes and tight margins. |

To change a figure, edit it in the `*-data.js` or at the top of the generator,
then run `./reports/build.sh`. The decks, the speaker notes and the standalone
scripts all regenerate together, so they cannot drift apart.

## The bonus scheme

Emily, Stuart, Cassie and Megan. **£5,000 each for every £200,000 of invoiced
fees above £9m** — so £25,000 each and £100,000 in total at £10m. That is 10%
of the excess at every rung.

Measured on **fees invoiced, not cash collected**. The payment date is still to
be confirmed.

## Confidence in the figures

**Week 1 daily figures — high.** Tuesday, Thursday and Friday sum exactly to the
board's own total line; Wednesday differs by £201. Two figures were recovered
arithmetically where the handwriting was unclear — T6 Tuesday (£31,221) and
T10 Thursday (£35,846).

**Monthly figures — good, with three exceptions.** The monthly half of the board
is written at two heights per team and the top-left corner is under camera
glare. Of the twelve monthly totals that could be checked against the board's
own total row, five reconcile to within £4 (May, Jun and Aug actual; Feb, Mar
and Aug target). These three do not, and should be checked before the figures
are quoted outside the meeting:

- **July actual** — the team rows sum to £670,538, the board total row reads £609,584.
- **T1 January and February** — under the glare, imputed at T1's own monthly mean of £23,201.
- **January, April and May targets** — out by £5,500, £6,000 and £3,294.

The year-to-date total of £5,880,571 therefore carries roughly £60k of
uncertainty, or 2% of the remaining gap to £9m.

## One thing to fix on the board itself

The board currently carries three different annual targets. The weekly target
line (£350,604) annualises to £18.2m. The monthly targets average £947,225,
which annualises to £11.4m. The goal is £9m. Worth settling on one number.
