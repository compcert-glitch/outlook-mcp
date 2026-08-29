# Handover — BS 7671 18th Edition Exam (CC Academy, Electricians)

**Status:** Course content and exam app are **built, tested and complete**. They are **not** published to CC Academy.
**Blocked on:** whoever picks this up needs the CC Academy platform details — this session had no connector, credentials or URL for it.
**Date:** 29 August 2026
**Built in session:** `session_01KKyTZyWw4UqkDT9GVHhsei` ("CC Academy Electricians")

---

## 1. What this is

An interactive revision and mock-exam tool for **City & Guilds 2382**, covering **BS 7671:2018 + A2:2022 + A3:2024 + A4:2026**.

It was built from a single markdown source supplied by the user (revision notes + a 152-question practice bank + answer key). That source is preserved verbatim at `source/18th-edition-exam-prep.md` — the uploaded original is otherwise ephemeral and will not survive its session.

The app has four modes:

| Mode | Behaviour |
| --- | --- |
| Timed mock exam | 60 questions sampled proportionally across all 13 topics, 2-hour countdown, **no feedback until submit**, flag-for-review, question navigator, auto-submits at 0:00 |
| Practise by topic | User picks any combination of the 13 topics; each answer marked immediately with the explanation |
| Full bank | All 152 questions in order, marked as you go |
| Revision notes | The complete notes section, 12 chapters, all 8 tables, sticky contents |

Results show score against the 60% pass mark (with the 80% target called out), a weakest-first topic breakdown, and a "review what you missed" pass. Progress, per-topic running scores and the last 25 mock attempts persist in the viewer's browser via `localStorage`.

---

## 2. Where everything is

**Repo:** `compcert-glitch/outlook-mcp`
**Branch:** `claude/cc-academy-electricians-jx3anl`
**Directory:** `courses/bs7671-18th-edition/`

```
source/18th-edition-exam-prep.md      Original supplied content, verbatim (the master source)
data/questions.json                   152 questions, structured
data/questions.csv                    Same, flat — for LMS quiz importers
build/exam-trainer-standalone.html    Complete hostable page (122 KB, single file)
build/exam-trainer.artifact.html      Same page as a Claude Artifact body (no <html>/<head> wrapper)
src/                                  Extraction + build scripts, page template
HANDOVER.md                           This file
README.md                             Build instructions
```

**Published artifact (private to the account owner):**
https://claude.ai/code/artifact/a1a8e604-8448-4a72-86e7-3c187bd8cadc

Note the repo is `outlook-mcp` — an unrelated MCP server codebase. The course lives in its own top-level `courses/` directory and touches nothing else. It is there because it is the only repository this session had access to, and the assets needed somewhere durable to live.

---

## 3. Which file to use for which destination

- **The LMS can host an HTML page / SCORM-style file upload** → `build/exam-trainer-standalone.html`. Self-contained, no build step, no server. Just upload and link.
- **The LMS has its own quiz engine and wants an import** → `data/questions.csv` (columns: `id, topic, question, option_a..option_d, correct_letter, correct_text, explanation`). Most engines map these directly; some want a per-platform header, so remap rather than re-key.
- **Anything programmatic** → `data/questions.json`.
- **Rebranding, restructuring, or a different page** → edit `src/template.html` and re-run the build (see README).

---

## 4. What still needs doing

1. **Publish to CC Academy.** The whole point. Platform, credentials and upload route are unknown to this session — the receiving session needs to supply them. Confirm first which of the formats in §3 CC Academy actually ingests, because that decides whether the standalone HTML or the CSV import is the deliverable.
2. **Decide the Q149 question** (see §5). It is the one substantive content issue.
3. **Branding.** The page is currently unbranded — no Crawford or CC Academy logo, colours or footer. If the academy has a house style, it is a CSS-token change at the top of `src/template.html` (the palette is six named tokens; there is a full light and dark set).
4. **Decide on sharing.** The artifact is private to the account owner. If it is meant to be viewable by learners via that link rather than the LMS, it must be shared explicitly from the artifact page's share menu.
5. **Completion tracking, if required.** The app currently records progress only in the learner's own browser. Nothing is reported back to any server, so the LMS cannot see who passed. If CC Academy needs completion/score reporting, that is a real piece of additional work — either a SCORM/xAPI wrapper or posting results to an endpoint — and it is not built.

---

## 5. Content caveats — read before publishing

These are inherited from the supplied source, not introduced during the build. They were deliberately left as written rather than silently changed.

- **Q149 is arithmetically inconsistent.** The question gives a ring final circuit with `r1 = 0.8Ω` and `r1 = rn = r2`, and asks for the expected line–cpc reading at a midpoint socket. The keyed answer is **A, "approximately 0.2Ω"**, and its explanation describes the value as "around a quarter of (r1+r2)". A quarter of (r1+r2) with these figures is **0.4Ω**, not 0.2Ω. Either the stated resistance, the keyed option or the explanation needs correcting. **This needs a decision from someone who owns the content** — do not publish it to learners unresolved.
- **Several answers are explicitly hedged in the source** and say so on screen: luminaire spacing bands (Q42), adiabatic k-values (Q57), main bonding minimum csa (Q85, where the table minimum of 6mm² differs from the 10mm² DNOs commonly specify on PME). The wording tells the learner to confirm against a current copy of BS 7671. That is appropriate for an open-book exam aid but means the content should be reviewed against the current standard before it carries the academy's name.
- **A4:2026 is recent.** The source states Amendment 4 was published 15 April 2026 and that the previous edition is withdrawn roughly six months later. Worth a sanity check that the dates and the new-chapter list (57 batteries, 716 PoE, 545 functional earthing, 710 medical, 81 energy efficiency) are still current at publication.
- The page carries a footer disclaimer: it is a revision companion, not a substitute for BS 7671, and learners are told to confirm figures against their own copy and check their exam centre's permitted-materials list. Keep that.

---

## 6. What has already been verified — don't redo this

Extraction and the app were both checked, not assumed:

- All **152** questions parsed out of the source with all four options intact; all 152 matched to answer-key entries; **every key entry's answer text agrees with the option letter it points at** (zero mismatches).
- Driven in a real browser (Chromium via Playwright): mock exam leaks no feedback before submission; topic practice marks immediately; deliberately answering 48 of 60 correctly reported exactly 48/60 and 80%; answering all 60 correctly reported 60/60 and 100%; auto-submit fires at 0:00 and saves the attempt; an interrupted session offers to resume after reload; the topic breakdown sums to the number of questions sat.
- Renders correctly in **all four theme states** (explicit light, explicit dark, and the un-stamped system default in both light and dark).
- No horizontal overflow at 1280, 768 or 390 px, in every view.
- The standalone build was verified separately from the artifact build.

Three defects were found and fixed during the build, recorded here so they are not reintroduced:
1. The mock sampler drew 62 questions by proportional rounding, then trimmed from the end of a topic-ordered list — which silently dropped Calculations questions from every mock. Now shuffled before trimming.
2. The top bars overflowed horizontally at 390 px.
3. The countdown opened at 119:59 instead of 120:00.

---

## 7. Technical notes and constraints

- **No dependencies.** One HTML file: inline CSS and JS, question data embedded as a JSON literal. No framework, no build required to *run* it.
- **Fonts** (Archivo, Source Serif 4, IBM Plex Mono) load from Google Fonts. They degrade to a declared fallback stack offline, so the page still works on a locked-down network — it just looks plainer.
- **Design system:** two deliberate registers — exam content in a serif (like a technical manual), app chrome and all figures in grotesque + monospace (like a test meter). Palette is cool slate neutrals, a conductor-blue accent (`#15618F` light / `#4EA3DC` dark) and copper used sparingly, with semantic green/amber/red kept separate from the accent so right/wrong never fights it. All colours are CSS custom properties defined once for light and redefined for dark — change them in one block.
- **Keyboard:** A–D or 1–4 to answer, ←/→ to move, Enter to advance, F to flag.
- **Accessibility:** visible focus states, `prefers-reduced-motion` respected, wide tables scroll inside their own containers.
- **If republishing the artifact:** publish to the *same URL* by passing `url: https://claude.ai/code/artifact/a1a8e604-8448-4a72-86e7-3c187bd8cadc`, and read it first. Publishing without that URL creates a second, separate artifact instead of updating this one.

---

## 8. Prompt for the receiving session

> Pick up the BS 7671 18th Edition exam for CC Academy. Everything is committed to the repo `compcert-glitch/outlook-mcp`, branch `claude/cc-academy-electricians-jx3anl`, under `courses/bs7671-18th-edition/`. Read `HANDOVER.md` there first — it lists the file inventory, what is already verified, and the open items.
>
> The build is finished and tested; the only outstanding work is publishing it to CC Academy, which this session had no access to. Confirm what format CC Academy ingests, then use either `build/exam-trainer-standalone.html` (a complete hostable page) or `data/questions.csv` (for its own quiz engine).
>
> Before it goes in front of learners, resolve the Q149 issue flagged in §5 of the handover — the keyed answer and its explanation are arithmetically inconsistent and need a content owner's decision.
