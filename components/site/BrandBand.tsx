import { asset } from '@/lib/asset';
import PhotoLayer from '@/components/site/PhotoLayer';
import { band } from '@/content/site';

/* בקומפוזיציה ממורכזת הטקסט יושב על מרכז התצלום, ולכן ההכהיה
   מרוכזת שם ומתבהרת בשוליים. בקומפוזיציה מיושרת-התחלה הטקסט מפנה
   את המרכז לוויזואל, ואז די בהכהיה אחידה. */
const BAND_SCRIM_CENTER =
  'radial-gradient(ellipse 62% 78% at 50% 50%, ' +
  'rgba(5,22,35,.88), rgba(5,22,35,.62) 62%, rgba(5,22,35,.44))';
const BAND_SCRIM_FLAT = 'linear-gradient(rgba(5,22,35,.6), rgba(5,22,35,.6))';

/**
 * רגע ההמרה של אמצע העמוד — פס תצלום ברוחב מלא בין שני סקשנים.
 *
 * ⚠️  היה כאן אפוריזם ("החלטות טובות מתחילות בלראות את כל התמונה"),
 *     והוא נשמע כמו ציטוט. זו בדיוק הייתה הבעיה: פס בגובה 520px
 *     באמצע העמוד שלא נותן לקורא שום דבר לעשות איתו הוא חלל.
 *     עכשיו: טיעון קונקרטי, פסקה שמסבירה מה עושים איתו, וכפתור.
 *
 * שלוש הדרגות: הטיעון (גדול, וחלקו בזהב — הוא הנקודה), ההסבר
 * (בינוני), והפעולה. `align="start"` לעמוד שבו הוויזואל א-סימטרי
 * ותופס את המרכז — ראה ההערה ב-sections.css.
 */
export default function BrandBand({
  title = band.title,
  titleAccent = band.titleAccent,
  lead = band.lead,
  cta = band.cta,
  image = band.image,
  align = 'center',
  scrim,
  position = 'center 58%',
}: {
  title?: string;
  titleAccent?: string;
  lead?: string;
  cta?: { label: string; href: string };
  image?: { src: string; alt: string };
  /** 'center' לתצלום סימטרי, 'start' כשהוויזואל א-סימטרי ותופס את המרכז. */
  align?: 'center' | 'start';
  scrim?: string;
  position?: string;
}) {
  const centered = align === 'center';

  return (
    <section
      className={`brand-band on-dark${centered ? '' : ' brand-band-start'}`}
      aria-labelledby="band-title"
    >
      <PhotoLayer
        src={image.src}
        scrim={scrim ?? (centered ? BAND_SCRIM_CENTER : BAND_SCRIM_FLAT)}
        position={position}
      />
      <div className="container">
        <div className="brand-band-inner">
          <span className="band-rule" aria-hidden="true" />
          <p id="band-title" className="brand-band-title">
            <span className="band-lead">{title}</span>
            <span className="band-hero">{titleAccent}</span>
          </p>
          <p className="band-note">{lead}</p>
          <a className="btn btn-gold" href={asset(cta.href)}>
            {cta.label}
            <span className="btn-arrow" aria-hidden="true">←</span>
          </a>
        </div>
      </div>
    </section>
  );
}
