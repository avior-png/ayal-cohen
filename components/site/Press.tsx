import Icon from '@/components/site/Icon';
import { asset } from '@/lib/asset';
import { press } from '@/content/site';

/**
 * בתקשורת.
 *
 * שלושה כרטיסים זהים נתנו לכתבה בגלובס בדיוק את אותו משקל שקיבל פודקאסט
 * — ובשלב השקה, שבו אין עדיין עדויות מלקוחות, הכתבה בעיתונות הכלכלית
 * המרכזית היא ההוכחה החזקה שיש. לכן היא מקבלת פאנל כהה משלה, והפודקאסטים
 * יורדים לשורות מסורגלות שקוראות כמו רשימת הופעות.
 */
export default function Press() {
  const f = press.feature;

  return (
    <section className="section press" aria-labelledby="press-title">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">{press.eyebrow}</p>
          <h2 id="press-title" className="section-title">{press.title}</h2>
          <p className="section-lead">{press.lead}</p>
        </div>

        <div className="press-inner">
          <div className="press-list">
            <a className="press-feature notch" href={f.href} target="_blank" rel="noopener noreferrer">
              <span className="press-feature-top">
                <span className="press-mark" aria-hidden="true"><Icon name={f.icon} size={22} /></span>
                <span className="press-kind">{f.kind}</span>
              </span>
              <span className="press-source-lg">{f.source}</span>
              <span className="press-feature-title">{f.title}</span>
              <span className="press-feature-note">{f.note}</span>
              <span className="press-feature-cta">
                {f.cta}
                <span className="btn-arrow" aria-hidden="true">←</span>
              </span>
              <span className="visually-hidden">(נפתח בחלון חדש)</span>
            </a>

            <ul className="press-rows">
              {press.items.map((item) => (
                <li key={item.href}>
                  <a className="press-row" href={item.href} target="_blank" rel="noopener noreferrer">
                    <span className="press-mark" aria-hidden="true"><Icon name={item.icon} size={20} /></span>
                    <span className="press-row-body">
                      <span className="press-source">{item.source}</span>
                      <span className="press-row-title">{item.title}</span>
                      <span className="press-kind">{item.kind}</span>
                    </span>
                    <span className="press-row-go" aria-hidden="true">←</span>
                    <span className="visually-hidden">(נפתח בחלון חדש)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <figure className="press-figure">
            <img
              src={asset(press.image.src)}
              alt={press.image.alt}
              width={1200}
              height={800}
              loading="lazy"
            />
          </figure>
        </div>
      </div>
    </section>
  );
}
