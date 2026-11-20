# Triniverse Studios Website

The official website for **Triniverse Studios**, a Lucknow-based animation studio creating original animated series and stories.

## Overview

A lightweight, responsive multi-page site built with plain HTML, CSS, and JavaScript — no framework, build step, external font CDN, image CDN, or third-party scripts required. All assets are self-hosted.

### Pages

| Page | Description |
|------|-------------|
| `/` (index) | Studio home — hero, work preview, studio intro, CTA |
| `/work/` | Projects in development (placeholder cards) |
| `/about/` | Studio story, creative philosophy, values |
| `/novel/` | *Fight for the Astras* — Volume 1 prologue with chapter reader dialog |
| `/team/` | Board of directors and studio team |
| `/contact/` | Contact form, email, location, legal summary |
| `/privacy/` | Privacy notice (DPDP Act 2023 compliant) |
| `/terms/` | Contact & work enquiry terms |

### Assets

- **Fonts** (self-hosted, `assets/fonts/`): Cormorant Garamond, Manrope, Triniverse Script (SIL OFL licensed)
- **Images** (`assets/images/`): Novel cover, chapter illustrations (Brahmastra, Rakshasas)
- **Favicon**: SVG (`assets/favicon.svg`)

## Tech Stack

- **HTML** — Semantic, accessible markup; directory-based routing (`page/index.html`)
- **CSS** — Custom properties, fluid typography (`clamp()`), CSS Grid/Flexbox, `@font-face`, `@media (prefers-reduced-motion)`
- **JS** — Vanilla: mobile nav, scroll reveals (`IntersectionObserver`), `<dialog>` chapter reader, Web3Forms submission

## Project Structure

```
├── index.html
├── css/style.css
├── js/main.js
├── assets/
│   ├── favicon.svg
│   ├── images/
│   │   ├── coverpage.jpeg
│   │   ├── brahmastra.jpeg
│   │   └── Rakhshasa.jpeg
│   └── fonts/
│       ├── cormorant-garamond.woff2
│       ├── manrope.woff2
│       └── triniverse-script.woff2
├── about/index.html
├── work/index.html
├── novel/index.html
├── team/index.html
├── contact/index.html
├── privacy/index.html
├── terms/index.html
├── sitemap.xml
├── robots.txt
└── README.md
```

## Local Development

Open `index.html` directly in a browser, or serve with any static server:

```bash
npx serve .
# or
python -m http.server
# or
php -S localhost:8000
```

All links and asset paths are relative — no configuration needed.

## Configuration Required Before Launch

1. **Web3Forms** — Replace `YOUR_WEB3FORMS_ACCESS_KEY` in `js/main.js` with a valid key
2. **Domain** — Update `sitemap.xml` and add canonical/OG URLs once the production domain is known
3. **Content** — Replace all bracketed placeholders (`[Series title]`, `[Team member name]`, etc.) with verified information
4. **Legal** — Confirm operator details, postal address, and retention policies; have an Indian-qualified lawyer review `/privacy/` and `/terms/`
5. **Artwork** — Swap CSS-shape placeholders for licensed project artwork with proper alt text

## Deployment

Deployed in Vercel

---

*Triniverse Studios — Stories from Lucknow, India.*
