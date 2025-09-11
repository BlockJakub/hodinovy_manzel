(function () {
    // Flip card toggle handlers and outside-click close
    document.addEventListener('DOMContentLoaded', function () {
        document.querySelectorAll('.flip-card__toggle').forEach(btn => {
            btn.addEventListener('click', function (e) {
                e.stopPropagation();
                const card = btn.closest('.flip-card');
                if (!card) return;
                const isFlipped = card.classList.toggle('is-flipped');
                btn.setAttribute('aria-expanded', isFlipped ? 'true' : 'false');
            });
        });

        document.addEventListener('click', function (e) {
            document.querySelectorAll('.flip-card.is-flipped').forEach(c => {
                if (!c.contains(e.target)) {
                    c.classList.remove('is-flipped');
                    const t = c.querySelector('.flip-card__toggle');
                    if (t) t.setAttribute('aria-expanded', 'false');
                }
            });
        });

        // Prevent propagation when clicking inside card
        document.querySelectorAll('.flip-card').forEach(c => c.addEventListener('click', e => e.stopPropagation()));
    });
})();
