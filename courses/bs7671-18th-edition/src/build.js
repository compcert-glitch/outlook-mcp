const fs=require('fs');
const t=fs.readFileSync(__dirname+'/template.html','utf8');
const q=JSON.parse(fs.readFileSync(__dirname+'/../data/questions.json','utf8'));
const notes=fs.readFileSync(__dirname+'/notes.html','utf8');
const slim=q.map(x=>({n:x.n,topic:x.topic,q:x.q,options:x.options,answer:x.answer,answerText:x.answerText,why:x.why||''}));
const LS=new RegExp(String.fromCharCode(0x2028),'g');
const PS=new RegExp(String.fromCharCode(0x2029),'g');
const json=JSON.stringify(slim)
  .replace(/</g,'\\u003c')
  .replace(LS,'\\u2028')
  .replace(PS,'\\u2029');
const out=t.replace('__QUESTIONS__',()=>json).replace('__NOTES__',()=>notes);
if(out.includes('__QUESTIONS__')||out.includes('__NOTES__')) throw new Error('placeholder left');
fs.writeFileSync(__dirname+'/../build/exam-trainer.artifact.html',out);
console.log('built '+(out.length/1024).toFixed(1)+'KB | questions '+slim.length);
