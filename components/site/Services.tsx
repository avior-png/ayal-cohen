import Link from 'next/link';
import { asset } from '@/lib/asset';
import Icon from '@/components/site/Icon';
import type { SiteContent } from '@/lib/site-content';

/**
 * תחומי העיסוק — בדף הבית זו רצועת התמצאות, לא קטלוג.
 *
 * קודם היו כאן שישה כרטיסים עם גוף טקסט: 249 מילים, שישית מכל
 * הטקסט בעמוד. אתר תדמית לא מבקש מהקורא לקרוא שישה תיאורי שירות
 * לפני שהוא יודע אם להרים טלפון — הוא צריך לענות על שאלה אחת,
 * "האם מה שמטריד אותי נכלל כאן", וזה עובד בכותרות.
 *
 * הפירוט המלא, כולל הסבר לכל מונח, קיים ב-/services. כל אריח כאן
 * הוא קישור לשם.
 */
export default function Services({ services }: { services: SiteContent['services'] }) {
  return (
    <section id="services" className="section" aria-labelledby="services-title">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">{services.eyebrow}</p>
          <h2 id="services-title" className="section-title">{services.title}</h2>
          <p className="section-lead">{services.lead}</p>
        </div>

        {/* בדף הבית: כותרות בלבד. הגרסה עם גוף הטקסט הייתה 249 מילים,
            והיא קיימת במלואה ב-/services. כאן זו רצועת התמצאות —
            "האם מה שמטריד אותי נכלל" — ולא קטלוג לקריאה. */}
        <ul className="svc-strip">
          {services.items.map((item, i) => (
            <li key={item.title}>
              {/* עוגן לשירות עצמו ולא לראש העמוד: לחיצה על אריח
                  ספציפי צריכה לפתוח את העמוד באותו שירות. */}
              <Link className="svc-tile" href={`${asset('/services')}#svc-${i + 1}`}>
                <span className="svc-tile-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                <span className="svc-tile-mark" aria-hidden="true">
                  <Icon name={item.icon} size={22} />
                </span>
                <span className="svc-tile-title">{item.title}</span>
                <span className="svc-tile-go" aria-hidden="true">←</span>
              </Link>
            </li>
          ))}
        </ul>

        <p className="section-more">
          <Link className="btn btn-secondary" href={asset('/services')}>
            לפירוט המלא של תחומי העיסוק
            <span className="btn-arrow" aria-hidden="true">←</span>
          </Link>
        </p>
      </div>
    </section>
  );
}
