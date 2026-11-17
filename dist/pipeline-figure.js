// The syllabus pipeline figure: each stage button opens its data panel (one at a time).
// Without this script every panel stays visible, which is also how the page prints.
(function () {
  const figure = document.querySelector('.pipeline');
  if (!figure) return;
  const buttons = [...figure.querySelectorAll('.pl-stage')];
  const panels = [...figure.querySelectorAll('.pl-panel')];
  const hint = figure.querySelector('.pl-hint');
  figure.classList.add('pl-js');

  function show(id) {
    buttons.forEach(b => b.setAttribute('aria-expanded', String(b.getAttribute('aria-controls') === id)));
    panels.forEach(p => { p.hidden = p.id !== id; });
    hint.hidden = Boolean(id);
  }

  buttons.forEach(button => button.addEventListener('click', () => {
    const id = button.getAttribute('aria-controls');
    const opening = button.getAttribute('aria-expanded') !== 'true';
    show(opening ? id : null);
    // On narrow screens the panel sits below every box; bring it into view.
    if (opening) document.getElementById(id).scrollIntoView({ block: 'nearest', behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  }));
  show(null);
  window.addEventListener('beforeprint', () => { panels.forEach(p => { p.hidden = false; }); hint.hidden = true; });
  window.addEventListener('afterprint', () => {
    const open = buttons.find(b => b.getAttribute('aria-expanded') === 'true');
    show(open ? open.getAttribute('aria-controls') : null);
  });
})();
