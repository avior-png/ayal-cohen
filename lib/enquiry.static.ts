/**
 * גרסת הטופס לייצוא סטטי (GitHub Pages).
 *
 * ⚠️  אין כאן ‎'use server'‎ ואין כאן מסד. באתר סטטי אין שרת, ולכן
 *     ה-Server Action שב-‎lib/enquiry.ts‎ פשוט לא יכול לרוץ — הוא גם
 *     מפיל את הבנייה עם ‎output: 'export'‎. הקובץ הזה מחליף אותו
 *     בזמן הבנייה הסטטית (ראה ההחלפה ב-next.config.mjs), ולכן
 *     החתימה חייבת להיות זהה: אותו טיפוס, אותה ולידציה, אותן
 *     הודעות שגיאה. מה שמשתנה הוא רק היעד.
 *
 * במקום לכתוב למסד, הטופס פותח וואטסאפ עם הפרטים מוכנים לשליחה.
 * זו התנהגות מלאה ואמיתית לאתר תדמית סטטי — ולא הדמיה: המבקר
 * ממלא, לוחץ, והשיחה נפתחת.
 */

import { dna } from '@/dna';

export interface EnquiryState {
  ok?: boolean;
  error?: string;
  fields?: Partial<Record<'name' | 'phone' | 'email' | 'message', string>>;
  okMessage?: string;
}

export async function submitEnquiry(_p: EnquiryState, fd: FormData): Promise<EnquiryState> {
  // honeypot: שדה מוסתר שרק בוט ימלא.
  if (String(fd.get('website') ?? '')) return { ok: true };

  const name = String(fd.get('name') ?? '').trim();
  const phone = String(fd.get('phone') ?? '').trim();
  const email = String(fd.get('email') ?? '').trim();
  const message = String(fd.get('message') ?? '').trim();

  /* ולידציה זהה לגרסת השרת — אותן הודעות, מאותו מקום. */
  const fields: EnquiryState['fields'] = {};
  if (name.length < 2) fields.name = 'יש להזין שם מלא (לפחות 2 תווים).';
  if (!/^0\d{1,2}-?\d{7}$/.test(phone.replace(/\s/g, ''))) {
    fields.phone = 'יש להזין מספר טלפון ישראלי תקין, לדוגמה 050-0000000.';
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    fields.email = 'כתובת האימייל אינה תקינה.';
  }
  if (message.length < 10) fields.message = 'יש לכתוב הודעה באורך 10 תווים לפחות.';

  if (Object.keys(fields).length) return { fields };

  const text = [
    'פנייה מהאתר',
    `שם: ${name}`,
    `טלפון: ${phone}`,
    email ? `אימייל: ${email}` : null,
    '',
    message,
  ].filter(Boolean).join('\n');

  const wa = dna.identity.whatsapp;
  const href = wa
    ? `${wa}${wa.includes('?') ? '&' : '?'}text=${encodeURIComponent(text)}`
    : `mailto:${dna.identity.email}?subject=${encodeURIComponent('פנייה מהאתר')}`
      + `&body=${encodeURIComponent(text)}`;

  /* ‎_blank‎ ולא ניווט באותה לשונית: המבקר חוזר לאתר אחרי השליחה. */
  if (typeof window !== 'undefined') window.open(href, '_blank', 'noopener');

  /* ההודעה מדויקת לפעולה שקרתה: לא "נקלטה" — כלום לא נשמר. */
  return {
    ok: true,
    okMessage: wa
      ? 'נפתח וואטסאפ עם הפרטים - נשאר רק ללחוץ שליחה.'
      : 'נפתחה טיוטת מייל עם הפרטים - נשאר רק לשלוח.',
  };
}
