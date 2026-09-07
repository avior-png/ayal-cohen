import { offer } from '@/content/site';
import Icon from '@/components/site/Icon';

/**
 * ההצעה בשפה פשוטה — שלושה טורים מיד אחרי ההיררו.
 *
 * הוא נולד מביקורת אמיתית: "אני לא מבין מה עושים כאן". קורא שנכנס
 * לעמוד שואל שלוש שאלות לפני שהוא מוכן לשמוע טיעון — מה בודקים,
 * מה אני מקבל, ומה זה דורש ממני — וכל השאר בעמוד היה עונה עליהן
 * רק בעקיפין, ורק אם גולל.
 *
 * שלושת הטורים ממוספרים כשלבים, ולכן הם גם תקציר של התהליך שמופיע
 * בהמשך: מי שקורא רק את האזור הזה יודע כבר מה עומד לקרות לו.
 *
 * שורה אחת לכל טור, ולא פסקה. הגרסה הראשונה כאן הייתה 135 מילים
 * והיא סתרה את עצם קיומה — אזור שנועד לתת בהירות מיידית לא יכול
 * לבקש מהקורא לקרוא שלוש פסקאות.
 */
export default function Offer() {
  return (
    <section id="offer" className="section offer" aria-labelledby="offer-title">
      <div className="container">
        <div className="section-head section-head-center">
          <p className="eyebrow">{offer.eyebrow}</p>
          <h2 id="offer-title" className="section-title">{offer.title}</h2>
          <p className="section-lead">{offer.lead}</p>
        </div>

        <ol className="offer-grid reveal-stagger">
          {offer.columns.map((col) => (
            <li key={col.title} className="offer-card notch notch-outline">
              <div className="offer-card-head">
                <span className="offer-icon notch notch-outline" aria-hidden="true">
                  <Icon name={col.icon} size={26} />
                </span>
                <span className="offer-label">{col.label}</span>
              </div>
              <h3 className="offer-card-title">{col.title}</h3>
              <p className="offer-card-text">{col.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
