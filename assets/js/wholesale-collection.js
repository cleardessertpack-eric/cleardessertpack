(() => {
  const grid = document.querySelector('#wholesale-products');
  const sort = document.querySelector('#wholesale-sort');
  const buttons = document.querySelectorAll('[data-wholesale-view]');
  if (!grid || !sort) return;

  const cards = [...grid.querySelectorAll('.wholesale-product')];
  cards.forEach((card, index) => { card.dataset.featured = String(index); });

  sort.addEventListener('change', () => {
    const order = sort.value;
    cards.sort((a, b) => {
      if (order === 'capacity-asc') return Number(a.dataset.capacity) - Number(b.dataset.capacity);
      if (order === 'capacity-desc') return Number(b.dataset.capacity) - Number(a.dataset.capacity);
      if (order === 'name-asc') return a.dataset.name.localeCompare(b.dataset.name);
      return Number(a.dataset.featured) - Number(b.dataset.featured);
    });
    grid.append(...cards);
  });

  buttons.forEach(button => button.addEventListener('click', () => {
    grid.dataset.view = button.dataset.wholesaleView;
    buttons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  }));
})();
