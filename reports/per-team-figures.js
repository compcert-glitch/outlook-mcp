const src=require('fs').readFileSync(require('path').join(__dirname,'ytd-data.js'),'utf8');
const teams={};
for(const m of src.matchAll(/(T\d+):\s*\{\s*who:'([^']+)',\s*act:\[([^\]]+)\],\s*tgt:\[([^\]]+)\]/g)){
  teams[m[1]]={who:m[2],act:m[3].split(',').map(v=>v.trim()==='null'?null:+v),tgt:m[4].split(',').map(Number)};
}
const sept={T1:8192,T2:13880,T3:26281,T4:0,T5:6730,T6:117120,T7:-100,T8:4506,T9:11733,T10:58053};
const f=n=>'£'+Math.round(n).toLocaleString('en-GB');
const T1MEAN=23201, UPLIFT=820902/704287;
let rows=[];
for(const [id,t] of Object.entries(teams)){
  const act=t.act.reduce((a,v)=>a+(v===null?T1MEAN:v),0);
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
console.log('\nsum of Q4 monthly asks:',f(tot),' vs required',f(820902),' diff',f(tot-820902));
console.log('uplift factor applied to every team: +'+((UPLIFT-1)*100).toFixed(1)+'%');
console.log('\nshare of YTD income:');
const totYTD=rows.reduce((a,r)=>a+r.ytd,0);
rows.forEach(r=>console.log(`  ${r.id.padEnd(4)} ${(r.ytd/totYTD*100).toFixed(1)}%`));
