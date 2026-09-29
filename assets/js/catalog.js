(() => {
  const page = document.querySelector('.catalog-page');
  if (!page) return;
  const layout = page.querySelector('.catalog-layout');
  const source = page.querySelector('.catalog-source');
  const grid = page.querySelector('#catalog-display');
  const filters = page.querySelector('.catalog-filters');
  const sortRow = page.querySelector('.catalog-sort');
  if (!layout || !source || !grid || !filters || !sortRow) return;
  const cards = [...source.querySelectorAll('.product-card')];
  if (!cards.length) return;
  const search = page.querySelector('#catalog-search');
  const checkboxes = [...filters.querySelectorAll('input[type="checkbox"]')];
  const sortButtons = [...sortRow.querySelectorAll('[data-catalog-sort]')];
  const count = page.querySelector('#catalog-count');
  const empty = page.querySelector('.catalog-empty');
  const glassNote = page.querySelector('.catalog-glass-info');
  const noteHolder = page.querySelector('.catalog-glass-note');
  const normalize = value => value.toLocaleLowerCase('en').normalize('NFKD').replace(/[\u0300-\u036f]/g, '');
  const entries = cards.map((card, index) => {
    const material = card.dataset.material || 'glass';
    const name = card.querySelector('h3').textContent.trim();
    const shape = material === 'glass' ? 'oval' : /\bsquare\b/i.test(name) ? 'square' : /\bround\b/i.test(name) ? 'round' : 'rectangular';
    const info = card.querySelector('.product-body');
    const media = card.querySelector('.product-media');
    const originalAction = card.querySelector('.wa-btn');
    const actions = originalAction ? originalAction.parentElement : document.createElement('div');
    actions.classList.add('catalog-card-actions');
    if (!originalAction) card.append(actions);
    const quote = document.createElement('a');
    quote.className = 'btn catalog-quote';
    const sku = material === 'glass' ? `OGBD-${card.id.slice('oval-glass-dish-'.length).toUpperCase()}` : card.id.toUpperCase();
    quote.href = `/contact?sku=${encodeURIComponent(sku)}`;
    quote.textContent = 'Request Quote';
    actions.prepend(quote);
    if (!originalAction) {
      const whatsapp = document.createElement('a');
      const whatsappUrl = new URL(source.querySelector('.wa-btn').href);
      whatsappUrl.searchParams.set('text', `Hi, I'm interested in SKU ${sku} (${name}). Please send me the wholesale price, MOQ, packing details and sample information.`);
      whatsapp.href = whatsappUrl.href;
      whatsapp.className = 'btn wa-btn';
      whatsapp.target = '_blank';
      whatsapp.rel = 'noopener noreferrer';
      whatsapp.textContent = 'WhatsApp Me';
      actions.append(whatsapp);
    }
    // All materials share the same direct-child layout, including legacy wrapped cards.
    card.replaceChildren(media, info, actions);
    return {card, index, material, name, shape, text: normalize(info.textContent + ' ' + name)};
  });
  entries.forEach(({card}) => grid.append(card));
  if (glassNote) noteHolder.append(glassNote);
  function update() {
    const materials = checkboxes.filter(box => box.name === 'material' && box.checked).map(box => box.value);
    const shapes = checkboxes.filter(box => box.name === 'shape' && box.checked).map(box => box.value);
    const words = normalize(search.value.trim()).split(/\s+/).filter(Boolean);
    let visible = 0;
    entries.forEach(entry => {
      entry.card.hidden = (materials.length && !materials.includes(entry.material)) ||
        (shapes.length && !shapes.includes(entry.shape)) || !words.every(word => entry.text.includes(word));
      if (!entry.card.hidden) visible++;
    });
    count.textContent = `${visible} ${visible === 1 ? 'item' : 'items'}`;
    empty.hidden = visible !== 0;
    noteHolder.hidden = !glassNote || (materials.length > 0 && !materials.includes('glass')) || (shapes.length > 0 && !shapes.includes('oval')) || !!words.length || visible === 0;
    page.querySelectorAll('[data-catalog-jump]').forEach(link => {
      link.classList.toggle('is-selected', materials.length === 1 && materials[0] === link.dataset.catalogJump);
    });
  }
  function sort(mode) {
    sortButtons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.catalogSort === mode)));
    [...entries].sort((a,b) => mode === 'relevant' ? a.index - b.index :
      (mode === 'az' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)) || a.index - b.index)
      .forEach(entry => grid.append(entry.card));
  }
  function clear() {
    search.value = '';
    checkboxes.forEach(box => { box.checked = false; });
    update();
  }
  search.addEventListener('input', update);
  checkboxes.forEach(box => box.addEventListener('change', update));
  sortButtons.forEach(button => button.addEventListener('click', () => sort(button.dataset.catalogSort)));
  page.querySelector('#catalog-clear').addEventListener('click', clear);
  page.querySelector('#catalog-empty-reset').addEventListener('click', () => { clear(); search.focus(); });
  page.querySelectorAll('[data-catalog-jump]').forEach(link => link.addEventListener('click', event => {
    event.preventDefault();
    clear();
    filters.querySelector(`input[name="material"][value="${link.dataset.catalogJump}"]`).checked = true;
    update();
    sortRow.scrollIntoView({block:'start',behavior:'smooth'});
  }));
  sort('relevant');
  update();
  filters.hidden = false;
  sortRow.hidden = false;
  grid.hidden = false;
  layout.classList.add('is-interactive');
  function followHash() {
    const hash = decodeURIComponent(location.hash.slice(1));
    const materialHash = {'ps-dessert-boxes':'ps','pet-dessert-boxes':'pet','oval-glass-baking-dishes':'glass'}[hash];
    if (materialHash) {
      clear();
      filters.querySelector(`input[name="material"][value="${materialHash}"]`).checked = true;
      update();
      requestAnimationFrame(() => sortRow.scrollIntoView({block:'start'}));
    } else {
      const card = hash && document.getElementById(hash);
      if (card?.classList.contains('product-card')) {
        if (card.hidden) clear();
        requestAnimationFrame(() => card.scrollIntoView({block:'start'}));
      }
    }
  }
  window.addEventListener('hashchange', followHash);
  if (location.hash) followHash();
})();
