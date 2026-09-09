import { disclaimer, legalLinks, nav } from '@/content/site';
import SocialIcon from '@/components/site/SocialIcon';
import { asset } from '@/lib/asset';
import { dna } from '@/dna';
import { LogoMark } from '@/components/site/Logo';
import Icon from '@/components/site/Icon';
import type { SiteContent } from '@/lib/site-content';

/**
 * הפוטר.
 *
 * לא רק מפת קישורים: שורה עליונה שחוזרת על ההזמנה לשיחה עם הטלפון
 * כקישור גדול, ואז ארבע עמודות, גילוי נאות בתיבה משלו, ושורה תחתונה.
 * בתחום מפוקח הגילוי הנאות הוא חלק מהמותג ולא הערת שוליים, ולכן הוא
 * מקבל מסגרת ולא נדחס לאותיות הקטנות.
 */
export default function Footer({ site }: { site: SiteContent['site'] }) {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <p className="footer-cta-text">
            רוצה לדעת איפה אתה עומד? <br />
            <span className="accent">שיחת אבחון ראשונה - ללא עלות.</span>
          </p>
          <div className="footer-cta-actions">
            <a className="btn btn-gold" href={asset('/contact')}>
              לבדיקת פרישה
              <span className="btn-arrow" aria-hidden="true">←</span>
            </a>
            <a className="footer-phone" href={site.phoneHref}>
              <Icon name="phone" size={20} />
              {site.phone}
            </a>
          </div>
        </div>

        <div className="footer-grid">
          <div className="footer-col footer-col-about">
            <span className="site-logo">
              <LogoMark size={46} />
              <span className="site-logo-text">
                <span className="site-logo-name">{site.name}</span>
                <span className="site-logo-sub">תכנון פרישה</span>
              </span>
            </span>
            <p className="footer-about-text">{site.tagline}</p>
            {/* אייקונים ולא שמות: שלושה שבבים עם "לינקדאין / פייסבוק /
                יוטיוב" בעברית נראו כמו עוד רשימת קישורים בפוטר שכבר
                מלא רשימות. הסמל מזוהה מיד, והשם נשאר לקורא מסך. */}
            <ul className="footer-social">
              {dna.identity.social.map((s) => (
                <li key={s.label}>
                  <a className="notch notch-outline" href={s.href} aria-label={s.label}>
                    <SocialIcon name={s.key} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav className="footer-col" aria-label="קישורים באתר">
            <h2 className="footer-title">ניווט</h2>
            <ul className="footer-list">
              {nav.map((item) => (
                <li key={item.href}><a href={asset(item.href)}>{item.label}</a></li>
              ))}
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
            <ul className="footer-list footer-contact">
              <li>
                <span className="footer-ico" aria-hidden="true"><Icon name="phone" size={16} /></span>
                <a href={site.phoneHref}>{site.phone}</a>
              </li>
              <li>
                <span className="footer-ico" aria-hidden="true"><Icon name="mail" size={16} /></span>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </li>
              <li>
                <span className="footer-ico" aria-hidden="true"><Icon name="pin" size={16} /></span>
                <span>{site.address}</span>
              </li>
              <li>
                <span className="footer-ico" aria-hidden="true"><Icon name="clock" size={16} /></span>
                <span>{site.hours}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* גילוי נאות — דרישה בתחום מפוקח, ולכן בתיבה משלו ולא בשוליים. */}
        <p className="footer-disclaimer">
          <span className="footer-disclaimer-label">גילוי נאות</span>
          {disclaimer}
        </p>

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
