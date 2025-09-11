/* title_anime.js
     Browser-friendly anime.js usage (CDN iife build exposes `anime`).
     Animates letters inside first H2 on the page. Defensive checks added.
*/
(function () {
    if (typeof anime === 'undefined') return; // anime not loaded

    const h2 = document.querySelector('h2');
    if (!h2) return;

    // Wrap each character in a span for per-letter animation (safe DOM creation)
    const text = h2.textContent.trim();
    // clear existing text
    while (h2.firstChild) h2.removeChild(h2.firstChild);
    for (const ch of text) {
        const span = document.createElement('span');
        span.className = 'title-char';
        if (ch === ' ') {
            span.appendChild(document.createTextNode('\u00A0'));
        } else {
            span.appendChild(document.createTextNode(ch));
        }
        h2.appendChild(span);
    }

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
