(function () {
    // Small site utilities: footer year, smooth scroll anchors, header scroll color
    document.addEventListener('DOMContentLoaded', function () {
        const yearEl = document.getElementById('year');
        if (yearEl) yearEl.textContent = new Date().getFullYear();

        document.querySelectorAll('.navbar__link').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                if (!href || !href.startsWith('#')) return;
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) target.scrollIntoView({ behavior: 'smooth' });
            });
        });

        window.addEventListener('scroll', function () {
            const header = document.querySelector('header');
            if (!header) return;
            if (window.scrollY > 50) {
                header.classList.add('bg-dark', 'shadow-lg');
                header.classList.remove('bg-warning');
            } else {
                header.classList.remove('bg-dark', 'shadow-lg');
                header.classList.add('bg-warning');
            }
        });
    });
})();
