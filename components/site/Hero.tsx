import { asset } from '@/lib/asset';
import { hero as heroContent } from '@/content/site';
import type { SiteContent } from '@/lib/site-content';

/** גבהי העמודות בגרף ההמחשה. עולה — אבל לא ליניארי, כדי שייראה כמו נתון. */
const BARS = [28, 36, 34, 46, 56, 68, 80, 94];

export default function Hero({ hero }: { hero: SiteContent['hero'] }) {
  const plan = heroContent.plan;

  return (
    <section className="hero" aria-labelledby="hero-title">
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
            {heroContent.proof.map((p) => <li key={p}>{p}</li>)}
          </ul>
        </div>

        {/* כרטיס מפת התכנון: מציג את מבנה התוצר, לא מספרים.
            סכומים לדוגמה בתחום הפנסיוני הם רגישים רגולטורית, והמבנה
            מסביר את הערך טוב יותר ממספר שממילא אינו נכון לאיש. */}
        <div className="hero-panel">
          <div className="plan-card">
            <div className="plan-head">
              <span className="plan-head-title">{plan.title}</span>
              <span className="plan-head-tag">{plan.tag}</span>
            </div>
            <ul className="plan-rows">
              {plan.rows.map((row, i) => (
                <li key={row} className="plan-row">
                  <span className="plan-row-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                  <span>{row}</span>
                </li>
              ))}
            </ul>
            <div className="plan-chart" aria-hidden="true">
              {BARS.map((h, i) => (
                <span
                  key={i}
                  className={`plan-bar${i >= BARS.length - 3 ? ' plan-bar-lit' : ''}`}
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
            <p className="plan-foot">
              <span>{plan.footStart}</span>
              <span>{plan.footEnd}</span>
            </p>
          </div>

          <p className="hero-badge">
            <span className="hero-badge-num">{heroContent.badge.value}</span>
            <span className="hero-badge-text">{heroContent.badge.text}</span>
          </p>
        </div>
      </div>
    </section>
  );
}
