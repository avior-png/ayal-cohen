import { asset } from '@/lib/asset';

/**
 * שכבת תצלום דקורטיבית מאחורי תוכן.
 *
 * התמונה נקבעת ב-inline style ולא ב-CSS, כי url() בקובץ CSS אינו מקבל
 * את ה-BASE_PATH — ואתר שמתארח בתת-נתיב היה מאבד את כל תמונות הרקע.
 * scrim הוא שכבת הכהיה מעל התצלום, שמבטיחה שהטקסט יישאר קריא.
 */
export default function PhotoLayer({
  src, className = '', scrim,
}: {
  src: string;
  className?: string;
  scrim?: string;
}) {
  return (
    <div
      className={`bg-photo ${className}`.trim()}
      aria-hidden="true"
      style={{ backgroundImage: `${scrim ? `${scrim}, ` : ''}url(${asset(src)})` }}
    />
  );
}
