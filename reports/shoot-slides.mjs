import { chromium } from 'playwright';
import fs from 'fs';
const meta = JSON.parse(fs.readFileSync(process.argv[2]+'/_pages.json','utf8'));
const b = await chromium.launch({ executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const pg = await b.newPage({ viewport:{ width: meta.w, height: meta.h }, deviceScaleFactor: 1 });
for (const [i,f] of meta.pages.entries()) {
  await pg.goto('file://'+f);
  await pg.waitForTimeout(700);
  await pg.screenshot({ path: `${meta.out}/slide-${String(i+1).padStart(2,'0')}.jpg`, type:'jpeg', quality: 92 });
}
await b.close();
console.log('done');
