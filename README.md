# אל ההון — איל כהן

אתר מותג אישי למתכנן פרישה וסוכן פנסיוני, בנוי על תשתית האתר-אב של BMF360.

Next.js 15 · React 19 · TypeScript · RTL · נגישות AA

> ⚠️ **תחום מפוקח.** לפני שינוי טקסט באתר או במערכת הניהול —
> [`docs/BRAND.md`](docs/BRAND.md), פרק 1. יש מונחים שאסור להשתמש בהם.

## הרצה

```bash
npm install
npm run dev      # http://localhost:3000
```

| פקודה | מה היא עושה |
|---|---|
| `npm run dev` | Next dev + שרת ה-Design Studio |
| `npm run build` | בדיקת פלטה, אפיית פתקי Studio, ובניית האפליקציה |
| `npm run db:seed` | מנהל ראשון + תוכן התחלה |
| `npm start` | הרצת האפליקציה הבנויה |

## מערכת ניהול

הלקוח נכנס ב-`/admin` ומנהל את התוכן בעצמו: טקסטים, תמונות, מאמרים,
שירותים, גלריה והמלצות. התחברות עם אימות דו-שלבי, הרשאות ופניות מהטופס.
ראה [`docs/CMS.md`](docs/CMS.md).

```bash
createdb sitebase && cp .env.example .env   # למלא DATABASE_URL ו-SESSION_SECRET
npx prisma migrate deploy && npm run db:seed
npm run dev                                  # http://localhost:3000/admin
```

## Design Studio

עורך ויזואלי חי לסגירת פינישים בעכבר: `http://localhost:3000/?edit`
**כלי פיתוח בלבד** — לא נכנס לבנייה לפרודקשן. ראה [`docs/DESIGN-STUDIO.md`](docs/DESIGN-STUDIO.md).

## קובץ ה-DNA

**`dna.ts`** בשורש הוא הקובץ היחיד שמגדיר מי האתר: מותג, צבעים, גופנים,
פרטי קשר, רכז נגישות, SEO, ואילו סקשנים מוצגים. ממנו נגזרים אוטומטית
משתני ה-CSS, טעינת הגופנים, המטא־דאטה והתפריט.

הפלטה נבדקת מול תקן AA בכל בנייה — צבע שלא עומד בניגודיות מפיל את
הבנייה. ראה [`docs/DNA.md`](docs/DNA.md).

## שכפול ללקוח חדש

| # | קובץ | מה מחליפים |
|---|---|---|
| 1 | **`dna.ts`** | שם, פרטי קשר, צבעים, גופנים, רכז נגישות, סקשנים פעילים |
| 2 | `content/site.ts` | נוסחי הטקסט של הסקשנים |
| 3 | `public/images/` | התמונות |

בפרויקט הזה נוספו לעיצוב `app/styles/ui.css` (רכיבים) ו-`app/styles/sections.css`
(סקשנים), ששניהם מיובאים מ-`app/globals.css`.

אחר כך `npm run check:dna`, `?edit` לסגירת הפינישים, ו-`npm run build`.

## העלאה לאוויר

האתר דורש שרת Node ומסד Postgres — מערכת הניהול קוראת עוגיות וטופס
יצירת הקשר הוא Server Action. אחסון סטטי בלבד אינו מספיק.

📄 **[`docs/DEPLOY.md`](docs/DEPLOY.md)** — מסלול QA בחמש דקות (בלי מסד),
המסלול המלא לפרודקשן, ומה לומר לבודקת מראש.

### Vercel + Neon — המסלול המומלץ
1. **neon.tech** → Create project → העתקת ה-Connection string
2. **vercel.com** → Import Git Repository → בחירת המאגר
3. Settings → Environment Variables → `DATABASE_URL` ו-`SESSION_SECRET`
4. Deploy

שניהם חינם ברמה שנדרשת לנו. ראה [`docs/CMS.md`](docs/CMS.md).

> **תת-נתיב:** אם האתר לא יושב בשורש הדומיין, יש להעביר `BASE_PATH=/הנתיב`
> בזמן הבנייה. בשורש — לא צריך כלום.

> ⚠️ **אחסון תמונות.** התמונות נשמרות ב-`public/uploads/` על הדיסק.
> ב-Vercel הדיסק אינו נשמר בין פריסות. לפני שלקוח מעלה תמונות יש לעבור
> לאחסון חיצוני (Vercel Blob / S3) — הכתיבה מרוכזת ב-`lib/media.ts`.

## מפת האתר

ארבעה עמודים ציבוריים, ועוד המסמכים המשפטיים ומערכת הניהול.

| עמוד | | עמוד | |
|---|---|---|---|
| `/` | עמוד הבית | `/contact` | יצירת קשר |
| `/about` | אודות איל כהן | `/accessibility` | הצהרת נגישות |
| `/services` · `/services/[id]` | תחומי עיסוק | `/terms` | תנאי שימוש |
| `/admin` | מערכת הניהול | `/privacy` | מדיניות פרטיות |
| | | `/sitemap.xml` · `/robots.txt` | SEO |

`gallery`, `testimonials` ו-`posts` **כבויים** ב-`dna.ts`: אין תיק עבודות
ויזואלי, בשלב ההשקה אין עדיין עדויות מתועדות, והבלוג נדחה לשלב מאוחר יותר.
כיבוי סקשן מסיר את העמוד, את הקישור בתפריט ואת השורה במפת האתר — בבת אחת.
הקוד והתוכן נשארים במקום; להדלקה צריך מתג אחד ב-`dna.ts`.

## סקשני עמוד הבית

היררו · רצועת אוטוריטה · הפער השקט · תחומי עיסוק · התהליך ·
אודות · מקרה מהשטח · בתקשורת · שאלות נפוצות · יצירת קשר

כל אחד מהם הוא מתג ב-`dna.sections`, והתוכן שלו ב-`content/site.ts`.

## מבנה

```
dna.ts        ★ ה-DNA של האתר — הקובץ שעורכים בכל פרויקט
prisma/       סכימת מסד הנתונים
lib/          מסד, אימות, תוכן, מדיה
app/admin/    מערכת הניהול
app/          layout, עמוד הבית, טוקנים ו-CSS גלובלי
components/   קומפוננטות האתר
content/      התוכן (יוחלף ב-CMS באותו מבנה)
studio/       Design Studio — dev בלבד
scripts/      שרת הסטודיו + אפייה
docs/         אפיון ותיעוד
```

## תיעוד

- [`docs/BRAND.md`](docs/BRAND.md) — ספר המותג: רגולציה, פלטה, טיפוגרפיה, טון
- [`docs/DNA.md`](docs/DNA.md) — קובץ ה-DNA
- [`docs/CMS.md`](docs/CMS.md) — מערכת הניהול והאבטחה
- [`docs/CLIENT-GUIDE.md`](docs/CLIENT-GUIDE.md) — מדריך ללקוח, בלי ז'רגון
- [`docs/SPEC.md`](docs/SPEC.md) — אפיון התשתית המלא
- [`docs/DESIGN-STUDIO.md`](docs/DESIGN-STUDIO.md) — העורך הוויזואלי
