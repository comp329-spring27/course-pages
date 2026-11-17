"""Check source freshness, extracted content, downloads, and local references."""
from pathlib import Path
import json
import hashlib
import re
from html.parser import HTMLParser
from urllib.parse import urlsplit
from datetime import datetime
from zoneinfo import ZoneInfo

base = Path(__file__).resolve().parents[1]
dist = base / 'dist'
raw = (dist / 'data.js').read_text()
data = json.loads(raw.removeprefix('window.COURSE = ').removesuffix(';\n'))
# The source repositories sit next to this folder (cs329-spring27/{assignments, course-pages, student-assignments});
# the older layout, one level up, is searched too. Checks against them run only when they are found.
roots = [base.parent, base.parents[1]]
source = next((p for r in roots for p in (r / 'COMP 329 Syllabus - Spring 2027.docx', r / 'assignments/lecturer/syllabus-spring-2027.docx') if p.exists()), None)
download = dist / 'assets/syllabus-spring-2027.docx'
assert hashlib.sha256(download.read_bytes()).hexdigest() == data['source_sha256'], 'Bundled syllabus and website data differ.'
if source:
    assert hashlib.sha256(source.read_bytes()).hexdigest() == data['source_sha256'], 'Source syllabus changed; regenerate and review the website.'
assert len(data['schedule']) == 17
assert len(data['assignments']) == 6
assert len(data['glossary']) == 32
assert [a['code'] for a in data['assignments']] == ['D1', 'D2', 'D3', 'T2', 'T3', 'T1']
assert set(data['handouts']) == {a['code'] for a in data['assignments']}
assert len(set(data['handouts'].values())) == 6, 'Each assignment needs its own handout.'
handout_prefix = 'https://github.com/comp329-spring27/student-assignments/blob/main/'
student_repo = next((r / 'student-assignments' for r in roots if (r / 'student-assignments/workspace_manifest.json').is_file()), None)
student_manifest = json.loads((student_repo / 'workspace_manifest.json').read_text()) if student_repo else None
print(f'Cross-checked against: syllabus {source or "(not found, skipped)"}; student repository {student_repo or "(not found, skipped)"}')
for code, url in data['handouts'].items():
    assert url.startswith(handout_prefix) and url.endswith('/README.md'), f'Invalid student handout: {url}'
    relative_path = url.removeprefix(handout_prefix)
    assert re.fullmatch(r'\d{2}_[a-z0-9_]+/README\.md', relative_path), f'Invalid handout path: {url}'
    if student_manifest:
        folder = student_manifest['folders'][code.lower()]
        assert relative_path == f'{folder}/README.md' and (student_repo / relative_path).is_file(), f'Handout differs from student repository: {code}'
# Lecture slides: one deck per lecture in Weeks 5-14 (Week 5 has one lecture: recess).
expected_slides = {'Week 5': {'1'}, **{f'Week {n}': {'1', '2'} for n in range(6, 15)}}
assert set(data['slides']) == set(expected_slides), 'Lecture slides are needed for every lecture in Weeks 5-14.'
for week, files in data['slides'].items():
    assert set(files) == expected_slides[week], f'{week}: lecture slides should be {sorted(expected_slides[week])}.'
    for path in files.values():
        assert re.fullmatch(r'assets/slides/w\d\d_l[12]_[a-z0-9_]+\.pdf', path) and (dist / path).is_file(), f'Missing slides: {path}'
assert set(data['assignment_slides']) == set(data['handouts']) | {'UI'}, 'Every assignment and the UI need slides.'
for path in data['assignment_slides'].values():
    assert re.fullmatch(r'assets/assignment-slides/\d{2}_[a-z0-9_]+\.pdf', path) and (dist / path).is_file(), f'Missing slides: {path}'
for assignment in data['assignments']:
    due_week = 'Week ' + re.search(r'Week (\d+)', assignment['due']).group(1)
    week = next(w for w in data['schedule'] if w['week'] == due_week)
    assert any(re.search(r'\b' + assignment['code'] + r' due\b', e) for e in week['events']), f'{assignment["code"]}: deadline and schedule disagree.'
    expected_day = 2 if 'Wed' in assignment['due'] else 4
    assert datetime.fromisoformat(assignment['date']).weekday() == expected_day

calendar = (dist / 'assets/assignment-deadlines.ics').read_bytes().decode()
assert all(len(line.encode()) <= 75 for line in calendar.split('\r\n'))
calendar = calendar.replace('\r\n ', '')
events = calendar.split('BEGIN:VEVENT\r\n')[1:]
assert len(events) == 6
for event in events:
    code = re.search(r'UID:comp329-s27-(\w+)@', event).group(1).upper()
    a = next(a for a in data['assignments'] if a['code'] == code)
    time = datetime.strptime(re.search(r'DTSTART:(\d+T\d+Z)', event).group(1), '%Y%m%dT%H%M%SZ').replace(tzinfo=ZoneInfo('UTC')).astimezone(ZoneInfo('America/Chicago'))
    assert time.date().isoformat() == a['date']
    assert (time.hour, time.minute) == (23, 59)

class References(HTMLParser):
    def __init__(self):
        super().__init__(); self.ids = set(); self.urls = []
    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if 'id' in attrs: self.ids.add(attrs['id'])
        self.urls.extend(attrs[key] for key in ('src', 'href') if key in attrs)
refs = References(); refs.feed((dist / 'index.html').read_text())
assert {'schedule-rows', 'assignment-list'} <= refs.ids
for url in refs.urls:
    if url.startswith('#'): assert url[1:] in refs.ids, f'Broken anchor: {url}'
    elif not re.match(r'https?://', url):
        path = urlsplit(url).path
        assert (dist / path).is_file(), f'Missing local asset: {url}'
        if path in {'theme.css', 'styles.css', 'theme.js', 'app.js', 'data.js', 'pipeline-figure.css', 'pipeline-figure.js'}:
            assert urlsplit(url).query == 'v=' + hashlib.sha256((dist / path).read_bytes()).hexdigest()[:12], f'Stale asset stamp: {url}; run scripts/stamp-assets.py'
manifest_path = base / '.openai/hosting.json'
if manifest_path.exists():
    manifest = json.loads(manifest_path.read_text())
    assert manifest['project_id'] and manifest['static']['directory'] == 'dist'
homepage = (dist / 'index.html').read_text()
assert (base / 'scripts/pipeline-figure.html').read_text().strip() in homepage, 'Homepage pipeline figure is stale; run scripts/prepare-pipeline.py.'
for name in ('pipeline-figure.css', 'pipeline-figure.js'):
    assert f'{name}?v=' + hashlib.sha256((dist / name).read_bytes()).hexdigest()[:12] in homepage, f'Homepage links a stale {name}; run scripts/stamp-assets.py.'
syllabus_html = (dist / 'syllabus.html').read_text()
assert f'content="{data["source_sha256"]}"' in syllabus_html, 'Readable syllabus is stale; regenerate it.'
for anchor in ('glossary', 'selected-readings'):
    assert f'id="{anchor}"' in syllabus_html, f'Readable syllabus lacks the {anchor} anchor the homepage links to.'
    assert f'syllabus.html#{anchor}' in refs.urls, f'Homepage no longer links to syllabus.html#{anchor}.'
for name in ('theme.css', 'theme.js'):
    assert f'{name}?v=' + hashlib.sha256((dist / name).read_bytes()).hexdigest()[:12] in syllabus_html, f'Readable syllabus links a stale {name}; regenerate it.'
print('PASS: source freshness, schedule/deadline agreement, six calendar events, six student handouts, 19 lecture slide decks (Weeks 5-14), seven assignment slide decks, readable syllabus, homepage pipeline figure, asset stamps, and local links.')
