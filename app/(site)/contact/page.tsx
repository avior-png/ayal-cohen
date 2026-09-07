import type { Metadata } from 'next';
import { getSiteContent } from '@/lib/site-content';
import { requireSection } from '@/lib/page-guard';
import PageHeader from '@/components/site/PageHeader';
import Icon from '@/components/site/Icon';
import Faq from '@/components/site/Faq';
import ContactCta from '@/components/site/ContactCta';
import { asset } from '@/lib/asset';
import { contactImage, process as processContent } from '@/content/site';

export const metadata: Metadata = {
  title: 'יצירת קשר',
  description:
    'שיחת אבחון ראשונה עם איל כהן — ללא עלות ובלי התחייבות. משאירים פרטים וחוזרים אליכם תוך יום עסקים אחד.',
};

export default async function ContactPage() {
  requireSection('contact');
  const { site, contact } = await getSiteContent();

  return (
    <>
      <PageHeader
        title="נדבר?"
        crumbLabel="יצירת קשר"
        eyebrow={contact.eyebrow}
        lead="השיחה הראשונה נועדה להבין אם ואיך אפשר לעזור. אין בה מכירה, ואין אחריה התחייבות."
      />

      <main id="main">
        <section className="section-tight">
          <div className="container">
            <ul className="contact-cards">
              <li className="contact-card">
                <span className="contact-card-icon notch notch-outline"><Icon name="phone" /></span>
                <span className="contact-card-label">טלפון</span>
                <a className="contact-card-value" href={site.phoneHref}>{site.phone}</a>
              </li>
              <li className="contact-card">
                <span className="contact-card-icon notch notch-outline"><Icon name="mail" /></span>
                <span className="contact-card-label">אימייל</span>
                <a className="contact-card-value" href={`mailto:${site.email}`}>{site.email}</a>
              </li>
              <li className="contact-card">
                <span className="contact-card-icon notch notch-outline"><Icon name="clock" /></span>
                <span className="contact-card-label">זמינות</span>
                <span className="contact-card-value">{site.hours}</span>
              </li>
              <li className="contact-card">
                <span className="contact-card-icon notch notch-outline"><Icon name="pin" /></span>
                <span className="contact-card-label">פגישות</span>
                <span className="contact-card-value">{site.address}</span>
              </li>
            </ul>
          </div>
        </section>

        <ContactCta
          site={site}
          contact={{ ...contact, eyebrow: 'השארת פרטים', title: 'מה קורה אחרי שאתם שולחים' }}
        />

        <section className="section" aria-labelledby="next-title">
          <div className="container">
            <div className="section-head section-head-center">
              <p className="eyebrow">{processContent.eyebrow}</p>
              <h2 id="next-title" className="section-title">מכאן ממשיכים כך</h2>
            </div>
            <div className="wide-media" style={{ marginBottom: 'var(--space-xl)' }}>
              <img src={asset(contactImage.src)} alt={contactImage.alt}
                   width={1200} height={900} loading="lazy" />
            </div>
            <ol className="card-grid card-grid-4">
              {processContent.steps.map((step, i) => (
                <li key={step.title} className="card">
                  <span className="card-index" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="card-title">{step.title}</h3>
                  <p className="card-text">{step.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <Faq />
      </main>
    </>
  );
}
