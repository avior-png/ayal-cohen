import type { Metadata } from 'next';
import { getSiteContent } from '@/lib/site-content';
import { requireSection } from '@/lib/page-guard';
import { asset } from '@/lib/asset';
import { faqPage, disclaimer } from '@/content/site';
import PageHeader from '@/components/site/PageHeader';
import ContactCta from '@/components/site/ContactCta';

export const metadata: Metadata = {
  title: 'שאלות ותשובות',
  description:
    'מה זה דוח מסלקה, מתי מוקדם מדי לתכנן פרישה, מה ההבדל בין סוכן פנסיוני למתכנן פרישה, ' +
    'כמה זה עולה ומה אסור להבטיח — התשובות לשאלות שחוזרות בכל שיחה ראשונה.',
};

export default async function FaqPage() {
  requireSection('faq');
  const { site, contact } = await getSiteContent();

  // JSON-LD על כל השאלות בעמוד, לא רק על אלה שבדף הבית.
  const all = faqPage.groups.flatMap((g) => g.items);
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: all.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a.join(' ') },
    })),
  };

  return (
    <>
      <PageHeader
        title={faqPage.title}
        eyebrow={faqPage.eyebrow}
        lead={faqPage.lead}
        crumbLabel="שאלות נפוצות"
      />

      <main id="main">
        <section className="section">
          <div className="container qa-page">
            {/* תוכן עניינים דביק: ארבע-עשרה שאלות בעמוד אחד צריכות דרך
                לדלג, אחרת הגלילה היא כל החוויה. */}
            <nav className="qa-toc" aria-label="נושאי השאלות">
              <p className="qa-toc-title">על הדף</p>
              <ol>
                {faqPage.groups.map((g, i) => (
                  <li key={g.title}>
                    <a href={`#qa-${i}`}>
                      <span className="qa-toc-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                      {g.title}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            <div className="qa-groups">
              {faqPage.groups.map((group, gi) => (
                <section key={group.title} id={`qa-${gi}`} className="qa-group" aria-labelledby={`qa-t-${gi}`}>
                  <div className="qa-group-head">
                    <span className="qa-group-num notch" aria-hidden="true">{String(gi + 1).padStart(2, '0')}</span>
                    <h2 id={`qa-t-${gi}`} className="qa-group-title">{group.title}</h2>
                  </div>

                  <div className="faq-list">
                    {group.items.map((item) => (
                      /* בלי name= משותף: בעמוד שלם סגירה אוטומטית של
                         תשובה אחת בכל פתיחה היא מלכודת, לא נוחות. */
                      <details key={item.q} className="faq-item">
                        <summary>
                          <span>{item.q}</span>
                          <span className="faq-icon" aria-hidden="true" />
                        </summary>
                        <div className="faq-answer">
                          {item.a.map((p, i) => <p key={i}>{p}</p>)}
                        </div>
                      </details>
                    ))}
                  </div>
                </section>
              ))}

              <div className="qa-closing notch-start notch-outline">
                <h2 className="qa-closing-title">{faqPage.closing.title}</h2>
                <p className="qa-closing-text">{faqPage.closing.text}</p>
                <a className="btn btn-gold" href={asset('/contact')}>
                  לשיחת אבחון ללא עלות
                  <span className="btn-arrow" aria-hidden="true">←</span>
                </a>
              </div>

              <p className="page-disclaimer">{disclaimer}</p>
            </div>
          </div>
        </section>

        <ContactCta site={site} contact={contact} />
      </main>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
