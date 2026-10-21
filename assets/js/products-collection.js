document.addEventListener('DOMContentLoaded', function () {
  const buttons = Array.from(document.querySelectorAll('[data-material-filter]'));
  const groups = Array.from(document.querySelectorAll('.product-index-group'));
  const sort = document.getElementById('product-index-sort');
  const count = document.getElementById('product-index-count');
  const views = Array.from(document.querySelectorAll('.product-index-toolbar [data-view]'));
  const originals = new Map(groups.map(group => [group, Array.from(group.querySelectorAll('.wholesale-product'))]));
  if (!buttons.length || !groups.length || !sort || !count) return;
  function filter(material) {
    let shown = 0;
    groups.forEach(group => {
      const visible = material === 'all' || group.dataset.group === material;
      group.hidden = !visible;
      if (visible) shown += originals.get(group).length;
    });
    buttons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.materialFilter === material)));
    count.textContent = shown + (shown === 1 ? ' model' : ' models');
  }
  function sortCards(value) {
    groups.forEach(group => {
      const original = originals.get(group);
      const cards = original.map((card, order) => ({ card, order }));
      if (value === 'capacity-asc') cards.sort((a, b) => Number(a.card.dataset.capacity) - Number(b.card.dataset.capacity) || a.order - b.order);
      if (value === 'capacity-desc') cards.sort((a, b) => Number(b.card.dataset.capacity) - Number(a.card.dataset.capacity) || a.order - b.order);
      if (value === 'name') cards.sort((a, b) => a.card.dataset.name.localeCompare(b.card.dataset.name));
      const grid = group.querySelector('.wholesale-grid');
      cards.forEach(item => grid.appendChild(item.card));
    });
  }
  buttons.forEach(button => button.addEventListener('click', () => filter(button.dataset.materialFilter)));
  sort.addEventListener('change', () => sortCards(sort.value));
  views.forEach(button => button.addEventListener('click', () => {
    const mode = button.dataset.view;
    groups.forEach(group => group.querySelector('.wholesale-grid').dataset.view = mode);
    views.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  }));
});
