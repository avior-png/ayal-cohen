import { asset } from '@/lib/asset';
import PhotoLayer from '@/components/site/PhotoLayer';
import { process } from '@/content/site';

/**
 * ציר התכנון.
 *
 * ארבעה פאנלים קטומים תלויים על מסילת זהב אחת, כשמספר כל שלב הוא
 * חרוז שיושב *על* המסילה — רקע אטום, ולכן המסילה נכנסת אליו ויוצאת
 * ממנו — וגזע קצר מחבר את החרוז לפאנל שמתחתיו.
 *
 * הגרסה הקודמת הייתה ארבעה בלוקי טקסט חופשיים עם גל זהב שריחף
 * מעליהם ולא נגע בהם. היא נקראה כארבעה דברים, לא כתהליך אחד.
 */
export default function Process() {
  return (
    <section id="process" className="section on-dark process" aria-labelledby="process-title">
      {/* התצלום כרקע: ארבע התחנות שבו עומדות מאחורי ארבעת השלבים,
          והכהיה חזקה מספיק כדי שהקריאוּת לא תלויה בו. */}
      <PhotoLayer
        src={process.image.src}
        scrim="linear-gradient(rgba(7,24,44,.82), rgba(7,24,44,.9))"
      />
      <div className="container">
        <div className="section-head section-head-center">
          <p className="eyebrow">{process.eyebrow}</p>
          <h2 id="process-title" className="section-title">{process.title}</h2>
          <p className="section-lead">{process.lead}</p>
        </div>

        <div className="process-track">
          <span className="process-rail" aria-hidden="true" />

          <ol className="process-steps">
            {process.steps.map((step, i) => (
              <li key={step.title} className="step">
                <span className="step-node" aria-hidden="true">
                  <span className="step-num notch notch-outline">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </span>
                <div className="step-body notch notch-outline">
                  <h3 className="step-title">{step.title}</h3>
                  <p className="step-text">{step.text}</p>
                  <span className="step-meta notch notch-outline">{step.meta}</span>
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
