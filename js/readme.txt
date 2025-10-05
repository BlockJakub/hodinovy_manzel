<<<<<<< HEAD
This folder contains extracted JavaScript files moved from inline <script> tags in index.html:
- logo-anim.js      : anime.js powered logo rotation (guarded)
- about-overlay.js  : about-photo overlay reveal and staggered icons
- parallax-hero.js  : pointer + scroll parallax hero logic
- counters.js       : jQuery based counter animations
- flip-cards.js     : flip card toggles and outside-click close
- site-utils.js     : year update, smooth scroll for anchors, header scroll behavior
- theme-toggle.js   : theme toggle and persistence (localStorage key 'hm_theme')

Load order: include these with <script defer src="js/<file>.js"></script> before closing </body>.
=======

JavaScript Folder Overview
==========================

This folder contains all JavaScript files for the Hodinový manžel static website project. All scripts are modularized and loaded via <script defer> tags at the end of each HTML file.

Files:
------
- logo-anim.js      : Animates the logo using anime.js (rotation, entrance effects)
- about-overlay.js  : Handles about-photo overlay reveal and staggered social icon animation
- parallax-hero.js  : Adds pointer and scroll-based parallax effect to the hero background
- counters.js       : Animates number counters (e.g., stats, achievements) using jQuery
- flip-cards.js     : Enables flip card hover/focus/tap flipping and closes on outside click
- site-utils.js     : Utility functions (auto year update, smooth anchor scroll, sticky header behavior)
- theme-toggle.js   : Dark/light mode toggle, persists user preference in localStorage ('hm_theme')
- sidebar_responsive.js : Responsive sidebar and mobile navigation logic

Usage:
------
1. All scripts are loaded with <script defer src="js/<file>.js"></script> before </body>.
2. Do not inline scripts in HTML; keep all logic in these files for maintainability.
3. Scripts are written for vanilla JS and jQuery (where needed). Bootstrap 5 is used for UI components.
4. If you add new scripts, document their purpose here.

Project Structure:
------------------
- HTML: index.html, index-eng.html, pages/cz/*, pages/eng/*
- CSS: css/style.css (all styles, including dark mode, neumorphism, responsive, etc.)
- JS:  js/*.js (this folder)
- Img: images and icons

For more info, see the main project README or comments in each JS file.
>>>>>>> hodinovy_manzel
