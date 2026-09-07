import type { Metadata } from 'next';
import Link from 'next/link';
import { db } from '@/lib/db';
import { getSiteContent } from '@/lib/site-content';
import { requireSection } from '@/lib/page-guard';
import { asset } from '@/lib/asset';
import { disclaimer, servicesBand } from '@/content/site';
import PageHeader from '@/components/site/PageHeader';
import Icon from '@/components/site/Icon';
import BrandBand from '@/components/site/BrandBand';
import Process from '@/components/site/Process';
import ContactCta from '@/components/site/ContactCta';

export const metadata: Metadata = {
  title: 'תחומי עיסוק',
  description:
    'תכנון פרישה מלא, קיבוע זכויות ותקרת ההון הפטור, תכנון מס ותיקון 190, טיפול בפיצויים, התאמת התיק הפנסיוני וליווי פיננסי שוטף.',
};

export default async function ServicesPage() {
  requireSection('services');
  const { services, site, contact } = await getSiteContent();

  // שירותים שנוספו במערכת הניהול מקבלים עמוד פנימי משלהם;
  // פריטי ה-Placeholder של התבנית מפנים לטופס.
  const rows = await db.service
    .findMany({ where: { status: 'PUBLISHED' }, orderBy: [{ order: 'asc' }, { createdAt: 'asc' }] })
    .catch(() => []);

  return (
    <>
      <PageHeader title={services.title} eyebrow={services.eyebrow} lead={services.lead} crumbLabel="תחומי עיסוק" />

      <main id="main">
        <section className="section">
          <div className="container">
            <ol className="service-rows">
              {services.items.map((item, i) => {
                const row = rows[i];
                /* רוב התחומים הם החלטה אחת ונגמרו, ולכן הם טקסט בלבד.
                   התצלום שמור לתחום היחיד שנמשך על פני שנים — הליווי
                   השוטף — ושם הוא אומר משהו שהטקסט לא אומר. */
                const image = item.image;
                return (
                  <li key={item.title} id={`svc-${i + 1}`}
                      className={'service-row' + (image ? ' service-row-media' : '')}>
                    <span className="service-row-index" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                    <span className="service-row-icon" aria-hidden="true"><Icon name={item.icon} size={28} /></span>
                    <div className="service-row-body">
                      <h2 className="service-row-title">{item.title}</h2>
                      <p className="service-row-text">{item.text}</p>
                      <Link className="arrow-link" href={asset(row ? `/services/${row.id}` : '/contact')}>
                        {row ? 'לפרטי השירות' : 'לשיחה בנושא הזה'}
                        <span className="visually-hidden"> — {item.title}</span>
                      </Link>
                    </div>
                    {image && (
                      <figure className="media-frame service-row-figure">
                        <img src={asset(image.src)} alt={image.alt}
                             width={image.width} height={image.height} loading="lazy" />
                      </figure>
                    )}
                  </li>
                );
              })}
            </ol>

            <p className="page-disclaimer">{disclaimer}</p>
          </div>
        </section>

        <BrandBand {...servicesBand} variant="object" />

        <Process />

        <ContactCta site={site} contact={contact} />
      </main>
    </>
  );
}
