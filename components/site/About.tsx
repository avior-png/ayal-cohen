import Link from 'next/link';
import { asset } from '@/lib/asset';
import { about as aboutContent } from '@/content/site';
import type { SiteContent } from '@/lib/site-content';

/**
 * אודות — בדף הבית זה תקציר, לא ביוגרפיה.
 *
 * קודם היו כאן שלוש פסקאות צפופות, ארבע נקודות וטבלת מפרט בת שש
 * שורות, וכל זה לצד דיוקן וציטוט. זה נקרא כעמוד שלם שנדחס לתוך
 * אזור, ולכן "מבולגן". עכשיו: פסקה אחת, שלוש הנקודות החזקות,
 * וקישור לעמוד שבו הכל נפרס כמו שצריך.
 *
 * העמודה הצדית היא זוג: מי זה (דיוקן) ומה הוא אומר (ציטוט). טבלת
 * ההסמכות ירדה מכאן — היא קיימת בעמוד האודות, ובדף הבית היא הייתה
 * גוזלת תשומת לב מהדיוקן בלי להוסיף מסר.
 */
export default function About({ about }: { about: SiteContent['about'] }) {
  const points = about.points.slice(0, 3);

  return (
    <section id="about" className="section about" aria-labelledby="about-title">
      <div className="container about-inner">
        <div className="about-text">
          <p className="eyebrow">{about.eyebrow}</p>
          <h2 id="about-title" className="section-title about-title">{about.title}</h2>

          {/* `short` ולא הפסקה הראשונה: זה אתר תדמית, והביוגרפיה
              המלאה — כולל הרישוי וההכשרות — היא ב-/about. */}
          <p className="about-lead">{aboutContent.short}</p>

          <ul className="check-list about-points">
            {points.map((point) => <li key={point}>{point}</li>)}
          </ul>

          <blockquote className="about-quote">
            <span className="about-quote-mark" aria-hidden="true" />
            {aboutContent.quote}
          </blockquote>

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
        </aside>
      </div>
    </section>
  );
}
