(function () {
    // Theme toggle: neumorphic circular button with localStorage persistence
    document.addEventListener('DOMContentLoaded', function () {
        const root = document.documentElement;
        const toggle = document.getElementById('themeToggle');
        const icon = toggle;
        const iconImg = document.getElementById('themeToggleIcon');
        const LS_KEY = 'hm_theme';

        const sectionIds = ['about', 'portfolio', 'testimonials', 'stats', 'faq'];

        function adjustStaticSections(dark) {
            sectionIds.forEach(id => {
                const el = document.getElementById(id);
                if (!el) return;
                if (dark) {
                    el.classList.remove('bg-light');
                    el.classList.add('bg-dark', 'text-white');
                } else {
                    el.classList.remove('bg-dark', 'text-white');
                    el.classList.add('bg-light');
                }
            });

            document.querySelectorAll('.portfolio-item .overlay').forEach(o => {
                if (dark) {
                    o.classList.add('bg-dark', 'bg-opacity-75', 'text-white');
                } else {
                    o.classList.remove('bg-dark', 'bg-opacity-75', 'text-white');
                }
            });

            document.querySelectorAll('#stats .p-4.border.rounded').forEach(p => {
                if (dark) {
                    p.classList.remove('bg-white');
                    p.classList.add('bg-secondary', 'text-white', 'border-light');
                } else {
                    p.classList.remove('bg-secondary', 'text-white', 'border-light');
                    p.classList.add('bg-white');
                }
            });
        }

        function applyTheme(dark) {
            if (dark) root.classList.add('dark-theme'); else root.classList.remove('dark-theme');
            if (icon) {
                icon.setAttribute('aria-pressed', dark ? 'true' : 'false');
            }
            // Prefer swapping an <img id="themeToggleIcon"> if present; fallback to emoji text
            if (iconImg) {
                try {
                    const base = iconImg.getAttribute('data-base') || '';
                    const sun = (base ? base : '') + 'Img/icon_sun.svg';
                    const moon = (base ? base : '') + 'Img/icon_moon2.svg';
                    iconImg.src = dark ? sun : moon;
                    iconImg.alt = dark ? 'Switch to light theme' : 'Switch to dark theme';
                } catch (_) {
                    // Fallback silently to text content on error
                    if (icon) icon.textContent = dark ? '☀️' : '🌙';
                }
            } else if (icon) {
                icon.textContent = dark ? '☀️' : '🌙';
            }
            adjustStaticSections(dark);
        }

        const stored = localStorage.getItem(LS_KEY);
        const darkInit = stored === 'dark' || (stored === null && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
        applyTheme(darkInit);

        function toggleTheme() {
            const isDark = root.classList.toggle('dark-theme');
            localStorage.setItem(LS_KEY, isDark ? 'dark' : 'light');
            applyTheme(isDark);
        }

        if (toggle) {
            toggle.addEventListener('click', toggleTheme);
            toggle.addEventListener('keydown', function (e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleTheme();
                }
            });
        }
    });
})();
