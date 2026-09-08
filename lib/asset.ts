/**
 * נתיב לנכס סטטי, מודע ל-basePath.
 *
 * Next מוסיף basePath אוטומטית ל-<Link> ול-next/image, אבל **לא** ל-src של
 * תג <img> רגיל או לכל נתיב שנכתב ידנית. כשהאתר מתארח בתת-נתיב
 * (למשל GitHub Pages תחת /HELLO/) כל הנתיבים האלה נשברים בלי העטיפה הזו.
 *
 * בפריסה לשורש הדומיין — המצב הרגיל אצל לקוח — BASE_PATH ריק והפונקציה
 * מחזירה את הנתיב כמו שהוא.
 */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

/**
 * ⚠️  ‎asset()‎ הוא ל-‎src‎ של ‎<img>‎ ול-‎href‎ של ‎<a>‎ **רגיל** בלבד.
 *     ל-‎next/link‎ ול-‎next/image‎ Next מוסיף את ה-‎basePath‎ בעצמו,
 *     ושילוב של השניים מכפיל אותו — ‎/REPO/REPO/services/‎ — וכל
 *     הקישורים מובילים ל-404. מקומית ‎BASE_PATH‎ ריק וההכפלה היא
 *     אפס, ולכן הבאג סמוי עד לפריסה הראשונה בתת-נתיב.
 *     ‎scripts/check-links.mjs‎ מפיל את הבנייה אם הוא חוזר.
 */
export function asset(p: string): string {
  if (/^(https?:|data:|mailto:|tel:|#)/.test(p)) return p;

  /* הקונפיג מגדיר ‎trailingSlash: true‎, ולכן נתיב של עמוד חייב
     להיגמר בלוכסן. בלעדיו השרת מחזיר הפניה 301 לפני שהוא מגיש
     את העמוד — עוד סבב רשת, ובאחסון סטטי גם מקום להשתבש. נתיב
     של קובץ (יש לו סיומת) נשאר כמו שהוא. */
  const isPage = !/\.[a-zA-Z0-9]+$/.test(p) && !p.endsWith('/');
  return `${BASE_PATH}${p}${isPage ? '/' : ''}`;
}
