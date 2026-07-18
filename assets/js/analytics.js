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
