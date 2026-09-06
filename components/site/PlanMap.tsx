import { planMap } from '@/content/site';

/** גבהי העמודות באיור. עולה, אך לא ליניארי — כדי שייראה כמו נתון. */
const BARS = [28, 36, 34, 46, 56, 68, 80, 94];

/**
 * התוצר — מפת התכנון.
 *
 * מוצג כמסמך: כותרת, תוכן עניינים ממוספר, ואיור עם כיתוב. זו לא
 * החלטה דקורטיבית — הלקוח קונה מסמך, ולכן הסקשן שמסביר את הערך
 * צריך להיראות כמוהו.
 */
export default function PlanMap() {
  return (
    <section id="plan" className="section plan-section" aria-labelledby="plan-title">
      <div className="container plan-inner">
        <div className="plan-copy">
          <p className="eyebrow">{planMap.eyebrow}</p>
          <h2 id="plan-title" className="section-title">{planMap.title}</h2>
          <p className="section-lead">{planMap.lead}</p>
          <p className="plan-note">{planMap.note}</p>
        </div>

        <div className="doc">
          <div className="doc-head">
            <span className="doc-title">{planMap.docTitle}</span>
            <span className="doc-tag">{planMap.docTag}</span>
          </div>

          <ol className="doc-rows">
            {planMap.rows.map((row, i) => (
              <li key={row}>
                <span className="doc-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                <span className="doc-text">{row}</span>
              </li>
            ))}
          </ol>

          <figure className="doc-figure">
            <div className="doc-chart" aria-hidden="true">
              {BARS.map((h, i) => (
                <span
                  key={i}
                  className={`doc-bar${i >= BARS.length - 3 ? ' is-lit' : ''}`}
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
            <figcaption>
              <span>{planMap.figureCaption}</span>
              <span className="doc-figure-note">{planMap.figureNote}</span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
