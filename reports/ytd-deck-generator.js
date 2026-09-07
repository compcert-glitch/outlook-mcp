const pptxgen = require('pptxgenjs');

// ---- palette carried over from the Week 1 deck ----
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

// ---- the figures, all derived in ytd.js ----
const Q1A=2094578, Q1T=2832851, Q2A=2335426, Q2T=2546143;
const JULAUG=1157891, JULAUGT=2198809, SEPT=246274, T1FILL=46402;
const YTD=5880571, GOAL=9000000, NEED=3119429, RUNRATE=704287, REQD=820902;
const BEST=847980;
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
  s.addText(label,{x:x+0.28,y:y+0.22,w:w-0.5,h:0.25,isTextBox:true,margin:0,
    fontFace:M,fontSize:10.5,bold:true,charSpacing:1.5,color:opt.dark?MUTED_D:MUTED});
  s.addText(value,{x:x+0.28,y:y+0.52,w:w-0.45,h:0.66,isTextBox:true,margin:0,
    fontFace:H,fontSize:opt.big||31,bold:true,color:opt.vc||(opt.dark?PAPER_D:INK)});
  if(note) s.addText(note,{x:x+0.28,y:y+1.2,w:w-0.5,h:h-1.38,isTextBox:true,margin:0,
    fontFace:B,fontSize:12,color:opt.dark?MUTED_D:INK2});
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
s.addText('Quarter one and quarter two reviewed  ·  one month of quarter three left  ·  what the rest of the year must deliver',
  {x:MGN,y:2.12,w:11.8,h:0.6,isTextBox:true,margin:0,fontFace:B,fontSize:16,color:MUTED_D});

statCard(s,MGN,3.05,3.9,1.95,'INVOICED YEAR TO DATE',fm(YTD),'to 6 September — 65% of the way',{dark:true,big:34});
statCard(s,MGN+4.12,3.05,3.9,1.95,'THE GOAL','£9.00m','by 31 December 2026',{dark:true,big:34});
statCard(s,MGN+8.24,3.05,3.9,1.95,'STILL TO INVOICE',fm(NEED),'over the remaining 3.8 months',{dark:true,big:34,vc:GOLD_LT});
s.addText('Provisional — year-to-date figures are transcribed from the fee board and should be confirmed against the accounts system before circulation.',
  {x:MGN,y:6.55,w:11.8,h:0.35,isTextBox:true,margin:0,fontFace:B,fontSize:11,italic:true,color:MUTED_D});
s.addNotes(`Good morning. <break time="0.7s"/> This is where we stand for the year, <break time="0.4s"/> and what it takes to finish at nine million. <break time="0.9s"/> Five point eight eight million invoiced to the sixth of September. <break time="0.6s"/> Sixty five per cent of the way. <break time="0.7s"/> Three point one two million still to go. <break time="0.9s"/>`);

// =====================================================================
// 2  Q1
// =====================================================================
s=p.addSlide();
head(s,'QUARTER ONE  ·  JANUARY TO MARCH','A slow start',
  'Q1 finished £738,273 behind target. It is the deepest hole we dug all year, and it still shapes the year-end position.');
s.addChart(p.ChartType.bar,[
  {name:'Invoiced',labels:['January','February','March'],values:[570657,793563,776760]},
  {name:'Target',  labels:['January','February','March'],values:[816820,942513,1073518]},
],{...frame,x:MGN,y:2.25,w:8.4,h:4.35,barDir:'col',barGrouping:'clustered',barGapWidthPct:55,
  chartColors:[TEAL,RULE],showLegend:true,legendPos:'b',legendFontFace:B,legendFontSize:11.5,legendColor:MUTED,
  dataLabelPosition:'outEnd',dataLabelFormatCode:'£#,##0',valAxisLabelFormatCode:'£#,##0',valAxisMaxVal:1200000});
statCard(s,9.35,2.25,3.38,1.5,'Q1 INVOICED',fm(Q1A),null,{big:28});
statCard(s,9.35,3.9,3.38,1.5,'Q1 TARGET',fm(Q1T),null,{big:28});
statCard(s,9.35,5.55,3.38,1.5,'ACHIEVED','73.9%',null,{big:28,vc:SHORT});
s.addNotes(`Quarter one. <break time="0.6s"/> We invoiced two point zero nine million against a target of two point eight three million. <break time="0.7s"/> Seventy four per cent. <break time="0.6s"/> Seven hundred and thirty eight thousand behind. <break time="0.8s"/> The deepest hole we dug all year. <break time="0.9s"/>`);

// =====================================================================
// 3  Q2
// =====================================================================
s=p.addSlide();
head(s,'QUARTER TWO  ·  APRIL TO JUNE','The recovery',
  'Q2 came in at 91.7% of target — a 17.8 point improvement on Q1, and April and June were both close to par.');
s.addChart(p.ChartType.bar,[
  {name:'Invoiced',labels:['April','May','June'],values:[822618,664828,847980]},
  {name:'Target',  labels:['April','May','June'],values:[823994,851951,867492]},
],{...frame,x:MGN,y:2.25,w:8.4,h:4.35,barDir:'col',barGrouping:'clustered',barGapWidthPct:55,
  chartColors:[TEAL,RULE],showLegend:true,legendPos:'b',legendFontFace:B,legendFontSize:11.5,legendColor:MUTED,
  dataLabelPosition:'outEnd',dataLabelFormatCode:'£#,##0',valAxisLabelFormatCode:'£#,##0',valAxisMaxVal:1000000});
statCard(s,9.35,2.25,3.38,1.5,'Q2 INVOICED',fm(Q2A),null,{big:28});
statCard(s,9.35,3.9,3.38,1.5,'Q2 TARGET',fm(Q2T),null,{big:28});
statCard(s,9.35,5.55,3.38,1.5,'ACHIEVED','91.7%',null,{big:28,vc:TEAL});
s.addNotes(`Quarter two was much better. <break time="0.6s"/> Two point three four million against two point five five. <break time="0.6s"/> Ninety two per cent. <break time="0.7s"/> April was within two thousand pounds of target, <break time="0.4s"/> and June was our best month of the year at eight hundred and forty eight thousand. <break time="0.9s"/>`);

// =====================================================================
// 4  THE YEAR SO FAR
// =====================================================================
s=p.addSlide();
head(s,'THE YEAR SO FAR','Eight months, quarter by quarter',
  'Q2 nearly held par. Q3 has been the weakest stretch of the year — July and August together came in at 53% of target.');
s.addChart(p.ChartType.bar,[
  {name:'Invoiced',labels:['Q1  Jan–Mar','Q2  Apr–Jun','Q3  Jul–Aug + Sep to date'],values:[Q1A,Q2A,JULAUG+SEPT]},
  {name:'Target',  labels:['Q1  Jan–Mar','Q2  Apr–Jun','Q3  Jul–Aug + Sep to date'],values:[Q1T,Q2T,JULAUGT]},
],{...frame,x:MGN,y:2.25,w:8.4,h:4.35,barDir:'col',barGrouping:'clustered',barGapWidthPct:50,
  chartColors:[TEAL,RULE],showLegend:true,legendPos:'b',legendFontFace:B,legendFontSize:11.5,legendColor:MUTED,
  dataLabelPosition:'outEnd',dataLabelFormatCode:'£#,##0',valAxisLabelFormatCode:'£#,##0',valAxisMaxVal:3200000});
statCard(s,9.35,2.25,3.38,1.5,'Q1 ACHIEVED','73.9%',null,{big:28,vc:SHORT});
statCard(s,9.35,3.9,3.38,1.5,'Q2 ACHIEVED','91.7%',null,{big:28,vc:TEAL});
statCard(s,9.35,5.55,3.38,1.5,'Q3 SO FAR','63.9%',null,{big:28,vc:SHORT});
s.addNotes(`Put the three quarters side by side. <break time="0.7s"/> Seventy four per cent, <break time="0.4s"/> then ninety two, <break time="0.4s"/> then sixty four. <break time="0.8s"/> We recovered in quarter two and then gave it back in July and August. <break time="0.7s"/> Those two months together came in at just over half of target. <break time="0.9s"/>`);

// =====================================================================
// 5  WHERE WE STAND  (progress to £9m, drawn to scale)
// =====================================================================
s=p.addSlide();
head(s,'WHERE WE STAND','£5.88m of £9m, with 3.8 months to go',
  'Sixty five per cent of the goal banked, with roughly thirty per cent of the year left to run.');
const TX=MGN, TW=12.13, TH=1.15, r=YTD/GOAL;
s.addShape(p.ShapeType.rect,{x:TX,y:2.5,w:TW,h:TH,fill:{color:SOFT},line:{color:RULE,width:1}});
s.addShape(p.ShapeType.rect,{x:TX,y:2.5,w:TW*r,h:TH,fill:{color:TEAL},line:{color:TEAL,width:0}});
s.addText('INVOICED  '+fm(YTD),{x:TX+0.28,y:2.5,w:5,h:TH,isTextBox:true,margin:0,
  fontFace:M,fontSize:16,bold:true,color:PAPER,valign:'middle'});
s.addText('STILL TO INVOICE  '+fm(NEED),{x:TX+TW*r+0.28,y:2.5,w:3.9,h:TH,isTextBox:true,margin:0,
  fontFace:M,fontSize:15,bold:true,color:GOLD,valign:'middle'});
s.addText('65.3%',{x:TX,y:3.75,w:2,h:0.35,isTextBox:true,margin:0,fontFace:B,fontSize:14,bold:true,color:TEAL});
s.addText('£9m',{x:TX+TW-1.2,y:3.75,w:1.2,h:0.35,isTextBox:true,margin:0,
  fontFace:B,fontSize:14,bold:true,color:MUTED,align:'right'});
statCard(s,MGN,4.4,3.9,2.0,'JAN–AUG RUN RATE',f(RUNRATE),'invoiced per month, on average',{big:29});
statCard(s,MGN+4.12,4.4,3.9,2.0,'RUN RATE NEEDED',f(REQD),'per month, every month, to 31 December',{big:29,vc:GOLD});
statCard(s,MGN+8.24,4.4,3.9,2.0,'THE UPLIFT','+16%','on what we have averaged all year',{big:29,vc:GOLD});
s.addNotes(`So here is the position. <break time="0.6s"/> Five point eight eight million banked, <break time="0.5s"/> three point one two million to go. <break time="0.8s"/> We have averaged seven hundred and four thousand a month. <break time="0.6s"/> We need eight hundred and twenty one thousand. <break time="0.8s"/> That is a sixteen per cent uplift. <break time="0.5s"/> Not a different business. <break time="0.4s"/> Sixteen per cent. <break time="0.9s"/>`);

// =====================================================================
// 6  SEPTEMBER
// =====================================================================
s=p.addSlide();
head(s,'THE LAST MONTH OF Q3','What September has to deliver',
  'September needs £820,902. £246,274 is already banked from week one, which leaves £574,628 across the three weeks that remain.');
s.addChart(p.ChartType.bar,[
  {name:'Already invoiced', labels:['Week 1','Week 2','Week 3','Week 4'],values:[SEPT,0,0,0]},
  {name:'Still to invoice', labels:['Week 1','Week 2','Week 3','Week 4'],values:[0,191543,191543,191542]},
],{...frame,x:MGN,y:2.4,w:8.4,h:4.2,barDir:'col',barGrouping:'stacked',barGapWidthPct:55,
  chartColors:[TEAL,GOLD],showLegend:true,legendPos:'b',legendFontFace:B,legendFontSize:11.5,legendColor:MUTED,
  dataLabelPosition:'ctr',dataLabelFormatCode:'£#,##0',dataLabelColor:PAPER,valAxisLabelFormatCode:'£#,##0',
  valAxisMaxVal:300000});
statCard(s,9.35,2.4,3.38,1.55,'SEPTEMBER NEEDS',f(REQD),null,{big:26,vc:GOLD});
statCard(s,9.35,4.1,3.38,1.35,'BANKED, WEEK 1',f(SEPT),null,{big:26,vc:TEAL});
statCard(s,9.35,5.6,3.38,1.35,'PER WEEK, W2–W4','£191,543',null,{big:26});
s.addNotes(`September is the last month of quarter three. <break time="0.7s"/> It needs eight hundred and twenty one thousand. <break time="0.6s"/> Two hundred and forty six thousand is already banked from week one. <break time="0.7s"/> That leaves five hundred and seventy five thousand across the three weeks left. <break time="0.7s"/> One hundred and ninety two thousand a week. <break time="0.6s"/> We beat that pace last week. <break time="0.9s"/>`);

// =====================================================================
// 7  THE PLAN TO £9M
// =====================================================================
s=p.addSlide();
head(s,'THE PLAN','Four months at £820,902',
  'The bar we have to clear every month from here. Our best month this year was June at £847,980 — so this is a June, four times over.');
s.addChart(p.ChartType.bar,[
  {name:'Invoiced',            labels:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
   values:[570657,793563,776760,822618,664828,847980,670538,487353,SEPT,null,null,null]},
  {name:'Required to reach £9m',labels:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
   values:[null,null,null,null,null,null,null,null,574628,REQD,REQD,REQD]},
],{...frame,x:MGN,y:2.4,w:12.13,h:3.40,barDir:'col',barGrouping:'stacked',barGapWidthPct:40,
  chartColors:[TEAL,GOLD],showLegend:true,legendPos:'b',legendFontFace:B,legendFontSize:11.5,legendColor:MUTED,
  showValue:false,valAxisLabelFormatCode:'£#,##0',valAxisMaxVal:900000});
statCard(s,MGN,5.92,3.9,1.12,'BEST MONTH SO FAR',f(BEST),null,{big:24});
statCard(s,MGN+4.12,5.92,3.9,1.12,'NEEDED EACH MONTH',f(REQD),null,{big:24,vc:GOLD});
statCard(s,MGN+8.24,5.92,3.9,1.12,'BELOW OUR BEST MONTH','£27,078',null,{big:24,vc:TEAL});
s.addNotes(`The whole year in one picture. <break time="0.7s"/> Teal is what we have invoiced. <break time="0.5s"/> Gold is what is still required. <break time="0.8s"/> Eight hundred and twenty one thousand a month, <break time="0.4s"/> for four months. <break time="0.8s"/> Our best month this year was June, <break time="0.4s"/> at eight hundred and forty eight thousand. <break time="0.7s"/> So we need a June. <break time="0.5s"/> Four times over. <break time="0.9s"/>`);

// =====================================================================
// 8  THE BONUS
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
s.addText('The scheme pays 10% of everything above £9m, at every rung. Confirm the payment date and whether the trigger is invoiced fees or cash collected before this is announced.',
  {x:MGN,y:6.45,w:12.13,h:0.45,isTextBox:true,margin:0,fontFace:B,fontSize:11,italic:true,color:MUTED_D});
s.addNotes(`Now the part worth staying for. <break time="0.8s"/> Nine million is the goal. <break time="0.5s"/> Everything above it is shared between the four of you. <break time="0.6s"/> Emily, <break time="0.25s"/> Stuart, <break time="0.25s"/> Cassie <break time="0.25s"/> and Megan. <break time="0.9s"/> For every two hundred thousand over nine million, <break time="0.5s"/> five thousand pounds each. <break time="0.8s"/> Nine point six million is fifteen thousand. <break time="0.6s"/> And ten million <break time="0.4s"/> is twenty five thousand pounds each. <break time="1s"/>`);

// =====================================================================
// 9  TEN MILLION
// =====================================================================
s=p.addSlide(); s.background={color:DARK};
head(s,'THE STRETCH','What ten million actually takes',
  'It is one million pounds above the goal. Here is the size of it, honestly, so we go after it with our eyes open.',true);
statCard(s,MGN,2.55,3.9,2.1,'PER MONTH FOR £9M',f(REQD),'a 16% uplift on our year average',{dark:true,big:30,vc:PAPER_D});
statCard(s,MGN+4.12,2.55,3.9,2.1,'PER MONTH FOR £10M','£1,084,060','a 54% uplift — and 28% above our best month',{dark:true,big:30,vc:GOLD_LT});
statCard(s,MGN+8.24,2.55,3.9,2.1,'THE PRIZE','£25,000','each for Emily, Stuart, Cassie and Megan',{dark:true,big:30,vc:GOLD_LT});
const asks=[
  'Close the Q1 habits — that quarter cost us £738,273 and we never got it back',
  'July and August ran at 53% of target. Q4 cannot look like that',
  'T6 and T3 carry the practice. Their capacity is the ceiling on all of this',
];
asks.forEach((a,i)=>{
  s.addShape(p.ShapeType.rect,{x:MGN,y:5.05+i*0.62,w:12.13,h:0.54,fill:{color:PANEL},line:{color:PANEL_L,width:1}});
  s.addText(a,{x:MGN+0.3,y:5.05+i*0.62,w:11.5,h:0.54,isTextBox:true,margin:0,
    fontFace:B,fontSize:13.5,color:PAPER_D,valign:'middle'});
});
s.addNotes(`Let us be straight about ten million. <break time="0.7s"/> Nine million needs a sixteen per cent uplift. <break time="0.6s"/> Ten million needs fifty four per cent, <break time="0.5s"/> above the best month we have had. <break time="0.8s"/> It is a stretch. <break time="0.4s"/> It is not impossible. <break time="0.7s"/> But only if quarter four looks nothing like July and August. <break time="0.8s"/> Nine million is the commitment. <break time="0.5s"/> Ten million is the prize. <break time="0.5s"/> Thank you.`);

p.writeFile({fileName:'ytd-road-to-9m.pptx'}).then(x=>console.log('wrote',x));
