from pathlib import Path
from zipfile import ZipFile
import xml.etree.ElementTree as ET
import json
import shutil
import re
import hashlib
from datetime import datetime, timedelta, timezone

base = Path(__file__).resolve().parents[1]
source = base.parents[1] / 'COMP 329 Syllabus - Spring 2027.docx'
if not source.exists():
    source = base / 'dist/assets/syllabus-spring-2027.docx'
ns = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
with ZipFile(source) as archive:
    root = ET.fromstring(archive.read('word/document.xml'))
tables = root.findall('.//w:tbl', ns)
def cells(row):
    return [[ ''.join(p.itertext()).strip() for p in c.findall('w:p', ns) if ''.join(p.itertext()).strip() ] for c in row.findall('w:tc', ns)]

schedule = []
for row in tables[5].findall('w:tr', ns)[1:]:
    c = cells(row)
    number = int(c[0][0].split()[-1]) if c[0][0].startswith('Week ') else None
    block = 'data' if number and 2 <= number <= 7 else 'training' if number and 8 <= number <= 13 else 'shared'
    schedule.append({'week': c[0][0], 'dates': c[0][1], 'note': c[0][2:] or [], 'lecture1': c[1], 'lecture2': c[2] if len(c) == 4 else [], 'events': c[-1], 'block': block})
def assignment_date(due):
    week_number = int(re.search(r'Week (\d+)', due).group(1))
    week = next(w for w in schedule if w['week'] == f'Week {week_number}')
    start = re.match(r'([A-Za-z]+) (\d+)', week['dates'])
    monday = datetime.strptime(f'{start.group(1)} {start.group(2)} 2027', '%b %d %Y')
    offset = 2 if 'Wed' in due else 4
    return (monday + timedelta(days=offset)).date().isoformat()
assignments = []
for row in tables[4].findall('w:tr', ns)[1:]:
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
    'Capstone': '07_capstone',
}
handouts = {code: f'{handout_root}/{folder}/README.md' for code, folder in handout_folders.items()}
# Lecture slides (training block, Weeks 8-13): PDFs built in the course workspace
# (assignments/lecturer/lectures/wWW_lN_*.pdf) are copied into dist/assets/slides/.
# Without the workspace, the PDFs already in dist/ are used.
slides_source = base.parents[1] / 'assignments/lecturer/lectures'
slides_dir = base / 'dist/assets/slides'
if slides_source.is_dir():
    slides_dir.mkdir(exist_ok=True)
    for old in slides_dir.glob('w*_l*_*.pdf'):
        old.unlink()
    for pdf in sorted(slides_source.glob('w[0-9][0-9]_l[12]_*.pdf')):
        shutil.copyfile(pdf, slides_dir / pdf.name)
slides = {}
for pdf in sorted(slides_dir.glob('w[0-9][0-9]_l[12]_*.pdf')):
    week, lecture = re.match(r'w(\d\d)_l(\d)_', pdf.name).groups()
    slides.setdefault(f'Week {int(week)}', {})[lecture] = f'assets/slides/{pdf.name}'
glossary = [{'term': c[0][0], 'meaning': c[1][0]} for c in (cells(r) for r in tables[6].findall('w:tr', ns)[1:])]
labs = [{'name': c[0][0], 'description': c[1][0], 'weeks': c[2][0]} for c in (cells(r) for r in tables[3].findall('w:tr', ns)[1:])]
paragraphs = [''.join(p.itertext()).strip() for p in root.findall('.//w:p', ns)]
readings = paragraphs[paragraphs.index('Selected Readings') + 2:paragraphs.index('Glossary')]
data = {'source_sha256': hashlib.sha256(source.read_bytes()).hexdigest(), 'schedule': schedule, 'assignments': assignments, 'handouts': handouts, 'slides': slides, 'glossary': glossary, 'labs': labs, 'readings': readings}
(base / 'dist/data.js').write_text('window.COURSE = ' + json.dumps(data, ensure_ascii=False, indent=2) + ';\n')
target = base / 'dist/assets/syllabus-spring-2027.docx'
if source != target:
    shutil.copyfile(source, target)

events = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//COMP 329//Spring 2027 Assignment Deadlines//EN', 'CALSCALE:GREGORIAN', 'METHOD:PUBLISH', 'X-WR-CALNAME:COMP 329 · Assignment deadlines', 'X-WR-TIMEZONE:America/Chicago']
from zoneinfo import ZoneInfo
stamp = datetime.now(timezone.utc).strftime('%Y%m%dT%H%M%SZ')
for a in assignments + [{'code': 'Capstone', 'title': 'Final submission', 'date': '2027-05-04'}]:
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
print(f'Prepared {len(schedule)} schedule entries, {len(assignments)} assignments, {len(labs)} labs, and {len(glossary)} glossary terms.')

# Keep the browser-readable syllabus and the homepage's asset links in sync.
import runpy
runpy.run_path(str(base / "scripts/prepare-syllabus.py"))
runpy.run_path(str(base / "scripts/stamp-assets.py"))
