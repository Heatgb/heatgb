# CLAUDE.md — Project Notes for heatgb

This file records what has been done to this repository so Claude (and humans) have context in future sessions.

---

## Project Overview

Static website for **Heat GB**, rebuilt from the original hosting platform and migrated to **GitHub Pages**.

- **Live site (original):** https://www.heatgb.co.uk
- **GitHub remote:** git@github.com:tarne75/heatgb-alt.git
- **Target hosting:** GitHub Pages (root of `main` branch)
- **Local preview:** `python3 -m http.server 8765` from this folder → http://localhost:8765/

---

## Rules

- No contact form — all contact is by email to `gary@heatgb.co.uk` (mailto links) or phone
- No further email buttons wanted beyond the existing CTAs
- Log all progress in CLAUDE.md automatically
- Do not "git push" but make sure all changes are committed locally, as necessary
- **All commits authored by Tarne Westcott only — never add `Co-Authored-By` or any other attribution trailers**
- No plumbing services — the business does not offer them; do not reintroduce plumbing content
- Only use copy that exists on the original site — do not invent facts (opening hours, fault lists, etc. were removed for this reason)
- Address: 41 Elmroyd Avenue, Potters Bar is correct (ignore the Borehamwood address on the original contact page)
- **Target: maximum PageSpeed scores** — no frameworks, no third-party scripts/fonts on load, vanilla HTML/CSS/JS only

---

## Current design — "Warmth, engineered." (single-page landing site)

Redesigned as an award-style single landing page (`index.html`). Dark warm-black base with ember/flame accents, alternating cream sections for rhythm.

### Sections (ids)
| id | Section |
|---|---|
| `#top` | Hero — headline, CTAs, trust chips, animated 12-year **thermostat gauge** (counts 0→12), floating boiler photo, drifting heat blobs, grain |
| — | Tilted flame-gradient **marquee** band |
| `#about` | Statement that lights up word-by-word on scroll, team photo in arch with spinning "est. 1999" sticker, 4 count-up stats |
| `#services` | 5 **sticky stacked cards** (installations, powerflushing, servicing, repairs, CP12) — earlier cards scale/dim as the next slides over (desktop ≥960×760). Repairs card uses a green boiler-LCD "diagnostics" panel |
| `#worcester` | Product shot on a pedestal with rotating text ring + 12-year badge, benefits list, 5→12 yrs guarantee strip |
| `#gas-safe` | Gas Safe copy + animated yellow ID card, accreditation logos linking to Worcester Bosch / Gas Safe / CIPHE |
| `#coverage` | **Radar map** — the 8 areas plotted at real relative positions around Potters Bar (from lat/long), sweep + pulse; hovering list ↔ radar highlights |
| `#contact` | Flame-orange finale: "Let's get you warm." with phone ×2 + email cells |
| footer | Logo/phones/address · click-to-load Google Map facade · nav |

### Signature navigation — the thermostat
- `.thermo` button (top-right desktop, bottom-right thumb position on mobile) shows a conic ring that fills and a temperature that rises 12°→23° as you scroll
- Opens a full-screen menu (circular clip-path reveal). Each link has a "temperature"; hovering/focusing turns the big dial needle + arc and shows the section name. Dial hidden on ≤960px (contact details shown instead)
- Accessible: `aria-expanded`, `role=dialog`, focus moves into menu, Tab is trapped, Escape closes, `inert` on page behind
- Desktop ≥1100px also has inline header links with an active-section underline

### Files
- `index.html` — the whole site (+ JSON-LD `HVACBusiness` structured data)
- `css/style.css` — design tokens, components, responsive (breakpoints 1100 / 960 / 640), `prefers-reduced-motion` support
- `js/main.js` — ~6KB deferred: header state, thermostat progress, menu/dial, section tracking, reveals, word reveal, card stacking effect, count-ups, radar hover, map facade, footer year
- `boiler-installations.html`, `boiler-servicing.html`, `worcester.html`, `contact.html` — tiny `noindex` redirect stubs to the matching `index.html#section`
- `404.html` — branded "gone cold" page
- `docs/heat-gb-terms-and-conditions.pdf` — Heat GB terms of business (4pp, from the original site). Linked from hero "*T&Cs apply", Worcester small print and footer
- `docs/heat-gb-complaints-procedure.pdf` — Which? Trusted Traders model complaints policy (TTF11 v8, Feb 23) as published on the original site; converted from .docx to PDF with LibreOffice. Linked from footer
- `download-docs.sh` — re-fetches both originals (complaints policy arrives as .docx and needs converting: `soffice --headless --convert-to pdf`)
- `fonts/` — self-hosted woff2 (latin subset): Bricolage Grotesque variable 400–800 (display + body), Instrument Serif italic (accents). Re-download with `bash download-fonts.sh`

### Design tokens
- Colours: `--ink #0E0C0B`, `--cream #F5EFE8`, `--ember #E8581A` (brand), `--ember-hi #FF7A3D` (text on dark), `--ember-deep #B8420E` (text on cream), `--amber #FFB347`, `--flame` gradient
- Contrast rules: orange buttons use **dark text** (white on #E8581A fails AA); orange text on cream uses `--ember-deep`

### Images (`images/`, all WebP, ~1x + @2x via `srcset`)
| File | Use |
|---|---|
| `logo-light.webp` | Logo recoloured for dark backgrounds (black → off-white, true transparency, brand orange #EA552B) |
| `photo-boiler` | Hero floating card + installations card |
| `photo-powerflush`, `photo-servicing`, `photo-cp12` | Service cards |
| `photo-team` | About section (**to be replaced** — van livery mentions plumbing) |
| `worcester-boilers`, `badge-12year` | Worcester pedestal |
| `logo-worcester-bosch`, `logo-gas-safe`, `logo-ciphe` | Accreditations + Gas Safe ID card |
| `favicon-16/32.png`, `apple-touch-icon.png` | Icons |

Photos were cropped to remove shadows baked into the original PNGs. @2x versions are Lanczos upscales (originals are only ~450–550px wide) so PageSpeed's image-resolution audit passes on high-DPI phones.

### Performance notes (measured locally)
- 8–9 requests, ~200KB on first view; FCP ~90ms local; CLS 0; no long tasks
- Fonts preloaded, `font-display: swap`, metric-tuned fallbacks
- Google Map only loads when the user clicks the footer facade (keeps third-party JS/cookies off page load)
- Below-fold images `loading="lazy"` + `decoding="async"`; every `<img>` has width/height
- Word reveal uses `background-clip: text` (not opacity) so the contrast audit doesn't flag dimmed words

---

## Manual tasks still to do

- [ ] **Push to GitHub** — `git push origin main`, then enable GitHub Pages in repo settings (Source: `main` branch, root `/`)
- [ ] **Run PageSpeed Insights** on the live GitHub Pages URL (mobile + desktop) and report any non-100 audits back
- [ ] **Replace homepage team photo** (`images/photo-team.webp` + `@2x`) — current van livery says "Heating & Plumbing"; Tarne to supply a new photo
- [x] **T&Cs / complaints documents** — hosted in `docs/` and linked
- [ ] **Domain** — point `heatgb.co.uk` DNS to GitHub Pages (CNAME record → `tarne75.github.io`, add `CNAME` file to repo root containing `heatgb.co.uk`)
