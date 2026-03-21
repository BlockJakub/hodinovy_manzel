# Architecture

## Overview

Hodinový Manžel is a **zero-build static website** — no bundler, no framework, no npm. Every page is a plain HTML file served directly by GitHub Pages. JavaScript and CSS are loaded via CDN and direct `<script>`/`<link>` tags.

---

## Page Inventory

### Root pages

| File             | Language | Purpose                                                                                                      |
| ---------------- | -------- | ------------------------------------------------------------------------------------------------------------ |
| `index.html`     | CZ       | Czech homepage — main entry point                                                                            |
| `index_eng.html` | ENG      | English homepage                                                                                             |
| `404.html`       | —        | GitHub Pages 404 hook; instantly redirects to `pages/cz/404_error_cz.html` via `<meta http-equiv="refresh">` |

### `pages/cz/` — Czech subpages

| File                | Purpose                                       |
| ------------------- | --------------------------------------------- |
| `404_error_cz.html` | Custom 404 error page                         |
| `500_error_cz.html` | Custom 500 / JS error page                    |
| `terms_cz.html`     | Terms and conditions                          |
| `privacy_cz.html`   | Privacy policy (GDPR)                         |
| `copyright_cz.html` | Copyright notice                              |
| `imprint_cz.html`   | Imprint / contact details (legal requirement) |

### `pages/eng/` — English subpages

| File                 | Purpose                    |
| -------------------- | -------------------------- |
| `404_error_eng.html` | Custom 404 error page      |
| `500_error_eng.html` | Custom 500 / JS error page |
| `terms_eng.html`     | Terms and conditions       |
| `privacy_eng.html`   | Privacy policy             |
| `copyright_eng.html` | Copyright notice           |
| `imprint_eng.html`   | Imprint / contact details  |

---

## Homepage Sections

Both `index.html` and `index_eng.html` share the same one-page layout:

| Section ID      | Element     | Content                                                     |
| --------------- | ----------- | ----------------------------------------------------------- |
| `#hero`         | `<section>` | Full-viewport hero with parallax background and CTA buttons |
| `#faq`          | `<section>` | Bootstrap carousel with frequently asked questions          |
| `#services`     | `<section>` | Service cards (flip cards)                                  |
| `#about`        | `<section>` | About the person — photo, bio, social links                 |
| `#portfolio`    | `<section>` | Portfolio image grid with overlay                           |
| `#testimonials` | `<section>` | Client testimonials carousel                                |
| `#stats`        | `<div>`     | Animated counter blocks                                     |
| `#contact`      | `<section>` | Contact buttons (phone, WhatsApp, email)                    |

Navigation anchors in the header link to these IDs. When navigating from a subpage, the links resolve to `../../index.html#services` (or the English equivalent).

---

## Dependency Graph

```
Browser
 ├── Bootstrap 5.3.2 CSS          (CDN)
 ├── Bootstrap Icons 1.10.5       (CDN)
 ├── Adobe Typekit font            (CDN — jhv2lht for CZ, lft2pcd for ENG)
 ├── css/style.css                 (light theme base)
 ├── css/style_dark.css            (dark theme overrides only)
 │
 ├── Bootstrap 5.3.2 JS bundle    (CDN — includes Popper)
 ├── js/sidebar_responsive.js     (loaded in <head> via defer — needed before header.js)
 │
 ├── js/header.js                  (replaces #site-header div synchronously)
 ├── js/footer.js                  (replaces #site-footer div synchronously)
 │
 ├── js/site-utils.js              (scroll listener, smooth-scroll anchors)
 ├── js/theme-toggle.js            (dark mode toggle + localStorage)
 ├── js/error_handler.js           (offline banner + JS error redirect)
 │
 └── [Homepage only]
     ├── anime.js                   (CDN — deferred)
     ├── js/logo-anim.js
     ├── js/about-overlay.js
     ├── js/parallax-hero.js
     ├── js/counters.js
     └── js/flip-cards.js
```

---

## Script Loading per Page Type

### Homepage (`index.html`, `index_eng.html`)

```html
<!-- In <head> -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
<script defer src="js/sidebar_responsive.js"></script>

<!-- After header placeholder -->
<script src="js/header.js"></script>

<!-- After footer placeholder -->
<script src="js/footer.js"></script>

<!-- Bottom of <body> — deferred animations -->
<script
  defer
  src="https://cdn.jsdelivr.net/npm/animejs/lib/anime.iife.min.js"
></script>
<script defer src="js/logo-anim.js"></script>
<script defer src="js/about-overlay.js"></script>
<script defer src="js/parallax-hero.js"></script>
<script defer src="js/counters.js"></script>
<script defer src="js/flip-cards.js"></script>
<script defer src="js/site-utils.js"></script>
<script defer src="js/theme-toggle.js"></script>
<script defer src="js/error_handler.js"></script>
```

### Subpages (`pages/cz/*.html`, `pages/eng/*.html`)

```html
<!-- In <head> (paths relative to subpage depth ../../) -->
<script src="../../js/sidebar_responsive.js" defer></script>

<!-- After header / footer placeholders -->
<script src="../../js/header.js"></script>
<script src="../../js/footer.js"></script>

<!-- Bottom of <body> -->
<script defer src="../../js/site-utils.js"></script>
<script defer src="../../js/theme-toggle.js"></script>
<script defer src="../../js/error_handler.js"></script>
```

> Subpages intentionally do **not** load `anime.js`, `logo-anim.js`, `parallax-hero.js` etc., because those animations only exist on the homepage.

---

## Path Convention

All subpages live exactly **two levels deep** (`pages/<lang>/<file>.html`). This means:

| Resource          | Root page path             | Subpage path               |
| ----------------- | -------------------------- | -------------------------- |
| CSS               | `css/style.css`            | `../../css/style.css`      |
| JS                | `js/header.js`             | `../../js/header.js`       |
| Images            | `Img/logo.svg`             | `../../Img/logo.svg`       |
| Other CZ subpage  | `pages/cz/terms_cz.html`   | `terms_cz.html` (same dir) |
| Other ENG subpage | `pages/eng/terms_eng.html` | `../eng/terms_eng.html`    |

The `data-base` attribute on `#site-header` and `#site-footer` carries the correct relative prefix (`""` for root, `"../../"` for subpages) so that `header.js` and `footer.js` can build correct asset URLs at runtime.
