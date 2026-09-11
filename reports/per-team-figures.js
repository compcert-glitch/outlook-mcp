const src=require('fs').readFileSync('ytd.js','utf8');
const teams={};
for(const m of src.matchAll(/(T\d+):\s*\{\s*who:'([^']+)',\s*act:\[([^\]]+)\],\s*tgt:\[([^\]]+)\]/g)){
  teams[m[1]]={who:m[2],act:m[3].split(',').map(v=>v.trim()==='null'?null:+v),tgt:m[4].split(',').map(Number)};
}
const septW1={T1:8192,T2:13880,T3:26281,T4:0,T5:6730,T6:117120,T7:-100,T8:4506,T9:11733,T10:58053};
const septW2={T1:-393,T2:18620,T3:12619,T4:0,T5:5348,T6:47960,T7:0,T8:6425,T9:9423,T10:23595};
const sept=Object.fromEntries(Object.keys(septW1).map(k=>[k,septW1[k]+septW2[k]]));
const f=n=>'£'+Math.round(n).toLocaleString('en-GB');
const T1MEAN=0, UPLIFT=825990/703974;
let rows=[];
for(const [id,t] of Object.entries(teams)){
  const act=t.act.reduce((a,v)=>a+(v??0),0);
  const tgt=t.tgt.reduce((a,b)=>a+b,0);
  const ytd=act+sept[id];
  const perMonth=act/8;                    // Jan-Aug monthly average
  const q4=perMonth*UPLIFT;                // same proportional lift for everyone
  rows.push({id,who:t.who,ytd,tgt,pct:tgt?ytd/tgt*100:null,perMonth,q4});
}
rows.sort((a,b)=>b.ytd-a.ytd);
console.log('team  lead          YTD invoiced   YTD target    %      Jan-Aug/mo   Q4 monthly ask');
rows.forEach(r=>console.log(
  `${r.id.padEnd(5)} ${r.who.padEnd(13)} ${f(r.ytd).padStart(12)} ${f(r.tgt).padStart(12)} ${(r.pct===null?'n/a':r.pct.toFixed(0)+'%').padStart(6)} ${f(r.perMonth).padStart(12)} ${f(r.q4).padStart(14)}`));
const tot=rows.reduce((a,r)=>a+r.q4,0);
console.log('\nsum of Q4 monthly asks:',f(tot),' vs required',f(825990),' diff',f(tot-825990));
console.log('uplift factor applied to every team: +'+((UPLIFT-1)*100).toFixed(1)+'%');
console.log('\nshare of YTD income:');
const totYTD=rows.reduce((a,r)=>a+r.ytd,0);
rows.forEach(r=>console.log(`  ${r.id.padEnd(4)} ${(r.ytd/totYTD*100).toFixed(1)}%`));
