import PhotoLayer from '@/components/site/PhotoLayer';
import { caseStudy } from '@/content/site';

/**
 * מקרה מהשטח.
 *
 * הגרסה הקודמת הייתה פסקה ארוכה בתוך כרטיס לבן — והמסר נבלע בה.
 * המסר הוא לא "היה מקרה מעניין" אלא "תחקיר עמוק מוצא מה ששאלון
 * מפספס", וזה מסר עם מבנה: מה הגיע → מה עלה → מה זה שינה.
 * שלוש הפעימות נותנות לו את המבנה הזה, והמשפט בסוף נושא את הפואנטה.
 *
 * על משטח כהה, ולא על התצלום הבהיר — כדי שלא ייצמד לפס המותג הבהיר
 * שמעליו ויאבד את ההפרדה ביניהם.
 */
export default function CaseStudy() {
  return (
    <section className="section on-dark case" aria-labelledby="case-title">
      <PhotoLayer
        src={caseStudy.image.src}
        scrim="linear-gradient(to left, rgba(7,24,44,.96) 0%, rgba(7,24,44,.9) 55%, rgba(7,24,44,.82) 100%)"
      />

      <div className="container">
        <div className="section-head">
          <p className="eyebrow">{caseStudy.eyebrow}</p>
          <h2 id="case-title" className="section-title">{caseStudy.title}</h2>
          <p className="section-lead">{caseStudy.lead}</p>
        </div>

        <ol className="beats">
          {caseStudy.beats.map((beat, i) => (
            <li key={beat.label} className="beat">
              <span className="beat-label">{beat.label}</span>
              <span className="beat-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="beat-title">{beat.title}</h3>
              <p className="beat-text">{beat.text}</p>
            </li>
          ))}
        </ol>

        <p className="case-punch">{caseStudy.punch}</p>
        <p className="case-disclaimer">{caseStudy.disclaimer}</p>
      </div>
    </section>
  );
}
