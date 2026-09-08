import { offer } from '@/content/site';
import { asset } from '@/lib/asset';
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
 *
 * לכל כרטיס לוחית עליונה עם האייקון וספרת השלב. זה גם עיצוב וגם
 * הכנה: כשיתקבלו תצלומים הם ייכנסו בדיוק לשם, בלי לשנות פריסה.
 * הרצף בין שלושת הכרטיסים מסומן בקו זהב עם חץ — אלה שלושה שלבים
 * של דבר אחד, לא שלוש תיבות.
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
          {offer.columns.map((col, i) => (
            <li key={col.title} className="offer-card">
              {/* הלוחית העליונה היא המקום שבו נכנס התצלום. כשיש
                  תצלום הוא ממלא אותה וספרת השלב יושבת עליו כשבב;
                  כשאין — היא נושאת את האייקון ואת הספרה הגדולה.
                  שני המצבים באותו גובה, ולכן ההחלפה לא מזיזה כלום. */}
              <div className={'offer-plate' + (col.image ? ' offer-plate-photo' : '')}>
                {col.image ? (
                  <>
                    <img
                      src={asset(col.image.src)}
                      alt={col.image.alt}
                      width={col.image.width}
                      height={col.image.height}
                      loading="lazy"
                    />
                    <span className="offer-plate-badge notch notch-outline" aria-hidden="true">{i + 1}</span>
                  </>
                ) : (
                  <>
                    <span className="offer-plate-num" aria-hidden="true">{i + 1}</span>
                    <span className="offer-icon" aria-hidden="true">
                      <Icon name={col.icon} size={26} />
                    </span>
                  </>
                )}
              </div>
              <div className="offer-body">
                <span className="offer-label">{col.label}</span>
                <h3 className="offer-card-title">{col.title}</h3>
                <p className="offer-card-text">{col.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
