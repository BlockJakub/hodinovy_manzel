# Hodinový Manžel — Documentation

This folder contains the full technical and editorial documentation for the **Hodinový Manžel** static website.

---

## Table of Contents

| Document                                 | Description                                           |
| ---------------------------------------- | ----------------------------------------------------- |
| [architecture.md](architecture.md)       | Project structure, file layout, page inventory        |
| [components.md](components.md)           | Reusable JS components: header, footer, error handler |
| [javascript.md](javascript.md)           | All JS modules — purpose, API, and behaviour          |
| [theming.md](theming.md)                 | CSS variables, dark mode, neumorphism system          |
| [deployment.md](deployment.md)           | GitHub Pages deployment, robots.txt, 404 routing      |
| [content-editing.md](content-editing.md) | How to update text, images, services, and legal pages |

---

## Quick Facts

| Property           | Value                                              |
| ------------------ | -------------------------------------------------- |
| Site type          | Static HTML (no build step)                        |
| Hosting            | GitHub Pages                                       |
| Primary language   | Czech (`CZ`)                                       |
| Secondary language | English (`ENG`)                                    |
| CSS framework      | Bootstrap 5.3.2                                    |
| JS framework       | None (vanilla JS + jQuery 3.6.4 for legacy compat) |
| Animation library  | anime.js (CDN iife build)                          |
| Icon library       | Bootstrap Icons 1.10.5                             |
| Typography         | Adobe Typekit (`jhv2lht` CZ, `lft2pcd` ENG)        |

---

## Repository Layout (top-level)

```
hodinovy_manzel/
├── index.html              ← Czech homepage (entry point)
├── index_eng.html          ← English homepage (entry point)
├── 404.html                ← GitHub Pages 404 hook → redirects to pages/cz/404_error_cz.html
├── robots.txt
├── css/
│   ├── style.css           ← Light theme + layout
│   └── style_dark.css      ← Dark theme overrides
├── js/                     ← All custom JavaScript (see javascript.md)
├── Img/                    ← All images and SVG assets
├── pages/
│   ├── cz/                 ← Czech legal & error pages
│   └── eng/                ← English legal & error pages
└── Docs/                   ← This documentation
```
