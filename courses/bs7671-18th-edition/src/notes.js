const fs = require('fs');
const SRC = __dirname + "/../source/18th-edition-exam-prep.md";
const all = fs.readFileSync(SRC,'utf8').split('\n');
const s = all.findIndex(l=>l.trim()==='## Revision Notes');
const e = all.findIndex(l=>l.trim()==='## Practice Questions');
const L = all.slice(s+1, e).filter(l=>l.trim()!=='---');

const esc = t => t.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
function inline(t){
  t = t.replace(/\\([\\`*_{}\[\]()#+\-.!=<>|~])/g,'$1');
  t = esc(t);
  t = t.replace(/`([^`]+)`/g,'<code>$1</code>');
  t = t.replace(/\*\*([^*]+)\*\*/g,'<strong>$1</strong>');
  t = t.replace(/(^|[\s(])\*([^*]+)\*/g,'$1<em>$2</em>');
  return t.trim();
}
const cells = l => l.trim().replace(/^\||\|$/g,'').split('|').map(c=>inline(c));

let out=[], i=0, sec=0;
const flushOpen = {ul:false};
function closeList(){ if(flushOpen.ul){ out.push('</ul>'); flushOpen.ul=false; } }

while(i<L.length){
  const l=L[i];
  if(l.trim()===''){ i++; continue; }
  let m;
  if((m=l.match(/^### (.+)$/))){
    closeList(); sec++;
    out.push(`<h3 class="nt-h" id="note-${sec}">${inline(m[1])}</h3>`); i++; continue;
  }
  if((m=l.match(/^#### (.+)$/))){
    closeList(); out.push(`<h4 class="nt-sub">${inline(m[1])}</h4>`); i++; continue;
  }
  if(/^\|/.test(l) && /^\|[\s:|-]+\|$/.test((L[i+1]||'').trim())){
    closeList();
    const head=cells(l); i+=2;
    let rows=[];
    while(i<L.length && /^\|/.test(L[i])){ rows.push(cells(L[i])); i++; }
    out.push('<div class="tbl-wrap"><table class="nt-tbl"><thead><tr>'+head.map(h=>`<th>${h}</th>`).join('')+
      '</tr></thead><tbody>'+rows.map(r=>'<tr>'+r.map(c=>`<td>${c}</td>`).join('')+'</tr>').join('')+
      '</tbody></table></div>');
    continue;
  }
  if(/^>/.test(l)){
    closeList();
    let buf=[];
    while(i<L.length && /^>/.test(L[i])){ const t=L[i].replace(/^>\s?/,'').trim(); if(t) buf.push(inline(t)); i++; }
    out.push(`<div class="nt-note">${buf.join(' ')}</div>`); continue;
  }
  if(/^[-*]\s+/.test(l)){
    if(!flushOpen.ul){ out.push('<ul class="nt-ul">'); flushOpen.ul=true; }
    let t=l.replace(/^[-*]\s+/,'').trim();
    i++;
    while(i<L.length && L[i].trim()!=='' && !/^[-*]\s+/.test(L[i]) && !/^#{3,4} /.test(L[i]) && !/^\|/.test(L[i]) && !/^>/.test(L[i]) && /^\s{2,}/.test(L[i])){
      t+=' '+L[i].trim(); i++;
    }
    out.push(`<li>${inline(t)}</li>`); continue;
  }
  closeList();
  let t=l.trim(); i++;
  while(i<L.length && L[i].trim()!=='' && !/^[-*]\s+/.test(L[i]) && !/^#/.test(L[i]) && !/^\|/.test(L[i]) && !/^>/.test(L[i])){ t+=' '+L[i].trim(); i++; }
  const cls = /^\*[^*]+\*$/.test(t) ? ' class="nt-lede"' : '';
  out.push(`<p${cls}>${inline(t)}</p>`);
}
closeList();
fs.writeFileSync(__dirname+'/notes.html', out.join('\n'));
console.log('sections:', sec, 'blocks:', out.length, 'bytes:', out.join('\n').length);
