const pptxgen = require('pptxgenjs');

// ---- palette, validated for colour-vision separation ----
const INK='14201E', DARK='10201E', PANEL='1B2E2C', PANEL_L='24403D';
const PAPER='FFFFFF', SOFT='EEF1F0', RULE='D5DCDA', MUTED='6B7A77', INK2='43524F';
const TEAL='07717A', TEAL_LT='0E8A94';
const SHORT='AD2340', ROSE='E4697E', GOLD='B58A00', GOLD_LT='D2A017';
const PAPER_D='E7EEEC', MUTED_D='8FA3A0';
const H='Cambria', B='Calibri', M='Courier New';

const p = new pptxgen();
p.layout='LAYOUT_WIDE';
p.author='Crawford & CO Surveyors';
p.title='Year to Date and the Road to £9m';
const SW=13.333, SH=7.5, MGN=0.6;

// ---- every figure below is derived in ytd-data.js and per-team-figures.js ----
const Q1A=2138151, Q1T=2827351, Q2A=2335446, Q2T=2546143;
const JULAUG=1158191, JULAUGT=2198807;
const SEPT_W1=246274, SEPT_W2=123596, SEPT_MTD=369870;
const YTD=6001658, GOAL=9000000, NEED=2998342, RUNRATE=703974, REQD=825990;
const SEPT_LEFT=456120, BEST=847980;
const MONTHS=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug'];
const MACT=[570473,790918,776760,822638,664828,847980,670838,487353];
const MTGT=[811320,942513,1073518,829994,848657,867492,1003840,1194967];
const f=n=>'£'+Math.round(n).toLocaleString('en-GB');
const fm=n=>'£'+(n/1e6).toFixed(2)+'m';

function head(s, eyebrow, title, takeaway, onDark){
  s.addText(eyebrow,{x:MGN,y:0.4,w:11,h:0.25,isTextBox:true,margin:0,
    fontFace:M,fontSize:11,bold:true,charSpacing:2,color:onDark?MUTED_D:MUTED});
  s.addText(title,{x:MGN,y:0.7,w:11.4,h:0.72,isTextBox:true,margin:0,
    fontFace:H,fontSize:32,bold:true,color:onDark?PAPER_D:INK});
  if(takeaway) s.addText(takeaway,{x:MGN,y:1.46,w:11.6,h:0.64,isTextBox:true,margin:0,
    fontFace:B,fontSize:15,color:onDark?MUTED_D:INK2});
}
function statCard(s,x,y,w,h,label,value,note,opt={}){
  s.addShape(p.ShapeType.rect,{x,y,w,h,
    fill:{color:opt.dark?PANEL:SOFT},line:{color:opt.dark?PANEL_L:RULE,width:1}});
  s.addText(label,{x:x+0.28,y:y+0.2,w:w-0.5,h:0.25,isTextBox:true,margin:0,
    fontFace:M,fontSize:10.5,bold:true,charSpacing:1.5,color:opt.dark?MUTED_D:MUTED});
  s.addText(value,{x:x+0.28,y:y+0.5,w:w-0.45,h:0.66,isTextBox:true,margin:0,
    fontFace:H,fontSize:opt.big||31,bold:true,color:opt.vc||(opt.dark?PAPER_D:INK)});
  if(note) s.addText(note,{x:x+0.28,y:y+1.18,w:w-0.5,h:h-1.34,isTextBox:true,margin:0,
    fontFace:B,fontSize:12,color:opt.dark?MUTED_D:INK2});
}
// the board's own team codes, set as ledger chips - the deck's one motif
function teamChip(s,code,x,y,fill){
  s.addShape(p.ShapeType.roundRect,{x,y,w:0.52,h:0.3,rectRadius:0.04,
    fill:{color:fill||TEAL},line:{color:fill||TEAL,width:0}});
  s.addText(code,{x,y,w:0.52,h:0.3,isTextBox:true,margin:0,
    fontFace:M,fontSize:11,bold:true,color:PAPER,align:'center',valign:'middle'});
}
const frame={showTitle:false,showLegend:false,
  catAxisLabelColor:MUTED,catAxisLabelFontFace:B,catAxisLabelFontSize:11.5,
  valAxisLabelColor:MUTED,valAxisLabelFontFace:B,valAxisLabelFontSize:11,
  valGridLine:{color:RULE,size:1},catGridLine:{style:'none'},
  catAxisLineShow:false,valAxisLineShow:false,
  dataLabelFontFace:B,dataLabelFontSize:11,dataLabelColor:INK,showValue:true};

// =====================================================================
// 1  TITLE
// =====================================================================
let s=p.addSlide(); s.background={color:DARK};
s.addText('CRAWFORD & CO SURVEYORS   ·   2026 YEAR TO DATE',{x:MGN,y:0.62,w:11,h:0.3,isTextBox:true,margin:0,
  fontFace:M,fontSize:12,bold:true,charSpacing:2,color:MUTED_D});
s.addText('The Road to £9 Million',{x:MGN,y:1.08,w:11.5,h:1.0,isTextBox:true,margin:0,
  fontFace:H,fontSize:48,bold:true,color:PAPER_D});
s.addText('September week by week  ·  the year month by month  ·  what the rest of 2026 has to deliver',
  {x:MGN,y:2.12,w:11.8,h:0.6,isTextBox:true,margin:0,fontFace:B,fontSize:16,color:MUTED_D});
statCard(s,MGN,3.05,3.9,1.95,'INVOICED YEAR TO DATE',fm(YTD),'to 11 September — 67% of the way',{dark:true,big:34});
statCard(s,MGN+4.12,3.05,3.9,1.95,'THE GOAL','£9.00m','by 31 December 2026',{dark:true,big:34});
statCard(s,MGN+8.24,3.05,3.9,1.95,'STILL TO INVOICE',fm(NEED),'over the 3.6 months remaining',{dark:true,big:34,vc:GOLD_LT});
s.addText('Provisional — figures are transcribed from the fee board and should be confirmed against the accounts system before circulation.',
  {x:MGN,y:6.55,w:11.8,h:0.35,isTextBox:true,margin:0,fontFace:B,fontSize:11,italic:true,color:MUTED_D});
s.addNotes(`Good morning. <break time="0.7s"/> Where we stand, <break time="0.4s"/> and what it takes to finish at nine million. <break time="0.9s"/> Six million invoiced to the eleventh of September. <break time="0.6s"/> Two thirds of the way. <break time="0.7s"/> Three million still to go. <break time="0.9s"/>`);

// =====================================================================
// 2  THE YEAR, MONTH BY MONTH
// =====================================================================
s=p.addSlide();
head(s,'THE YEAR SO FAR  ·  JANUARY TO AUGUST','The year month by month',
  'Q1 was the slow start, Q2 the recovery, and Q3 the weakest stretch of the year. August was the lowest month at £487,353.');
s.addChart(p.ChartType.bar,[
  {name:'Invoiced',labels:MONTHS,values:MACT},
  {name:'Target',  labels:MONTHS,values:MTGT},
],{...frame,x:MGN,y:2.25,w:8.4,h:4.35,barDir:'col',barGrouping:'clustered',barGapWidthPct:45,
  chartColors:[TEAL,RULE],showLegend:true,legendPos:'b',legendFontFace:B,legendFontSize:11.5,legendColor:MUTED,
  showValue:false,valAxisLabelFormatCode:'£#,##0',valAxisMaxVal:1300000});
statCard(s,9.35,2.25,3.38,1.36,'Q1  JAN–MAR','75.6%',null,{big:26,vc:SHORT});
statCard(s,9.35,3.75,3.38,1.36,'Q2  APR–JUN','91.7%',null,{big:26,vc:TEAL});
statCard(s,9.35,5.25,3.38,1.36,'Q3  JUL–AUG','52.7%',null,{big:26,vc:SHORT});
s.addText('Against target. Every month has been behind — never by less than £7,356, never by more than £707,614.',
  {x:MGN,y:6.68,w:12.13,h:0.35,isTextBox:true,margin:0,fontFace:B,fontSize:11,italic:true,color:MUTED});
s.addNotes(`The year, <break time="0.3s"/> month by month. <break time="0.8s"/> Quarter one was seventy six per cent. <break time="0.5s"/> Quarter two recovered to ninety two. <break time="0.6s"/> July and August fell to fifty three. <break time="0.9s"/> Every single month has been behind target. <break time="0.7s"/> August was our worst at four hundred and eighty seven thousand. <break time="0.9s"/>`);

// =====================================================================
// 3  SEPTEMBER, WEEK BY WEEK
// =====================================================================
s=p.addSlide();
head(s,'THIS MONTH  ·  SEPTEMBER WEEK BY WEEK','September is going backwards',
  'Week 2 came in at £123,596 — exactly half of week 1. Two weeks in, we are 45% of the way to the month we need.');
s.addChart(p.ChartType.bar,[
  {name:'Invoiced',        labels:['Wk 1\n1–4 Sep','Wk 2\n7–11 Sep','Wk 3\n14–18 Sep','Wk 4\n21–25 Sep'],
   values:[SEPT_W1,SEPT_W2,null,null]},
  {name:'Still to invoice',labels:['Wk 1\n1–4 Sep','Wk 2\n7–11 Sep','Wk 3\n14–18 Sep','Wk 4\n21–25 Sep'],
   values:[null,null,228060,228060]},
],{...frame,x:MGN,y:2.4,w:8.4,h:4.2,barDir:'col',barGrouping:'stacked',barGapWidthPct:50,
  chartColors:[TEAL,GOLD],showLegend:true,legendPos:'b',legendFontFace:B,legendFontSize:11.5,legendColor:MUTED,
  dataLabelPosition:'ctr',dataLabelFormatCode:'£#,##0',dataLabelColor:PAPER,dataLabelFontSize:11,
  valAxisLabelFormatCode:'£#,##0',valAxisMaxVal:280000});
statCard(s,9.35,2.4,3.38,1.32,'BANKED SO FAR',f(SEPT_MTD),null,{big:25,vc:TEAL});
statCard(s,9.35,3.86,3.38,1.32,'SEPTEMBER NEEDS',f(REQD),null,{big:25});
statCard(s,9.35,5.32,3.38,1.32,'LEFT TO FIND',f(SEPT_LEFT),null,{big:25,vc:SHORT});
s.addText('Weeks 3 and 4 each need £228,060 — nearly double what we invoiced last week. 28–30 September is headroom on top.',
  {x:MGN,y:6.72,w:12.13,h:0.35,isTextBox:true,margin:0,fontFace:B,fontSize:11,italic:true,color:MUTED});
s.addNotes(`Now this month, <break time="0.3s"/> week by week. <break time="0.8s"/> Week one, <break time="0.3s"/> two hundred and forty six thousand. <break time="0.6s"/> Week two, <break time="0.3s"/> one hundred and twenty four. <break time="0.7s"/> Exactly half. <break time="0.9s"/> We need eight hundred and twenty six thousand this month, <break time="0.5s"/> and we have three hundred and seventy. <break time="0.7s"/> Weeks three and four each need two hundred and twenty eight thousand. <break time="0.9s"/> And the fall is not spread evenly. <break time="0.5s"/> Team Six and Team Ten both halved. <break time="0.6s"/> Between them, <break time="0.3s"/> eighty four per cent of the drop. <break time="0.9s"/>`);

// =====================================================================
// 4  WHERE WE STAND
// =====================================================================
s=p.addSlide();
head(s,'WHERE WE STAND','£6.00m of £9m, with 3.6 months to go',
  'Two thirds of the goal banked, with roughly thirty per cent of the year left to run.');
const TX=MGN, TW=12.13, TH=1.15, r=YTD/GOAL;
s.addShape(p.ShapeType.rect,{x:TX,y:2.5,w:TW,h:TH,fill:{color:SOFT},line:{color:RULE,width:1}});
s.addShape(p.ShapeType.rect,{x:TX,y:2.5,w:TW*r,h:TH,fill:{color:TEAL},line:{color:TEAL,width:0}});
s.addText('INVOICED  '+fm(YTD),{x:TX+0.28,y:2.5,w:5,h:TH,isTextBox:true,margin:0,
  fontFace:M,fontSize:16,bold:true,color:PAPER,valign:'middle'});
s.addText('STILL TO INVOICE  '+fm(NEED),{x:TX+TW*r+0.28,y:2.5,w:3.8,h:TH,isTextBox:true,margin:0,
  fontFace:M,fontSize:15,bold:true,color:GOLD,valign:'middle'});
s.addText('66.7%',{x:TX,y:3.75,w:2,h:0.35,isTextBox:true,margin:0,fontFace:B,fontSize:14,bold:true,color:TEAL});
s.addText('£9m',{x:TX+TW-1.2,y:3.75,w:1.2,h:0.35,isTextBox:true,margin:0,
  fontFace:B,fontSize:14,bold:true,color:MUTED,align:'right'});
statCard(s,MGN,4.4,3.9,2.0,'JAN–AUG RUN RATE',f(RUNRATE),'invoiced per month, on average',{big:29});
statCard(s,MGN+4.12,4.4,3.9,2.0,'RUN RATE NEEDED',f(REQD),'per month, every month, to 31 December',{big:29,vc:GOLD});
statCard(s,MGN+8.24,4.4,3.9,2.0,'THE UPLIFT','+17%','on what we have averaged all year',{big:29,vc:GOLD});
s.addNotes(`So the position. <break time="0.6s"/> Six million banked, <break time="0.4s"/> three million to go. <break time="0.8s"/> We have averaged seven hundred and four thousand a month. <break time="0.6s"/> We need eight hundred and twenty six. <break time="0.8s"/> A seventeen per cent uplift. <break time="0.5s"/> Not a different business. <break time="0.4s"/> Seventeen per cent. <break time="0.9s"/>`);

// =====================================================================
// 5  WHAT EACH TEAM LEAD OWNS
// =====================================================================
s=p.addSlide();
head(s,'FOR EACH TEAM LEAD','Your number for October, November and December',
  'The same lift for everyone — 17.3% on what your team has averaged all year. Find your line; that is your number.');
const leads=[
  {id:'T6', who:'NR, EB, BF',  pct:98,  q4:373599, act:'45% of everything we invoice. Protect the run rate and flag capacity limits early'},
  {id:'T10',who:'GA',          pct:68,  q4:142625, act:'£499,308 behind for the year — the biggest gap on the board to close'},
  {id:'T3', who:'EP, CW, AL',  pct:114, q4:115688, act:'The only team ahead for the year. Hold it, and tell the rest of us what is working'},
  {id:'T5', who:'HH',          pct:65,  q4:55134,  act:'£211,871 behind. Convert what is already in the pipeline'},
  {id:'T9', who:'JW',          pct:78,  q4:34290,  act:'Steady all year. Clear the August carry-over and lift the weekly rate'},
  {id:'T8', who:'KG',          pct:72,  q4:31137,  act:'£86,121 behind. Review instruction volume against surveyor availability'},
  {id:'T1', who:'KP',          pct:81,  q4:26807,  act:'Posted −£393 last week. Find out what reversed and keep the weekly discipline'},
  {id:'T2', who:'JW',          pct:28,  q4:21550,  act:'28% for the year — our biggest concern, though last week was its best in months'},
  {id:'T4', who:'unallocated', pct:39,  q4:18653,  act:'No lead on the board and nothing invoiced since June. Ownership to be resolved'},
  {id:'T7', who:'JM',          pct:58,  q4:6506,   act:'Smallest line. Confirm what is booked for the rest of the year'},
];
const RY=2.32, RH=0.415;
s.addText('TEAM',{x:MGN,y:2.05,w:1.1,h:0.22,isTextBox:true,margin:0,fontFace:M,fontSize:9.5,bold:true,charSpacing:1.2,color:MUTED});
s.addText('LEAD',{x:MGN+1.15,y:2.05,w:1.5,h:0.22,isTextBox:true,margin:0,fontFace:M,fontSize:9.5,bold:true,charSpacing:1.2,color:MUTED});
s.addText('YTD',{x:MGN+2.72,y:2.05,w:0.8,h:0.22,isTextBox:true,margin:0,fontFace:M,fontSize:9.5,bold:true,charSpacing:1.2,color:MUTED,align:'right'});
s.addText('EACH MONTH, OCT–DEC',{x:MGN+3.6,y:2.05,w:1.85,h:0.22,isTextBox:true,margin:0,fontFace:M,fontSize:9.5,bold:true,charSpacing:1.2,color:MUTED,align:'right'});
s.addText('WHAT YOU OWN',{x:MGN+5.72,y:2.05,w:6.4,h:0.22,isTextBox:true,margin:0,fontFace:M,fontSize:9.5,bold:true,charSpacing:1.2,color:MUTED});
leads.forEach((L,i)=>{
  const y=RY+i*RH;
  if(i%2===0) s.addShape(p.ShapeType.rect,{x:MGN,y,w:12.13,h:RH,fill:{color:SOFT},line:{color:SOFT,width:0}});
  teamChip(s,L.id,MGN+0.1,y+0.06);
  s.addText(L.who,{x:MGN+1.15,y,w:1.5,h:RH,isTextBox:true,margin:0,fontFace:B,fontSize:12,color:INK2,valign:'middle'});
  s.addText(L.pct+'%',{x:MGN+2.72,y,w:0.8,h:RH,isTextBox:true,margin:0,fontFace:M,fontSize:12,bold:true,
    align:'right',valign:'middle',color:L.pct>=100?TEAL:(L.pct>=70?INK:SHORT)});
  s.addText(f(L.q4),{x:MGN+3.6,y,w:1.85,h:RH,isTextBox:true,margin:0,fontFace:M,fontSize:12.5,bold:true,
    color:GOLD,align:'right',valign:'middle'});
  s.addText(L.act,{x:MGN+5.72,y,w:6.4,h:RH,isTextBox:true,margin:0,fontFace:B,fontSize:11.5,color:INK2,valign:'middle'});
});
s.addText('The ten monthly figures add to £825,990 — the practice number. YTD % is invoiced fees against each team’s own year-to-date target.',
  {x:MGN,y:6.62,w:12.13,h:0.35,isTextBox:true,margin:0,fontFace:B,fontSize:11,italic:true,color:MUTED});
s.addNotes(`Now, specifically. <break time="0.7s"/> Your number for October, November and December is here. <break time="0.8s"/> The same lift for everyone. <break time="0.5s"/> Seventeen per cent. <break time="0.8s"/> Find your line. <break time="0.6s"/> That is your number. <break time="0.9s"/>`);

// =====================================================================
// 6  RECOMMENDATIONS
// =====================================================================
s=p.addSlide();
head(s,'RECOMMENDATIONS','Six changes that would move the number',
  'Three fix how we measure, three fix how we sell and deliver. The first one is free and would take an afternoon.');
const recs=[
  ['1','Settle on one annual target','The board carries three. The weekly line annualises to £18.2m, the monthly targets to £11.4m, and the goal is £9m. Teams are being marked against whichever is nearest.'],
  ['2','Invoice weekly, not in batches','Week 1 was £246k, week 2 £124k. Swings that size are an invoicing rhythm, not a delivery one. Weekly billing would smooth cash and make the board mean something.'],
  ['3','Add a forward line to the board','It records what happened. Add committed instructions and work in progress so it predicts the next four weeks instead of reporting the last one.'],
  ['4','Reduce the T6 concentration','One team is 45% of practice income. A bad quarter there is a bad quarter for everyone. Move work or grow a second team to carry it.'],
  ['5','Resolve T4 and T2','T4 has no lead and nothing since June; T2 is at 28% for the year. Between them that is £639,000 of target not being worked.'],
  ['6','Reconcile the board monthly','July is £61,254 out between the team rows and the total. Ten minutes against the accounts system each month keeps the board trustworthy.'],
];
recs.forEach((r,i)=>{
  const col=i%2, row=Math.floor(i/2);
  const x=MGN+col*6.13, y=2.3+row*1.48;
  s.addShape(p.ShapeType.rect,{x,y,w:6.0,h:1.36,fill:{color:SOFT},line:{color:RULE,width:1}});
  s.addShape(p.ShapeType.roundRect,{x:x+0.24,y:y+0.22,w:0.36,h:0.36,rectRadius:0.05,
    fill:{color:i<3?TEAL:GOLD},line:{color:i<3?TEAL:GOLD,width:0}});
  s.addText(r[0],{x:x+0.24,y:y+0.22,w:0.36,h:0.36,isTextBox:true,margin:0,
    fontFace:M,fontSize:12,bold:true,color:PAPER,align:'center',valign:'middle'});
  s.addText(r[1],{x:x+0.75,y:y+0.19,w:5.05,h:0.32,isTextBox:true,margin:0,
    fontFace:H,fontSize:15,bold:true,color:INK});
  s.addText(r[2],{x:x+0.75,y:y+0.54,w:5.05,h:0.72,isTextBox:true,margin:0,
    fontFace:B,fontSize:11,color:INK2});
});
s.addText('Teal: how we measure.   Gold: how we sell and deliver.',
  {x:MGN,y:6.72,w:12.13,h:0.35,isTextBox:true,margin:0,fontFace:B,fontSize:11,italic:true,color:MUTED});
s.addNotes(`Six recommendations. <break time="0.8s"/> The first is free. <break time="0.4s"/> We carry three different annual targets on that board. <break time="0.6s"/> Pick one. <break time="0.8s"/> Second, <break time="0.3s"/> invoice weekly. <break time="0.5s"/> A week of two hundred and forty six followed by a week of one hundred and twenty four is a billing pattern, <break time="0.4s"/> not a work pattern. <break time="0.9s"/> And third, <break time="0.4s"/> put a forward line on the board <break time="0.4s"/> so it tells us what is coming. <break time="0.9s"/> Then reduce our reliance on Team Six, <break time="0.4s"/> resolve Team Four and Team Two, <break time="0.4s"/> and reconcile the board every month. <break time="0.9s"/>`);

// =====================================================================
// 7  THE BONUS
// =====================================================================
s=p.addSlide(); s.background={color:DARK};
head(s,'IF WE BEAT IT','£5,000 each for every £200,000 over £9m',
  'For Emily, Stuart, Cassie and Megan. Nine million is the goal — everything above it is shared, and it steps up every two hundred thousand.',true);
const rungs=[['£9.2m','£5,000','£20,000'],['£9.4m','£10,000','£40,000'],
             ['£9.6m','£15,000','£60,000'],['£9.8m','£20,000','£80,000'],
             ['£10.0m','£25,000','£100,000']];
rungs.forEach((rg,i)=>{
  const last=i===4, x=MGN+i*2.47;
  s.addShape(p.ShapeType.rect,{x,y:2.55,w:2.3,h:2.45,
    fill:{color:last?GOLD:PANEL},line:{color:last?GOLD:PANEL_L,width:1}});
  s.addText(rg[0],{x:x+0.15,y:2.74,w:2.0,h:0.34,isTextBox:true,margin:0,
    fontFace:M,fontSize:14,bold:true,color:last?INK:MUTED_D,align:'center'});
  s.addText(rg[1],{x:x+0.12,y:3.18,w:2.06,h:0.72,isTextBox:true,margin:0,
    fontFace:H,fontSize:last?31:27,bold:true,color:last?INK:PAPER_D,align:'center'});
  s.addText('each',{x:x+0.15,y:3.92,w:2.0,h:0.28,isTextBox:true,margin:0,
    fontFace:B,fontSize:12,color:last?INK:MUTED_D,align:'center'});
  s.addText(rg[2]+' in total',{x:x+0.12,y:4.34,w:2.06,h:0.3,isTextBox:true,margin:0,
    fontFace:M,fontSize:11,bold:true,color:last?INK:TEAL_LT,align:'center'});
});
s.addText('Ten million means £25,000 each — £100,000 shared between the four of you, out of £1,000,000 of fee income above the goal.',
  {x:MGN,y:5.3,w:12.13,h:0.5,isTextBox:true,margin:0,fontFace:B,fontSize:15,color:PAPER_D});
s.addText('Measured on fees invoiced, not cash collected. The scheme pays 10% of everything above £9m at every rung. Payment date to be confirmed.',
  {x:MGN,y:6.45,w:12.13,h:0.45,isTextBox:true,margin:0,fontFace:B,fontSize:11,italic:true,color:MUTED_D});
s.addNotes(`Now the part worth staying for. <break time="0.8s"/> Nine million is the goal. <break time="0.5s"/> Everything above it is shared between the four of you. <break time="0.6s"/> Emily, <break time="0.25s"/> Stuart, <break time="0.25s"/> Cassie <break time="0.25s"/> and Megan. <break time="0.9s"/> For every two hundred thousand over nine million, <break time="0.5s"/> five thousand pounds each. <break time="0.8s"/> And ten million <break time="0.4s"/> is twenty five thousand each. <break time="0.7s"/> Measured on invoiced fees. <break time="0.9s"/>`);

// =====================================================================
// 8  THE STRETCH
// =====================================================================
s=p.addSlide(); s.background={color:DARK};
head(s,'THE STRETCH','What ten million actually takes',
  'It is one million above the goal. Here is the size of it, honestly, so we go after it with our eyes open.',true);
statCard(s,MGN,2.55,3.9,2.1,'PER MONTH FOR £9M',f(REQD),'a 17% uplift on our year average',{dark:true,big:30,vc:PAPER_D});
statCard(s,MGN+4.12,2.55,3.9,2.1,'PER MONTH FOR £10M','£1,101,472','a 56% uplift — and 30% above our best month',{dark:true,big:30,vc:GOLD_LT});
statCard(s,MGN+8.24,2.55,3.9,2.1,'THE PRIZE','£25,000','each for Emily, Stuart, Cassie and Megan',{dark:true,big:30,vc:GOLD_LT});
const asks=[
  'September has to turn this week — two weeks in, we are 45% of the month we need',
  'July and August ran at 53% of target. Q4 cannot look like that',
  'T6 and T3 carry the practice. Their capacity is the ceiling on all of this',
];
asks.forEach((a,i)=>{
  s.addShape(p.ShapeType.rect,{x:MGN,y:5.05+i*0.62,w:12.13,h:0.54,fill:{color:PANEL},line:{color:PANEL_L,width:1}});
  s.addText(a,{x:MGN+0.3,y:5.05+i*0.62,w:11.5,h:0.54,isTextBox:true,margin:0,
    fontFace:B,fontSize:13.5,color:PAPER_D,valign:'middle'});
});
s.addNotes(`Let us be straight about ten million. <break time="0.7s"/> Nine million needs seventeen per cent. <break time="0.6s"/> Ten million needs fifty six. <break time="0.8s"/> It is a stretch. <break time="0.4s"/> It is not impossible. <break time="0.7s"/> But it starts with turning this week around. <break time="0.8s"/> Nine million is the commitment. <break time="0.5s"/> Ten million is the prize. <break time="0.5s"/> Thank you.`);

p.writeFile({fileName:'ytd-road-to-9m.pptx'}).then(x=>console.log('wrote',x));
