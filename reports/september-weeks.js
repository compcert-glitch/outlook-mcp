// September week 2 (Mon 7 - Fri 11 Sep), read from the 11 Sep board photograph.
// Structure confirmed: M-F columns are the CURRENT week; W1..W4 are weekly totals.
const wk2={
 T1:{d:[212,1516,1343,1276,-4739],       w2:-393},
 T2:{d:[3410,3300,3220,5070,3620],       w2:18620},
 T3:{d:[2343,3069,1784,3176,2248],       w2:12619},
 T4:{d:[0,0,0,0,0],                      w2:0},
 T5:{d:[3800,350,460,300,438],           w2:5348},
 T6:{d:[9555,7548,11030,12378,7450],     w2:47960},
 T7:{d:[-100,0,0,0,100],                 w2:0},
 T8:{d:[800,1150,1361,1359,1755],        w2:6425},
 T9:{d:[1371,1695,2201,1847,2359],       w2:9423},
 T10:{d:[2520,825,8235,3595,8460],       w2:23595},
};
const boardDaily=[23911,19452,29584,28960,21690], boardW2=123596, boardW1=246274;
const f=n=>'£'+Math.round(n).toLocaleString('en-GB');
console.log('--- each team: daily columns vs its own W2 total ---');
let bad=0;
for(const [id,t] of Object.entries(wk2)){
  const s=t.d.reduce((a,b)=>a+b,0), d=s-t.w2;
  if(Math.abs(d)>2){bad++;console.log(`  ${id.padEnd(4)} daily ${f(s).padStart(9)}  W2 ${f(t.w2).padStart(9)}  diff ${f(d)}`);}
}
console.log(bad?`${bad} team(s) off by more than £2`:'every team reconciles to within £2');

console.log('\n--- company row ---');
const dsum=boardDaily.reduce((a,b)=>a+b,0);
console.log('board daily columns sum:',f(dsum),' board W2:',f(boardW2),' diff',f(dsum-boardW2));
const teamW2=Object.values(wk2).reduce((a,t)=>a+t.w2,0);
console.log('sum of team W2       :',f(teamW2),' diff vs board W2',f(teamW2-boardW2));

console.log('\n--- September so far ---');
const mtd=boardW1+boardW2;
console.log('week 1 :',f(boardW1));
console.log('week 2 :',f(boardW2),`  (${(boardW2/boardW1*100).toFixed(0)}% of week 1)`);
console.log('month to date:',f(mtd));
console.log('\nteam-by-team, week 1 -> week 2:');
const w1={T1:8192,T2:13880,T3:26281,T4:0,T5:6730,T6:117120,T7:-100,T8:4506,T9:11733,T10:58053};
for(const [id,t] of Object.entries(wk2)){
  const a=w1[id], b=t.w2;
  console.log(`  ${id.padEnd(4)} ${f(a).padStart(9)} -> ${f(b).padStart(9)}  ${a?((b-a)/Math.abs(a)*100).toFixed(0)+'%':'n/a'}`);
}
