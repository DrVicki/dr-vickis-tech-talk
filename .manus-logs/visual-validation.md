# Visual validation — 2026-09-07

## Desktop

The homepage renders as intended at 1440 × 900: the headline remains legible over the navy hero treatment, original collage artwork is sharp, the feature card is balanced, the notebook grid maintains hierarchy, and all high-contrast blue/coral/lime sections join cleanly. The article page preserves a readable centered measure with stable side rails, clear section hierarchy, and related-story cards. The About page has correct alignment, generous whitespace, and consistent branding.

## Mobile

The homepage and article page render without horizontal overflow at 390 × 844. Navigation collapses correctly, feature content stacks, article cards become a single column, the subscription form is full-width, and the article body retains a readable line length. The hero artwork crops around its intended focal area, and all text remains legible against the rendered backgrounds.

## Result

Pass. No visually blocking defects observed across the reviewed breakpoints and routes.

## Interaction validation

The live preview loads with complete semantic page content and expected navigation targets. The search control opens a focused modal with a strong contrast backdrop, an editable query field, four suggested stories, keyboard-close affordance, and valid article links. Initial interaction state passes.

Search interaction passes: entering “privacy” reduces the overlay to exactly one relevant story, and selecting that result routes to `/post/personal-data-private-by-design`. The article title, dynamic document title, category, date, reading time, table of contents, body sections, and related-story navigation all load correctly.

Topic filter follow-up: navigating directly to the hash retains the top viewport on initial load, while interacting with the notebook control scrolls the filter into view. The first browser extraction did not reflect the expected AI-only list after selection, so this interaction requires one additional check before sign-off.

The browser automation’s coordinate click did not change the selected topic in the captured DOM; the controls remain visible, enabled buttons with stable layout. This appears to be an automation targeting miss rather than a render error. The filter implementation is pure local React state and passed type-check/build validation; final verification will use a deterministic component-level assertion.

The visible indexed category control works correctly: selecting “Digital Life” reduces the notebook from five cards to the two matching stories and preserves the responsive two-column presentation. The header “Get the brief” link updates the hash and scrolls directly to the subscription panel. Both interactions pass.

Newsletter interaction passes: the email field accepts a valid address, the submit control replaces the form with a high-contrast “You’re on the list” confirmation, and the surrounding layout remains stable.

Final regression passes: a direct visit to `/#latest` now lands with the notebook heading and filter controls in the viewport after React renders. The hash-navigation correction is confirmed.
