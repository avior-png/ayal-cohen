import { asset } from '@/lib/asset';
import { caseStudy } from '@/content/site';

/**
 * מקרה מהשטח.
 *
 * שלוש הפעימות היו שלושה כרטיסים, ושלושה כרטיסים נראים כמו רשימה —
 * לא כמו סיפור. כאן הן יורדות על מסילת זהב אנכית: כל פעימה היא תחנה,
 * הקו שביניהן הוא הרצף, והמעבר מ"מה הגיע" ל"מה זה שינה" נקרא כתנועה.
 * התצלום יורד עד שולי הסקשן ומחזיק את הצד השני של המסך.
 */
export default function CaseStudy() {
  return (
    <section className="section on-dark case" aria-labelledby="case-title">
      <div className="case-photo">
        <img
          src={asset(caseStudy.image.src)}
          alt={caseStudy.image.alt}
          width={1200}
          height={900}
          loading="lazy"
        />
      </div>

      <div className="container case-inner">
        <div className="section-head">
          <p className="eyebrow">{caseStudy.eyebrow}</p>
          <h2 id="case-title" className="section-title">{caseStudy.title}</h2>
          <p className="section-lead">{caseStudy.lead}</p>
        </div>

        <ol className="rail">
          {caseStudy.beats.map((beat, i) => (
            <li key={beat.label} className="rail-step">
              <span className="rail-marker notch notch-outline" aria-hidden="true">
                <span className="rail-num">{String(i + 1).padStart(2, '0')}</span>
              </span>
              <div className="rail-body">
                <span className="rail-label">{beat.label}</span>
                <h3 className="rail-title">{beat.title}</h3>
                <p className="rail-text">{beat.text}</p>
              </div>
            </li>
          ))}
        </ol>

        <blockquote className="case-punch">{caseStudy.punch}</blockquote>
        <p className="case-disclaimer">{caseStudy.disclaimer}</p>
      </div>
    </section>
  );
}
