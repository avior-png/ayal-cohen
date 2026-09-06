import { asset } from '@/lib/asset';
import { planMap } from '@/content/site';

/**
 * התוצר — מפת התכנון.
 *
 * כאן היה כרטיס מסמך שנבנה ב-CSS. הוא הסביר את המבנה, אבל תצלום של
 * התיק עצמו אומר את זה מיד ובלי לקרוא. הרקע החם (--paper) מקשר את
 * האזור לצבע הדפים בתצלום, והתצלום שקוף ולכן יושב על הרקע ישירות —
 * בלי קופסה לבנה ובלי צל נוסף, הצל כבר בקובץ.
 */
export default function PlanMap() {
  return (
    <section id="plan" className="section plan-section" aria-labelledby="plan-title">
      <div className="container plan-inner">
        <div className="plan-copy">
          <p className="eyebrow">{planMap.eyebrow}</p>
          <h2 id="plan-title" className="section-title">{planMap.title}</h2>
          <p className="section-lead">{planMap.lead}</p>

          <ol className="plan-rows">
            {planMap.rows.map((row, i) => (
              <li key={row}>
                <span className="plan-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                <span>{row}</span>
              </li>
            ))}
          </ol>

          <p className="plan-note">{planMap.note}</p>
        </div>

        <figure className="plan-figure">
          <img
            src={asset(planMap.image.src)}
            alt={planMap.image.alt}
            width={1400}
            height={933}
            loading="lazy"
          />
        </figure>
      </div>
    </section>
  );
}
