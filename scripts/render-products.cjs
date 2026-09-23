// Render the existing product-card template at build time for non-JavaScript readers.
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const containers = {};
const context = vm.createContext({
  document: { getElementById: (id) => (containers[id] ||= { innerHTML: '' }) },
  encodeURIComponent,
});
for (const file of ['products-data.js', 'product-renderer.js']) {
  vm.runInContext(fs.readFileSync(path.join(root, 'assets/js', file), 'utf8'), context);
}
let html = fs.readFileSync(path.join(root, 'products.html'), 'utf8');
for (const material of ['PS', 'PET']) {
  const id = `${material.toLowerCase()}-products-grid`;
  vm.runInContext(`ProductRenderer.renderProductGrid('${id}', {material: '${material}'});`, context);
  const start = `<!-- static-products:${material}:start -->`;
  const end = `<!-- static-products:${material}:end -->`;
  const content = `${start}\n${containers[id].innerHTML.replace(/[ \t]+$/gm, '')}\n${end}`;
  if (html.includes(start)) {
    html = html.replace(new RegExp(`${start}[\\s\\S]*?${end}`), content);
  } else {
    const emptyGrid = new RegExp(`(<div id="${id}"[^>]*>)[\\s\\S]*?</div>`);
    if (!emptyGrid.test(html)) throw new Error(`Missing product grid ${id}`);
    html = html.replace(emptyGrid, (_, open) => `${open}${content}</div>`);
  }
}
fs.writeFileSync(path.join(root, 'products.html'), html);
console.log('Rendered 17 existing PS/PET product cards into products.html.');
