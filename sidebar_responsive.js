// Defensive sidebar toggle: check elements exist before using them
document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('toggle-btn');
    const menu = document.getElementById('menu');

    if (!toggleBtn || !menu) return; // nothing to do

    toggleBtn.addEventListener('click', () => {
        toggleBtn.classList.toggle('navbar__toggle--is-open');
        menu.classList.toggle('navbar__menu--open');
    });

    // Close mobile menu when a link is clicked (UX improvement)
    menu.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
            toggleBtn.classList.remove('navbar__toggle--is-open');
            menu.classList.remove('navbar__menu--open');
        });
    });
});