/* One navigation controller for every public page. */
(() => {
  const toggle = document.getElementById('cdpMenuToggle');
  const nav = document.getElementById('cdpNavLinks');
  if (!toggle || !nav) return;
  const setOpen = open => {
    nav.classList.toggle('cdp-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  };
  toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
  nav.addEventListener('click', event => { if (event.target.closest('a')) setOpen(false); });
  document.addEventListener('click', event => {
    if (!nav.contains(event.target) && !toggle.contains(event.target)) setOpen(false);
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      setOpen(false);
      toggle.focus();
    }
  });
  window.matchMedia('(min-width: 1181px)').addEventListener('change', event => { if (event.matches) setOpen(false); });
})();
