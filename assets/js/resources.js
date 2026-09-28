(() => {
  const filters = document.querySelector('.journal-filters');
  const cards = Array.from(document.querySelectorAll('.journal-library [data-topic]'));
  const count = document.getElementById('journal-count');
  if (!filters || !cards.length || !count) return;
  filters.hidden = false;
  filters.addEventListener('click', event => {
    const button = event.target.closest('button[data-filter]');
    if (!button) return;
    filters.querySelectorAll('button').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    let visible = 0;
    cards.forEach(card => {
      card.hidden = button.dataset.filter !== 'all' && card.dataset.topic !== button.dataset.filter;
      if (!card.hidden) visible++;
    });
    count.textContent = visible === 1 ? '1 guide' : `${visible} guides & references`;
  });
})();
