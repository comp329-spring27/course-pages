# COMP 329 · Spring 2027

A one-page, buildless course website grounded in the current Spring 2027 syllabus. The source syllabus is downloadable at `dist/assets/syllabus-spring-2027.docx`. Instructor-facing launch and design notes are not included in the site.

## Preview

Open `dist/index.html` directly in a browser, or run `python3 -m http.server 4329 --directory dist --bind 127.0.0.1` from this folder.

Run `python3 scripts/check-site.py` to validate source freshness, schedule/deadline consistency, calendar times, asset stamps, and local links.

## Page structure

The homepage has five sections, each written to be read top to bottom without tabs, filters, dialogs, or introductory prose:

1. **Overview** – title, one line, three facts, and a single course map of the two instructors' halves (D1–D3, then T2, T3, T1 in due order). Hovering, focusing, or tapping a stage card reveals why the stage is needed (**Why:**), what we will do in it (**We will:**), and the due date in the panel below the map, without covering the other cards; clicking a card jumps to the assignment row. The explanations (`stageWhy` and `stageNotes`) are in `dist/app.js`.
2. **Pipeline** – the clickable course pipeline (see below).
3. **Schedule** – one row per week with lecture topics and what is due or released, grouped under divider rows for getting ready, the four modules (data processing, distributed and parallel computing, distributed computing for tensors and ML, GPU hardware), and finals, with the block colors from the course map. Opening a row shows each lecture's topics (its CONCEPT line from the syllabus) in two columns divided by a rule; the BUILD and STRETCH lines stay in the syllabus. Every lecture in Weeks 5–14 has a [slides] link to its PDF.
4. **Assignments** – one row per assignment; opening it shows the scope, the scaling study, and the handout link. There are no labs and no capstone.
5. **Grading** – the grade breakdown and four short policy items.
6. **Resources** – prerequisites, the pre-term checklist, and links.

The reading list and glossary live on the readable syllabus page (`syllabus.html#selected-readings`, `syllabus.html#glossary`) rather than the homepage.

## Content

`scripts/prepare-content.py` extracts the schedule, assignments, readings, and glossary from the syllabus and writes `dist/data.js`. It also creates an assignment calendar with deadlines at 11:59 p.m. America/Chicago. Only assignment deadlines are included; exam dates and times remain TBA.

Assignment slides (D1–T3 next to each handout link, and the optional UI under Resources) are copied the same way from `assignments/lecturer/slides/` (built with `make slides`) into `dist/assets/assignment-slides/`. Lecture slides for Weeks 5–14 (19 decks; Week 5 has one lecture) are copied by `scripts/prepare-content.py` from `assignments/lecturer/lectures/` (built with `make lectures`) into `dist/assets/slides/` and listed in `dist/data.js`; `check-site.py` requires all 19.

Assignment rows link to each handout in `comp329-spring27/student-assignments` on GitHub. The folder mapping is maintained in `scripts/prepare-content.py` so regeneration preserves these links. Links are included even while that repository is private.

After updating the syllabus or re-exporting slides, run `python3 scripts/prepare-content.py`. The script looks for the `assignments` repository next to this folder (`cs329-spring27/assignments`, beside `course-pages` and `student-assignments`); the older layout with this folder under `sites/` also works. It prints which syllabus and repository it used. It takes the syllabus from `assignments/lecturer/syllabus-spring-2027.docx` (or a loose `COMP 329 Syllabus - Spring 2027.docx` in the older layout) and the slide PDFs from `assignments/lecturer/slides/` and `lectures/`. When the repository is not found, as in the publishing workflow, it uses the bundled syllabus and the PDFs already in `dist/`. `check-site.py` cross-checks the syllabus and the handout folders against the same sibling repositories when they exist, and prints which it found. The script then regenerates `dist/syllabus.html` and stamps the homepage's asset links. Update the hand-written overview, grading, policy, and resources text in `dist/index.html` as needed; the one-line assignment summaries are in `dist/app.js`. Rendering of the generated data is in `dist/app.js`; styling is in `dist/styles.css`, with the shared palette and theme switch in `dist/theme.css`.

After editing any stylesheet or script by hand, run `python3 scripts/stamp-assets.py` (and `python3 scripts/prepare-syllabus.py` if `theme.css` or `theme.js` changed) so the `?v=` cache-busting stamps match; `check-site.py` fails otherwise.

## Publication

The website is published from `dist/` by the GitHub Actions workflow in `.github/workflows/pages.yml`. Each push to `main` validates the content and publishes to GitHub Pages; the workflow can also be run manually from the Actions tab.

Repository: https://github.com/comp329-spring27/course-pages

GitHub Pages URL: https://comp329-spring27.github.io/course-pages/

In repository **Settings → Pages**, select **GitHub Actions** as the publishing source. Relative asset links work beneath the `/course-pages/` path. No dependency installation or build is required.

The ignored `.openai/` folder contains local metadata from an unused Sites registration. It is excluded from Git commits and GitHub Pages publication.

## Course identity

`dist/assets/course-mark.svg` is the custom course owl used in the header, footer, and SVG browser icon. Matching PNG, ICO, and Apple touch icons are included in `dist/assets/`. Keep these variants in sync when changing the mark.

Syllabus links open `dist/syllabus.html` in a new tab for browser reading. This page is generated from the bundled Word syllabus by `scripts/prepare-syllabus.py`, also run during content preparation. Its section headings carry ids so the homepage can link into it. The syllabus shows the course pipeline as a high-level image (drawn by `assignments/lecturer/tools/syllabus_pipeline_diagram.py` and embedded in the Word file).

The homepage has a **Pipeline** section with the clickable version: one box per stage, and selecting a stage opens what it reads and writes (format, shape and a real example), right under that row; "Token shards" opens a step-by-step walkthrough from D3's shards to a training batch. The markup and examples are in `scripts/pipeline-figure.html`, which `scripts/prepare-pipeline.py` copies between the `pipeline-figure` markers in `dist/index.html` (run by `prepare-content.py`); the behaviour is in `dist/pipeline-figure.js` and the styles in `dist/pipeline-figure.css`. Without JavaScript, and when printing, every panel is shown. The examples come from the staff sample run; keep them in step with the high-level image.

The homepage and syllabus share `theme.css` and `theme.js`. Light mode is the default; the header switch saves the selected theme in local storage and synchronizes it across open tabs. All colors are CSS variables defined once in `theme.css` for light and dark, so component styles need no per-theme overrides.
