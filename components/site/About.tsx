import Link from 'next/link';
import { asset } from '@/lib/asset';
import { about as aboutContent } from '@/content/site';
import type { SiteContent } from '@/lib/site-content';

export default function About({ about }: { about: SiteContent['about'] }) {
  return (
    <section id="about" className="section section-alt" aria-labelledby="about-title">
      {/* אין כאן עמודת תמונה: ראה ההערה ב-content/site.ts תחת about.
          כשיתקבל תצלום אמיתי של איל — להחזיר .about-media לפני .about-text
          ולהחליף את about-inner-solo ב-about-inner. */}
      <div className="container about-inner about-inner-solo">
        <div className="about-text">
          <p className="eyebrow">{about.eyebrow}</p>
          <h2 id="about-title" className="section-title">{about.title}</h2>
          {about.paragraphs.map((p, i) => <p key={i} className="about-paragraph">{p}</p>)}

          <blockquote className="about-quote">{aboutContent.quote}</blockquote>

          <ul className="check-list">
            {about.points.map((point) => <li key={point}>{point}</li>)}
          </ul>

          <p className="card-link">
            <Link className="arrow-link" href={asset('/about')}>הסיפור המלא והכשרות מקצועיות</Link>
          </p>
        </div>
      </div>
    </section>
  );
}
