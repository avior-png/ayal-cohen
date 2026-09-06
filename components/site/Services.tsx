import Link from 'next/link';
import { asset } from '@/lib/asset';
import Icon from '@/components/site/Icon';
import type { SiteContent } from '@/lib/site-content';

export default function Services({ services }: { services: SiteContent['services'] }) {
  return (
    <section id="services" className="section" aria-labelledby="services-title">
      <div className="container">
        <div className="section-head section-head-center">
          <p className="eyebrow">{services.eyebrow}</p>
          <h2 id="services-title" className="section-title">{services.title}</h2>
          <p className="section-lead">{services.lead}</p>
        </div>

        <ul className="card-grid card-grid-3 reveal-stagger">
          {services.items.map((item, i) => (
            <li key={item.title} className="card service-card">
              <span className="card-head">
                <span className="card-icon"><Icon name={item.icon} /></span>
                <span className="card-index" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
              </span>
              <h3 className="card-title">{item.title}</h3>
              <p className="card-text">{item.text}</p>
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
