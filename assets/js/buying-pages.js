(() => {
  const cards = [...document.querySelectorAll('.size-card')];
  const filters = [...document.querySelectorAll('[data-size-filter]')];
  const search = document.querySelector('[data-size-search]');
  const count = document.querySelector('[data-size-count]');
  let category = 'all';
  function updateSizes() {
    const words = search.value.toLowerCase().trim().split(/\s+/).filter(Boolean);
    let visible = 0;
    cards.forEach(card => {
      card.hidden = (category !== 'all' && card.dataset.category !== category) || !words.every(word => card.textContent.toLowerCase().includes(word));
      if (!card.hidden) visible++;
    });
    count.textContent = `${visible} box ${visible === 1 ? 'model' : 'models'}`;
    document.querySelector('.size-empty').hidden = visible !== 0;
    filters.forEach(button => {
      const selected = button.dataset.sizeFilter === category;
      button.classList.toggle('active', selected);
      button.setAttribute('aria-pressed', String(selected));
    });
  }
  if (search) {
    filters.forEach(button => button.addEventListener('click', () => { category = button.dataset.sizeFilter; updateSizes(); }));
    search.addEventListener('input', updateSizes);
    document.querySelector('[data-size-reset]').addEventListener('click', () => { category = 'all'; search.value = ''; updateSizes(); search.focus(); });
    updateSizes();
  }
  const triggers = [...document.querySelectorAll('[data-full-image]')];
  if (!triggers.length) return;
  const dialog = document.createElement('dialog');
  dialog.className = 'image-dialog';
  dialog.setAttribute('aria-label', 'Full product image');
  const bar = document.createElement('div');
  bar.className = 'image-dialog-bar';
  const label = document.createElement('span');
  label.textContent = 'Full image';
  const close = document.createElement('button');
  close.type = 'button';
  close.textContent = 'Close ×';
  close.setAttribute('aria-label', 'Close full image');
  bar.append(label, close);
  const full = document.createElement('img');
  dialog.append(bar, full);
  document.body.append(dialog);
  let trigger;
  triggers.forEach(button => button.addEventListener('click', () => {
    const img = button.querySelector('img');
    trigger = button;
    full.src = img.currentSrc || img.src;
    full.alt = img.alt;
    dialog.showModal();
    close.focus();
  }));
  close.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  dialog.addEventListener('close', () => trigger?.focus({preventScroll: true}));
})();
