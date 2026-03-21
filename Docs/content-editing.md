# Content Editing Guide

This document explains how to update the website content without breaking the structure or functionality.

---

## Editing the Homepage Text

Both homepages live at the project root:

| File             | Language |
| ---------------- | -------- |
| `index.html`     | Czech    |
| `index_eng.html` | English  |

### Hero section (`#hero`)

Change the headline and CTA buttons:

```html
<section id="hero" ...>
  ...
  <h1 class="display-4 fw-bold">Your headline here</h1>
  <p class="lead">Your subheading here</p>
  <a href="#services" class="btn btn-outline-light btn-lg hero_btn"
    >Naše služby</a
  >
  ...
</section>
```

The WhatsApp link is in the hero — update the phone number and message template if it changes:

```html
<a
  href="https://wa.me/420603861311?text=Zdravím%2C%20mám%20zájem%20o%20služby"
  ...
></a>
```

---

## Services Section (`#services`)

Each service is a flip card. The front face has the icon and title; the back has the description.

```html
<div class="flip-card">
  <div class="flip-card-inner">
    <div class="flip-card-front">
      <i class="bi bi-tools fs-1"></i>
      <h5>Název služby</h5>
    </div>
    <div class="flip-card-back">
      <p>Popis služby...</p>
    </div>
  </div>
</div>
```

To add a new service, copy an existing `.flip-card` block and update the icon (Bootstrap Icons class), title, and description. Icons are available at [icons.getbootstrap.com](https://icons.getbootstrap.com/).

---

## About Section (`#about`)

Update these elements in the `#about` section:

| Element                           | What to change                                                  |
| --------------------------------- | --------------------------------------------------------------- |
| `<img src="Img/snowboarder.jpg">` | Profile photo — replace file in `Img/` and update `src` + `alt` |
| Bio paragraph `<p>`               | Personal description text                                       |
| Social links `<a href="...">`     | Facebook, Instagram, LinkedIn, YouTube URLs                     |

---

## Portfolio Section (`#portfolio`)

Each portfolio item is:

```html
<div class="portfolio-item">
  <img
    src="Img/yourimage.jpg"
    alt="Description"
    class="img-fluid w-100"
    loading="lazy"
  />
  <div class="overlay">
    <h5>Project title</h5>
    <p>Short description</p>
  </div>
</div>
```

Place new images in `Img/` before referencing them. Always include a descriptive `alt` attribute and keep `loading="lazy"`.

---

## Testimonials Section (`#testimonials`)

Testimonials are Bootstrap carousel slides. Each slide:

```html
<div class="carousel-item">
  <blockquote class="blockquote text-center">
    <p class="mb-4">"Client testimonial text."</p>
    <footer class="blockquote-footer">
      <strong>Client Name</strong>, Location
    </footer>
  </blockquote>
</div>
```

The first slide must have `class="carousel-item active"`.

---

## FAQ Section (`#faq`)

FAQ items are Bootstrap carousel slides, same pattern as testimonials:

```html
<div class="carousel-item">
  <h5>Otázka?</h5>
  <p>Odpověď na otázku.</p>
</div>
```

---

## Stats Section (`#stats`)

Each counter element uses a `data-target` attribute:

```html
<div class="counter" data-target="150">0</div>
<p>Spokojených zákazníků</p>
```

Change the `data-target` number to update the counter end value.

---

## Contact Section (`#contact`)

Update the phone number and email in two places per homepage (the contact section and the hero call-to-action):

```html
<a href="tel:+420603861311">+420 603 861 311</a>
<a href="mailto:info@hodinovymanzel.cz">Email</a>
```

---

## Adding a New Image

1. Copy the image file into `Img/`.
2. Recommended formats: `.jpg` for photos, `.svg` for icons and logos, `.webp` for optimised photos.
3. Reference it as `Img/yourfile.jpg` from root pages, or `../../Img/yourfile.jpg` from subpages.
4. Always include `alt="description"` and `loading="lazy"` on non-critical images.

---

## Updating Legal Pages

Legal pages are in `pages/cz/` and `pages/eng/`. They share the same structure:

```
header (injected by header.js)
  <main> / <div class="container py-5" id="main-content">
    <h1>Page title</h1>
    <p>Content...</p>
  </div>
footer (injected by footer.js)
```

Edit only the content between the `#main-content` div and the `#site-footer` div. Do not modify the `<head>`, the `#site-header` div, or the script tags at the bottom.

**Parallel editing:** If you update a Czech legal page, update its English counterpart in `pages/eng/` as well.

---

## Adding a New Page

If you need a new page (e.g. a blog post or a new subpage):

1. Copy the closest existing subpage as a template (e.g. `pages/cz/privacy_cz.html`).
2. Update `data-cz-href`, `data-eng-href`, `data-home` on `#site-header`.
3. Keep `data-base="../../"` (subpage depth is fixed at two levels).
4. Add the content inside `#main-content`.
5. Link to it from the footer (`footer.js`) or from homepage navigation if needed.
6. Create an English counterpart in `pages/eng/` with `data-lang="eng"`.

---

## Updating the Header Navigation

Navigation items are hardcoded in `js/header.js`. To add, remove, or rename a nav item, edit the `navItems` arrays:

```js
// CZ nav items
var navItems = isCz
    ? [
        { hash: '#hero',         label: 'Home' },
        { hash: '#services',     label: 'Služby' },
        { hash: '#about',        label: 'O&nbsp;mně' },
        { hash: '#portfolio',    label: 'Ukázky' },
        { hash: '#testimonials', label: 'Reference' },
        { hash: '#contact',      label: 'Kontakt' }
    ]
    : [
        { hash: '#hero',         label: 'Home' },
        { hash: '#services',     label: 'Services' },
        ...
    ];
```

The `hash` must match an `id` on a section in `index.html` / `index_eng.html`.

---

## Updating the Footer

Footer links and social media URLs are hardcoded in `js/footer.js`. To change a social link:

```js
'<a href="https://www.facebook.com/antonin.petnik" ...>
```

To change footer nav links, find the `navLinks` variable in `footer.js` and update the `href` values.

---

## Contact Information

The contact details appear in two places:

1. **`#contact` section** of both homepages.
2. **`imprint_cz.html`** and **`imprint_eng.html`** (legal requirement).

Update both locations whenever phone number, email, or address changes.
