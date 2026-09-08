import Link from 'next/link';
import { getSiteContent } from '@/lib/site-content';
import Header from '@/components/site/Header';
import Footer from '@/components/site/Footer';
import PageHeader from '@/components/site/PageHeader';

export const metadata = { title: 'העמוד לא נמצא' };

/**
 * 404 בשורש העץ.
 *
 * ⚠️  ‎app/(site)/not-found.tsx‎ תופס רק כתובות **בתוך** קבוצת
 *     המסלולים. כתובת שאינה מתאימה לשום מסלול נופלת ל-404 של
 *     השורש — וכשהוא לא קיים, Next מגיש את שלו: "404: This page
 *     could not be found", באנגלית, בלי עיצוב ובלי כותרת ופוטר.
 *
 *     באחסון סטטי זה לא תקלה תיאורטית: GitHub Pages מגיש את
 *     ‎/404.html‎ לכל כתובת לא מזוהה, ולכן כל טעות הקלדה בכתובת
 *     הובילה לעמוד השגיאה הפנימי של Next.
 *
 * הקומפוננטה הזו יושבת ישירות תחת ‎app/layout.tsx‎ ולכן היא מביאה
 * את הכותרת והפוטר בעצמה — הן מגיעות מ-‎(site)/layout.tsx‎, שאינו
 * חל כאן.
 */
export default async function RootNotFound() {
  const { site } = await getSiteContent();

  return (
    <>
      <Header site={site} />
      <PageHeader
        title="העמוד לא נמצא"
        lead="ייתכן שהכתובת השתנתה, או שהעמוד הוסר."
      />
      <main id="main">
        <div className="section">
          <div className="container container-narrow prose">
            <p>אפשר לחזור לעמוד הבית, או לפנות אלינו ונעזור למצוא את מה שחיפשתם.</p>
            <p className="btn-row">
              <Link className="btn btn-primary" href="/">לעמוד הבית</Link>
              <Link className="btn btn-secondary" href="/contact">צרו קשר</Link>
            </p>
          </div>
        </div>
      </main>
      <Footer site={site} />
    </>
  );
}
