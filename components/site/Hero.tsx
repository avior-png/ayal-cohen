import { asset } from '@/lib/asset';
import { hero as heroContent, trust } from '@/content/site';
import type { SiteContent } from '@/lib/site-content';

/**
 * ההיררו.
 *
 * התצלום הוא קומפוזיציה מוכנה — איל על רקע הנייבי של המותג — והוא
 * ממלא את האזור כולו. הטקסט לא יושב *ליד* התצלום אלא *בתוך* השטח
 * שהקומפוזיציה השאירה לו פנוי, ולכן ההיררו עובד בשלושה מצבים:
 *
 *   ‎≥1200px‎  התצלום ממלא את האזור, הדמות בצד והטקסט בשאר הרוחב.
 *   ‎700–1199‎ התצלום מצטמצם לפאנל בצד — בכיסוי מלא הדמות הייתה
 *             מתנפחת ופולשת אל הטקסט, ראה ההערה ב-sections.css.
 *   ‎<700px‎   החיתוך המובייל: הדמות בתחתית, הטקסט באוויר שמעליה.
 *
 * שני החיתוכים הם `<picture>` עם art direction ולא srcset של אותה
 * תמונה — זו לא אותה קומפוזיציה בשני גדלים, אלה שתי קומפוזיציות.
 */
export default function Hero({
  hero, showStats = true,
}: {
  hero: SiteContent['hero'];
  showStats?: boolean;
}) {
  const { photo, photoMobile } = heroContent;

  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-photo">
          <picture>
            <source
              media="(max-width: 699px)"
              srcSet={asset(photoMobile.src)}
              width={photoMobile.width}
              height={photoMobile.height}
            />
            <img
              src={asset(photo.src)}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              loading="eager"
              fetchPriority="high"
            />
          </picture>
        </div>

        <div className="container hero-inner">
          <div className="hero-text">
            <p className="eyebrow">{hero.eyebrow}</p>
            <h1 id="hero-title" className="hero-title">
              {hero.title}
              <br />
              <span className="accent">{heroContent.titleAccent}</span>
            </h1>
            <p className="hero-lead">{hero.lead}</p>

            <div className="hero-actions">
              <a className="btn btn-gold" href={asset(hero.primaryCta.href)}>
                {hero.primaryCta.label}
                <span className="btn-arrow" aria-hidden="true">←</span>
              </a>
              <a className="btn btn-ghost-light" href={hero.secondaryCta.href}>
                {hero.secondaryCta.label}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* מחוץ ל-section בכוונה: ההיררו חותך את מה שגולש ממנו
          (overflow: hidden עבור התצלום), ובתוכו התיבה הייתה נחתכת
          בדיוק בקו התפר. כאן היא שכן יכולה לשבת עליו. */}
      {showStats && (
        <div className="container hero-stats-wrap">
          <ul className="hero-stats notch notch-outline" aria-label="נתונים בקצרה">
            {trust.map((item) => (
              <li key={item.label}>
                <span className="hero-stat-value">{item.value}</span>
                <span className="hero-stat-label">{item.label}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
