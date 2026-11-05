# Design QA

## Source of truth

- Selected direction: option 1, with the requested button treatment (8px corner radius, restrained shadow, subtle 3D hover tilt).
- Reference: `design-reference-option-1.png`.
- Implementation: React one-page realtor business-card site in `src/`.

## Checks completed

- Production Vite build completed successfully.
- Responsive layout rules are present for desktop, tablet, and mobile widths.
- Mobile navigation has an accessible toggle, Escape-to-close behavior, scroll locking, and is inert while closed.
- Hover tilt is limited to fine-pointer devices; reduced-motion preferences disable movement.
- Source review confirms the mobile hero, image sizing, service rows, process list, and contact form have dedicated narrow-screen styles.

## Browser visual check

- Desktop at 1543×831 and mobile at 390px were checked in Chromium; the desktop hero measured exactly 831px tall.
- Confirmed the split hero, diagonal image edge, two calls to action, Playfair Display headings, side-by-side about content, two-column service section, four-step process, and split contact/photo close.
- Section labels use 16px Playfair Display in terracotta across the page.
- Mobile check confirmed 390px document width with no horizontal overflow and a working open-menu control.
- Final result: passed.
