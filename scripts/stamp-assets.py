"""Stamp the homepage's stylesheet and script links with content hashes so browsers fetch updated files."""
from pathlib import Path
import hashlib
import re

base = Path(__file__).resolve().parents[1]
dist = base / 'dist'
page = dist / 'index.html'
html = page.read_text()

def stamp(match):
    name = match.group(1)
    digest = hashlib.sha256((dist / name).read_bytes()).hexdigest()[:12]
    return f'{name}?v={digest}'

html = re.sub(r'((?:theme|styles|app|data)\.(?:css|js))\?v=[^"]*', stamp, html)
page.write_text(html)
print('Stamped homepage asset links.')
