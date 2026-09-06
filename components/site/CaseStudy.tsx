import { asset } from '@/lib/asset';
import { caseStudy } from '@/content/site';

/**
 * מקרה מהשטח.
 *
 * המסר הוא "תחקיר עמוק מוצא מה ששאלון מפספס", ולכן יש לו מבנה:
 * מה הגיע → מה עלה בתחקיר → מה זה שינה. התצלום מראה בדיוק את הרגע
 * הזה — יד שעוברת על מסמך — ולכן הוא יושב לצד הפעימות ולא מעליהן.
 */
export default function CaseStudy() {
  return (
    <section className="section on-dark case" aria-labelledby="case-title">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">{caseStudy.eyebrow}</p>
          <h2 id="case-title" className="section-title">{caseStudy.title}</h2>
          <p className="section-lead">{caseStudy.lead}</p>
        </div>

        <div className="case-inner">
          <ol className="beats">
            {caseStudy.beats.map((beat, i) => (
              <li key={beat.label} className="beat">
                <span className="beat-label">{beat.label}</span>
                <span className="beat-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="beat-title">{beat.title}</h3>
                <p className="beat-text">{beat.text}</p>
              </li>
            ))}
          </ol>

          <figure className="case-figure">
            <img
              src={asset(caseStudy.image.src)}
              alt={caseStudy.image.alt}
              width={1200}
              height={900}
              loading="lazy"
            />
          </figure>
        </div>

        <p className="case-punch">{caseStudy.punch}</p>
        <p className="case-disclaimer">{caseStudy.disclaimer}</p>
      </div>
    </section>
  );
}
