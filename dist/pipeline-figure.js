// The syllabus pipeline figure: each stage button opens its data panel (one at a time), placed
// right under the row of the box that was clicked (under the box itself on a narrow screen),
// with a pointer at that box. Without this script every panel stays visible at the end of the
// figure, which is also how the page prints.
(function () {
  const figure = document.querySelector('.pipeline');
  if (!figure) return;
  const buttons = [...figure.querySelectorAll('.pl-stage')];
  const panels = [...figure.querySelectorAll('.pl-panel')];
  const hint = figure.querySelector('.pl-hint');
  const home = hint;  // where panels live when not attached to a row (printing, no selection)
  const narrow = matchMedia('(max-width: 760px)');
  figure.classList.add('pl-js');

  function place(button, panel) {
    (narrow.matches ? button : button.closest('.pl-flow')).after(panel);
    const b = button.getBoundingClientRect();
    const p = panel.getBoundingClientRect();
    panel.style.setProperty('--caret-x', `${b.left + b.width / 2 - p.left}px`);
  }

  function show(id) {
    buttons.forEach(b => b.setAttribute('aria-expanded', String(b.getAttribute('aria-controls') === id)));
    panels.forEach(p => { p.hidden = p.id !== id; });
    hint.hidden = Boolean(id);
    const open = buttons.find(b => b.getAttribute('aria-controls') === id);
    if (open) place(open, document.getElementById(id));
  }

  function current() {
    const open = buttons.find(b => b.getAttribute('aria-expanded') === 'true');
    return open ? open.getAttribute('aria-controls') : null;
  }

  buttons.forEach(button => button.addEventListener('click', () => {
    const id = button.getAttribute('aria-controls');
    const opening = button.getAttribute('aria-expanded') !== 'true';
    show(opening ? id : null);
    if (opening) document.getElementById(id).scrollIntoView({ block: 'nearest', behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  }));
  // Re-place the open panel when the layout switches between rows and a single column.
  narrow.addEventListener('change', () => show(current()));
  window.addEventListener('resize', () => { const id = current(); if (id) show(id); });
  show(null);
  window.addEventListener('beforeprint', () => {
    panels.forEach(p => { home.before(p); p.hidden = false; });
    hint.hidden = true;
  });
  window.addEventListener('afterprint', () => show(current()));
})();
