/* Edit partials and site-components.css/js to update every public page. */
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const templates = Object.fromEntries(['site-header', 'site-footer', 'inquiry-form'].map(name => [name, read(`partials/${name}.html`).trim()]));
const pages = [...read('sitemap.xml').matchAll(/<loc>(.*?)<\/loc>/g)].map(([, url]) => new URL(url).pathname);
const activeSection = route => {
  if (['/clear-dessert-box-sizes', '/packaging-kits', '/wholesale-tiramisu-boxes', '/transparent-plastic-dessert-boxes'].includes(route)) return '/products';
  if (route === '/applications') return '/factory';
  if (route.startsWith('/how-to-') || route === '/custom-dessert-packaging-guide') return '/resources';
  return route;
};
function replaceComponent(html, name, legacy, replacement) {
  const marked = new RegExp(`<!-- shared:${name}:start -->[\\s\\S]*?<!-- shared:${name}:end -->`);
  const pattern = marked.test(html) ? marked : legacy;
  if (!pattern.test(html)) throw new Error(`Missing ${name}`);
  return html.replace(pattern, `<!-- shared:${name}:start -->\n${replacement}\n<!-- shared:${name}:end -->`);
}
let forms = 0;
for (const route of pages) {
  const file = route === '/' ? 'index.html' : `${route.slice(1)}.html`;
  let html = read(file);
  const form = html.match(/<form\b[^>]*\bdata-inquiry-form[^>]*>[\s\S]*?<\/form>/);
  const formId = form ? (form[0].match(/\bid="([^"]+)"/)?.[1] || 'quoteForm') : null;
  if (form) {
    html = replaceComponent(html, 'inquiry-form', /<form\b[^>]*\bdata-inquiry-form[^>]*>[\s\S]*?<\/form>/, templates['inquiry-form'].replaceAll('{{FORM_ID}}', formId));
    forms++;
  }
  let header = templates['site-header'].replaceAll('{{QUOTE_HREF}}', formId ? `#${formId}` : '/contact#contact-inquiry-form');
  header = header.replace(`<a href="${activeSection(route)}">`, `<a href="${activeSection(route)}" class="cdp-active" aria-current="${route === activeSection(route) ? 'page' : 'true'}">`);
  html = replaceComponent(html, 'site-header', /<div class="topbar">[\s\S]*?<\/header>/, header);
  html = replaceComponent(html, 'site-footer', /<footer\b[\s\S]*?<\/footer>/, templates['site-footer']);
  // A legacy empty grid child pushed the size-page form into the wrong column.
  html = html.replace(/<div id="inquiry-form-anchor" style="padding-top: 10px;"><\/div>\s*/, '');
  if (file === 'clear-dessert-box-sizes.html') {
    html = html.replace('<input type="hidden" name="item_no"', '<span id="inquiry-form-anchor" class="cdp-inquiry-anchor"></span>\n          <input type="hidden" name="item_no"');
  }
  if (!html.includes('href="/assets/css/site-components.css"')) html = html.replace('</head>', '  <link rel="stylesheet" href="/assets/css/site-components.css" />\n</head>');
  if (!html.includes('src="/assets/js/site-components.js"')) html = html.replace('</body>', '  <script src="/assets/js/site-components.js" defer></script>\n</body>');
  if (html.includes('{{')) throw new Error(`Unresolved placeholder in ${file}`);
  fs.writeFileSync(path.join(root, file), html);
}
console.log(`Shared header/footer: ${pages.length} pages; homepage inquiry form: ${forms} pages.`);
