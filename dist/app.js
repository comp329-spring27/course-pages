'use strict';
const $ = (selector, context = document) => context.querySelector(selector);
const $$ = (selector, context = document) => [...context.querySelectorAll(selector)];
const escapeHTML = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const course = window.COURSE;
let scheduleView = 'all';
const dateLabel = date => new Date(`${date}T12:00:00`).toLocaleDateString('en-US', {month:'short',day:'numeric'});
const withTags = text => escapeHTML(text).replace(/\s+(CONCEPT|BUILD|STRETCH)$/, (_, tag) => ` <span class="scope-tag scope-${tag.toLowerCase()}">${tag}</span>`);
const list = items => items.map(item => `<li>${withTags(item)}</li>`).join('');
const milestone = event => {
  let label = event.replace(/\s*\(.+\)/, '').replace('Dataset contract published','Dataset contract').replace('Capstone pairs set','Capstone pairs').replace(/T([12]) and Lab ([34]) out.*/, 'T$1 + Lab $2 out');
  const type = /due|checkpoint/i.test(event) ? 'due' : /exam|midterm/i.test(event) ? 'exam' : '';
  return `<span class="milestone ${type}">${escapeHTML(label)}</span>`;
};
function renderSchedule() {
  const query = $('#schedule-search').value.trim().toLowerCase();
  const previousOpen = new Set($$('.schedule-row[open]').map(row => row.dataset.week));
  const weeks = course.schedule.filter(week => {
    const inBlock = scheduleView === 'all' || week.block === scheduleView || /Week (1|14)$/.test(week.week);
    return inBlock && [week.week,week.dates,...week.note,...week.lecture1,...week.lecture2,...week.events].join(' ').toLowerCase().includes(query);
  });
  $('#schedule-list').dataset.view = scheduleView;
  $('#schedule-rows').innerHTML = weeks.map(week => {
    const joint = !week.lecture2.length;
    const teachingWeek = /Week (1|14)$/.test(week.week);
    const firstTitle = week.lecture1[0] || '—';
    const secondTitle = joint ? '—' : week.lecture2[0];
    const instructor = week.block === 'data' ? 'JERMAINE' : week.block === 'training' ? 'WANG' : 'JERMAINE & WANG';
    return `<details class="schedule-row block-${week.block}" data-week="${escapeHTML(week.week)}"${previousOpen.has(week.week) || query ? ' open' : ''}>
      <summary><span class="week-date"><span class="week-label">${escapeHTML(week.week)}</span><span class="week-dates">${escapeHTML(week.dates)}</span></span><span class="week-topic lecture-one">${escapeHTML(firstTitle)}</span><span class="week-topic lecture-two${joint ? ' empty-topic' : ''}">${escapeHTML(secondTitle)}</span><span class="milestone-cell">${week.events.map(milestone).join('')}</span><span class="row-chevron" aria-hidden="true">+</span></summary>
      <div class="week-details"><div class="detail-columns"><div><p class="detail-heading">${joint ? 'THIS WEEK' : 'LECTURE 1 / '+instructor}</p><ul>${list(week.lecture1.slice(1).length ? week.lecture1.slice(1) : week.lecture1)}</ul></div>${joint ? '' : `<div><p class="detail-heading">LECTURE 2 / ${instructor}</p><ul>${list(week.lecture2.slice(1))}</ul></div>`}</div><div class="event-details-wrap"><p class="detail-heading">MILESTONES</p><ul class="event-detail">${list(week.events)}</ul></div>${week.note.length ? `<p class="week-note">${week.note.map(escapeHTML).join('<br>')}</p>` : ''}</div>
    </details>`;
  }).join('');
  $('#schedule-status').textContent = query ? weeks.length ? `${weeks.length} matching ${weeks.length === 1 ? 'week' : 'weeks'}.` : 'No matching weeks. Try a topic such as Spark, GPU, or NCCL.' : '';
}
$$('[data-view].filter').forEach(button => button.addEventListener('click', () => {
  scheduleView = button.dataset.view;
  $$('.filter').forEach(item => {item.classList.toggle('active',item === button);item.setAttribute('aria-pressed',String(item === button));});
  renderSchedule();
}));
$('#schedule-search').addEventListener('input', renderSchedule);
renderSchedule();

const summaries = {
  D1:'Stream Wikipedia into Parquet. Measure throughput and discover what limits one machine.',
  T1:'Write a Triton kernel. Compare eager and compiled execution, and explain the GPU bottleneck.',
  D2:'Normalize and analyze your corpus with Spark. Study partitions, shuffles, and scaling.',
  T2:'Build a CPU collective and GPU communication benchmark. Test an α–β cost model.',
  D3:'Deduplicate, tokenize, and shard the corpus into a dataset that passes the contract checker.',
  T3:'Synchronize gradients, train on D3 data, and analyze data × tensor × pipeline layouts.'
};
$('#assignment-grid').innerHTML = course.assignments.map(assignment => `<button type="button" class="assignment-card ${assignment.thread}-assignment" data-assignment="${assignment.code}" aria-haspopup="dialog" aria-label="${assignment.code}: ${escapeHTML(assignment.title)}, due ${dateLabel(assignment.date)}. View assignment details."><span class="assignment-top"><span class="assignment-code">${assignment.code}</span><span class="assignment-date">DUE ${dateLabel(assignment.date).toUpperCase()}</span></span><span class="assignment-title">${escapeHTML(assignment.title)}</span><span class="assignment-description">${summaries[assignment.code]}</span><span class="card-bottom"><span>${escapeHTML(assignment.due.replace(' (Wed, before recess)',' · Wed'))} · ${assignment.thread === 'data' ? 'Data' : 'Training'} block</span><span aria-hidden="true">↗</span></span></button>`).join('');
const dialog = $('#assignment-dialog');
let assignmentTrigger = null;
$$('[data-assignment]').forEach(button => button.addEventListener('click', () => {
  const assignment = course.assignments.find(a => a.code === button.dataset.assignment);
  assignmentTrigger = button;
  $('#dialog-code').textContent = assignment.code;
  $('#dialog-due').textContent = `${assignment.due} / ${dateLabel(assignment.date)}, 2027 · 11:59 p.m. Chicago`;
  $('#dialog-title').textContent = assignment.title;
  $('#dialog-build').textContent = assignment.build;
  $('#dialog-study').textContent = assignment.study;
  dialog.showModal();
  document.body.classList.add('dialog-open');
}));
$('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {if (event.target === dialog) {const r = dialog.getBoundingClientRect();if (event.clientX<r.left || event.clientX>r.right || event.clientY<r.top || event.clientY>r.bottom) dialog.close();}});
dialog.addEventListener('close', () => {document.body.classList.remove('dialog-open');assignmentTrigger?.focus();});

const tabs = $$('.resource-tabs [role="tab"]');
function activateTab(tab, focus = false) {
  tabs.forEach(item => {const selected = item === tab;item.setAttribute('aria-selected',String(selected));item.tabIndex = selected ? 0 : -1;$('#'+item.getAttribute('aria-controls')).hidden = !selected;});
  if (focus) tab.focus();
}
tabs.forEach((tab,index) => {
  tab.addEventListener('click', () => activateTab(tab));
  tab.addEventListener('keydown', event => {let next;if (event.key === 'ArrowRight') next = tabs[(index+1)%tabs.length];if (event.key === 'ArrowLeft') next = tabs[(index+tabs.length-1)%tabs.length];if (event.key === 'Home') next = tabs[0];if (event.key === 'End') next = tabs.at(-1);if(next){event.preventDefault();activateTab(next,true);}});
});
$('#lab-list').innerHTML = course.labs.map(lab => `<article class="lab-row"><strong>${escapeHTML(lab.name)}</strong><p>${escapeHTML(lab.description)}</p><small>Weeks ${escapeHTML(lab.weeks)}</small></article>`).join('');
function renderGlossary() {
  const query = $('#glossary-search').value.trim().toLowerCase();
  const terms = course.glossary.filter(term => `${term.term} ${term.meaning}`.toLowerCase().includes(query));
  $('#glossary-list').innerHTML = terms.map(term => `<article class="glossary-item"><h3>${escapeHTML(term.term)}</h3><p>${escapeHTML(term.meaning)}</p></article>`).join('');
  $('#glossary-status').textContent = terms.length ? `${terms.length} ${terms.length === 1 ? 'term' : 'terms'}${query ? ' matching your search' : ''}.` : 'No matching terms. Try a related word or clear your search.';
}
$('#glossary-search').addEventListener('input',renderGlossary);
renderGlossary();
const docs = [
  {match:'CUDA Programming Guide',links:[['CUDA guide','https://docs.nvidia.com/cuda/cuda-programming-guide/index.html']]},
  {match:'PyTorch documentation',links:[['PyTorch dispatch','https://docs.pytorch.org/docs/stable/notes/extending.html'],['Compilation','https://docs.pytorch.org/tutorials/intermediate/torch_compile_tutorial.html'],['JAX transformations','https://docs.jax.dev/en/latest/101/transformations.html']]},
  {match:'NCCL User Guide',links:[['NCCL ordering','https://docs.nvidia.com/deeplearning/nccl/user-guide/docs/usage/groups.html'],['Distributed overview','https://docs.pytorch.org/tutorials/beginner/dist_overview.html']]},
  {match:'Megatron-LM',links:[['Paper','https://arxiv.org/abs/2104.04473']]}
];
let readingThread = 'data';
course.readings.forEach(reading => {
  if(/^Data (thread|systems block)$/.test(reading)){readingThread='data';return;}
  if(/^Training (thread|systems block)$/.test(reading)){readingThread='training';return;}
  if(!reading) return;
  const linked = docs.find(doc => reading.includes(doc.match));
  const clean = reading.replace(/ CUDA guide$/,'').replace(/ PyTorch dispatch Compilation JAX transformations$/,'').replace(/ NCCL ordering Distributed overview$/,'').replace(/ Paper$/,'');
  $(`#${readingThread}-readings`).insertAdjacentHTML('beforeend',`<li>${escapeHTML(clean)}${linked ? `<div class="reading-links">${linked.links.map(([title,url]) => `<a href="${url}" target="_blank" rel="noopener noreferrer">${title} ↗</a>`).join('')}</div>` : ''}</li>`);
});
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {entries.forEach(entry => {if(entry.isIntersecting){$$('nav a').forEach(a=>{if(a.hash === '#'+entry.target.id)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});}});},{rootMargin:'-15% 0px -65% 0px',threshold:0});
  $$('#overview,#schedule,#assignments,#resources').forEach(section => observer.observe(section));
}
