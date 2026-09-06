import Link from 'next/link';
import { asset } from '@/lib/asset';
import { about as aboutContent } from '@/content/site';
import type { SiteContent } from '@/lib/site-content';

export default function About({ about }: { about: SiteContent['about'] }) {
  return (
    <section id="about" className="section section-alt" aria-labelledby="about-title">
      <div className="container about-inner">
        <div className="about-media">
          <img src={asset(about.image.src)} alt={about.image.alt} width={800} height={1000} loading="lazy" />
        </div>

        <div className="about-text">
          <p className="eyebrow">{about.eyebrow}</p>
          <h2 id="about-title" className="section-title">{about.title}</h2>
          {about.paragraphs.map((p, i) => <p key={i} className="about-paragraph">{p}</p>)}

          <blockquote className="about-quote">{aboutContent.quote}</blockquote>

          <ul className="check-list">
            {about.points.map((point) => <li key={point}>{point}</li>)}
          </ul>

          <p className="card-link">
            <Link className="arrow-link" href={asset('/about')}>הסיפור המלא והכשרות מקצועיות</Link>
          </p>
        </div>
      </div>
    </section>
  );
}
