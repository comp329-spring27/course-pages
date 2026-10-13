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
  if (/due.*Wed/.test(event)) label += ' · Wed';
  if (/due.*Tue/.test(event)) label += ' · Tue';
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
    const firstTitle = week.week === 'Week 0' ? 'Getting ready' : week.lecture1[0] || '—';
    const secondTitle = joint ? '—' : week.lecture2[0];
    const instructor = week.block === 'data' ? 'JERMAINE' : week.block === 'training' ? 'WANG' : 'JERMAINE & WANG';
    const keyEvents = week.events.filter(event => /\bdue\b|checkpoint|midterm.*evening|^Final exam/i.test(event));
    const eventPreview = keyEvents.length ? keyEvents.map(milestone).join('') : `<span class="milestone-updates">${week.events.length} ${week.events.length === 1 ? 'update' : 'updates'}</span>`;
    return `<details class="schedule-row block-${week.block}" data-week="${escapeHTML(week.week)}"${previousOpen.has(week.week) || query ? ' open' : ''}>
      <summary><span class="week-date"><span class="week-label">${escapeHTML(week.week)}</span><span class="week-dates">${escapeHTML(week.dates)}</span></span><span class="week-topic lecture-one">${escapeHTML(firstTitle)}</span><span class="week-topic lecture-two${joint ? ' empty-topic' : ''}">${escapeHTML(secondTitle)}</span><span class="milestone-cell">${eventPreview}</span><span class="row-chevron" aria-hidden="true">+</span></summary>
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
  D1:'Stream Wikipedia into Parquet and find the throughput bottleneck.',
  T1:'Write a Triton kernel and compare framework execution modes.',
  D2:'Analyze your corpus with Spark and study how it scales.',
  T2:'Build and benchmark CPU and GPU collectives.',
  D3:'Deduplicate, tokenize, and shard your training dataset.',
  T3:'Train with synchronized gradients and analyze parallel layouts.'
};
$('#assignment-grid').innerHTML = course.assignments.map(assignment => `<article class="assignment-card ${assignment.thread}-assignment" aria-labelledby="assignment-title-${assignment.code}"><span class="assignment-top"><span class="assignment-code">${assignment.code}</span><span class="assignment-date">Due <time datetime="${assignment.date}">${dateLabel(assignment.date)}</time></span></span><h3 class="assignment-title" id="assignment-title-${assignment.code}">${escapeHTML(assignment.title)}</h3><span class="assignment-description">${summaries[assignment.code]}</span><div class="card-bottom"><button type="button" class="assignment-details" data-assignment="${assignment.code}" aria-haspopup="dialog" aria-label="View ${assignment.code} assignment details">View details</button><a href="${escapeHTML(course.handouts[assignment.code])}" target="_blank" rel="noopener noreferrer" aria-label="Read ${assignment.code} handout on GitHub (opens in a new tab)">Handout <span aria-hidden="true">↗</span></a></div></article>`).join('');
$('#capstone-handout').href = course.handouts.Capstone;
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
  $('#dialog-handout').href = course.handouts[assignment.code];
  $('#dialog-handout').setAttribute('aria-label', `Read ${assignment.code} handout on GitHub (opens in a new tab)`);
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
function readingTitle(citation) {
  if (citation.includes('PyTorch documentation')) return 'PyTorch & JAX documentation';
  if (citation.includes('NCCL User Guide')) return 'NCCL & distributed execution';
  if (citation.includes('Mining of Massive Datasets')) return 'Mining of Massive Datasets · Chapter 3';
  if (citation.includes('Megatron-LM')) return 'Megatron-LM: large-scale training';
  if (citation.includes('Bengio et al.')) return 'Language models & collective cost models';
  const quoted = citation.match(/“([^”]+)”/);
  return quoted ? quoted[1].replace(/[,.;]+$/, '') : citation.split(':')[0].replace(/^NVIDIA, /, '');
}
course.readings.forEach(reading => {
  if(/^Data (thread|systems block)$/.test(reading)){readingThread='data';return;}
  if(/^Training (thread|systems block)$/.test(reading)){readingThread='training';return;}
  if(!reading) return;
  const linked = docs.find(doc => reading.includes(doc.match));
  const clean = reading.replace(/ CUDA guide$/,'').replace(/ PyTorch dispatch Compilation JAX transformations$/,'').replace(/ NCCL ordering Distributed overview$/,'').replace(/ Paper$/,'');
  $(`#${readingThread}-readings`).insertAdjacentHTML('beforeend',`<li><details class="reading-entry"><summary><span>${escapeHTML(readingTitle(clean))}</span><span aria-hidden="true">+</span></summary><div class="reading-details"><p>${escapeHTML(clean)}</p>${linked ? `<div class="reading-links">${linked.links.map(([title,url]) => `<a href="${url}" target="_blank" rel="noopener noreferrer">${title} ↗</a>`).join('')}</div>` : ''}</div></details></li>`);
});
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {entries.forEach(entry => {if(entry.isIntersecting){$$('nav a').forEach(a=>{if(a.hash === '#'+entry.target.id)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});}});},{rootMargin:'-15% 0px -65% 0px',threshold:0});
  $$('#overview,#schedule,#assignments,#resources').forEach(section => observer.observe(section));
}
