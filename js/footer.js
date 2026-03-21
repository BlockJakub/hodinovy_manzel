(function () {
    var placeholder = document.getElementById('site-footer');
    if (!placeholder) return;

    var base = placeholder.getAttribute('data-base') || '';
    var lang = placeholder.getAttribute('data-lang') || 'cz';

    var isCz = lang === 'cz';

    var yearId = 'footer-year';
    var brand = isCz ? 'Hodinový Manžel' : 'Handyman';
    var logoAlt = isCz ? 'Hodinový manžel logo' : 'Handyman logo';
    var disclaimer = isCz
        ? 'Tento web je prezentační vizitka (bez formulářů). Nezpracováváme osobní údaje klientů z důvodu kybernetické bezpečnosti.'
        : 'This website is a presentation card (without forms). We do not process clients\' personal data for cybersecurity reasons.';

    var navLinks = isCz
        ? '<a href="' + base + 'pages/cz/terms_cz.html"     class="text-decoration-none text-secondary mx-2">Obchodn\u00ed podm\u00ednky</a>|\n'
        + '        <a href="' + base + 'pages/cz/privacy_cz.html"   class="text-decoration-none text-secondary mx-2">Ochrana osobn\u00edch \u00fadaj\u016f</a>|\n'
        + '        <a href="' + base + 'pages/cz/copyright_cz.html" class="text-decoration-none text-secondary mx-2">Autorsk\u00e1 pr\u00e1va</a>|\n'
        + '        <a href="' + base + 'pages/cz/imprint_cz.html"   class="text-decoration-none text-secondary mx-2">Imprint &amp; Kontakt</a>|'
        : '<a href="' + base + 'pages/eng/terms_eng.html"     class="text-decoration-none text-secondary mx-2">Terms &amp; Conditions</a>|\n'
        + '        <a href="' + base + 'pages/eng/privacy_eng.html"  class="text-decoration-none text-secondary mx-2">Privacy Policy</a>|\n'
        + '        <a href="' + base + 'pages/eng/copyright_eng.html" class="text-decoration-none text-secondary mx-2">Copyright</a>|\n'
        + '        <a href="' + base + 'pages/eng/imprint_eng.html"  class="text-decoration-none text-secondary mx-2">Imprint &amp; Contact</a>|';

    var navAriaLabel = isCz ? 'Pr\u00e1vn\u00ed a informa\u010dn\u00ed str\u00e1nky' : 'Legal and information pages';

    var html =
        '<footer class="py-4 bg-dark text-center text-white mt-5">\n'
        + '  <div class="container">\n'
        + '    <p class="mb-3 fs-5 fw-bold">&copy; <span id="' + yearId + '"></span> ' + brand + '</p>\n'
        + '    <div class="social-icons fs-1 mb-3">\n'
        + '      <a href="https://www.facebook.com/antonin.petnik" class="text-white me-3" aria-label="Facebook"><i class="bi bi-facebook"></i></a>\n'
        + '      <a href="https://www.instagram.com/_antony_5/" class="text-white me-3" aria-label="Instagram"><i class="bi bi-instagram"></i></a>\n'
        + '      <a href="https://www.linkedin.com/in/anton%C3%ADn-p%C4%9Btn%C3%ADk-872a8b208/" class="text-white me-3" aria-label="LinkedIn"><i class="bi bi-linkedin"></i></a>\n'
        + '      <a href="#" class="text-white" aria-label="YouTube (coming soon)"><i class="bi bi-youtube"></i></a>\n'
        + '    </div>\n'
        + '    <div class="logo">\n'
        + '      <a href="' + base + 'index' + (isCz ? '' : '_eng') + '.html" class="d-inline-block" aria-label="Home">'
        + '<img src="' + base + 'Img/logo_handy_man_transbg.svg" width="96" height="96" alt="' + logoAlt + '" class="d-inline-block"></a>\n'
        + '    </div>\n'
        + '    <small class="text-muted d-block">' + disclaimer + '</small>\n'
        + '    <nav class="footer-nav mt-3" aria-label="' + navAriaLabel + '">\n'
        + '      ' + navLinks + '\n'
        + '    </nav>\n'
        + '  </div>\n'
        + '</footer>';

    placeholder.outerHTML = html;

    // Set year after injection (element now exists in DOM)
    var yearEl = document.getElementById(yearId);
    if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
