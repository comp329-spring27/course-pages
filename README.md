# COMP 329 · Spring 2027

A responsive, buildless course website grounded in the current Spring 2027 syllabus. The source syllabus is downloadable at `dist/assets/syllabus-spring-2027.docx`. Instructor-facing launch and design notes are not included in the site.

## Preview

Open `dist/index.html` directly in a browser, or run `python3 -m http.server 4329 --directory dist --bind 127.0.0.1` from this folder.

Run `python3 scripts/check-site.py` to validate source freshness, schedule/deadline consistency, calendar times, and local links.

## Content

`scripts/prepare-content.py` extracts the two consecutive teaching blocks, schedule, assignments, labs, readings, and glossary from the syllabus and writes `dist/data.js`. It also creates an assignment calendar with deadlines at 11:59 p.m. America/Chicago. Only assignment and capstone deadlines are included; exam dates and times remain TBA.

Assignment cards and details link to each handout in `comp329-spring27/student-assignments` on GitHub; the capstone has its own handout link. The folder mapping is maintained in `scripts/prepare-content.py` so regeneration preserves these links. Links are included even while that repository is private.

After updating the syllabus, run `python3 scripts/prepare-content.py`. The script uses the syllabus in the course workspace when available, otherwise the bundled syllabus. Update the overview and policy summaries in `dist/index.html` as needed. Source styling and interactions are in `dist/styles.css` and `dist/app.js`.

## Publication

The website is published from `dist/` by the GitHub Actions workflow in `.github/workflows/pages.yml`. Each push to `main` validates the content and publishes to GitHub Pages; the workflow can also be run manually from the Actions tab.

Repository: https://github.com/comp329-spring27/course-pages

GitHub Pages URL: https://comp329-spring27.github.io/course-pages/

In repository **Settings → Pages**, select **GitHub Actions** as the publishing source. Relative asset links work beneath the `/course-pages/` path. No dependency installation or build is required.

The ignored `.openai/` folder contains local metadata from an unused Sites registration. It is excluded from Git commits and GitHub Pages publication.

## Course identity

`dist/assets/course-mark.svg` is the custom course owl used in the header, footer, and SVG browser icon. Matching PNG, ICO, and Apple touch icons are included in `dist/assets/`. Keep these variants in sync when changing the mark.

Syllabus links open `dist/syllabus.html` in a new tab for browser reading. This page is generated from the bundled Word syllabus by `scripts/prepare-syllabus.py`, also run during content preparation.
