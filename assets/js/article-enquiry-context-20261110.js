/* Approved buyer-guide links can prefill the existing contact form. */
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
    },
    'how-to-test-tiramisu-packaging-samples': {
      product: 'Tiramisu packaging sample review',
      application: 'Filled sample and lid fit approval',
      fields: ['Container body and matching lid SKU', 'Finished dessert dimensions and filled weight', 'Storage, carrying and stack conditions', 'Sample quantity and destination postcode']
    },
    'eco-friendly-dessert-containers-bulk': {
      product: 'Tiramisu container material review',
      application: 'Model-specific environmental documentation',
      fields: ['Container body and matching lid SKU', 'Environmental claim and document scope to verify', 'Order quantity and destination market', 'Intended dessert and handling conditions']
    },
    'how-to-choose-large-tiramisu-box': {
      product: 'PS and PET tiramisu container comparison',
      application: 'PS/PET container sample comparison',
      fields: ['Candidate model and matching lid', 'Dessert size, topping height and filled weight', 'Storage and transport conditions', 'Quantity and destination postcode']
    },
    'custom-dessert-packaging-guide': {
      product: 'Tiramisu box paper sleeve or logo label',
      application: 'Branded tiramisu container quotation',
      fields: ['Selected container and lid SKU', 'Sleeve or label design, dimensions and artwork', 'Quantity per design and packing process', 'Destination postcode and sample requirement']
    },
    'how-to-use-acrylic-cocoa-stencils': {
      product: 'Tiramisu cocoa stencil and container',
      application: 'Cocoa stencil with tiramisu container',
      fields: ['Artwork and dessert surface dimensions', 'Selected body and matching lid', 'Stencil quantity and intended service process', 'Destination postcode and sample requirement']
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
