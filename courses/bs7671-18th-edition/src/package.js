// Produces the two distributables from the built artifact body + question bank:
//   ../data/questions.csv                 flat export for LMS quiz importers
//   ../build/exam-trainer-standalone.html complete hostable page
// Run after build.js.
const fs = require('fs');
const D = __dirname;

const q = JSON.parse(fs.readFileSync(D + '/../data/questions.json', 'utf8'));
const esc = v => { v = String(v == null ? '' : v); return /[",\n]/.test(v) ? '"' + v.replace(/"/g, '""') + '"' : v; };
const head = ['id','topic','question','option_a','option_b','option_c','option_d','correct_letter','correct_text','explanation'];
const rows = q.map(x => [x.n, x.topic, x.q, ...x.options, x.answer,
  x.answerText || x.options['ABCD'.indexOf(x.answer)], x.why || ''].map(esc).join(','));
fs.writeFileSync(D + '/../data/questions.csv', head.join(',') + '\n' + rows.join('\n') + '\n');

const body = fs.readFileSync(D + '/../build/exam-trainer.artifact.html', 'utf8');
fs.writeFileSync(D + '/../build/exam-trainer-standalone.html', `<!doctype html>
<html lang="en-GB">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="description" content="City &amp; Guilds 2382 practice exam for BS 7671:2018 + A2:2022 + A3:2024 + A4:2026.">
<style>:root{color-scheme:light dark}body{margin:0}img{max-width:100%}[hidden]{display:none!important}</style>
</head>
<body>
${body}
</body>
</html>
`);
console.log('csv rows ' + q.length + ' | standalone ' + (fs.statSync(D + '/../build/exam-trainer-standalone.html').size / 1024).toFixed(1) + 'KB');
