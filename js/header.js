(function () {
    var placeholder = document.getElementById('site-header');
    if (!placeholder) return;

    var base = placeholder.getAttribute('data-base') || '';
    var lang = placeholder.getAttribute('data-lang') || 'cz';
    var czHref = placeholder.getAttribute('data-cz-href') || 'index.html';
    var engHref = placeholder.getAttribute('data-eng-href') || 'index_eng.html';
    var home = placeholder.getAttribute('data-home') || '';

    var isCz = lang === 'cz';

    var navItems = isCz
        ? [
            { hash: '#hero', label: 'Home' },
            { hash: '#services', label: 'Služby' },
            { hash: '#about', label: 'O&nbsp;mně' },
            { hash: '#portfolio', label: 'Ukázky' },
            { hash: '#testimonials', label: 'Reference' },
            { hash: '#contact', label: 'Kontakt' }
        ]
        : [
            { hash: '#hero', label: 'Home' },
            { hash: '#services', label: 'Services' },
            { hash: '#about', label: 'About' },
            { hash: '#portfolio', label: 'Portfolio' },
            { hash: '#testimonials', label: 'Testimonials' },
            { hash: '#contact', label: 'Contact' }
        ];

    var navLinks = navItems.map(function (item) {
        return '<li><a href="' + home + item.hash + '" class="navbar__link">' + item.label + '</a></li>';
    }).join('\n          ');

    var logoAlt = isCz ? 'Hodinový manžel logo' : 'Handyman logo';
    var toggleAlt = isCz ? 'Přepnout motiv' : 'Toggle theme';

    var html =
        '<header class="bg-warning sticky-top shadow-sm header">\n'
        + '  <div class="container">\n'
        + '    <div class="header-switches">\n'
        + '      <div class="language-switch fs-2">\n'
        + '        <a href="' + czHref + '">CZ</a> |\n'
        + '        <a href="' + engHref + '">ENG</a>\n'
        + '      </div>\n'
        + '      <div class="theme-toggle" id="themeToggle" role="button" tabindex="0" aria-pressed="false" aria-label="Toggle theme">\n'
        + '        <img id="themeToggleIcon" data-base="' + base + '" src="' + base + 'Img/icon_moon2.svg"'
        + ' alt="' + toggleAlt + '" width="28" height="28" style="vertical-align:middle;" />\n'
        + '      </div>\n'
        + '    </div>\n'
        + '  </div>\n'
        + '  <div class="container">\n'
        + '    <nav class="navbar container navbar-expand-lg rounded">\n'
        + '      <div class="navbar__brand">\n'
        + '        <a href="' + home + '#hero" class="text-2xl font-bold" aria-label="Home">\n'
        + '          <figure class="m-0 logo"><img src="' + base + 'Img/logo_handy_man_transbg.svg"'
        + ' width="126" height="126" alt="' + logoAlt + '" class="d-inline-block"></figure>\n'
        + '        </a>\n'
        + '      </div>\n'
        + '      <button id="toggle-btn" class="navbar__toggle" aria-label="Toggle navigation">\n'
        + '        <span class="navbar__toggle-icon"></span>\n'
        + '      </button>\n'
        + '      <ul id="menu" class="navbar__menu navbar__menu--mobile">\n'
        + '          ' + navLinks + '\n'
        + '      </ul>\n'
        + '    </nav>\n'
        + '  </div>\n'
        + '</header>';

    placeholder.outerHTML = html;
})();
