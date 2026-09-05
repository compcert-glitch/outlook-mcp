// Week 1 board transcription. Days posted: Tue, Wed, Thu, Fri (Monday column blank on board).
const teams = [
  { id:'T1',  who:'KP',        a:[3252,1513,2559,869],       aW1:8192,   tW1:4682,   tW2:2755  },
  { id:'T2',  who:'JW',        a:[3510,0,6290,4080],         aW1:13880,  tW1:34140,  tW2:47062 },
  { id:'T3',  who:'EP, CW, AL',a:[13420,1805,9787,1270],     aW1:26281,  tW1:64774,  tW2:92804 },
  { id:'T4',  who:'unassigned',a:[0,0,0,0],                  aW1:0,      tW1:0,      tW2:0     },
  { id:'T5',  who:'HH',        a:[5455,0,725,550],           aW1:6730,   tW1:18940,  tW2:27931 },
  { id:'T6',  who:'NR, EB, BF',a:[31221,27615,50785,7698],   aW1:117120, tW1:206681, tW2:268398},
  { id:'T7',  who:'JM',        a:[0,-100,0,0],               aW1:-100,   tW1:6020,   tW2:9798  },
  { id:'T8',  who:'KG',        a:[1444,761,1385,918],        aW1:4506,   tW1:13520,  tW2:19529 },
  { id:'T9',  who:'JW',        a:[5603,515,4249,1216],       aW1:11733,  tW1:17947,  tW2:22175 },
  { id:'T10', who:'GA',        a:[14660,0,35846,7575],       aW1:58053,  tW1:66165,  tW2:68765 },
];
const boardActualDays = [78565,31908,111626,24175];
const boardActualW1   = 246274;
const boardTargetDays = [87651,88084,90893,89801];
const boardTargetW1   = 350604;
const boardTargetW2   = 422287;

const f = n => n.toLocaleString('en-GB');
console.log('--- day-column reconciliation (sum of teams vs board total row) ---');
['Tue','Wed','Thu','Fri'].forEach((d,i)=>{
  const s = teams.reduce((x,t)=>x+t.a[i],0);
  console.log(`${d}: teams ${f(s)} | board ${f(boardActualDays[i])} | diff ${f(s-boardActualDays[i])}`);
});
const sumA = teams.reduce((x,t)=>x+t.aW1,0);
const sumT = teams.reduce((x,t)=>x+t.tW1,0);
const sumT2= teams.reduce((x,t)=>x+t.tW2,0);
console.log(`W1 actual: teams ${f(sumA)} | board ${f(boardActualW1)} | diff ${f(sumA-boardActualW1)}`);
console.log(`W1 target: teams ${f(sumT)} | board ${f(boardTargetW1)} | diff ${f(sumT-boardTargetW1)}`);
console.log(`W2 target: teams ${f(sumT2)} | board ${f(boardTargetW2)} | diff ${f(sumT2-boardTargetW2)}`);

console.log('\n--- team variance vs W1 target (ranked) ---');
const rows = teams.map(t=>({...t, va:t.aW1-t.tW1, pct: t.tW1? t.aW1/t.tW1*100 : null}))
  .sort((x,y)=> (y.pct===null?-1e9:y.pct) - (x.pct===null?-1e9:x.pct));
rows.forEach(r=>console.log(
  `${r.id.padEnd(4)} ${r.who.padEnd(14)} act ${f(r.aW1).padStart(8)}  tgt ${f(r.tW1).padStart(8)}  var ${f(r.va).padStart(9)}  ${r.pct===null?'  n/a':(r.pct.toFixed(1)+'%').padStart(7)}`));

console.log('\n--- headline ---');
console.log('gap vs board target line :', f(boardActualW1-boardTargetW1), `(${(boardActualW1/boardTargetW1*100).toFixed(1)}% of target)`);
console.log('gap vs sum of team tgts  :', f(sumA-sumT), `(${(sumA/sumT*100).toFixed(1)}%)`);
console.log('W2 target step-up        :', f(boardTargetW2-boardTargetW1), `(+${((boardTargetW2/boardTargetW1-1)*100).toFixed(1)}%)`);
console.log('run-rate needed W2 at W1 pace shortfall:', f(boardTargetW2-boardActualW1));
console.log('T6+T3 share of gap vs team tgts:', ((( (206681-117120)+(64774-26281) )/(sumT-sumA))*100).toFixed(1)+'%');
console.log('daily spread actual:', boardActualDays.map(f).join(' / '), ' Wed is', (111626/24175).toFixed(1)+'x Fri');
