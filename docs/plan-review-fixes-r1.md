# Plan: fixes from adversarial review round 1 (2026-11-24)

Two fresh reviewers (visitor experience; correctness and safety) reviewed the live site. Findings
below were verified before fixing. The user chose to fix High, Medium and Low, and confirmed:
all three coaches are still in training (no ACC yet); clients may decline recording and still have
the session; delete docs/design-pricing-validation.md (git history keeps it; not rewriting history).

## Fixes

High
1. `src/composables/useTheme.js`: guard every localStorage call (blocked storage blanked the site).
2. Credentials and confidentiality wording, all three languages:
   - "3 位專業教練" → "3 位教練"; ACC badge says "in training", PCC "after ACC" goal.
   - Agreement: recording only with consent and optional; confidentiality states the one exception
     (recordings for ICF review with consent) instead of an absolute guarantee; drop "ICF professional coaches".
   - FAQ and privacy page say the same, plus "declining recording is fine".

Medium
3. `public/.nojekyll` so GitHub Pages never drops `_`-prefixed build files.
4. Online vs in person: agreement and process step say "mainly online", matching the FAQ.
5. Heading font weight (~0.9 MB of Noto Serif TC slices on first visit): measured, not changed —
   the real fix (self-hosted subset or system serif) changes the chosen design or adds a tool; left
   for the user to decide.
6. Recording note next to the profile booking card.

Low
7. Services: title drops "方案"; coach section subtitle says to press the booking button (en typo fixed).
8. Coach tabs: localized short names (阿哲 in zh), fit 320px.
9. Profile heading: Chinese name first in zh, English first in en, matching cards.
10. Accessibility: focus ring in navy (contrast), language buttons with full names and pressed state,
    named `<nav>` landmarks.
11. `/about` legacy URL gets its own HTML (preview of Isaac's page); `/index.html` redirects to `/`.
12. Privacy page: emails sent straight to a coach go to that coach.
13. `scripts/page-meta.js` also rejects `|` in preview text.
14. Delete `docs/design-pricing-validation.md`.
15. Remove unused `about.title/intro/bio_title/bio_content` keys (bio_content called the coach a
    "professional coach"; nothing renders them).

Not changed: testimonial labels (need client consent), "Coach Isaac" brand (owner decision),
new-tab announcement on booking links, agreement icons keyed by index (commented in place).

## Acceptance
- Build passes; every page renders in three languages without console errors (except the expected
  local Cloudflare CORS error).
- No remaining text implies an ACC credential or absolute confidentiality (git grep check).
- 320px coach tabs on one line; focus ring visible; storage-blocked load still renders (code review).
- Round 2 adversarial review (fresh reviewers) verifies these fixes and finds no Blocker/High.
