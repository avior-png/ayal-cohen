/**
 * שומר על כלל אחד: ‎<Link>‎ **לא** מקבל ‎asset()‎.
 *
 * ⚠️  הבאג שהכלל הזה מונע היה סמוי לחלוטין עד לפריסה הראשונה
 *     בתת-נתיב. Next מוסיף את ה-‎basePath‎ ל-‎next/link‎ ול-‎next/image‎
 *     בעצמו; ‎asset()‎ קיים בשביל ‎src‎ של ‎<img>‎ רגיל ושל ‎<a>‎ רגיל,
 *     שאליהם Next **לא** מוסיף כלום. שילוב של השניים מכפיל את
 *     הנתיב — ‎/ayal-cohen/ayal-cohen/services/‎ — וכל הקישורים
 *     מובילים ל-404.
 *
 *     מקומית ‎BASE_PATH‎ ריק, ולכן ההכפלה היא בדיוק אפס והכול עובד.
 *     היא מתגלה רק ב-GitHub Pages. בדיקה, ולא זהירות.
 *
 * הרצה: חלק מ-‎prebuild‎, ולכן היא מפילה כל בנייה שמחזירה את הבאג.
 */
import fs from 'node:fs';
import path from 'node:path';

const roots = ['app', 'components'];
const bad = [];

/** ‎<Link ... href={asset(...)}‎ — גם כשהוא נפרס על כמה שורות. */
const LINK_ASSET = /<Link\b[^>]*?href=\{[^}]*\basset\(/gs;
/** ‎href={`${asset(...)}...`}‎ בתוך ‎<Link>‎ — אותו באג בתחפושת. */
const LINK_TEMPLATE = /<Link\b[^>]*?href=\{`[^`]*\$\{\s*asset\(/gs;

function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) { walk(p); continue; }
    if (!/\.tsx?$/.test(e.name)) continue;
    const src = fs.readFileSync(p, 'utf8');
    for (const re of [LINK_ASSET, LINK_TEMPLATE]) {
      re.lastIndex = 0;
      let m;
      while ((m = re.exec(src))) {
        const line = src.slice(0, m.index).split('\n').length;
        bad.push(`${p}:${line}`);
      }
    }
  }
}

for (const r of roots) if (fs.existsSync(r)) walk(r);

if (bad.length) {
  console.error('\n❌ ‎<Link>‎ עם ‎asset()‎ — ה-basePath יוכפל וכל הקישור יוביל ל-404:\n');
  for (const b of [...new Set(bad)]) console.error('   ' + b);
  console.error('\n   ב-‎<Link>‎ ‎href‎ הוא נתיב נקי: ‎href="/services"‎.');
  console.error('   ‎asset()‎ הוא ל-‎src‎ של ‎<img>‎ ול-‎href‎ של ‎<a>‎ רגיל בלבד.\n');
  process.exit(1);
}

console.log('בדיקת קישורים — תקין: אין ‎<Link>‎ עם ‎asset()‎');
