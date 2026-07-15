/**
 * Product Renderer Script
 * Dynamically renders product grids and tables using data from products-data.js.
 */

const ProductRenderer = {
  /**
   * Render the product grid for products.html
   * @param {string} containerId - The ID of the container element
   */
  renderProductGrid: function(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    let html = '';
    PRODUCTS.forEach(product => {
      html += `
        <article class="product-card" id="${product.sku.toLowerCase()}" data-category="${product.category.toLowerCase()}" style="display: flex; flex-direction: column; justify-content: space-between; height: 100%;">
          <div>
            <div class="product-media" style="background: #ffffff; display: flex; align-items: center; justify-content: center; padding: 12px; height: 190px; border-bottom: 1px solid var(--line);">
              <img src="${product.image}" alt="${product.name} - ${product.size_cm} ${product.capacity_ml}ml" style="max-width: 100%; max-height: 100%; object-fit: contain;" loading="lazy" />
            </div>
            <div class="product-body" style="padding: 20px;">
              <span class="tag" style="background: var(--mint); color: var(--coffee); font-weight: 900; margin-bottom: 8px;">${product.material} Material</span>
              <h3 style="font-size: 17px; margin: 0 0 8px; color: var(--coffee); font-weight: 900;">${product.sku}</h3>
              <ul class="specs" style="list-style: none; padding: 0; margin: 0; font-size: 13px; line-height: 1.5; color: var(--muted);">
                <li><strong>Size:</strong> ${product.size_cm}</li>
                <li><strong>Volume:</strong> ${product.capacity_ml} ml</li>
                <li><strong>QTY/CTN:</strong> ${product.qty_per_ctn} pcs/ctn</li>
                <li><strong>Best for:</strong> ${product.best_for}</li>
              </ul>
            </div>
          </div>
          <div style="padding: 0 20px 20px; display: flex; flex-direction: column; gap: 8px;">
            <a href="contact.html?sku=${product.sku}" class="btn" style="width: 100%; padding: 10px; font-size: 13px; text-align: center; justify-content: center; min-height: 38px; box-shadow: none;">Request Quote</a>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
              <a href="contact.html?sku=${product.sku}&type=sample" class="btn secondary" style="padding: 8px; font-size: 11px; text-align: center; justify-content: center; min-height: auto;">Ask for Sample</a>
              <a href="custom-branding.html" class="btn outline" style="padding: 8px; font-size: 11px; text-align: center; justify-content: center; min-height: auto;">Customize Packaging</a>
            </div>
          </div>
        </article>
      `;
    });

    container.innerHTML = html;
  },

  /**
   * Render the specification table for clear-dessert-box-sizes.html
   * @param {string} containerId - The ID of the container element
   */
  renderSizeTable: function(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    let html = `
      <div style="width: 100%; overflow-x: auto; border-radius: 8px; border: 1px solid var(--line); box-shadow: var(--shadow1);">
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
    `;

    PRODUCTS.forEach(product => {
      html += `
        <tr style="border-bottom: 1px solid var(--line);">
          <td style="padding: 14px; font-weight: bold; color: var(--coffee); font-size: 14px;">${product.sku}</td>
          <td style="padding: 14px; color: var(--ink); font-weight: bold; font-size: 14px;">${product.size_cm}</td>
          <td style="padding: 14px; color: var(--caramel); font-weight: bold; font-size: 14px;">${product.capacity_ml} ml</td>
          <td style="padding: 14px; font-size: 14px; color: var(--ink);">${product.qty_per_ctn} pcs/ctn</td>
          <td style="padding: 14px;"><span class="tag" style="margin: 0; background: var(--mint); color: var(--coffee); font-size: 12px;">${product.material}</span></td>
          <td style="padding: 14px; color: var(--ink); font-size: 14px;">${product.shape}</td>
          <td style="padding: 14px; font-size: 13px; color: var(--muted);">${product.best_for}</td>
          <td style="padding: 14px; text-align: center; display: flex; flex-direction: column; gap: 5px; align-items: center;">
            <a href="contact.html?sku=${product.sku}" class="btn" style="padding: 6px 12px; font-size: 12px; min-height: auto; border-radius: 6px; box-shadow: none; white-space: nowrap; width: 100%;">Request Quote</a>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 4px; width: 100%;">
              <a href="contact.html?sku=${product.sku}&type=sample" class="btn secondary" style="padding: 4px 8px; font-size: 10px; min-height: auto; width: 100%;">Sample</a>
              <a href="custom-branding.html" class="btn outline" style="padding: 4px 8px; font-size: 10px; min-height: auto; width: 100%;">Custom</a>
            </div>
          </td>
        </tr>
      `;
    });

    html += `
          </tbody>
        </table>
      </div>
    `;

    container.innerHTML = html;
  },

  /**
   * Render featured products for the homepage
   * @param {string} containerId - The ID of the container element
   * @param {string[]} skus - Optional list of SKUs to feature
   */
  renderFeaturedProducts: function(containerId, skus = ['HK-28188', 'HK-21157', 'E1300', 'SSM-016']) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const featuredProducts = PRODUCTS.filter(p => skus.includes(p.sku));
    
    let html = '';
    featuredProducts.forEach(product => {
      html += `
        <article class="product-card" style="display: flex; flex-direction: column; justify-content: space-between; height: 100%;">
          <div>
            <div class="product-media" style="background: #ffffff; display: flex; align-items: center; justify-content: center; padding: 12px; height: 210px; border-bottom: 1px solid var(--line);">
              <img src="${product.image}" alt="${product.name}" style="max-width: 100%; max-height: 100%; object-fit: contain;" loading="lazy" />
            </div>
            <div class="product-body" style="padding: 20px;">
              <span class="tag" style="background: var(--mint); color: var(--coffee); font-weight: 900; margin-bottom: 8px;">${product.material} Material</span>
              <h3 style="font-size: 18px; margin: 0 0 10px; color: var(--coffee); font-weight: 900;">${product.sku} ${product.shape.split(' ')[0]} Box</h3>
              <ul class="specs" style="list-style: none; padding: 0; margin: 0 0 16px; font-size: 14px; line-height: 1.6; color: var(--muted);">
                <li style="margin-bottom: 4px; padding-left: 14px; position: relative;"><span style="position: absolute; left: 0; color: var(--caramel);">•</span><strong>Size:</strong> ${product.size_cm}</li>
                <li style="margin-bottom: 4px; padding-left: 14px; position: relative;"><span style="position: absolute; left: 0; color: var(--caramel);">•</span><strong>Capacity:</strong> ${product.capacity_ml}ml</li>
                <li style="margin-bottom: 4px; padding-left: 14px; position: relative;"><span style="position: absolute; left: 0; color: var(--caramel);">•</span><strong>Perfect for:</strong> ${product.best_for}</li>
              </ul>
            </div>
          </div>
          <div style="padding: 0 20px 20px; display: flex; flex-direction: column; gap: 8px;">
            <a href="contact.html?sku=${product.sku}" class="btn" style="width: 100%; padding: 12px; font-size: 14px; text-align: center; justify-content: center; min-height: 44px; box-shadow: none;">Request Quote</a>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
              <a href="contact.html?sku=${product.sku}&type=sample" class="btn secondary" style="padding: 8px; font-size: 11px; text-align: center; justify-content: center; min-height: auto;">Ask for Sample</a>
              <a href="custom-branding.html" class="btn outline" style="padding: 8px; font-size: 11px; text-align: center; justify-content: center; min-height: auto;">Customize Packaging</a>
            </div>
          </div>
        </article>
      `;
    });

    container.innerHTML = html;
  }
};
