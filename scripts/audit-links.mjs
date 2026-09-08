/**
 * סורק כל קישור פנימי בכל עמוד בתוצר הסטטי (‎out/‎) ומאמת שהוא
 * מגיע לקובץ קיים — ושכל עוגן ‎#id‎ קיים בעמוד היעד.
 *
 * ⚠️  למה זה נחוץ: כל הקישורים באתר הובילו ל-404 בפריסה הראשונה
 *     ב-GitHub Pages, כי ה-‎basePath‎ הוכפל. מקומית ‎BASE_PATH‎ ריק
 *     וההכפלה היא בדיוק אפס, ולכן שום בדיקה שאינה על התוצר
 *     בתת-נתיב לא הייתה תופסת את זה.
 *
 * הרצה: ‎BASE_PATH=/REPO node scripts/audit-links.mjs‎ אחרי
 * ‎npm run build:static‎.
 */
import fs from 'node:fs';
import path from 'node:path';
const OUT = 'out';
const PREFIX = process.env.BASE_PATH
  || (process.env.GITHUB_REPOSITORY ? '/' + process.env.GITHUB_REPOSITORY.split('/')[1] : '');
const pages = [];
(function walk(d){ for (const e of fs.readdirSync(d,{withFileTypes:true})) {
  const p = path.join(d,e.name);
  if (e.isDirectory()) walk(p); else if (e.name.endsWith('.html')) pages.push(p);
}})(OUT);

const resolve = (href) => {
  let u = href.split('#')[0].split('?')[0];
  if (!u.startsWith(PREFIX)) return { ok:false, why:'ללא basePath' };
  u = u.slice(PREFIX.length) || '/';
  const cands = [path.join(OUT,u), path.join(OUT,u,'index.html'), path.join(OUT,u+'.html')];
  return { ok: cands.some(c => fs.existsSync(c) && fs.statSync(c).isFile()), why:'לא נמצא' };
};

let bad = 0, checked = 0, anchors = 0;
for (const f of pages) {
  const html = fs.readFileSync(f,'utf8');
  const hrefs = [...html.matchAll(/(?:href|src)="([^"]+)"/g)].map(m=>m[1]);
  for (const h of hrefs) {
    if (/^(https?:|data:|mailto:|tel:|#|\/\/)/.test(h)) continue;
    checked++;
    if (h.includes('#')) anchors++;
    const r = resolve(h);
    if (!r.ok) { console.log('❌', f.replace(OUT,''), '→', h, '('+r.why+')'); bad++; }
  }
}
// עוגנים: מאמתים שה-id קיים בעמוד היעד
let badAnchor = 0;
for (const f of pages) {
  const html = fs.readFileSync(f,'utf8');
  for (const m of html.matchAll(/href="([^"]*#[^"]+)"/g)) {
    const [p, frag] = m[1].split('#');
    if (/^(https?:|mailto:|tel:)/.test(p)) continue;
    let target = f;
    if (p) {
      const u = p.startsWith(PREFIX) ? p.slice(PREFIX.length) : p;
      const c = [path.join(OUT,u,'index.html'), path.join(OUT,u)].find(x=>fs.existsSync(x)&&fs.statSync(x).isFile());
      if (!c) continue;
      target = c;
    }
    const t = fs.readFileSync(target,'utf8');
    if (!t.includes(`id="${frag}"`)) { console.log('⚓ עוגן חסר:', f.replace(OUT,''), '→', m[1], 'ב-', target.replace(OUT,'')); badAnchor++; }
  }
}
console.log(`\nנבדקו ${checked} קישורים ב-${pages.length} עמודים · שבורים: ${bad} · עוגנים שבורים: ${badAnchor}`);
process.exit(bad + badAnchor ? 1 : 0);
