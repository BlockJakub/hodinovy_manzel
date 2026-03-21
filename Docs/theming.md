# Theming & CSS

## Files

| File                 | Purpose                                                                    |
| -------------------- | -------------------------------------------------------------------------- |
| `css/style.css`      | Base stylesheet — layout, components, light theme tokens, responsive rules |
| `css/style_dark.css` | Dark theme overrides only — activated via `:root.dark-theme`               |

Both files are linked in every HTML page:

```html
<link rel="stylesheet" href="css/style.css" />
<link rel="stylesheet" href="css/style_dark.css" />
```

---

## Design System — CSS Custom Properties

All colour and shadow values are defined as CSS variables on `:root`. The dark theme overrides them in `:root.dark-theme`.

### Light theme (default) — `style.css`

```css
:root {
  --color-primary: #0d6efd;
  --color-warning: #ffc107;
  --muted: #6c757d;
  --border-muted: #6c757d;

  /* Backgrounds */
  --bg: #f8f9fa;
  --surface: #ffffff;
  --surface_light: #f6f7fb;

  /* Text */
  --text: #212529;
  --text_dark: #0d2b3a;
  --muted-text: #6c757d;

  /* Shadows (neumorphism) */
  --shadow-light: #ffffffe6;
  --shadow-dark: #0f172a14;
  --neumo-offset: 8px;

  /* Cards */
  --card-gradient: linear-gradient(135deg, #0d6efd0f, #0dcaf008);
  --card-surface-elev: #f6f7fb;
  --card-back-bg: var(--surface);
  --card-back-color: #0b2a3a;
  --card-back-border: rgba(0, 0, 0, 0.06);
  --flip-card-canvas: transparent;
}
```

### Dark theme overrides — `style_dark.css`

Activated when `<html class="dark-theme">` is set by `theme-toggle.js`:

```css
:root.dark-theme {
  --bg: #181c22;
  --surface: #23272f;
  --surface_dark: #23272f;
  --muted-text: #b0b8c1;
  --shadow-light: #ffffff08;
  --shadow-dark: #00000099;
  --neumo-offset: 6px;
  --border-muted: #444a57;

  /* Cards */
  --card-gradient: linear-gradient(
    135deg,
    rgba(0, 0, 0, 0.28),
    rgba(0, 0, 0, 0.12)
  );
  --card-surface-elev: #2b313b;
  --card-back-bg: #313846;
  --card-back-color: #e8eef5;
  --card-back-border: #3a4150;
  --flip-card-canvas: #23272f;
  --heading-color: #e8eef5;
}
```

---

## Dark Mode Activation

### CSS side

All dark overrides use the `:root.dark-theme` parent selector:

```css
:root.dark-theme body {
  background-color: var(--bg);
}
:root.dark-theme .navbar__menu--scrolled {
  background-color: var(--surface);
}
```

### JavaScript side

`theme-toggle.js` does two things:

1. Toggles `document.documentElement.classList.toggle('dark-theme')`.
2. Manually swaps Bootstrap utility classes on sections that use hardcoded `bg-light` / `bg-dark` (because Bootstrap utility classes are not affected by CSS variable reassignment alone).

See [javascript.md](javascript.md#theme-togglejs--dark--light-mode) for the full list.

---

## Neumorphism

The soft shadow / raised-surface effect is achieved with paired `box-shadow` values using `--shadow-light` and `--shadow-dark`:

```css
box-shadow:
  0 4px 24px 0 rgba(0, 0, 0, 0.1),
  0 1.5px 6px 0 var(--shadow-light);
```

The dark theme reduces `--neumo-offset` from `8px` to `6px` to keep shadows subtle on darker backgrounds.

---

## Navbar Scroll Behaviour

The header starts with a yellow (`bg-warning`) background. After scrolling 50px, `site-utils.js` swaps it to dark:

| State           | `<header>` classes  | `#menu` classes          |
| --------------- | ------------------- | ------------------------ |
| At top          | `bg-warning`        | —                        |
| Scrolled > 50px | `bg-dark shadow-lg` | `navbar__menu--scrolled` |

`.navbar__menu--scrolled` is defined in `style.css` (light surface) and overridden in `style_dark.css` (dark surface), so it adapts to whatever theme is active.

### Mobile dropdown background

The mobile nav menu (`#menu.navbar__menu--mobile`) is transparent by default — it appears as an overlay. The `.navbar__menu--scrolled` class gives it a background colour only after scroll, so the dropdown is always readable:

```css
/* style.css */
.navbar__menu--mobile {
  background-color: transparent;
}
.navbar__menu--scrolled {
  background-color: var(--surface, var(--surface_light, #767575));
}

/* style_dark.css */
:root.dark-theme .navbar__menu--scrolled {
  background-color: var(--surface, #3a3a3a);
}
```

---

## Bootstrap Integration

Bootstrap 5.3.2 provides the grid, utility classes, and interactive components (carousel, tooltips, modals). Custom CSS extends and overrides Bootstrap where needed — never patches Bootstrap source files.

Key Bootstrap components in use:

| Component  | Where used                                                 |
| ---------- | ---------------------------------------------------------- |
| `navbar`   | Header — extended with custom CSS for neumorphic style     |
| `carousel` | FAQ section, Testimonials section                          |
| `card`     | Service cards (CSS 3D flip overrides Bootstrap card)       |
| `modal`    | (Present in Bootstrap bundle, not actively used in markup) |
| `tooltip`  | Buttons in contact section                                 |

### Carousel dark/light mode

Bootstrap's `.carousel-dark` class makes indicators and controls dark-coloured (for light backgrounds). `.carousel-light` (custom) keeps them light (for dark backgrounds).

`theme-toggle.js` swaps these classes on `#faqCarousel` when the theme changes. The testimonials carousel is not affected as it stays on a `.bg-warning` background in both modes.

---

## Responsive Breakpoints

Bootstrap's standard breakpoints are used throughout:

| Breakpoint | Width    | Notes                                                   |
| ---------- | -------- | ------------------------------------------------------- |
| xs         | < 576px  | Default — mobile first                                  |
| sm         | ≥ 576px  | —                                                       |
| md         | ≥ 768px  | —                                                       |
| lg         | ≥ 992px  | `navbar-expand-lg` — mobile menu switches to horizontal |
| xl         | ≥ 1200px | —                                                       |
| xxl        | ≥ 1400px | —                                                       |

The custom breakpoint for the desktop navbar background is `min-width: 769px` in `style.css`.

---

## Images & Assets (`Img/`)

| File                                | Usage                                             |
| ----------------------------------- | ------------------------------------------------- |
| `logo_handy_man_transbg.svg`        | Header logo, footer logo                          |
| `logo_handy_man.jpg`                | Fallback / print                                  |
| `icon_moon2.svg`                    | Theme toggle icon — light mode (click to go dark) |
| `icon_sun.svg`                      | Theme toggle icon — dark mode (click to go light) |
| `icon-moon.svg`                     | Legacy — not actively used                        |
| `favicon-16x16.png`                 | Browser tab favicon                               |
| `snowboarder.jpg`                   | About section profile photo                       |
| `Firefly_bakingPizza.jpg`           | Portfolio image                                   |
| `Firefly_modern_home_interior.jpg`  | Portfolio / hero background                       |
| `Firefly_professional_handyman.jpg` | Portfolio / hero background                       |
| `furniture.jpg`                     | Portfolio image                                   |
| `plumbers.jpg`                      | Portfolio image                                   |
| `interiorfix.jpg`                   | Portfolio image                                   |
