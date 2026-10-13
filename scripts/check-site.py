"""Check source freshness, extracted content, downloads, and local references."""
from pathlib import Path
import json
import hashlib
import re
from html.parser import HTMLParser
from datetime import datetime
from zoneinfo import ZoneInfo

base = Path(__file__).resolve().parents[1]
dist = base / 'dist'
raw = (dist / 'data.js').read_text()
data = json.loads(raw.removeprefix('window.COURSE = ').removesuffix(';\n'))
source = base.parents[1] / 'COMP 329 Syllabus - Spring 2027.docx'
download = dist / 'assets/syllabus-spring-2027.docx'
assert hashlib.sha256(download.read_bytes()).hexdigest() == data['source_sha256'], 'Bundled syllabus and website data differ.'
if source.exists():
    assert hashlib.sha256(source.read_bytes()).hexdigest() == data['source_sha256'], 'Source syllabus changed; regenerate and review the website.'
assert len(data['schedule']) == 17
assert len(data['assignments']) == 6
assert len(data['labs']) == 5
assert len(data['glossary']) == 38
assert [a['code'] for a in data['assignments']] == ['D1', 'D2', 'D3', 'T1', 'T2', 'T3']
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
assert len(events) == 7
for event in events[:6]:
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
for url in refs.urls:
    if url.startswith('#'): assert url[1:] in refs.ids, f'Broken anchor: {url}'
    elif not re.match(r'https?://', url): assert (dist / url).is_file(), f'Missing local asset: {url}'
manifest_path = base / '.openai/hosting.json'
if manifest_path.exists():
    manifest = json.loads(manifest_path.read_text())
    assert manifest['project_id'] and manifest['static']['directory'] == 'dist'
assert f'content="{data["source_sha256"]}"' in (dist / 'syllabus.html').read_text(), 'Readable syllabus is stale; regenerate it.'
print('PASS: source freshness, schedule/deadline agreement, seven calendar events, readable syllabus, and local links.')
