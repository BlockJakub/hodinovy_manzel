
(function () {
    // Safe logo animation: animate the logo if anime.js is present and is a function.
    // Be resilient to load order: retry a few times after DOMContentLoaded, then silently skip.
    function getAnimeFn() {
        try {
            // Support both anime and anime.default (for different CDN/module styles)
            if (typeof window.anime === 'function') return window.anime;
            if (window.anime && typeof window.anime.default === 'function') return window.anime.default;
        } catch (_) { /* ignore */ }
        return null;
    }

    function runLogoAnim() {
        // Respect reduced motion preferences
        try {
            if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                return true; // treat as success but do nothing
            }
        } catch (_) { /* ignore */ }
        const logoImg = document.querySelector('.navbar__brand figure img');
        if (!logoImg) return true; // nothing to do
        var animeFn = getAnimeFn();
        if (!animeFn) return false; // not ready yet
        try {
            animeFn({
                targets: logoImg,
                rotate: '1turn',
                duration: 2000,
                easing: 'easeInOutSine'
            });
        } catch (e) {
            // fail silently in production
            // console.debug('logo-anim error', e);
        }
        return true;
    }

    function onReady(fn) {
        if (document.readyState === 'complete' || document.readyState === 'interactive') {
            fn();
        } else {
            document.addEventListener('DOMContentLoaded', fn, { once: true });
        }
    }

    onReady(function () {
        // Try immediately, then retry a few times if anime.js isn't ready yet
        var attempts = 0;
        var maxAttempts = 6; // ~1.2s total with 200ms interval
        var interval = 200;

        function tryRun() {
            if (runLogoAnim()) return; // success or nothing to do
            attempts++;
            if (attempts >= maxAttempts) return; // give up silently
            setTimeout(tryRun, interval);
        }

        tryRun();
        // Also try on full window load as a final chance
        window.addEventListener('load', runLogoAnim, { once: true });
    });
})();
