import type { Metadata } from 'next';
import { getSiteContent } from '@/lib/site-content';
import { requireSection } from '@/lib/page-guard';
import { asset } from '@/lib/asset';
import { aboutPage, about as aboutSeed } from '@/content/site';
import PageHeader from '@/components/site/PageHeader';
import Icon from '@/components/site/Icon';
import Press from '@/components/site/Press';
import ContactCta from '@/components/site/ContactCta';

export const metadata: Metadata = {
  title: 'אודות איל כהן',
  description:
    'איל כהן - מתכנן פרישה וסוכן פנסיוני, 18 שנות ניסיון בענף הפיננסי ומפקח מקצועי על 250 סוכנים. הרקע, ההכשרות ושיטת העבודה.',
};

export default async function AboutPage() {
  requireSection('about');
  const { about, site, contact } = await getSiteContent();

  return (
    <>
      <PageHeader title="אודות איל כהן" eyebrow="מי עומד מאחורי התכנון" lead={aboutPage.lead} crumbLabel="אודות" />

      <main id="main">
        <section className="section">
          <div className="container about-inner">
            <div className="about-text">
              <h2 className="section-title">{about.title}</h2>
              {about.paragraphs.map((p, i) => <p key={i} className="about-paragraph">{p}</p>)}
              <blockquote className="about-quote">{aboutSeed.quote}</blockquote>
              <ul className="check-list">
                {about.points.map((point) => <li key={point}>{point}</li>)}
              </ul>
            </div>

            <aside className="about-aside">
              <figure className="about-portrait">
                <img
                  src={asset(aboutSeed.image.src)}
                  alt={aboutSeed.image.alt}
                  width={aboutSeed.image.width}
                  height={aboutSeed.image.height}
                  loading="eager"
                />
              </figure>
            </aside>
          </div>
        </section>

        <section className="section section-alt" aria-labelledby="credentials-title">
          <div className="container">
            <div className="section-head">
              <p className="eyebrow">רקע והכשרה</p>
              <h2 id="credentials-title" className="section-title">מה עומד מאחורי הכותרת</h2>
            </div>
            <ul className="credentials credentials-2col">
              {aboutSeed.credentials.map((c) => (
                <li key={c.text} className="credential">
                  <span className="credential-year">{c.year}</span>
                  <span className="credential-text">{c.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section" aria-labelledby="approach-title">
          <div className="container">
            <div className="section-head section-head-center">
              <p className="eyebrow">{aboutPage.approach.eyebrow}</p>
              <h2 id="approach-title" className="section-title">{aboutPage.approach.title}</h2>
              <p className="section-lead">{aboutPage.approach.lead}</p>
            </div>
            {/* היה כאן תצלום רחב של חדר עבודה עם עץ בחלון. הוא לא
                הוסיף דבר לארבעת הכרטיסים, והעץ הוא בדיוק הוויזואל
                הגנרי שהאתר הזה נגמל ממנו. */}
            <ul className="card-grid card-grid-2 reveal-stagger">
              {aboutPage.approach.items.map((item) => (
                <li key={item.title} className="card">
                  <span className="card-icon"><Icon name={item.icon} /></span>
                  <h3 className="card-title">{item.title}</h3>
                  <p className="card-text">{item.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <div className="section-alt"><Press /></div>

        <ContactCta site={site} contact={contact} />
      </main>
    </>
  );
}
