import { dna } from '@/dna';
import { getSiteContent } from '@/lib/site-content';
import { faq, press } from '@/content/site';
import Hero from '@/components/site/Hero';
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
      sameAs: press.items.map((p) => p.href),
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
        {/* הסדר הוא הטיעון: בעיה → הוכחה שהתחקיר מוצא אותה → התוצר →
            מה נכלל → איך זה עובד → מי עושה את זה → הוכחה חיצונית.
            הוא גם מה שקובע את קצב הרקעים: כהה, בהיר, כהה, בהיר — ופס
            המותג הבהיר לא נוגע עוד במקרה מהשטח, שהיו נבלעים זה בזה. */}
        {on.hero && <Hero hero={c.hero} showStats={on.trust} />}
        {on.problem && <Problem />}
        {on.caseStudy && <CaseStudy />}
        {on.planMap && <PlanMap />}
        {on.services && <Services services={c.services} />}
        {on.process && <Process />}
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
