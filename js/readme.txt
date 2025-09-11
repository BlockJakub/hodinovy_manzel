This folder contains extracted JavaScript files moved from inline <script> tags in index.html:
- logo-anim.js      : anime.js powered logo rotation (guarded)
- about-overlay.js  : about-photo overlay reveal and staggered icons
- parallax-hero.js  : pointer + scroll parallax hero logic
- counters.js       : jQuery based counter animations
- flip-cards.js     : flip card toggles and outside-click close
- site-utils.js     : year update, smooth scroll for anchors, header scroll behavior
- theme-toggle.js   : theme toggle and persistence (localStorage key 'hm_theme')

Load order: include these with <script defer src="js/<file>.js"></script> before closing </body>.
