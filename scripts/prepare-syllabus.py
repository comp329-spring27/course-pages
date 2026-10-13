"""Create a browser-readable syllabus from the bundled Word source."""
from pathlib import Path
from zipfile import ZipFile
from xml.etree import ElementTree as ET
from html import escape
import hashlib

base = Path(__file__).resolve().parents[1]
source = base / 'dist/assets/syllabus-spring-2027.docx'
W = '{http://schemas.openxmlformats.org/wordprocessingml/2006/main}'
R = '{http://schemas.openxmlformats.org/officeDocument/2006/relationships}'
with ZipFile(source) as archive:
    document = ET.fromstring(archive.read('word/document.xml'))
    relationships = ET.fromstring(archive.read('word/_rels/document.xml.rels'))
links = {r.get('Id'): r.get('Target') for r in relationships if r.get('TargetMode') == 'External'}

def inline(node):
    if node.tag == W + 't':
        return escape(node.text or '')
    if node.tag == W + 'br':
        return '<br>'
    if node.tag == W + 'tab':
        return ' '
    content = ''.join(inline(child) for child in node if child.tag not in {W + 'pPr', W + 'rPr'})
    if node.tag == W + 'hyperlink':
        url = links.get(node.get(R + 'id'), '')
        if url.startswith(('https://', 'http://', 'mailto:')):
            return f'<a href="{escape(url, quote=True)}">{content}</a>'
    if node.tag == W + 'r':
        properties = node.find(W + 'rPr')
        if properties is not None:
            for name, tag in [('b', 'strong'), ('i', 'em')]:
                prop = properties.find(W + name)
                if prop is not None and prop.get(W + 'val') not in {'0', 'false', 'off'}:
                    content = f'<{tag}>{content}</{tag}>'
    return content

first_paragraph = True

def blocks(parent):
    global first_paragraph
    result = []
    in_list = False
    for node in parent:
        if node.tag == W + 'p':
            content = inline(node)
            if not content.strip():
                continue
            style = node.find(W + 'pPr/' + W + 'pStyle')
            style = style.get(W + 'val', '') if style is not None else ''
            is_list = style == 'ListParagraph'
            if in_list and not is_list:
                result.append('</ul>')
                in_list = False
            if is_list:
                if not in_list:
                    result.append('<ul>')
                    in_list = True
                tag = 'li'
            elif first_paragraph:
                tag = 'h1'
                first_paragraph = False
            else:
                tag = {'Heading1': 'h2', 'Heading2': 'h3'}.get(style, 'p')
            result.append(f'<{tag}>{content}</{tag}>')
        elif node.tag == W + 'tbl':
            if in_list:
                result.append('</ul>')
                in_list = False
            rows = []
            for row in node.findall(W + 'tr'):
                cells = []
                for cell in row.findall(W + 'tc'):
                    span = cell.find(W + 'tcPr/' + W + 'gridSpan')
                    colspan = f' colspan="{int(span.get(W + "val"))}"' if span is not None else ''
                    cells.append(f'<td{colspan}>{blocks(cell)}</td>')
                rows.append('<tr>' + ''.join(cells) + '</tr>')
            result.append('<div class="table-scroll" tabindex="0" role="region" aria-label="Syllabus table"><table>' + ''.join(rows) + '</table></div>')
    if in_list:
        result.append('</ul>')
    return '\n'.join(result)

content = blocks(document.find(W + 'body'))
page = '''<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Syllabus · COMP 329 · Spring 2027</title>
<link rel="icon" type="image/svg+xml" href="assets/course-mark.svg">
<link rel="stylesheet" href="syllabus.css?v=CSS_HASH">
<link rel="stylesheet" href="theme.css?v=THEME_CSS_HASH">
<script src="theme.js?v=THEME_JS_HASH"></script>
<meta name="source-sha256" content="SOURCE_HASH">
</head><body class="syllabus-page"><header><a href="./"><img src="assets/course-mark.svg" alt="" width="40" height="40">COMP 329 · Course home</a><span>Spring 2027 syllabus</span><button type="button" class="theme-toggle" data-theme-toggle role="switch" aria-checked="false" aria-label="Dark mode"><span class="theme-toggle-track" aria-hidden="true"><span class="theme-toggle-knob"></span></span><span class="theme-toggle-label">Dark mode</span></button></header>
<main>CONTENT</main></body></html>
'''.replace('THEME_CSS_HASH', hashlib.sha256((base / 'dist/theme.css').read_bytes()).hexdigest()[:12]).replace('THEME_JS_HASH', hashlib.sha256((base / 'dist/theme.js').read_bytes()).hexdigest()[:12]).replace('CSS_HASH', hashlib.sha256((base / 'dist/syllabus.css').read_bytes()).hexdigest()[:12]).replace('SOURCE_HASH', hashlib.sha256(source.read_bytes()).hexdigest()).replace('CONTENT', content)
(base / 'dist/syllabus.html').write_text(page)
print('Prepared browser-readable syllabus.')
