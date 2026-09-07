import type React from 'react';
import { asset } from '@/lib/asset';
import PhotoLayer from '@/components/site/PhotoLayer';
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
 * `compact` — בדף הבית מוצגות רק הכותרת והמטא. התיאורים המלאים
 * מוצגים בעמודים הפנימיים, שאליהם מגיע מי שכבר רוצה לקרוא.
 */
export default function Process({ compact = false }: { compact?: boolean }) {
  return (
    <section id="process" className="section on-dark process" aria-labelledby="process-title">
      {/* התצלום כרקע: ארבע התחנות שבו עומדות מאחורי ארבעת השלבים.
          ההכהיה חזקה במיוחד — אחרי שהאזור התקצר, ‎cover‎ מציג חלק
          בהיר יותר של התצלום והפאנלים נבלעו בו. */}
      <PhotoLayer
        src={process.image.src}
        scrim="linear-gradient(rgba(7,24,44,.9), rgba(7,24,44,.95))"
      />
      <div className="container">
        <div className="section-head section-head-center">
          <p className="eyebrow">{process.eyebrow}</p>
          <h2 id="process-title" className="section-title">{process.title}</h2>
          <p className="section-lead">{process.lead}</p>
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
