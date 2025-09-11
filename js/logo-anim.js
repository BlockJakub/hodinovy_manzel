(function () {
    // Safe logo animation: animate the logo if anime.js is present and is a function
    document.addEventListener('DOMContentLoaded', function () {
        const logoImg = document.querySelector('.navbar__brand figure img');
        if (!logoImg) return;
        // Support both anime and anime.default (for different CDN/module styles)
        var animeFn = (typeof anime === 'function') ? anime : (anime && typeof anime.default === 'function' ? anime.default : null);
        if (!animeFn) {
            // fail silently, but log for debugging
            console.warn('logo-anim: anime.js is not loaded or not a function');
            return;
        }
        try {
            animeFn({
                targets: logoImg,
                rotate: '1turn',
                duration: 2000,
                easing: 'easeInOutSine'
            });
        } catch (e) {
            // fail silently
            console.error('logo-anim error', e);
        }
    });
})();
