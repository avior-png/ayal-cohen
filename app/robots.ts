import type { MetadataRoute } from 'next';
import { dna } from '@/dna';

// נדרש לייצוא סטטי (npm run build:static). בבנייה הרגילה זה פשוט אומר
// שהקובץ נוצר בזמן הבנייה ומתרענן דרך revalidatePath, כמו שאר האתר.
export const dynamic = 'force-static';

/**
 * ⚠️  פריסה שאינה הדומיין בפרודקשן — QA, Preview של Vercel, כל כתובת
 *     שאינה זו שב-`dna.seo.siteUrl` — **חוסמת סריקה לגמרי**.
 *
 *     בלי זה עותק QA של אתר עסקי אמיתי נסרק ונכנס לאינדקס: תוכן
 *     כפול מול הדומיין האמיתי, ולקוח שמגיע לכתובת בדיקה עם טלפון
 *     Placeholder. ‎VERCEL_ENV‎ הוא 'production' רק בפריסת הפרודקשן
 *     של Vercel, ומחוץ ל-Vercel הוא לא קיים ואז אין מה לחסום.
 */
const isPreview =
  process.env.VERCEL_ENV !== undefined && process.env.VERCEL_ENV !== 'production';

export default function robots(): MetadataRoute.Robots {
  const base = dna.seo.siteUrl.replace(/\/$/, '');

  if (isPreview) {
    return { rules: [{ userAgent: '*', disallow: '/' }] };
  }

  return {
    rules: [{
      userAgent: '*',
      allow: '/',
      // מערכת הניהול לעולם לא נסרקת.
      disallow: ['/admin', '/admin/'],
    }],
    sitemap: `${base}/sitemap.xml`,
  };
}
