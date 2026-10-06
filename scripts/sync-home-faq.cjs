// Generate homepage FAQ schema from the visible questions and answers.
const fs = require('node:fs');
const file = require('node:path').join(__dirname, '..', 'index.html');
let html = fs.readFileSync(file, 'utf8');
const section = html.match(/<section class="section" id="faq">([\s\S]*?)<\/section>/)?.[1];
if (!section) throw new Error('Homepage FAQ section missing');
const plain = value => value.replace(/<[^>]*>/g, '').replace(/&amp;/g, '&').replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/\s+/g, ' ').trim();
const mainEntity = [...section.matchAll(/<details[^>]*><summary>([\s\S]*?)<\/summary><p>([\s\S]*?)<\/p><\/details>/g)].map(([, question, answer]) => ({
  '@type': 'Question', name: plain(question), acceptedAnswer: { '@type': 'Answer', text: plain(answer) }
}));
if (mainEntity.length !== 6) throw new Error('Expected six visible homepage FAQs');
let replaced = false;
html = html.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/g, block => {
  const data = JSON.parse(block.replace(/<\/?script[^>]*>/g, ''));
  if (data['@type'] !== 'FAQPage') return block;
  replaced = true;
  return '<script type="application/ld+json">\n' + JSON.stringify({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity }, null, 2) + '\n  </script>';
});
if (!replaced) throw new Error('Homepage FAQ schema missing');
fs.writeFileSync(file, html);
console.log('Homepage FAQ: six visible questions synced to JSON-LD.');
