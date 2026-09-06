import Link from 'next/link';
import { asset } from '@/lib/asset';
import { about as aboutContent } from '@/content/site';
import type { SiteContent } from '@/lib/site-content';

/**
 * אודות.
 *
 * בלי תצלום אמיתי של איל, האזור נשען כולו על טיפוגרפיה — ולכן היא
 * צריכה לעבוד קשה: פסקה ראשונה בגודל מוביל, ציטוט כפאנל כהה שהוא
 * מרכז הכובד הוויזואלי של האזור, וההסמכות כטבלת מפרט עם תוויות זהב.
 * הרקע החם מפריד את האזור מהלבן שמעליו ומתחתיו.
 */
export default function About({ about }: { about: SiteContent['about'] }) {
  const [first, ...restParagraphs] = about.paragraphs;

  return (
    <section id="about" className="section about" aria-labelledby="about-title">
      <div className="container about-inner">
        <div className="about-text">
          <p className="eyebrow">{about.eyebrow}</p>
          <h2 id="about-title" className="section-title about-title">{about.title}</h2>

          <p className="about-lead">{first}</p>
          {restParagraphs.map((p, i) => <p key={i} className="about-paragraph">{p}</p>)}

          <ul className="check-list about-points">
            {about.points.map((point) => <li key={point}>{point}</li>)}
          </ul>

          <p className="about-more">
            <Link className="arrow-link" href={asset('/about')}>הסיפור המלא והכשרות מקצועיות</Link>
          </p>
        </div>

        <aside className="about-aside">
          <blockquote className="about-quote">
            <span className="about-quote-mark" aria-hidden="true" />
            {aboutContent.quote}
          </blockquote>

          <dl className="spec">
            {aboutContent.credentials.map((c) => (
              <div key={c.text} className="spec-row">
                <dt className="spec-label">{c.year}</dt>
                <dd className="spec-value">{c.text}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>
    </section>
  );
}
