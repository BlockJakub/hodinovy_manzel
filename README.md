# Hodinový Manžel Static Website

A modern, responsive, and accessible static website for a handyman service (Hodinový manžel), featuring legal compliance, dark mode, neumorphism, and interactive UI elements.

## Features

- **Responsive design**: Mobile-first, works on all devices
- **Dark mode**: User-toggleable, with persistent preference
- **Neumorphism & modern UI**: Clean, soft visual style
- **Accessibility**: Skip links, ARIA roles, keyboard navigation
- **Legal pages**: Terms, privacy, copyright, imprint/contact (CZ & ENG)
- **Interactive elements**: Flip cards, Bootstrap carousels, animated buttons, tooltips
- **Image optimization**: Responsive, lazy-loaded images
- **Error handling**: Custom 404/500 pages, JS error fallback

## Project Structure

```
├── index.html              # Czech homepage
├── index-eng.html          # English homepage
├── css/
│   └── style.css           # All styles (light/dark, neumorphism, responsive)
├── js/
│   ├── logo-anim.js        # Logo animation
│   ├── about-overlay.js    # About photo overlay
│   ├── parallax-hero.js    # Parallax hero effect
│   ├── counters.js         # Animated counters
│   ├── flip-cards.js       # Flip card logic
│   ├── site-utils.js       # Utilities (year, scroll, header)
│   ├── theme-toggle.js     # Dark mode toggle
│   └── sidebar_responsive.js # Mobile nav
├── Img/                    # Images and icons
├── pages/
│   ├── cz/                 # Czech legal/info pages
│   └── eng/                # English legal/info pages
└── ...
```

## Setup & Usage

1. **No build step required**: Just open `index.html` or `index-eng.html` in your browser.
2. **Edit content**: Update HTML files for text, services, testimonials, etc.
3. **Add images**: Place new images in the `Img/` folder and reference them in HTML.
4. **Customize styles**: Edit `css/style.css` for visual changes.
5. **JS logic**: All scripts are loaded via `<script defer src="js/<file>.js"></script>` at the end of each HTML file.

## Development Notes

- All legal and info pages are in `pages/cz/` and `pages/eng/`.
- Use Bootstrap 5 for layout and components.
- All JavaScript is modular and separated by feature.
- Accessibility and performance are prioritized.

## License

This project is for personal or small business use. For commercial use or redistribution, please contact the author.

---

For more details, see comments in each file or contact the project maintainer.
