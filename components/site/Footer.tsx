import { disclaimer, legalLinks, nav } from '@/content/site';
import { asset } from '@/lib/asset';
import { dna } from '@/dna';
import { LogoMark } from '@/components/site/Logo';
import type { SiteContent } from '@/lib/site-content';

export default function Footer({ site }: { site: SiteContent['site'] }) {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col footer-col-about">
            <span className="site-logo" style={{ marginBottom: 'var(--space-md)' }}>
              <LogoMark size={46} />
              <span className="site-logo-text">
                <span className="site-logo-name" style={{ color: '#fff' }}>{site.name}</span>
                <span className="site-logo-sub" style={{ color: 'var(--gold)' }}>תכנון פרישה</span>
              </span>
            </span>
            <p className="footer-about-text">{site.tagline}</p>
            <ul className="footer-list footer-social">
              {dna.identity.social.map((s) => <li key={s.label}><a href={s.href}>{s.label}</a></li>)}
            </ul>
          </div>

          <nav className="footer-col" aria-label="קישורים באתר">
            <h2 className="footer-title">ניווט</h2>
            <ul className="footer-list">
              {nav.map((item) => <li key={item.href}><a href={asset(item.href)}>{item.label}</a></li>)}
            </ul>
          </nav>

          <div className="footer-col">
            <h2 className="footer-title">תחומי עיסוק</h2>
            <ul className="footer-list">
              <li><a href={asset('/services')}>תכנון פרישה מלא</a></li>
              <li><a href={asset('/services')}>קיבוע זכויות</a></li>
              <li><a href={asset('/services')}>תכנון מס ותיקון 190</a></li>
              <li><a href={asset('/services')}>התאמת התיק הפנסיוני</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h2 className="footer-title">יצירת קשר</h2>
            <ul className="footer-list">
              <li><a href={site.phoneHref}>{site.phone}</a></li>
              <li><a href={`mailto:${site.email}`}>{site.email}</a></li>
              <li>{site.address}</li>
              <li>{site.hours}</li>
            </ul>
          </div>
        </div>

        {/* גילוי נאות — נדרש בתחום מפוקח, ולכן קבוע בכל עמוד. */}
        <p className="footer-disclaimer">{disclaimer}</p>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} {site.name} · {dna.identity.legalName}. כל הזכויות שמורות.</p>
          <ul className="footer-legal">
            {legalLinks.map((l) => <li key={l.href}><a href={asset(l.href)}>{l.label}</a></li>)}
          </ul>
        </div>
      </div>
    </footer>
  );
}
