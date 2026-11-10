# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.

## Selected premium realtor direction — new project branch

- Branch: `premium-realtor-variant-1`. Build a new one-page React business-card site; do not modify the existing published design in this branch.
- Treat `C:/Users/belpr/.codex/generated_images/01a1a879-ab87-76e3-b340-043508863163/exec-7f6a0bf2-dc09-4da3-b886-9b325022fb02.png` as the selected visual source for hierarchy, dark teal and gold palette, serif headlines, photography, service cards, property cards and consultation close.
- Treat all text, imagery, prices, and displayed figures in the selected mock as the source of truth. Use its editable sample phone (+7 (4012) 90-55-77), metrics (10+ years, 300+ deals), and sample property prices; the owner will replace these later. Do not substitute details from the previous site or invent additional metrics.
- Listing content and the realtor portrait are clearly marked demonstrations until the owner replaces them. Use premium coastal/property photography with warm dusk light.
- Preserve the source mock's exact editable placeholder figures: 10+ years, 300+ deals, and the sample property prices. Use count-up motion for the two hero metrics.
- Keep one shared, image-backed deep-teal page atmosphere behind the sections, with translucent overlays and soft gradients so section boundaries do not look like separate solid blocks.
- Keep the visual service cards limited to their icon, title, and short description as shown in the mock; the consultation form is opened from the closing CTA.
- Keep the home page's visible section order and final CTA composition aligned with the source image; do not append extra visual sections outside the source canvas.
- Match the reference typography: italic high-contrast Playfair Display for the hero, Playfair Display for display headings and metrics, and DM Sans for body/interface copy.
- The about portrait must use a wide composition that preserves the subject's head and shoulders without clipping; fade its right edge into the copy and section background.
- Use the gold pill CTA with a soft glow and dimensional hover, fine-pointer parallax on the hero image, a subtle pointer light, and sequential section reveals. Respect reduced-motion preferences and keep mobile interactions touch-friendly.
- Preserve the existing privacy route and consent checkbox. The consultation form must disclose that the email is not configured instead of pretending to send a request.
- Keep section labels in sentence case and headings without trailing periods; no artificial uppercase styling or expanded letter spacing on eyebrow labels.
- On mobile, place the about copy before its portrait, collapse the property cards to one column, and provide a working full-screen navigation.
- Use Playfair Display for display text and DM Sans for interface text. Keep spacing in 4px increments and use Tailwind theme tokens/classes for the palette.
- After meaningful UI changes, verify desktop and mobile rendering in the local browser. Before handoff, run the production build.
