import { asset } from '@/lib/asset';
import { faq } from '@/content/site';

/**
 * אקורדיון על <details>/<summary> — נגיש ועובד גם בלי JavaScript.
 * הכותרות הן <h3> בתוך ה-summary כדי שקורא מסך יוכל לנווט ביניהן.
 */
export default function Faq() {
  return (
    <section id="faq" className="section section-alt" aria-labelledby="faq-title">
      <div className="container faq-inner">
        <div className="faq-aside">
          <div className="section-head">
            <p className="eyebrow">{faq.eyebrow}</p>
            <h2 id="faq-title" className="section-title">{faq.title}</h2>
            <p className="section-lead">{faq.lead}</p>
          </div>
          <a className="btn btn-secondary" href={asset('/contact')}>
            לשאלה שלא נמצאת כאן
            <span className="btn-arrow" aria-hidden="true">←</span>
          </a>
        </div>

        <div className="faq-list">
          {faq.items.map((item) => (
            <details key={item.q} className="faq-item" name="faq">
              <summary>
                <span>{item.q}</span>
                <span className="faq-icon" aria-hidden="true" />
              </summary>
              <div className="faq-answer">
                {item.a.map((p, i) => <p key={i}>{p}</p>)}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
