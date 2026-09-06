import { asset } from '@/lib/asset';

/**
 * הלוגו — סמל ב-SVG פנימי ולוגוטייפ בטקסט HTML.
 *
 * הלוגוטייפ נשאר טקסט (ולא קובץ תמונה) כדי שהוא ייצבע לפי הרקע,
 * יישאר חד בכל רזולוציה, ויוגש בגופן הכותרות של המותג. קובץ SVG
 * שנטען דרך <img> אינו יורש את הגופנים של העמוד ולכן היה נשבר.
 */
export function LogoMark({ size = 42 }: { size?: number }) {
  return (
    <svg
      className="logo-mark"
      width={size}
      height={size}
      viewBox="0 0 44 44"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      {/* מגן — יציבות ושמירה על ההון */}
      <path
        d="M22 2.6 40 11.2v12.4c0 9.6-7.6 15.6-18 18.8C11.6 39.2 4 33.2 4 23.6V11.2L22 2.6Z"
        fill="currentColor"
      />
      <path
        d="M22 2.6 40 11.2v12.4c0 9.6-7.6 15.6-18 18.8C11.6 39.2 4 33.2 4 23.6V11.2L22 2.6Z"
        stroke="var(--gold)"
        strokeOpacity="0.55"
        strokeWidth="1"
      />
      {/* קו עולה — הכיוון */}
      <path
        d="M12.5 28.5 18.6 22.2l4.7 4 7.6-9"
        stroke="var(--gold)"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="30.9" cy="17.2" r="2.7" fill="var(--gold)" />
    </svg>
  );
}

export default function Logo({ name, sub = 'תכנון פרישה' }: { name: string; sub?: string }) {
  return (
    <a className="site-logo" href={asset('/')}>
      <LogoMark />
      <span className="site-logo-text">
        <span className="site-logo-name">{name}</span>
        <span className="site-logo-sub">{sub}</span>
      </span>
    </a>
  );
}
