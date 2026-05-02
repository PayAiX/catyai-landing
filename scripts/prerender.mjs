import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const routes = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../src/data/prerenderRoutes.json'), 'utf-8')
);
const distDir = path.join(__dirname, '../dist');
const indexHtml = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8');

let success = 0;
let skipped = 0;

for (const route of routes) {
  if (route.path === '/') continue;
  if (!route.title && !route.description) { skipped++; continue; }

  let html = indexHtml;

  if (route.title) {
    html = html.replace(/<title>[^<]*<\/title>/, `<title>${route.title}</title>`);
    html = html.replace(
      /(<meta property="og:title" content=")[^"]*(")/,
      `$1${route.title}$2`
    );
  }
  if (route.description) {
    html = html.replace(
      /(<meta name="description" content=")[^"]*(")/,
      `$1${route.description}$2`
    );
    html = html.replace(
      /(<meta property="og:description" content=")[^"]*(")/,
      `$1${route.description}$2`
    );
  }

  const segments = route.path.split('/').filter(Boolean);
  const dir = path.join(distDir, ...segments);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), html);
  console.log(`✓ ${route.path}`);
  success++;
}

console.log(`\nPre-render done: ${success} routes generated, ${skipped} skipped (no title/description).`);
