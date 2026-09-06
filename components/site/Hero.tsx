import { asset } from '@/lib/asset';
import PhotoLayer from '@/components/site/PhotoLayer';
import { hero as heroContent, trust } from '@/content/site';
import type { SiteContent } from '@/lib/site-content';

/**
 * ההיררו.
 *
 * מה שהיה כאן קודם — כרטיס "מפת התכנון" — יצא לסקשן משלו. כרטיס עם
 * חמש שורות טקסט לצד הכותרת הראשית מפצל את המבט בדיוק ברגע שבו צריך
 * להיות לו יעד אחד. במקומו יושב כאן דיוקן: המותג הוא אדם, לא מוצר.
 *
 * רצועת המספרים היא חלק מהמשטח הכהה ולא כרטיס לבן שצף עליו — כך התפר
 * בין ההיררו לסקשן הבא נשאר קו אחד ולא שלושה.
 */
export default function Hero({
  hero, showStats = true,
}: {
  hero: SiteContent['hero'];
  showStats?: boolean;
}) {
  const p = heroContent.portrait;

  return (
    <section className="hero" aria-labelledby="hero-title">
      <PhotoLayer
        src={hero.image.src}
        scrim="linear-gradient(to left, rgba(7,24,44,.95) 0%, rgba(7,24,44,.78) 46%, rgba(7,24,44,.5) 100%)"
      />

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

        {/* מסגרת הדיוקן. סימני הפינה בזהב הם שפת הצורה של המותג —
            סימני יישור של מסמך, לא עוד כרטיס מעוגל. */}
        <figure className="portrait">
          <span className="portrait-frame">
            <img src={asset(p.src)} alt={p.alt} width={800} height={1000} />
          </span>
          <figcaption className="portrait-plate">
            <span className="portrait-name">{p.name}</span>
            <span className="portrait-role">{p.role}</span>
          </figcaption>
        </figure>
      </div>

      {showStats && (
      <div className="container">
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
