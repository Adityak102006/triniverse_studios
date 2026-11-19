# Triniverse Studios website

A lightweight, responsive multi-page site built with plain HTML, CSS, and JavaScript. No framework, build step, external font, image CDN, or third-party script is required.

## Pages

- `index.html` — home
- `work.html` — projects
- `about.html` — studio story
- `novel.html` — novel in development and notification signup
- `team.html` — board of directors and team
- `contact.html` — studio contact and inquiry form
- `terms.html` — contact, hiring, freelance, and project-enquiry terms
- `privacy.html` — privacy notice and DPDP requests

Shared code is in `css/style.css` and `js/main.js`; the favicon and locally hosted, subset display, body, and calligraphy fonts are in `assets/`. Their SIL Open Font Licenses are included beside the font files.

## Where to edit

- Page copy and page-specific sections: the matching `.html` file.
- Colors, layout, typography, and responsive behavior: `css/style.css`, grouped by component.
- Navigation, scroll reveals, and form handling: `js/main.js`.
- Images, icons, and fonts: `assets/`.

The header and footer are repeated in each HTML page to keep this a build-free static site. When changing either, make the same update on every page. Source files use two-space indentation; to reformat them, run `npx prettier --write '*.html' css/style.css js/main.js README.md` (this adds no runtime dependency).

## Before publishing

1. Replace bracketed text such as `[Name]`, `[Role]`, legal-identity placeholders, and project placeholders with verified studio information. Remove entries that do not apply.
2. The studio email is set to `theart.illeryuniverse@gmail.com`; the operator is named as Suryansh Srivastava, based in Lucknow, Uttar Pradesh. Confirm whether the locality-only address needs a fuller postal address or entity details. Match stated retention to the actual inbox and Web3Forms settings, then have an Indian-qualified lawyer review both pages before publication.
3. Create a Web3Forms form/access key, then replace `YOUR_WEB3FORMS_ACCESS_KEY` in `js/main.js`. The key is intentionally a placeholder: forms do not submit until configured. Verify its allowed-domain, retention, processor, and spam-filter settings against the Privacy Notice before collecting data.
4. Replace every `YOUR-DOMAIN.example` in `sitemap.xml` with the official HTTPS domain before submitting the sitemap to search engines. Add canonical and full Open Graph URL tags after the final deployment URL is known. `robots.txt` currently allows crawling and does not advertise the placeholder sitemap.
5. Add real, licensed project artwork and update the related alt text when image assets are supplied. Current artwork is made from CSS shapes.
6. Confirm the studio's exact Lucknow address and contact details before adding them to search listings or structured data.

## Run locally

Open `index.html` directly, or serve the folder with any static web server. All page and asset links are relative.
