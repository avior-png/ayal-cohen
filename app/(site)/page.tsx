import { dna } from '@/dna';
import { getSiteContent } from '@/lib/site-content';
import { faq, press } from '@/content/site';
import Hero from '@/components/site/Hero';
import Offer from '@/components/site/Offer';
import Problem from '@/components/site/Problem';
import Services from '@/components/site/Services';
import PlanMap from '@/components/site/PlanMap';
import Process from '@/components/site/Process';
import About from '@/components/site/About';
import BrandBand from '@/components/site/BrandBand';
import CaseStudy from '@/components/site/CaseStudy';
import Press from '@/components/site/Press';
import Faq from '@/components/site/Faq';
import Gallery from '@/components/site/Gallery';
import Testimonials from '@/components/site/Testimonials';
import Posts from '@/components/site/Posts';
import ContactCta from '@/components/site/ContactCta';

/**
 * העמוד נבנה סטטית ומתרענן דרך revalidatePath, שנקרא בכל פעולת תוכן
 * במערכת הניהול. כך העמוד מוגש מהמטמון — מהיר — ועדיין מתעדכן מיד.
 */
export default async function HomePage() {
  const on = dna.sections;
  const c = await getSiteContent();

  // Schema.org — כך מנוע החיפוש מזהה את בעל המקצוע ואת השאלות הנפוצות.
  const business = {
    '@context': 'https://schema.org',
    '@type': 'FinancialService',
    name: c.site.name,
    description: dna.seo.description,
    url: dna.seo.siteUrl,
    telephone: c.site.phone,
    email: c.site.email,
    areaServed: 'IL',
    inLanguage: 'he-IL',
    address: { '@type': 'PostalAddress', addressCountry: 'IL' },
    openingHours: c.site.hours,
    founder: {
      '@type': 'Person',
      name: 'איל כהן',
      jobTitle: 'מתכנן פרישה וסוכן פנסיוני',
      sameAs: [press.feature.href, ...press.items.map((p) => p.href)],
    },
  };

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a.join(' ') },
    })),
  };

  return (
    <>
      <script type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(business) }} />
      {on.faq && (
        <script type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      )}
      <main id="main">
        {/* הסדר הוא הטיעון, ומאז ביקורת "אני לא מבין מה עושים כאן"
            הוא מתחיל בבהירות ולא בטיעון: מה עושים כאן → מה מתגלה
            בבדיקה → מה מקבלים → מה נכלל → איך זה עובד → מקרה שמראה
            למה זו שיחה → מי עושה את זה → הוכחה חיצונית.

            מקרה מהשטח ירד מהמקום השלישי: הוא סיפור על זכאות רפואית,
            ובתור המסך השלישי הוא גרם לאתר להיראות כאילו הוא עוסק
            במקרי קצה. אחרי התהליך הוא עושה בדיוק את מה שהוא טוב בו —
            מסביר למה התהליך הוא שיחה ולא טופס.

            הסדר הוא גם מה שקובע את קצב הרקעים: כהה, בהיר, כהה, בהיר. */}
        {on.hero && <Hero hero={c.hero} showStats={on.trust} />}
        {on.offer && <Offer />}
        {on.problem && <Problem />}
        {on.planMap && <PlanMap />}
        {on.services && <Services services={c.services} />}
        {on.process && <Process />}
        {on.caseStudy && <CaseStudy />}
        {on.about && <About about={c.about} />}
        {on.band && <BrandBand />}
        {on.press && <Press />}
        {on.faq && <Faq />}
        {on.gallery && <Gallery gallery={c.gallery} />}
        {on.testimonials && <Testimonials testimonials={c.testimonials} />}
        {on.posts && <Posts posts={c.posts} />}
        {on.contact && <ContactCta site={c.site} contact={c.contact} />}
      </main>
    </>
  );
}
