"""Copy the clickable pipeline figure (scripts/pipeline-figure.html) into the homepage's Pipeline section."""
from pathlib import Path
import re

base = Path(__file__).resolve().parents[1]
page = base / 'dist/index.html'
figure = (base / 'scripts/pipeline-figure.html').read_text().strip()
html = page.read_text()
pattern = re.compile(r'(<!-- pipeline-figure:start[^>]*-->\n).*?(<!-- pipeline-figure:end -->)', re.S)
assert len(pattern.findall(html)) == 1, 'index.html needs exactly one pipeline-figure:start/end marker pair'
page.write_text(pattern.sub(lambda m: m.group(1) + figure + '\n' + m.group(2), html))
print('Inserted the pipeline figure into the homepage.')
