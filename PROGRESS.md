# Project Progress

Last updated: 2026-10-06

## Completed

- [x] Product and design brief (`PROJECT_BRIEF.md`).
- [x] Next.js 16 App Router site: Home, Cruises, Experience, About, Contact, Book, 404.
- [x] Rebrand from placeholder "Noura" to the real **Alishba Cruises** identity, verified content and pricing.
- [x] Alishba design tokens (teal / burnt orange / slate), EB Garamond + Inter self-hosted via Fontsource.
- [x] Official logo + light (dark-surface) logo variant, favicon and Apple touch icon from the brand mark.
- [x] Real Costa and Royale photography; optimized JPG versions of the atmospheric artwork; 1200×630 OG image.
- [x] Home: hero, intro, fleet cards (Costa/Royale with adult + child prices), route, onboard experience, celebrations & private events, FAQ, final CTA.
- [x] Booking flow (cruise → date/seating → guests → details) with live price calculation, `?cruise=royale` deep links, step focus management and validation.
- [x] Booking hand-off: prefilled WhatsApp message (or email) to the Alishba team — no payment taken online.
- [x] Contact form hands off to email with WhatsApp fallback; clickable phone/email.
- [x] Floating WhatsApp button (appears after scroll, hidden on /book).
- [x] SEO: per-page metadata + canonicals, Open Graph/Twitter, JSON-LD graph (Organization, TouristTrip offers for both cruises, FAQPage), sitemap.xml, robots.txt.
- [x] Accessibility: skip link, aria-current nav, radio-group semantics, Escape/scroll-lock mobile menu, AA contrast tokens, reduced-motion support.

## Verification (2026-10-06)

- [x] `npm run lint` (tsc) — no errors.
- [x] `next build` — all routes compile; `/book` dynamic (reads `?cruise=`), everything else static.
- [x] Desktop (1440) and mobile (390) screenshots of every page, no horizontal overflow.
- [x] Scripted booking test: preselect Royale → date → deck → guests (AED 750 for 3 adults + 1 child) → validation → WhatsApp message content.

## Housekeeping

- `public/images/dhow-marina-hero.png` and `dhow-dining-deck.png` are no longer referenced (replaced by `marina-dhow.jpg` / `dining-deck.jpg`) and can be deleted.
- `dining-deck.jpg` / `marina-dhow.jpg` are AI-generated atmosphere images — swap for real Alishba deck/dining photos when available.

## Future backend phase

- [ ] Live availability and capacity per sailing/deck.
- [ ] Online payment (UAE-compatible gateway) and promo codes.
- [ ] Transactional email / WhatsApp Business API confirmations.
- [ ] Operator dashboard for bookings, manifests and exports.
- [ ] Analytics, consent management and monitoring.

## Resume note

Read `PROJECT_BRIEF.md`, this file and `lib/site.ts`, then `npm install` and `npm run build`.
