
(function () {
    // Small site utilities: smooth scroll anchors, header scroll color
    document.addEventListener('DOMContentLoaded', function () {
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
            const navMenu = document.getElementById('menu');
            if (!header) return;
            if (window.scrollY > 50) {
                header.classList.add('bg-dark', 'shadow-lg');
                header.classList.remove('bg-warning');
                if (navMenu) navMenu.classList.add('navbar__menu--scrolled');
            } else {
                header.classList.remove('bg-dark', 'shadow-lg');
                header.classList.add('bg-warning');
                if (navMenu) navMenu.classList.remove('navbar__menu--scrolled');
            }
        });
    });
})();
