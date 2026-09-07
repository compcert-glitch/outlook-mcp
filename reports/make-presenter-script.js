const fs=require('fs');
const src=fs.readFileSync(process.argv[2]||'deck.js','utf8');
const notes=[...src.matchAll(/addNotes\(`([\s\S]*?)`\)/g)].map(m=>m[1].trim());
const titles=(process.argv[3]||'').split('|').filter(Boolean);
const WPM=138;
let tw=0,tb=0;
const seg=notes.map((n,i)=>{
  const b=[...n.matchAll(/<break time="([\d.]+)s"\/>/g)].reduce((a,m)=>a+parseFloat(m[1]),0);
  const w=n.replace(/<break[^>]*\/>/g,' ').trim().split(/\s+/).length;
  tw+=w; tb+=b;
  const secs=w/WPM*60+b;
  return `[SLIDE ${i+1} — ${titles[i]}]   (~${Math.round(secs)}s)\n\n${n}\n`;
});
const total=tw/WPM*60+tb;
const mm=Math.floor(total/60), ss=Math.round(total%60);
const out=`${process.argv[4]||'PRESENTER SCRIPT'}
Crawford & CO Surveyors · managers' meeting · prepared 5 September 2026

RUN TIME: approx ${mm}m ${ss}s (${tw} spoken words + ${tb.toFixed(1)}s of pauses, at 138 words per minute).
Kept under the 4-minute limit with about ${Math.round(240-total)}s of headroom for a slower delivery.

HOW TO USE THIS FILE
- Paste each slide's block into your AI voice tool as you go, or paste the whole
  thing if the tool handles slide breaks itself.
- The <break time="0.7s"/> tags are SSML. ElevenLabs, Azure and Amazon Polly all
  read them natively, and they are what stop the delivery running together into
  one long sentence.
- If your tool does NOT accept SSML, replace every tag with an ellipsis and a new
  line — most engines pause on those. There is a tag-free version at the end.
- Figures are written as words on purpose ("two hundred and forty six thousand"),
  because voice engines misread "£246,274" more often than not.
- The same script is already in the PowerPoint speaker notes, slide by slide.

${'='.repeat(70)}
THE SCRIPT
${'='.repeat(70)}

${seg.join('\n')}
${'='.repeat(70)}
PLAIN VERSION — NO SSML TAGS (pauses become line breaks and ellipses)
${'='.repeat(70)}

${notes.map((n,i)=>`[SLIDE ${i+1} — ${titles[i]}]\n\n`+
  n.replace(/\s*<break time="(0\.[0-6])s"\/>\s*/g,' ... ')
   .replace(/\s*<break time="[\d.]+s"\/>\s*/g,'\n\n')
   .replace(/[ \t]+/g,' ').trim()+'\n').join('\n')}`;
fs.writeFileSync(process.argv[5]||'alice-presenter-script.txt',out);
console.log(`wrote ${process.argv[5]} — ${mm}m ${ss}s`);
