# CLAUDE.md — Project Notes for heatgb

This file records what has been done to this repository so Claude (and humans) have context in future sessions.

---

## Project Overview

Static website for **Heat GB**, rebuilt from the original hosting platform and migrated to **GitHub Pages**.

- **Live site (original):** https://www.heatgb.co.uk
- **GitHub remote:** git@github.com:tarne75/heatgb-alt.git
- **Target hosting:** GitHub Pages (root of `main` branch)

---

## Initial Plan

**Full site redesign and static rebuild** from the hosted site to plain HTML/CSS/JS, ready for GitHub Pages.

### Main objectives
- Pull all images, shared assets
- Modenise the look and feel, but make sure all images are incoporated into the new updated look and feel
- No contact form — all contact is by email to `gary@heatgb.co.uk` (mailto links)
- Log all progress in CLAUDE.md automatically
- Do not "git push" but make sure all changes are committed locally, as necessary
- **All commits authored by Tarne Westcott only — never add `Co-Authored-By` or any other attribution trailers**
- No plumbing services — the business does not offer them; do not reintroduce plumbing content

### Design system
- **Colours:** Retain existing theme colours
- **Fonts:** Oswald (headings/display) + Inter (body) — loaded from Google Fonts
- **Layout:** CSS Grid + Flexbox, mobile hamburger nav, sticky header, full footer
- **No frameworks** — vanilla HTML/CSS/JS only

### Dynamic behaviour
| Feature | Approach |
|---|---|
| Contact | `mailto:gary@heatgb.co.uk` links with a pre-filled subject per button (e.g. "Powerflush booking") |
| Contact form | Removed (Formspree no longer used) |

## Completed work (session log)

### Pages built
Five static HTML pages, all with shared header, nav, footer, and `js/main.js`:
- `index.html` — homepage with hero, about strip, services grid, CTA, accreditations, areas
- `boiler-installations.html`
- `boiler-servicing.html`
- `worcester.html`
- `contact.html`

### Images
All images downloaded from original CDN (`https://www.heatgb.co.uk/wp-content/uploads/2020/11/`) and stored locally in `images/`. Script `download-images.sh` can re-fetch them if needed. Unused originals (rollovers, Gas Safe section images, spare service photos, etc.) were deleted — `images/` holds only what the pages use.

Key images in use:
| File | Used on |
|---|---|
| `main-logo.png` | header + footer (all pages) |
| `image-1.png` | homepage hero (team + vans photo) |
| `image-1-1.png` | boiler-installations — Boiler section |
| `image-2.png` | boiler-installations — Powerflushing section |
| `image-1-2.png` | boiler-servicing — Servicing section |
| `image-3-1.png` | boiler-servicing — CP12 section |
| `worester-img1.png` | worcester — main section (note: typo in original filename) |
| `worcester-icon1.png` / `worcester-icon2.png` | worcester — feature cards |
| `worcester-logo.png` | worcester — banner |
| `12year-logo.png` | worcester banner + extended guarantees section |
| `logo1.png` / `logo2..png` / `logo3.png` | accreditations (all pages) — Worcester Bosch / Gas Safe / CIPHE, each linking to its website in a new tab |
| `home-box1/2.png` | homepage service cards (2-column grid) |

### CSS (`css/style.css`)
- Design tokens: `--orange: #E8581A`, `--black: #1a1a1a`, `--mid: #666`
- Fonts: Oswald (headings) + Inter (body) from Google Fonts
- Components: `.photo-panel`, `.icon-panel`, `.worcester-cards`, `.highlight-box`, `.checklist`, `.accreditations`, `.areas-section`
- `.services-grid` is 2 columns (max-width 820px) after plumbing card removal
- Fully responsive with hamburger nav at 768px

### JavaScript (`js/main.js`)
- Mobile nav toggle

### Footer (all pages)
Redesigned to match original site: 3-column grid
1. **Left** — logo (80px) + phone numbers + address
2. **Centre** — embedded Google Map (`maps.google.com/maps?q=41+Elmroyd+Avenue...`)
3. **Right** — navigation links

### Contact (all pages)
- Topbar "Contact us today" and every CTA button link to `mailto:gary@heatgb.co.uk`
- `contact.html` shows phone, address and an "Email Us" panel (no form, no in-page map — the footer map covers it; no opening hours, as the original site lists none)
- Worcester "Get a Free Quote" button removed; no further email buttons wanted
- Address: 41 Elmroyd Avenue, Potters Bar is correct (ignore the Borehamwood address on the original contact page)

### Hero image (index.html)
Team photo inset `2rem` from edges with `border-radius:12px` and `box-shadow` to give a white-framed appearance. `hero__content` has `padding-right:4rem` to keep text clear of the image. On mobile (≤768px) the photo drops below the hero text as a normal full-colour image.

---

## Manual tasks still to do

- [x] **Download images** — run `bash download-images.sh` from the heatgb folder on your Mac
- [ ] **Push to GitHub** — `git push origin main`, then enable GitHub Pages in repo settings (Source: `main` branch, root `/`)
- [ ] **Replace homepage team photo** (`images/image-1.png`) — current van livery says "Heating & Plumbing"; Tarne to supply a new photo
- [x] **Remove Preview watermark** — done
- [ ] **Domain** — point `heatgb.co.uk` DNS to GitHub Pages (CNAME record → `tarne75.github.io`, add `CNAME` file to repo root containing `heatgb.co.uk`)

