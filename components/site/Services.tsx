import Link from 'next/link';
import { asset } from '@/lib/asset';
import Icon from '@/components/site/Icon';
import type { SiteContent } from '@/lib/site-content';

/**
 * תחומי העיסוק.
 *
 * הרשימה המסורגלת שהייתה כאן נשאה את המידע אבל לא את המשקל — אזור
 * שירותים צריך להיראות כמו מה שקונים בו. כאן: הפריט הראשון הוא פאנל
 * כהה שתופס שתי עמודות (תכנון הפרישה המלא הוא המוצר, השאר נגזרות
 * ממנו), והחמישה האחרים כרטיסים עם ספרת רפאים גדולה ברקע, אייקון
 * וקו זהב שנמשך בריחוף.
 */
export default function Services({ services }: { services: SiteContent['services'] }) {
  const [lead, ...rest] = services.items;

  return (
    <section id="services" className="section" aria-labelledby="services-title">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">{services.eyebrow}</p>
          <h2 id="services-title" className="section-title">{services.title}</h2>
          <p className="section-lead">{services.lead}</p>
        </div>

        <ul className="svc-grid">
          <li className="svc-card svc-card-lead">
            <span className="svc-ghost" aria-hidden="true">01</span>
            <span className="svc-mark notch"><Icon name={lead.icon} size={30} /></span>
            <h3 className="svc-card-title">{lead.title}</h3>
            <p className="svc-card-text">{lead.text}</p>
            <Link className="arrow-link" href={asset('/services')}>
              לפירוט התהליך
              <span className="visually-hidden"> — {lead.title}</span>
            </Link>
          </li>

          {rest.map((item, i) => (
            <li key={item.title} className="svc-card">
              <span className="svc-ghost" aria-hidden="true">{String(i + 2).padStart(2, '0')}</span>
              <span className="svc-mark notch"><Icon name={item.icon} size={24} /></span>
              <h3 className="svc-card-title">{item.title}</h3>
              <p className="svc-card-text">{item.text}</p>
            </li>
          ))}
        </ul>

        <p className="section-more">
          <Link className="btn btn-secondary" href={asset('/services')}>
            לפירוט המלא של תחומי העיסוק
            <span className="btn-arrow" aria-hidden="true">←</span>
          </Link>
        </p>
      </div>
    </section>
  );
}
