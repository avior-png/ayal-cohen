import Link from 'next/link';
import { asset } from '@/lib/asset';
import Icon from '@/components/site/Icon';
import type { SiteContent } from '@/lib/site-content';

/**
 * תחומי העיסוק — רשימה מסורגלת בשתי עמודות, לא רשת כרטיסים.
 *
 * שש קופסאות זהות בשלוש עמודות הן החתימה של כל תבנית; קווי סרגל
 * ומספור נותנים את אותו מידע במבנה שקורא כמו מסמך ולא כמו קטלוג —
 * וזו גם אותה שפה של עמוד תחומי העיסוק, בצפיפות אחרת.
 */
export default function Services({ services }: { services: SiteContent['services'] }) {
  return (
    <section id="services" className="section" aria-labelledby="services-title">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">{services.eyebrow}</p>
          <h2 id="services-title" className="section-title">{services.title}</h2>
          <p className="section-lead">{services.lead}</p>
        </div>

        <ol className="svc-list">
          {services.items.map((item, i) => (
            <li key={item.title} className="svc">
              <span className="svc-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
              <span className="svc-icon" aria-hidden="true"><Icon name={item.icon} size={22} /></span>
              <h3 className="svc-title">{item.title}</h3>
              <p className="svc-text">{item.text}</p>
            </li>
          ))}
        </ol>

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
