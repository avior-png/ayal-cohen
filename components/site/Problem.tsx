import { asset } from '@/lib/asset';
import { problem } from '@/content/site';

/**
 * "הפער השקט" — הסקשן שמטלטל את השאננות.
 * הקהל אינו מרגיש בעיה, ולכן הסקשן לא מציע פתרון אלא חושף פערים.
 */
export default function Problem() {
  return (
    <section id="problem" className="section problem" aria-labelledby="problem-title">
      <div className="container problem-inner">
        <div className="problem-aside">
          <div className="section-head">
            <p className="eyebrow">{problem.eyebrow}</p>
            <h2 id="problem-title" className="section-title">{problem.title}</h2>
            <p className="section-lead">{problem.lead}</p>
          </div>
          <p className="problem-note">{problem.note}</p>
          <div className="problem-media">
            <img src={asset(problem.image.src)} alt={problem.image.alt}
                 width={1000} height={750} loading="lazy" />
          </div>
        </div>

        <ul className="finding-list reveal-stagger">
          {problem.findings.map((f, i) => (
            <li key={f.title} className="finding">
              <span className="finding-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <h3 className="finding-title">{f.title}</h3>
                <p className="finding-text">{f.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
