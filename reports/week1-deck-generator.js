const pptxgen = require('pptxgenjs');
const fs = require('fs');

// ---- palette (carried over from the written review, validated for CVD separation) ----
const INK      = '14201E';  // slate-green near-black, text on light
const DARK     = '10201E';  // dark ground for opening / closing slides
const PAPER    = 'FFFFFF';
const SOFT     = 'EEF1F0';  // pale slate ground for panels
const RULE     = 'D5DCDA';
const MUTED    = '6B7A77';
const TEAL     = '07717A';  // the practice's own figure: income invoiced
const TEAL_LT  = '0E8A94';
const TEAL_2   = '57B4BB';
const TEAL_3   = '9FD2D6';
const SHORT    = 'AD2340';  // shortfall
const GOLD     = 'B58A00';  // caution / target reference
const PAPER_D  = 'E7EEEC';  // light text on dark ground
const MUTED_D  = '8FA3A0';

const H = 'Cambria';        // headings - safe list, renders true to width
const B = 'Calibri';        // body - safe list
const M = 'Courier New';    // ledger / team codes - echoes the board itself

const p = new pptxgen();
p.layout = 'LAYOUT_WIDE';   // 13.333 x 7.5
p.author = 'Crawford & CO Surveyors';
p.title = 'Week 1 Fee Board Review';

const W = 13.333, HT = 7.5, MGN = 0.6;

// ---------- shared furniture ----------
function head(s, eyebrow, title, takeaway, onDark) {
  s.addText(eyebrow, {
    x: MGN, y: 0.4, w: 11, h: 0.25, isTextBox: true, margin: 0,
    fontFace: M, fontSize: 11, bold: true, charSpacing: 2,
    color: onDark ? MUTED_D : MUTED,
  });
  s.addText(title, {
    x: MGN, y: 0.7, w: 11.4, h: 0.72, isTextBox: true, margin: 0,
    fontFace: H, fontSize: 32, bold: true, color: onDark ? PAPER_D : INK,
  });
  if (takeaway) {
    s.addText(takeaway, {
      x: MGN, y: 1.46, w: 11.6, h: 0.46, isTextBox: true, margin: 0,
      fontFace: B, fontSize: 15, color: onDark ? MUTED_D : '43524F',
    });
  }
}

// the deck's one motif: the board's own team codes, set as ledger chips
function teamChip(s, code, x, y, fill) {
  s.addShape(p.ShapeType.roundRect, {
    x, y, w: 0.52, h: 0.3, rectRadius: 0.04,
    fill: { color: fill || TEAL }, line: { color: fill || TEAL, width: 0 },
  });
  s.addText(code, {
    x, y, w: 0.52, h: 0.3, isTextBox: true, margin: 0,
    fontFace: M, fontSize: 11, bold: true, color: PAPER, align: 'center', valign: 'middle',
  });
}

const chartFrame = {
  showTitle: false, showLegend: false,
  catAxisLabelColor: MUTED, catAxisLabelFontFace: B, catAxisLabelFontSize: 12,
  valAxisLabelColor: MUTED, valAxisLabelFontFace: B, valAxisLabelFontSize: 11,
  valGridLine: { color: RULE, size: 1 },
  catGridLine: { style: 'none' },
  catAxisLineShow: false, valAxisLineShow: false,
  dataLabelFontFace: B, dataLabelFontSize: 11, dataLabelColor: INK,
  showValue: true,
};

// =====================================================================
// 1. TITLE
// =====================================================================
let s = p.addSlide();
s.background = { color: DARK };
s.addText('CRAWFORD & CO SURVEYORS   ·   FEE BOARD', {
  x: MGN, y: 0.65, w: 11, h: 0.3, isTextBox: true, margin: 0,
  fontFace: M, fontSize: 12, bold: true, charSpacing: 2, color: MUTED_D,
});
s.addText('Week 1 Fee Board Review', {
  x: MGN, y: 1.15, w: 11.5, h: 1.0, isTextBox: true, margin: 0,
  fontFace: H, fontSize: 46, bold: true, color: PAPER_D,
});
s.addText('Ten teams  ·  four posting days  ·  managers’ meeting', {
  x: MGN, y: 2.15, w: 11.5, h: 0.4, isTextBox: true, margin: 0,
  fontFace: B, fontSize: 17, color: MUTED_D,
});

const heroes = [
  { k: 'INVOICED',  v: '£246,274', n: 'Week 1, Tuesday to Friday',   c: PAPER_D },
  { k: 'TARGET',    v: '£350,604', n: 'Company target line',          c: PAPER_D },
  { k: 'SHORTFALL', v: '−£104,330', n: '70.2% of target achieved', c: 'E4697E' },
];
heroes.forEach((h, i) => {
  const x = MGN + i * 4.06;
  s.addShape(p.ShapeType.rect, {
    x, y: 3.15, w: 3.7, h: 1.85, fill: { color: '1B2E2C' }, line: { color: '24403D', width: 1 },
  });
  s.addText(h.k, {
    x: x + 0.3, y: 3.38, w: 3.1, h: 0.25, isTextBox: true, margin: 0,
    fontFace: M, fontSize: 11, bold: true, charSpacing: 1.5, color: MUTED_D,
  });
  s.addText(h.v, {
    x: x + 0.3, y: 3.7, w: 3.2, h: 0.68, isTextBox: true, margin: 0,
    fontFace: H, fontSize: 34, bold: true, color: h.c,
  });
  s.addText(h.n, {
    x: x + 0.3, y: 4.44, w: 3.1, h: 0.4, isTextBox: true, margin: 0,
    fontFace: B, fontSize: 12, color: MUTED_D,
  });
});
s.addText('Figures transcribed from the fee board and cross-cast against its own total row. Prepared 5 September 2026.', {
  x: MGN, y: 6.5, w: 11.5, h: 0.35, isTextBox: true, margin: 0,
  fontFace: B, fontSize: 11.5, italic: true, color: MUTED_D,
});
s.addNotes(`Good morning. <break time="0.7s"/> This is the Week One fee board review. <break time="0.6s"/> Five charts, <break time="0.3s"/> four minutes. <break time="0.8s"/> The headline. <break time="0.5s"/> We invoiced two hundred and forty six thousand pounds against a target of three hundred and fifty thousand. <break time="0.7s"/> Seventy per cent of target. <break time="0.4s"/> A shortfall of one hundred and four thousand. <break time="0.9s"/>`);

// =====================================================================
// 2. WHERE THE WEEK LANDED  (progress against target, drawn to scale)
// =====================================================================
s = p.addSlide();
head(s, 'GRAPH 1  ·  THE WHOLE PRACTICE', 'Where the week landed',
     'Eight of the nine trading teams finished behind their number. One finished ahead.');

const TRK_X = MGN, TRK_W = 9.4, TRK_H = 0.82;
const ratio = 246274 / 350604;

// target track
s.addShape(p.ShapeType.rect, {
  x: TRK_X, y: 2.5, w: TRK_W, h: TRK_H, fill: { color: SOFT }, line: { color: RULE, width: 1 },
});
// invoiced, drawn to the same scale
s.addShape(p.ShapeType.rect, {
  x: TRK_X, y: 2.5, w: TRK_W * ratio, h: TRK_H, fill: { color: TEAL }, line: { color: TEAL, width: 0 },
});
s.addText('INVOICED   £246,274', {
  x: TRK_X + 0.22, y: 2.5, w: 4.2, h: TRK_H, isTextBox: true, margin: 0,
  fontFace: M, fontSize: 14, bold: true, color: PAPER, valign: 'middle',
});
s.addText('TARGET   £350,604', {
  x: TRK_X + TRK_W * ratio + 0.22, y: 2.5, w: 2.7, h: TRK_H, isTextBox: true, margin: 0,
  fontFace: M, fontSize: 14, bold: true, color: MUTED, valign: 'middle',
});
// the gap, measured on the same track
s.addShape(p.ShapeType.rect, {
  x: TRK_X + TRK_W * ratio, y: 3.5, w: TRK_W * (1 - ratio), h: 0.06,
  fill: { color: SHORT }, line: { color: SHORT, width: 0 },
});
s.addText('−£104,330 short', {
  x: TRK_X + TRK_W * ratio - 0.1, y: 3.62, w: 2.9, h: 0.35, isTextBox: true, margin: 0,
  fontFace: B, fontSize: 13, bold: true, color: SHORT,
});
s.addText('70.2%', {
  x: TRK_X, y: 3.62, w: 2.0, h: 0.35, isTextBox: true, margin: 0,
  fontFace: B, fontSize: 13, bold: true, color: TEAL,
});

s.addShape(p.ShapeType.rect, {
  x: 10.35, y: 2.5, w: 2.38, h: 2.6, fill: { color: SOFT }, line: { color: RULE, width: 1 },
});
s.addText('WATCH THIS', {
  x: 10.6, y: 2.72, w: 2.0, h: 0.25, isTextBox: true, margin: 0,
  fontFace: M, fontSize: 10.5, bold: true, charSpacing: 1.5, color: MUTED,
});
s.addText('Monday is blank on the board for every single team.', {
  x: 10.6, y: 3.05, w: 1.95, h: 0.9, isTextBox: true, margin: 0,
  fontFace: H, fontSize: 14, bold: true, color: INK,
});
s.addText('So this is a four-day week as recorded. If Monday was a working day, the position is worse than it looks.', {
  x: 10.6, y: 3.95, w: 1.95, h: 1.0, isTextBox: true, margin: 0,
  fontFace: B, fontSize: 11.5, color: '43524F',
});
s.addText('Both bars are drawn to the same scale.', {
  x: MGN, y: 6.6, w: 8, h: 0.3, isTextBox: true, margin: 0,
  fontFace: B, fontSize: 11, italic: true, color: MUTED,
});
s.addNotes(`Start with the whole practice. <break time="0.6s"/> The teal bar is what we invoiced. <break time="0.4s"/> The pale bar is target. <break time="0.7s"/> Eight of our nine trading teams finished behind. <break time="0.5s"/> One finished ahead. <break time="0.8s"/> And note this. <break time="0.4s"/> Monday is blank on the board for every team. <break time="0.6s"/> So this is a four day week as recorded. <break time="0.9s"/>`);

// =====================================================================
// 3. WHO THE GAP BELONGS TO
// =====================================================================
s = p.addSlide();
head(s, 'GRAPH 2  ·  VARIANCE BY TEAM', 'Who the gap belongs to',
     'Two teams account for 69% of the entire shortfall. This is the chart that decides how we spend today.');

const varLabels = ['T6  NR, EB, BF', 'T3  EP, CW, AL', 'T2  JW', 'T5  HH', 'T8  KG', 'T10  GA', 'T9  JW', 'T7  JM', 'T1  KP'];
const shortfall = [-89561, -38493, -20260, -12210, -9014, -8112, -6214, -6120, null];
const surplus   = [null, null, null, null, null, null, null, null, 3510];

s.addChart(p.ChartType.bar, [
  { name: 'Shortfall against target', labels: varLabels, values: shortfall },
  { name: 'Ahead of target',          labels: varLabels, values: surplus },
], {
  ...chartFrame,
  x: MGN, y: 2.05, w: 8.55, h: 4.75,
  barDir: 'bar', barGrouping: 'clustered', barGapWidthPct: 45, barOverlapPct: 100,
  chartColors: [SHORT, TEAL],
  showLegend: true, legendPos: 'b', legendFontFace: B, legendFontSize: 11.5, legendColor: MUTED,
  dataLabelPosition: 'outEnd', dataLabelFormatCode: '£#,##0;−£#,##0',
  catAxisLabelFontFace: M, catAxisLabelFontSize: 11,
  valAxisLabelFormatCode: '£#,##0;−£#,##0',
  valAxisMinVal: -100000, valAxisMaxVal: 20000,
});

s.addShape(p.ShapeType.rect, {
  x: 9.5, y: 2.05, w: 3.23, h: 2.3, fill: { color: SOFT }, line: { color: RULE, width: 1 },
});
teamChip(s, 'T6', 9.75, 2.28);
teamChip(s, 'T3', 10.37, 2.28);
s.addText('−£128,054', {
  x: 9.75, y: 2.72, w: 2.8, h: 0.6, isTextBox: true, margin: 0,
  fontFace: H, fontSize: 30, bold: true, color: SHORT,
});
s.addText('of the £186,474 measured against team targets — 69% of the whole gap.', {
  x: 9.75, y: 3.36, w: 2.75, h: 0.85, isTextBox: true, margin: 0,
  fontFace: B, fontSize: 12, color: '43524F',
});
s.addText('Close every other team’s shortfall in full, leave these two, and we are still well behind.', {
  x: 9.5, y: 4.6, w: 3.23, h: 1.0, isTextBox: true, margin: 0,
  fontFace: H, fontSize: 14, bold: true, color: INK,
});
s.addNotes(`This is the chart that matters. <break time="0.7s"/> Each team's shortfall in pounds, <break time="0.4s"/> not percentages. <break time="0.7s"/> Team Six is eighty nine thousand behind. <break time="0.5s"/> Team Three, <break time="0.3s"/> thirty eight thousand. <break time="0.7s"/> Together, <break time="0.3s"/> sixty nine per cent of the entire gap. <break time="0.9s"/> Close every other team's shortfall in full, <break time="0.5s"/> and we would still be well behind. <break time="0.7s"/> So today is mostly about Team Six and Team Three. <break time="0.9s"/>`);

// =====================================================================
// 4. HOW THE WEEK FLOWED
// =====================================================================
s = p.addSlide();
head(s, 'GRAPH 3  ·  DAILY POSTING', 'How the week flowed',
     'Thursday was 4.6 times bigger than Friday. Fees are bunching rather than flowing.');

s.addChart(p.ChartType.bar, [
  { name: 'Invoiced', labels: ['Tuesday', 'Wednesday', 'Thursday', 'Friday'], values: [78565, 31908, 111626, 24175] },
  { name: 'Daily target', labels: ['Tuesday', 'Wednesday', 'Thursday', 'Friday'], values: [87651, 88084, 90893, 89801] },
], {
  ...chartFrame,
  x: MGN, y: 2.15, w: 8.55, h: 4.6,
  barDir: 'col', barGrouping: 'clustered', barGapWidthPct: 55,
  chartColors: [TEAL, RULE],
  showLegend: true, legendPos: 'b', legendFontFace: B, legendFontSize: 11.5, legendColor: MUTED,
  dataLabelPosition: 'outEnd', dataLabelFormatCode: '£#,##0',
  valAxisLabelFormatCode: '£#,##0',
  valAxisMaxVal: 130000,
});

const flowNotes = [
  ['£111,626', 'Thursday — the one day that beat target'],
  ['£24,175',  'Friday — a quarter of the daily target'],
  ['£88,000',  'the flat daily target, roughly, every day'],
];
flowNotes.forEach((n, i) => {
  const y = 2.15 + i * 1.35;
  s.addText(n[0], {
    x: 9.5, y, w: 3.2, h: 0.45, isTextBox: true, margin: 0,
    fontFace: H, fontSize: 24, bold: true, color: i === 2 ? MUTED : (i === 0 ? TEAL : SHORT),
  });
  s.addText(n[1], {
    x: 9.5, y: y + 0.46, w: 3.2, h: 0.62, isTextBox: true, margin: 0,
    fontFace: B, fontSize: 12, color: '43524F',
  });
});
s.addText('If we are batching invoices rather than posting on completion, no single day tells us anything useful.', {
  x: 9.5, y: 6.1, w: 3.23, h: 0.8, isTextBox: true, margin: 0,
  fontFace: B, fontSize: 12, italic: true, color: MUTED,
});
s.addNotes(`Now the shape of the week. <break time="0.6s"/> Thursday, <break time="0.3s"/> one hundred and eleven thousand pounds. <break time="0.5s"/> Friday, <break time="0.3s"/> twenty four thousand. <break time="0.7s"/> Thursday was four and a half times Friday, <break time="0.5s"/> against a flat daily target of about eighty eight thousand. <break time="0.8s"/> Fees are not flowing. <break time="0.4s"/> They are bunching. <break time="0.6s"/> That may be invoicing rather than delivery. <break time="0.9s"/>`);

// =====================================================================
// 5. WHERE THE INCOME COMES FROM
// =====================================================================
s = p.addSlide();
head(s, 'GRAPH 4  ·  CONCENTRATION', 'Where the income actually comes from',
     'Three teams carry 82% of the practice’s weekly income. That is a concentration risk as much as a performance question.');

s.addChart(p.ChartType.bar, [
  { name: 'T6  NR, EB, BF',   labels: ['Week 1 income'], values: [117120] },
  { name: 'T10  GA',          labels: ['Week 1 income'], values: [58053] },
  { name: 'T3  EP, CW, AL',   labels: ['Week 1 income'], values: [26281] },
  { name: 'All six others',   labels: ['Week 1 income'], values: [44941] },
], {
  ...chartFrame,
  x: MGN, y: 2.3, w: 12.13, h: 2.1,
  barDir: 'bar', barGrouping: 'percentStacked', barGapWidthPct: 30,
  chartColors: [TEAL, TEAL_LT, TEAL_2, TEAL_3],
  showLegend: true, legendPos: 'b', legendFontFace: B, legendFontSize: 12, legendColor: INK,
  dataLabelPosition: 'ctr', dataLabelFormatCode: '0.0"%"',
  dataLabelColor: PAPER, dataLabelFontSize: 12,
  catAxisHidden: true, valAxisHidden: true, valGridLine: { style: 'none' },
});

const conc = [
  ['48%', 'of everything we invoiced this week came from Team Six alone'],
  ['82%', 'came from just three of our ten team lines'],
  ['57%', 'is how much of its own target Team Six actually hit'],
];
conc.forEach((c, i) => {
  const x = MGN + i * 4.06;
  s.addShape(p.ShapeType.rect, {
    x, y: 4.85, w: 3.7, h: 1.55, fill: { color: SOFT }, line: { color: RULE, width: 1 },
  });
  s.addText(c[0], {
    x: x + 0.3, y: 5.05, w: 3.1, h: 0.6, isTextBox: true, margin: 0,
    fontFace: H, fontSize: 34, bold: true, color: TEAL,
  });
  s.addText(c[1], {
    x: x + 0.3, y: 5.66, w: 3.15, h: 0.65, isTextBox: true, margin: 0,
    fontFace: B, fontSize: 12, color: '43524F',
  });
});
s.addText('Team Six is at once our largest earner and our largest miss — so its target is the one that most needs testing against real surveyor capacity.', {
  x: MGN, y: 6.6, w: 12.13, h: 0.35, isTextBox: true, margin: 0,
  fontFace: B, fontSize: 12.5, italic: true, color: MUTED,
});
s.addNotes(`Where the income actually comes from. <break time="0.6s"/> Team Six alone is forty eight per cent of everything we invoiced. <break time="0.6s"/> Three teams carry eighty two per cent. <break time="0.8s"/> That is a concentration risk as much as a performance question. <break time="0.6s"/> Team Six is our biggest earner and our biggest miss. <break time="0.5s"/> Is its target set against real capacity? <break time="0.9s"/>`);

// =====================================================================
// 6. WHAT WEEK 2 ASKS
// =====================================================================
s = p.addSlide();
head(s, 'GRAPH 5  ·  THE WEEK AHEAD', 'The target rises as the gap opens',
     'Week 2 asks for 20.4% more than Week 1 asked. Repeating this week leaves us a further £176,013 behind.');

s.addChart(p.ChartType.bar, [
  { name: 'Invoiced',        labels: ['Week 1', 'Week 2 if we repeat'], values: [246274, 246274] },
  { name: 'Target',          labels: ['Week 1', 'Week 2 if we repeat'], values: [350604, 422287] },
], {
  ...chartFrame,
  x: MGN, y: 2.2, w: 7.6, h: 4.4,
  barDir: 'col', barGrouping: 'clustered', barGapWidthPct: 50,
  chartColors: [TEAL, RULE],
  showLegend: true, legendPos: 'b', legendFontFace: B, legendFontSize: 11.5, legendColor: MUTED,
  dataLabelPosition: 'outEnd', dataLabelFormatCode: '£#,##0',
  valAxisLabelFormatCode: '£#,##0',
  valAxisMaxVal: 480000,
});

s.addShape(p.ShapeType.rect, {
  x: 8.5, y: 2.2, w: 4.23, h: 2.05, fill: { color: SOFT }, line: { color: RULE, width: 1 },
});
s.addText('WEEK 2 TARGET', {
  x: 8.78, y: 2.42, w: 3.7, h: 0.25, isTextBox: true, margin: 0,
  fontFace: M, fontSize: 10.5, bold: true, charSpacing: 1.5, color: MUTED,
});
s.addText('£422,287', {
  x: 8.78, y: 2.72, w: 3.7, h: 0.7, isTextBox: true, margin: 0,
  fontFace: H, fontSize: 36, bold: true, color: INK,
});
s.addText('up 20.4% on Week 1’s target', {
  x: 8.78, y: 3.44, w: 3.7, h: 0.3, isTextBox: true, margin: 0,
  fontFace: B, fontSize: 12.5, color: '43524F',
});

s.addShape(p.ShapeType.rect, {
  x: 8.5, y: 4.45, w: 4.23, h: 2.15, fill: { color: '1B2E2C' }, line: { color: '1B2E2C', width: 0 },
});
s.addText('IF WE REPEAT WEEK 1', {
  x: 8.78, y: 4.67, w: 3.7, h: 0.25, isTextBox: true, margin: 0,
  fontFace: M, fontSize: 10.5, bold: true, charSpacing: 1.5, color: MUTED_D,
});
s.addText('−£176,013', {
  x: 8.78, y: 4.97, w: 3.7, h: 0.7, isTextBox: true, margin: 0,
  fontFace: H, fontSize: 36, bold: true, color: 'E4697E',
});
s.addText('behind in Week 2 alone — roughly £280,000 across the fortnight.', {
  x: 8.78, y: 5.7, w: 3.7, h: 0.65, isTextBox: true, margin: 0,
  fontFace: B, fontSize: 12.5, color: PAPER_D,
});
s.addNotes(`Week Two. <break time="0.6s"/> The target rises to four hundred and twenty two thousand. <break time="0.5s"/> Twenty per cent up on Week One. <break time="0.8s"/> Repeat this week's performance <break time="0.4s"/> and we finish a further one hundred and seventy six thousand behind. <break time="0.7s"/> Roughly two hundred and eighty thousand across the fortnight. <break time="0.6s"/> The gap widens while we talk about it. <break time="0.9s"/>`);

// =====================================================================
// 7. QUERIES ON THE BOARD
// =====================================================================
s = p.addSlide();
head(s, 'BEFORE WE ACT', 'Three queries on the board itself',
     'These change what the numbers mean, so they are worth settling before Week 2 is written up.');

const queries = [
  ['£82,265', 'The team targets and the company target do not agree',
   'Our ten team weekly targets add up to £432,869. The company target line reads £350,604. We are currently measuring ourselves against two different numbers.'],
  ['Monday', 'Blank on every single row',
   'No income and no target is recorded for Monday anywhere on the board. If it is a non-working day it should be struck through; if it is a missing entry, the week is understated.'],
  ['£201', 'Wednesday does not cross-cast',
   'The team figures add up to £201 more than the total line. Tuesday, Thursday and Friday balance to the pound, so this is a single posting error, not a systemic one.'],
];
queries.forEach((q, i) => {
  const y = 2.25 + i * 1.5;
  s.addShape(p.ShapeType.roundRect, {
    x: MGN, y, w: 1.85, h: 1.2, rectRadius: 0.06,
    fill: { color: i === 0 ? GOLD : SOFT }, line: { color: i === 0 ? GOLD : RULE, width: 1 },
  });
  s.addText(q[0], {
    x: MGN, y, w: 1.85, h: 1.2, isTextBox: true, margin: 0,
    fontFace: H, fontSize: q[0] === 'Monday' ? 19 : 22, bold: true,
    color: i === 0 ? PAPER : INK, align: 'center', valign: 'middle',
  });
  s.addText(q[1], {
    x: 2.65, y: y + 0.08, w: 10.1, h: 0.35, isTextBox: true, margin: 0,
    fontFace: H, fontSize: 17, bold: true, color: INK,
  });
  s.addText(q[2], {
    x: 2.65, y: y + 0.46, w: 10.1, h: 0.7, isTextBox: true, margin: 0,
    fontFace: B, fontSize: 13, color: '43524F',
  });
});
s.addText('The monthly columns on the right of the board are not covered here — they should be pulled from the accounts system before anyone quotes them.', {
  x: MGN, y: 6.75, w: 12.13, h: 0.35, isTextBox: true, margin: 0,
  fontFace: B, fontSize: 11.5, italic: true, color: MUTED,
});
s.addNotes(`Three queries on the board itself. <break time="0.7s"/> One. <break time="0.4s"/> Our team targets add up to four hundred and thirty two thousand, <break time="0.4s"/> but the company line reads three hundred and fifty. <break time="0.6s"/> Eighty two thousand apart. <break time="0.7s"/> Two. <break time="0.4s"/> Monday is blank everywhere. <break time="0.6s"/> Three. <break time="0.4s"/> Wednesday is out by two hundred and one pounds. <break time="0.5s"/> The other three days balance exactly. <break time="0.9s"/>`);

// =====================================================================
// 8. ACTIONS
// =====================================================================
s = p.addSlide();
s.background = { color: DARK };
head(s, 'FOR DECISION TODAY', 'Six things to agree before we leave',
     'The first two are the ones that change the number. The rest is housekeeping.', true);

const actions = [
  ['T6', 'Review the weekly target against real surveyor capacity across NR, EB and BF — confirm it or reset it', 'MD with T6 leads'],
  ['T3', 'Pipeline review: is this instruction volume, report turnaround, or invoicing lag?', 'EP'],
  ['T7', 'Explain the position and what work is booked for the coming fortnight', 'JM'],
  ['T4', 'Decide the line’s future — retire it, reassign it, or set a target against it', 'MD'],
  ['£', 'Reconcile the team targets to the company target line and correct the board', 'Accounts'],
  ['⏱', 'Confirm whether fees post daily on completion or weekly in batch', 'Accounts'],
];
actions.forEach((a, i) => {
  const col = i % 2, row = Math.floor(i / 2);
  const x = MGN + col * 6.13, y = 2.25 + row * 1.5;
  s.addShape(p.ShapeType.rect, {
    x, y, w: 6.0, h: 1.28, fill: { color: '1B2E2C' }, line: { color: '24403D', width: 1 },
  });
  teamChip(s, a[0], x + 0.25, y + 0.22, i < 4 ? TEAL : '3A5350');
  s.addText(a[1], {
    x: x + 0.95, y: y + 0.16, w: 4.85, h: 0.7, isTextBox: true, margin: 0,
    fontFace: B, fontSize: 13, color: PAPER_D,
  });
  s.addText(a[2], {
    x: x + 0.95, y: y + 0.9, w: 4.85, h: 0.28, isTextBox: true, margin: 0,
    fontFace: M, fontSize: 11, bold: true, color: MUTED_D,
  });
});
s.addText('Week 2 closes Friday. The same board, the same six questions, next week.', {
  x: MGN, y: 6.85, w: 12.13, h: 0.35, isTextBox: true, margin: 0,
  fontFace: B, fontSize: 12, italic: true, color: MUTED_D,
});
s.addNotes(`Six actions. <break time="0.6s"/> One. <break time="0.3s"/> Review Team Six's target against real capacity. <break time="0.5s"/> Two. <break time="0.3s"/> Pipeline review for Team Three. <break time="0.5s"/> Three. <break time="0.3s"/> Team Seven to explain the position. <break time="0.5s"/> Four. <break time="0.3s"/> Decide the future of the Team Four line. <break time="0.5s"/> Five. <break time="0.3s"/> Accounts to reconcile the two target figures. <break time="0.5s"/> Six. <break time="0.3s"/> Confirm how often we post fees. <break time="0.9s"/> The first two change the number. <break time="0.5s"/> Thank you.`);

p.writeFile({ fileName: 'week1-fee-board-review.pptx' }).then(f => console.log('wrote', f));
