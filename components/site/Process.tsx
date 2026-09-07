import type React from 'react';
import { asset } from '@/lib/asset';
import { process, caseStudy } from '@/content/site';

/**
 * ציר התכנון.
 *
 * ארבעה פאנלים קטומים תלויים על מסילת זהב אחת, כשמספר כל שלב הוא
 * חרוז שיושב *על* המסילה — רקע אטום, ולכן המסילה נכנסת אליו ויוצאת
 * ממנו — וגזע קצר מחבר את החרוז לפאנל שמתחתיו.
 *
 * הגרסה הקודמת הייתה ארבעה בלוקי טקסט חופשיים עם גל זהב שריחף
 * מעליהם ולא נגע בהם. היא נקראה כארבעה דברים, לא כתהליך אחד.
 *
 * ⚠️  היה כאן תצלום רקע תחת הכהיה של 90–95%: כלומר טקסט על תצלום.
 *     התצלום לא נראה, והרעש שנשאר ממנו רק הקשה על הקריאה. עכשיו
 *     הרקע נייבי אחיד, והתצלום — בדף הבית בלבד — יושב *לצד*
 *     הכותרת כתמונה שרואים. רשימת השלבים נשארת טקסט על נייבי.
 *
 * `compact` — בדף הבית מוצגות רק הכותרת והמטא. התיאורים המלאים
 * מוצגים בעמודים הפנימיים, שאליהם מגיע מי שכבר רוצה לקרוא.
 */
export default function Process({ compact = false }: { compact?: boolean }) {
  return (
    <section id="process" className="section on-dark process" aria-labelledby="process-title">
      <div className="container">
        {/* בדף הבית: כותרת מימין, תצלום משמאל. בעמודים הפנימיים אין
            תצלום — האזור מופיע שם בפעם השנייה, ואותה סצנה פעמיים
            באותו ביקור היא חזרה, לא חיזוק. */}
        <div className={'process-head' + (compact ? ' media-split' : '')}>
          <div className={'section-head' + (compact ? '' : ' section-head-center')}>
            <p className="eyebrow">{process.eyebrow}</p>
            <h2 id="process-title" className="section-title">{process.title}</h2>
            <p className="section-lead">{process.lead}</p>
          </div>

          {compact && (
            <figure className="media-frame">
              <img
                src={asset(process.image.src)}
                alt={process.image.alt}
                width={process.image.width}
                height={process.image.height}
                loading="lazy"
              />
            </figure>
          )}
        </div>

        <div className="process-track">
          <span className="process-rail" aria-hidden="true" />

          <ol className="process-steps">
            {process.steps.map((step, i) => (
              <li key={step.title} className="step" style={{ '--i': i } as React.CSSProperties}>
                <span className="step-node" aria-hidden="true">
                  <span className="step-num notch notch-outline">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </span>
                <div className="step-body">
                  <h3 className="step-title">{step.title}</h3>
                  {/* בדף הבית רק הכותרת והזמן. ארבעה תיאורים של 35
                      מילים כל אחד הם 149 מילים שאף אחד לא קורא
                      בסריקה — הם קיימים במלואם ב-/services. */}
                  {!compact && <p className="step-text">{step.text}</p>}
                  <span className="step-meta">{step.meta}</span>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* המשפט הזה היה סוף אזור שלם של 152 מילים על מקרה מהשטח.
            כטיעון הוא עובד לבד, וכאן הוא במקומו: הוא מסביר למה
            השלב השני הוא שיחה ולא טופס. הסיפור המלא ב-/who-its-for. */}
        {compact && (
          <p className="process-punch">{caseStudy.punch}</p>
        )}

        <p className="section-more">
          <a className="btn btn-gold" href={asset('/contact')}>
            להתחיל בשלב הראשון
            <span className="btn-arrow" aria-hidden="true">←</span>
          </a>
        </p>
      </div>
    </section>
  );
}
