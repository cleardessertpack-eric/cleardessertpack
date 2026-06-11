const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'clear-dessert-box-sizes.html');
let content = fs.readFileSync(filePath, 'utf8');

// We will construct the body of <main> and update metadata in <head>
// Let's first update the title and meta description in the <head>
content = content.replace(/<title>[\s\S]*?<\/title>/, '<title>Clear Dessert Box Size Chart | PS PET Tiramisu Containers</title>');
content = content.replace(/<meta name="description"[\s\S]*?\/>/, '<meta name="description" content="View clear PS and PET dessert box sizes for tiramisu, mousse cake, cheesecake, bakery takeaway and catering dessert trays. Check item number, size, volume, carton quantity and material, then request wholesale quotation." />');

// Let's extract the header structure and the footer structure to ensure we keep them perfectly intact.
// The header starts from <!DOCTYPE html> to </header>
const headerEndIdx = content.indexOf('</header>');
const headerPart = content.slice(0, headerEndIdx + '</header>'.length);

// Let's build the new <main> content
const productsData = [
  {
    sku: "HK-28188",
    name: "Large Clear Tiramisu Box",
    material: "PS",
    size: "28 × 18 × 8 cm",
    volume: "4000 ml",
    qty: "28 pcs/ctn",
    bestFor: "wedding desserts, party tiramisu and catering trays",
    shape: "Rectangular",
    category: "large",
    img: "assets/img/products/hk-28188-large-clear-tiramisu-box-4000ml.webp"
  },
  {
    sku: "HK-21157",
    name: "Clear Tiramisu Container",
    material: "PS",
    size: "21 × 15 × 7 cm",
    volume: "1800 ml",
    qty: "72 pcs/ctn",
    bestFor: "large tiramisu boxes and family-size desserts",
    shape: "Rectangular",
    category: "large",
    img: "assets/img/products/hk-21157-clear-tiramisu-container-1800ml.webp"
  },
  {
    sku: "E1300",
    name: "Clear PET Dessert Box",
    material: "PET",
    size: "18 × 13 × 6.4 cm",
    volume: "1300 ml",
    qty: "96 pcs/ctn",
    bestFor: "bakery takeaway and standard dessert packaging",
    shape: "Rectangular",
    category: "medium",
    img: "assets/img/products/e1300-clear-pet-dessert-box-1300ml.webp"
  },
  {
    sku: "SSM-016",
    name: "Clear Round Dessert Container",
    material: "PS",
    size: "Ø12.2 × 5.5 cm",
    volume: "600 ml",
    qty: "147 pcs/ctn",
    bestFor: "round tiramisu, mousse cake and premium desserts",
    shape: "Round",
    category: "round",
    img: "assets/img/products/ssm-016-clear-round-dessert-container-600ml.webp"
  },
  {
    sku: "SSM-004",
    name: "Clear Square Box",
    material: "PS",
    size: "9.5 × 9.5 × 6.3 cm",
    volume: "450 ml",
    qty: "200 pcs/ctn",
    bestFor: "small dessert portion, single-serve tiramisu",
    shape: "Square",
    category: "small",
    img: "assets/img/products/ssm-004-clear-square-box-450ml.webp"
  },
  {
    sku: "HK-034",
    name: "Large Clear Tiramisu Box",
    material: "PS",
    size: "37 × 20 × 7.2 cm",
    volume: "4500 ml",
    qty: "12 pcs/ctn",
    bestFor: "large tiramisu box and catering dessert trays",
    shape: "Rectangular / Tray",
    category: "large",
    img: "assets/img/products/hk-034-large-clear-tiramisu-box-4500ml.webp"
  },
  {
    sku: "SM-040",
    name: "Clear Tiramisu Box",
    material: "PS",
    size: "20 × 13.6 × 5.5 cm",
    volume: "1250 ml",
    qty: "45 pcs/ctn",
    bestFor: "medium dessert box and tiramisu display",
    shape: "Rectangular",
    category: "medium",
    img: "assets/img/products/sm-040-clear-tiramisu-box-1250ml.webp"
  },
  {
    sku: "SSM-045",
    name: "Clear Dessert Container",
    material: "PS",
    size: "16 × 13 × 4.8 cm",
    volume: "600 ml",
    qty: "117 pcs/ctn",
    bestFor: "medium dessert box and standard mousse cake",
    shape: "Rectangular",
    category: "medium",
    img: "assets/img/products/ssm-045-clear-dessert-container-600ml.webp"
  },
  {
    sku: "SSM-002",
    name: "Clear Rectangular Box",
    material: "PS",
    size: "11.8 × 6 × 5.1 cm",
    volume: "300 ml",
    qty: "294 pcs/ctn",
    bestFor: "small dessert box and tiramisu portion",
    shape: "Rectangular",
    category: "small",
    img: "assets/img/products/ssm-002-clear-rectangular-box-300ml.webp"
  },
  {
    sku: "SSM-012",
    name: "Clear Rectangular Box",
    material: "PS",
    size: "11.8 × 6 × 7 cm",
    volume: "400 ml",
    qty: "225 pcs/ctn",
    bestFor: "small dessert box and tall tiramisu",
    shape: "Rectangular",
    category: "small",
    img: "assets/img/products/ssm-012-clear-rectangular-box-400ml.webp"
  },
  {
    sku: "SSM-205",
    name: "Clear Square Box",
    material: "PS",
    size: "8.5 × 8.5 × 6.3 cm",
    volume: "380 ml",
    qty: "258 pcs/ctn",
    bestFor: "small dessert box and mousse cake",
    shape: "Square",
    category: "small",
    img: "assets/img/products/ssm-205-clear-square-box-380ml.webp"
  },
  {
    sku: "SSM-028",
    name: "Clear Rectangular Box",
    material: "PS",
    size: "15.6 × 8.5 × 7.2 cm",
    volume: "500 ml",
    qty: "120 pcs/ctn",
    bestFor: "medium rectangular dessert box and cake packaging",
    shape: "Rectangular",
    category: "medium",
    img: "assets/img/products/ssm-028-clear-rectangular-box-500ml.webp"
  },
  {
    sku: "SSM-024",
    name: "Clear Square Box",
    material: "PS",
    size: "11.8 × 11.8 × 6 cm",
    volume: "600 ml",
    qty: "125 pcs/ctn",
    bestFor: "medium square dessert box and tiramisu cake",
    shape: "Square",
    category: "small",
    img: "assets/img/products/ssm-024-clear-square-box.webp"
  },
  {
    sku: "SSM-018",
    name: "Clear Square Box",
    material: "PS",
    size: "10 × 10 × 7.5 cm",
    volume: "500 ml",
    qty: "144 pcs/ctn",
    bestFor: "medium square dessert box and tall tiramisu",
    shape: "Square",
    category: "medium",
    img: "assets/img/products/ssm-018-clear-square-box-500ml.webp"
  },
  {
    sku: "HK-37106",
    name: "Clear Tiramisu Box",
    material: "PS",
    size: "15.6 × 11.8 × 7 cm",
    volume: "1300 ml",
    qty: "100 pcs/ctn",
    bestFor: "medium tiramisu box and bakery takeaway",
    shape: "Rectangular",
    category: "long",
    img: "assets/img/products/hk-37106-clear-tiramisu-box-1300ml.webp"
  },
  {
    sku: "HK-30117",
    name: "Clear PS Tray / Box (30x11)",
    material: "PS",
    size: "30 × 11 × 7.1 cm",
    volume: "2300 ml",
    qty: "40 pcs/ctn",
    bestFor: "long dessert tray and catering share plates",
    shape: "Rectangular / Tray",
    category: "long",
    img: "assets/img/products/clear-ps-tray-box-30-11-7.webp"
  },
  {
    sku: "HK-40117",
    name: "Clear PS Tray / Box (40x11)",
    material: "PS",
    size: "40 × 11 × 7.1 cm",
    volume: "3000 ml",
    qty: "32 pcs/ctn",
    bestFor: "extra large dessert tray and catering presentation",
    shape: "Rectangular / Tray",
    category: "long",
    img: "assets/img/products/clear-ps-box-40-11-7.webp"
  }
];

// Rebuild main HTML content
const mainContent = `
<main>
  <section class="page-hero">
    <div class="container">
      <div class="breadcrumb">Home / Box Sizes</div>
      <span class="eyebrow">Dimension Chart</span>
      <h1>Clear PS / PET Dessert Box Size Chart</h1>
      <p class="hero-text">Choose from multiple clear dessert box sizes for tiramisu, mousse cake, cheesecake, bakery takeaway and catering dessert trays.</p>
      <div class="hero-actions" style="margin-top: 24px; display: flex; flex-wrap: wrap; gap: 12px; justify-content: center;">
        <a class="btn" href="#quote" style="display: inline-flex; align-items: center; justify-content: center;">Request Wholesale Quote</a>
        <a class="btn wa-btn" href="https://wa.me/8618358130956?text=Hi%2C%20I%20would%20like%20to%20chat%20about%20your%20clear%20dessert%20box%20sizes%20and%20request%20samples." target="_blank" style="display: inline-flex; align-items: center; justify-content: center; background-color: #25d366; color: white;">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" style="width: 16px; height: 16px; fill: currentColor; margin-right: 6px; vertical-align: middle;"><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-93.8-25.7l-6.7-4-69.8 18.3 18.7-68.1-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/></svg>
          Chat on WhatsApp
        </a>
      </div>
    </div>
  </section>

  <!-- Buyer Guide Section -->
  <section class="buyer-guide-section" style="background: var(--cream); padding: 48px 0; border-bottom: 1px solid var(--line);">
    <div class="container" style="max-width: 800px; text-align: center;">
      <h2 style="font-size: 28px; color: var(--coffee); font-weight: 900; margin-bottom: 16px;">How to Choose the Right Dessert Box Size</h2>
      <p style="font-size: 16px; line-height: 1.6; color: var(--ink); margin: 0;">
        Tell us your dessert type, size, quantity and destination country. We will recommend suitable PS / PET dessert box sizes, sample options and bulk packing details.
      </p>
    </div>
  </section>

  <section class="products-section" style="background: linear-gradient(180deg, var(--white), var(--cream)); padding: 76px 0;">
    <div class="container">
      <div class="section-head">
        <span class="eyebrow">Category Filter</span>
        <h2>Filter 17 SKU Clear Boxes by Category</h2>
        <p>Choose a category to find the exact dimensions, volumes, and carton quantities for your specific dessert packaging applications.</p>
      </div>
      
      <div class="filter-tabs-wrap" style="display: flex; flex-wrap: wrap; justify-content: center; gap: 10px; margin-bottom: 40px;">
        <button class="filter-tab active" data-category="all">Show All (17)</button>
        <button class="filter-tab" data-category="small">Small (5)</button>
        <button class="filter-tab" data-category="medium">Medium (5)</button>
        <button class="filter-tab" data-category="large">Large (3)</button>
        <button class="filter-tab" data-category="long">Long (3)</button>
        <button class="filter-tab" data-category="round">Round (1)</button>
      </div>

      <style>
        .filter-tab {
          padding: 10px 22px;
          border-radius: 999px;
          border: 1px solid var(--line);
          background: #fff;
          color: var(--coffee);
          font-weight: 900;
          cursor: pointer;
          font-size: 14px;
          transition: all 0.2s ease-in-out;
          box-shadow: var(--shadow2);
        }
        .filter-tab:hover, .filter-tab.active {
          background: var(--coffee);
          color: #fff;
          border-color: var(--coffee);
        }
      </style>

      <div class="grid-3" id="sku-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 30px;">
        ${productsData.map((p, index) => {
          const isFirstScreen = index < 3;
          const loadingAttr = isFirstScreen ? '' : 'loading="lazy"';
          const waMsg = encodeURIComponent(`Hi, I'm interested in clear dessert box SKU ${p.sku}.
Size: ${p.size}
Volume: ${p.volume}
Material: ${p.material}
Shape: ${p.shape}
Can you provide sample support and a wholesale quotation?`);
          return `
        <article class="product-card" data-category="${p.category}" style="background: #fff; border-radius: 12px; border: 1px solid var(--line); overflow: hidden; display: flex; flex-direction: column; transition: transform 0.2s ease, box-shadow 0.2s ease; box-shadow: var(--shadow1);">
          <div style="aspect-ratio: 4/3; background: #faf8f5; display: flex; align-items: center; justify-content: center; position: relative;">
            <img src="${p.img}" alt="${p.name} - SKU ${p.sku} size ${p.size}" ${loadingAttr} style="width: 100%; height: 100%; object-fit: contain; padding: 15px;" />
            <span class="tag" style="position: absolute; top: 12px; right: 12px; background: var(--mint); color: var(--coffee); margin: 0; font-size: 11px;">${p.material}</span>
          </div>
          <div style="padding: 20px; display: flex; flex-direction: column; flex-grow: 1;">
            <h3 style="font-size: 18px; margin: 0 0 8px; color: var(--coffee); font-weight: 900;">${p.sku}</h3>
            <p style="font-size: 14px; color: var(--ink); font-weight: bold; margin: 0 0 12px;">${p.name}</p>
            <div style="border-top: 1px dashed var(--line); border-bottom: 1px dashed var(--line); padding: 10px 0; margin-bottom: 15px;">
              <div style="display: flex; justify-content: space-between; font-size: 13px; margin-bottom: 6px;">
                <span style="color: var(--muted);">Dimensions:</span>
                <span style="font-weight: bold; color: var(--coffee);">${p.size}</span>
              </div>
              <div style="display: flex; justify-content: space-between; font-size: 13px; margin-bottom: 6px;">
                <span style="color: var(--muted);">Capacity:</span>
                <span style="font-weight: bold; color: var(--caramel);">${p.volume}</span>
              </div>
              <div style="display: flex; justify-content: space-between; font-size: 13px; margin-bottom: 6px;">
                <span style="color: var(--muted);">Shape:</span>
                <span style="font-weight: bold; color: var(--coffee);">${p.shape}</span>
              </div>
              <div style="display: flex; justify-content: space-between; font-size: 13px;">
                <span style="color: var(--muted);">Carton Qty:</span>
                <span style="color: var(--ink);">${p.qty}</span>
              </div>
            </div>
            <p style="font-size: 12px; line-height: 1.4; color: var(--muted); margin: 0 0 20px; flex-grow: 1;"><strong>Best For:</strong> ${p.bestFor}</p>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
              <a href="contact.html?sku=${p.sku}" class="btn" style="padding: 10px; font-size: 12px; text-align: center; justify-content: center; min-height: 38px; box-shadow: none;">Request Quote</a>
              <a href="https://wa.me/8618358130956?text=${waMsg}" target="_blank" class="btn wa-btn" style="padding: 10px; font-size: 12px; text-align: center; justify-content: center; min-height: 38px; box-shadow: none; background-color: #25d366; color: white;">WhatsApp Quote</a>
            </div>
          </div>
        </article>`;
        }).join('')}
      </div>
    </div>
  </section>

  <!-- Category Filter Script -->
  <script>
  document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.filter-tab');
    const cards = document.querySelectorAll('.product-card');
    
    tabs.forEach(tab => {
      tab.addEventListener('click', function() {
        tabs.forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        
        const category = this.getAttribute('data-category');
        cards.forEach(card => {
          const cardCategory = card.getAttribute('data-category');
          if (category === 'all' || cardCategory === category) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  });
  </script>

  <!-- Specification Table Section -->
  <section style="background: var(--white); padding: 76px 0; border-top: 1px solid var(--line); border-bottom: 1px solid var(--line);">
    <div class="container">
      <div class="section-head">
        <span class="eyebrow">Specifications</span>
        <h2>Full Specification Table</h2>
        <p>Compare the material, size, capacity, shape and packing configurations across our entire 17-SKU collection.</p>
      </div>

      <div style="width: 100%; overflow-x: auto; border-radius: 8px; border: 1px solid var(--line); box-shadow: var(--shadow1); -webkit-overflow-scrolling: touch;">
        <table style="width: 100%; border-collapse: collapse; min-width: 900px; background: #fff;">
          <thead>
            <tr style="background: var(--cream); border-bottom: 1px solid var(--line);">
              <th style="padding: 14px; font-weight: 900; color: var(--coffee); text-align: left; font-size: 14px;">Item No.</th>
              <th style="padding: 14px; font-weight: 900; color: var(--coffee); text-align: left; font-size: 14px;">Size</th>
              <th style="padding: 14px; font-weight: 900; color: var(--coffee); text-align: left; font-size: 14px;">Volume</th>
              <th style="padding: 14px; font-weight: 900; color: var(--coffee); text-align: left; font-size: 14px;">QTY/CTN</th>
              <th style="padding: 14px; font-weight: 900; color: var(--coffee); text-align: left; font-size: 14px;">Material</th>
              <th style="padding: 14px; font-weight: 900; color: var(--coffee); text-align: left; font-size: 14px;">Shape</th>
              <th style="padding: 14px; font-weight: 900; color: var(--coffee); text-align: left; font-size: 14px;">Best For</th>
              <th style="padding: 14px; font-weight: 900; color: var(--coffee); text-align: center; font-size: 14px;">Action</th>
            </tr>
          </thead>
          <tbody>
            ${productsData.map(p => {
              return `
            <tr style="border-bottom: 1px solid var(--line);">
              <td style="padding: 14px; font-weight: bold; color: var(--coffee); font-size: 14px;">${p.sku}</td>
              <td style="padding: 14px; color: var(--ink); font-weight: bold; font-size: 14px;">${p.size}</td>
              <td style="padding: 14px; color: var(--caramel); font-weight: bold; font-size: 14px;">${p.volume}</td>
              <td style="padding: 14px; font-size: 14px; color: var(--ink);">${p.qty}</td>
              <td style="padding: 14px;"><span class="tag" style="margin: 0; background: var(--mint); color: var(--coffee); font-size: 12px;">${p.material}</span></td>
              <td style="padding: 14px; color: var(--ink); font-size: 14px;">${p.shape}</td>
              <td style="padding: 14px; font-size: 13px; color: var(--muted);">${p.bestFor}</td>
              <td style="padding: 14px; text-align: center;">
                <a href="contact.html?sku=${p.sku}" class="btn" style="padding: 6px 12px; font-size: 12px; min-height: auto; border-radius: 6px; box-shadow: none; white-space: nowrap;">Request Quote</a>
              </td>
            </tr>`;
            }).join('')}
          </tbody>
        </table>
      </div>
    </div>
  </section>

  <!-- Custom Branding Options Section -->
  <section class="branding-options-section" style="background: var(--cream); padding: 76px 0;">
    <div class="container">
      <div class="section-head" style="text-align: center; margin-bottom: 48px;">
        <span class="eyebrow" style="color: var(--caramel); text-transform: uppercase; font-size: 13px; font-weight: 900; letter-spacing: 0.1em; display: block; margin-bottom: 8px;">Complete Your Brand</span>
        <h2 style="font-size: 32px; color: var(--coffee); font-weight: 900; margin: 0 0 16px;">Custom Branding Options for Dessert Boxes</h2>
        <p style="max-width: 600px; margin: 0 auto; color: var(--muted); line-height: 1.5;">Enhance your brand presentation with our high-quality custom packaging accessories designed specifically for our clear dessert boxes.</p>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px;">
        <!-- Card 1 -->
        <div style="background: #fff; border-radius: 12px; border: 1px solid var(--line); padding: 24px; display: flex; flex-direction: column; box-shadow: var(--shadow1);">
          <div style="font-size: 24px; color: var(--caramel); margin-bottom: 16px;">🏷️</div>
          <h3 style="font-size: 18px; color: var(--coffee); font-weight: 900; margin: 0 0 10px;">Logo Stickers</h3>
          <p style="font-size: 14px; line-height: 1.5; color: var(--muted); margin: 0 0 16px; flex-grow: 1;">Premium vinyl and paper labels with custom shapes and foil finishes. Waterproof adhesives perfect for chilled display cases.</p>
          <a href="custom-branding.html#stickers" style="color: var(--caramel); font-weight: bold; font-size: 14px; text-decoration: none; display: inline-flex; align-items: center; gap: 4px;">Learn More →</a>
        </div>
        <!-- Card 2 -->
        <div style="background: #fff; border-radius: 12px; border: 1px solid var(--line); padding: 24px; display: flex; flex-direction: column; box-shadow: var(--shadow1);">
          <div style="font-size: 24px; color: var(--caramel); margin-bottom: 16px;">🎫</div>
          <h3 style="font-size: 18px; color: var(--coffee); font-weight: 900; margin: 0 0 10px;">Paper Sleeves</h3>
          <p style="font-size: 14px; line-height: 1.5; color: var(--muted); margin: 0 0 16px; flex-grow: 1;">Custom-printed belly bands wrapped around clear dessert boxes. Excellent space for ingredients, barcodes, and branding.</p>
          <a href="custom-branding.html#sleeves" style="color: var(--caramel); font-weight: bold; font-size: 14px; text-decoration: none; display: inline-flex; align-items: center; gap: 4px;">Learn More →</a>
        </div>
        <!-- Card 3 -->
        <div style="background: #fff; border-radius: 12px; border: 1px solid var(--line); padding: 24px; display: flex; flex-direction: column; box-shadow: var(--shadow1);">
          <div style="font-size: 24px; color: var(--caramel); margin-bottom: 16px;">🛍️</div>
          <h3 style="font-size: 18px; color: var(--coffee); font-weight: 900; margin: 0 0 10px;">Paper Bags</h3>
          <p style="font-size: 14px; line-height: 1.5; color: var(--muted); margin: 0 0 16px; flex-grow: 1;">T-shape and wide-bottom takeout carriers custom-sized to keep your tiramisu and cake containers completely level during delivery.</p>
          <a href="custom-branding.html#bags" style="color: var(--caramel); font-weight: bold; font-size: 14px; text-decoration: none; display: inline-flex; align-items: center; gap: 4px;">Learn More →</a>
        </div>
        <!-- Card 4 -->
        <div style="background: #fff; border-radius: 12px; border: 1px solid var(--line); padding: 24px; display: flex; flex-direction: column; box-shadow: var(--shadow1);">
          <div style="font-size: 24px; color: var(--caramel); margin-bottom: 16px;">🎀</div>
          <h3 style="font-size: 18px; color: var(--coffee); font-weight: 900; margin: 0 0 10px;">Ribbons</h3>
          <p style="font-size: 14px; line-height: 1.5; color: var(--muted); margin: 0 0 16px; flex-grow: 1;">Custom-branded satin, grosgrain, and organza ribbons in diverse colors. Elegant logo printing to secure and beautify your gift packs.</p>
          <a href="custom-branding.html#ribbons" style="color: var(--caramel); font-weight: bold; font-size: 14px; text-decoration: none; display: inline-flex; align-items: center; gap: 4px;">Learn More →</a>
        </div>
        <!-- Card 5 -->
        <div style="background: #fff; border-radius: 12px; border: 1px solid var(--line); padding: 24px; display: flex; flex-direction: column; box-shadow: var(--shadow1);">
          <div style="font-size: 24px; color: var(--caramel); margin-bottom: 16px;">🎨</div>
          <h3 style="font-size: 18px; color: var(--coffee); font-weight: 900; margin: 0 0 10px;">Acrylic Cocoa Stencils</h3>
          <p style="font-size: 14px; line-height: 1.5; color: var(--muted); margin: 0 0 16px; flex-grow: 1;">Food-safe customized cocoa dusting stencils with your brand logo. Dust cocoa/sugar directly onto tiramisu cream for viral appeal.</p>
          <a href="custom-branding.html#stencils" style="color: var(--caramel); font-weight: bold; font-size: 14px; text-decoration: none; display: inline-flex; align-items: center; gap: 4px;">Learn More →</a>
        </div>
        <!-- Card 6 -->
        <div style="background: #fff; border-radius: 12px; border: 1px solid var(--line); padding: 24px; display: flex; flex-direction: column; box-shadow: var(--shadow1);">
          <div style="font-size: 24px; color: var(--caramel); margin-bottom: 16px;">🃏</div>
          <h3 style="font-size: 18px; color: var(--coffee); font-weight: 900; margin: 0 0 10px;">Insert Cards</h3>
          <p style="font-size: 14px; line-height: 1.5; color: var(--muted); margin: 0 0 16px; flex-grow: 1;">Premium cardboard brand insert and instruction cards. Share your brand story, handling guidelines, or a special promo message.</p>
          <a href="custom-branding.html" style="color: var(--caramel); font-weight: bold; font-size: 14px; text-decoration: none; display: inline-flex; align-items: center; gap: 4px;">Learn More →</a>
        </div>
      </div>
    </div>
  </section>

  <!-- FAQ Section -->
  <section class="faq-section" style="background: var(--white); padding: 76px 0; border-bottom: 1px solid var(--line);">
    <div class="container" style="max-width: 800px;">
      <div class="section-head" style="text-align: center; margin-bottom: 48px;">
        <span class="eyebrow" style="color: var(--caramel); text-transform: uppercase; font-size: 13px; font-weight: 900; letter-spacing: 0.1em; display: block; margin-bottom: 8px;">Got Questions?</span>
        <h2 style="font-size: 32px; color: var(--coffee); font-weight: 900; margin: 0 0 16px;">Frequently Asked Questions</h2>
        <p style="color: var(--muted); line-height: 1.5;">Find immediate answers to common questions about samples, ordering, custom branding, and shipping logistics.</p>
      </div>

      <div class="faq-accordion" style="display: flex; flex-direction: column; gap: 16px;">
        <!-- Q1 -->
        <div class="faq-item" style="border: 1px solid var(--line); border-radius: 8px; background: #fff; overflow: hidden; transition: all 0.3s ease;">
          <button class="faq-q" style="width: 100%; padding: 18px 24px; border: none; background: none; text-align: left; font-size: 16px; font-weight: bold; color: var(--coffee); cursor: pointer; display: flex; justify-content: space-between; align-items: center;">
            <span>Can I request samples before bulk order?</span>
            <span class="faq-icon" style="font-size: 14px; transition: transform 0.3s ease;">▼</span>
          </button>
          <div class="faq-a" style="padding: 0 24px 18px; color: var(--ink); line-height: 1.6; font-size: 14px; display: none;">
            Yes. Samples are available. Sample time depends on item and customization requirements.
          </div>
        </div>
        <!-- Q2 -->
        <div class="faq-item" style="border: 1px solid var(--line); border-radius: 8px; background: #fff; overflow: hidden; transition: all 0.3s ease;">
          <button class="faq-q" style="width: 100%; padding: 18px 24px; border: none; background: none; text-align: left; font-size: 16px; font-weight: bold; color: var(--coffee); cursor: pointer; display: flex; justify-content: space-between; align-items: center;">
            <span>Can you provide custom logo stickers or paper sleeves?</span>
            <span class="faq-icon" style="font-size: 14px; transition: transform 0.3s ease;">▼</span>
          </button>
          <div class="faq-a" style="padding: 0 24px 18px; color: var(--ink); line-height: 1.6; font-size: 14px; display: none;">
            Yes. We can provide custom logo stickers, paper sleeves, paper bags, ribbons and acrylic cocoa stencils for dessert brands.
          </div>
        </div>
        <!-- Q3 -->
        <div class="faq-item" style="border: 1px solid var(--line); border-radius: 8px; background: #fff; overflow: hidden; transition: all 0.3s ease;">
          <button class="faq-q" style="width: 100%; padding: 18px 24px; border: none; background: none; text-align: left; font-size: 16px; font-weight: bold; color: var(--coffee); cursor: pointer; display: flex; justify-content: space-between; align-items: center;">
            <span>What information should I send for quotation?</span>
            <span class="faq-icon" style="font-size: 14px; transition: transform 0.3s ease;">▼</span>
          </button>
          <div class="faq-a" style="padding: 0 24px 18px; color: var(--ink); line-height: 1.6; font-size: 14px; display: none;">
            Please send item number, size, quantity, destination country and custom branding requirements.
          </div>
        </div>
        <!-- Q4 -->
        <div class="faq-item" style="border: 1px solid var(--line); border-radius: 8px; background: #fff; overflow: hidden; transition: all 0.3s ease;">
          <button class="faq-q" style="width: 100%; padding: 18px 24px; border: none; background: none; text-align: left; font-size: 16px; font-weight: bold; color: var(--coffee); cursor: pointer; display: flex; justify-content: space-between; align-items: center;">
            <span>Are these boxes suitable for tiramisu and bakery takeaway?</span>
            <span class="faq-icon" style="font-size: 14px; transition: transform 0.3s ease;">▼</span>
          </button>
          <div class="faq-a" style="padding: 0 24px 18px; color: var(--ink); line-height: 1.6; font-size: 14px; display: none;">
            Yes. These clear PS / PET dessert boxes are suitable for tiramisu, mousse cake, cheesecake, bakery takeaway and catering desserts.
          </div>
        </div>
        <!-- Q5 -->
        <div class="faq-item" style="border: 1px solid var(--line); border-radius: 8px; background: #fff; overflow: hidden; transition: all 0.3s ease;">
          <button class="faq-q" style="width: 100%; padding: 18px 24px; border: none; background: none; text-align: left; font-size: 16px; font-weight: bold; color: var(--coffee); cursor: pointer; display: flex; justify-content: space-between; align-items: center;">
            <span>Can you help recommend a packaging kit?</span>
            <span class="faq-icon" style="font-size: 14px; transition: transform 0.3s ease;">▼</span>
          </button>
          <div class="faq-a" style="padding: 0 24px 18px; color: var(--ink); line-height: 1.6; font-size: 14px; display: none;">
            Yes. We can recommend clear boxes, stickers, sleeves, paper bags, ribbons and cocoa stencils according to your application scene.
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Bottom CTA and Wholesale Form -->
  <section class="cta" id="quote">
    <div>
      <span class="eyebrow">Wholesale Inquiry</span>
      <h2>Need wholesale price or sample support?</h2>
      <p style="margin-bottom: 24px;">Send us the item number, quantity and destination country. We will reply with MOQ, sample time, packing details and quotation.</p>
      
      <div style="display: flex; flex-wrap: wrap; gap: 12px; margin-bottom: 30px;">
        <a class="btn" href="#inquiry-form-anchor" style="display: inline-flex; align-items: center; justify-content: center; background-color: var(--coffee); color: white;">Request Quote</a>
        <a class="btn wa-btn" href="https://wa.me/8618358130956?text=Hi%2C%20I%20would%20like%20to%20request%20a%20custom%20dessert%20packaging%20quote.%20" target="_blank" style="display: inline-flex; align-items: center; justify-content: center; background-color: #25d366; color: white;">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" style="width: 16px; height: 16px; fill: currentColor; margin-right: 6px; vertical-align: middle;"><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-93.8-25.7l-6.7-4-69.8 18.3 18.7-68.1-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/></svg>
          Chat on WhatsApp
        </a>
      </div>
    </div>
    
    <div id="inquiry-form-anchor" style="padding-top: 10px;"></div>
    
    <form class="form" id="wholesale-inquiry-form" name="Wholesale Inquiry Form" data-inquiry-form>
      <input name="name" placeholder="Your name" required />
      <input name="company" placeholder="Company name" />
      <input name="country" placeholder="Country / market" />
      <input name="contact" placeholder="Email or WhatsApp" required />
      <select name="product">
        <option>Product interested in</option>
        <option>Clear Tiramisu Boxes</option>
        <option>Clear Dessert Containers</option>
        <option>Custom Logo Stickers / Labels</option>
        <option>Custom Paper Sleeves</option>
        <option>Custom Paper Bags</option>
        <option>Custom Ribbons</option>
        <option>Acrylic Cocoa Stencils</option>
        <option>Complete Packaging Kit</option>
      </select>
      <div class="checkbox-grid">
        <label><input type="checkbox" value="Logo stickers"> Logo Stickers</label>
        <label><input type="checkbox" value="Paper sleeves"> Paper Sleeves</label>
        <label><input type="checkbox" value="Paper bags"> Paper Bags</label>
        <label><input type="checkbox" value="Ribbons"> Ribbons</label>
        <label><input type="checkbox" value="Acrylic cocoa stencil"> Acrylic Stencil</label>
        <label><input type="checkbox" value="Custom box size"> Custom Box Size</label>
      </div>
      <select name="application">
        <option>Application scene</option>
        <option>Birthday dessert</option>
        <option>Wedding dessert</option>
        <option>Bakery takeaway</option>
        <option>Catering event</option>
        <option>Tiramisu brand</option>
        <option>Foodservice distributor</option>
      </select>
      <select name="logo_files">
        <option>Do you have logo files?</option>
        <option>AI / PDF / SVG available</option>
        <option>PNG / JPG only</option>
        <option>Need simple design support</option>
      </select>
      <input name="quantity" placeholder="Estimated order quantity" />
      <textarea name="message" placeholder="Tell us your box size, branding needs, target market and destination port"></textarea>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; width: 100%;">
        <button class="btn" type="submit" style="width: 100%;">Send Email Inquiry</button>
        <button class="btn wa-btn" type="button" data-wa-inquiry-btn style="width: 100%; background-color: #25d366; color: white;">Inquiry via WhatsApp</button>
      </div>
    </form>
  </section>
`;

// Now let's extract the footer from the original file
const footerStartIdx = content.indexOf('<footer class="site-footer">');
const footerPart = content.slice(footerStartIdx);

const finalHTML = headerPart + '\n' + mainContent + '\n' + footerPart;
fs.writeFileSync(filePath, finalHTML, 'utf8');
console.log('Successfully reconstructed clear-dessert-box-sizes.html!');
