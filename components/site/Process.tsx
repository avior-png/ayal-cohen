import { asset } from '@/lib/asset';
import { process } from '@/content/site';

/** ארבעת שלבי העבודה, על משטח כהה — נקודת העצירה הכהה באמצע העמוד. */
export default function Process() {
  return (
    <section id="process" className="section on-dark process" aria-labelledby="process-title">
      <div className="container">
        <div className="section-head section-head-center">
          <p className="eyebrow">{process.eyebrow}</p>
          <h2 id="process-title" className="section-title">{process.title}</h2>
          <p className="section-lead">{process.lead}</p>
        </div>

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
