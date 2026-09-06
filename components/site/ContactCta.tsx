'use client';

import { useActionState } from 'react';
import { submitEnquiry, type EnquiryState } from '@/lib/enquiry';
import PhotoLayer from '@/components/site/PhotoLayer';
import { contact as contactContent } from '@/content/site';
import type { SiteContent } from '@/lib/site-content';

export default function ContactCta({
  site, contact, headingLevel = 2,
}: {
  site: SiteContent['site'];
  contact: SiteContent['contact'];
  headingLevel?: 1 | 2;
}) {
  const [state, action, pending] = useActionState<EnquiryState, FormData>(submitEnquiry, {});
  const err = state.fields ?? {};
  const Heading = (headingLevel === 1 ? 'h1' : 'h2') as 'h1' | 'h2';

  const field = (name: keyof typeof err) => ({
    'aria-invalid': err[name] ? true : undefined,
    'aria-describedby': err[name] ? `${name}-error` : undefined,
  });

  return (
    <section id="contact" className="section on-dark cta-section" aria-labelledby="contact-title">
      <PhotoLayer
        src="/images/bg-ink.webp"
        scrim="linear-gradient(to left, rgba(7,24,44,.90) 0%, rgba(7,24,44,.78) 100%)"
      />
      <div className="container cta-inner">
        <div className="cta-text">
          {contact.eyebrow && <p className="eyebrow">{contact.eyebrow}</p>}
          <Heading id="contact-title" className="cta-title">{contact.title}</Heading>
          <p className="cta-lead">{contact.lead}</p>

          <ul className="cta-contact-list">
            <li>
              <span className="cta-contact-label">טלפון</span>
              <a href={site.phoneHref}>{site.phone}</a>
            </li>
            <li>
              <span className="cta-contact-label">אימייל</span>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </li>
            <li>
              <span className="cta-contact-label">פגישות</span>
              <span className="cta-contact-value">{site.address}</span>
            </li>
            <li>
              <span className="cta-contact-label">זמינות</span>
              <span className="cta-contact-value">{site.hours}</span>
            </li>
          </ul>
        </div>

        <form className="contact-form" action={action} noValidate>
          <p className="form-title">{contactContent.formTitle}</p>

          {state.error && <p className="field-error" role="alert">{state.error}</p>}

          {/* honeypot — מוסתר גם מקוראי מסך, בוטים בלבד ימלאו אותו.
              ההסתרה היא ב-clip ולא בהזזה ל-left:-9999px: הזזה כזו מרחיבה
              את רוחב המסמך ב-RTL ויוצרת גלילה אופקית בכל העמוד. */}
          <div aria-hidden="true" className="honeypot">
            <label htmlFor="website">אתר</label>
            <input id="website" name="website" tabIndex={-1} autoComplete="off" />
          </div>

          <div className="field-row">
            <div className="field">
              <label htmlFor="name">שם מלא <span className="req" aria-hidden="true">*</span></label>
              <input id="name" name="name" type="text" autoComplete="name" required {...field('name')} />
              {err.name && <p id="name-error" className="field-error">{err.name}</p>}
            </div>

            <div className="field">
              <label htmlFor="phone">טלפון <span className="req" aria-hidden="true">*</span></label>
              <input id="phone" name="phone" type="tel" autoComplete="tel" required {...field('phone')} />
              {err.phone && <p id="phone-error" className="field-error">{err.phone}</p>}
            </div>
          </div>

          <div className="field">
            <label htmlFor="email">אימייל</label>
            <input id="email" name="email" type="email" autoComplete="email" {...field('email')} />
            {err.email && <p id="email-error" className="field-error">{err.email}</p>}
          </div>

          <div className="field">
            <label htmlFor="message">מה חשוב שנדע לפני השיחה? <span className="req" aria-hidden="true">*</span></label>
            <textarea
              id="message"
              name="message"
              required
              placeholder="למשל: בן 57, שכיר, יש קרן פנסיה ושתי קופות גמל, מתכנן לפרוש בעוד כמה שנים."
              {...field('message')}
            />
            {err.message && <p id="message-error" className="field-error">{err.message}</p>}
          </div>

          <button type="submit" className="btn btn-primary btn-block" disabled={pending}>
            {pending ? 'שולח…' : 'שליחה — ונחזור אליך'}
          </button>

          <p className="form-note">{contactContent.formNote}</p>

          <p className="form-status" role="status" aria-live="polite">
            {state.ok ? 'תודה! הפנייה נקלטה ואיל יחזור אליך בתוך יום עסקים אחד.' : ''}
          </p>
        </form>
      </div>
    </section>
  );
}
