document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('toggle-btn');
    const menu = document.getElementById('menu');

    toggleBtn.addEventListener('click', () => {
        toggleBtn.classList.toggle('navbar__toggle--is-open');
        menu.classList.toggle('navbar__menu--open');
    });
});