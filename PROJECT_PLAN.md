# Mobility Plus Digital Business Card Project Plan

This plan follows `AGENTS.md` and keeps the project as a completely static GitHub Pages website using only HTML, CSS, and vanilla JavaScript. The plan does not include a backend, database, user accounts, admin panel, inquiry form, analytics, paid services, npm, or any build process.

## Current Repository State

- Existing files: `README.md`, `AGENTS.md`, and `PROJECT_PLAN.md`.
- No website implementation files exist yet.
- The local workspace is initialized as a Git repository on `main` and tracks `origin/main` at `https://github.com/haitish-astro/mobility-plus-digital-card.git`.

## Global Guardrails

- Public visitors can view and interact with the business card only.
- Official company and representative information can change only through repository edits by people with write access.
- All editable business information must live in one clearly labeled configuration file.
- All assets and scripts must use relative paths that work under a GitHub Pages project URL.
- QR-code generation must not depend on externally hosted QR-code APIs.
- Visitor information must not be collected, stored, logged, or sent to a service.
- Placeholder information must be clearly labeled until official content is provided.
- `README.md` must be updated when setup, configuration, deployment, or verification behavior changes.

## Milestone 1: Static Website Foundation

### Objective

Create the basic no-build static site shell for the Mobility Plus digital business card.

### Files to Create or Modify

- Create `index.html`.
- Create `assets/css/styles.css`.
- Create `assets/js/app.js`.
- Create `assets/img/` for committed visual assets and placeholders.
- Create or update `README.md` with static-site opening instructions.

### Expected User Behavior

Visitors can open the site from GitHub Pages or a local static file and see a professional mobile-first page shell without broken styles or scripts.

### Acceptance Criteria

- The site opens without a server, package install, or build step.
- HTML, CSS, and JavaScript use relative paths such as `assets/css/styles.css`.
- No framework, package manager, backend, database, account system, form, analytics, or hosted service is introduced.
- The initial page includes semantic landmarks and an accessible document structure.
- Any visible placeholder content is clearly labeled as placeholder content.

### Automated or Manual Tests

- Open `index.html` directly in a desktop browser.
- Inspect the browser console for missing file or JavaScript errors.
- Confirm there are no `package.json`, lockfiles, build configs, backend files, form endpoints, or analytics scripts.
- Check that stylesheet and script references are relative.

### Possible Limitations

- The first shell may not yet include final Mobility Plus branding, contact actions, QR display, or vCard behavior.
- Local file behavior can differ from GitHub Pages for some browser APIs, so later testing must include a hosted GitHub Pages URL.

## Milestone 2: Central Business-Information Configuration

### Objective

Create one clearly labeled source of truth for all editable official company and representative information.

### Files to Create or Modify

- Create `assets/js/card-config.js`.
- Modify `assets/js/app.js` to read display data from the configuration file.
- Update `README.md` with instructions for editing official card information through repository changes.

### Expected User Behavior

Visitors see public business-card information rendered from the configuration file, with no public editing controls.

### Acceptance Criteria

- All official company and representative details live in `assets/js/card-config.js`.
- The configuration includes public contact fields, permanent card URL, vCard fields, QR target, map link or address display values, visible labels, and placeholder flags where needed.
- Official details are not duplicated across unrelated files unless documented.
- Public visitors cannot edit, submit, or persist official information.
- Placeholder values are visibly and clearly identified.

### Automated or Manual Tests

- Search the repository for duplicated official phone, email, website, address, and representative values.
- Temporarily change a placeholder value in the config and confirm the rendered page uses the updated value.
- Confirm no local storage, cookies, remote writes, or public edit controls exist.

### Possible Limitations

- Configuration changes require repository write access and redeployment through GitHub Pages.
- There is no browser-based admin editing experience by design.

## Milestone 3: Mobile Digital Business Card

### Objective

Build the main mobile-first visual card experience using the centralized configuration.

### Files to Create or Modify

- Modify `index.html`.
- Modify `assets/css/styles.css`.
- Modify `assets/js/app.js`.
- Add committed image assets or clearly labeled placeholders under `assets/img/`.

### Expected User Behavior

Visitors on phones immediately see a polished Mobility Plus business card with representative details, company identity, core action buttons, and clear visual hierarchy.

### Acceptance Criteria

- The primary layout is optimized for small screens first and remains professional on tablets and desktops.
- Interactive controls are large enough for touch.
- Text remains readable and does not overlap or overflow.
- Branding and representative information render from the configuration file.
- Placeholder assets and text are clearly marked until replaced.
- The page remains fast and lightweight.

### Automated or Manual Tests

- Test common viewport widths, including narrow mobile, large mobile, tablet, and desktop.
- Use keyboard navigation to reach every interactive control.
- Inspect for text overflow, layout shift, and broken image paths.
- Check that the page remains usable when images fail to load.

### Possible Limitations

- Final polish may depend on receiving official logos, colors, representative photo, and approved copy.
- Some device-specific contact behaviors can only be fully verified on real phones.

## Milestone 4: Call, Text, Email, Website, and Map Actions

### Objective

Add direct public action links for contacting Mobility Plus and opening relevant public web or map destinations.

### Files to Create or Modify

- Modify `assets/js/card-config.js` to include public phone, SMS, email, website, and map URL values.
- Modify `assets/js/app.js` to render and validate action links.
- Modify `index.html` if additional semantic containers are needed.
- Modify `assets/css/styles.css` for action-button states.

### Expected User Behavior

Visitors can tap to call, text, email, open the company website, and open a map destination using their device's normal apps.

### Acceptance Criteria

- Phone links use `tel:`.
- Text links use `sms:` with a broadly compatible format.
- Email links use `mailto:`.
- Website links open the configured public website.
- Map links use a configured public URL, not a paid API.
- Disabled or missing placeholder actions are clearly identified and do not pretend to be official.
- No customer information is collected or submitted.

### Automated or Manual Tests

- Inspect generated link attributes for correct schemes and relative or public URLs.
- Test action links on desktop where possible.
- Test call, SMS, email, website, and map actions on iPhone and Android.
- Confirm no action points to a backend, form handler, analytics endpoint, or paid API.

### Possible Limitations

- `tel:`, `sms:`, `mailto:`, and map behavior varies by device, browser, installed apps, and operating system.
- Desktop browsers may not have configured phone, SMS, or email handlers.

## Milestone 5: Save Contact vCard Feature

### Objective

Generate a valid downloadable contact file from the centralized configuration.

### Files to Create or Modify

- Modify `assets/js/card-config.js` to include all approved vCard fields.
- Modify `assets/js/app.js` to generate and download a `.vcf` file.
- Update `README.md` with notes for verifying and editing vCard fields.

### Expected User Behavior

Visitors can tap "Save Contact" and download or open a contact card that imports into iPhone and Android contact apps.

### Acceptance Criteria

- The vCard is generated from `assets/js/card-config.js`.
- The generated file uses a broadly compatible vCard format.
- The vCard contains only approved public business information.
- The downloaded filename is professional and predictable.
- Special characters, line breaks, commas, semicolons, and phone values are safely escaped for vCard compatibility.
- No private home address, secret, token, or unapproved personal information is included.

### Automated or Manual Tests

- Generate the `.vcf` file in the browser and inspect its text content.
- Import the vCard on iPhone and Android.
- Verify name, organization, phone, email, website, and address fields land in expected contact fields.
- Test placeholder and missing-field behavior.

### Possible Limitations

- Contact apps interpret some vCard fields differently.
- iPhone and Android may display organization, title, and address fields with small formatting differences.

## Milestone 6: Share Card and Copy Link Features

### Objective

Let visitors share the permanent public card URL or copy it for later use.

### Files to Create or Modify

- Modify `assets/js/card-config.js` to define the permanent public card URL.
- Modify `assets/js/app.js` to implement Web Share API behavior with a clipboard fallback.
- Modify `assets/css/styles.css` for feedback states.

### Expected User Behavior

Visitors can tap to share the card through their device's native share sheet when supported, or copy the permanent card link when sharing is not available.

### Acceptance Criteria

- Share and copy actions use the configured permanent public card URL.
- The copied/shared link is the same URL used by the QR code.
- Clipboard fallback is available when native sharing is unsupported.
- The UI gives accessible success or failure feedback.
- No tracking parameters or visitor identifiers are added to the shared URL.

### Automated or Manual Tests

- Test native sharing on a supported mobile browser.
- Test copy fallback on desktop and unsupported browsers.
- Paste the copied link and verify it is the configured permanent URL.
- Confirm the feature does not write to storage or call analytics.

### Possible Limitations

- Web Share API support varies by browser and device.
- Clipboard permissions and HTTPS requirements can affect copy behavior, especially when opened as a local file.

## Milestone 7: Transferable QR-Code View

### Objective

Display a non-expiring QR code that points to the permanent public card URL and can be shown or shared by anyone who opens the card.

### Files to Create or Modify

- Create `assets/js/qr.js` for local QR-code generation or committed static QR rendering logic.
- Modify `assets/js/app.js` to show, hide, and share the QR-code view.
- Modify `assets/css/styles.css` for the QR-code view.
- Modify `assets/js/card-config.js` to keep the QR target aligned with the permanent card URL.

### Expected User Behavior

Visitors can open the QR-code view, show it to another person, and that person can scan the same permanent card URL.

### Acceptance Criteria

- The QR code links to the configured permanent public webpage.
- The QR code does not expire.
- QR generation happens locally or from committed static assets.
- No external QR-code generation API is called.
- The same QR target is used by share, copy link, and QR features.
- The QR code is large enough to scan from a phone screen and includes accessible context.

### Automated or Manual Tests

- Scan the QR code from another phone and verify it opens the configured permanent public URL.
- Search the codebase for remote QR API URLs.
- Test the QR view at mobile and desktop sizes.
- Test keyboard access for opening and closing the QR view.

### Possible Limitations

- QR scanning reliability depends on screen brightness, camera quality, glare, and QR size.
- The permanent URL must be finalized before launch to avoid printing or sharing the wrong QR destination.

## Milestone 8: GitHub Pages Deployment Preparation

### Objective

Prepare the repository for free GitHub Pages hosting with a no-build deployment path.

### Files to Create or Modify

- Create or update `README.md` with GitHub Pages setup, configuration, and verification instructions.
- Optionally create `.nojekyll` if needed for static asset behavior.
- Confirm root-level `index.html` is the published entry point.

### Expected User Behavior

Repository maintainers can enable GitHub Pages and publish the static card without installing tools or running a build.

### Acceptance Criteria

- Deployment instructions use GitHub Pages from the repository branch and root folder.
- No GitHub Actions build workflow is required.
- No package installation or command-line build is required.
- Relative paths work from a project URL such as `/mobility-plus-digital-card/`.
- README explains how to update official card information through the configuration file.
- README documents manual post-deploy checks.

### Automated or Manual Tests

- Open the published GitHub Pages URL after deployment.
- Verify CSS, JavaScript, images, QR display, vCard, share, and copy behaviors from the hosted project URL.
- Confirm no root-relative asset paths break under the project URL.
- Review repository settings and README instructions for consistency.

### Possible Limitations

- GitHub Pages settings must be enabled by a repository owner or maintainer.
- Initial DNS and Pages publication can take time.
- Some browser APIs work best or only on HTTPS, so final behavior must be tested on the published Pages URL.

## Milestone 9: Mobile, Accessibility, and Browser Testing

### Objective

Verify the card is usable, accessible, and reliable across target devices and browsers.

### Files to Create or Modify

- Modify `index.html`, `assets/css/styles.css`, `assets/js/app.js`, `assets/js/qr.js`, or `assets/js/card-config.js` only to fix issues found during testing.
- Update `README.md` with tested environments and known limitations.

### Expected User Behavior

Visitors can use every feature with touch, keyboard, screen-reader-friendly labels, and common mobile browsers.

### Acceptance Criteria

- Every interactive control is keyboard reachable and has a visible focus state.
- Buttons and links have meaningful accessible names.
- Color contrast is readable.
- The card layout works on small mobile screens without overlap.
- Features degrade gracefully when Web Share API or clipboard access is unavailable.
- No customer data is collected or stored during any interaction.

### Automated or Manual Tests

- Test on iPhone Safari and Android Chrome.
- Test on desktop Chrome, Edge, Firefox, and Safari if available.
- Navigate the full page by keyboard.
- Use browser accessibility tools or manual inspection for labels, landmarks, heading order, focus, and contrast.
- Test with zoom and larger text settings.
- Re-test call, text, email, website, map, vCard, share, copy, and QR flows.

### Possible Limitations

- Full screen-reader coverage may depend on available devices and assistive technology.
- Some native sharing, contact, phone, SMS, and email flows cannot be perfectly simulated on desktop.

## Milestone 10: Final Security and Documentation Review

### Objective

Confirm the final site is safe, static, documented, and ready for official public use.

### Files to Create or Modify

- Review all project files.
- Update `README.md` with final setup, editing, deployment, and verification instructions.
- Update `AGENTS.md` only if project governance requirements change.
- Update `PROJECT_PLAN.md` only if the plan materially changes.

### Expected User Behavior

Visitors see the official Mobility Plus digital card and can use its intended public actions without exposing private data or depending on restricted services.

### Acceptance Criteria

- No backend, database, user accounts, admin panel, inquiry form, analytics, paid services, npm, or build process exists in the repository.
- No secrets, tokens, API keys, passwords, private addresses, or customer data are present.
- Official information is centralized in the configuration file.
- README accurately explains configuration and deployment.
- Placeholder values have either been replaced with approved official information or remain clearly labeled.
- QR, share, and copy all use the same permanent public URL.
- vCard output contains only approved public business details.
- The hosted GitHub Pages site works on target devices.

### Automated or Manual Tests

- Search the repository for secrets, private data, forbidden services, package files, and backend patterns.
- Review all external links and asset paths.
- Re-run mobile, browser, accessibility, QR, vCard, share, and copy checks.
- Confirm README deployment instructions match the actual repository setup.
- Document any known limitations before launch.

### Possible Limitations

- Final approval may depend on Mobility Plus confirming official contact details, brand assets, and legal/business copy.
- GitHub Pages availability and browser behavior are external platform factors outside the static site's direct control.
