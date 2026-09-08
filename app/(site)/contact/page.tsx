import type { Metadata } from 'next';
import { getSiteContent } from '@/lib/site-content';
import { requireSection } from '@/lib/page-guard';
import PageHeader from '@/components/site/PageHeader';
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
        {/* ⚠️  הייתה כאן רצועה של ארבעה כרטיסים — טלפון, אימייל,
            זמינות, פגישות — ובאזור הטופס שמתחתיה מופיעות **אותן
            ארבע העובדות** שוב, ברשימה שלצד הטופס. אותו מידע פעמיים
            במסך אחד לא מחזק אותו, והוא בדיוק מה שהפך את העמוד
            לרצף של תיבות קטנות. הכותרת זורמת ישר לטופס. */}
        <ContactCta
          site={site}
          contact={{ ...contact, eyebrow: 'השארת פרטים', title: 'מה קורה אחרי שאתם שולחים' }}
        />

        <section className="section" aria-labelledby="next-title">
          <div className="container">
            {/* התצלום לצד הכותרת ולא מתחתיה: השלב השני ברשימה מדבר
                על "פגישה בזום או פרונטלית", וזה מה שרואים. */}
            <div className="media-split contact-next-head">
              <div className="section-head">
                <p className="eyebrow">{processContent.eyebrow}</p>
                <h2 id="next-title" className="section-title">מכאן ממשיכים כך</h2>
                <p className="section-lead">
                  ארבעה שלבים. הראשון הוא כמה שאלות קצרות, והשני הוא שיחה —
                  בזום או פנים אל פנים, מה שנוח לך.
                </p>
              </div>
              <figure className="media-frame">
                <img src={asset(contactImage.src)} alt={contactImage.alt}
                     width={contactImage.width} height={contactImage.height} loading="lazy" />
              </figure>
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
