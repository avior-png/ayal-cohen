import Link from 'next/link';
import PhotoLayer from '@/components/site/PhotoLayer';

/**
 * ראש עמוד פנימי: פירורי לחם, כותרת ופסקת פתיחה.
 * הפירורים הם <nav> עם aria-label ו-aria-current, כדי שקורא מסך
 * ידע איפה המשתמש נמצא בהיררכיה.
 */
export default function PageHeader({
  title, lead, eyebrow, crumbs = [], crumbLabel,
}: {
  title: string;
  lead?: string;
  eyebrow?: string;
  crumbs?: { label: string; href: string }[];
  /** שם קצר לפירור האחרון. בלעדיו הפירור מקבל את הכותרת המלאה,
   *  ובעמוד שכותרתו משפט שלם זה יוצא פירור באורך שורה. */
  crumbLabel?: string;
}) {
  return (
    <header className="page-header">
      <PhotoLayer
        src="/images/bg-ink.webp"
        scrim="linear-gradient(to left, rgba(7,24,44,.90) 0%, rgba(7,24,44,.74) 100%)"
      />
      <div className="container">
        <nav className="breadcrumbs" aria-label="מיקומך באתר">
          <ol>
            <li><Link href="/">בית</Link></li>
            {crumbs.map((c) => (
              <li key={c.href}><Link href={c.href}>{c.label}</Link></li>
            ))}
            <li aria-current="page">{crumbLabel ?? title}</li>
          </ol>
        </nav>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1 className="page-title">{title}</h1>
        {lead && <p className="page-lead">{lead}</p>}
      </div>
    </header>
  );
}
