'use strict';
const $ = (selector, context = document) => context.querySelector(selector);
const escapeHTML = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const course = window.COURSE;
const dateLabel = date => new Date(`${date}T12:00:00`).toLocaleDateString('en-US', {month: 'short', day: 'numeric'});
const withTag = text => escapeHTML(text).replace(/\s+(CONCEPT|BUILD|STRETCH)$/, (_, tag) => ` <span class="tag tag-${tag.toLowerCase()}">${tag}</span>`);
const bullets = items => `<ul>${items.map(item => `<li>${withTag(item)}</li>`).join('')}</ul>`;

// Schedule: one row per week; lecture details expand in place.
const eventLabel = event => {
  let label = event.replace(/\s*\(.+\)/, '').replace(/T([12]) and Lab ([34]) out.*/, 'T$1 + Lab $2 out');
  const day = event.match(/\((Mon|Tue|Wed|Thu|Fri)\b/);
  if (day) label += ` (${day[1]})`;
  const due = /\bdue\b|checkpoint|^midterm(?! review)|^final exam/i.test(event) && !/^nothing/i.test(event);
  return `<span class="event${due ? ' due' : ''}">${escapeHTML(label)}</span>`;
};
$('#schedule-rows').innerHTML = course.schedule.map(week => {
  const [title1, ...notes1] = week.lecture1;
  const [title2, ...notes2] = week.lecture2;
  const summary = `<span class="week-col"><strong>${escapeHTML(week.week)}</strong><span class="week-dates">${escapeHTML(week.dates)}</span>${week.note.map(note => `<span class="week-note">${escapeHTML(note)}</span>`).join('')}</span>` +
    `<span class="lectures"><span>${escapeHTML(title1)}</span>${title2 ? `<span>${escapeHTML(title2)}</span>` : ''}</span>` +
    `<span class="events">${week.events.map(eventLabel).join('')}</span>`;
  if (!notes1.length && !notes2.length) return `<div class="week block-${week.block}">${summary}<span></span></div>`;
  const body = [[1, notes1], [2, notes2]].filter(([, notes]) => notes.length).map(([n, notes]) => `<div><h4>Lecture ${n}</h4>${bullets(notes)}</div>`).join('');
  return `<details class="week block-${week.block}"><summary>${summary}<span class="chevron" aria-hidden="true"></span></summary><div class="week-body">${body}</div></details>`;
}).join('');

// Assignments: a one-line summary each; scope and handout expand in place.
const summaries = {
  D1: 'Stream Wikipedia into Parquet and find the throughput bottleneck.',
  D2: 'Analyze the corpus with Spark and study how it scales.',
  D3: 'Deduplicate, tokenize, and shard the training dataset.',
  T1: 'Write a Triton kernel and compare framework execution modes.',
  T2: 'Build and benchmark CPU and GPU collectives.',
  T3: 'Train with synchronized gradients and analyze parallel layouts.'
};
$('#assignment-list').innerHTML = course.assignments.map(a => `<details class="assignment ${a.thread}" id="assignment-${a.code}">
  <summary><span class="code">${a.code}</span><span class="assignment-main"><strong>${escapeHTML(a.title)}</strong><span>${summaries[a.code]}</span></span><span class="due">Due <time datetime="${a.date}">${dateLabel(a.date)}</time></span><span class="chevron" aria-hidden="true"></span></summary>
  <div class="assignment-body"><p><b>What you build.</b> ${escapeHTML(a.build)}</p><p><b>Scaling study.</b> ${escapeHTML(a.study)}</p><p class="assignment-foot"><a href="${escapeHTML(course.handouts[a.code])}" target="_blank" rel="noopener noreferrer">Handout on GitHub <span aria-hidden="true">↗</span></a></p></div>
</details>`).join('');

// Course map: hovering, focusing, or tapping a stage card reveals its explanation in the panel below the map.
const stageNotes = {
  D1: 'Stream a raw Wikipedia dump into Parquet records, then measure how throughput changes with more workers and find the bottleneck.',
  D2: 'Normalize the corpus and compute statistics with Spark DataFrames and SQL, then study strong and weak scaling and the effect of partition count.',
  D3: 'Remove near-duplicates with MinHash and LSH, train a BPE tokenizer, and write sharded training data that passes the dataset contract.',
  T1: 'Write a Triton kernel, validate it against PyTorch, and compare eager, compiled, and JAX execution on a supplied model trained on your D3 data.',
  T2: 'Build an all-reduce from point-to-point messages, benchmark NCCL collectives across GPUs and servers, and fit a latency–bandwidth model.',
  T3: 'Implement data-parallel gradient averaging, work through tensor and pipeline layouts, and justify a 3D layout under a fixed GPU budget.'
};
const overview = $('.overview');
const detailBody = $('#stage-detail-body');
const stages = [...document.querySelectorAll('.stage')];
let pinned = null;
const showDetail = stage => {
  const code = stage.dataset.code;
  const assignment = course.assignments.find(a => a.code === code);
  detailBody.className = `stage-detail-body detail-${assignment.thread}`;
  detailBody.innerHTML = `<strong>${code} · ${escapeHTML(stage.querySelector('span').textContent)}</strong><p>${escapeHTML(stageNotes[code])}</p><small>Due ${dateLabel(assignment.date)} · <a href="#assignment-${code}">Assignment details ↓</a></small>`;
  stages.forEach(item => item.classList.toggle('is-active', item === stage));
  overview.classList.add('is-showing');
};
const clearDetail = () => {
  if (pinned) return;
  stages.forEach(item => item.classList.remove('is-active'));
  overview.classList.remove('is-showing');
};
const openAssignment = code => {
  const row = $(`#assignment-${code}`);
  row.open = true;
  row.scrollIntoView({behavior: 'smooth', block: 'start'});
  row.querySelector('summary').focus({preventScroll: true});
};
let pointerType = 'mouse';
stages.forEach(stage => {
  stage.addEventListener('pointerenter', event => { if (event.pointerType !== 'touch' && !pinned) showDetail(stage); });
  stage.addEventListener('focus', () => { if (!pinned) showDetail(stage); });
  stage.addEventListener('pointerdown', event => { pointerType = event.pointerType; });
  stage.addEventListener('click', () => {
    if (pointerType === 'touch') {
      pinned = pinned === stage ? null : stage;
      if (pinned) showDetail(stage); else clearDetail();
    } else {
      openAssignment(stage.dataset.code);
    }
  });
  stage.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); openAssignment(stage.dataset.code); }
    if (event.key === 'Escape') { pinned = null; stage.blur(); clearDetail(); }
  });
});
overview.addEventListener('pointerleave', event => { if (event.pointerType !== 'touch') clearDetail(); });
overview.addEventListener('focusout', event => { if (!overview.contains(event.relatedTarget)) clearDetail(); });
detailBody.addEventListener('click', event => {
  const link = event.target.closest('a');
  if (link) { event.preventDefault(); pinned = null; openAssignment(link.hash.replace('#assignment-', '')); }
});
document.addEventListener('click', event => { if (pinned && !overview.contains(event.target)) { pinned = null; clearDetail(); } });
