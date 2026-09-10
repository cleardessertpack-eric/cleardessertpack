// Vercel Web Analytics and Speed Insights (included plan).
(function initVercelObservability() {
  if (window.__vercelObservabilityLoaded) return;
  window.__vercelObservabilityLoaded = true;
  window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };
  window.si = window.si || function () { (window.siq = window.siq || []).push(arguments); };
  [
    ['vercel-web-analytics', '/_vercel/insights/script.js'],
    ['vercel-speed-insights', '/_vercel/speed-insights/script.js']
  ].forEach(function (entry) {
    if (document.getElementById(entry[0])) return;
    var script = document.createElement('script');
    script.id = entry[0];
    script.defer = true;
    script.src = entry[1];
    document.head.appendChild(script);
  });
})();

// Google Analytics 4 tracking for Clear Dessert Pack.
// GitHub repo cleardessertpack-eric/cleardessertpack maps to the Vercel project cleardessertpack.
const GA_MEASUREMENT_ID = "G-3NFNBGGXG5";

window.dataLayer = window.dataLayer || [];
function gtag(){
  window.dataLayer.push(arguments);
}

gtag("js", new Date());
gtag("config", GA_MEASUREMENT_ID);

const gaScript = document.createElement("script");
gaScript.async = true;
gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
document.head.appendChild(gaScript);
