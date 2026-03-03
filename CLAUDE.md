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
- Replace all dynamic form behviour with Formspree `https://formspree.io/f/xwvndkow`
- Log all progress in CLAUDE.md automatically
- Do not "git push" but make sure all changes are committed locally, as necessary

### Design system
- **Colours:** Retain existing theme colours
- **Fonts:** Oswald (headings/display) + Inter (body) — loaded from Google Fonts
- **Layout:** CSS Grid + Flexbox, mobile hamburger nav, sticky header, full footer
- **No frameworks** — vanilla HTML/CSS/JS only

### Dynamic behaviour
| Feature | Approach |
|---|---|
| Contact form | Formspree `https://formspree.io/f/xwvndkow` |
| Spam protection | Honeypot `_gotcha` field on both forms |
| Form submission | AJAX via `setupFormspree()` in `main.js` — no page reload |

## Must check
- Images all fit and render correctly
— Favicon / icons (add a full favicon set to all pages so the site has a browser tab icon)

## Manual tasks post re-design and clone

- [ ] **Download images** - if not already done
- [ ] **Push to GitHub** — `git push origin main`, then enable GitHub Pages in repo settings (Source: `main` branch, root `/`)
- [ ] **Domain** — point `karatekidshemel.co.uk` DNS to GitHub Pages (CNAME record to `tarne75.github.io`, add `CNAME` file to repo root containing `karatekidshemel.co.uk`)

