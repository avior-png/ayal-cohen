import { asset } from '@/lib/asset';
import { band } from '@/content/site';

/**
 * רגע ההמרה של אמצע העמוד — פס בין שני סקשנים.
 *
 * ⚠️  היה כאן אפוריזם ("החלטות טובות מתחילות בלראות את כל התמונה"),
 *     והוא נשמע כמו ציטוט. זו בדיוק הייתה הבעיה: פס בגובה 520px
 *     באמצע העמוד שלא נותן לקורא שום דבר לעשות איתו הוא חלל.
 *     עכשיו: טיעון קונקרטי, פסקה שמסבירה מה עושים איתו, וכפתור.
 *
 * ⚠️  והיה כאן גם תצלום רקע ברוחב מלא תחת הכהיה. תצלום שהטקסט יושב
 *     עליו הוא תצלום שאיש לא רואה — ואם צריך הכהיה של 60% כדי
 *     שהטקסט ייקרא, עדיף בלעדיו. שתי הווריאציות שנשארו מציגות את
 *     הוויזואל **בצד** הטקסט ולא מתחתיו:
 *
 *     `object` — חיתוך שקוף (הטבעות). יושב על הנייבי בלי מסגרת.
 *     `split`  — תצלום שזולג מהשוליים השמאליים ונמסך אל תוך הנייבי
 *                בגרדיאנט. ⚠️  היה כאן תצלום במסגרת 4:3 והוא נראה
 *                כמו תמונה שהודבקה בפס — מלבן עם צל באמצע שדה
 *                נייבי. תצלום שזולג ונמסך הוא חלק מהאזור.
 *
 * שלוש הדרגות בטקסט: הטיעון (גדול, וחלקו בזהב — הוא הנקודה),
 * ההסבר (בינוני), והפעולה.
 */
export default function BrandBand({
  title = band.title,
  titleAccent = band.titleAccent,
  lead = band.lead,
  cta = band.cta,
  image = band.image,
  variant = 'split',
}: {
  title?: string;
  titleAccent?: string;
  lead?: string;
  cta?: { label: string; href: string };
  image?: { src: string; alt: string; width?: number; height?: number };
  variant?: 'object' | 'split';
}) {
  const isObject = variant === 'object';

  return (
    <section
      className={'brand-band on-dark ' + (isObject ? 'brand-band-object' : 'brand-band-split')}
      aria-labelledby="band-title"
    >
      {/* שכבת התצלום זולגת מהשוליים השמאליים ונמסכת אל הנייבי.
          בדסקטופ היא תופסת את החצי השמאלי והטקסט יושב מימין; במסך
          צר היא רצועה עליונה שדוהה כלפי מטה, והטקסט מתחתיה. */}
      {!isObject && (
        <div className="band-photo-bleed" aria-hidden="true">
          <img
            src={asset(image.src)}
            alt=""
            width={image.width}
            height={image.height}
            loading="lazy"
          />
        </div>
      )}
      <div className="container">
        <div className="band-split">
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

          {isObject && (
            <figure className="band-object">
              <img
                src={asset(image.src)}
                alt={image.alt}
                width={image.width}
                height={image.height}
                loading="lazy"
              />
            </figure>
          )}
        </div>
      </div>
    </section>
  );
}
