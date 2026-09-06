import PhotoLayer from '@/components/site/PhotoLayer';
import { band } from '@/content/site';

/**
 * רגע מותג — פס תצלום ברוחב מלא בין שני סקשנים בהירים.
 * אין בו קריאה לפעולה: תפקידו לתת נשימה ולקבע את שפת המותג,
 * לא להוסיף עוד כפתור.
 */
export default function BrandBand({
  eyebrow = band.eyebrow,
  title = band.title,
  image = band.image,
}: {
  eyebrow?: string;
  title?: string;
  image?: { src: string; alt: string };
}) {
  return (
    <section className="brand-band on-dark" aria-label={title}>
      <PhotoLayer
        src={image.src}
        scrim="linear-gradient(rgba(5,22,35,.56), rgba(5,22,35,.56))"
        position="center 58%"
      />
      <div className="container brand-band-inner">
        <p className="eyebrow">{eyebrow}</p>
        <p className="brand-band-title">{title}</p>
      </div>
    </section>
  );
}
