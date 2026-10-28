# COMP 329 · Spring 2027

A one-page, buildless course website grounded in the current Spring 2027 syllabus. The source syllabus is downloadable at `dist/assets/syllabus-spring-2027.docx`. Instructor-facing launch and design notes are not included in the site.

## Preview

Open `dist/index.html` directly in a browser, or run `python3 -m http.server 4329 --directory dist --bind 127.0.0.1` from this folder.

Run `python3 scripts/check-site.py` to validate source freshness, schedule/deadline consistency, calendar times, asset stamps, and local links.

## Page structure

The homepage has five sections, each written to be read top to bottom without tabs, filters, dialogs, or introductory prose:

1. **Overview** – title, one line, three facts, and a single course map of the two blocks (D1–D3, T1–T3) with their instructors. Hovering, focusing, or tapping a stage card reveals a short explanation with the due date in the panel below the map, without covering the other cards; clicking a card jumps to the assignment row. The explanations are in `dist/app.js`.
2. **Schedule** – one row per week with lecture topics and what is due or released, grouped under divider rows for the introduction, the data block, the training block, and the wrap-up, with the block colors from the course map. Opening a row shows the lecture bullets. Each training-block lecture (Weeks 8–13) has a [slides] link to its PDF.
3. **Assignments** – one row per assignment; opening it shows the scope, the scaling study, and the handout link. The capstone and labs appear only in the schedule, the grade table, and the policies.
4. **Grading** – the grade breakdown and four short policy items.
5. **Resources** – prerequisites, the pre-term checklist, and links.

The reading list and glossary live on the readable syllabus page (`syllabus.html#selected-readings`, `syllabus.html#glossary`) rather than the homepage.

## Content

`scripts/prepare-content.py` extracts the schedule, assignments, labs, readings, and glossary from the syllabus and writes `dist/data.js`. It also creates an assignment calendar with deadlines at 11:59 p.m. America/Chicago. Only assignment and capstone deadlines are included; exam dates and times remain TBA.

Lecture slides for Weeks 8–13 are copied by `scripts/prepare-content.py` from `assignments/lecturer/lectures/` (built with `make lectures`) into `dist/assets/slides/` and listed in `dist/data.js`; `check-site.py` requires all twelve.

Assignment rows link to each handout in `comp329-spring27/student-assignments` on GitHub; the capstone handout is reachable from the handouts repository link under Resources. The folder mapping is maintained in `scripts/prepare-content.py` so regeneration preserves these links. Links are included even while that repository is private.

After updating the syllabus, run `python3 scripts/prepare-content.py`. The script uses the syllabus in the course workspace when available, otherwise the bundled syllabus, and then regenerates `dist/syllabus.html` and stamps the homepage's asset links. Update the hand-written overview, grading, policy, and resources text in `dist/index.html` as needed; the one-line assignment summaries are in `dist/app.js`. Rendering of the generated data is in `dist/app.js`; styling is in `dist/styles.css`, with the shared palette and theme switch in `dist/theme.css`.

After editing any stylesheet or script by hand, run `python3 scripts/stamp-assets.py` (and `python3 scripts/prepare-syllabus.py` if `theme.css` or `theme.js` changed) so the `?v=` cache-busting stamps match; `check-site.py` fails otherwise.

## Publication

The website is published from `dist/` by the GitHub Actions workflow in `.github/workflows/pages.yml`. Each push to `main` validates the content and publishes to GitHub Pages; the workflow can also be run manually from the Actions tab.

Repository: https://github.com/comp329-spring27/course-pages

GitHub Pages URL: https://comp329-spring27.github.io/course-pages/

In repository **Settings → Pages**, select **GitHub Actions** as the publishing source. Relative asset links work beneath the `/course-pages/` path. No dependency installation or build is required.

The ignored `.openai/` folder contains local metadata from an unused Sites registration. It is excluded from Git commits and GitHub Pages publication.

## Course identity

`dist/assets/course-mark.svg` is the custom course owl used in the header, footer, and SVG browser icon. Matching PNG, ICO, and Apple touch icons are included in `dist/assets/`. Keep these variants in sync when changing the mark.

Syllabus links open `dist/syllabus.html` in a new tab for browser reading. This page is generated from the bundled Word syllabus by `scripts/prepare-syllabus.py`, also run during content preparation. Its section headings carry ids so the homepage can link into it.

The homepage and syllabus share `theme.css` and `theme.js`. Light mode is the default; the header switch saves the selected theme in local storage and synchronizes it across open tabs. All colors are CSS variables defined once in `theme.css` for light and dark, so component styles need no per-theme overrides.
