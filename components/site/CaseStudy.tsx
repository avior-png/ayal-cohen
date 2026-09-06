import { asset } from '@/lib/asset';
import PhotoLayer from '@/components/site/PhotoLayer';
import { caseStudy } from '@/content/site';

/**
 * מקרה מהשטח. בשלב ההשקה אין עדיין עדויות מתועדות מלקוחות קצה,
 * ולכן ההוכחה כאן היא עומק מקצועי מסופר — לא ציטוט שאי אפשר לאמת.
 * הפרטים המזהים שונו, וההסתייגות מופיעה בגוף הסקשן ולא באותיות קטנות.
 */
export default function CaseStudy() {
  return (
    <section className="section case" aria-labelledby="case-title">
      <PhotoLayer src="/images/paper.webp" />
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">{caseStudy.eyebrow}</p>
          <h2 id="case-title" className="section-title">{caseStudy.title}</h2>
        </div>

        <div className="case-panel">
          <div className="case-quote">
            <p>{caseStudy.quote}</p>
            <p>{caseStudy.body}</p>
            <p className="case-disclaimer">{caseStudy.disclaimer}</p>
          </div>

          <div className="case-aside">
            <div className="case-media">
              <img src={asset(caseStudy.image.src)} alt={caseStudy.image.alt}
                   width={1000} height={750} loading="lazy" />
            </div>
            <ul className="case-outcomes">
              {caseStudy.outcomes.map((o) => (
                <li key={o.title} className="case-outcome">
                  <span className="case-outcome-title">{o.title}</span>
                  <span className="case-outcome-text">{o.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
