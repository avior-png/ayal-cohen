'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { nav } from '@/content/site';
import { asset } from '@/lib/asset';
import Logo from '@/components/site/Logo';
import Icon from '@/components/site/Icon';
import type { SiteContent } from '@/lib/site-content';

/**
 * כותרת האתר.
 *
 * בראש כל עמוד היא כהה ומתמזגת עם הבאנר הכהה שמתחתיה; אחרי גלילה קצרה
 * היא הופכת לבנה ומקבלת צל. המעבר נעשה בהחלפת מחלקה בלבד — הכותרת נשארת
 * sticky בזרימה הרגילה, ולכן אין קפיצת פריסה ואין צורך במיקום מוחלט.
 */
export default function Header({ site }: { site: SiteContent['site'] }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  // trailingSlash מוסיף '/' בסוף — משווים על צורה מנורמלת אחת.
  const here = (pathname || '/').replace(/\/+$/, '') || '/';

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 16);
        frame = 0;
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  // Escape סוגר את התפריט ומחזיר את הפוקוס לכפתור (מונע מלכודת פוקוס).
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setOpen(false); toggleRef.current?.focus(); }
    };
    const onClick = (e: MouseEvent) => {
      const t = e.target as Node;
      if (!navRef.current?.contains(t) && !toggleRef.current?.contains(t)) setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('click', onClick);
    return () => { document.removeEventListener('keydown', onKey); document.removeEventListener('click', onClick); };
  }, [open]);

  const cls = ['header-stack', scrolled ? 'is-solid' : 'is-dark', open ? 'is-open' : ''].join(' ').trim();

  return (
    <div className={cls}>
      <header className="site-header">
        <div className="container header-inner">
          <Logo name={site.name} sub="תכנון פרישה" />

          <button
            ref={toggleRef}
            type="button"
            className="nav-toggle"
            aria-expanded={open}
            aria-controls="main-nav"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="nav-toggle-bars" aria-hidden="true" />
            <span className="visually-hidden">{open ? 'סגירת התפריט' : 'פתיחת התפריט'}</span>
          </button>

          <nav ref={navRef} id="main-nav" className="main-nav" aria-label="תפריט ראשי" hidden={!open}>
            <ul className="main-nav-list">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    className="main-nav-link"
                    href={asset(item.href)}
                    aria-current={here === item.href ? 'page' : undefined}
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="main-nav-cta">
              <a className="btn btn-primary btn-block" href={asset('/contact')} onClick={() => setOpen(false)}>
                לבדיקת פרישה ללא עלות
              </a>
              <a className="btn btn-secondary btn-block" href={site.phoneHref}>{site.phone}</a>
            </div>
          </nav>

          <div className="header-actions">
            <a className="header-phone" href={site.phoneHref}>
              <Icon name="phone" size={18} />
              {site.phone}
            </a>
            <a className="btn btn-primary btn-sm header-cta" href={asset('/contact')}>
              בדיקת פרישה
              <span className="btn-arrow" aria-hidden="true">←</span>
            </a>
          </div>
        </div>
      </header>
    </div>
  );
}
