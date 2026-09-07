import type { Metadata } from 'next';
import { getSiteContent } from '@/lib/site-content';
import { requireSection } from '@/lib/page-guard';
import { asset } from '@/lib/asset';
import { fit, disclaimer } from '@/content/site';
import PageHeader from '@/components/site/PageHeader';
import Icon from '@/components/site/Icon';
import Process from '@/components/site/Process';
import CaseStudy from '@/components/site/CaseStudy';
import ContactCta from '@/components/site/ContactCta';

export const metadata: Metadata = {
  title: 'למי זה מתאים',
  description:
    'לפני פרישה, מכתב על קיבוע זכויות, פיצויים מסיום עבודה, בעל שליטה, אחרי פרישה או טיפול ' +
    'בהורה שפורש — המצבים שבהם בדיקת פרישה מסודרת עושה את ההבדל, ומה בדיוק היא בודקת.',
};

export default async function WhoItsForPage() {
  requireSection('fit');
  const { site, contact } = await getSiteContent();

  return (
    <>
      <PageHeader
        title={fit.title}
        eyebrow={fit.eyebrow}
        lead={fit.lead}
        crumbLabel="למי זה מתאים"
      />

      <main id="main">
        {/* פתיח: שתי עמודות שוות — טקסט קצר שנותן את כלל הקריאה של
            העמוד, ולצדו תצלום. בלעדיו העמוד נפתח בשש קופסאות. */}
        <section className="section-tight">
          <div className="container">
            <div className="media-split media-split-even fit-intro">
              <div className="section-head">
                <h2 className="section-title">{fit.intro.title}</h2>
                <p className="section-lead">{fit.intro.text}</p>
              </div>
              <figure className="media-frame">
                <img
                  src={asset(fit.intro.image.src)}
                  alt={fit.intro.image.alt}
                  width={fit.intro.image.width}
                  height={fit.intro.image.height}
                  loading="lazy"
                />
              </figure>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            {/* כל מצב הוא כרטיס דו-חלקי: מעליו התיאור, מתחתיו מה
                שהבדיקה בודקת — כדי שהמבקר יזהה את עצמו ואז יראה מה יקרה. */}
            <ul className="fit-grid reveal-stagger">
              {fit.cases.map((c, i) => (
                <li key={c.title} className="fit-card">
                  <div className="fit-card-top">
                    <span className="fit-card-icon" aria-hidden="true"><Icon name={c.icon} size={26} /></span>
                    <span className="fit-card-tag">{c.tag}</span>
                    <span className="fit-card-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <h2 className="fit-card-title">{c.title}</h2>
                  <p className="fit-card-text">{c.text}</p>
                  <div className="fit-card-checks">
                    <p className="fit-checks-title">מה הבדיקה בודקת כאן</p>
                    <ul className="check-list check-list-tight">
                      {c.checks.map((chk) => <li key={chk}>{chk}</li>)}
                    </ul>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* בלוק ההסתייגות בכהה: הוא לא הערת שוליים — הוא טיעון אמון. */}
        <section className="section not-for on-dark" aria-labelledby="not-for-title">
          <div className="container not-for-inner">
            <div className="not-for-head">
              <p className="eyebrow">{fit.notFor.eyebrow}</p>
              <h2 id="not-for-title" className="section-title">{fit.notFor.title}</h2>
              <p className="section-lead">{fit.notFor.lead}</p>
            </div>
            <ul className="not-for-list">
              {fit.notFor.items.map((item) => (
                <li key={item}>
                  <span className="not-for-mark" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* מקרה מהשטח ירד מדף הבית והגיע לכאן, וזה מקומו הנכון: כל
            העמוד הזה הוא מצבים קונקרטיים, והמקרה הוא אחד מהם. */}
        <CaseStudy />

        <Process />

        <section className="section section-alt">
          <div className="container">
            <div className="fit-next notch-start notch-outline">
              <div>
                <h2 className="fit-next-title">זיהית את עצמך באחד מהמצבים?</h2>
                <p className="fit-next-text">
                  שיחת האבחון היא 10–15 דקות, ללא עלות, ובסופה תדע אם יש כאן בכלל מה לבדוק.
                </p>
              </div>
              <div className="btn-row">
                <a className="btn btn-gold" href={asset('/contact')}>
                  לבדיקת פרישה ללא עלות
                  <span className="btn-arrow" aria-hidden="true">←</span>
                </a>
                <a className="btn btn-secondary" href={asset('/faq')}>שאלות נפוצות</a>
              </div>
            </div>

            <p className="page-disclaimer">{disclaimer}</p>
          </div>
        </section>

        <ContactCta site={site} contact={contact} />
      </main>
    </>
  );
}
