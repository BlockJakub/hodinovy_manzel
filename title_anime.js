/* title_anime.js
     Browser-friendly anime.js usage (CDN iife build exposes `anime`).
     Animates letters inside first H2 on the page. Defensive checks added.
*/
(function () {
    if (typeof anime === 'undefined') return; // anime not loaded

    const h2 = document.querySelector('h2');
    if (!h2) return;

    // Wrap each character in a span for per-letter animation
    const text = h2.textContent.trim();
    h2.innerHTML = text.split('').map(ch => `<span class="title-char">${ch === ' ' ? '&nbsp;' : ch}</span>`).join('');

    anime.timeline({ loop: true })
        .add({
            targets: '.title-char',
            translateY: [-30, 0],
            rotate: ['-1turn', '0turn'],
            opacity: [0, 1],
            easing: 'easeOutElastic(1, .8)',
            delay: anime.stagger(40)
        })
        .add({
            targets: '.title-char',
            delay: 1500,
            opacity: 0,
            easing: 'easeInOutQuad'
        });
})();
