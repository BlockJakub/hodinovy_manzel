(function () {
    // about-photo overlay: keyboard accessible reveal and staggered icon delays
    document.addEventListener('DOMContentLoaded', function () {
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        document.querySelectorAll('.about-photo').forEach(el => {
            const overlay = el.querySelector('.about-photo__overlay');
            if (!overlay) return;
            overlay.setAttribute('aria-hidden', 'true');

            function show() {
                overlay.setAttribute('aria-hidden', 'false');
                if (!reduced) {
                    overlay.querySelectorAll('.about-photo__social').forEach((btn, i) => {
                        btn.style.transitionDelay = (60 * (i + 1)) + 'ms';
                    });
                }
            }

            function hide() {
                overlay.setAttribute('aria-hidden', 'true');
                overlay.querySelectorAll('.about-photo__social').forEach(btn => btn.style.transitionDelay = '0ms');
            }

            el.addEventListener('mouseenter', show);
            el.addEventListener('focusin', show);
            el.addEventListener('mouseleave', hide);
            el.addEventListener('focusout', hide);
        });
    });
})();
