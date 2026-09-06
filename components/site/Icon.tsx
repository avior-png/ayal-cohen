/**
 * ערכת אייקוני קו — 24×24, stroke ב-currentColor.
 * אייקוני קו במשקל אחיד נראים כמו מערכת אחת; אמוג'י או גליפים
 * מעורבים נראים כמו אוסף מקרי, וזה בדיוק מה שמותג פיננסי לא יכול.
 */
export type IconName =
  | 'map' | 'shield' | 'percent' | 'handover'
  | 'sliders' | 'compass' | 'phone' | 'mail' | 'clock' | 'pin' | 'external';

const PATHS: Record<IconName, React.ReactNode> = {
  // מפת תכנון
  map: (
    <>
      <path d="M9 4 3 6.5v13.5L9 17.5m0-13.5 6 2.5m-6-2.5v13.5m6-11v13.5m0-13.5 6-2.5v13.5L15 20" />
      <path d="M9 17.5 15 20" />
    </>
  ),
  // קיבוע זכויות — הגנה מאושרת
  shield: (
    <>
      <path d="M12 3 20 6v6c0 4.6-3.4 7.6-8 9-4.6-1.4-8-4.4-8-9V6l8-3Z" />
      <path d="m8.8 12.2 2.2 2.2 4.4-4.6" />
    </>
  ),
  // הטבות מס
  percent: (
    <>
      <path d="M18.5 5.5 5.5 18.5" />
      <circle cx="8" cy="8" r="2.6" />
      <circle cx="16" cy="16" r="2.6" />
    </>
  ),
  // טיפול בפיצויים — העברת ערך
  handover: (
    <>
      <path d="M3 13.5h4l3 3.2a2 2 0 0 0 2.8.1l5.4-4.9a1.8 1.8 0 0 0 .1-2.6l-2.6-2.7a3 3 0 0 0-2.2-.9h-3.3a3 3 0 0 0-1.8.6L5.6 8.4H3" />
      <path d="M11 9.4h3.6" />
    </>
  ),
  // התאמת מסלולים
  sliders: (
    <>
      <path d="M4 7h7m4 0h5M4 17h4m4 0h8" />
      <circle cx="13" cy="7" r="2.2" /><circle cx="10" cy="17" r="2.2" />
    </>
  ),
  // ליווי שוטף
  compass: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m15.6 8.4-2 5.2-5.2 2 2-5.2 5.2-2Z" />
    </>
  ),
  phone: <path d="M6.2 3.5h3l1.5 3.8-1.9 1.4a11.5 11.5 0 0 0 5.5 5.5l1.4-1.9 3.8 1.5v3a1.8 1.8 0 0 1-2 1.8C10.3 18 6 13.7 4.4 5.5a1.8 1.8 0 0 1 1.8-2Z" />,
  mail: (
    <>
      <rect x="3" y="5.5" width="18" height="13" rx="2" />
      <path d="m3.8 7 7.1 5.2a2 2 0 0 0 2.2 0L20.2 7" />
    </>
  ),
  clock: (<><circle cx="12" cy="12" r="9" /><path d="M12 7v5.3l3.4 2" /></>),
  pin: (<><path d="M12 21c4.2-4.6 6.4-8 6.4-10.6A6.4 6.4 0 0 0 5.6 10.4C5.6 13 7.8 16.4 12 21Z" /><circle cx="12" cy="10.3" r="2.4" /></>),
  external: (<><path d="M14 4h6v6" /><path d="M20 4 11 13" /><path d="M18 14v4.5a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 4 18.5v-11A1.5 1.5 0 0 1 5.5 6H10" /></>),
};

/**
 * שם לא מוכר נופל חזרה לאייקון ברירת המחדל במקום לרנדר כלום —
 * במערכת הניהול הלקוח מקליד את שם האייקון בעצמו.
 */
export default function Icon({ name, size = 24 }: { name: string; size?: number }) {
  const path = PATHS[name as IconName] ?? PATHS.map;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {path}
    </svg>
  );
}
