/**
 * ██  ה-DNA של האתר  ██
 *
 * הקובץ היחיד שמגדיר מי האתר הזה. בשכפול לפרויקט לקוח חדש —
 * זה הקובץ שעורכים, ובדרך כלל היחיד.
 *
 * ממנו נגזרים אוטומטית:
 *   • משתני ה-CSS (צבעים, גופנים, צורה, פריסה) — מוזרקים ב-app/layout.tsx
 *   • טעינת הגופנים מ-Google Fonts
 *   • תגיות ה-SEO וה-Open Graph
 *   • פרטי הקשר בכל האתר
 *   • הצהרת הנגישות והמסמכים המשפטיים
 *   • אילו סקשנים מוצגים בעמוד הבית
 *
 * מה לא כאן: נוסחי הטקסט של הסקשנים — הם ב-content/site.ts,
 * כי הם משתנים לפי תוכן ולא לפי זהות.
 *
 * ⚠️  הפלטה נבדקת אוטומטית מול תקן AA בכל בנייה (scripts/check-dna.mjs).
 *     צבע שלא עומד בניגודיות מפיל את הבנייה במקום להגיע לאוויר.
 */

import type { Dna } from '@/lib/dna';

export const dna: Dna = {
  // ─── מטא ────────────────────────────────────────────────────────────
  meta: {
    client: 'איל כהן — אל ההון',
    project: 'אתר מותג אישי · תכנון פרישה ופיננסים',
    version: '1.0.0',
    updated: '2026-09-06',
  },

  // ─── מותג ───────────────────────────────────────────────────────────
  brand: {
    name: 'אל ההון',
    shortName: 'אל ההון',
    // ⚠️ רגולציה: לא "יועץ פנסיוני". הכינויים המותרים הם
    //    "מתכנן פרישה" ו-"סוכן פנסיוני" בלבד. ראה docs/BRAND.md.
    tagline: 'תכנון פרישה שרואה את כל התמונה',
    logoMark: 'א',
    logoSrc: '/images/logo.svg',
  },

  // ─── ישות וקשר ──────────────────────────────────────────────────────
  // ⚠️ להשלים מול הלקוח: ח.פ., טלפון, אימייל, כתובת וקישורי הרשתות.
  identity: {
    legalName: 'איל כהן — תכנון פרישה ופיננסים',
    companyId: '000000000',
    phone: '03-000-0000',
    phoneHref: 'tel:+97230000000',
    whatsapp: 'https://wa.me/972500000000',
    email: 'office@el-hahon.co.il',
    address: 'ישראל — פגישות פרונטליות ובזום בכל הארץ',
    hours: "ימים א׳–ה׳, 09:00–18:00",
    /* `key` קובע איזה אייקון מוצג בפוטר — ראה components/site/SocialIcon.tsx.
       המפתחות האפשריים: linkedin | facebook | youtube | instagram | whatsapp.
       ⚠️  הקישורים כאן הם Placeholder ('#') וממתינים לכתובות האמיתיות. */
    social: [
      { key: 'linkedin', label: 'לינקדאין', href: '#' },
      { key: 'facebook', label: 'פייסבוק', href: '#' },
      { key: 'youtube', label: 'יוטיוב', href: '#' },
    ],
  },

  // ─── נגישות (חובה חוקית) ────────────────────────────────────────────
  accessibility: {
    level: 'AA',
    standard: 'ת"י 5568 / WCAG 2.1',
    coordinator: {
      name: 'איל כהן',
      email: 'access@el-hahon.co.il',
      phone: '03-000-0000',
    },
    statementUpdated: '2026-09-06',
  },

  // ─── עיצוב — כל מה שמשתנה בין מותג למותג ────────────────────────────
  design: {
    colors: {
      // כחול נייבי + זהב — הזהות הוויזואלית מהמצגות של איל.
      brand: '#12406E',
      brandStrong: '#0A2748',
      brandSoft: '#EDF2F8',

      // זהב בשלוש עוצמות: קישוט על בהיר, טקסט על בהיר, וזהב על כהה.
      accent: '#B0801F',
      accentStrong: '#8A5F12',
      accentSoft: '#FBF3E2',
      gold: '#D8B45A',

      bg: '#ffffff',
      bgAlt: '#F6F8FB',
      // רקע נייר חם — אזור התוצר. מפריד אותו מהאפור-כחלחל של bgAlt
      // ומקשר אותו לצבע הדפים במוקאפ של מפת התכנון.
      paper: '#F5F2EB',
      surface: '#ffffff',
      border: '#DFE6EF',

      // משטחים כהים — היררו, סקשן התהליך, ה-CTA והפוטר.
      ink: '#07182C',
      inkAlt: '#0D2440',
      onInk: '#ffffff',
      onInkMuted: '#B7C6D8',

      text: '#0B1B2E',
      textMuted: '#4A5B70',
      textOnBrand: '#ffffff',

      focus: '#A34E00',
      // חיווי הפוקוס על משטחים כהים — נדרש צבע בהיר.
      focusOnDark: '#FBD26A',
      error: '#B4231C',
      success: '#137A45',
    },

    fonts: {
      // Heebo לכותרות — סאנס עברי נקי ורציני, קריא מאוד בגדלים גדולים
      // ובמסכים של קהל 40+. Assistant לגוף, לקריאוּת בפסקאות ארוכות.
      // להחלפה: מספיק לשנות את family כאן, כל השאר נגזר.
      heading: { family: 'Heebo', weights: [600, 700, 800] },
      body: { family: 'Assistant', weights: [400, 500, 600, 700] },
      fallback: "system-ui, -apple-system, 'Segoe UI', Arial, sans-serif",
    },

    // פינות כמעט חדות. עיגול של 8px על כל כרטיס הוא חתימת התבנית
    // הגנרית; שפת הצורה כאן נגזרת ממסמך — פינה חתוכה וסימני פינה
    // בזהב — ולכן המשטחים עצמם נשארים ישרים.
    shape: {
      radiusSm: '2px',
      radius: '3px',
      radiusLg: '4px',
      radiusPill: '999px',
    },

    layout: {
      container: '1220px',
      containerNarrow: '720px',
    },
  },

  // ─── SEO ────────────────────────────────────────────────────────────
  seo: {
    siteUrl: 'https://el-hahon.co.il',
    titleTemplate: '%s | אל ההון — איל כהן',
    description:
      'איל כהן, מתכנן פרישה וסוכן פנסיוני עם 18 שנות ניסיון, מפקח מקצועי על 250 סוכנים. תכנון פרישה, קיבוע זכויות, תיקון 190 והתאמת תיק פנסיוני — תמונה פיננסית אחת, ברורה.',
    locale: 'he_IL',
    /* JPEG ולא PNG: הקומפוזיציה החדשה של ההיררו היא מדרון נייבי חלק,
       ו-PNG שומר אותו ב-183KB (או ב-98KB עם באנדינג נראה). JPEG
       באיכות 90 ובלי תת-דגימת צבע הוא 84KB בלי באנדינג, וכל הרשתות
       קוראות JPEG. */
    ogImage: '/images/og.jpg',
    analytics: { ga4: null, metaPixel: null },
  },

  // ─── אילו סקשנים מוצגים בעמוד הבית ──────────────────────────────────
  // gallery, testimonials ו-posts כבויים: אין תיק עבודות ויזואלי, בשלב
  // ההשקה אין עדיין עדויות מתועדות, והבלוג נדחה לשלב מאוחר יותר.
  // הכיבוי מסיר גם את העמודים וגם את הקישורים בתפריט — ומשאיר
  // אתר של ארבעה עמודים. התוכן נשאר ב-content/site.ts להדלקה עתידית.
  sections: {
    hero: true,
    trust: true,          // רצועת המספרים בתחתית ההיררו
    offer: true,          // "מה בעצם עושים כאן" — ההצעה בשפה פשוטה
    problem: true,
    caseStudy: true,
    planMap: true,
    services: true,
    process: true,
    about: true,
    band: true,           // פס התצלום שאחרי האודות
    press: true,
    faq: true,
    fit: true,             // עמוד "למי זה מתאים"
    gallery: false,
    testimonials: false,
    posts: false,
    contact: true,
  },

  // ─── תפריט ──────────────────────────────────────────────────────────
  nav: [
    { label: 'אודות', href: '/about', section: 'about' },
    { label: 'שירותים', href: '/services', section: 'services' },
    { label: 'למי זה מתאים', href: '/who-its-for', section: 'fit' },
    { label: 'שאלות נפוצות', href: '/faq', section: 'faq' },
    { label: 'גלריה', href: '/gallery', section: 'gallery' },
    { label: 'המלצות', href: '/testimonials', section: 'testimonials' },
    { label: 'מאמרים', href: '/blog', section: 'posts' },
    { label: 'צור קשר', href: '/contact', section: 'contact' },
  ],

  legalLinks: [
    { label: 'הצהרת נגישות', href: '/accessibility' },
    { label: 'מדיניות פרטיות', href: '/privacy' },
    { label: 'תנאי שימוש', href: '/terms' },
  ],
};

export default dna;
