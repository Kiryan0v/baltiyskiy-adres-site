# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.

## Selected realtor direction

- Build a one-page React business-card site for an independent realtor in Kaliningrad and the region.
- Follow selected direction 1: editorial split hero, forest green and warm paper palette, serif display type, restrained coastal photography, clear about/services/process/contact sections.
- Buttons use modest 8px rounding, a soft static shadow, and a subtle short 3D tilt on fine-pointer hover. Keep touch behavior simple and honor reduced-motion preferences.
- Keep section labels in sentence case and headings without trailing periods; do not add invented credentials, transaction counts, or reviews.
- Match the selected image's section anatomy and content closely: split hero, image and about copy side by side, left service title beside three open service rows, four process columns, and a split contact/photo close.
- Use Playfair Display for display headings with DM Sans for interface text, matching the selected mock's broader, higher-contrast serif letterforms.
- Use the mock's terracotta Playfair style for all section labels, and keep the desktop hero at viewport height.
