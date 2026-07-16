# Mobility Plus Digital Card

Official static digital business card for Mobility Plus.

## Project Structure

```text
/
  index.html
  css/
    styles.css
  js/
    config.js
    app.js
  assets/
    images/
      logo-placeholder.svg
      representative-placeholder.svg
      .gitkeep
    icons/
      favicon.svg
      .gitkeep
  .gitignore
  AGENTS.md
  PROJECT_PLAN.md
  README.md
```

All editable business and representative information belongs in `js/config.js`.
The page renders company details, representative details, services, action links,
vCard content, share text, and the QR-code target from that single file.

The current values are fictional placeholders and must be replaced with approved
public Mobility Plus information before launch.

## Current Public Features

- Mobile-first public business card layout.
- Logo and representative photo placeholders.
- Call, text, email, website, and optional map actions.
- Save Contact vCard download.
- Share Card through the browser share sheet when available.
- Copy Link fallback.
- Locally generated QR code for the configured public card URL.

The site does not include a backend, database, login, inquiry form, analytics, or
customer-data collection.

## Local Preview

No install step, package manager, or build process is required.

Open `index.html` directly in a browser to preview the current static page.
For example, double-click the file from the project folder or use your browser's
File > Open option.

The site must remain compatible with GitHub Pages, so use relative paths such as
`css/styles.css` and `js/app.js`.

## Repository Workflow

This workspace is connected to:

```text
https://github.com/haitish-astro/mobility-plus-digital-card.git
```

The local `main` branch tracks `origin/main`. After future files are created or changed, publish them to GitHub with:

```text
git status
git add <changed-files>
git commit -m "Describe the change"
git push
```

Keep the site static and follow `AGENTS.md` for all project requirements.
