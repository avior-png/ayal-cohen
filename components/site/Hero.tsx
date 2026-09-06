import { asset } from '@/lib/asset';
import { hero as heroContent, trust } from '@/content/site';
import type { SiteContent } from '@/lib/site-content';

/**
 * ההיררו.
 *
 * תצלום אחד, חצי מסך, נוגע בשולי האזור — לא בתוך מסגרת ולא ככרטיס.
 * אין עליו טקסט ואין מעליו overlay; רק מעבר רך בקצה הפנימי שמחבר
 * אותו למשטח הנייבי, כדי שהמפגש בין השניים לא ייראה כחתך.
 *
 * במובייל הסדר מתהפך: כותרת וכפתורים קודם, התצלום אחריהם — מי שנכנס
 * מהטלפון צריך להגיע ל-CTA בלי לגלול תצלום.
 */
export default function Hero({
  hero, showStats = true,
}: {
  hero: SiteContent['hero'];
  showStats?: boolean;
}) {
  return (
    <section className="hero" aria-labelledby="hero-title">
      {/* התצלום ממוקם מוחלט בתוך .hero-main בלבד. אם הוא היה ממוקם מול
          ה-section כולו, הוא היה מכסה גם את רצועת המספרים שמתחת. */}
      <div className="hero-main">
        <div className="hero-photo">
          <img
            src={asset(heroContent.photo.src)}
            alt={heroContent.photo.alt}
            width={1568}
            height={1003}
            loading="eager"
            fetchPriority="high"
          />
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

            <ul className="hero-proof">
              {heroContent.proof.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
        </div>
      </div>

      {showStats && (
        <div className="container hero-stats-wrap">
          <ul className="hero-stats" aria-label="נתונים בקצרה">
            {trust.map((item) => (
              <li key={item.label}>
                <span className="hero-stat-value">{item.value}</span>
                <span className="hero-stat-label">{item.label}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
