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
 * רגע מותג — פס תצלום ברוחב מלא בין שני סקשנים בהירים.
 *
 * הקומפוזיציה ממורכזת ובנויה בשלוש דרגות: הנחה (קטן ומרוּוח),
 * הטיעון (גדול, בזהב) והמסקנה (בינוני, בלבן). אין כאן eyebrow
 * ואין כפתור: זה פס נשימה, וכל תווית נוספת גוזלת מהמשפט את הבמה.
 */
export default function BrandBand({
  title = band.title,
  titleAccent = band.titleAccent,
  titleRest = band.titleRest,
  image = band.image,
  align = 'center',
  scrim,
  position = 'center 58%',
}: {
  title?: string;
  titleAccent?: string;
  titleRest?: string;
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
      aria-label={`${title} ${titleAccent} ${titleRest}`}
    >
      {/* וינייטה ולא הכהיה אחידה: כהה במרכז שבו יושב הטקסט, מתבהרת
          בשוליים ומשאירה את התצלום עצמו נראה. */}
      <PhotoLayer
        src={image.src}
        scrim={scrim ?? (centered ? BAND_SCRIM_CENTER : BAND_SCRIM_FLAT)}
        position={position}
      />
      <div className="container">
        <figure className="brand-band-inner">
          <span className="band-rule" aria-hidden="true" />
          {/* דרגה אחת פר שורה: ההנחה, הטיעון, המסקנה. */}
          <p className="brand-band-title">
            <span className="band-lead">{title}</span>
            <span className="band-hero">{titleAccent}</span>
            <span className="band-tail">{titleRest}</span>
          </p>
          <span className="band-rule band-rule-end" aria-hidden="true" />
        </figure>
      </div>
    </section>
  );
}
