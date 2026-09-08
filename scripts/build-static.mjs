/**
 * בנייה סטטית לאירוח ב-GitHub Pages.
 *
 * שני דברים שאי אפשר לעשות בקונפיג ולכן הם כאן:
 *
 * 1. **הסתרת מערכת הניהול מהניתוב.** ‎app/admin‎ קורא עוגיות ואינו
 *    ניתן לרינדור סטטי, ו-Next אינו מאפשר להחריג תיקיית ניתוב
 *    דרך הקונפיג. הפתרון: שינוי שם ל-‎_admin‎ לזמן הבנייה — תיקייה
 *    שמתחילה בקו תחתון היא **תיקייה פרטית** ואינה נתיב. השם מוחזר
 *    בסוף, גם כשהבנייה נכשלת.
 *
 * 2. **‎BASE_PATH‎.** ב-GitHub Pages של מאגר האתר יושב תחת ‎/REPO/‎,
 *    וכל נתיב מוחלט בלעדיו נשבר. נגזר מ-‎GITHUB_REPOSITORY‎ אם הוא
 *    קיים, ואפשר לדרוס.
 *
 * הרצה: ‎npm run build:static‎
 */
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { dna } from '../dna.ts';

const root = import.meta.dirname ? path.join(import.meta.dirname, '..') : process.cwd();

/**
 * תיקיות ניתוב שמסתירים לזמן הבנייה, בשינוי שם ל-‎_שם‎.
 *
 * • ‎app/admin‎ — קורא עוגיות, לא ניתן לרינדור סטטי.
 * • עמודי סקשנים **כבויים** — ‎requireSection‎ ממילא מחזיר עבורם 404
 *   בזמן ריצה, ולכן בייצוא סטטי אין להם מה לעשות. זה גם מה שפותר
 *   את ‎/blog/[slug]‎: ‎generateStaticParams‎ שלו נשען על המסד,
 *   שאינו קיים בבנייה סטטית, ו-‎output: 'export'‎ מסרב לנתיב דינמי
 *   בלי פרמטרים.
 */
const SECTION_ROUTES = {
  posts: path.join('app', '(site)', 'blog'),
  gallery: path.join('app', '(site)', 'gallery'),
  testimonials: path.join('app', '(site)', 'testimonials'),
};

/**
 * ⚠️  ‎generateStaticParams‎ שמחזיר מערך ריק נחשב ל-Next כאילו הוא
 *     **חסר**, ו-‎output: 'export'‎ מפיל את הבנייה. שני הנתיבים
 *     הדינמיים באתר נשענים על המסד — עמודי מאמר ועמודי שירות
 *     שנוספו במערכת הניהול — ובבנייה סטטית אין מסד ואין להם תוכן.
 *     בלעדיהם גם אין קישור אליהם: ‎/services‎ מפנה לטופס כשאין שורה
 *     במסד.
 */
const hide = [
  path.join('app', 'admin'),
  path.join('app', '(site)', 'services', '[id]'),
];
for (const [key, rel] of Object.entries(SECTION_ROUTES)) {
  if (!dna.sections[key]) hide.push(rel);
}

const [owner, repo] = (process.env.GITHUB_REPOSITORY || '').split('/');
const basePath = process.env.BASE_PATH ?? (repo ? `/${repo}` : '');

/**
 * כתובת האתר בפריסת ההדגמה. בלעדיה ה-canonical, ה-OG וה-sitemap
 * מצביעים לדומיין שעוד לא באוויר, והבודקת רואה מפת אתר של אתר אחר.
 */
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL
  || (owner && repo ? `https://${owner}.github.io/${repo}` : '');

/** [מקור, יעד] לכל תיקייה שהוסתרה בפועל — כדי להחזיר בסוף. */
const renamed = [];
for (const rel of hide) {
  const from = path.join(root, rel);
  if (!fs.existsSync(from)) continue;
  const to = path.join(path.dirname(from), `_${path.basename(from)}`);
  fs.renameSync(from, to);
  renamed.push([to, from]);
  console.log(`מוסתר מהניתוב: ${rel}`);
}

try {
  console.log(`בנייה סטטית · BASE_PATH="${basePath || '(שורש)'}" · SITE="${siteUrl || '(ברירת מחדל)'}"`);
  execSync('next build', {
    stdio: 'inherit',
    env: {
      ...process.env,
      BUILD_STATIC: '1',
      BASE_PATH: basePath,
      /* חוסם סריקה — ראה app/robots.ts. אתר ההדגמה לא מתחרה
         בדומיין האמיתי על אינדקס. */
      PAGES_DEMO: '1',
      ...(siteUrl ? { NEXT_PUBLIC_SITE_URL: siteUrl } : {}),
    },
  });

  /* ‎.nojekyll‎ — בלעדיו GitHub Pages מריץ Jekyll, והוא מתעלם מכל
     תיקייה שמתחילה בקו תחתון. ‎_next/‎ הוא כל ה-CSS וה-JS. */
  fs.writeFileSync(path.join(root, 'out', '.nojekyll'), '');
  console.log('נכתב out/.nojekyll');
} finally {
  /* גם כשהבנייה נכשלת — אחרת התיקיות נשארות מוסתרות ועץ העבודה שבור. */
  for (const [from, to] of renamed) {
    if (fs.existsSync(from)) fs.renameSync(from, to);
  }
}
