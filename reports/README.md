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
| `ytd-road-to-9m.pptx` | **The main deck.** Eight slides — the year month by month, September week by week, the position against £9m, what each team lead owns, six recommendations, the bonus, and what £10m takes. Alice's script is in the speaker notes. |
| `alice-script-road-to-9m.txt` | The same script standalone, for pasting into the voice tool. Approx 3m 37s. |
| `week1-fee-board-review.pptx` | The Week 1 deck — eight slides on last week's board. Approx 3m 43s. |
| `alice-presenter-script.txt` | Its presenter script. |
| `week1-fee-board-review.html` | The written Week 1 review. Open in any browser. |

## Sources you can edit

| File | What it holds |
|---|---|
| `september-weeks.js` | September's weekly figures and the week-1-to-week-2 movement per team. Each team's daily columns are cross-cast against its own weekly total. |
| `per-team-figures.js` | Each team's year-to-date position and its Oct–Dec monthly number. `node reports/per-team-figures.js` prints the table behind the team-lead slide. |
| `ytd-data.js` | The monthly transcription, the reconciliation against the board's own total row, the run-rate arithmetic, and the bonus ladder. `node reports/ytd-data.js` prints the lot. |
| `week1-fee-board-data.js` | The Week 1 daily transcription and its cross-cast against the board's total row. |
| `ytd-deck-generator.js` | Builds the year-to-date deck. Figures are constants at the top; the script lives in the `addNotes()` blocks. |
| `week1-deck-generator.js` | Builds the Week 1 deck. |
| `make-presenter-script.js` | Turns a generator's speaker notes into the standalone script file, and times it. |
| `check-slide-geometry.py` | Checks a deck for text overflow, overlaps, out-of-bounds shapes and tight margins. |
| `render-slides.py` + `shoot-slides.mjs` | Turns a deck into one JPEG per slide, at 1920×1080. `build.sh` runs both into `reports/jpegs/`. |

To change a figure, edit it in the `*-data.js` or at the top of the generator,
then run `./reports/build.sh`. The decks, the speaker notes and the standalone
scripts all regenerate together, so they cannot drift apart.

## Slide images

`./reports/build.sh` writes one JPEG per slide into `reports/jpegs/`. The
renderer reads the real shape tree with python-pptx and screenshots it through
Chromium, because LibreOffice cannot open .pptx in every environment. Office
fonts are substituted with the metric-compatible Liberation family, so the
images are a close likeness rather than a pixel-exact copy of PowerPoint.

## How the board is read

The M–F columns are the **current week**; W1 to W4 are that month's **weekly
totals**; the block on the right is the year **month by month**. Confirmed on the
11 September photograph: every team's daily columns sum to its own weekly total,
and the company row's daily columns sum to £123,597 against a written W2 of
£123,596.

The deck follows that shape — September week by week, the rest of the year month
by month.

## What each team lead owns

Slide 5 gives every lead their own monthly number for October to December. The
split applies the **same 17.3% lift to every team's Jan–Aug average**, so the ten
figures add to exactly £825,990 — the practice number. Nobody is asked for a
bigger proportional lift than anyone else.

Against their own year-to-date targets, T3 (EP, CW, AL) is the only team
**ahead** at 114%, and T6 (NR, EB, BF) is at 98%. The teams genuinely behind for
the year are T2 (28%), T4 (39%), T7 (58%), T5 (65%) and T10 (68%).

## The bonus scheme

Emily, Stuart, Cassie and Megan. **£5,000 each for every £200,000 of invoiced
fees above £9m** — so £25,000 each and £100,000 in total at £10m. That is 10%
of the excess at every rung.

Measured on **fees invoiced, not cash collected**. The payment date is still to
be confirmed.

## Recommendations on the deck

Slide 6 carries six, three on how the practice measures and three on how it
sells and delivers: settle on one annual target, invoice weekly rather than in
batches, add a forward line to the board, reduce the T6 concentration, resolve
T4 and T2, and reconcile the board monthly.

## Confidence in the figures

**Week 1 daily figures — high.** Tuesday, Thursday and Friday sum exactly to the
board's own total line; Wednesday differs by £201. Two figures were recovered
arithmetically where the handwriting was unclear — T6 Tuesday (£31,221) and
T10 Thursday (£35,846).

**September weekly figures — high.** On the 11 September photograph every team's
daily columns reconcile to its own weekly total (eight of ten to the pound, two
within £50), and the company row reconciles to £1.

**Monthly figures — good, with one exception.** The clearer photograph resolved
the glare, so T1's January and February are now read directly rather than
imputed, and January's target now reconciles exactly. Of the twelve monthly
totals checkable against the board's own total row, eight now reconcile to
within £4. One material gap remains:

- **July actual** — the team rows sum to £670,838, the board total row reads
  £609,584, a difference of £61,254. Worth resolving before the year-to-date
  figure is quoted outside the meeting.

Three target columns are also slightly out (April £6,000, May £3,294, July
£1,156). The year-to-date total of £6,001,658 carries roughly £60k of
uncertainty, or 2% of the remaining gap to £9m.

## One thing to fix on the board itself

The board currently carries three different annual targets. The weekly target
line (£350,604) annualises to £18.2m. The monthly targets average £947,225,
which annualises to £11.4m. The goal is £9m. Worth settling on one number.
