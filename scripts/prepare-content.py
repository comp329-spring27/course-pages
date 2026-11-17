from pathlib import Path
from zipfile import ZipFile
import xml.etree.ElementTree as ET
import json
import shutil
import re
import hashlib
from datetime import datetime, timedelta, timezone

base = Path(__file__).resolve().parents[1]
# The source repositories sit next to this folder: cs329-spring27/{assignments, course-pages, student-assignments}.
# The older layout (this folder under sites/, beside assignments/ and a loose syllabus .docx) is searched too.
roots = [base.parent, base.parents[1]]
assignments_repo = next((r / 'assignments' for r in roots if (r / 'assignments/lecturer').is_dir()), None)
syllabus_candidates = [r / 'COMP 329 Syllabus - Spring 2027.docx' for r in roots]
if assignments_repo:
    syllabus_candidates.append(assignments_repo / 'lecturer/syllabus-spring-2027.docx')
source = next((p for p in syllabus_candidates if p.exists()), base / 'dist/assets/syllabus-spring-2027.docx')
print(f'Syllabus: {source}')
print(f'Assignments repository: {assignments_repo or "not found; keeping the slide PDFs already in dist/"}')
ns = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
with ZipFile(source) as archive:
    root = ET.fromstring(archive.read('word/document.xml'))
def cells(row):
    return [[ ''.join(p.itertext()).strip() for p in c.findall('w:p', ns) if ''.join(p.itertext()).strip() ] for c in row.findall('w:tc', ns)]
# Tables are found by the first cell of their header row, so adding or removing a table elsewhere
# in the syllabus does not shift them.
def table(header):
    found = [t for t in root.findall('.//w:tbl', ns) if cells(t.find('w:tr', ns))[0][:1] == [header]]
    assert len(found) == 1, f'Expected one syllabus table headed {header!r}, found {len(found)}'
    return found[0]

schedule = []
for row in table('Week').findall('w:tr', ns)[1:]:
    c = cells(row)
    number = int(c[0][0].split()[-1]) if c[0][0].startswith('Week ') else None
    # Weeks 1-4: large-scale data processing (Jermaine); Weeks 5-14: distributed, ML, and GPU systems (Wang).
    block = 'data' if number and 1 <= number <= 4 else 'training' if number and 5 <= number <= 14 else 'shared'
    schedule.append({'week': c[0][0], 'dates': c[0][1], 'note': c[0][2:] or [], 'lecture1': c[1], 'lecture2': c[2] if len(c) == 4 else [], 'events': c[-1], 'block': block})
def assignment_date(due):
    week_number = int(re.search(r'Week (\d+)', due).group(1))
    week = next(w for w in schedule if w['week'] == f'Week {week_number}')
    start = re.match(r'([A-Za-z]+) (\d+)', week['dates'])
    monday = datetime.strptime(f'{start.group(1)} {start.group(2)} 2027', '%b %d %Y')
    offset = 2 if 'Wed' in due else 4
    return (monday + timedelta(days=offset)).date().isoformat()
assignments = []
for row in table('Data (D)').findall('w:tr', ns)[1:]:
    for c in cells(row):
        code, title = c[0].split(' ', 1)
        assignments.append({'code': code, 'title': title, 'due': c[1], 'date': assignment_date(c[1]), 'build': c[2].removeprefix('What you build: '), 'study': c[3].removeprefix('Scaling study: '), 'thread': 'data' if code.startswith('D') else 'training'})
assignments.sort(key=lambda a: a['date'])
handout_root = 'https://github.com/comp329-spring27/student-assignments/blob/main'
handout_folders = {
    'D1': '01_d1_collect',
    'D2': '02_d2_spark',
    'D3': '03_d3_dataset',
    'T1': '04_t1_numpy',
    'T2': '05_t2_triton',
    'T3': '06_t3_scale_out',
}
handouts = {code: f'{handout_root}/{folder}/README.md' for code, folder in handout_folders.items()}
# Lecture slides: PDFs built in the assignments repository (lecturer/lectures/<deck>.pdf) are copied
# into dist/assets/slides/ and linked under the week whose topic they cover in the current schedule.
# Decks with no matching topic are not published. Without the repository, the PDFs already in dist/ are used.
slide_weeks = {
    'w05_l1_processes_threads': ('Week 5', '1'),
    'w06_l1_networking': ('Week 6', '1'),
    'w06_l2_rpc_datacenter': ('Week 6', '2'),
    'w07_l1_message_passing': ('Week 7', '1'),
    'w07_l2_collectives': ('Week 7', '2'),
    'w08_l1_allreduce': ('Week 8', '1'),
    'w08_l2_nccl_topology': ('Week 8', '2'),
    'w09_l1_data_parallelism': ('Week 9', '1'),
    'w09_l2_zero_fsdp': ('Week 9', '2'),
    'w10_l1_tensor_parallelism': ('Week 10', '1'),
    'w10_l2_pipeline_3d': ('Week 10', '2'),
    'w11_l1_matmul_2d': ('Week 11', '1'),
    'w11_l2_matmul_3d': ('Week 11', '2'),
    'w12_l1_gpu_architecture': ('Week 12', '1'),
    'w12_l2_gpu_execution': ('Week 12', '2'),
    'w13_l1_memory_hierarchy': ('Week 13', '1'),
    'w13_l2_roofline': ('Week 13', '2'),
    'w14_l1_precision_matmul': ('Week 14', '1'),
    'w14_l2_triton_end_to_end': ('Week 14', '2'),
}
slides_source = assignments_repo / 'lecturer/lectures' if assignments_repo else None
slides_dir = base / 'dist/assets/slides'
if slides_source and slides_source.is_dir():
    slides_dir.mkdir(exist_ok=True)
    for old in slides_dir.glob('*.pdf'):
        old.unlink()
    for deck in slide_weeks:
        shutil.copyfile(slides_source / f'{deck}.pdf', slides_dir / f'{deck}.pdf')
slides = {}
for deck, (week, lecture) in slide_weeks.items():
    if (slides_dir / f'{deck}.pdf').is_file():
        slides.setdefault(week, {})[lecture] = f'assets/slides/{deck}.pdf'
# Assignment slides (one deck per assignment, plus the optional UI), built with
# `make slides` in the assignments repository (lecturer/slides/<folder>.pdf).
assignment_slide_folders = {**handout_folders, 'UI': '08_ui_dashboard'}
assignment_slides_source = assignments_repo / 'lecturer/slides' if assignments_repo else None
assignment_slides_dir = base / 'dist/assets/assignment-slides'
if assignment_slides_source and assignment_slides_source.is_dir():
    assignment_slides_dir.mkdir(exist_ok=True)
    for folder in assignment_slide_folders.values():
        shutil.copyfile(assignment_slides_source / f'{folder}.pdf', assignment_slides_dir / f'{folder}.pdf')
assignment_slides = {code: f'assets/assignment-slides/{folder}.pdf' for code, folder in assignment_slide_folders.items()
                     if (assignment_slides_dir / f'{folder}.pdf').is_file()}
glossary = [{'term': c[0][0], 'meaning': c[1][0]} for c in (cells(r) for r in table('Term').findall('w:tr', ns)[1:])]
paragraphs = [''.join(p.itertext()).strip() for p in root.findall('.//w:p', ns)]
readings = paragraphs[paragraphs.index('Selected Readings') + 2:paragraphs.index('Glossary')]
data = {'source_sha256': hashlib.sha256(source.read_bytes()).hexdigest(), 'schedule': schedule, 'assignments': assignments, 'handouts': handouts, 'slides': slides, 'assignment_slides': assignment_slides, 'glossary': glossary, 'readings': readings}
(base / 'dist/data.js').write_text('window.COURSE = ' + json.dumps(data, ensure_ascii=False, indent=2) + ';\n')
target = base / 'dist/assets/syllabus-spring-2027.docx'
if source != target:
    shutil.copyfile(source, target)

events = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//COMP 329//Spring 2027 Assignment Deadlines//EN', 'CALSCALE:GREGORIAN', 'METHOD:PUBLISH', 'X-WR-CALNAME:COMP 329 · Assignment deadlines', 'X-WR-TIMEZONE:America/Chicago']
from zoneinfo import ZoneInfo
stamp = datetime.now(timezone.utc).strftime('%Y%m%dT%H%M%SZ')
for a in assignments:
    date = datetime.fromisoformat(a['date']).replace(hour=23, minute=59, tzinfo=ZoneInfo('America/Chicago')).astimezone(timezone.utc)
    events.extend(['BEGIN:VEVENT', f'UID:comp329-s27-{a["code"].lower()}@course.local', f'DTSTAMP:{stamp}', 'DTSTART:' + date.strftime('%Y%m%dT%H%M%SZ'), 'DTEND:' + (date + timedelta(minutes=1)).strftime('%Y%m%dT%H%M%SZ'), f'SUMMARY:COMP 329 — {a["code"]}: {a["title"]} due', 'DESCRIPTION:Due at 11:59 p.m. America/Chicago. Based on the Spring 2027 syllabus. Check Canvas for updates.', 'END:VEVENT'])
events.append('END:VCALENDAR')
# RFC 5545 content lines are folded at 75 UTF-8 octets.
folded = []
for line in events:
    part = ''
    for char in line:
        if len((part + char).encode()) > 75:
            folded.append(part)
            part = ' '
        part += char
    folded.append(part)
(base / 'dist/assets/assignment-deadlines.ics').write_bytes(('\r\n'.join(folded) + '\r\n').encode())
print(f'Prepared {len(schedule)} schedule entries, {len(assignments)} assignments and {len(glossary)} glossary terms.')

# Keep the browser-readable syllabus and the homepage's asset links in sync.
import runpy
runpy.run_path(str(base / "scripts/prepare-syllabus.py"))
runpy.run_path(str(base / "scripts/prepare-pipeline.py"))
runpy.run_path(str(base / "scripts/stamp-assets.py"))
