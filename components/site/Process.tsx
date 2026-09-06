import { asset } from '@/lib/asset';
import { process } from '@/content/site';

/**
 * ארבעת שלבי העבודה.
 *
 * הקו המחבר הוא חוט זהב מתעקל ולא קו ישר — אותו מוטיב שחוזר בתצלומי
 * המותג, שבהם חוט זהב אחד קושר בין העצמים. קו ישר הוא ברירת מחדל של
 * טיימליין; העיקול הוא מה שמחבר את הסקשן לשפה הוויזואלית.
 *
 * ה-viewBox נמתח לרוחב (preserveAspectRatio="none") כדי שהגלים ייפלו
 * על מרכזי המספרים בכל רוחב מסך; vector-effect שומר על עובי קו אחיד
 * למרות המתיחה הלא-אחידה.
 */
const WAVE =
  'M97.5 20 C88.4 6 80.6 6 71.5 20 C62.4 34 54.6 34 45.5 20 C36.4 6 28.6 6 19.5 20';

export default function Process() {
  return (
    <section id="process" className="section on-dark process" aria-labelledby="process-title">
      <div className="container">
        <div className="section-head section-head-center">
          <p className="eyebrow">{process.eyebrow}</p>
          <h2 id="process-title" className="section-title">{process.title}</h2>
          <p className="section-lead">{process.lead}</p>
        </div>

        <div className="process-track">
          <svg
            className="process-wave"
            viewBox="0 0 100 40"
            preserveAspectRatio="none"
            aria-hidden="true"
            focusable="false"
          >
            <path d={WAVE} vectorEffect="non-scaling-stroke" />
          </svg>

          <ol className="process-steps">
            {process.steps.map((step, i) => (
              <li key={step.title} className="step">
                <span className="step-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                <div className="step-body">
                  <h3 className="step-title">{step.title}</h3>
                  <p className="step-text">{step.text}</p>
                  <span className="step-meta">{step.meta}</span>
                </div>
              </li>
            ))}
          </ol>
        </div>

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
