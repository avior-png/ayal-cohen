import PhotoLayer from '@/components/site/PhotoLayer';
import { problem } from '@/content/site';

/**
 * "מה בדרך כלל מתגלה".
 *
 * האזור נראה כמו מה שהוא באמת: דוח בדיקה. כותרת דוח, שורת הסבר
 * למבנה, וחמש שורות ממוספרות.
 *
 * ⚠️  היו כאן תוויות מצב בזהב — "לא מרוכז", "לא הותאם", "רדום".
 *     הן נראו טוב ולא אמרו כלום, וזו הייתה הביקורת: "אני לא מבין
 *     מה זה הלא מרוכז". במקומן כל שורה מציגה מיד את *המשמעות* —
 *     מה הממצא אומר עליך בפועל — והפירוט נפתח בלחיצה.
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

          {/* מסביר את מבנה הפאנל. בלעדיו הקורא רואה חמש שורות ולא
              יודע מה הוא מסתכל עליו — וזו הייתה הביקורת. */}
          <p className="report-intro">{problem.panelIntro}</p>

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
                    <span className="report-finding">
                      <h3 className="report-row-title">{f.title}</h3>
                      {/* מוצג מיד ולא בהרחבה: זו התשובה ל"מה זה אומר
                          עליי", והיא מה שהופך ממצא לרלוונטי. */}
                      <span className="report-meaning">{f.meaning}</span>
                    </span>
                    <span className="report-toggle" aria-hidden="true" />
                  </summary>
                  <div className="report-body">
                    <p className="report-row-text">{f.text}</p>
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
