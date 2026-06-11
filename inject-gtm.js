const fs = require('fs');
const path = require('path');

const gtmHead = `  <!-- Google Tag Manager -->
  <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','GTM-XXXXXXX');</script>
  <!-- End Google Tag Manager -->`;

const ga4Head = `  <!-- Google Analytics (gtag.js) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXX');
  </script>`;

const gtmBody = `  <!-- Google Tag Manager (noscript) -->
  <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
  height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
  <!-- End Google Tag Manager (noscript) -->`;

const htmlFiles = [
  'index.html',
  'products.html',
  'clear-dessert-box-sizes.html',
  'custom-branding.html',
  'packaging-kits.html',
  'applications.html',
  'factory.html',
  'resources.html',
  'contact.html'
];

htmlFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (!fs.existsSync(filePath)) {
    console.log(`File not found: ${file}`);
    return;
  }
  let content = fs.readFileSync(filePath, 'utf8');

  // Remove any existing GTM or GA4 blocks to prevent double injection if re-run
  content = content.replace(/<!-- Google Tag Manager -->[\s\S]*?<!-- End Google Tag Manager -->/g, '');
  content = content.replace(/<!-- Google Tag Manager \(noscript\) -->[\s\S]*?<!-- End Google Tag Manager \(noscript\) -->/g, '');
  content = content.replace(/<!-- Google Analytics \(gtag\.js\) -->[\s\S]*?<\/script>/g, '');

  // 1. Inject GTM & GA4 in head
  // Insert at the beginning of <head>
  const headStartIdx = content.indexOf('<head>');
  if (headStartIdx !== -1) {
    const insertPos = headStartIdx + '<head>'.length;
    content = content.slice(0, insertPos) + '\n' + gtmHead + '\n' + ga4Head + content.slice(insertPos);
  }

  // 2. Inject GTM noscript in body
  // Insert at the beginning of <body>
  const bodyStartIdx = content.indexOf('<body>');
  if (bodyStartIdx !== -1) {
    const insertPos = bodyStartIdx + '<body>'.length;
    content = content.slice(0, insertPos) + '\n' + gtmBody + content.slice(insertPos);
  }

  // 3. Fix index.html canonical
  if (file === 'index.html') {
    content = content.replace(/<link rel="canonical" href="https:\/\/www\.cleardessertpack\.com\/index\.html" \/>/g, '<link rel="canonical" href="https://www.cleardessertpack.com/" />');
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Processed GTM/GA4 tracking code injection for: ${file}`);
});
