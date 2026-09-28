(() => {
  const page = document.querySelector('.branding-page');
  if (!page) return;
  const cards = Array.from(page.querySelectorAll('.branding-gallery-card'));
  const filters = page.querySelector('.branding-filters');
  const count = page.querySelector('#branding-gallery-count');
  const dialog = page.querySelector('#branding-lightbox');
  const image = page.querySelector('#branding-lightbox-image');
  const title = page.querySelector('#branding-lightbox-title');
  const position = page.querySelector('#branding-lightbox-position');
  let activeCard = null;
  let previousOverflow = '';
  const visibleCards = () => cards.filter(card => !card.hidden);
  const show = card => {
    activeCard = card;
    const source = card.querySelector('img');
    image.src = source.src;
    image.alt = source.alt;
    title.textContent = card.querySelector('figcaption').textContent;
    const visible = visibleCards();
    position.textContent = `${visible.indexOf(card) + 1} / ${visible.length}`;
  };
  const step = direction => {
    const visible = visibleCards();
    show(visible[(visible.indexOf(activeCard) + direction + visible.length) % visible.length]);
  };
  filters.hidden = false;
  filters.addEventListener('click', event => {
    const button = event.target.closest('button[data-filter]');
    if (!button) return;
    filters.querySelectorAll('button').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    cards.forEach(card => { card.hidden = button.dataset.filter !== 'all' && card.dataset.category !== button.dataset.filter; });
    const length = visibleCards().length;
    count.textContent = `${length} concept${length === 1 ? '' : 's'}`;
  });
  cards.forEach(card => {
    card.querySelector('a').addEventListener('click', event => {
      // The image link remains usable in browsers without native dialogs.
      if (!dialog.showModal || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      show(card);
      previousOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      dialog.showModal();
      dialog.querySelector('[data-lightbox-close]').focus();
    });
  });
  dialog.querySelector('[data-lightbox-close]').addEventListener('click', () => dialog.close());
  dialog.querySelector('[data-lightbox-prev]').addEventListener('click', () => step(-1));
  dialog.querySelector('[data-lightbox-next]').addEventListener('click', () => step(1));
  dialog.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      step(event.key === 'ArrowLeft' ? -1 : 1);
    }
  });
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
  });
  dialog.addEventListener('close', () => {
    document.body.style.overflow = previousOverflow;
    activeCard?.querySelector('a').focus({ preventScroll: true });
  });
})();
