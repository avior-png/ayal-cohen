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

          {/* שורת כותרות העמודות — בלעדיה הטבלה נקראת כרשימה סתמית,
              ואי אפשר לדעת מה כל טור מוסר. */}
          <div className="report-cols" aria-hidden="true">
            <span>{problem.colFinding}</span>
            <span>{problem.colMeaning}</span>
            <span className="report-cols-status">{problem.colStatus}</span>
          </div>

          <ol className="report-rows">
            {problem.findings.map((f, i) => (
              <li key={f.title} className="report-row">
                <span className="report-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                <div className="report-finding">
                  <h3 className="report-row-title">{f.title}</h3>
                  <p className="report-row-text">{f.text}</p>
                </div>
                <p className="report-meaning">{f.meaning}</p>
                <span className="report-flag notch notch-outline">{f.flag}</span>
              </li>
            ))}
          </ol>

          <p className="report-foot">{problem.panelFoot}</p>
        </div>
      </div>
    </section>
  );
}
