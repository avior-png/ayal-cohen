import PhotoLayer from '@/components/site/PhotoLayer';
import { problem } from '@/content/site';

/**
 * "מה בדרך כלל מתגלה".
 *
 * הגרסה הקודמת הייתה רשימה מסורגלת — נכונה בתוכן, אבל היא נקראה
 * כטקסט ולא כממצא. הקהל כאן שאנן, ולכן האזור צריך להיראות כמו מה
 * שהוא באמת: דוח בדיקה. כותרת דוח, שורות ממוספרות, ולכל שורה תווית
 * מצב בזהב שאומרת מה נמצא — "לא הותאם", "רדום", "לא נוצל".
 * התווית היא מה שהופך רשימה להתראה.
 *
 * התצלום ברקע רך מאוד ואינו תחת התוכן אלא מאחורי האזור כולו:
 * שכבות מסמכים זו מאחורי זו הן בדיוק המסר — כספים מפוזרים בין
 * גופים. קודם היה כאן תצלום מלא, והוא שבר את הקצב.
 */
export default function Problem() {
  return (
    <section id="problem" className="section problem" aria-labelledby="problem-title">
      <PhotoLayer
        className="problem-bg"
        src={problem.image.src}
        scrim="linear-gradient(rgba(246,248,251,.955), rgba(246,248,251,.985))"
      />
      <div className="container problem-inner">
        <div className="problem-aside">
          <div className="section-head">
            <p className="eyebrow">{problem.eyebrow}</p>
            <h2 id="problem-title" className="section-title">{problem.title}</h2>
            <p className="section-lead">{problem.lead}</p>
          </div>
          <p className="problem-note">{problem.note}</p>
        </div>

        <div className="report">
          <div className="report-head">
            <span className="report-title">{problem.panelTitle}</span>
            <span className="report-tag">{problem.panelTag}</span>
          </div>

          {/* סגור כברירת מחדל, ולא במקרה. פרוס, הטבלה הזו הייתה 311
              מילים — חצי מהטקסט בדף הבית — וכל מי שנכנס קיבל אותה
              בפנים. עכשיו הוא רואה חמש כותרות ופותח מה שמעניין אותו.
              שום מידע לא נמחק; הוא פשוט לא נכפה. */}
          <ol className="report-rows">
            {problem.findings.map((f, i) => (
              <li key={f.title}>
                <details className="report-row">
                  <summary>
                    <span className="report-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                    <h3 className="report-row-title">{f.title}</h3>
                    <span className="report-flag notch notch-outline">{f.flag}</span>
                    <span className="report-toggle" aria-hidden="true" />
                  </summary>
                  <div className="report-body">
                    <p className="report-row-text">{f.text}</p>
                    <p className="report-meaning">{f.meaning}</p>
                  </div>
                </details>
              </li>
            ))}
          </ol>

          <p className="report-foot">{problem.panelFoot}</p>
        </div>
      </div>
    </section>
  );
}
