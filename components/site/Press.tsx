import Icon from '@/components/site/Icon';
import { press } from '@/content/site';

export default function Press() {
  return (
    <section className="section" aria-labelledby="press-title">
      <div className="container">
        <div className="section-head section-head-center">
          <p className="eyebrow">{press.eyebrow}</p>
          <h2 id="press-title" className="section-title">{press.title}</h2>
          <p className="section-lead">{press.lead}</p>
        </div>

        <ul className="press-grid">
          {press.items.map((item) => (
            <li key={item.href}>
              <a
                className="press-card"
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="press-source">{item.source}</span>
                <span className="press-title">{item.title}</span>
                <span className="press-kind">{item.kind}</span>
                <span className="arrow-link" aria-hidden="true">
                  <Icon name="external" size={16} />
                  לצפייה
                </span>
                <span className="visually-hidden">(נפתח בחלון חדש)</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
