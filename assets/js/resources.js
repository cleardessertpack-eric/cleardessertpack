(() => {
  const root = document.querySelector('.resources-page');
  if (!root) return;
  const filters = root.querySelector('.resource-filters');
  const search = root.querySelector('#resource-search');
  const topics = [...root.querySelectorAll('.resource-topic-options input')];
  const sortControls = root.querySelector('.resource-sort-controls');
  const sortButtons = [...root.querySelectorAll('[data-sort]')];
  const grid = root.querySelector('.resource-grid');
  const cards = [...grid.querySelectorAll('.resource-card')];
  const count = root.querySelector('#resource-count');
  const empty = root.querySelector('.resource-empty');
  const normalize = text => text.toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '');
  const entries = cards.map((card, index) => ({
    card, index, date: Date.parse(card.dataset.published),
    topics: card.dataset.topics.split(' '),
    text: normalize(card.querySelector('.resource-card-body').textContent)
  }));
  function filter() {
    const selected = topics.filter(input => input.checked).map(input => input.value);
    const words = normalize(search.value.trim()).split(/\s+/).filter(Boolean);
    let visible = 0;
    entries.forEach(entry => {
      const matchesTopic = !selected.length || selected.some(topic => entry.topics.includes(topic));
      entry.card.hidden = !matchesTopic || !words.every(word => entry.text.includes(word));
      if (!entry.card.hidden) visible++;
    });
    count.textContent = `${visible} ${visible === 1 ? 'resource' : 'resources'}`;
    empty.hidden = visible !== 0;
  }
  function sort(direction) {
    sortButtons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.sort === direction)));
    [...entries].sort((a, b) => (direction === 'recent' ? b.date - a.date : a.date - b.date) || a.index - b.index)
      .forEach(entry => grid.append(entry.card));
  }
  function clear() {
    search.value = '';
    topics.forEach(input => { input.checked = false; });
    filter();
  }
  search.addEventListener('input', filter);
  topics.forEach(input => input.addEventListener('change', filter));
  sortButtons.forEach(button => button.addEventListener('click', () => sort(button.dataset.sort)));
  root.querySelector('#clear-resource-filters').addEventListener('click', clear);
  root.querySelector('#reset-resource-search').addEventListener('click', () => { clear(); search.focus(); });
  sort('recent');
  filter();
  filters.hidden = false;
  sortControls.hidden = false;
  root.querySelector('.resources-layout').classList.add('is-interactive');
})();
