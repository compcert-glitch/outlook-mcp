const fs = require('fs');
const SRC = __dirname + "/../source/18th-edition-exam-prep.md";
const raw = fs.readFileSync(SRC, 'utf8');
const lines = raw.split('\n');

function unesc(s) {
  return s.replace(/\\([\\`*_{}\[\]()#+\-.!=<>|~])/g, '$1').replace(/[ \t]+$/,'').trim();
}

// ---- questions ----
const qStart = lines.findIndex(l => l.trim() === '## Practice Questions');
const aStart = lines.findIndex(l => l.trim() === '## Answer Key');
const qLines = lines.slice(qStart, aStart);

const questions = [];
let topic = null;
for (let i = 0; i < qLines.length; i++) {
  const l = qLines[i];
  const h = l.match(/^### (.+?)\s*$/);
  if (h) { topic = unesc(h[1]); continue; }
  const qm = l.match(/^\*\*Q(\d+)\.\*\*\s*(.*)$/);
  if (!qm) continue;
  const num = parseInt(qm[1], 10);
  let stem = qm[2];
  // gather continuation of stem until blank line
  let j = i + 1;
  while (j < qLines.length && qLines[j].trim() !== '') { stem += ' ' + qLines[j].trim(); j++; }
  // next non-blank block = options
  while (j < qLines.length && qLines[j].trim() === '') j++;
  let optBlock = '';
  while (j < qLines.length && qLines[j].trim() !== '') { optBlock += (optBlock ? ' ' : '') + qLines[j].trim(); j++; }
  // split options on " A. " boundaries
  const idx = [];
  for (const letter of ['A','B','C','D']) {
    const re = new RegExp('(^|\\s)' + letter + '\\.\\s');
    const m = optBlock.match(re);
    if (!m) { idx.push(-1); continue; }
    idx.push(m.index + m[1].length);
  }
  const opts = [];
  for (let k = 0; k < 4; k++) {
    if (idx[k] < 0) { opts.push(null); continue; }
    const from = idx[k] + 3;
    const to = k < 3 && idx[k+1] > -1 ? idx[k+1] : optBlock.length;
    opts.push(unesc(optBlock.slice(from, to)));
  }
  questions.push({ n: num, topic, q: unesc(stem), options: opts });
  i = j - 1;
}

// ---- answer key ----
const key = {};
for (const l of lines.slice(aStart)) {
  const m = l.match(/^\|\s*(\d+)\s*\|\s*\*\*([A-D])\*\*\s*(?:—|-)?\s*([^|]*)\|([^|]*)\|/);
  if (!m) continue;
  key[parseInt(m[1],10)] = { answer: m[2], answerText: unesc(m[3]), why: unesc(m[4]) };
}

let problems = [];
for (const q of questions) {
  if (q.options.some(o => !o)) problems.push('Q' + q.n + ': missing option');
  if (!key[q.n]) problems.push('Q' + q.n + ': no answer key');
  else { q.answer = key[q.n].answer; q.why = key[q.n].why; q.answerText = key[q.n].answerText; }
}
console.log('questions:', questions.length, 'keyed:', Object.keys(key).length);
console.log('topics:', [...new Set(questions.map(q=>q.topic))].join(' | '));
if (problems.length) console.log('PROBLEMS:\n' + problems.join('\n'));

// cross-check: does the answer-key answerText match the option it points at?
let mismatch = 0;
const norm = s => (s||'').toLowerCase().replace(/[^a-z0-9]/g,'').slice(0,45);
for (const q of questions) {
  const chosen = q.options['ABCD'.indexOf(q.answer)];
  if (q.answerText && norm(q.answerText) && !norm(chosen).startsWith(norm(q.answerText).slice(0,25))) {
    mismatch++; console.log('CHECK Q'+q.n+' key="'+q.answerText+'" opt'+q.answer+'="'+chosen+'"');
  }
}
console.log('answerText mismatches:', mismatch);
fs.writeFileSync(__dirname + '/../data/questions.json', JSON.stringify(questions, null, 1));
