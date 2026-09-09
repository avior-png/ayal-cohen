/**
 * כלל טיפוגרפי: **מקף רגיל בלבד** בטקסט שמוצג. לא מקף ארוך (—)
 * ולא אן-דאש (–).
 *
 * הבדיקה מסווגת כל תו בקובץ לאזור — קוד, הערת שורה, הערת בלוק,
 * מחרוזת, תבנית — ומתריעה רק על מקף בטקסט שמוצג. הערות בעברית
 * משתמשות במקף ארוך בחופשיות והן לא בעניין הזה.
 *
 * ⚠️  ‎—‎ ו-‎–‎ אינם תחביר JavaScript חוקי מחוץ למחרוזת, להערה
 *     ולטקסט JSX. לכן מקף שנמצא באזור "קוד" הוא בהכרח טקסט JSX
 *     בין תגיות — כלומר טקסט שמוצג, והוא נחשב הפרה.
 *
 * ‎studio/‎ אינו נבדק: הוא כלי פיתוח שמוסר מהתוצר, והמקפים שבו הם
 * סמלים בממשק (כפתור מזעור, סוגריים ברשימה) ולא פרוזה.
 *
 * הרצה: חלק מ-‎prebuild‎.
 */
import fs from 'node:fs';
import path from 'node:path';

const DASHES = /[—–]/;
const ROOTS = ['app', 'components', 'content', 'lib'];
const SKIP = ['studio', 'node_modules', '.next', 'out'];
/* ‎scripts/‎ אינו בסריקה: הודעות שסקריפט בנייה מדפיס למסוף אינן
   טקסט שמוצג באתר. ‎seed.mjs‎ הוא היחיד שם שהמחרוזות שלו נכתבות
   למסד והופכות לתוכן האתר, ולכן הוא נבדק בנפרד. */
const EXTRA = ['dna.ts', 'scripts/seed.mjs'];

/** מסווג כל תו: c=code s=string t=template #=comment */
function classify(src) {
  const n = src.length;
  const tags = new Array(n).fill('c');
  let i = 0, state = 'code', quote = '';
  while (i < n) {
    const ch = src[i], nx = src[i + 1] ?? '';
    if (state === 'code') {
      if (ch === '/' && nx === '/') { state = 'line'; tags[i] = tags[i + 1] = '#'; i += 2; continue; }
      if (ch === '/' && nx === '*') { state = 'block'; tags[i] = tags[i + 1] = '#'; i += 2; continue; }
      if (ch === '\'' || ch === '"') { state = 'str'; quote = ch; tags[i] = 's'; i++; continue; }
      if (ch === '`') { state = 'tpl'; tags[i] = 't'; i++; continue; }
      i++; continue;
    }
    if (state === 'line') { tags[i] = '#'; if (ch === '\n') state = 'code'; i++; continue; }
    if (state === 'block') {
      tags[i] = '#';
      if (ch === '*' && nx === '/') { tags[i + 1] = '#'; state = 'code'; i += 2; continue; }
      i++; continue;
    }
    if (state === 'str') {
      tags[i] = 's';
      if (ch === '\\') { if (i + 1 < n) tags[i + 1] = 's'; i += 2; continue; }
      if (ch === quote) state = 'code';
      i++; continue;
    }
    if (state === 'tpl') {
      tags[i] = 't';
      if (ch === '\\') { if (i + 1 < n) tags[i + 1] = 't'; i += 2; continue; }
      if (ch === '$' && nx === '{') {
        tags[i + 1] = 't';
        let j = i + 2, d = 1;
        while (j < n && d) { if (src[j] === '{') d++; else if (src[j] === '}') d--; tags[j] = 'c'; j++; }
        i = j; continue;
      }
      if (ch === '`') state = 'code';
      i++; continue;
    }
  }
  return tags;
}

const bad = [];

function check(file) {
  const src = fs.readFileSync(file, 'utf8');
  if (!DASHES.test(src)) return;
  const tags = classify(src);
  for (let i = 0; i < src.length; i++) {
    if (!DASHES.test(src[i])) continue;
    if (tags[i] === '#') continue;                 // הערה — לא בעניין
    const line = src.slice(0, i).split('\n').length;
    const from = src.lastIndexOf('\n', i) + 1;
    let to = src.indexOf('\n', i); if (to < 0) to = src.length;
    bad.push(`${file}:${line}  ${src.slice(from, to).trim().slice(0, 100)}`);
  }
}

function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP.includes(e.name)) continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) { walk(p); continue; }
    if (/\.(ts|tsx|mjs)$/.test(e.name)) check(p);
  }
}

for (const r of ROOTS) if (fs.existsSync(r)) walk(r);
for (const f of EXTRA) if (fs.existsSync(f)) check(f);

if (bad.length) {
  console.error('\n❌ מקף ארוך בטקסט שמוצג. הכלל: מקף רגיל בלבד (-).\n');
  for (const b of [...new Set(bad)]) console.error('   ' + b);
  console.error('');
  process.exit(1);
}

console.log('בדיקת מקפים — תקין: אין מקף ארוך בטקסט שמוצג');
