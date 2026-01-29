/**
 * Vite 把 HTML 输出到 dist/public/app.html，Vercel 需要 dist/index.html。
 * 复制并修正资源路径（../assets/ -> ./assets/），使根路径可正确加载资源。
 */
const fs = require('fs');
const path = require('path');

const src = path.join(__dirname, '..', 'dist', 'public', 'app.html');
const dest = path.join(__dirname, '..', 'dist', 'index.html');

let html = fs.readFileSync(src, 'utf8');
html = html.replace(/\.\.\/assets\//g, './assets/');
fs.writeFileSync(dest, html);
