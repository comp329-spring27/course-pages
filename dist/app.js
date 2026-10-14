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
$('#assignment-list').innerHTML = course.assignments.map(a => `<details class="assignment ${a.thread}">
  <summary><span class="code">${a.code}</span><span class="assignment-main"><strong>${escapeHTML(a.title)}</strong><span>${summaries[a.code]}</span></span><span class="due">Due <time datetime="${a.date}">${dateLabel(a.date)}</time></span><span class="chevron" aria-hidden="true"></span></summary>
  <div class="assignment-body"><p><b>What you build.</b> ${escapeHTML(a.build)}</p><p><b>Scaling study.</b> ${escapeHTML(a.study)}</p><p class="assignment-foot">${escapeHTML(a.due)} · ${dateLabel(a.date)}, 2027, 11:59 p.m. Chicago · <a href="${escapeHTML(course.handouts[a.code])}" target="_blank" rel="noopener noreferrer">Handout on GitHub <span aria-hidden="true">↗</span></a></p></div>
</details>`).join('');
$('#capstone-handout').href = course.handouts.Capstone;
$('#lab-list').innerHTML = course.labs.map(lab => `<li><strong>${escapeHTML(lab.name)}</strong><span>${escapeHTML(lab.description)}</span><small>Weeks ${escapeHTML(lab.weeks)}</small></li>`).join('');

// Readings: full citations, with documentation links where the syllabus names them.
const docs = [
  {match: 'CUDA Programming Guide', strip: / CUDA guide$/, links: [['CUDA guide', 'https://docs.nvidia.com/cuda/cuda-programming-guide/index.html']]},
  {match: 'PyTorch documentation', strip: / PyTorch dispatch Compilation JAX transformations$/, links: [['PyTorch dispatch', 'https://docs.pytorch.org/docs/stable/notes/extending.html'], ['torch.compile', 'https://docs.pytorch.org/tutorials/intermediate/torch_compile_tutorial.html'], ['JAX transformations', 'https://docs.jax.dev/en/latest/101/transformations.html']]},
  {match: 'NCCL User Guide', strip: / NCCL ordering Distributed overview$/, links: [['NCCL guide', 'https://docs.nvidia.com/deeplearning/nccl/user-guide/docs/usage/groups.html'], ['PyTorch distributed', 'https://docs.pytorch.org/tutorials/beginner/dist_overview.html']]},
  {match: 'Megatron-LM', strip: / Paper$/, links: [['Paper', 'https://arxiv.org/abs/2104.04473']]}
];
let readingBlock = 'data';
course.readings.forEach(reading => {
  if (/^Data (thread|systems block)$/.test(reading)) { readingBlock = 'data'; return; }
  if (/^Training (thread|systems block)$/.test(reading)) { readingBlock = 'training'; return; }
  if (!reading) return;
  const doc = docs.find(d => reading.includes(d.match));
  const citation = doc ? reading.replace(doc.strip, '') : reading;
  const links = doc ? ` <span class="reading-links">${doc.links.map(([title, url]) => `<a href="${url}" target="_blank" rel="noopener noreferrer">${title} <span aria-hidden="true">↗</span></a>`).join('')}</span>` : '';
  $(`#${readingBlock}-readings`).insertAdjacentHTML('beforeend', `<li>${escapeHTML(citation)}${links}</li>`);
});
