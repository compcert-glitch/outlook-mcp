// Monthly block, Jan-Aug 2026, transcribed from the fee board photograph.
// CONFIDENCE: LOW. The monthly half of the board is written at two heights per team
// and the top-left is under camera glare. Flagged figures are marked below.
const teams = {
  T1:  { who:'KP',         act:[null,null,22813,20218,26364,24122,25935,19754],      tgt:[28323,31726,42673,28204,28204,28204,24000,23033] },
  T2:  { who:'JW',         act:[25063,-394,0,-394,0,1430,51600,69630],               tgt:[52050,65804,132002,55237,56341,57468,103000,128700] },
  T3:  { who:'EP, CW, AL', act:[86715,113626,90955,128827,99494,129822,65148,73899], tgt:[71624,72606,35145,76008,77529,79079,138252,174654] },
  T4:  { who:'unassigned', act:[18945,59710,23571,18055,10022,-3125,0,0],             tgt:[52285,70447,79108,41667,41667,41667,0,0] },
  T5:  { who:'HH',         act:[38060,35542,61050,34633,59241,39132,68023,40238],    tgt:[79435,88120,134029,60000,60000,60000,62918,60366] },
  T6:  { who:'NR, EB, BF', act:[238748,323393,355952,401833,329050,476540,239475,182275], tgt:[284966,310894,288535,301878,307916,314074,432000,529763] },
  T7:  { who:'JM',         act:[2904,6352,5793,4756,7048,12620,2908,1980],           tgt:[5390,6795,6623,12000,12000,12000,11000,11046] },
  T8:  { who:'KG',         act:[30308,45515,54721,23413,29000,4368,11806,13171],     tgt:[35289,38825,29468,45000,45000,45000,30670,40102] },
  T9:  { who:'JW',         act:[16908,20688,21225,36402,45494,31241,35225,26611],    tgt:[15370,14420,7913,50000,60000,70000,52000,56887] },
  T10: { who:'GA',         act:[89805,165930,140680,154875,59115,131830,170418,59795], tgt:[192088,242876,318022,160000,160000,160000,150000,170418] },
};
const MONTHS=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug'];
const SEPT_TO_DATE = 246274;             // Week 1 of September, verified against the board's own total row
const f = n => '£'+Math.round(n).toLocaleString('en-GB');

const monthAct = MONTHS.map((_,i)=>Object.values(teams).reduce((s,t)=>s+(t.act[i]??0),0));
const monthTgt = MONTHS.map((_,i)=>Object.values(teams).reduce((s,t)=>s+(t.tgt[i]??0),0));
console.log('month   actual        target        var');
MONTHS.forEach((m,i)=>console.log(`${m}   ${f(monthAct[i]).padStart(11)}  ${f(monthTgt[i]).padStart(11)}  ${f(monthAct[i]-monthTgt[i]).padStart(11)}`));

const sum=(a,s,e)=>a.slice(s,e).reduce((x,y)=>x+y,0);
const q1a=sum(monthAct,0,3), q2a=sum(monthAct,3,6), julAug=sum(monthAct,6,8);
const q1t=sum(monthTgt,0,3), q2t=sum(monthTgt,3,6), julAugT=sum(monthTgt,6,8);
const ytd = q1a+q2a+julAug+SEPT_TO_DATE;
console.log('\nQ1 actual', f(q1a), ' target', f(q1t), ' var', f(q1a-q1t), ` (${(q1a/q1t*100).toFixed(1)}%)`);
console.log('Q2 actual', f(q2a), ' target', f(q2t), ' var', f(q2a-q2t), ` (${(q2a/q2t*100).toFixed(1)}%)`);
console.log('H1 actual', f(q1a+q2a), ' target', f(q1t+q2t), ' var', f(q1a+q2a-q1t-q2t));
console.log('Jul+Aug  ', f(julAug), ' target', f(julAugT), ' var', f(julAug-julAugT));
console.log('Sept so far', f(SEPT_TO_DATE));
console.log('YTD (Jan-6 Sep)', f(ytd));

const GOAL=9_000_000;
const need=GOAL-ytd;
const monthsLeft=3+ (24/30); // rest of Sep + Oct, Nov, Dec
console.log('\n--- the road to nine million ---');
console.log('goal', f(GOAL), ' YTD', f(ytd), ' still to invoice', f(need));
console.log('YTD as % of goal:', (ytd/GOAL*100).toFixed(1)+'%');
const monthlyRun = monthAct.reduce((a,b)=>a+b,0)/8;
console.log('run rate Jan-Aug:', f(monthlyRun), 'per month');
console.log('rest of Sept needed to keep pace:', f(GOAL/12*9 - ytd), '(to be 9/12 of the way by 30 Sep)');
console.log('Oct+Nov+Dec needed if Sept ends at run rate:', f(GOAL - (ytd + (monthlyRun-SEPT_TO_DATE))), 'over 3 months');
const septEnd = ytd + Math.max(0, monthlyRun - SEPT_TO_DATE);
console.log('=> per month Oct-Dec:', f((GOAL-septEnd)/3));
console.log('vs Jan-Aug run rate of', f(monthlyRun), '=> uplift needed', (((GOAL-septEnd)/3)/monthlyRun*100-100).toFixed(1)+'%');

console.log('\n--- bonus ladder: £5,000 each per £200,000 above £9m ---');
for(let m=9.0;m<=10.01;m+=0.2){
  const over=m*1e6-GOAL, per=Math.floor(over/200000)*5000;
  console.log(`£${m.toFixed(1)}m   over goal ${f(over).padStart(11)}   bonus each ${f(per).padStart(8)}   cost @10 mgrs ${f(per*10).padStart(10)}   @75 surveyors ${f(per*75).padStart(11)}   @100 staff ${f(per*100).padStart(11)}`);
}

// ---------------------------------------------------------------
console.log('\n=== RECONCILIATION against the board\'s own monthly total row ===');
const boardAct = {Jan:569300,May:664826,Jun:847982,Jul:609584,Aug:487353};
const boardTgt = {Jan:811320,Feb:942513,Mar:1073514,Apr:823994,May:851951,Jul:1004996,Aug:1194965};
MONTHS.forEach((m,i)=>{
  if(boardAct[m]!==undefined){const d=monthAct[i]-boardAct[m];
    console.log(`${m} actual: teams ${f(monthAct[i])}  board ${f(boardAct[m])}  diff ${f(d)} ${Math.abs(d)<50?'<= RECONCILES':(m==='Jan'?'(T1 Jan under glare)':'<= CHECK')}`);}
});
MONTHS.forEach((m,i)=>{
  if(boardTgt[m]!==undefined){const d=monthTgt[i]-boardTgt[m];
    console.log(`${m} target: teams ${f(monthTgt[i])}  board ${f(boardTgt[m])}  diff ${f(d)} ${Math.abs(d)<50?'<= RECONCILES':'<= CHECK'}`);}
});

// T1 Jan+Feb sit under the camera glare - impute at T1's own mean
const t1known=teams.T1.act.filter(v=>v!==null);
const t1mean=Math.round(t1known.reduce((a,b)=>a+b,0)/t1known.length);
const YTD = q1a+q2a+julAug+SEPT_TO_DATE + t1mean*2;
console.log(`\nT1 Jan & Feb imputed at T1's own mean of ${f(t1mean)} each (+${f(t1mean*2)})`);
console.log('YTD to 6 September:', f(YTD));

console.log('\n=== THE ROAD TO £9M ===');
const GOAL2=9_000_000, STRETCH=10_000_000;
const need9=GOAL2-YTD, need10=STRETCH-YTD;
const monthsRemaining=0.8+3;                       // rest of September, then Oct Nov Dec
const runRate=(q1a+q2a+julAug+t1mean*2)/8;         // Jan-Aug monthly average
console.log('YTD', f(YTD), `= ${(YTD/GOAL2*100).toFixed(1)}% of £9m`);
console.log('still to invoice for £9m :', f(need9), `over ${monthsRemaining} months = ${f(need9/monthsRemaining)}/month`);
console.log('still to invoice for £10m:', f(need10), `over ${monthsRemaining} months = ${f(need10/monthsRemaining)}/month`);
console.log('Jan-Aug run rate         :', f(runRate), '/month');
console.log(`uplift needed for £9m    : +${(((need9/monthsRemaining)/runRate)-1)*100 |0}%`);
console.log(`uplift needed for £10m   : +${Math.round(((need10/monthsRemaining)/runRate-1)*100)}%`);
console.log('best month so far (Jun)  :', f(Math.max(...monthAct)));

console.log('\n=== BONUS LADDER (integer arithmetic) ===');
console.log('The scheme pays Emily, Stuart, Cassie and Megan - four recipients.');
console.log('milestone   over £9m     bonus each   total pot    % of the extra income');
for(let k=0;k<=5;k++){
  const total=9_000_000+k*200_000;
  const over=total-9_000_000;
  const per=(over/200_000)*5000;
  const pot=per*4;
  console.log(`£${(total/1e6).toFixed(1)}m  ${f(over).padStart(10)}  ${f(per).padStart(9)}  ${f(pot).padStart(10)}   ${over?(pot/over*100).toFixed(0)+'%':'-'}`);
}
console.log('\nweekly board target £350,604 x 52 =', f(350604*52), '/year');
console.log('monthly board targets Jan-Aug avg  =', f(monthTgt.reduce((a,b)=>a+b,0)/8), '/month  x12 =', f(monthTgt.reduce((a,b)=>a+b,0)/8*12));
