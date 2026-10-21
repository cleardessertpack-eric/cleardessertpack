document.addEventListener('DOMContentLoaded', () => {
  const input = document.querySelector('[data-size-search]');
  const rows = [...document.querySelectorAll('[data-size-row]')];
  const count = document.querySelector('[data-size-count]');
  const empty = document.querySelector('[data-size-empty]');
  const reset = document.querySelector('[data-size-reset]');
  if (!input || !rows.length) return;

  const update = () => {
    const query = input.value.trim().toLocaleLowerCase();
    let visible = 0;
    rows.forEach(row => {
      const match = row.textContent.toLocaleLowerCase().includes(query);
      row.hidden = !match;
      if (match) visible++;
    });
    count.textContent = visible + (visible === 1 ? ' model' : ' models');
    empty.hidden = visible !== 0;
  };

  input.addEventListener('input', update);
  reset?.addEventListener('click', () => { input.value = ''; update(); input.focus(); });
});
