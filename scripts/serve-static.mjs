/**
 * שרת סטטי קטן שמגיש את ‎out/‎ **מתחת לתת-נתיב** — בדיוק כמו
 * GitHub Pages.
 *
 * ⚠️  למה זה נחוץ ולא סתם ‎npx serve out‎: הבאג שהפיל את כל
 *     הקישורים באתר (basePath מוכפל) מתגלה רק כשהתוצר מוגש
 *     מתת-נתיב. הגשה מהשורש מסתירה אותו לגמרי.
 *
 * הרצה: ‎BASE_PATH=/REPO node scripts/serve-static.mjs‎
 * ואז ‎npm run audit:links‎ ו-‎npm run audit:contrast‎.
 */
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
const ROOT = path.join(process.cwd(), 'out');
const PREFIX = process.env.BASE_PATH
  || (process.env.GITHUB_REPOSITORY ? '/' + process.env.GITHUB_REPOSITORY.split('/')[1] : '');
const PORT = +(process.env.PORT || 6100);
const TYPES = {'.html':'text/html; charset=utf-8','.css':'text/css','.js':'application/javascript','.webp':'image/webp','.jpg':'image/jpeg','.png':'image/png','.svg':'image/svg+xml','.txt':'text/plain; charset=utf-8','.xml':'application/xml','.woff2':'font/woff2','.ico':'image/x-icon'};
http.createServer((req,res)=>{
  let p = decodeURIComponent(req.url.split('?')[0]);
  if (!p.startsWith(PREFIX)) { res.writeHead(404).end('outside prefix'); return; }
  p = p.slice(PREFIX.length) || '/';
  let f = path.join(ROOT, p);
  if (p.endsWith('/')) f = path.join(f, 'index.html');
  if (!fs.existsSync(f) && fs.existsSync(f + '.html')) f = f + '.html';
  if (!fs.existsSync(f) || fs.statSync(f).isDirectory()) {
    const alt = path.join(ROOT, p, 'index.html');
    if (fs.existsSync(alt)) f = alt;
    else { res.writeHead(404, {'content-type':'text/html; charset=utf-8'}); res.end(fs.existsSync(path.join(ROOT,'404.html'))?fs.readFileSync(path.join(ROOT,'404.html')):'404'); return; }
  }
  res.writeHead(200, {'content-type': TYPES[path.extname(f)] || 'application/octet-stream'});
  res.end(fs.readFileSync(f));
}).listen(PORT, () => console.log(`out/ מוגש ב-http://localhost:${PORT}${PREFIX}/`));
