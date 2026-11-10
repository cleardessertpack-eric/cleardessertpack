/* Only the two approved article links can prefill the existing contact form. */
const applyArticleEnquiryContext = () => {
  if (window.location.pathname.replace(/\/$/, '') !== '/contact') return;
  const contexts = {
    'tiramisu-container-size-guide': {
      product: 'Tiramisu containers — size selection',
      application: 'Tiramisu container size selection',
      fields: ['Selected model (if known)', 'Finished dessert length × width × height', 'Space needed beneath the closed lid', 'Bodies / lids / complete sets and quantity', 'Destination country and postcode']
    },
    'tiramisu-container-wholesale-buying-guide': {
      product: 'Wholesale tiramisu container order',
      application: 'Wholesale tiramisu container procurement',
      fields: ['Body and matching lid SKU for each model', 'Quantity by SKU and unit (bodies / lids / complete sets)', 'Destination country and postcode', 'Required delivery window', 'Sample approval requirements']
    }
  };
  const slug = new URLSearchParams(window.location.search).get('guide');
  const context = Object.prototype.hasOwnProperty.call(contexts, slug) ? contexts[slug] : null;
  const form = document.querySelector('[data-inquiry-form]');
  if (!context || !form) return;
  const product = form.querySelector('[name="product"]');
  const message = form.querySelector('[name="message"]');
  if (product && !product.value.trim()) product.value = context.product;
  if (message && !message.value.trim()) {
    message.value = `Source article: https://www.cleardessertpack.com/${slug}\n\n${context.fields.map(field => `${field}:`).join('\n')}`;
  }
  if (!form.querySelector('[name="application"]')) {
    const field = document.createElement('input');
    field.type = 'hidden';
    field.name = 'application';
    field.value = context.application;
    form.appendChild(field);
  }
};
// Run after the existing form's DOMContentLoaded initializer has set its fields.
if (document.readyState === 'complete') applyArticleEnquiryContext();
else document.addEventListener('DOMContentLoaded', applyArticleEnquiryContext, { once: true });
