/**
 * מודד ניגודיות של **כל צומת טקסט בכל עמוד** מול הרקע שמורכב
 * מתחתיו, ומשווה לסף AA לפי גודל הגופן ומשקלו.
 *
 * ⚠️  שער הניגודיות שב-‎scripts/check-dna.mjs‎ בודק 38 צמדי צבע
 *     מהפלטה — הוא לא יכול לדעת מה קורה כשסלקטור אחד גובר על
 *     אחר. שני באגים אמיתיים בפרויקט הזה היו בדיוק כאלה:
 *       • כותרת הטופס — ‎color: var(--text)‎ בתוך ‎.on-dark‎, כלומר
 *         לבן על לבן. יחס 1:1.
 *       • כפתור ראשי בעמוד 404 — ‎.prose a‎ (0,2,0) גבר על
 *         ‎.btn-primary‎ (0,1,0), כלומר נייבי על נייבי. יחס 1:1.
 *     שניהם היו בפלטה חוקית לחלוטין.
 *
 * שני דברים שהבדיקה חייבת לעשות כדי לא להציף באזעקות שקר:
 *   • **להרכיב שכבות.** שכבה חצי-שקופה אינה הרקע אלא מעליו. בלי
 *     הרכבה, טקסט לבן על שכבת לבן ב-7% מעל נייבי נמדד כלבן על לבן.
 *   • **לדלג על טקסט דקורטיבי.** ספרות-רפאים מסומנות
 *     ‎aria-hidden="true"‎, אינן מעבירות מידע ואינן כפופות לסף.
 *   רקע שהוא גרדיאנט או תצלום אינו מדיד כך, ולכן מדולג במפורש.
 *
 * הרצה: מול תוצר מוגש (‎node .srv.mjs‎ או כל שרת סטטי),
 * ‎AUDIT_BASE=http://localhost:6100/REPO node scripts/audit-contrast.mjs‎
 */
import { chromium } from 'playwright-core';
const B = process.env.AUDIT_BASE || 'http://localhost:6100';
const ROUTES=['/','/about/','/services/','/who-its-for/','/faq/','/contact/','/accessibility/','/privacy/','/terms/','/no-such-page/'];
const b = await chromium.launch({ executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args:['--no-sandbox','--disable-dev-shm-usage'] });
const findings=[];
for (const r of ROUTES) {
  const p = await b.newPage({viewport:{width:1440,height:900}, reducedMotion:'reduce'});
  await p.addInitScript(()=>{try{localStorage.setItem('cookie-choice','accepted')}catch{}});
  await p.goto(B+r,{waitUntil:'load'});
  await p.evaluate(async()=>{const s=innerHeight*0.8;for(let y=0;y<document.body.scrollHeight;y+=s){scrollTo(0,y);await new Promise(x=>setTimeout(x,60));}scrollTo(0,0);});
  await p.waitForTimeout(400);
  // פותח את כל ה-details כדי למדוד גם טקסט מוסתר
  await p.evaluate(()=>document.querySelectorAll('details').forEach(d=>d.open=true));
  await p.waitForTimeout(200);
  const res = await p.evaluate(()=>{
    const parse=c=>{const m=(c.match(/[\d.]+/g)||[0,0,0]).map(Number);return {r:m[0]||0,g:m[1]||0,b:m[2]||0,a:m.length>3?m[3]:1};};
    const lum=({r,g,b})=>{const f=v=>{v/=255;return v<=0.03928?v/12.92:Math.pow((v+0.055)/1.055,2.4)};return 0.2126*f(r)+0.7152*f(g)+0.0722*f(b)};
    /* מרכיב את שכבות הרקע מהאלמנט כלפי מעלה. שכבה חצי-שקופה אינה
       הרקע — היא **מעל** הרקע, ובלי הרכבה כל טקסט לבן על שכבת
       לבן ב-7% נמדד כלבן על לבן. אלמנט עם ‎background-image‎
       (גרדיאנט או תצלום) אינו ניתן למדידה כך, ולכן מדלגים. */
    const bgOf=el=>{
      const layers=[]; let e=el;
      while(e){
        const cs=getComputedStyle(e);
        if(cs.backgroundImage && cs.backgroundImage!=='none') return null;
        const c=parse(cs.backgroundColor);
        if(c.a>0) { layers.push(c); if(c.a>=1) break; }
        e=e.parentElement;
      }
      let base=layers.length&&layers[layers.length-1].a>=1?layers.pop():{r:255,g:255,b:255,a:1};
      for(let i=layers.length-1;i>=0;i--){const l=layers[i];
        base={r:l.r*l.a+base.r*(1-l.a), g:l.g*l.a+base.g*(1-l.a), b:l.b*l.a+base.b*(1-l.a), a:1};}
      return base;
    };
    const out=[];
    document.querySelectorAll('body *').forEach(el=>{
      const cs=getComputedStyle(el);
      if(cs.display==='none'||cs.visibility==='hidden'||+cs.opacity===0) return;
      /* טקסט דקורטיבי מוסתר מקוראי מסך אינו מעביר מידע, ולכן אינו
         כפוף לסף הניגודיות. הספרות-רפאים באתר הזה הן כאלה. */
      if(el.closest('[aria-hidden="true"]')) return;
      const t=[...el.childNodes].filter(n=>n.nodeType===3&&n.textContent.trim()).map(n=>n.textContent.trim()).join(' ');
      if(!t) return;
      const bb=el.getBoundingClientRect(); if(bb.width<1||bb.height<1) return;
      const bg=bgOf(el); if(!bg) return;              // רקע לא מדיד (גרדיאנט/תצלום)
      const fgc=parse(cs.color);
      const fg={r:fgc.r*fgc.a+bg.r*(1-fgc.a), g:fgc.g*fgc.a+bg.g*(1-fgc.a), b:fgc.b*fgc.a+bg.b*(1-fgc.a)};
      const L1=lum(fg), L2=lum(bg);
      const cr=(Math.max(L1,L2)+0.05)/(Math.min(L1,L2)+0.05);
      const size=parseFloat(cs.fontSize), bold=+cs.fontWeight>=700;
      const need=(size>=24||(size>=18.66&&bold))?3:4.5;
      if(cr<need) out.push({sel:el.tagName+'.'+String(el.className).slice(0,40), txt:t.slice(0,45), cr:+cr.toFixed(2), need, fg:cs.color, bg:`rgb(${Math.round(bg.r)},${Math.round(bg.g)},${Math.round(bg.b)})`});
    });
    return out;
  });
  res.forEach(x=>findings.push({route:r,...x}));
  await p.close();
}
await b.close();
if(!findings.length) console.log('✓ ניגודיות: אין טקסט מתחת לסף AA באף עמוד');
else { process.exitCode = 1; console.log('נמצאו', findings.length, 'ממצאים:\n');
  findings.sort((a,b)=>a.cr-b.cr).forEach(f=>console.log(`${String(f.cr).padStart(6)} (נדרש ${f.need})  ${f.route.padEnd(16)} ${f.sel.padEnd(40)} ${f.fg} על ${f.bg}  "${f.txt}"`)); }
