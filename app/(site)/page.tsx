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
        {/* ‼️ זה אתר תדמית, לא כתבה.
            דף הבית הגיע ל-1,485 מילים ול-12,700px, והביקורת הייתה
            מדויקת: "נכנס לאתר ויש מלא מידע לפרצוף". לא משנה כמה טוב
            העיצוב — קורא שמקבל בפנים 1,500 מילים לא מקבל מסר.

            שבעה אזורים, כל אחד רעיון אחד, וכל פירוט עבר לעמוד שקיים
            לו ממילא:
              היררו      מי זה, מה הבעיה, ומה הצעד הראשון
              מה עושים   שלוש שורות: מה בודקים / מקבלים / נדרש ממך
              מה מתגלה   חמש כותרות; ההסבר נפתח בלחיצה
              מה מקבלים  התוצר — האזור הקונקרטי ביותר בעמוד
              איך עובד   ארבעה שלבים, כותרת וזמן בלבד
              מי זה      דיוקן, שתי שורות וציטוט
              בתקשורת    הוכחה חיצונית, קצרה מטבעה
            ואחריהם רצועת תחומי העיסוק (כותרות בלבד) וארבע שאלות.

            מקרה מהשטח ירד מדף הבית: 152 מילים על זכאות רפואית גרמו
            לאתר להיראות כאילו הוא עוסק במקרי קצה. משפט המחץ שלו עבר
            לאזור התהליך, שם הוא הטיעון היחיד שצריך; הסיפור המלא
            עבר ל-/who-its-for.

            הסדר גם קובע את קצב הרקעים: כהה, בהיר, כהה, בהיר. */}
        {on.hero && <Hero hero={c.hero} showStats={on.trust} />}
        {on.offer && <Offer />}
        {on.problem && <Problem />}
        {on.planMap && <PlanMap />}
        {on.process && <Process compact />}
        {on.about && <About about={c.about} />}
        {on.band && <BrandBand />}
        {on.press && <Press />}
        {on.services && <Services services={c.services} />}
        {on.faq && <Faq />}
        {on.gallery && <Gallery gallery={c.gallery} />}
        {on.testimonials && <Testimonials testimonials={c.testimonials} />}
        {on.posts && <Posts posts={c.posts} />}
        {on.contact && <ContactCta site={c.site} contact={c.contact} />}
      </main>
    </>
  );
}
