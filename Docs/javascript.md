# JavaScript Modules

All custom JavaScript lives in `js/`. Every file is an **IIFE** (Immediately Invoked Function Expression) or a top-level `DOMContentLoaded` listener to avoid polluting the global scope.

---

## `header.js` — Reusable Header Component

### Purpose

Injects the full `<header>` HTML into a placeholder `<div id="site-header">` at runtime. Eliminates duplicated header markup across all 14+ pages.

### Usage

Place this in each HTML file where the header should appear:

```html
<div
  id="site-header"
  data-base=""
  data-lang="cz"
  data-cz-href="index.html"
  data-eng-href="index_eng.html"
  data-home=""
></div>
<script src="js/header.js"></script>
```

### `data-*` attributes

| Attribute       | Type              | Description                                                                                                                                  |
| --------------- | ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `data-base`     | string            | Relative path prefix from this page to the project root. `""` for root pages, `"../../"` for pages two levels deep.                          |
| `data-lang`     | `"cz"` \| `"eng"` | Language of the current page. Controls nav labels and language switcher.                                                                     |
| `data-cz-href`  | string            | Relative URL to the **Czech version** of the current page (used in the CZ/ENG toggle).                                                       |
| `data-eng-href` | string            | Relative URL to the **English version** of the current page.                                                                                 |
| `data-home`     | string            | URL of the homepage. Used for logo and nav-link anchors. `""` for root pages; `"../../index.html"` or `"../../index_eng.html"` for subpages. |

### Behaviour

- Reads the five `data-*` attributes.
- Builds nav `<li>` elements with links to `data-home + #section-id`.
- Replaces `placeholder.outerHTML` with the complete header HTML (synchronous).
- The header includes: brand logo, hamburger button, nav links, language switch, theme toggle icon.

### Generated structure

```html
<header class="bg-warning sticky-top shadow-sm header">
  <div class="container">
    <div class="header-switches">
      <!-- language switcher + theme toggle -->
    </div>
  </div>
  <div class="container">
    <nav class="navbar ...">
      <div class="navbar__brand">...</div>
      <button id="toggle-btn" class="navbar__toggle">...</button>
      <ul id="menu" class="navbar__menu navbar__menu--mobile">
        <!-- nav links -->
      </ul>
    </nav>
  </div>
</header>
```

---

## `footer.js` — Reusable Footer Component

### Purpose

Same pattern as `header.js` — injects the full `<footer>` from a lightweight placeholder. Also sets the copyright year dynamically.

### Usage

```html
<div id="site-footer" data-base="" data-lang="cz"></div>
<script src="js/footer.js"></script>
```

### `data-*` attributes

| Attribute   | Type              | Description                                            |
| ----------- | ----------------- | ------------------------------------------------------ |
| `data-base` | string            | Same as `header.js` — prefix to project root.          |
| `data-lang` | `"cz"` \| `"eng"` | Controls footer nav link language and disclaimer text. |

### Behaviour

- Injects full footer HTML via `placeholder.outerHTML`.
- After injection, locates `#footer-year` and sets its `textContent` to `new Date().getFullYear()`.
- Footer nav links use `base + 'pages/<lang>/<page>_<lang>.html'` — so paths are always correct regardless of page depth.

### Generated structure

```html
<footer class="py-4 bg-dark text-center text-white mt-5">
  <div class="container">
    <p>&copy; <span id="footer-year"></span> Hodinový Manžel</p>
    <div class="social-icons"><!-- FB, IG, LI, YT --></div>
    <div class="logo">
      <a><img src="...logo.svg" /></a>
    </div>
    <small class="text-muted"><!-- disclaimer --></small>
    <nav class="footer-nav">
      <!-- terms | privacy | copyright | imprint links -->
    </nav>
  </div>
</footer>
```

---

## `sidebar_responsive.js` — Mobile Navigation Toggle

### Purpose

Toggles the hamburger menu open/closed on mobile.

### Key behaviour

- Toggled by clicking `#toggle-btn`.
- Adds/removes `.navbar__toggle--is-open` on the button and `.navbar__menu--open` on `#menu`.
- Automatically closes the menu when any nav link is clicked.
- Guards against missing elements (`if (!toggleBtn || !menu) return;`).

### Why loaded in `<head>` with `defer`

`sidebar_responsive.js` must be parsed before `header.js` runs (which generates the toggle button and menu). Loading it `defer`red in `<head>` guarantees it is ready the moment `DOMContentLoaded` fires after header injection.

---

## `site-utils.js` — Scroll Utilities

### Purpose

Two behaviours triggered after `DOMContentLoaded`:

1. **Smooth scroll** — intercepts clicks on `.navbar__link` elements whose `href` starts with `#` and calls `element.scrollIntoView({ behavior: 'smooth' })`.

2. **Header colour on scroll** — listens to `window scroll`. When `scrollY > 50`:
   - Adds `bg-dark`, `shadow-lg` to `<header>` and removes `bg-warning`.
   - Adds `.navbar__menu--scrolled` to `#menu` (gives the mobile dropdown a grey background so it's readable against the page content).
   - Reverses all of the above when scrolling back to top.

---

## `theme-toggle.js` — Dark / Light Mode

### Purpose

Full dark mode implementation with:

- `localStorage` persistence (key: `hm_theme`).
- System preference detection via `prefers-color-scheme: dark` (first-visit default).
- Dynamic icon swap (`icon_moon2.svg` ↔ `icon_sun.svg`).
- Adjusts section background classes for sections that use static Bootstrap utility classes.
- Swaps Bootstrap carousel indicator classes for the FAQ carousel.

### LocalStorage key

```
hm_theme  →  "dark" | "light"
```

If the key is absent, the system's `prefers-color-scheme` media query is used as the default.

### applyTheme(isDark) — what it changes

| Target                                                    | Light mode           | Dark mode            |
| --------------------------------------------------------- | -------------------- | -------------------- |
| `<html>` class                                            | —                    | `dark-theme`         |
| `#themeToggle` `aria-pressed`                             | `"false"`            | `"true"`             |
| `#themeToggleIcon` `src`                                  | `Img/icon_moon2.svg` | `Img/icon_sun.svg`   |
| `#about`, `#portfolio`, `#testimonials`, `#stats`, `#faq` | `bg-light`           | `bg-dark text-white` |
| `#faqCarousel` class                                      | `carousel-dark`      | `carousel-light`     |

### Keyboard accessibility

The toggle element (`#themeToggle`) responds to both `click` and `keydown` (Enter / Space).

---

## `error_handler.js` — Offline & Runtime Error Handling

### Purpose

Handles two distinct failure modes without requiring a server.

### 1. Offline detection

- On script load: if `!navigator.onLine` → `showOfflineBanner()`.
- `window.addEventListener('offline', showOfflineBanner)`.
- `window.addEventListener('online', …)` → removes banner and reloads the page to restore any failed CDN resources.

The banner is a fixed red bar (`position: fixed; top: 0; z-index: 99999`) with a localised message (CZ/ENG detected from `window.location.pathname`).

### 2. JS runtime errors

`window.onerror` and `window.addEventListener('unhandledrejection', …)` catch unhandled exceptions. If the user is **online**, they are immediately redirected to the appropriate 500 error page. If **offline**, the offline banner is already showing, so no redirect occurs.

### Path detection logic

```js
function getPageInfo() {
  var path = window.location.pathname;
  var isEng = path.includes("/eng/") || path.includes("index_eng");
  var isSubpage = path.includes("/pages/");
  var base = isSubpage ? "../../" : "";
  return { isEng, base };
}
```

This correctly resolves `500_error_cz.html` or `500_error_eng.html` relative to either a root page or a subpage — without needing to know the exact file path at build time.

---

## `logo-anim.js` — Logo Animation

Animates the logo SVG on page load using **anime.js**. Depends on `anime.js` being loaded before it (guaranteed by the script order: `anime.iife.min.js` → `logo-anim.js`).

---

## `parallax-hero.js` — Hero Parallax

Listens to `window scroll` and translates the hero background image vertically for a parallax depth effect.

---

## `counters.js` — Animated Statistics

Uses an `IntersectionObserver` to trigger counting animations when the `#stats` section scrolls into view. Each counter element carries `data-target` with the end value.

---

## `flip-cards.js` — Service Cards Flip

Manages CSS `.flip-card--flipped` class toggling on the service cards. Click or keyboard (Enter/Space) flips the card to reveal the back face.

---

## `about-overlay.js` — About Photo Overlay

Shows a text overlay on hover / focus over the about section profile photo. Uses CSS transitions controlled by class toggling.
