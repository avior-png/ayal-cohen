import PhotoLayer from '@/components/site/PhotoLayer';
import { band } from '@/content/site';

/**
 * רגע מותג — פס תצלום ברוחב מלא בין שני סקשנים בהירים.
 *
 * אין כאן eyebrow ואין כפתור: זה פס נשימה, ותווית מעל המשפט רק גוזלת
 * ממנו את הבמה. המילים "את כל התמונה" בזהב, כי הן הטיעון עצמו.
 */
export default function BrandBand({
  title = band.title,
  titleAccent = band.titleAccent,
  titleRest = band.titleRest,
  image = band.image,
}: {
  title?: string;
  titleAccent?: string;
  titleRest?: string;
  image?: { src: string; alt: string };
}) {
  return (
    <section className="brand-band on-dark" aria-label={`${title} ${titleAccent} ${titleRest}`}>
      <PhotoLayer
        src={image.src}
        scrim="linear-gradient(rgba(5,22,35,.56), rgba(5,22,35,.56))"
        position="center 58%"
      />
      <div className="container">
        <p className="brand-band-title">
          {title}{' '}
          <em className="accent">{titleAccent}</em>{' '}
          {titleRest}
        </p>
      </div>
    </section>
  );
}
