# Design QA — premium realtor mock

## Current review

The page was checked against the supplied 1024 × 1536 raster mock in the in-app browser. At that reference size, the complete page is 1536 px tall and the section boundaries align with the mock. This is a close responsive recreation of a raster reference; a pixel-identical match cannot be guaranteed without the original editable design file.

## Reference comparison

Source: `output/playwright/reference-source.png` (1024 × 1536)

Fresh browser captures during this review:

- Desktop comparison: 1024 × 1536
- Narrow mobile: 320 × 780
- Mobile: 390 × 844
- Desktop interaction review: 1440 × 900

The in-app browser captures were inspected live and were not exported as local image files.

### Vertical layout at 1024 × 1536

| Section | Top | Height |
|---|---:|---:|
| Hero | 0 px | 560 px |
| About | 560 px | 253 px |
| Services | 813 px | 188 px |
| Objects | 1001 px | 312 px |
| Consultation CTA | 1313 px | 223 px |

The canvas ends at 1536 px with the consultation CTA, as in the supplied mock. The reference has no separate footer on this page, so one was not added.

## Findings fixed in this review

1. **Hero height depended on viewport height.** A tall comparison viewport stretched it to 1121 px and pushed the remaining sections down. It now scales with the reference width and measures 560 px at 1024 px, restoring the 1536 px total page height.
2. **CTA photo started with a hard seam.** Added a short top mask fade, with both standard and WebKit mask declarations, so the photo blends into the shared teal background.
3. **Narrow mobile service heading joined words.** Replaced `<br>` separators that were hidden on mobile with explicit block spans; the 320 px heading now wraps cleanly without overflow.
4. **Service cards had excess empty height on phones.** Reduced their minimum height to 152 px at 390 px and 144 px at 320 px.
5. **Mobile navigation changed the hash without scrolling.** It now closes the overlay, restores body scrolling, then scrolls to the selected section. Navigation to the final CTA was observed working.
6. **Reveal animation could hide content if its observer was unavailable.** Visible content now has a safe initial state and a scroll fallback; reduced-motion mode makes content visible without transforms.
7. **Service-card hover inherited the slower entrance duration.** After reveal completes, card hover uses 240 ms and clears the stagger delay. The hero light now eases its pointer position via `requestAnimationFrame`.
8. **Consultation dialog lacked complete keyboard focus handling.** It now receives focus on open, traps Tab navigation, closes with Escape, and returns focus to the opening button.

## Interaction and responsive checks

- Widths checked: 320, 360, 390, 640, 768, 920, 921, 1024, and 1440 px. No document horizontal overflow was found.
- At 390 px, About copy appears before its image. The consultation form fits in an 844 px viewport, and its consent checkbox remains required.
- At 320 px, the compact service cards and navigation links fit their container.
- The mobile menu opens and closes, and its section link reaches the intended block after body scrolling is restored.
- Desktop service-card hover was observed: the card rises 4 px and its border shifts to gold. Hover rules are scoped to fine pointers; touch devices do not retain hover transforms.
- Gold button 3D hover, property-image zoom, navigation underline, and contact-link color states were reviewed in CSS. The in-app browser did not expose a standalone pointer-move action, so a persistent hovered screenshot for every selector was not available.
- Reduced-motion rules preserve short opacity/color feedback while removing parallax, scroll transforms, and hover transforms. The browser did not provide a way to emulate the OS reduced-motion setting during this review.
- The consultation dialog opened at 390 × 844, fit within the viewport, and passed keyboard focus checks: initial focus enters the dialog, Tab wraps, Escape closes it, and focus returns to the trigger.
- One Vite HMR WebSocket warning was logged after restarting the local server. The page itself loaded and interactions worked; no application runtime error appeared in the browser log.

## Build

The production client build, server-rendered bundle, prerendered pages, and Sites packaging completed successfully after the layout and interaction updates.

## Review 2026-11-09 — continuous background and hero transition

### Evidence and normalization

- Source visual: `output/playwright/reference-source.png`, 1024 × 1536 px.
- Final implementation: `output/playwright/implementation-full.png`, 1024 × 1536 px, captured from the 1024 × 768 CSS viewport with device scale factor 1 and full-page capture enabled.
- Focused implementation region: `output/playwright/implementation-about.png`, 1024 × 254 px. The matching Hero → About transition is also visible at y=560 in both full-page screenshots, so no additional source crop was needed.
- Mobile implementation: `output/playwright/implementation-mobile-390x844.png`, 390 × 844 px. Narrow and tablet metrics were captured by `output/playwright/capture-qa.mjs`.
- State: default page, entrance animations settled, no modal or menu open. Fonts were loaded before capture.
- The source and final implementation screenshots were opened together and compared at the same 1024 × 1536 image dimensions.

### Comparison history

1. **Before this iteration — P1: the Hero ended against a different flat fill.** The global photo layer sat behind the opaque site background, so the About and later sections lost the photographic texture visible in the source. The Hero image also remained visible too close to the section edge, making the color change read as a seam.
2. **Fix:** made the site shell transparent, placed one full-page blurred coastal photo behind the content, and laid the deep teal overlay over it with higher opacity on the left and a gradual reveal toward the right. The Hero image now fades out before the section boundary; the CTA photo begins with a longer top mask. The metrics figure was corrected from 300+ to the reference value, 200+.
3. **After the fix:** the 1024 × 1536 capture shows one continuous dark teal photographic field behind About, Services, and Objects; section heights remain 560 / 253 / 188 / 312 / 223 px, for a 1536 px total page. The hero-to-about handoff no longer exposes a flat, separately colored block. The CTA top fade remains intact.

### Required fidelity surfaces

- **Typography and copy:** Playfair Display and DM Sans load successfully. Main copy and hierarchy remain legible; hero, About and CTA headings keep their intended wraps. The 200+ metric now matches the reference.
- **Spacing and layout:** all desktop section heights still match the reference geometry. No section content is clipped. The mobile About copy remains before its image.
- **Color and image treatment:** the site-wide photo is now present behind every transparent section, with a dark teal overlay that is denser on the left. The CTA retains its own coastal photo and blended entrance.
- **Responsive behavior:** capture script reports no horizontal overflow at 320, 390, 768, 920, 921, 1024, or 1440 px. At 390 px, the hero is 850 px tall; About order is copy then photo. Mobile menu navigation and the consultation dialog still work.
- **Motion and controls:** button 3D hover transform is present; menu, dialog, and navigation checks pass. No application console or page errors were reported by the capture run.

### Remaining polish

- **P3:** the blurred foliage behind About and Services is slightly more subdued than the reference image. The primary transition and section continuity are fixed; this is a subtle background crop/intensity difference rather than a hard seam.
- Individual hover screenshots were not captured for every control. The button hover transform was measured, and the service-card hover behavior was previously observed live.

## Final result: passed

## Review 2026-11-10 — Hero viewport height

- Set `.hero` to `min-height: 100vh` with `100svh` support, so the first block fills the available screen height. Removed the tablet/mobile minimums that forced it taller than the viewport.
- Browser measurements: Hero is 900 px at 1440 × 900, 768 px at 1024 × 768, 1024 px at 768 × 1024, and 844 px at 390 × 844. The About section follows at a 0 px section gap on each size.
- No horizontal overflow at the captured widths; the mobile navigation and consultation dialog remain usable. The production client build completed successfully.
- Captures: `output/playwright/transition-wide-desktop.png`, `transition-laptop.png`, `transition-tablet.png`, `transition-mobile.png`, and `implementation-desktop-1024x768.png`.

## Final result: passed

## Review 2026-11-10 — Hero / About transition

### Evidence

- Target reference supplied in this request: `C:/Users/belpr/OneDrive/Desktop/2.png`, 494 × 491 px. `макет1.png` was treated as the previous implementation, not the target.
- Current browser capture: `output/playwright/implementation-full.png`, 1024 × 1536 px, captured at a 1024 × 768 CSS viewport, device scale factor 1, with entrance animations settled.
- Focused side-by-side comparison: `output/playwright/transition-comparison.png`. It compares the top 493 × 391 px of the target with the same Hero/About region from the implementation, normalized to 493 × 391 px.
- Responsive transition captures: `output/playwright/transition-wide-desktop.png` (1440 × 900), `transition-laptop.png` (1024 × 768), `transition-tablet.png` (768 × 1024), and `transition-mobile.png` (390 × 844).
- State: home page at top, no menu or dialog open, images and fonts loaded.

### Findings and changes

- Removed the 104 px Hero overlay extension that had continued over the About block. The portrait no longer sits beneath the transition layer.
- The Hero photo and its teal overlay now both fade toward the bottom edge. The overlay ends at the deep-teal opacity used by About, so the shared background treatment continues across the section boundary.
- `.about` keeps its photo as a foreground grid item; its background tint sits behind the portrait. On desktop, the About photo begins at the Hero boundary with 0 px gap and 0 px overlap.
- The sections meet at 0 px on all four captured widths. Page width equals viewport width at 1440, 1024, 768, and 390 px. The existing 320 px QA capture also reports no horizontal overflow.
- Side-by-side review found no actionable P0/P1/P2 transition mismatch. Text, photos, section order, typography, and controls were not changed.

### Verification

- Browser QA at 320, 390, 768, 1024, and 1440 px found no horizontal overflow. The responsive QA script reported no browser console or page errors; mobile navigation and the consultation dialog still worked.
- The Vite production client build completed successfully.
- Remaining differences beyond the scoped Hero/About transition are outside this CSS-only update.

## Final result: passed

## Review 2026-11-10 — Hero at wide desktop widths

- Added a focused `min-width: 1440px` composition adjustment in `src/styles.css`: more top breathing room before the eyebrow and headline, slightly larger display type, a wider/taller primary CTA, and more deliberate spacing around the description and bottom metrics.
- Kept the Hero at exactly the viewport height. The change only applies at 1440 px and wider; laptop, tablet, and phone layouts continue using their existing rules.
- Captured and visually reviewed 1440 × 900 and 1920 × 1080, plus 1024 × 768 and 390 × 844. At each size the hero-to-about gap is 0 px, document width equals viewport width, and the first screen remains 100vh / 100svh.
- The Vite production client build completed successfully.
- Captures: `output/playwright/transition-wide-desktop.png`, `transition-ultra-wide.png`, `transition-laptop.png`, and `transition-mobile.png`.

## Final result: passed

## Review 2026-11-10 — About / Services transition

- Replaced the solid teal fill on `.about` with a vertical alpha gradient. It keeps the section's dark tone behind the copy and gradually reveals the shared page background at the bottom, so the transition into `.services` has no separate flat band.
- The fade is a background layer only; it does not cover the portrait, alter section order, spacing, or service cards.
- Verified screenshots at 1440 px and 390 px. The section boxes meet with a 0 px gap, document width matches viewport width, and the mobile layout keeps its existing copy-before-photo order.
- Vite production client build completed successfully.
- Captures: `output/playwright/about-services-before-1440.png` and `about-services-before-390.png` (captured after the CSS update; filenames retained from the pre-change baseline script).

## Final result: passed
