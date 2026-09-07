import Link from 'next/link';
import { asset } from '@/lib/asset';
import { about as aboutContent } from '@/content/site';
import type { SiteContent } from '@/lib/site-content';

/**
 * אודות.
 *
 * העמודה הצדית היא שלישייה שנקראת מלמעלה למטה: מי זה (דיוקן), מה הוא
 * אומר (ציטוט), ומה מאחורי זה (הסמכות כטבלת מפרט). הדיוקן ראשון כי
 * אמון באזור כזה מתחיל בפנים, וכל השאר הוא אימות שלו.
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
          <figure className="about-portrait">
            <img
              src={asset(aboutContent.image.src)}
              alt={aboutContent.image.alt}
              width={aboutContent.image.width}
              height={aboutContent.image.height}
              loading="lazy"
            />
          </figure>

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
